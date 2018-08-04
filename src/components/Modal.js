import React, {Component} from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


// const Modal = (props) => {
//     return (
//         <div id="modal">
//             <div id="modalContainer">
//                 <div id="modalToggle">
//                     <input 
//                         id="modalCheck" 
//                         type="checkbox"
//                         name="modalOpen"
//                         checked={props.modalOpen}
//                         onChange={props.handleModal}
//                     />
//                     <label htmlFor="modalCheck"/>
//                 </div>
//                 <div id="modalImage" >
//                     <LazyLoadImage
//                         src={require("../images/"+ props.modalSrc.data.collection + "/" + props.modalSrc.src + ".jpg")}
//                         effect="blur"
//                         wrapperClassName="image"
//                     />
//                 </div>
//                 <div id="galleryNav">
//                     <button id="dec" onClick={props.navGallery}/>
//                     <button id="adv" onClick={props.navGallery}/>
//                 </div>
//                 <div id="modalDesc">
//                     {props.modalSrc.data.type === "shop"
//                         ? 
//                         <div id="shopElements">
//                             <h2>{props.modalSrc.name}</h2>
//                             <button id="addItem" onClick={props.addItem}>add to cart</button>
//                             <h3>${props.modalSrc.product.price/100.00}</h3>
//                             <label htmlfor="quantity">Qty: </label>
//                             <input id="quantity" name="quantity" type="number" defaultValue="1" min="1" max={props.modalSrc.product.inventory.quantity}/>
//                             <h3>in stock:{props.modalSrc.product.inventory.quantity}</h3>
//                         </div>
//                         :
//                         <p>{props.modalSrc.data.desc}</p>
//                     }
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Modal;


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
            quantity: e.target.value
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
                            onChange={this.props.handleModal}
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
                                <button id="addItem" onClick={()=>this.props.addItem(this.state.quantity)}>add to cart</button>
                                <h3>${this.props.modalSrc.product.price/100.00}</h3>
                                <label htmlfor="quantity">Qty: </label>
                                <input id="quantity" name="quantity" onChange={this.updateQuantity}type="number" value={this.state.quantity} min="1" max={this.props.modalSrc.product.inventory.quantity}/>
                                <h3>in stock:{this.props.modalSrc.product.inventory.quantity}</h3>
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