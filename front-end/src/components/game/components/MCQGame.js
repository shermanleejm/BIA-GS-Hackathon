import React, { Component } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Grid,
  Paper,
  Modal,
  Button,
} from "@material-ui/core";
import CustomCircularProgress from "./CustomCircularProgress";
import ChildFriendlyIcon from "@material-ui/icons/ChildFriendly";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import FlightIcon from "@material-ui/icons/Flight";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import gameData from "./GameData";

class MCQGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerData: gameData.playerData,
      gameData: gameData.gameData,
      gameToShow: "basic",
      showGame: false,
      questionNum: -1,
      numCorrect: 0,
      showCongratulationsModal: false,
      icons: {
        basic: <ChildFriendlyIcon style={{ height: 75, width: 75 }} />,
        intermediate: <AccessibilityIcon style={{ height: 75, width: 75 }} />,
        expert: <DirectionsWalkIcon style={{ height: 75, width: 75 }} />,
        wizard: <DirectionsRunIcon style={{ height: 75, width: 75 }} />,
        Berkshire: <FlightIcon style={{ height: 75, width: 75 }} />,
      },
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentWillUnmount() {
    if (localStorage.getItem("skipReload") === null) {
      window.location.reload();
    }
    localStorage.setItem("skipReload", "true");
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  displayBoard() {
    return (
      <Grid
        container
        column
        justify="space-evenly"
        alignItem="center"
        spacing={10}
        style={{ textAlign: "center" }}
      >
        {Object.keys(this.state.playerData).map((key) => {
          return (
            <Grid item md={key === "basic" ? 12 : 6} xs={12}>
              <div
                onClick={() => {
                  console.log(key);
                  this.setState({ gameToShow: key, showGame: true });
                }}
                style={{ cursor: "pointer" }}
              >
                <CustomCircularProgress
                  content={this.state.icons[key]}
                  level={this.state.playerData[key]}
                />
                <Typography variant="h6">{key}</Typography>
              </div>
            </Grid>
          );
        })}
      </Grid>
    );
  }

  showQuestion = () => {
    if (this.state.questionNum === -1) {
      return (
        <div>
          <Typography variant="h5">
            Welcome! Are you ready to start your game?
          </Typography>
          <Grid container row>
            <Grid item md={6} xs={6}>
              <Button
                onClick={() => {
                  this.setState({ questionNum: 0 });
                }}
                fullWidth
              >
                Yes I am!
              </Button>
            </Grid>
            <Grid item md={6} xs={6}>
              <Button
                onClick={() => {
                  this.setState({ questionNum: -1, showGame: false });
                }}
                fullWidth
              >
                Not ready...
              </Button>
            </Grid>
          </Grid>
        </div>
      );
    } else if (
      this.state.questionNum < this.state.gameData[this.state.gameToShow].length
    ) {
      var question = this.state.gameData[this.state.gameToShow][
        this.state.questionNum
      ]["question"];

      var answers = this.state.gameData[this.state.gameToShow][
        this.state.questionNum
      ]["answers"];

      var answer = this.state.gameData[this.state.gameToShow][
        this.state.questionNum
      ]["answer"];

      return (
        <div>
          <Typography variant="h4">{question}</Typography>
          <Grid container column>
            {answers.map((ans, index) => {
              return (
                <Grid item md={12} xs={12}>
                  <Button
                    style={{ textTransform: "none" }}
                    fullWidth
                    onClick={() => {
                      index == answer &&
                        this.setState({
                          numCorrect: this.state.numCorrect + 1,
                        });
                      this.setState({
                        questionNum: this.state.questionNum + 1,
                      });
                    }}
                  >
                    {ans}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </div>
      );
    } else {
      // alert(
      //   "Congratulations! You got " +
      //     this.state.numCorrect +
      //     " correct answers!"
      // );
      this.setState({ showCongratulationsModal: true });
      // TODO: update backend
      var newPlayerData = this.state.playerData;
      newPlayerData[this.state.gameToShow] = (this.state.numCorrect / 5) * 100;
      this.setState({ questionNum: -1, showGame: false});
    }
  };

  congratulationsModal() {
    return (
      <Modal
        open={this.state.showCongratulationsModal}
        onClose={() => {
          this.setState({
            showCongratulationsModal: false,
            questionNum: -1,
            showGame: false,
            numCorrect: 0,
          });
        }}
      >
        <div
          style={{
            position: "fixed",
            outline: 0,
            top: "25%",
            left: "50%",
            transform: "translate(-50%, -25%)",
            margin: "auto",
          }}
        >
          <Paper
            style={{
              padding: "20px",
              width: "80vw",
              backgroundColor: "#ffffff",
            }}
          >
            {"Congratulations! You got " +
              this.state.numCorrect +
              " correct answers!"}
          </Paper>
        </div>
      </Modal>
    );
  }

  render() {
    console.log(this.state.questionNum);
    return (
      <div style={{ backgroundColor: "#ffffff", height: "100%" }}>
        <Modal
          open={this.state.showCongratulationsModal}
          onClose={() => {
            this.setState({
              showCongratulationsModal: false,
              questionNum: -1,
              showGame: false,
              numCorrect: 0,
            });
          }}
        >
          <div
            style={{
              position: "fixed",
              outline: 0,
              top: "25%",
              left: "50%",
              transform: "translate(-50%, -25%)",
              margin: "auto",
            }}
          >
            <Paper
              style={{
                padding: "20px",
                width: "80vw",
                backgroundColor: "#ffffff",
              }}
            >
              {"Congratulations! You got " +
                this.state.numCorrect +
                " correct answers!"}
            </Paper>
          </div>
        </Modal>
        {this.state.showGame && (
          <Modal
            open={this.state.showGame}
            onClose={() => {
              this.setState({ showGame: false, questionNum: -1 });
            }}
          >
            <div
              style={{
                position: "fixed",
                outline: 0,
                top: "25%",
                left: "50%",
                transform: "translate(-50%, -25%)",
                margin: "auto",
              }}
            >
              <Paper
                style={{
                  padding: "20px",
                  width: "80vw",
                  backgroundColor: "#ffffff",
                }}
              >
                {this.showQuestion()}
              </Paper>
            </div>
          </Modal>
        )}
        <div style={{ marginTop: "20px" }}>{this.displayBoard()}</div>
      </div>
    );
  }
}

export default MCQGame;
