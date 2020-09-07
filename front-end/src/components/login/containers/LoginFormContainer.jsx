import React from 'react';
import UsernameComponent from '../components/UsernameComponent';
import PasswordComponent from '../components/PasswordComponent';
import RegUsernameComponent from '../components/RegUsernameComponent';
import RegPasswordComponent from '../components/RegPasswordComponent';
import styles from './LoginFormContainer.module.scss';
import Cookies, { set } from "js-cookie";
import axios from 'axios';
import { useState } from 'react';
import { Alert } from 'react-bootstrap'
const LoginFormContainer = (props) => {
    const [loginError, setLoginError] = useState(false);
    const [hiddenLogin, setHiddenLogin] = useState(false);
    const [hiddenRegister, setHiddenRegister] = useState(true);
    const [registerSuccess, setRegisterSuccess] = useState(null);
    const successLogin = () => {
        const userid = document.getElementById('inputEmail').value;
        const password = document.getElementById('inputPassword').value;
        const data = { user_id: userid , password: password};

        axios.post("http://" + process.env.REACT_APP_PUBLIC_IP + ":5001/login/authenticate", data).then((res) => {
            if (res.data.success) {
                Cookies.set('userid', userid);
                props.authenticate();
            } else {
                setLoginError(true);
            }
        }).catch(err => {
            // setLoginError(true);
            // Cookies.set('userid', userid);
            // props.authenticate();
        })
    }

    const register = () => {
        setHiddenLogin(true)
        setHiddenRegister(false)
    }

    const login = () => {
        setHiddenLogin(false)
        setHiddenRegister(true)
    }

    const registerAccount = () => {
        const userid = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const url = 'http://13.229.107.243:5001/login/register'
        const data = {
            user_id: userid,
            password: password,
        }
        axios.put(url, data).then(res => {
            if (res.data.register_status.success) {
                setRegisterSuccess(true);
            } else {
                setRegisterSuccess(false);
            }
        })
    }

    return (
        <>
        <form className={styles["form-signin"]} hidden={hiddenLogin}>
            <div className="text-center mb-4">
                <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
                <h1 className="h3 mb-3 font-weight-normal">Welcome!</h1>
            </div>
            <div className='mb-2'>
                <UsernameComponent />
            </div>
            <div>
                <PasswordComponent />
            </div>

            { loginError ? <Alert className='text-danger text-left ml-n3'>Login Failed. Please try again.</Alert> : ""}
            <button className="btn btn-lg btn-primary btn-block mt-4" type="button" onClick={successLogin}>Sign in</button>
            <a className="" type="button" onClick={register}>Click here to register</a>
        </form>

        <form className={styles["form-signin"]} hidden={hiddenRegister}>
            <div className="text-center mb-4">
                <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
                <h1 className="h3 mb-3 font-weight-normal">Welcome!</h1>
            </div>
            <div className='mb-2'>
                <RegUsernameComponent />
            </div>
            <div>
                <RegPasswordComponent />
            </div>

            { registerSuccess == null ? '' : registerSuccess == true ? <Alert className='text-success text-left ml-n3'> Successfully Registered! </Alert> : <Alert className='text-danger text-left ml-n3'>Registration Failed. Please try again.</Alert>}
            <button className="btn btn-lg btn-primary btn-block mt-4" type="button" onClick={registerAccount}>Register</button>
            <a className="" type="button" onClick={login}>Click here to login</a>
        </form>
        </>
    )
}

export default LoginFormContainer