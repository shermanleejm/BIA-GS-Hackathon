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
import MCQGame from "../game/components/MCQGame";

function App() {
  const [isAuthenticated, setAuthenticated] = useState();
  const [isFirstTimeUser, setFirstTimeUser] = useState();
  const [suggestedFriends, setSuggestedFriends] = useState();
  const [friends, setFriends] = useState();

  useEffect(() => {
    setAuthenticated(Cookies.get("authenticated"));
    const userid = Cookies.get("userid");

    // get logged in user not connected friends
    axios
      .get(
        "http://" +
          process.env.REACT_APP_PUBLIC_IP +
          `:5001/user/getstrangers/${userid}`
      )
      .then((res) => {
        setSuggestedFriends(res.data.slice(0, 3));
      });

    // get logged in user details
    axios
      .get(
        "http://" +
          process.env.REACT_APP_PUBLIC_IP +
          `:5001/user/getfriends/${userid}`
      )
      .then((res) => {
        setFriends(res.data);
      });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const userid = Cookies.get("userid");
      axios
        .get(
          "http://" +
            process.env.REACT_APP_PUBLIC_IP +
            ":5001/login/checkfirstlogin/" +
            userid
        )
        .then((res) => {
          if (res.data.is_first_login) {
            setFirstTimeUser(true);
            localStorage.setItem("newUser", "true");
          } else {
            setFirstTimeUser(false);
            localStorage.setItem("newUser", "false");
          }
        });
    }
  }, [isAuthenticated]);

  const authenticate = () => {
    setAuthenticated(true);
    Cookies.set("authenticated", true);
    window.location.reload();
  };

  const [pageToShow, setPageToShow] = useState(0);
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
        return (
          <FriendsPage suggestedFriends={suggestedFriends} friends={friends} />
        );
      case 3:
        return <MCQGame />;
    }
  };

  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      {isAuthenticated ? (
        // localStorage.getItem("newUser") !== "false"
        isFirstTimeUser ? (
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
