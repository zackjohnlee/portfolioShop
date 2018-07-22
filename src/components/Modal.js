import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Modal = (props) => {
    let collection = props.collection;
    let displayImg = props.mainSrc;
    let images = [];

    let modalGallery = props.data.filter((gallery) => {
        return gallery.collection === collection;
    });

    let galleryImages = modalGallery[0];

    if(props.modalOpen){
        images = galleryImages.images;
    } else {
        return images = [];
    }

    console.log(images);

    return (
        <div id="modal">
            <div id="modalToggle">
                <input 
                    id="modalCheck" 
                    type="checkbox"
                    checked={props.modalOpen}
                    onChange={props.handleModal}
                />
                <label htmlFor="modalCheck"/>
            </div>
            <div id="modalImage" >
                <LazyLoadImage
                    src={require("../images/"+ collection + "/" + displayImg + ".jpg")}
                    effect="blur"
                />
            </div>
        </div>
    );
};

export default Modal;