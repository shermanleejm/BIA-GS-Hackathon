import React, { useEffect } from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import FriendWatchListInfoComponent from './FriendWatchListInfoComponent';
const FriendWatchListComponent = (props) => {
    // const [friends, setFriends] = useState();
    const friends = [
        {name: 'john', user_id: 'john',watchlist: ['stock1', 'stock2']}, {name:'jill', user_id: 'jill',watchlist: ['stock1', 'stock2']}, {name: 'jack', user_id: 'jack',watchlist: ['stock1', 'stock2']}
    ]
    // useEffect (() => {
    //     const userid = Cookies.get('userid')
    //     axios.get(
    //         "http://" + process.env.REACT_APP_PUBLIC_IP + ":8000/user/{userid}/getfriends"
    //     ).then(res => {
    //         setFriends(res.data.friends);
    //     })
    // }, [])
    const handleUserSelect = (userid) => {
        props.handleUserSelect(userid);
    }
    return (
        <>
            <h2 className='font-italic pb-2'>Friends' WatchList</h2>
            {
                friends.map(friend => {
                    return <FriendWatchListInfoComponent key={friend.name} data={friend} handleUserSelect={handleUserSelect}/>
                })
            }
        </>
    )
}

export default FriendWatchListComponent
