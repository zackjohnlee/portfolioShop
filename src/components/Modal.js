import React from 'react';

const Modal = (props) => {
    let collection = props.collection;
    let src = props.mainSrc;
    console.log(collection);
    console.log(src);
    let modalGallery = props.data.filter((gallery) => {
        return gallery.collection === collection;
    });
    console.log(modalGallery);
    return (
        <div id="modal">
            <div id="modalImage">
            </div>
        </div>
    );
};

export default Modal;