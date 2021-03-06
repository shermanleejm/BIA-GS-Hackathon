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
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { TabPanel } from "@material-ui/lab";

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
        <div style={{ position: "sticky", width: "100vw" }}>
          <Paper style={{ flexGrow: 1, backgroundColor: "#f7f4fa" }}>
            <Tabs
              value={this.state.value}
              onChange={(event, newValue) => {
                this.setState({
                  value: newValue,
                });
                this.props.headerCallback(newValue);
                localStorage.setItem("pageToShow", newValue);
              }}
              indicatorColor="primary"
              centered
            >
              <Tab icon={<HomeIcon />} label="Home" />
              <Tab icon={<SchoolIcon />} label="Learn" />
              <Tab icon={<PeopleIcon />} label="Friends" />
              <Tab icon={<SportsEsportsIcon />} label="Game" />
              <Tab
                icon={<ExitToAppIcon />}
                label="Logout"
                onClick={() => {
                  localStorage.setItem("authenticated", "false");
                }}
              />
            </Tabs>
          </Paper>
        </div>
      </ThemeProvider>
    );
  }
}

export default AppHeader;
