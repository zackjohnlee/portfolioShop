import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Modal from "./Modal"

const Content = (props) => {
    let tiles = props.data.map((tile) =>{
        return tile.images.map((image) => {
            return <div className={"tile"}
                        onClick={() => props.click(tile.collection, image.src)} 
                        key={image.src}>
                        <LazyLoadImage
                            src={require("../images/"+ tile.collection + "/lores/" + image.src + ".jpg")}
                            effect="blur"
                            wrapperClassName="image"/>
                    </div>
        });
    });
    return (
        <div id="content">
            <Modal
                data={props.data}
                modalOpen={props.modalOpen}
				mainSrc={props.mainSrc}
				collection={props.collection}
            />
            {tiles}
        </div>
    );
};

export default Content;