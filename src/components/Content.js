import React from 'react';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Modal from "./Modal"

const Content = (props, scrollPosition) => {
    let tiles = props.data.map((tile) =>{
        return tile.images.map((image) => {
            return <div className={"tile"}
                        onClick={() => props.click(tile.collection, image.src, image.name)} 
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
    
    // const scrollBackTo = (scroll) =>{
    //     window.scrollTo(0, scroll);
    //     scrollTo = false;
    // }

    // let styles = {};
    // let scrollBack;
    // let scrollTo;
    // if(props.modalOpen || props.menuOpen){

    //     scrollTo = false;
    //     if(!scrollTo){
    //         const scroll = window.scrollY;
    //         console.log(scroll);
    //         scrollBack = scroll;
    //         scrollTo = true;
    //         styles = {position: "fixed"};
    //     }
    //     console.log("scrollTo", scrollTo);
    // }
    // console.log("scrollTo", scrollTo);

    // if(scrollTo && !props.modalOpen) {
    //     scrollBackTo(scrollBack);
    //     console.log("scrollBack", scrollBack);
    // }
    

    return (
        <div id="content">
            {props.modalOpen 
                ?
                <Modal
                    data={props.data}
                    modalOpen={props.modalOpen}
                    modalSrc={props.modalSrc}
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