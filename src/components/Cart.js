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
                    updateItem={props.updateItem}
                />
    });
    return (
        <div id="cart">
            {cartItems}
            <div id="cartSummary">
                <p>items: {props.cart.itemCount}</p>
                <p>total: ${props.cart.total/100}</p>
            </div>
        </div>
    );
};

export default Cart;