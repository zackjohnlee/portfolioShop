import React, { Component } from 'react';
import Modal from './Modal'
import Tile from './Tile';
import Filter from './Filter';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import isequal from 'lodash.isequal';
import isEmpty from 'lodash.isempty';
import without from 'lodash.without';




class Content extends Component {
	constructor(props) {
        super(props);

        //gather all tiles compared against filter
        this.tiles = this.gatherTiles([]);
        
        //load the first 10 tiles (0-9)
        let initialTiles = this.tiles.slice(0, 20); 

        this.state={
            tiles: this.tiles,
            tilesLoaded: initialTiles,
            curIndex: initialTiles.length,
            amtToLoad: 5,
            isLoading: false,
            moreToLoad: true,
            filter: []
        };

        let options = {
            root: null,
            rootMargin: '',
            threshold: 0.5
        };


        this.loadingRef = React.createRef();
        //create a refs array for each available image to access DOM of tile
        this.ref = [];
        for(let i=0; i<this.state.tiles.length; i++){
            this.ref[i] = React.createRef();
        }

        this.blurTile = this.blurTile.bind(this);
        this.pushTile = this.pushTile.bind(this);
        this.gatherTiles = this.gatherTiles.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.loadingTiles = this.loadingTiles.bind(this);
        this.observeTarget = this.observeTarget.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        this.intersectionObserved = this.intersectionObserved.bind(this);

        this.observer = new IntersectionObserver(this.intersectionObserved, options);
	}
	
	componentDidMount() {
        this.observeTarget();
    }

    handleFilter(supr, sub){
        if (0 === sub.length) {
            return true;
        }
        return sub.every((value) => {
            return (supr.indexOf(value) >= 0);
        });
    }

    updateFilter(e){
		let filters = this.state.filter;
		let isChecked = e.target.checked;
		let filterName = e.target.value;
		if(isChecked){
			filters = filters.concat(filterName);
			console.log(filters);
		}else{
			filters = without(filters, filterName);
			console.log(filters);
		};
        let tiles = this.gatherTiles(filters);
        let initialTiles = tiles.slice(0, 10);
        this.setState({
            tiles: tiles,
            tilesLoaded: initialTiles,
            curIndex: initialTiles.length,
            filter: filters,
            moreToLoad: true
        });
    }
    
    gatherTiles(filter){
        let tiles = [];
        this.props.data.forEach(tile=>{
            if(isEmpty(filter)){
                tiles = tiles.concat(this.pushTile(tile));
            }
            else if(this.handleFilter(tile.type, filter)){
                tiles = tiles.concat(this.pushTile(tile));
            }
        });
        return tiles;
    }

    pushTile(tile){
        let tiles = [];
        tile.images.forEach(image=>{
            let data = {
                col: tile.collection,
                type: tile.type,
                src: image.src,
                name: image.name,
                desc: image.desc || null,
                isLoaded: false
            }
            tiles.push(data);
        });
        return tiles;
    }

    loadingTiles() {
        if(this.state.moreToLoad && (this.state.tiles.length > 0)){
            let allTiles = this.state.tiles;
            let sliceIdx = this.state.curIndex + this.state.amtToLoad;
            //if allTiles less than amtToLoad, set index to last tile
            if (sliceIdx > allTiles.length){
                sliceIdx = allTiles.length;
                this.setState({moreToLoad: false});
            }
            let nextTiles = allTiles.slice(this.state.curIndex, sliceIdx);
            let loadTiles = this.state.tilesLoaded;
            let allTheTiles = loadTiles.concat(nextTiles)
            this.setState({
                tilesLoaded: allTheTiles,
                curIndex: sliceIdx
            });
        }
    }

    observeTarget(){
        if(this.state.tilesLoaded.length > 0){
            // let targets = document.querySelectorAll('.tile');
            // this.observer.observe(targets[this.state.tilesLoaded.length-1]);
            let targets = this.loadingRef.current;
            this.observer.observe(this.loadingRef.current);
            console.log(targets);
        }
    }
    
    intersectionObserved(entries, observer) {
        if(entries[0].isIntersecting){
            console.log("it intersected!");
            console.log(entries[0]);
            this.loadingTiles();
            // observer.unobserve(entries[0].target);
            // this.state.moreToLoad ? this.observeTarget() : null;
        }
    }

    blurTile(ref){
		// !this.state.modalOpen
		// 	?
		// 	ref.current.style.filter = `blur(10px)`
		// 	:
		// 	ref.current.style.filter = `blur(0)`
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("it updated!");
        // this.observeTarget();
        // if (prevProps.modalOpen && !this.props.modalOpen) {
        //     // this.props.modalSrc.curRef.ref.current.style.filter = `blur(0)`;
        //     // only bother trying to work on the `top` css property if it's
		// 	// at least 3 characters long so that we can perform the substr()
		// 	// and if it's shorter than that, it's an empty string anyway
        //     let px = '-' + prevProps.scrollY + 'px';
        //     console.log('top px:', px);
		// 	if (px.length > 2) {
				
		// 		// turn that style string into an integer
		// 		px = parseInt(px.substr(0,px.length - 2));

		// 		// test that the integer is negative:
		// 		// the scrollTo() isn't going to make sense unless it is, and we
		// 		// can safely ignore the case where it's actually 0 because
		// 		// then we're already done
		// 		if (px < 0) {
		// 			window.scrollTo({
		// 				top: -px,
		// 				behavior: 'instant'
		// 			});
		// 		}
		// 	}
        // }
    }

	render() {

        //TILE FACTORY
        let tileload;
        tileload = this.state.tilesLoaded.map((tile, i)=>{
            let delayIdx;
            if(i>=20){
                let divisor = Math.floor(i/10);
                delayIdx = (i - (divisor*10))/2;
            }else{
                delayIdx = i/2;
            }
            return (
                <CSSTransition
                    key={`${i}-${tile.src}`}
                    classNames="slide-in"
                    timeout={0}
                    appear={true}
                >
                    <Tile 
                        tile={tile}
                        style={{
                            transition:
                                `transform 500ms ease-out ${delayIdx*100}ms,
                                opacity 500ms ease-out ${delayIdx*100}ms,
                                filter 300ms ease-in-out`
                        }}
                        blur={this.blurTile}
                        ref={this.ref[i]}
                        click={this.props.click} 
                        key={tile.src}
                        src={require("../images/"+ tile.col + "/lores/" + tile.src + ".jpg")}>
                    </Tile>
                </CSSTransition>
            )
            
        });
        
        
		return (
            
                <div
                    id="content"
                    // className={this.props.modalOpen ? 'modal-open' : ''}
                    style={{
                        top: this.props.modalOpen ?
                            '-' + window.scrollY + 'px' :
                            '0',
                        paddingTop: '10vh'
                    }}
                >
                    {this.props.modalOpen &&
                        <TransitionGroup component={null}>
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
                        </TransitionGroup>
                    }
                    <TransitionGroup component={null} appear={true}>
                        {this.state.tiles.length === 0
                            ? <span>Couldn't find anything...yet</span>
                            : tileload
                        }
                    </TransitionGroup>
                    <div id="loading"
                        ref={this.loadingRef}
                    >
                        <span>Loading...</span>
                    </div>
                    <Filter
                        filter={this.updateFilter}
                        filterOpen={this.props.filterOpen}
                        handleFilter={this.props.handleFilter}
                    />
                </div>
            
		);
	}
}

export default Content;
