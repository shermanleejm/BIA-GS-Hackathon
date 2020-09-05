import React, { Component } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  Paper,
  CardMedia,
  Modal,
  Fab,
  FormControl,
} from "@material-ui/core";
import { Skeleton, Autocomplete } from "@material-ui/lab";
import fininstruments from "./FinancialInstruments";
import edupost from "../../education/components/EducationPosts";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import Cookies from "js-cookie";

class HomePage extends Component {
  constructor(props) {
    super(props);
    var filterOptions = ["Recommended", "Watch List", "Friends"];

    var finData = fininstruments.fininstruments;
    var top4 = finData.slice(0, 4);

    var postData = [];
    var tempArr = {};
    edupost.postData.map((row) => {
      tempArr = {
        title: row.title,
        category: filterOptions[Math.floor(Math.random() * 1)],
        shortDescription: row.shortDescription,
        img: row.img,
        url: row.link,
        likes: Math.floor(Math.random() * 1000),
      };
      postData.push(tempArr);
    });

    this.state = {
      isLoaded: true,
      top4: top4,
      filterOptions: filterOptions,
      chosenFilter: [filterOptions[0]],
      postData: postData,
      showModal: false,
      modalToShow: 0,
      showNewPost: false,
      postTitle: "",
      postContent: "",
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
      <div>
        <div
          style={{
            margin: 0,
            top: "auto",
            right: 20,
            bottom: 20,
            left: "auto",
            position: "fixed",
          }}
        >
          <Fab
            color="primary"
            onClick={() => {
              this.setState({ showNewPost: true });
              console.log(this.state.showNewPost);
            }}
          >
            <AddIcon />
          </Fab>
        </div>

        {this.state.showNewPost && (
          <Modal
            open={this.state.showNewPost}
            onClose={() => this.setState({ showNewPost: false })}
          >
            <div
              style={{
                position: "fixed",
                outline: 0,
                top: "25%",
                left: "50%",
                transform: "translate(-50%, -25%)",
                backgroundColor: "#ffffff",
                margin: "auto",
              }}
            >
              <Paper style={{ padding: "20px", width: "80vw" }}>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="stretch"
                  spacing={3}
                >
                  <Grid item>
                    <TextField
                      requried
                      label="Title"
                      fullWidth
                      onChange={(event) => {
                        this.setState({ postTitle: event.target.value });
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      required
                      multiline
                      rows={4}
                      fullWidth
                      label="Content"
                      onChange={(event) => {
                        this.setState({ postTitle: event.target.value });
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={() => {
                        axios.post(
                          "http://" +
                            process.env.REACT_APP_PUBLIC_IP +
                            ":/5000/post/create/",
                          {
                            userid: Cookies.get("userid"),
                            content:
                              this.state.postTitle +
                              "SHERMANROX" +
                              this.state.postContent,
                          }
                        );
                        this.setState({ showNewPost: false });
                      }}
                    >
                      Submit post
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          </Modal>
        )}

        {this.state.showModal && (
          <Modal
            open={this.state.showModal}
            onClose={() => this.setState({ showModal: false })}
          >
            <div
              style={{
                position: "fixed",
                outline: 0,
                top: "25%",
                left: "50%",
                transform: "translate(-50%, -25%)",
                backgroundColor: "#ffffff",
                margin: "auto",
              }}
            >
              <Paper style={{ padding: "20px", width: "80vw" }}>
                <Grid
                  container
                  direction="column"
                  justify="space-between"
                  alignItems="flex-start"
                >
                  <Grid item>
                    <Typography variant="h3">
                      {this.state.top4[this.state.modalToShow]["title"]}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography variant="h6">
                      {this.state.top4[this.state.modalToShow]["instrument"]}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography variant="h6">
                      {this.state.top4[this.state.modalToShow]["assetClass"]}
                    </Typography>
                  </Grid>

                  <Grid item>
                    {this.state.top4[this.state.modalToShow]["shortDescription"]
                      .length > 400 ? (
                      <span>
                        <Typography variant="body2">
                          {this.state.top4[this.state.modalToShow][
                            "shortDescription"
                          ].slice(0, 393)}
                          <strong> more...</strong>
                        </Typography>
                      </span>
                    ) : (
                      <Typography variant="body2">
                        {
                          this.state.top4[this.state.modalToShow][
                            "shortDescription"
                          ]
                        }
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            </div>
          </Modal>
        )}

        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
          spacing={3}
          style={{ maxWidth: "80vw", margin: "auto" }}
        >
          {window.innerWidth > 900 && (
            <div>
              <Typography
                variant="h6"
                style={{
                  textAlign: "left",
                  width: "78vw",
                  margin: "auto",
                  paddingTop: "10px",
                }}
              >
                Recommended financial products to focus on based on your risk
                profile:
              </Typography>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="stretch"
                spacing={2}
              >
                {Object.keys(this.state.top4).map((key) => {
                  return (
                    <Grid item md={3} xs={12} lg={3}>
                      <Paper
                        style={{
                          height: "100%",
                          textAlign: "left",
                          padding: "20px",
                        }}
                      >
                        <Grid
                          container
                          direction="column"
                          justify="space-between"
                          alignItems="flex-start"
                          style={{ height: "100%" }}
                        >
                          {this.state.isLoaded ? (
                            <div>
                              <Grid item>
                                <Typography variant="h6">
                                  {this.state.top4[key]["title"]}
                                </Typography>
                              </Grid>

                              <Grid item>
                                {this.state.top4[key]["shortDescription"]
                                  .length > 100 ? (
                                  <span>
                                    <Typography variant="body2">
                                      {this.state.top4[key][
                                        "shortDescription"
                                      ].slice(0, 93)}
                                      <strong> more...</strong>
                                    </Typography>
                                  </span>
                                ) : (
                                  <Typography variant="body2">
                                    {this.state.top4[key]["shortDescription"]}
                                  </Typography>
                                )}
                              </Grid>
                            </div>
                          ) : (
                            <div>
                              <Skeleton variant="text" />
                            </div>
                          )}

                          <Grid item>
                            {this.state.isLoaded ? (
                              <Button
                                onClick={() => {
                                  this.setState({
                                    showModal: true,
                                    modalToShow: key,
                                  });
                                }}
                              >
                                learn more
                              </Button>
                            ) : (
                              <Skeleton
                                variant="rect"
                                width="100"
                                height="50"
                              />
                            )}
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          )}

          <Grid
            item
            style={{ width: "79vw", paddingBottom: "30px", paddingTop: "20px" }}
          >
            <Autocomplete
              multiple
              options={this.state.filterOptions}
              defaultValue={this.state.chosenFilter}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Filter Posts"
                  // placeholder="Favorites"
                />
              )}
              onChange={(event, newValue) => {
                this.setState({
                  chosenFilter: newValue,
                });
              }}
            />
          </Grid>
          <Grid item>
            <Grid container column spacing={3}>
              {this.state.postData.map((post) => {
                if (this.state.chosenFilter.includes(post.category)) {
                  return (
                    <Grid item>
                      <Card
                        style={{ width: "80vw" }}
                        onClick={() => {
                          window.open(post.url, "_blank");
                        }}
                      >
                        <Grid
                          container
                          row
                          justify="space-between"
                          alignItems="center"
                          style={{ padding: "10px" }}
                        >
                          <Grid
                            item
                            alignItems="flex-start"
                            xs={12}
                            md={8}
                            lg={10}
                          >
                            {this.state.isLoaded ? (
                              <CardContent>
                                <Typography variant="h5">
                                  {post.title}
                                </Typography>
                                <Typography variant="body2">
                                  {post.shortDescription}
                                </Typography>

                                <Grid
                                  container
                                  direction="row"
                                  justify="flex-start"
                                  alignItems="center"
                                  spacing={3}
                                  style={{ paddingTop: "10px" }}
                                >
                                  <Grid item>
                                    <ThumbUpIcon />
                                  </Grid>
                                  <Grid item>{post.likes}</Grid>
                                </Grid>
                              </CardContent>
                            ) : (
                              <div
                                style={{ width: "100%", paddingLeft: "10%" }}
                              >
                                <Skeleton variant="text" />
                                <Skeleton variant="text" />
                                <Skeleton variant="text" />
                              </div>
                            )}
                          </Grid>

                          {window.innerWidth > 1000 && (
                            <Grid item xs={4} md={3} lg={2}>
                              {this.state.isLoaded ? (
                                <img
                                  src={post.img}
                                  style={{ height: "128px", width: "128px" }}
                                />
                              ) : (
                                <div>
                                  <Skeleton
                                    variant="rect"
                                    height="128"
                                    width="128"
                                  />
                                </div>
                              )}
                            </Grid>
                          )}
                        </Grid>
                      </Card>
                    </Grid>
                  );
                }
              })}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default HomePage;
