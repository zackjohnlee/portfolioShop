import React from 'react';
import {Elements} from 'react-stripe-elements';

import CheckoutForm from './CheckoutForm';

const StoreCheckout = () => {
    return (
        <Elements>
            <CheckoutForm/>
        </Elements>
    );
};

export default StoreCheckout;