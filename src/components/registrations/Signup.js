import React, { Component } from 'react';
import axios from 'axios'
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            country_code: '',
            phone: '',
            country_id: '',
            errors: ''
        };
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    };
    handleSubmit = (event) => {
        event.preventDefault()
        const {first_name, last_name,country_code,phone,country_id} = this.state
        let user = {
            first_name: first_name,
            last_name: last_name,
            country_code: country_code,
            phone: phone,
            country_id: country_id
        }

        axios.post('http://192.168.1.54:4000/api/v1/registrations/sign_up.json', {user},{
            headers: {
                'Content-Type': 'application/json',
                "APP-IDENTIFIER": "UserApp"
            }
        })
            .then(response => {
                if (response.data.resp_title === 'Success') {
                    this.redirect()
                } else {
                    this.setState({
                        errors: [response.data.message]
                    })
                }
            })
            .catch(error => console.log('api errors:', error))
        localStorage.setItem("country_code", country_code);
        localStorage.setItem("phone", phone);

    };
    redirect = () => {
        this.props.history.push('/pin_verification')
    }
    handleErrors = () => {
        return (
            <div>
                <ul>{this.state.errors.map((error) => {
                    return <li key={error}>{error}</li>
                })}</ul>
            </div>
        )
    }
    render() {
        const {first_name, last_name, country_code, phone, country_id} = this.state
        return (
            <div>
                <h1>Sign Up</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        placeholder="first_name"
                        type="text"
                        name="first_name"
                        value={first_name}
                        onChange={this.handleChange}
                    />
                    <input
                        placeholder="last_name"
                        type="text"
                        name="last_name"
                        value={last_name}
                        onChange={this.handleChange}
                    />
                    <input
                        placeholder="country_code"
                        type="text"
                        name="country_code"
                        value={country_code}
                        onChange={this.handleChange}
                    />
                    <input
                        placeholder="phone"
                        type="text"
                        name="phone"
                        value={phone}
                        onChange={this.handleChange}
                    />
                    <input
                        placeholder="country_id"
                        type="text"
                        name="country_id"
                        value={country_id}
                        onChange={this.handleChange}
                    />

                    <button placeholder="submit" type="submit">
                        Sign Up
                    </button>

                </form>
                <div>
                    {
                        this.state.errors ? this.handleErrors() : this.state.success
                    }
                </div>

            </div>
        );
    }
}
export default Signup;