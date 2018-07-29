import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


const Modal = (props) => {
    return (
        <div id="modal">
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
                    src={require("../images/"+ props.collection + "/" + props.mainSrc + ".jpg")}
                    effect="blur"
                    wrapperClassName="image"
                />
            </div>
            <div id="galleryNav">
                <button id="adv" onClick={props.navGallery}></button>
                <button id="dec" onClick={props.navGallery}></button>
            </div>
            <div id="modalDesc">
                <p>{props.desc}</p>
            </div>
        </div>
    );
};

export default Modal;