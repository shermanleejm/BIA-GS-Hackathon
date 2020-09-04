import React from 'react';
import { Paper } from "@material-ui/core";
import { useState } from 'react';
import HomePage from '../../home/components/HomePage';

const RiskProfileContainer = () => {
    const [completed, setCompleted] = useState(false);
    const handleClick = () => {
        setCompleted(true);
    }
    return (
        completed ? <HomePage /> :
        <Paper className='container' style={{'background-color': 'lightgrey'}}>
            <div className="card-body">
                <h3 className="card-title">You have a <span className='badge badge-info'>LOW RISK</span> profile!</h3>
                <p className="card-text">These are your potential focus areas:</p>
                <div className='row text-left mb-4'>
                    <div className='col-md-4 col-sm-12'>
                        <div className="card h-150">
                            <div className="card-body">
                                <h5 className="card-title">Futures</h5>
                                <p className="card-text"><small>A legal agreement to buy or sell a particular commodity asset, or security at a predetermined price at a specified time in the future.</small></p>
                                <a href="#" className="btn btn-primary">Learn More</a>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 col-sm-12'>
                        <div className="card h-150">
                            <div className="card-body">
                                <h5 className="card-title">ETFs</h5>
                                <p className="card-text"><small>A type of security that involves a collection of securities—such as stocks—that often tracks an underlying index</small></p>
                                <a href="#" className="btn btn-primary">Learn More</a>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 col-sm-12'>
                        <div className="card h-150">
                            <div className="card-body">
                                <h5 className="card-title">REITs</h5>
                                <p className="card-text"><small>Allows individual investors to earn dividends from real estate investments—without having to buy, manage, or finance any properties themselves.</small></p>
                                <a href="#" className="btn btn-primary">Learn More</a>
                            </div>
                        </div>
                    </div>
                </div>
                <a href="#" className="btn btn-primary" onClick={handleClick}>CONTINUE</a>
            </div>
        </Paper>
    );
}

export default RiskProfileContainer