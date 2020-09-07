import React from "react";
import UsernameComponent from "../components/UsernameComponent";
import PasswordComponent from "../components/PasswordComponent";
import styles from "./LoginFormContainer.module.scss";
import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";
import { Alert } from "react-bootstrap";
const LoginFormContainer = (props) => {
  const [loginError, setLoginError] = useState(false);
  const successLogin = () => {
    const userid = document.getElementById("inputEmail").value;
    const password = document.getElementById("inputPassword").value;
    const data = { user_id: userid, password: password };
    fetch(
      "http://" + process.env.REACT_APP_PUBLIC_IP + ":5001/login/authenticate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        mode: "cors",
      }
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.data.success) {
          Cookies.set("userid", userid);
          props.authenticate();
        } else {
          setLoginError(true);
        }
      })
      .catch((err) => {
        setLoginError(true);
        Cookies.set('userid', userid);
        props.authenticate();
      });
  };

  return (
    <form className={styles["form-signin"]}>
      <div className="text-center mb-4">
        <img
          className="mb-4"
          src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
          alt=""
          width="72"
          height="72"
        />
        <h1 className="h3 mb-3 font-weight-normal">Welcome!</h1>
      </div>
      <div className="mb-2">
        <UsernameComponent />
      </div>
      <div>
        <PasswordComponent />
      </div>

      {loginError ? (
        <Alert className="text-danger text-left ml-n3">
          Login Failed. Please try again.
        </Alert>
      ) : (
        ""
      )}
      <button
        className="btn btn-lg btn-primary btn-block mt-4"
        type="button"
        onClick={successLogin}
      >
        Sign in
      </button>
    </form>
  );
};

export default LoginFormContainer;
