import React, { Component } from 'react';
import Modal from './Modal'

class Content extends Component {
	constructor(props) {
        super(props);
        
        let options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0
        };
        this.observer = new IntersectionObserver(this.intersectionObserved, options);
	}
	
	componentDidMount() {
        let targets = document.querySelectorAll('.tile');
        targets.forEach((target) => {
            this.observer.observe(target);
        });
    }
    
    intersectionObserved(entries, observer) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                /*
                 * TODO: not 100% satisfied with this technique,
                 * but otherwise would need a lot of heavy lifting
                 * to put each tile props and visibility, as
                 * determined by intersectionObserver, into
                 * Content state. Probably a lot of refs.
                 */
                let imgSrc = entry.target.getAttribute('data-source');
                let newImg = document.createElement('img');
                newImg.src = imgSrc;
                newImg.className = 'image';
                entry.target.appendChild(newImg);

                // Stop observing once lazy-loaded
                observer.unobserve(entry.target);
            }
        });
    }

	render() {
        let tiles = this.props.data.map((tile) => {
            return tile.images.map((image) => {
                let data = {
                    col: tile.collection,
                    src: image.src,
                    name: image.name,
                    desc: image.desc || null
                }
                return (
                    <div className={"tile"}
                        onClick={() => this.props.click(data)} 
                        key={image.src}
                        data-source={require("../images/"+ tile.collection + "/lores/" + image.src + ".jpg")}>
                    </div>
                )
            });
        });
    
		return (
            <div id="content">
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
