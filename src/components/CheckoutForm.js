import React, { Component } from 'react';
import config from '../config';
import {
    injectStripe, 
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    PostalCodeElement
} from 'react-stripe-elements';

const styles = {base: {fontSize: '18px', fontWeight: '200'}};

class CheckoutForm extends Component {
    handleSubmit = (ev) => {
        ev.preventDefault();
        this.props.stripe.createToken().then(({token}) => {
            console.log('Received Stripe token:', token);
        });
    }

    render() {
        return (
            <div id="checkoutModal">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Card details
                        <CardNumberElement id="cardNumber" style={styles} />
                        <CardExpiryElement id="cardExpiry" style={styles} />
                        <CardCVCElement id="cardCVC" style={styles} />
                        <PostalCodeElement id="zipCode" style={styles} />
                    </label>
                </form>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);