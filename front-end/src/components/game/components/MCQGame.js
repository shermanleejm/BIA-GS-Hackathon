import React, { Component } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Grid,
  Paper,
  Modal,
  Button,
  Card,
  LinearProgress,
} from "@material-ui/core";
import CustomCircularProgress from "./CustomCircularProgress";
import ChildFriendlyIcon from "@material-ui/icons/ChildFriendly";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import FlightIcon from "@material-ui/icons/Flight";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import gameData from "./GameData";
import { Icon, InlineIcon } from "@iconify/react";
import trophyIcon from "@iconify/icons-mdi/trophy";
import trophyVariantOutline from "@iconify/icons-mdi/trophy-variant-outline";
import trophyVariant from "@iconify/icons-mdi/trophy-variant";
import trophyOutline from "@iconify/icons-mdi/trophy-outline";
import trophyBroken from "@iconify/icons-mdi/trophy-broken";
import trophyAward from "@iconify/icons-mdi/trophy-award";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";

class MCQGame extends Component {
  constructor(props) {
    super(props);

    var categories = [
      "Question of the Week",
      "Securities",
      "Other Cash",
      "Exchange-traded Derivatives",
      "OTC Derivatives",
    ];
    this.state = {
      playerData: gameData.playerData,
      gameData: gameData.gameData,
      gameToShow: "basic",
      showGame: false,
      questionNum: -1,
      numCorrect: 0,
      showCongratulationsModal: false,
      categories: categories,
      topic: categories[0],
      showGameBoard: true,
      savvyPoints: 0,
      trophies: [
        "Week 4",
        "Week 5",
        "Securities - Basic",
        "Other Cash- Basic",
        "Week 6",
        "Week 7",
      ],
      trophyIcons: [
        trophyVariantOutline,
        trophyVariant,
        trophyOutline,
        trophyBroken,
        trophyAward,
      ],
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

  componentDidMount() {
    fetch(process.env.REACT_APP_ZEXEL_IP + "user/getsavvypoints/Mike")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ savvyPoints: data.points });
      });
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

  displayTrophyBoard() {
    return (
      <div style={{ width: "80vw", margin: "auto" }}>
        <Grid container row justify="space-between">
          <Grid item>
            <Typography
              variant="h2"
              style={{ fontStyle: "italic", fontWeight: "bold" }}
            >
              Trophies
            </Typography>
          </Grid>

          <Grid item>
            <div
              style={{
                textAlign: "center",
                marginTop: "5px",
                cursor: "pointer",
              }}
              onClick={() => {
                this.setState({
                  showGameBoard: true,
                });
              }}
            >
              <span style={{ float: "right" }}>
                <SportsEsportsIcon style={{ width: "60px", height: "60px" }} />
              </span>
              <Typography variant="body2">Games</Typography>
            </div>
          </Grid>
        </Grid>

        <Paper style={{ textAlign: "center", marginTop: "30px" }}>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            spacing={4}
          >
            {this.state.trophies.map((trophy) => {
              return (
                <Grid item md={4} xs={12} lg={4}>
                  <Icon
                    icon={this.state.trophyIcons[Math.floor(Math.random() * 5)]}
                    style={{ width: "60px", height: "60px" }}
                  />
                  <Typography variant="h6">{trophy}</Typography>
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      </div>
    );
  }

  displayGameBoard() {
    return (
      <div style={{ width: "80vw", margin: "auto" }}>
        <Grid container row justify="space-between">
          <Grid item>
            <Typography
              variant="h2"
              style={{ fontStyle: "italic", fontWeight: "bold" }}
            >
              Games
            </Typography>
          </Grid>
          <Grid item>
            <div
              style={{
                textAlign: "center",
                marginTop: "5px",
                cursor: "pointer",
              }}
              onClick={() => {
                this.setState({
                  showGameBoard: false,
                });
              }}
            >
              <span style={{ float: "right" }}>
                <Icon
                  icon={trophyIcon}
                  style={{ width: "60px", height: "60px" }}
                />
              </span>
              <Typography variant="body2">Trophies</Typography>
            </div>
          </Grid>
        </Grid>
        <div></div>

        <div
          style={{
            whiteSpace: "nowrap",
            overflowX: window.innerWidth > 800 ? "hidden" : "scroll",
            overflowY: "hidden",
            marginBottom: "20px",
          }}
        >
          {this.state.categories.map((word) => {
            return (
              <Typography
                variant="subtitle1"
                style={{
                  paddingTop: "10px",
                  paddingRight: "20px",
                  display: "inline-block",
                  paddingBottom: "20px",
                }}
              >
                <span
                  onClick={() => {
                    this.setState({
                      topic: word,
                      searchValue: "",
                    });
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.topic === word ? <strong>{word}</strong> : word}
                </span>
              </Typography>
            );
          })}
        </div>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
          spacing={3}
        >
          {this.state.topic == "Question of the Week" ? (
            <div>
              <Paper
                style={{ padding: "20px", cursor: "pointer" }}
                onClick={() => {
                  this.setState({
                    showGame: true,
                    gameToShow: "Berkshire",
                  });
                }}
              >
                <Grid
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="flex-start"
                >
                  <Grid item>
                    <Typography variant="h6">Week 42</Typography>
                  </Grid>

                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <LinearProgress
                          value={this.state.playerData["Berkshire"]}
                          variant="determinate"
                          style={{
                            width: window.innerWidth > 800 ? "65vw" : "70vw",
                            height: "3vh",
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <span
                          style={{
                            float: window.innerWidth > 800 ? "right" : "",
                            textAlign:
                              window.innerWidth > 800 ? "right" : "center",
                            paddingLeft: "4vw",
                          }}
                        >
                          <Typography variant="h6">
                            {this.state.playerData["Berkshire"]}%
                          </Typography>
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          ) : (
            Object.keys(this.state.playerData).map((key) => {
              return (
                <Grid item>
                  <Paper
                    style={{ padding: "20px", cursor: "pointer" }}
                    onClick={() => {
                      this.setState({
                        showGame: true,
                        gameToShow: key,
                      });
                    }}
                  >
                    <Grid
                      container
                      direction="column"
                      justify="flex-start"
                      alignItems="flex-start"
                    >
                      <Grid item>
                        <Typography variant="h6">{key}</Typography>
                      </Grid>

                      <Grid item>
                        <Grid
                          container
                          direction="row"
                          justify="space-between"
                          alignItems="center"
                        >
                          <Grid item>
                            <LinearProgress
                              value={this.state.playerData[key]}
                              variant="determinate"
                              style={{
                                width:
                                  window.innerWidth > 800 ? "65vw" : "70vw",
                                height: "3vh",
                              }}
                            />
                          </Grid>
                          <Grid item>
                            <span
                              style={{
                                float: window.innerWidth > 800 ? "right" : "",
                                textAlign:
                                  window.innerWidth > 800 ? "right" : "center",
                                paddingLeft: "4vw",
                              }}
                            >
                              <Typography variant="h6">
                                {this.state.playerData[key]}%
                              </Typography>
                            </span>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              );
            })
          )}
        </Grid>
      </div>
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
      this.setState({ questionNum: -1, showGame: false });
    }
  };

  congratulationsModal() {
    return (
      <Modal
        open={this.state.showCongratulationsModal}
        onClose={() => {
          var score = (this.state.numCorrect / 5) * 100;
          localStorage.setItem(this.state.gameToShow, JSON.stringify(score));
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
    return (
      <div style={{ backgroundColor: "#ffffff", height: "100vh" }}>
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
        <div style={{ marginTop: "20px" }}>
          {this.state.showGameBoard
            ? this.displayGameBoard()
            : this.displayTrophyBoard()}
        </div>
      </div>
    );
  }
}

export default MCQGame;
