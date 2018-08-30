import React, { Component } from 'react';
import Modal from './Modal'
import {Motion, StaggeredMotion, spring} from 'react-motion';
import range from 'lodash.range';

class Content extends Component {
	constructor(props) {
        super(props);

        let initialTiles = this.props.tiles.slice(0, 10);
        console.log(initialTiles);

        this.state={
            tiles: this.props.tiles,
            tilesLoaded: initialTiles,
            curIndex: 0,
            amtToLoad: 10,
            isLoading: false
        };

        let options = {
            root: null,
            rootMargin: '50px',
            threshold: 1.0
        };

        this.observer = new IntersectionObserver(this.intersectionObserved, options);
        console.log(this.state.tilesLoaded);
        this.loadingTiles = this.loadingTiles.bind(this);
        this.intersectionObserved = this.intersectionObserved.bind(this);
	}
	
	componentDidMount() {
        let targets = document.querySelectorAll('.tile');
        this.observer.observe(targets[this.state.tilesLoaded.length-1]);
        console.log(targets[this.state.tilesLoaded.length-1]);
        // this.observer.observe(targets);

    }

    loadingTiles(e) {
        console.log("fired");
        let allTiles = this.state.tiles;
        console.log("allTiles:", allTiles);
        let sliceIdx = this.state.curIndex + this.state.amtToLoad;
        console.log("sliceIndex:", sliceIdx);
        let nextTiles = allTiles.slice(this.state.curIndex, sliceIdx);
        console.log("nextTiles:", nextTiles);
        let loadTiles = this.state.tilesLoaded;
        console.log("loadTiles:", loadTiles);
        loadTiles.push(nextTiles)
        this.setState({
            tilesLoaded: loadTiles,
            curIndex: sliceIdx
        });
    }
    
    intersectionObserved(entries, observer) {
        this.loadingTiles;
        console.log("called");
        // entries.forEach((entry) => {
        //     if (entry.isIntersecting) {
        //         /*
        //          * TODO: not 100% satisfied with this technique,
        //          * but otherwise would need a lot of heavy lifting
        //          * to put each tile props and visibility, as
        //          * determined by intersectionObserver, into
        //          * Content state. Probably a lot of refs.
        //          */
        //         
        //         // let imgSrc = entry.target.getAttribute('data-source');
        //         // let newImg = document.createElement('img');
        //         // newImg.src = imgSrc;
        //         // newImg.className = 'image';
        //         // entry.target.className = 'tile slide-in';
        //         // entry.target.appendChild(newImg);
        //         // newImg.className = 'image fade-in';

        //         // Stop observing once lazy-loaded
        //         // observer.unobserve(entry.target);
        //     }
        // });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.modalOpen && !this.props.modalOpen) {
            // only bother trying to work on the `top` css property if it's
			// at least 3 characters long so that we can perform the substr()
			// and if it's shorter than that, it's an empty string anyway
            let px = '-' + prevProps.scrollY + 'px';
            console.log('top px:', px);
			if (px.length > 2) {
				
				// turn that style string into an integer
				px = parseInt(px.substr(0,px.length - 2));

				// test that the integer is negative:
				// the scrollTo() isn't going to make sense unless it is, and we
				// can safely ignore the case where it's actually 0 because
				// then we're already done
				if (px < 0) {
					window.scrollTo({
						top: -px,
						behavior: 'instant'
					});
				}
			}
        }
    }

	render() {
        
        // let tiles = this.props.data.map((tile) => {
        //     return tile.images.map((image) => {
        //         let data = {
        //             col: tile.collection,
        //             src: image.src,
        //             name: image.name,
        //             desc: image.desc || null
        //         }
        //         return (
        //             <div className={"tile"}
        //                 onClick={() => this.props.click(data)} 
        //                 key={image.src}
        //                 data-source={require("../images/"+ tile.collection + "/lores/" + image.src + ".jpg")}>
        //                 <img className={"image"} src={require("../images/"+ tile.collection + "/lores/" + image.src + ".jpg")}/>
        //             </div>
        //         )
        //     });
        // });

        let tiles = this.state.tilesLoaded.map((tile)=>{
            return (
                <div className={"tile"}
                    onClick={() => this.props.click(tile)} 
                    key={tile.src}
                    data-source={require("../images/"+ tile.col + "/lores/" + tile.src + ".jpg")}>
                    <img className={"image"} 
                        src={require("../images/"+ tile.col + "/lores/" + tile.src + ".jpg")}/>
                </div>
            )
        });
        
		return (
            <div
                id="content"
                className={this.props.modalOpen ? 'modal-open' : ''}
                style={{
                    top: this.props.modalOpen ?
                        '-' + window.scrollY + 'px' :
                        '0',
                    paddingTop: '10vh'
                }}
                >
                {this.props.modalOpen 
                    ?
                    <Modal
                        data={this.props.data}
                        modalSrc={this.props.modalSrc}
                        modalOpen={this.props.modalOpen}
                        toggleModal={this.props.toggleModal}
                        navGallery={this.props.handleNav}
                        paymentOpen={this.props.paymentOpen}
                        buyNow={this.props.buyNow}
                        addItem={this.props.addItem}
                    /> 
                    :
                    null
                }
                {tiles}
            </div>
		);
	}
}

export default Content;
