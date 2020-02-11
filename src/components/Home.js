import React from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
const Home = () => {
  const handleClick = () => {
      axios.post('http://192.168.1.54:4000/api/v1/user_sessions/logout.json', { },{
        headers: {
          'Content-Type': 'application/json',
          "APP-IDENTIFIER": "UserApp",
          "AUTH-TOKEN": localStorage.getItem("auth_token")
        }})
          .then(response => {
            if (response.data.resp_title === 'Success') {
              localStorage.removeItem('auth_token');
              this.props.history.push('/');
            } else {
              debugger;
              this.setState({
                errors: [response.data.message]
              })
            }
          })
          .catch(error => console.log(error))
  }

  return (
      <div>
        <h2>
          Homepage
        </h2>
          {
            localStorage.getItem("auth_token") ?
              <Link to='/' onClick={handleClick}>Log Out</Link>
              :
              <Link to='/login'>Log In</Link>
          }
      </div>
  );
};
export default Home;