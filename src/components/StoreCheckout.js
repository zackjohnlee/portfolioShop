import React from 'react';
import {Elements} from 'react-stripe-elements';

import CheckoutForm from './CheckoutForm';
import Cart from './Cart';

const StoreCheckout = (props) => {
    return (
        <div id="paymentModal">
            <div id="payCloseLabel">
                <input 
                    id="paymentClose" 
                    type="checkbox"
                    name="paymentOpen"
                    checked={props.paymentOpen}
                    onChange={props.togglePayment}
                />
                <label htmlFor="paymentClose"/>
            </div>
            <h1 id="cartTitle">My Cart</h1>
            <Cart
                data={props.data}
                cart={props.cartContents}
                updateItem={props.updateItem}
            />
            <Elements>
                <CheckoutForm/>
            </Elements>
        </div>
    );
};

export default StoreCheckout;