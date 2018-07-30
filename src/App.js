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
		this.state={
			stripe: null,
			menuOpen: false,
			modalOpen: false,
			paymentOpen: false,
			modalSrc: {
				collection: "",
				desc: "",
				src: "",
				gallery: []
			},
			window: {
				width: 0,
				height: 0
			},
			products:[]
		};

		this.updateDimensions = this.updateDimensions.bind(this);
		this.imageClick = this.imageClick.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
		this.fetchProducts = this.fetchProducts.bind(this);
		this.navigateGallery = this.navigateGallery.bind(this);

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

		// Dismiss modal
		this.scrollToggle();
	}

	imageClick(col, src){
		let modalGallery = galleryData.filter((gallery) => {
			return gallery.collection === col;
		});
		let collectionDesc = modalGallery[0].desc;
		let galleryImages = modalGallery[0].images;

		this.setState({
			modalSrc: {
				collection: col,
				src: src,
				gallery: galleryImages,
				desc: collectionDesc
			},
			modalOpen: true
		});

		// Open modal
		this.scrollToggle();
	}

	scrollToggle() {
		// test if #content has 'modal-open' class
		let content = document.getElementById('content');
		if (content.classList.contains('modal-open')) {
			// Dismiss modal:
			// if it does, remove it and scroll to the px it was "scrolled"
			content.classList.remove('modal-open');

			// only bother trying to work on the `top` css property if it's
			// at least 3 characters long so that we can perform the substr()
			// and if it's shorter than that, it's an empty string anyway
			let px = content.style.top;
			if (px.length > 2) {
				
				// turn that style string into an integer
				px = parseInt(px.substr(0,px.length - 2));

				// test that the integer is negative:
				// the scrollTo() isn't going to make sense unless it is, and we
				// can safely ignore the case where it's actually 0 because
				// then we're already done
				if (px < 0) {
					window.scrollTo({
						top: -px,
						behavior: 'instant'
					});
				}
			}
		} else {
			// Open modal:
			// if it doesn't, add the class and set `top` to -window.scrollY pixels
			content.style.top = '-' + window.scrollY + 'px';
			content.classList.add('modal-open');
		}		
	}

	navigateGallery(e){
		const navDir = e.target.id;
		let nextImg;
		let prevImg;
		let addImg;
		let images = this.state.modalSrc.gallery;
		let thisIdx = images.map((image, index)=>{
			if(image.src === this.state.modalSrc.src){
				console.log(index);
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
				collection: this.state.modalSrc.collection,
				src: nextImg,
				gallery: this.state.modalSrc.gallery,
				desc: this.state.modalSrc.desc
			},
		})
	}

	async fetchProducts() {
        console.log("fetch start...");
        // const res = await fetch(config.stripe.productsUrl, {
        //   method: 'GET'
        // });
        // const response = await res.json();
        // const products = response.data;
    
        // this.setState({
		// 	products
		// });
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
						click={this.imageClick}
						modalOpen={this.state.modalOpen}
						handleModal={this.handleToggle}
						mainSrc={this.state.modalSrc.src}
						collection={this.state.modalSrc.collection}
						desc={this.state.modalSrc.desc}
						handleNav={this.navigateGallery}
					/>
					<StripeProvider stripe={this.state.stripe}>
						<StoreCheckout/>
    				</StripeProvider>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
