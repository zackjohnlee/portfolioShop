import React from 'react';
import {galleryData} from '../data/galleryData'

const Content = () => {
    let tiles = galleryData.map((tile) =>{
        return tile.images.map((image) => {
            return <div className={"tile"} key={tile.id}>
                        <img key={image.id} src={require("../images/"+ tile.collection + "/" + image.src + ".jpg")} />
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