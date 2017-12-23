import React from 'react';
import {NavLink} from 'react-router-dom';

const Nav = props => {

    let scrollSpeed = window.scrollY;
    let winWidth = props.window.width;
    let winHeight = props.window.height;
    let scrollTop = winHeight-scrollSpeed;
    let checked = props.checked;
    console.log("hello");
    //console.log(window.scrollY);
    // function scrollFix(){
    //     if(scrollTop <= 5){
    //         return 5;
    //     }else if(scrollTop <= (winHeight/2)){
    //         return (winHeight)-(scrollSpeed);
    //     }else{
    //         return (winHeight/1.8)-(scrollSpeed/10);
    //     }
    // };

    // let animClass = "";
    // let prenav = false;

    // function slideClass(){
    //     animClass += "slide";
    //     setTimeout(function(){
    //         console.log("fired");
    //         animClass = "none";
    //     }, 1000);
    // };

    // if(props.renav != prenav){
    //     prenav = true;
    //     slideClass();
    // }else if(props.renav != prenav){
    //     slideClass();
    //     prenav = false;
    // }

    function scrollFix(){
        if(scrollTop <= (winHeight/2)){
            return 5;
        }else{
            return (350)-(scrollSpeed/10);
        }
    };

    let styles = {
        right: props.renav&&!checked ? (-winWidth+60)/2 : '0',
        transform: checked ? "translate3d(0,"+winHeight/1.2+"px, 0)" : "translate3d(0,"+scrollFix()+"px, 0)"
    };

    return (
        <nav>
            <div id="toggle">
                <input 
                    id="navToggle" 
                    type="checkbox"
                    checked={props.checked}
                    onChange={props.handleCheck}/>
                <label htmlFor="navToggle" className={props.renav ? "slide" : ""} style={styles}>
                    <div className="menu-bar"></div>
                    <div className="menu-bar"></div>
                    <div className="menu-bar"></div>
                </label>
                <div className="expandee" onClick={props.handleCheck}>
					<ul>
						<li><NavLink exact to="/">WORKS</NavLink></li>
						<li><NavLink to="/about">ABOUT</NavLink></li>
						<li><NavLink to="/shop">SHOP</NavLink></li>
					</ul>
				</div>
            </div>
        </nav>
    );
};

export default Nav;