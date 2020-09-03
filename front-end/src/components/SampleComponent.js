import React, { Component } from "react";

class SampleComponent extends Component {
    constructor(props) {
        super(props);

        var hardcodedDarkMode = ""
        if (this.props.hardcodedDarkMode !== undefined) {
            hardcodedDarkMode = this.props.hardcodedDarkMode;
        }

        this.state = {
            darkMode: false,
            hardcodedDarkMode: hardcodedDarkMode,
        }
    }

    /**
     * Single Fetch Request
     */
    componentDidMount() {
        fetch("http://" + process.env.REACT_APP_PUBLIC_IP + ":5000/")
        .then((response) => response.json())
        .then((json) => {
            console.log(json.title);
            this.setState({
                darkMode: json.darkMode,
            })
        })
    }

    /**
     * Multiple Fetch Request
     */
    componentDidMount() {
        var listings = [];
        Promise.all([
          fetch(
            "http://" +
              process.env.REACT_APP_PUBLIC_IP +
              ":5000/pathA/?attribute1=" +
              this.props.attribute1 +
              "&attribute2=" +
              this.props.attribute2
          ),
          fetch(
            "http://" +
              process.env.REACT_APP_PUBLIC_IP +
              ":5000/pathB/?attribute1=" +
              this.props.attribute1 +
              "&attribute2=" +
              this.props.attribute2
          ),
          fetch(
            "http://" +
              process.env.REACT_APP_PUBLIC_IP +
              ":5000/pathC/?attribute1=" +
              this.props.attribute1 +
              "&attribute2=" +
              this.props.attribute2
          ),
        ])
          .then((allResponses) => Promise.all(allResponses.map((r) => r.text())))
          .then((json) => {
            var i = 0;
            json.map((jstring) => {
              let jObj = JSON.parse(jstring);
              jObj.map((listing) => {
                if (listing.job_title !== "") {
                  listing.pretty_posted = this.convertTime(listing.posted);
                  listing.id = i;
                  i++;
                  listings.push(listing);
                }
              });
            });
            this.setState({
              jobData: listings,
              isLoaded: true,
            });
          });
      }

    render() {
        if (this.state.darkMode) {
            return <div>DARK MODE</div>
        } else {
            return <div>LIGHT MODE</div>
        }
    }
}

export default SampleComponent;