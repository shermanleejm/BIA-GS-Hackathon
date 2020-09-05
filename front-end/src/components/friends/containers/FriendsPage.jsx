import React, { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import AddFriendsListComponent from '../components/AddFriendsListComponent';
import FriendWatchListComponent from '../components/FriendWatchListComponent';


const FriendsPage = () => {
    useEffect(() => {

    }, [])
    return (
        <div className='mt-5' style={{'maxWidth': '80vw', 'minWidth':'80vw', 'margin': 'auto'}}>
            <div className='py-3 col-3 mx-auto overflow-auto'  style={{"minWidth":'450px',"box-shadow": "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)"}}>
                <input className="form-control mr-sm-2 mb-4 pr-2" type="search" placeholder="Search" aria-label="Search"/>
                <AddFriendsListComponent />
                <FriendWatchListComponent />
            </div>
            <Col>

            </Col>
        </div>
    )
}

export default FriendsPage;