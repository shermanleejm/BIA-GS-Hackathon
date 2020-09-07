import React, { Component } from "react";
import {
  Paper,
  TextField,
  Grid,
  Button,
  Link,
  Typography,
} from "@material-ui/core";

class AuthPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerMode: false,
      username: "",
      password: "",
      showQuestionnaire: false,
      questionIndex: 0,
      questionnaire: [
        {
          question: "How old are you?",
          answers: ["Under 25", "25 to 50", "Above 50"],
        },

        {
          question: "What is your occupation?",
          answers: ["Doctor", "Student", "Fresh Graduate", "Retired", "Others"],
        },
        {
          question: "What is your risk appetite?",
          answers: ["High", "Medium", "Low"],
        },
        {
          question: "What are your spending needs relative to your income?",
          answers: [
            "100% of income",
            "75% of income",
            "50% of income",
            "25% of income or less",
          ],
        },
      ],
    };
  }

  componentDidMount() {
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

  onSubmit() {
    if (this.state.username !== "Apple") {
      this.setState({ showQuestionnaire: true });
    }
  }

  loginPage() {
    return (
      <div style={{ width: "80vw", margin: "auto", paddingTop: "10vw" }}>
        <Paper style={{ padding: "20px" }}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item>
              <TextField
                label="username"
                fullWidth
                onChange={(event) => {
                  this.setState({ username: event.target.value });
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="password"
                type="password"
                fullWidth
                onChange={(event) => {
                  this.setState({ password: event.target.value });
                }}
              />
            </Grid>

            {!this.state.registerMode ? (
              <div style={{ textAlign: "center" }}>
                <Grid item>
                  <Button
                    onClick={() => {
                      this.onSubmit();
                    }}
                  >
                    Log in
                  </Button>
                </Grid>

                <Link
                  onClick={() => {
                    this.setState({ registerMode: true });
                  }}
                >
                  New here? Register
                </Link>
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                <Grid item>
                  <Button
                    onClick={() => {
                      this.onSubmit();
                    }}
                  >
                    register
                  </Button>
                </Grid>

                <Link
                  onClick={() => {
                    this.setState({ registerMode: false });
                  }}
                >
                  Log in here
                </Link>
              </div>
            )}
          </Grid>
        </Paper>
      </div>
    );
  }

  showQuestionnaire() {
    if (this.state.questionIndex > 3) {
      localStorage.setItem("authenticated", "true");
      this.props.headerCallback(5);
    } else {
      var q = this.state.questionnaire[this.state.questionIndex];

      return (
        <div style={{ width: "80vw", margin: "auto", paddingTop: "10vw" }}>
          <Typography variant="h4">{q.question}</Typography>
          {q.answers.map((ans) => {
            return (
              <Paper
                style={{
                  width: "80vw",
                  padding: "20px",
                  cursor: "pointer",
                  marginBottom: "10px",
                }}
                onClick={() => {
                  this.setState({
                    questionIndex: this.state.questionIndex + 1,
                  });
                  console.log(this.state.questionIndex);
                }}
              >
                {ans}
              </Paper>
            );
          })}
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.state.showQuestionnaire
          ? this.showQuestionnaire()
          : this.loginPage()}
      </div>
    );
  }
}

export default AuthPage;
