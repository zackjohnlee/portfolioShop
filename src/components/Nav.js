import React from 'react';
import {NavLink} from 'react-router-dom';

const Nav = props => {
    return (
        <nav>
            <div id="toggle">
                <input 
                    id="navToggle" 
                    type="checkbox"
                    name="menuOpen"
                    checked={props.menuOpen}
                    onChange={props.handleMenu}/>
                <label htmlFor="navToggle">
                    <div className="menu-bar"></div>
                    <div className="menu-bar"></div>
                    <div className="menu-bar"></div>
                </label>
                <div className="expandee">
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