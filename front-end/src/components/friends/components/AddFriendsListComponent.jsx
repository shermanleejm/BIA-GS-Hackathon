import React, { useEffect, useState } from 'react';
import AddFriendInfoComponent from './AddFriendInfoComponent';
import { Row } from 'react-bootstrap';
import Cookies from 'js-cookie';
import axios from 'axios';
const AddFriendsListComponent = (props) => {
    const [suggestedFriends,setSuggestedFriends] = useState();

    const handleUserSelect = (userid) => {
        props.handleUserSelect(userid);
    }

    useEffect(() => {
        console.log("FRIENDS SUGGESTION CHANGED!!!", props.suggestedFriends)
        setSuggestedFriends(props.suggestedFriends)
    },[props.suggestedFriends])

    const handleAddFriend = (friendId) => {
        props.handleAddFriend(friendId);
    }

    return (
        <>
            <h2 className='font-italic pb-2'>Suggested Friends</h2>

            { suggestedFriends ? suggestedFriends.map((friend, index) => {
                return <AddFriendInfoComponent key={friend.user_id} friend={friend} index={index} handleUserSelect={handleUserSelect} handleAddFriend={handleAddFriend}/>
            }) : <></>}
        </>
    )
}

export default AddFriendsListComponent