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
} from "@material-ui/core";
import postData from "./EducationPosts";

class EducationPage extends Component {
  constructor(props) {
    super(props);
    var categories = ["Investing", "Personal Finance", "Basics", "News"];

    this.state = {
      categories: categories,
      data: postData.postData,
      topic: categories[0],
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    // fetch("http://" + process.env.REACT_APP_PUBLIC_IP + ":5000/");
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    return (
      <div
        style={{
          maxWidth: "80vw",
          margin: "auto",
          paddingTop: "20px",
          backgroundColor: "#ffffff",
        }}
      >
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
                  paddingTop: "20px",
                  paddingRight: "20px",
                  display: "inline-block",
                }}
              >
                <span
                  onClick={() => {
                    this.setState({ topic: word });
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {word}
                </span>
              </Typography>
            );
          })}
        </div>

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
