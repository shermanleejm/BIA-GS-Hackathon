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
} from "@material-ui/core";
import { Skeleton, Autocomplete } from "@material-ui/lab";
import testData from "./TempData";
import postImg from "../../../images/post_img.JPG";

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
    this.state = {
      isLoaded: true,
      top4: {
        futures: {
          risk: "low",
          description: "lorem ipsum",
          top5: false,
        },
        stocks: {
          risk: "high",
          description: "lorem ipsum",
          top5: true,
        },
        bonds: {
          risk: "high",
          description: "lorem ipsum",
          top5: true,
        },
        "Money Market Fund": {
          risk: "high",
          description: "lorem ipsum",
          top5: true,
        },
      },
      filterOptions: ["Recommended", "Friends", "Partners"],
      chosenFilter: ["Recommended"],
      postData: testData.testData,
    };
  }

  // componentDidMount() {
  //   fetch("http://" + process.env.REACT_APP_PUBLIC_IP + ":5000/");
  // }

  render() {
    return (
      <div>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
          spacing={3}
          style={{ paddingTop: "20px", maxWidth: "80vw", margin: "auto" }}
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
                <Grid item md={3} xs={12}>
                  <Card style={{ textAlign: "left", minWidth: "19vw" }}>
                    <CardContent>
                      {this.state.isLoaded ? (
                        <div>
                          <Typography variant="h5">{key}</Typography>
                          <Typography variant="body2">
                            {this.state.top4[key]["description"]}
                          </Typography>
                        </div>
                      ) : (
                        <div>
                          <Skeleton variant="text" />
                        </div>
                      )}
                    </CardContent>
                    <CardActions>
                      {this.state.isLoaded ? (
                        <Button>learn more</Button>
                      ) : (
                        <Skeleton variant="rect" width="100" height="50" />
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          <Grid item style={{ width: "79vw", paddingBottom: "30px", paddingTop: "20px" }}>
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
            <Grid
              container
              column
              spacing={3}
              style={{ textAlign: "left", width: "80vw", minWidth: "80vw" }}
            >
              {this.state.postData.map((post) => {
                if (this.state.chosenFilter.includes(post.category)) {
                  return (
                    <Grid item>
                      <Card style={{ minWidth: "80vw" }}>
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
                                src={postImg}
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
