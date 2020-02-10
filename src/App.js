import React, { Component } from 'react';
import axios from 'axios'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/registrations/Login'
import Signup from './components/registrations/Signup'
import PinVerification from './components/registrations/PinVerification'
import Countries from './components/countries/Countries'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
    };
  }
  componentDidMount() {
    this.loginStatus()
  }
  loginStatus = () => {
    axios.get('http://localhost:3001/api/v1/user_sessions/sign_in.json')
        .then(response => {
          if (response.data.logged_in) {
            this.handleLogin(response)
          } else {
            this.handleLogout()
          }
        })
        .catch(error => console.log('api errors:', error))
  }
  handleLogin = (data) => {
      debugger
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }
  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {}
    })
  }
  render() {
    return (
        <div>
          <BrowserRouter>
            <Switch>
              <Route
                  exact path='/'
                  render={props => (
                      <Home {...props} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn}/>
                  )}
              />
              <Route
                  exact path='/login'
                  render={props => (
                      <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
                  )}
              />
              <Route
                  exact path='/signup'
                  render={props => (
                      <Signup {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
                  )}
              />
                <Route path="/countries" component={Countries} />
            </Switch>
          </BrowserRouter>
        </div>
    );
  }
}
export default App;