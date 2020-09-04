import React, { useState } from "react";
import "./App.css";
import LoginFormContainer from "../login/containers/LoginFormContainer";
import Cookies from "js-cookie";
import AppHeader from "../home/components/AppHeader";
import HomePage from "../home/components/HomePage";
import EducationPage from "../education/components/EducationPage";
import QuestionContainer from "../questionnaire/containers/QuestionContainer";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [isAuthenticated, setAuthenticated] = useState();
  const [isFirstTimeUser, setFirstTimeUser] = useState(true);

  useEffect(() => {
    setAuthenticated(Cookies.get('authenticated'));
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      const data = {
        userid: Cookies.get('userid')
      }
      axios.get("http://" + process.env.REACT_APP_PUBLIC_IP + ":5000/login/checkfirstlogin", {params: data}).then((res) => {
        if (res.data.is_first_login) {
          setFirstTimeUser(true);
        } else {
          setFirstTimeUser(false);
        }
      })
    }
  }, [isAuthenticated])
  const authenticate = () => {
    setAuthenticated(true);
    Cookies.set("authenticated", true);
  };

  const [pageToShow, setPageToShow] = useState(1);
  const headerCallback = (newValue) => {
    setPageToShow(newValue);
  };

  const mainPage = () => {
    switch (pageToShow) {
      case 1: return <HomePage />;
      case 2: return <EducationPage />;
      case 3: return <div>THIS IS FRIENDS</div>;
    }
  }

  return (
    <div className="App">
      {isAuthenticated ?
      isFirstTimeUser ? <QuestionContainer /> : (
        <div>
          <AppHeader pageToShow={pageToShow} headerCallback={headerCallback} />
          {mainPage()}
          {/* <Home /> */}
        </div>
      ) : (
        <LoginFormContainer authenticate={authenticate} />
      )}

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
