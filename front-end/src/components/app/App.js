import React, { useState } from "react";
// import "./App.css";
import LoginFormContainer from "../login/containers/LoginFormContainer";
import Cookies from "js-cookie";
import AppHeader from "../home/components/AppHeader";
import HomePage from "../home/components/HomePage";
import EducationPage from "../education/components/EducationPage";
import QuestionContainer from "../questionnaire/containers/QuestionContainer";
import { useEffect } from "react";
import axios from "axios";
import FriendsPage from "../friends/containers/FriendsPage";

function App() {
  const [isAuthenticated, setAuthenticated] = useState();
  const [isFirstTimeUser, setFirstTimeUser] = useState(true);
  const [suggestedFriends, setSuggestedFriends] = useState();

  useEffect(() => {
    setAuthenticated(Cookies.get("authenticated"));
    const userid = Cookies.get('userid');
    axios.get(
        "http://" + process.env.REACT_APP_PUBLIC_IP + `:5001/user/getstrangers/${userid}`
    ).then(res => {
        setSuggestedFriends(res.data.slice(0,3));
    })
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const data = {
        userid: Cookies.get("userid"),
      };
      axios
        .get(
          "http://" +
            process.env.REACT_APP_PUBLIC_IP +
            ":5000/login/checkfirstlogin",
          { params: data }
        )
        .then((res) => {
          if (res.data.is_first_login) {
            setFirstTimeUser(true);
          } else {
            setFirstTimeUser(false);
          }
        });
    }
  }, [isAuthenticated]);
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
      case 0:
        return <HomePage />;
      case 1:
        return <EducationPage />;
      case 2:
        return <FriendsPage suggestedFriends={suggestedFriends}/>;
    }
  };

  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      {isAuthenticated ? (
        localStorage.getItem("newUser") !== "false" ? (
          <div
            className="App container mt-5"
            style={{ height: "100vh", backgroundColor: "#ffffff" }}
          >
            <QuestionContainer />
          </div>
        ) : (
          <div>
            <div style={{ position: "sticky", top: 0, zIndex: 100 }}>
              <AppHeader
                pageToShow={pageToShow}
                headerCallback={headerCallback}
              />
            </div>
            <div>{mainPage()}</div>
          </div>
        )
      ) : (
        <div className="App container mt-5">
          <LoginFormContainer authenticate={authenticate} />
        </div>
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
