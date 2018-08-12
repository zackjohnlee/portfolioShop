import React from 'react';

const CartItem = (props) => {
    return (
        <div id="cartItem">
            <h1>{props.name}</h1>
            <h2 id="price">${props.price/100}</h2>
            <p>+</p>
            <h2 id="qty">{props.quantity}</h2>
            <p>-</p>
        </div>
    );
};

export default CartItem;