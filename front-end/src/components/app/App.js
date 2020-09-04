import React, { useState } from "react";
import "./App.css";
import LoginFormContainer from "../login/containers/LoginFormContainer";
import Home from "../../pages/home";
import Cookies from "js-cookie";
import AppHeader from "../home/components/AppHeader";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(
    Cookies.get("authenticated")
  );
  const authenticate = () => {
    setAuthenticated(true);
    Cookies.set("authenticated", true);
  };

  const [pageToShow, setPageToShow] = useState();
  const headerCallback = () => {};

  return (
    <div className="App">
      {isAuthenticated ? (
        <div>
          <Home />
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