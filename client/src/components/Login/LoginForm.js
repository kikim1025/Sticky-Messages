import React from 'react';
import './LoginForm.css';

const LoginForm = (props) => (
    <form>
        <div>Username:&nbsp;<input name='username' onChange={props.getLoginInput} type='text' maxLength='15'></input></div>
        &nbsp;
        <div>Password: &nbsp;<input name='password' onChange={props.getLoginInput} type='text' maxLength='15'></input></div>
        <br /><br />
        <button className='button--loginform' name='login' onClick={props.handleLoginForm}>Login</button>
        <button className='button--loginform' name='create' onClick={props.handleLoginForm}>Create Account</button>
        <hr />
        <div >
            New Users: Simply enter a new username and a password to create a new account!
        </div>
    </form>
)

export default LoginForm;