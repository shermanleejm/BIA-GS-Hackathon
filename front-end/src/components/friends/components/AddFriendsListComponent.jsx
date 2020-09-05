import React, { useEffect, useState } from 'react';
import AddFriendInfoComponent from './AddFriendInfoComponent';
import { Row } from 'react-bootstrap';
import Cookies from 'js-cookie';
import axios from 'axios';
const AddFriendsListComponent = (props) => {
    // const [suggestedFriends, setSuggestedFriends] = useState();
    const suggestedFriends = props.suggestedFriends;
    // const suggestedFriends = [
    //     {name: 'john', occupation: 'doctor', risk: 'high', user_id:'john'}, {name:'jill', occupation: 'doctor', risk: 'high',user_id:'jill'}, {name: 'jack', occupation: 'doctor', risk: 'high',user_id:'jack'}
    // ]

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

    return (
        <>
            <h2 className='font-italic pb-2'>Suggested Friends</h2>

            { suggestedFriends ? suggestedFriends.map((friend, index) => {
                return <AddFriendInfoComponent key={friend.user_id} friend={friend} index={index} handleUserSelect={handleUserSelect}/>
            }) : <></>}
        </>
    )
}

export default AddFriendsListComponent