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
} from "@material-ui/core";
import { Skeleton, Autocomplete } from "@material-ui/lab";
import postImg from "../../../images/post_img.JPG";
import fininstruments from "./FinancialInstruments";
import edupost from "../../education/components/EducationPosts";

// {
// 	futures: {
// 		risk: "low",
// 		description: "lorem ipsum",
// 		top5: false,
// 	},
// 	stocks: {
// 		risk: "high",
// 		description: "lorem ipsum"
// 		top5: true,
// 	}
// }

class HomePage extends Component {
  constructor(props) {
    super(props);
    var filterOptions = ["Recommended", "Friends", "Partners"];
    console.log(filterOptions[Math.floor(Math.random() * 3)]);

    var finData = fininstruments.fininstruments;
    var top4 = finData.slice(0, 4);

    var postData = [];
    var tempArr = {};
    edupost.postData.map((row) => {
      tempArr = {
        title: row.title,
        category: filterOptions[Math.floor(Math.random() * 3)],
        shortDescription: row.shortDescription,
        img: row.img,
        url: row.link,
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
    };
  }

  // componentDidMount() {
  //   fetch("http://" + process.env.REACT_APP_PUBLIC_IP + ":5000/");
  // }

  render() {
    return (
      <div>
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

        <Typography
          variant="h6"
          style={{
            textAlign: "left",
            width: "78vw",
            margin: "auto",
            paddingTop: "10px",
          }}
        >
          Recommended financial products to focus on based on your risk profile:
        </Typography>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
          spacing={3}
          style={{ maxWidth: "80vw", margin: "auto" }}
        >
          <Grid
            item
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            {Object.keys(this.state.top4).map((key) => {
              return (
                <Grid item md={3} xs={12} lg={3}>
                  <Card>
                    <Grid
                      container
                      justify="space-between"
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        minWidth: "19vw",
                        height: "17vh",
                      }}
                    >
                      {this.state.isLoaded ? (
                        <div>
                          <Grid item>
                            <Typography variant="h6">
                              {this.state.top4[key]["title"]}
                            </Typography>
                          </Grid>

                          <Grid item>
                            {this.state.top4[key]["shortDescription"].length >
                            100 ? (
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
                          <Skeleton variant="rect" width="100" height="50" />
                        )}
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

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
                            xs={6}
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
