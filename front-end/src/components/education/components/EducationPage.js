import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";

class EducationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Grid container column spacing={2} style={{ paddingTop: "20px" }}>
          <Grid
            item
            style={{ width: "80vw", margin: "auto", textAlign: "left" }}
          >
            <Typography variant="h4">Educate</Typography>
          </Grid>

          <Grid item>
            <Grid container row alignItems="flex-start" justify="center">
              
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default EducationPage;
