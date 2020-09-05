import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";
import postData from "./EducationPosts";

class EducationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: ["Investing", "Personal Finance", "Basics", "News"],
      data: postData.postData,
    };
  }

  render() {
    return (
      <div>
        <Grid container column spacing={4} style={{ paddingTop: "20px" }}>
          <Grid
            item
            style={{ width: "80vw", margin: "auto", textAlign: "left" }}
          >
            <Typography
              variant="h3"
              style={{ fontWeight: "bold", fontStyle: "italic" }}
            >
              Educate
            </Typography>
          </Grid>

          <div style={{ marginLeft: "40px", whiteSpace: "nowrap" }}>
            <Grid item>
              <div className="row">
                {this.state.categories.map((item) => {
                  return (
                    <h6
                      style={{ paddingRight: "20px", display: "inline-block" }}
                    >
                      {item}
                    </h6>
                  );
                })}
              </div>
            </Grid>
          </div>
        </Grid>
      </div>
    );
  }
}

export default EducationPage;
