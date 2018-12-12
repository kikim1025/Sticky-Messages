import React from 'react';
import HomePage from './components/Home/HomePage';
import LoginPage from './components/Login/LoginPage';
import './App.css';

class App extends React.Component {
  state = {
    jwt: '',
    loggedIn: false,
    alert: ''
  }

  login = (token) => {
    this.setState({  jwt: token, loggedIn: true })
  }

  logout = () => {
    this.setState({ jwt: '', alert: 'Token expired. Please log in again.', loggedIn: false });
  }

  render() {
    return (
      <div>
        {this.state.loggedIn
          ? <div>
              <HomePage jwt={this.state.jwt} logout={this.logout} />
            </div>
          : <div>
              <LoginPage login={this.login} alert={this.state.alert} />
            </div>
        }
      </div>
    );
  }
}

export default App;