import React from 'react';
import UsernameComponent from '../components/UsernameComponent';
import PasswordComponent from '../components/PasswordComponent';
import styles from './LoginFormContainer.module.scss';
import { Route, Router } from 'react-router-dom'

const LoginFormContainer = () => {
    return (
        <form className={styles["form-signin"]}>
            <div className="text-center mb-4">
                <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
                <h1 className="h3 mb-3 font-weight-normal">Welcome!</h1>
            </div>
            <UsernameComponent />
            <PasswordComponent />

            <div className="checkbox mb-3">
                <label>
                <input type="checkbox" value="remember-me"/> Remember me
                </label>
            </div>
            {/* <Router>
                <Route render={({ history }) => (
                    <button className="btn btn-lg btn-primary btn-block" type="button" onClick={() => { history.push('/home')}}>Sign in</button>
                )}/>
            </Router> */}
        </form>
    )
}

export default LoginFormContainer