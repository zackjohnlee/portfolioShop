import React, { Component } from 'react';
import {
	BrowserRouter,
	Route,
	Switch
} from 'react-router-dom';
import {StripeProvider} from 'react-stripe-elements';
import config from './config';

import {galleryData} from './data/galleryData';

import './css/App.css';
import Content from "./components/Content";
import Nav from "./components/Nav";
import Header from "./components/Header";
import StoreCheckout from './components/StoreCheckout';


class App extends Component {
	constructor(props, context) {
		super(props, context);
		
		let tiles = [];
        galleryData.forEach(tile=>{
            // console.log(tile);
            tile.images.forEach(image=>{
                let data = {
                    col: tile.collection,
                    src: image.src,
                    name: image.name,
                    desc: image.desc || null
                }
                tiles.push(data);
            })
		});
		
		this.state={
			stripe: null,
			menuOpen: false,
			modalOpen: false,
			paymentOpen: false,
			modalSrc: {
				data: null,
				src: "",
				name: "",
			},
			window: {
				width: 0,
				height: 0
			},
			cart: {
				items: [],
				itemCount: 0,
				total: 0
			},
			products:[],
			tileList: tiles
		};

		this.createOrderHandler = this.createOrderHandler.bind(this);
		this.updateDimensions = this.updateDimensions.bind(this);
		this.navigateGallery = this.navigateGallery.bind(this);
		this.addItemHandler = this.addItemHandler.bind(this);
		this.fetchProducts = this.fetchProducts.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
		this.imageClick = this.imageClick.bind(this);
		this.buyNow = this.buyNow.bind(this);
		
	}
	
	componentDidMount() {
		this.updateDimensions();
		this.fetchProducts();
		window.addEventListener('resize', this.updateDimensions);
		if (window.Stripe) {
			this.setState({stripe: window.Stripe(config.stripe.apiKey)});
		} else {
			document.querySelector('#stripe-js').addEventListener('load', () => {
			// Create Stripe instance once Stripe.js loads
			this.setState({stripe: window.Stripe(config.stripe.apiKey)});
		});
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions);
	}

	updateDimensions(){
		this.setState({
			window: {
				width: window.outerWidth,
				height: window.outerHeight
			}
		});
	}

	handleToggle(e){
		const value = e.target.checked;
		const name = e.target.name;
		this.setState({
			[name]: value
		});
	}


	imageClick(data, ref){
		let thisRef= ref.current.getBoundingClientRect();
		let {x, y, width, height} = thisRef;
		let product;
		let modalGallery = galleryData.filter((gallery) => {
			return gallery.collection === data.col;
		});

		if(modalGallery[0].type === "shop"){
			product = this.state.products.filter((product)=>{
				return product.id === data.src;
			});
			product = product[0];
			product.desc = data.desc
		 } else { product = null; }
		
		this.setState({
			modalSrc: {
				data: modalGallery[0],
				src: data.src,
				name: data.name,
				product: product,
				curRef: {
					x: x,
					y: y,
					width: width,
					height: height,
					ref: ref
				}
			},
			modalOpen: true
		});
	}

	navigateGallery(e){
		const navDir = e.target.id;
		let nextImg;
		let prevImg;
		let addImg;
		let images = this.state.modalSrc.data.images;
		images.forEach((image, index)=>{
			if(image.src === this.state.modalSrc.src){
				index >= images.length-1
					? addImg = images[0].src
					: addImg = images[index+1].src
				index <= 0
					? prevImg = images[images.length-1].src
					: prevImg = images[index-1].src
			}
		});
		navDir === "adv"
			? nextImg = addImg
			: nextImg = prevImg

		this.setState({
			modalSrc: {
				data: this.state.modalSrc.data,
				src: nextImg,
				name: this.state.modalSrc.name,
				product: this.state.modalSrc.product,
				curRef: this.state.modalSrc.curRef
			},
		});
	}

