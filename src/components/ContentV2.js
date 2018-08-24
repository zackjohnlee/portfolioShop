import React, { Component } from 'react';

import 'react-lazy-load-image-component/src/effects/blur.css';
import Modal from "./Modal"

class ContentV2 extends Component {
	constructor(props) {
		super(props);
		// this.state = {
		// };
	}
	
	componentDidMount() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    };

    let callback = function callback(entries, observer) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let imgSrc = entry.target.getAttribute('data-source');
            let newImg = document.createElement('img');
            newImg.src = imgSrc;
            newImg.className = 'image';
            entry.target.appendChild(newImg);

            // Stop observing once lazy-loaded
            observer.unobserve(entry.target);
          }
        });
    };

    let observer = new IntersectionObserver(callback, options);
    let targets = document.querySelectorAll('.tile');
    targets.forEach((target) => {
      observer.observe(target);
    });
	}

	render() {
    let tiles = this.props.data.map((tile) =>{
      return tile.images.map((image) => {
        let data = {
          col: tile.collection,
          src: image.src,
          name: image.name,
          desc: image.desc || null
        }
        return <div className={"tile"}
                  onClick={() => this.props.click(data)} 
                  key={image.src}
                  data-source={require("../images/"+ tile.collection + "/lores/" + image.src + ".jpg")}>
                  {/* <LazyLoadImage
                      key={image.src}
                      src={require("../images/"+ tile.collection + "/lores/" + image.src + ".jpg")}
                      effect="blur"
                      scrollPosition={scrollPosition}
                      wrapperClassName="image"/> */}
                    
                </div>
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

export default ContentV2;
