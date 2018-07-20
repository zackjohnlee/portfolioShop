import React from 'react';
import {galleryData} from '../data/galleryData';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Content = (props) => {
    let tiles = galleryData.map((tile) =>{
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
            {tiles}
        </div>
    );
};

export default Content;