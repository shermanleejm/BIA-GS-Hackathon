import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import axios from 'axios';
import Cookies from 'js-cookie';

const AddFriendInfoComponent = (props) => {
    const index = props.index;
    const friend = props.friend;
    const name = friend.name;
    const userid = friend.user_id;
    const [hidden, setHidden] = useState(false);
    const handleClick = () => {
        const data = {
            sender_id: Cookies.get('userid'),
            receiver_id: userid
        }
        axios.post("http://" + process.env.REACT_APP_PUBLIC_IP + ":5000/friend/connect", data).then(res =>{
            setHidden(true);
        }).catch(err=>{setHidden(true)})
    }
    return (
        <Row className={'ml-2'} hidden={hidden} style={{maxWidth:'380px'}}>
            <div className='mr-2 mb-n5'>
                <img src={`/images/avatar${index+1}.jpg`} alt="..." className="img-thumbnail h-50 rounded-circle mr-n5"/>
                <div className='float-right ml-n4 mr-2'>
                    <span className='text-uppercase font-weight-bold'>{name}</span>
                    <span className='d-block text-capitalize'>Occupation: {friend.occupation}</span>
                    <span className='d-block text-capitalize'>Risk: {friend.risk}</span>
                </div>
            </div>
            <div>
                <button className='btn btn-sm' style={{'background-color': 'skyblue'}} onClick={handleClick}>
                    <PersonAddIcon /> Add User
                </button>
            </div>
        </Row>
    )
}

export default AddFriendInfoComponent

