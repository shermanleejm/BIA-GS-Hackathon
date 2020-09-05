import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import FriendsListComponent from '../components/FriendsListComponent';


const FriendsPage = () => {
    useEffect(() => {

    }, [])
    return (
        <div>
            <Col sm={3}>
                <input className="form-control mr-sm-2 mb-4" type="search" placeholder="Search" aria-label="Search"/>
                <FriendsListComponent/>
            </Col>
            <Col sm={9}>

            </Col>
        </div>
    )
}

export default FriendsPage;