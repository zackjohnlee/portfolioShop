import React from 'react';
import {Elements} from 'react-stripe-elements';

import CheckoutForm from './CheckoutForm';
import Cart from './Cart';

const StoreCheckout = (props) => {
    return (
        <div id="paymentModal">
            <input 
                id="paymentClose" 
                type="checkbox"
                name="paymentOpen"
                checked={props.paymentOpen}
                onChange={props.togglePayment}
            />
            <label htmlFor="paymentClose"/>
            <Cart
                cart={props.cartContents}/>
            <Elements>
                <CheckoutForm/>
            </Elements>
        </div>
    );
};

export default StoreCheckout;