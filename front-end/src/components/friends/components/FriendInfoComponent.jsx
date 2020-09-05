import React from 'react';
import { Col, Row } from 'react-bootstrap';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const FriendInfoComponent = (props) => {
    const index = props.index;
    const friend = props.friend;
    const name = friend.name;

    return (
        <Row className={'ml-2'}>

            <div>
                <img src={`/images/avatar${index+1}.jpg`} alt="..." className="img-thumbnail rounded-circle h-50 inline-block"/>
                <div>
                    {name}
                    <p>dsafsadf</p>
                </div>
            </div>
            <div className='float-left'>

            </div>

            <PersonAddIcon/>
        </Row>
    )
}

export default FriendInfoComponent

