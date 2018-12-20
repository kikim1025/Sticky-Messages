import React from 'react';
import HomePage from './components/Home/HomePage';
import LoginPage from './components/Login/LoginPage';
import './App.css';

// The App class serves as the main hub for login and home pages
// The App will use conditional rendering to render either of the pages
// JWT token will be generated upon login, so it will be saved as a state of App and passed as a prop into home page
class App extends React.Component {
  state = {
    jwt: '',
    loggedIn: false,
    alert: ''
  }

  // Function for login, passed into the loginpage as prop to get the JWT and save the token in App state
  login = (token) => {
    this.setState({  jwt: token, loggedIn: true })
  }

  // Function for home and further down, passed in as prop, and when user's JWT is no longer valid(timeout, etc), subcomponents will call the function
  // Due to conditional rendering depending on the loggedIn state, automatically goes back to login page 
  logout = () => {
    this.setState({ jwt: '', alert: 'Token expired. Please log in again.', loggedIn: false });
  }

  render() {
    return (
      <div id='main'>
        {this.state.loggedIn
          ? <div id='home-page'>
              <HomePage jwt={this.state.jwt} logout={this.logout} />
            </div>
          : <div id='login-page'>
              <LoginPage login={this.login} alert={this.state.alert} />
            </div>
        }
      </div>
    );
  }
}

export default App;