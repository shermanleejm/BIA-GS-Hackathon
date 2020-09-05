import React, { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import FriendInfoComponent from './FriendInfoComponent';

const FriendsListComponent = () => {
    // const [friends, setFriends] = useState();
    const friends = [
        {name: 'john'}, {name:'jill'}, {name: 'jack'}
    ]
    // useEffect(() => {
    //     const userid = Cookies.get(userid)
    //     axios.get(
    //         "http://" + process.env.REACT_APP_PUBLIC_IP + ":5000/user/{userid}/getFriends"
    //     ).then(res => {
    //         setFriends(res.data.friends);
    //     })
    // })

    return (
        <>
        {friends.map((friend, index) => {
            return <FriendInfoComponent friend={friend} index={index}/>
        })}
        </>
    )
}

export default FriendsListComponent