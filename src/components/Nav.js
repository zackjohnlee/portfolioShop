import React from 'react';
import {NavLink} from 'react-router-dom';

const Nav = props => {

    // let scrollSpeed = window.scrollY;
    // let winWidth = props.window.width;
    // let winHeight = props.window.height;
    // let scrollTop = winHeight-scrollSpeed;
    //let checked = props.checked;
    // let componentTop = window;
    // console.log(componentTop);

    // function scrollFix(){
    //     if(scrollTop <= (winHeight/2)){
    //         return 5;
    //     }else{
    //         return 350-(scrollSpeed/10);
    //     }
    // };

    // let styles = {
    //     right: props.renav&&!checked ? (-winWidth+60)/2 : '0',
    //     transform: checked ? "translate3d(0,"+winHeight/1.2+"px, 0)" : "translate3d(0,"+scrollFix()+"px, 0)"
    // };

    return (
        <nav>
            <div id="toggle">
                <input 
                    id="navToggle" 
                    type="checkbox"
                    checked={props.checked}
                    onChange={props.handleCheck}/>
                <label htmlFor="navToggle">
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