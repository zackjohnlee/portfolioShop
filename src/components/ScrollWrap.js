import React, { Component } from 'react';

class ScrollWrap extends Component {
    componentDidMount() {
		if (this.props.onWindowScroll) window.addEventListener("scroll", this.handleScroll);
	}

	componentWillUnmount() {
        if (this.props.onWindowScroll) window.removeEventListener("scroll", this.handleScroll);
    }
    
    handleScroll(event){
        console.log("scrollWrapper");
        if (this.props.onWindowScroll) this.props.onWindowScroll(event);
    }

    render() {
        return this.props.children;
    }
}

export default ScrollWrap;