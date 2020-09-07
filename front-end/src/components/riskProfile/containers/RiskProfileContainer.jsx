import React from "react";
import { Paper } from "@material-ui/core";
import { useState } from "react";
import HomePage from "../../home/components/HomePage";
import App from "../../app/App";

const RiskProfileContainer = () => {
  const [completed, setCompleted] = useState(false);
  const handleClick = () => {
    setCompleted(true);
    localStorage.setItem("newUser", "false");
  };
  return completed ? (
    <App />
  ) : (
    <Paper
      className="container"
      elevation={3}
      style={{ "background-color": "lightgrey" }}
    >
      <div className="card-body">
        <h3 className="card-title">
          You have a <span className="badge badge-info">LOW RISK</span> profile!
        </h3>
        <p className="card-text">These are your potential focus areas:</p>
        <div className="row text-left mb-4">
          <div className="col-md-4 col-sm-12">
            <div
              className="card h-150 mb-4"
              style={{
                "box-shadow":
                  "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)",
              }}
            >
              <div className="card-body">
                <h5 className="card-title">Futures</h5>
                <p className="card-text">
                  <small>
                    A legal agreement to buy or sell a particular commodity
                    asset, or security at a predetermined price at a specified
                    time in the future.
                  </small>
                </p>
                <a href="#" className="btn btn-primary">
                  Learn More
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div
              className="card h-150 mb-4"
              style={{
                "box-shadow":
                  "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)",
              }}
            >
              <div className="card-body">
                <h5 className="card-title">ETFs</h5>
                <p className="card-text">
                  <small>
                    A type of security that involves a collection of
                    securities—such as stocks—that often tracks an underlying
                    index
                  </small>
                </p>
                <a href="#" className="btn btn-primary">
                  Learn More
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div
              className="card h-150 mb-4"
              style={{
                "box-shadow":
                  "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)",
              }}
            >
              <div className="card-body">
                <h5 className="card-title">REITs</h5>
                <p className="card-text">
                  <small>
                    Allows individual investors to earn dividends from real
                    estate investments—without having to buy, manage, or finance
                    any properties themselves.
                  </small>
                </p>
                <a href="#" className="btn btn-primary">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
        <a href="#" className="btn btn-primary" onClick={handleClick}>
          CONTINUE
        </a>
      </div>
    </Paper>
  );
};

export default RiskProfileContainer;
