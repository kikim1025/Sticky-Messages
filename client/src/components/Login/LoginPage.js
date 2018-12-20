import React from 'react';
import $ from 'axios';
import LoginForm from './LoginForm';
import './LoginPage.css';

// This class will represent the login page
// User can either create an account or login with existing
class LoginPage extends React.Component {
    state = {
        username: '',
        password: '',
        alert: this.props.alert
    }

    getLoginInput = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    handleLoginForm = (event) => {
        event.preventDefault();
        if (!this.state.username.length || !this.state.password.length) {
            this.setState({ alert: 'Username and password must be longer than 0 and shorter than 15.'});
        } else {
            if (event.target.name === 'login') {
                $.post('/api/user/login', { username: this.state.username, password: this.state.password })
                .then((res) => {
                    if(res.data.status === 200) {
                        // Calls the parent function with the generated JWT token, which will be saved to App class state
                        this.props.login(res.data.data.token);
                    } else if (res.data.status === 401) {
                        this.setState({ alert: 'Username or password is wrong.'});
                    } else {
                        this.setState({ alert: 'Something with request or server database went wrong.'});
                    }
                });
            } else if (event.target.name === 'create') {
                $.post('/api/user', { username: this.state.username, password: this.state.password })
                .then((res) => {
                    if(res.data.status === 200) {
                        this.setState({ alert: `Welcome ${res.data.data}! Please now login with the new username and password.` });
                    } else if (res.data.status === 403 && res.data.message.name === 'MongoError') {
                        this.setState({ alert: 'Username already exists. Please choose different username.'});
                    } else {
                        this.setState({ alert: 'Something with request or server database went wrong.'});
                    }
                });
            }
        }
    }

    render() {
        return(
            <div>
                <div className='alert'>{this.state.alert}</div>
                <LoginForm getLoginInput={this.getLoginInput} handleLoginForm={this.handleLoginForm} />
            </div>
        );
    }
}

export default LoginPage;