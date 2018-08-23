import React from 'react';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Modal from "./Modal"

const Content = (props, scrollPosition) => {
    let tiles = props.data.map((tile) =>{
        return tile.images.map((image) => {
            let data = {
                col: tile.collection,
                src: image.src,
                name: image.name,
                desc: image.desc || null
            }
            return <div className={"tile"}
                        onClick={() => props.click(data)} 
                        key={image.src}>
                        <LazyLoadImage
                            key={image.src}
                            src={require("../images/"+ tile.collection + "/lores/" + image.src + ".jpg")}
                            effect="blur"
                            scrollPosition={scrollPosition}
                            wrapperClassName="image"/>
                    </div>
        });
    });

    return (
        <div id="content">
            {props.modalOpen 
                ?
                <Modal
                    data={props.data}

                    modalSrc={props.modalSrc}
                    modalOpen={props.modalOpen}
                    toggleModal={props.toggleModal}
                    navGallery={props.handleNav}
                    
                    paymentOpen={props.paymentOpen}
                    buyNow={props.buyNow}
                    addItem={props.addItem}
                /> 
                :
                null
            }
            {tiles}
        </div>
    );
};

export default trackWindowScroll(Content);