import React, { Component } from 'react';
import {
	BrowserRouter,
	Route,
	Switch
} from 'react-router-dom';

import './css/App.css';
import Content from "./components/Content";
import Nav from "./components/Nav";
import Header from "./components/Header";

class App extends Component {
	constructor(props, context) {
		super(props, context);
		this.state={
			renav: false,
			scrollTop: 0,
			checked: false,
			window: {
				width: 0,
				height: 0
			}
		}

		this.updateDimensions = this.updateDimensions.bind(this);
		//this.handleScroll = this.handleScroll.bind(this);
		this.toggleCheckbox = this.toggleCheckbox.bind(this);

	}
	
	componentDidMount() {
		this.updateDimensions();
		//window.addEventListener('scroll', this.handleScroll, true);
		window.addEventListener('resize', this.updateDimensions);
	}

	componentWillUnmount() {
		//window.removeEventListener('scroll', this.handleScroll);
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

	// handleScroll(){
	// 	let top = window.scrollY;
	// 	if(top >= this.state.window.height/2){
	// 		this.setState({
	// 			renav: true
	// 		});
	// 	}else{
	// 		this.setState({
	// 			renav: false
	// 		});
	// 	}
	// }

	toggleCheckbox(){
		this.setState({
			checked: !this.state.checked
		});
	}

	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Header 
						scroll={this.state.scrollTop}
					/>
					<Nav 
						window={this.state.window} 
						scroll={this.state.scrollTop} 
						
						renav={this.state.renav}
						handleCheck={this.toggleCheckbox}
						checked={this.state.checked}
					/>
					<Content/>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
