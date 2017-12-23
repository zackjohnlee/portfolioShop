import React from 'react';
import ScrollWrap from './ScrollWrap';

const Header = props => {

    let scrollSpeed = window.scrollY;

    let styles = {
        transform: "translate3d(0, -"+scrollSpeed/10+"px, 0)",
        opacity: 2-(scrollSpeed/300)
    };

    let backStyles = {
        transform: "translate3d(0, "+scrollSpeed/10+"px, 0)",
    };

    return (
        <header className="App-header">
            <div id="Background" style={backStyles}></div>
            <h1 style={styles}>zack john lee</h1>
        </header>
    );
};

export default Header;