	addItemHandler(qty, name=null){
		//declare array for cart items, current product(from product page)
		//the name of the product, how many are currently being added,
		//check if item is already contained in array (default: false)
		//the cart price total(default: 0)
		let cart = this.state.cart.items;
		let product = this.state.modalSrc.product;
		let thisItem = product.id;
		let quantity = parseInt(qty);
		let containsItem = false;
		let total = 0;

		//check if item name was passed to function, set item name if true.
		if(name){
			thisItem = name;
		}

		//cycle through the carts item array
		cart.forEach((item, index)=>{
			//if the array item matches the item passed
			if(item.id === thisItem){
				//set items inventory availability
				let inventory = item.inventory.quantity;
				containsItem = true;

				//if the quantity passed plus the items current quantity 
				//are greater than the items available inventory
				if((quantity + item.quantity) > inventory){
					quantity = 0; //set quantity passed to 0
					//if the items current quantity itself is less than 
					//available inventory
					if(item.quantity < inventory){
						//set quantity to remaining inventory
						quantity = inventory - item.quantity;
					}
				}

				//create new quantity to update the items current quantity.
				//should equal quantity passed plus current quantity in cart
				let newQuant = quantity + item.quantity;
				//if the new quantity is less than or equal to 0
				if(newQuant <= 0){
					cart.splice(index, 1); //remove the item from cart
				} else if (newQuant>inventory){ //if new quantity is greater than inventory
					newQuant = inventory; //new quantity equals available inventory
				}

				//the carts total value equals this item price times the new quantity,
				//minus what the item values used to be
				total += (item.price*newQuant)-(item.price*item.quantity);
				//set the items quantity to the new quantity
				item.quantity = newQuant;
				this.setState({
					cart: {
						items: cart, //add cart items array
						itemCount: this.state.cart.itemCount + quantity, //add the quantity passed to the previous item count
						total: this.state.cart.total + total //add the current total to the overall cart total
					}
				});
			}
		});
		//if the item is not already in the array
		if(!containsItem){
			//check if quantity is greater than available inventory
			if(quantity > product.inventory.quantity){
				//if it is, set quantity passed to available inventory
				quantity = product.inventory.quantity;
			}
			//set product quantity to quantity passed
			product.quantity = quantity;
			//set the products total to its price times its quantity
			total = product.price*product.quantity;
			cart.push(product); //add item to cart array
			//see previous set state for clarification
			this.setState({
				cart: {
					items: cart,
					itemCount: this.state.cart.itemCount + quantity,
					total: this.state.cart.total + total
				}
			});
		}
		
	}

	buyNow(e, qty){
		this.addItemHandler(qty);
		this.handleToggle(e);
		console.log(e.target);
	}

	//Stripe API function: GET Products
	async fetchProducts(){
        console.log("fetch start...");
        const res = await fetch(config.stripe.productsUrl, {
          method: 'GET'
        });
        const response = await res.json();
        const products = response.data;
    
        this.setState({
			products
		});
	}
	
	//Stripe API function: POST order/pay
	async createOrderHandler(token, email, shipping){
		console.log("creating order...");
		const items = this.state.cart.items;
		// console.log(token);
		// console.log(email);
		const orderItems = items.map((item)=>{
			return {
				amount: item.price,
				quantity: item.quantity,
				parent: item.id
			}
		});
		const res = await fetch(config.stripe.checkoutUrl, { // Backend API url
			method: 'POST',
			body: JSON.stringify({
			  token,
			  order: {
				currency: config.stripe.currency,
				email: email,
				items: orderItems,
				shipping: {
				  name: token.card.name,
				  address: shipping
				}
			  }
			}),
		  });
	}

	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<div ref="headNav">
						<Header/>
						<Nav
							window={this.state.window} 
							handleMenu={this.handleToggle}
							menuOpen={this.state.menuOpen}
						/>
					</div>
					<Content
						data={galleryData}
						tiles={this.state.tileList}

						click={this.imageClick}
						handleScroll={this.scrollFix}
						handleNav={this.navigateGallery}

						scrollY={window.scrollY}

						modalSrc={this.state.modalSrc}
						modalOpen={this.state.modalOpen}
						toggleModal={this.handleToggle}

						paymentOpen={this.state.paymentOpen}
						buyNow={this.buyNow}
						addItem={this.addItemHandler}
						
						
					/>
					{this.state.paymentOpen
						?
						<StripeProvider stripe={this.state.stripe}>
							<StoreCheckout
								data={galleryData}
								paymentOpen={this.state.paymentOpen}
								togglePayment={this.handleToggle}
								cartContents={this.state.cart}
								updateItem={this.addItemHandler}
								createOrder={this.createOrderHandler}
							/>
						</StripeProvider>
						:
						null
					}
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
