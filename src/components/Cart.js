import React from 'react';
import CartItem from './CartItem';

const Cart = (props) => {
    let cartItems = props.cart.items.map((item)=>{
        return <CartItem
                    key={item.id}
                    data={props.data}
                    name={item.id}
                    price={item.price}
                    quantity={item.quantity}
                />
    });
    return (
        <div id="cart">
            {cartItems}
        </div>
    );
};

export default Cart;