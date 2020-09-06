import React, { useEffect } from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import FriendWatchListInfoComponent from './FriendWatchListInfoComponent';
const FriendWatchListComponent = (props) => {
    const [friends, setFriends] = useState();

    useEffect(() => {
        if (props.friends) {
            setFriends(props.friends)
        }
    })

    const handleUserSelect = (data) => {
        console.log(data)
        props.handleUserSelect(data);
    }
    return (
        <>
            <h2 className='font-italic pb-2'>Friends' WatchList</h2>
            {   friends ?
                friends.map(friend => {
                    return <FriendWatchListInfoComponent key={friend.user_id} data={friend} handleUserSelect={handleUserSelect}/>
                }) : <></>
            }
        </>
    )
}

export default FriendWatchListComponent
