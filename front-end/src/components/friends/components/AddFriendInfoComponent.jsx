import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import axios from 'axios';
import Cookies from 'js-cookie';

const AddFriendInfoComponent = (props) => {
    const index = props.index;
    const friend = props.friend;
    const name = friend.user_id;
    const friendId = friend.user_id;
    const [hidden, setHidden] = useState(false);
    const [friendData, setFriendData] = useState();
    useEffect(() => {
        axios.get("http://" + process.env.REACT_APP_PUBLIC_IP + `:5001/user/getuserinfo/${friendId}`).then(res => {
            setFriendData(res.data);
        })
    }, [])

    const handleAddFriend = () => {
        props.handleAddFriend(friendId)
        setHidden(true);
    }

    const handleUserSelect = () => {
        props.handleUserSelect(friendData);
    }

    return (
        <Row className={'ml-2'} hidden={hidden} style={{maxWidth:'380px'}}>
            <div className='mr-2 mb-n5' onClick={handleUserSelect}>
                <img src={`/images/avatar${index+1}.jpg`} alt="..." className="img-thumbnail h-50 rounded-circle mr-n5"/>
                <div className='float-right ml-n4 mr-2'>
                    <span className='text-uppercase font-weight-bold'>{name}</span>
                    <span className='d-block text-capitalize'>Occupation: {friend.occupation}</span>
                    <span className='d-block text-capitalize'>Risk: {friend.risk}</span>
                </div>
            </div>
            <div>
                <button className='btn btn-sm' onClick={handleAddFriend}>
                    <PersonAddIcon />
                </button>
            </div>
        </Row>
    )
}

export default AddFriendInfoComponent

