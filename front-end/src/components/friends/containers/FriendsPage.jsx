import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import AddFriendsListComponent from '../components/AddFriendsListComponent';
import FriendWatchListComponent from '../components/FriendWatchListComponent';
import UserInfoContainer from './UserInfoContainer';
import axios from 'axios';
import { Paper } from '@material-ui/core';
import Cookies from 'js-cookie';
const FriendsPage = (props) => {
    const [userData, setUserData] = useState([]);
    const [friends, setFriends] = useState();

    useEffect(()=> {
        setFriends(props.friends);
        console.log(props.friends)
    }, [props.friends])

    const handleClick = (data) => {
        setUserData(data);
    }

    const addNewFriend = (friendData) => {
        setFriends(friends.push(friendData.info.user_id));
        setUserData(userData.push(friendData))
    }

    return (
        <div className='row mt-5 justify-content-center' style={{'maxWidth': '80vw', 'minWidth':'80vw', 'margin': 'auto'}}>
            <div className='overflow-scroll mb-5'>
                <Paper elevation={3} style={{minWidth: "350px"}} className={'d-flex align-content-center'}>
                    <div className='mx-auto mt-3'>
                        <input className="form-control mr-sm-2 mb-4 pr-2" type="search" placeholder="Search" aria-label="Search"/>
                        <AddFriendsListComponent handleUserSelect={handleClick} suggestedFriends={props.suggestedFriends} addNewFriend={addNewFriend} />
                        <FriendWatchListComponent handleUserSelect={handleClick} friends={friends}/>
                    </div>
                </Paper>
            </div>
            <div className="col-md-7 col-5 mx-auto overflow-auto" style={{minWidth: "350px"}}>
                <UserInfoContainer userData={userData}/>
            </div>
            {/* <div className='py-3 col-3 overflow-auto'  style={{"minWidth":'450px',"boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)"}}>
                <input className="form-control mr-sm-2 mb-4 pr-2" type="search" placeholder="Search" aria-label="Search"/>
                <AddFriendsListComponent handleUserSelect={handleClick}/>
                <FriendWatchListComponent handleUserSelect={handleClick}/>
            </div>
            <div className="col-9" style={{minWidth: "500px"}}>
                <UserInfoContainer selectedUser={selectedUser}/>
            </div> */}
        </div>
    )
}

export default FriendsPage;