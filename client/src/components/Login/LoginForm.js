import React from 'react';

const LoginForm = (props) => (
    <form>
        <input name='username' onChange={props.getLoginInput} type='text' maxLength='10'></input>
        <input name='password' onChange={props.getLoginInput} type='text' maxLength='10'></input>
        <button name='login' onClick={props.handleLoginForm}>Login</button>
        <button name='create' onClick={props.handleLoginForm}>Create Account</button>
        <hr/>
        <div>
            New Users: Simply enter a new username and a password to create a new account!
        </div>
    </form>
)

export default LoginForm;