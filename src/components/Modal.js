import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


const Modal = (props) => {
    return (
        <div id="modal">
            <div id="modalContainer">
                <div id="modalToggle">
                    <input 
                        id="modalCheck" 
                        type="checkbox"
                        name="modalOpen"
                        checked={props.modalOpen}
                        onChange={props.handleModal}
                    />
                    <label htmlFor="modalCheck"/>
                </div>
                <div id="modalImage" >
                    <LazyLoadImage
                        src={require("../images/"+ props.modalSrc.data.collection + "/" + props.modalSrc.src + ".jpg")}
                        effect="blur"
                        wrapperClassName="image"
                    />
                </div>
                <div id="galleryNav">
                    <button id="dec" onClick={props.navGallery}/>
                    <button id="adv" onClick={props.navGallery}/>
                </div>
                <div id="modalDesc">
                    {props.modalSrc.data.type === "shop"
                        ? 
                        <div id="shopElements">
                            <h2>{props.modalSrc.name}</h2>
                            <h3>${props.modalSrc.product.price/100.00}</h3>
                            <h3>in stock:{props.modalSrc.product.inventory.quantity}</h3>
                        </div>
                        :
                        <p>{props.modalSrc.data.desc}</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Modal;