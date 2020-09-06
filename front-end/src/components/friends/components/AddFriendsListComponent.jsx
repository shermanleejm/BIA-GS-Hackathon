import React, { useEffect, useState } from 'react';
import AddFriendInfoComponent from './AddFriendInfoComponent';
import { Row } from 'react-bootstrap';
import Cookies from 'js-cookie';
import axios from 'axios';
const AddFriendsListComponent = (props) => {
    const suggestedFriends = props.suggestedFriends;

    const handleUserSelect = (userid) => {
        props.handleUserSelect(userid);
    }
    // useEffect(() => {
    //     const userid = Cookies.get('userid')
    //     axios.get(
    //         "http://" + process.env.REACT_APP_PUBLIC_IP + `:5001/user/getstrangers/${userid}`
    //     ).then(res => {
    //         setSuggestedFriends(res.data.slice(0,3));
    //     })
    // },[])
    const addNewFriend = (friendData) => {
        props.addNewFriend(friendData);
    }

    return (
        <>
            <h2 className='font-italic pb-2'>Suggested Friends</h2>

            { suggestedFriends ? suggestedFriends.map((friend, index) => {
                return <AddFriendInfoComponent key={friend.user_id} friend={friend} index={index} handleUserSelect={handleUserSelect} addNewFriend={addNewFriend}/>
            }) : <></>}
        </>
    )
}

export default AddFriendsListComponent