import React, { Component } from "react";
import LoginFormContainer from "../login/containers/LoginFormContainer";
import Cookies from "js-cookie";
import AppHeader from "../home/components/AppHeader";
import HomePage from "../home/components/HomePage";
import EducationPage from "../education/components/EducationPage";
import QuestionContainer from "../questionnaire/containers/QuestionContainer";
import { useEffect } from "react";
import axios from "axios";

class TempApp extends Component {
  constructor(props) {
    super(props);
    this.state = { pageToShow: 0 };
  }

  setPageToShow(newValue) {
    this.setState({
        pageToShow: newValue
    })
  }

  headerCallback = (newValue) => {
    this.setPageToShow(newValue);
  };

  mainPage = () => {
    switch (this.state.pageToShow) {
      case 0:
        return <HomePage />;
      case 1:
        return <EducationPage />;
      case 2:
        return <div>THIS IS FRIENDS</div>;
    }
  };

  render() {
    return (
      <div style={{backgroundColor: "#ffffff"}}>
        <AppHeader pageToShow={this.state.pageToShow} headerCallback={this.headerCallback} />
        {this.mainPage()}
      </div>
    );
  }
}

export default TempApp;