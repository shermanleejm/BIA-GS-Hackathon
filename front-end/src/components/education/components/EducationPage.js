import React, { Component } from "react";
import {
  Grid,
  Typography,
  Paper,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  Fab,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import postData from "./EducationPosts";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import stonks from "./stonks.jpg";

class EducationPage extends Component {
  constructor(props) {
    super(props);
    var categories = ["Basics", "Personal Finance", "Investing", "News"];

    this.state = {
      categories: categories,
      data: postData.postData,
      prevTopic: categories[0],
      topic: categories[0],
      searching: false,
      searchValue: "",
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    // fetch("http://" + process.env.REACT_APP_PUBLIC_IP + ":5000/");
    if (localStorage.getItem("skipReload") === null) {
      window.location.reload();
    }
    localStorage.setItem("skipReload", "true");
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  searchBar() {
    return (
      <span style={{ float: "right" }}>
        <TextField
          // label="search Financial Terms"
          placeholder="search Financial Terms"
          value={this.state.searchValue}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={(event) => {
            this.setState({ searchValue: event.target.value });

            if (event.target.value === null || event.target.value === "") {
              this.setState({ data: postData.postData });
            } else {
              fetch(
                "http://" +
                  process.env.REACT_APP_PUBLIC_IP +
                  ":8000/term/" +
                  event.target.value
              )
                .then((response) => response.json())
                .then((data) => {
                  console.log(data);
                  var newData = [
                    {
                      title: data.term,
                      shortDescription: data.body,
                      tag: "Search",
                      link: data.link,
                      img: stonks,
                    },
                  ];

                  this.setState({ data: newData, topic: "Search" });
                });
            }
          }}
        />
      </span>
    );
  }

  render() {
    return (
      <div
        style={{
          maxWidth: "80vw",
          margin: "auto",
          paddingTop: "20px",
          backgroundColor: "#ffffff",
          height: "100%",
        }}
      >
        <div
          style={{
            margin: 0,
            top: "auto",
            right: window.innerWidth > 800 ? 20 : 5,
            bottom: window.innerWidth > 800 ? 20 : 5,
            left: "auto",
            position: "fixed",
            zIndex: 100,
          }}
        >
          <Fab
            color="primary"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </div>

        <div>
          <Typography
            variant="h3"
            style={{ fontStyle: "italic", fontWeight: "bold" }}
          >
            Educate
          </Typography>
        </div>

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
                }}
              >
                <span
                  onClick={() => {
                    this.setState({
                      topic: word,
                      searchValue: "",
                      data: postData.postData,
                    });
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {this.state.topic === word ? <strong>{word}</strong> : word}
                </span>
              </Typography>
            );
          })}

          {window.innerWidth > 1000 && this.searchBar()}
        </div>
        {/* 
        <div>{window.innerWidth <= 1000 && this.searchBar()}</div> */}
        <Paper elevation={3} style={{ padding: "10px" }}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="stretch"
            spacing={3}
          >
            {this.state.data.map((post) => {
              if (post.tag == this.state.topic) {
                return (
                  <Grid item xs={12} md={6}>
                    <Card className="h-100">
                      <CardActionArea>
                        <img
                          src={post.img}
                          style={{
                            height: "300px",
                            objectFit: "cover",
                            objectPosition: "0% 0px",
                            width: "100%",
                            overflow: "hidden",
                          }}
                        />
                        <CardContent>
                          <Grid
                            container
                            direction="column"
                            justify="space-between"
                            alignItems="flex-start"
                          >
                            <Grid item>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                              >
                                {post.title}
                              </Typography>
                            </Grid>

                            <Grid item>
                              <Typography
                                gutterBottom
                                variant="subtitle2"
                                component="h2"
                              >
                                {post.shortDescription}
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </CardActionArea>

                      <div style={{ verticalAlign: "text-bottom" }}>
                        <CardActions>
                          <Button
                            size="large"
                            onClick={() => {
                              window.open(post.link, "_blank");
                            }}
                          >
                            learn more
                          </Button>
                        </CardActions>
                      </div>
                    </Card>
                  </Grid>
                );
              }
            })}
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default EducationPage;
