import React, { Component } from 'react';
import axios from 'axios'
class PinVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country_code: localStorage.getItem("country_code"),
      phone: localStorage.getItem("phone"),
      verification_code: '',
      email: '',
      password: '',
      password_confirmation: '',
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
    const {country_code,phone,email,password,password_confirmation,verification_code} = this.state
    let user_session = {
      device_uuid: "11d2233_web_device",
      device_type: "web",
      device_token: "sdvsdvadfscsdvsdvsbgrw54w5y45gedbdfbsdf"
    }

    axios.post('http://192.168.1.54:4000/api/v1/registrations/pin_verification.json', {country_code: country_code,
      phone: phone,
      verification_code: verification_code,
      email: email,
      password: password,
      password_confirmation: password_confirmation,user_session}, {
      headers: {
        'Content-Type': 'application/json',
        "APP-IDENTIFIER": "UserApp"
      }
    })
      .then(response => {
        if (response.data.resp_title === 'Success') {
          this.props.handleLogin(response.data["data"])
          this.redirect()
        } else {
          this.setState({
            errors: [response.data.message]
          })
        }
      })
      .catch(error => console.log('api errors:', error))
  };
  redirect = () => {
    this.props.history.push('/')
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
  render(){
    const {verification_code,email,password,password_confirmation} =this.state
    return(
      <div>
        <h1>Pin Verification Form</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="phone"
            type="hidden"
            name="phone"
            value={localStorage.getItem("phone")}
            onChange={this.handleChange}
          />
          <input
            placeholder="country code"
            type="hidden"
            name="country_code"
            value={localStorage.getItem("country_code")}
            onChange={this.handleChange}
          />
          <input
            placeholder="verification_code"
            type="text"
            name="verification_code"
            value={verification_code}
            onChange={this.handleChange}
          />
          <input
            placeholder="email"
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <input
            placeholder="password_confirmation"
            type="password"
            name="password_confirmation"
            value={password_confirmation}
            onChange={this.handleChange}
          />
          <button placeholder="submit" type="submit">
            Pin Verification
          </button>
        </form>
        <div>
          {
            this.state.errors ? this.handleErrors() : this.state.success
          }
        </div>
      </div>
    )
  }
}
export default PinVerification;