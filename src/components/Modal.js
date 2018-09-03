import React, {Component} from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {CSSTransition, Transition, TransitionGroup} from 'react-transition-group';


class Modal extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            quantity: 1,
            isVisible: true
        }
        this.updateQuantity = this.updateQuantity.bind(this);
        this.exitTransition = this.exitTransition.bind(this);
    }

    updateQuantity(e){
        this.setState({
            quantity: parseInt(e.target.value)
        });
    }

    exitTransition(e){
        console.log("fired", e.target.checked);
        this.setState({
            isVisible: !this.state.isVisible,
            event: {
                target:{
                    checked: false,
                    name: "modalOpen"
                }
            }
        })
        // setTimeout(this.props.toggleModal(e), 5000);
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.isVisible !== this.state.isVisible){
            console.log("not the same");
        }
    }
    
    render() {
        const defaultStyles = {
            transition: 
                `transform 500ms ease-out,
                opacity 500ms ease-in-out 200ms`
            ,
            transform: `translateY(-100%)`,
            opacity: `0`
        }
        const transitionStyles = {
            entering: { 
                transform: `translateY(-100%)`,
                opacity: `0`
            },
            entered:  { 
                transform: `translateY(0)`,
                opacity: `1`
            },
            exiting:{
                transform: `translateY(-100%)`,
                opacity: `0`
            }
            // exited: {
            //     transform: `translateY(-100%)`,
            //     opacity: `0`
            // }
        };
        const {open} = this.props.modalOpen;
        return (
            <div id="modal">
                
                <CSSTransition
                    in={this.state.isVisible}
                    classNames="modal-fade"
                    timeout={100}
                    appear={true}
                >
                    <div id="modalContainer">
                        
                        {/* toggle */}
                        <Transition
                            timeout={0}
                        >
                            <div id="modalToggle">
                                <input 
                                    id="modalCheck" 
                                    type="checkbox"
                                    name="modalOpen"
                                    checked={this.props.modalOpen}
                                    onChange={(e)=> this.exitTransition(e)}
                                />
                                <label htmlFor="modalCheck"/>
                            </div>
                        </Transition>
                        
                        {/* image */}
                        <Transition
                            in={this.state.isVisible}
                            timeout={{
                                enter: 0,
                                exit: 500
                            }}
                            appear={true}
                            onExited={()=>{this.props.toggleModal(this.state.event)}}
                            // onExited={()=>{console.log("it exited!");}}
                        >{(state)=>(
                            <div id="modalImage" 
                                style={{
                                    ...defaultStyles,
                                    ...transitionStyles[state]
                                }} 
                            >
                                <LazyLoadImage
                                    src={require("../images/"+ this.props.modalSrc.data.collection + "/" + this.props.modalSrc.src + ".jpg")}
                                    effect="blur"
                                    wrapperClassName="image"
                                />
                            </div>
                        )}
                        </Transition>
                        
                        {/* nav */}
                        <Transition
                            timeout={0}
                        >
                            <div id="galleryNav">
                                <button id="dec" onClick={this.props.navGallery}/>
                                <button id="adv" onClick={this.props.navGallery}/>
                            </div>
                        </Transition>
                        
                        {/* desc */}
                        <Transition
                                timeout={0}
                            >
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
                                                    max={this.props.modalSrc.product.inventory.quantity}
                                                />
                                            </div>
                                            <button 
                                                id="addItem" 
                                                className="button"
                                                onClick={()=>this.props.addItem(this.state.quantity)}
                                            >
                                                add to cart
                                            </button>
                                            <div id="buy">
                                                <label 
                                                    htmlFor="buyNow" 
                                                    className="button"
                                                >
                                                    Buy Now
                                                </label>
                                                <input 
                                                    id="buyNow" 
                                                    type="checkbox" 
                                                    name="paymentOpen" 
                                                    checked={this.props.paymentOpen}
                                                    onChange={(e)=>this.props.buyNow(e, this.state.quantity)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <p>{this.props.modalSrc.data.desc}</p>
                                }
                            </div>
                            </Transition>
                        
                    </div>
                </CSSTransition>
                
            </div>
        );
    }
}

export default Modal;