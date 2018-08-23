import React, {Component} from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


class Modal extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            quantity: 1
        }
        this.updateQuantity = this.updateQuantity.bind(this);
    }

    updateQuantity(e){
        this.setState({
            quantity: parseInt(e.target.value)
        });
    }
    
    render() {
        return (
            <div id="modal">
                <div id="modalContainer">
                    <div id="modalToggle">
                        <input 
                            id="modalCheck" 
                            type="checkbox"
                            name="modalOpen"
                            checked={this.props.modalOpen}
                            onChange={this.props.toggleModal}
                        />
                        <label htmlFor="modalCheck"/>
                    </div>
                    <div id="modalImage" >
                        <LazyLoadImage
                            src={require("../images/"+ this.props.modalSrc.data.collection + "/" + this.props.modalSrc.src + ".jpg")}
                            effect="blur"
                            wrapperClassName="image"
                        />
                    </div>
                    <div id="galleryNav">
                        <button id="dec" onClick={this.props.navGallery}/>
                        <button id="adv" onClick={this.props.navGallery}/>
                    </div>
                    <div id="modalDesc">
                        {this.props.modalSrc.data.type === "shop"
                            ? 
                            <div id="shopElements">
                                <h2>{this.props.modalSrc.name}</h2>
                                <div id="desc">
                                    <p>{this.props.modalSrc.product.desc}</p>
                                </div>
                                <div id="priceDeets">
                                    <h3 id="price">${this.props.modalSrc.product.price/100.00}</h3>
                                    <h3 id="stock">
                                        {this.props.modalSrc.product.inventory.quantity > 0
                                            ? "In Stock"
                                            : "Out of Stock"
                                        }
                                    </h3>
                                </div>
                                <div id="paymentDeets">
                                    <div id="qty">
                                        <label htmlFor="quantity">Qty: </label>
                                        <input 
                                            id="quantity" 
                                            name="quantity" 
                                            onChange={this.updateQuantity}
                                            type="number" 
                                            value={this.state.quantity} 
                                            min="1" 
                                            max={this.props.modalSrc.product.inventory.quantity}/>
                                    </div>
                                    <button 
                                        id="addItem" 
                                        onClick={()=>this.props.addItem(this.state.quantity)}>
                                        add to cart
                                    </button>
                                    <div id="buy">
                                        <label htmlFor="buyNow">Buy Now</label>
                                        <input 
                                            id="buyNow" 
                                            type="checkbox" 
                                            name="paymentOpen" 
                                            checked={this.props.paymentOpen}
                                            onChange={(e)=>this.props.buyNow(e, this.state.quantity)}/>
                                    </div>
                                </div>
                            </div>
                            :
                            <p>{this.props.modalSrc.data.desc}</p>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;