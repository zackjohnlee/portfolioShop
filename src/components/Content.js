import React from 'react';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Modal from "./Modal"

const Content = (props, scrollPosition) => {
    let tiles = props.data.map((tile) =>{
        return tile.images.map((image) => {
            return <div className={"tile"}
                        onClick={() => props.click(tile.collection, image.src)} 
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

    // let styles = {};
    // // let scroll = window.scrollY;
    // // console.log(scroll);
    // if(props.modalOpen || props.menuOpen){
    //     const scroll = window.scrollY;
    //     window.scrollTo(0, scroll);
    //     styles = {
    //         // top: "-" + scroll + "px",
    //         position: "fixed"
    //     };
    // } 
    // else{
    //     styles = {
    //         position: "relative",
    //         // top: "10vh"
    //     };
    // }

    return (
        <div id="content">
            {props.modalOpen 
                ?
                <Modal
                    data={props.data}
                    modalOpen={props.modalOpen}
                    handleModal={props.handleModal}
                    mainSrc={props.mainSrc}
                    collection={props.collection}
                    desc={props.desc}
                    scrollPosition={scrollPosition}
                    navGallery={props.handleNav}
                /> 
                :
                null
            }
            {tiles}
        </div>
    );
};

export default trackWindowScroll(Content);