import React from 'react';
import CartItem from './CartItem';

const Cart = (props) => {
    let cartItems = props.cart.map((item)=>{
        return <CartItem
                    name={item.id}
                    price={item.price}
                    quantity={item.quantity}
                />
    });
    return (
        <div>
            {cartItems}
        </div>
    );
};

export default Cart;