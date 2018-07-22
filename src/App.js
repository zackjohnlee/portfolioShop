import React, { Component } from 'react';
import {
	BrowserRouter,
	Route,
	Switch
} from 'react-router-dom';

import {galleryData} from './data/galleryData';

import './css/App.css';
import Content from "./components/Content";
import Nav from "./components/Nav";
import Header from "./components/Header";


class App extends Component {
	constructor(props, context) {
		super(props, context);
		this.state={
			checked: false,
			modalOpen: false,
			modalSrc: {
				collection: "",
				src: ""
			},
			window: {
				width: 0,
				height: 0
			}
		};

		this.toggleCheckbox = this.toggleCheckbox.bind(this);
		this.updateDimensions = this.updateDimensions.bind(this);
		this.imageClick = this.imageClick.bind(this);
		this.toggleModal = this.toggleModal.bind(this);

	}
	
	componentDidMount() {
		this.updateDimensions();
		window.addEventListener('resize', this.updateDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions);
	}

	updateDimensions(){
		this.setState({
			window: {
				width: window.outerWidth,
				height: window.outerHeight
			}
		});
	}

	toggleCheckbox(){
		this.setState({
			checked: !this.state.checked
		});
	}

	toggleModal(){
		this.setState({
			modalOpen: !this.state.modalOpen
		});
	}

	imageClick(col, src){
		this.setState({
			modalSrc: {
				collection: col,
				src: src
			},
			modalOpen: true
		});
	}

	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<div ref="headNav">
						<Header/>
						<Nav
							window={this.state.window} 
							handleCheck={this.toggleCheckbox}
							checked={this.state.checked}
						/>
					</div>
					<Content
						data={galleryData}
						click={this.imageClick}
						modalOpen={this.state.modalOpen}
						handleModal={this.toggleModal}
						mainSrc={this.state.modalSrc.src}
						collection={this.state.modalSrc.collection}
					/>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
