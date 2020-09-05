import React, { useEffect, useState } from 'react';
import AddFriendInfoComponent from './AddFriendInfoComponent';

const AddFriendsListComponent = () => {
    // const [suggestedFriends, setSuggestedFriends] = useState();
    const suggestedFriends = [
        {name: 'john', occupation: 'doctor', risk: 'high'}, {name:'jill', occupation: 'doctor', risk: 'high'}, {name: 'jack', occupation: 'doctor', risk: 'high'}
    ]
    // useEffect(() => {
    //     const userid = Cookies.get('userid')
    //     axios.get(
    //         "http://" + process.env.REACT_APP_PUBLIC_IP + ":5000/user/{userid}/getSuggestedFriends"
    //     ).then(res => {
    //         setSuggestedFriends(res.data.friends.slice(0,3));
    //     })
    // })

    return (
        <>
            <h2 className='font-italic pb-2'>Suggested Friends</h2>
            {suggestedFriends.map((friend, index) => {
                return <AddFriendInfoComponent friend={friend} index={index}/>
            })}
        </>
    )
}

export default AddFriendsListComponent