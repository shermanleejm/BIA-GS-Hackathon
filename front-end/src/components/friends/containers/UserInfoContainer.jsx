import React from 'react';
import { Row, Container } from 'react-bootstrap';
import UserBannerComponent from '../components/UserBannerComponent';
import UserWatchlistComponent from '../components/UserWatchlistComponent';
import UserPostComponent from '../components/UserPostComponent';
import { Paper } from '@material-ui/core';

const UserInfoContainer = (props) => {
    const userData = props.userData;
    let watchlists;
    let posts;
    let info;
    if (props.userData) {
        watchlists = userData.watchlist;
        posts = userData.posts;
        info = userData.info;
    }

    // const watchlists = ["AAPL", "TSLA", "CLDR", "GOOGL", "EBAY"]

    return (
        userData && userData.length !== 0 ? <div className="d-block ">
            <Paper elevation={3} className={'py-3 px-3 mb-4'}>
                <Row>
                    <UserBannerComponent info={info}/>
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
        </div> : <Container elevation={3} className={'py-3 px-3 mb-4 '}>
                <h3 className='font-weight-light font-weight-bold align-middle' style={{color:"grey"}}>Select people's names to preview their profile</h3>
            </Container>
    )
}

export default UserInfoContainer