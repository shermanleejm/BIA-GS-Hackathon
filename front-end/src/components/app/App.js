import React, { useState, Component } from "react";
// import "./App.css";
import LoginFormContainer from "../login/containers/LoginFormContainer";
import Cookies from "js-cookie";
import AppHeader from "../home/components/AppHeader";
import HomePage from "../home/components/HomePage";
import EducationPage from "../education/components/EducationPage";
import QuestionContainer from "../questionnaire/containers/QuestionContainer";
import AuthPage from "../auth/components/AuthPage";
import { useEffect } from "react";
import axios from "axios";
import FriendsPage from "../friends/containers/FriendsPage";
import MCQGame from "../game/components/MCQGame";
import { Paper } from "@material-ui/core";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageToShow: 4,
      userID: "",
      suggestedFriends: [],
      friends: [],
    };
  }

  componentDidMount() {
    if (localStorage.getItem("authenticated") === "true") {
      this.setState({ pageToShow: 0 });
    }

    fetch(process.env.REACT_APP_ZEXEL_IP + "user/getstrangers/Apple")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ suggestedFriends: data.slice[(0, 3)] });
      });

    fetch(process.env.REACT_APP_ZEXEL_IP + "user/getfriends/Apple")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ friends: data });
      });
  }

  mainPage() {
    switch (this.state.pageToShow) {
      case 0:
        return <HomePage />;
        break;
      case 1:
        return <EducationPage />;
        break;
      case 2:
        return (
          <FriendsPage
            suggestedFriends={this.state.suggestedFriends}
            friends={this.state.friends}
          />
        );
        break;
      case 3:
        return <HomePage />;
        break;
      case 4:
        return (
          <AuthPage
            authCallback={this.authCallback}
            headerCallback={this.headerCallback}
          />
        );
        break;
      case 5:
        return (
          <div>
            <Paper
              className="container"
              elevation={3}
              style={{ "background-color": "lightgrey" }}
            >
              <div className="card-body">
                <h3 className="card-title">
                  You have a <span className="badge badge-info">LOW RISK</span>{" "}
                  profile!
                </h3>
                <p className="card-text">
                  These are your potential focus areas:
                </p>
                <div className="row text-left mb-4">
                  <div className="col-md-4 col-sm-12">
                    <div
                      className="card h-150 mb-4"
                      style={{
                        "box-shadow":
                          "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)",
                      }}
                    >
                      <div className="card-body">
                        <h5 className="card-title">Futures</h5>
                        <p className="card-text">
                          <small>
                            A legal agreement to buy or sell a particular
                            commodity asset, or security at a predetermined
                            price at a specified time in the future.
                          </small>
                        </p>
                        <a href="#" className="btn btn-primary">
                          Learn More
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div
                      className="card h-150 mb-4"
                      style={{
                        "box-shadow":
                          "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)",
                      }}
                    >
                      <div className="card-body">
                        <h5 className="card-title">ETFs</h5>
                        <p className="card-text">
                          <small>
                            A type of security that involves a collection of
                            securities—such as stocks—that often tracks an
                            underlying index
                          </small>
                        </p>
                        <a href="#" className="btn btn-primary">
                          Learn More
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div
                      className="card h-150 mb-4"
                      style={{
                        "box-shadow":
                          "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)",
                      }}
                    >
                      <div className="card-body">
                        <h5 className="card-title">REITs</h5>
                        <p className="card-text">
                          <small>
                            Allows individual investors to earn dividends from
                            real estate investments—without having to buy,
                            manage, or finance any properties themselves.
                          </small>
                        </p>
                        <a href="#" className="btn btn-primary">
                          Learn More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <a
                  href="#"
                  className="btn btn-primary"
                  onClick={() => {
                    this.setState({ pageToShow: 0 });
                  }}
                >
                  CONTINUE
                </a>
              </div>
            </Paper>
            );
          </div>
        );
      default:
        break;
    }
  }

  headerCallback = (newValue) => {
    this.setState({ pageToShow: newValue });
  };

  authCallback = (data) => {};

  render() {
    return (
      <div>
        <div style={{ positition: "sticky", top: 0, zIndex: 100 }}>
          {this.state.pageToShow != 4 && (
            <AppHeader
              pageToShow={this.state.pageToShow}
              headerCallback={this.headerCallback}
            />
          )}
        </div>
        <div>{this.mainPage()}</div>
      </div>
    );
  }
}
export default App;
