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
			checked: false,
			window: {
				width: 0,
				height: 0
			}
		};

		this.toggleCheckbox = this.toggleCheckbox.bind(this);
		this.updateDimensions = this.updateDimensions.bind(this);

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
					<Content/>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
