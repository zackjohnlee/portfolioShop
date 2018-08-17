import React, { Component } from 'react';
import config from '../config';
import {
    injectStripe, 
    CardElement,
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    PostalCodeElement
} from 'react-stripe-elements';

const styles = {base: {fontSize: '18px', fontWeight: '200'}};

class CheckoutForm extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    
    handleSubmit = (ev) => {
        ev.preventDefault();
        this.props.stripe.createToken({
            name: this.state.name,
            address_line1: this.state.addressLine1,
            address_line2: this.state.addressLine2,
            address_city: this.state.city,
            address_state: this.state.state,
            metadata: {email: this.state.email}
        }).then(({token}) => {
            console.log('Received Stripe token:', token);
        });
    }

    handleInput(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div id="checkoutModal">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Card details
                    </label>
                    <div id="cardElements">
                        <input 
                            style={styles} 
                            type="text" 
                            id="cardholderName" 
                            name="name" 
                            placeholder="Name on Card"
                            onChange={(e)=>this.handleInput(e)}
                            onBlur={(e)=>this.handleInput(e)}/>
                        <input 
                            style={styles} 
                            type="text" 
                            id="email" 
                            name="email" 
                            placeholder="Email"
                            onChange={(e)=>this.handleInput(e)}
                            onBlur={(e)=>this.handleInput(e)}/>
                        <input 
                            style={styles} 
                            type="text" 
                            id="addressLine1" 
                            name="addressLine1" 
                            placeholder="Address Line 1"
                            onChange={(e)=>this.handleInput(e)}
                            onBlur={(e)=>this.handleInput(e)}/>
                        <input 
                            style={styles} 
                            type="text" 
                            id="addressLine2" 
                            name="addressLine2" 
                            placeholder="Address Line 2"
                            onChange={(e)=>this.handleInput(e)}
                            onBlur={(e)=>this.handleInput(e)}/>
                        <input 
                            style={styles} 
                            type="text" 
                            id="city" 
                            name="city" 
                            placeholder="City"
                            onChange={(e)=>this.handleInput(e)}
                            onBlur={(e)=>this.handleInput(e)}/>
                        <input 
                            style={styles} 
                            type="text" 
                            id="state" 
                            name="state" 
                            placeholder="State"
                            onChange={(e)=>this.handleInput(e)}
                            onBlur={(e)=>this.handleInput(e)}/>
                        <input 
                            style={styles} 
                            type="text" 
                            id="country" 
                            name="country" 
                            placeholder="Country"
                            onChange={(e)=>this.handleInput(e)}
                            onBlur={(e)=>this.handleInput(e)}/>
                        <CardElement 
                            id="cardElement" 
                            style={styles}/>
                    </div>
                </form>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);