import React, { Component } from "react";
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Paper,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import SchoolIcon from "@material-ui/icons/School";
import PeopleIcon from "@material-ui/icons/People";

class AppHeader extends Component {
  constructor(props) {
    super(props);
    var value = this.props.pageToShow;
    this.state = { value: value };
  }

  render() {
    var theme = createMuiTheme({
      palette: {
        primary: {
          main: "#2255ff",
        },
        secondary: {
          main: "#17161c",
        },
      },
    });

    return (
      <ThemeProvider theme={theme}>
        <div>
          <Paper style={{ flexGrow: 1, backgroundColor: "#f7f4fa" }}>
            <Tabs
              value={this.state.value}
              onChange={(event, newValue) => {
                this.setState({
                  value: newValue
                })
                this.props.headerCallback(newValue);
                console.log(this.state.value);
              }}
              indicatorColor="primary"
              centered
            >
              <Tab icon={<HomeIcon />} />
              <Tab icon={<SchoolIcon />} />
              <Tab icon={<PeopleIcon />} />
            </Tabs>
          </Paper>
        </div>
      </ThemeProvider>
    );
  }
}

export default AppHeader;
