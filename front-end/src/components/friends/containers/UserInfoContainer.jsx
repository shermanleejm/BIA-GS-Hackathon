import React from 'react';
import { Row } from 'react-bootstrap';
import UserBannerComponent from '../components/UserBannerComponent';
import UserWatchlistComponent from '../components/UserWatchlistComponent';
import UserPostComponent from '../components/UserPostComponent';
import { Paper } from '@material-ui/core';

const UserInfoContainer = (props) => {
    console.log(props.userData);
    const userData = props.userData;
    let watchlists;
    let posts;
    let info;
    if (userData) {
        watchlists = userData.watchlists;
        posts = userData.posts;
        info = userData.info;
    }

    // const watchlists = ["AAPL", "TSLA", "CLDR", "GOOGL", "EBAY"]

    return (
        <div className="d-block ">
            <Paper elevation={3} className={'py-3 px-3 mb-4'}>
                <Row>
                    <UserBannerComponent/>
                </Row>
            </Paper>
            <Paper elevation={3} className={'py-3 px-3 mb-4'}>
                <Row>
                    <h4 className={'mx-3'}>
                        Watchlist
                    </h4>
                </Row>
                <Row>
                    <UserWatchlistComponent watchlists={watchlists}/>
                </Row>
            </Paper>
            <Paper elevation={3} className={'py-3 px-3 mb-4'}>
                <Row>
                    <h4 className={'mx-3'}>
                        Posts
                    </h4>
                </Row>
                <Row>
                    <UserPostComponent posts={posts}/>
                </Row>
            </Paper>
        </div>
    )
}

export default UserInfoContainer