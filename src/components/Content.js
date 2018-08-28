import React, { Component } from 'react';
import Modal from './Modal'
import {Motion, StaggeredMotion, spring} from 'react-motion';
import range from 'lodash.range';

class Content extends Component {
	constructor(props) {
        super(props);

        let options = {
            root: null,
            rootMargin: '150px',
            threshold: 1.0
        };
        this.observer = new IntersectionObserver(this.intersectionObserved, options);
	}
	
	componentDidMount() {
        let targets = document.querySelectorAll('.tile');
        targets.forEach((target) => {
            this.observer.observe(target);
        });
        {console.log(this.props.tiles)}
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
                entry.target.className = 'tile';
                entry.target.appendChild(newImg);
                // newImg.className = 'image fade-in';

                // Stop observing once lazy-loaded
                observer.unobserve(entry.target);
            }
        });
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
        //             // <div className={"tile"}
        //             //     onClick={() => this.props.click(data)} 
        //             //     key={image.src}
        //             //     data-source={require("../images/"+ tile.collection + "/lores/" + image.src + ".jpg")}>
        //             // </div>
        //         )
        //     });
        // });
        
		return (
            <StaggeredMotion
                defaultStyles={range(this.props.tiles.length).map(()=>(
                    {
                        y: 100,
                        opacity: 0
                    }
                ))}
                styles={prevInterpolatedStyles => 
                    prevInterpolatedStyles.map((_, i) => {
                        const config = {stiffness: 610, damping: 50};
                        const config2 = {stiffness: 300, damping: 50};
                        return i === 0
                        ?{
                            y: spring(0, config),
                            opacity: spring(1)
                        }:{
                            y: spring(prevInterpolatedStyles[i - 1].y, config),
                            opacity: spring(prevInterpolatedStyles[i - 1].opacity)
                        }
                    })
                }>
            {interpolatingStyles =>
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
                    {interpolatingStyles.map((style, i) =>
                        {return (
                            <div
                                key={this.props.tiles[i].src}
                                className="tile"
                                style={{
                                    transform: `translateY(${style.y}vh)`,
                                    opacity: style.opacity
                                }}
                                onClick={() => this.props.click(this.props.tiles[i])}
                                data-source={require("../images/"+ this.props.tiles[i].col + "/lores/" + this.props.tiles[i].src + ".jpg")}>
                            </div>
                        );}
                    )}
                </div>
                }
            </StaggeredMotion>
		);
	}
}

export default Content;
