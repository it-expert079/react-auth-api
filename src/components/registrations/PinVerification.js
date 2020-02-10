import React, { Component } from 'react';
import axios from 'axios'
class PinVerification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verification_code: '',
            errors: ''
        };
    }
    handleSubmit = (event) => {
        event.preventDefault()
        const {verification_code} = this.state
        let user = {
            verification_code: verification_code
        }

        axios.post('http://localhost:3009/pin_verification', {user}, {
            headers: {
                'Content-Type': 'application/json',
                "APP-IDENTIFIER": "UserApp"
            }
        })
            .then(response => {
                if (response.data.logged_in) {
                    this.props.handleLogin(response.data)
                    this.redirect()
                } else {
                    this.setState({
                        errors: response.data.errors
                    })
                }
            })
            .catch(error => console.log('api errors:', error))
    };
    render(){
        return(
            <div>
                <h1>Pin Verification Form</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        placeholder="first_name"
                        type="text"
                        name="first_name"
                        value={verification_code}
                        onChange={this.handleChange}
                    />
                </form>
            </div>
        )
    }
}