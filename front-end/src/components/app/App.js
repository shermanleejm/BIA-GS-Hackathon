import React, { useState } from "react";
import "./App.css";
import LoginFormContainer from "../login/containers/LoginFormContainer";
import Home from "../../pages/home";
import Cookies from "js-cookie";
import AppHeader from "../home/components/AppHeader";
import HomePage from "../home/components/HomePage";
import EducationPage from "../education/components/EducationPage";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(
    Cookies.get("authenticated")
  );
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
      case 0: return <HomePage />;
      case 1: return <EducationPage />;
      case 2: return <div>THIS IS FRIENDS</div>;
    }
  }

  return (
    <div className="App">
      {isAuthenticated ? (
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
