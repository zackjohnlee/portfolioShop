import React, { Component } from 'react';
import {
    injectStripe, 
    CardElement
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
        const email = this.state.email;
        this.props.stripe.createToken({
            name: this.state.name,
        }).then(({token}) => {
            const shipping = {
                line1: this.state.addressLine1,
                line2: this.state.addressLine2,
                city: this.state.city,
                state: this.state.state,
				postal_code: this.state.zip
            }
            console.log('Received Stripe token:', token);
            this.props.createOrder(token, email, shipping);
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
                            id="zip" 
                            name="zip" 
                            placeholder="Zip"
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