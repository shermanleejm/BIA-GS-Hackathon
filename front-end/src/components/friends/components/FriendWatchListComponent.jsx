import React, { useEffect } from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import FriendWatchListInfoComponent from './FriendWatchListInfoComponent';
const FriendWatchListComponent = () => {
    // const [friends, setFriends] = useState();
    const friends = [
        {name: 'john', watchlist: ['stock1', 'stock2']}, {name:'jill', watchlist: ['stock1', 'stock2']}, {name: 'jack', watchlist: ['stock1', 'stock2']}
    ]
    // useEffect (() => {
    //     const userid = Cookies.get('userid')
    //     axios.get(
    //         "http://" + process.env.REACT_APP_PUBLIC_IP + ":5000/user/{userid}/getfriends"
    //     ).then(res => {
    //         setFriends(res.data.friends);
    //     })
    // }, [])

    return (
        <>
            <h2 className='font-italic pb-2'>Friends' WatchList</h2>
            {
                friends.map(friend => {
                    return <FriendWatchListInfoComponent data={friend}/>
                })
            }
        </>
    )
}

export default FriendWatchListComponent
