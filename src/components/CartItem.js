import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const CartItem = (props) => {
    return (
        <div id="cartItem">
            <div id="itemImage">
                <LazyLoadImage
                    src={require("../images/store/lores/" + props.name + ".jpg")}
                    effect="blur"
                    wrapperClassName="image"
                />
            </div>
            <h1>{props.name}</h1>
            <h2 id="price">${props.price/100}</h2>
            <p>+</p>
            <h2 id="qty">{props.quantity}</h2>
            <p>-</p>
        </div>
    );
};

export default CartItem;