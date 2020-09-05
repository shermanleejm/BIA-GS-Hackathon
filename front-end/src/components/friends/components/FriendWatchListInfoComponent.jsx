import React, { useEffect } from 'react';
import { useState } from 'react';
import { Row } from 'react-bootstrap';

const FriendWatchListInfoComponent = (props) => {
    const friend = props.data;
    const watchlist = friend.watchlist;
    return (
        <Row className={'ml-2'} style={{maxWidth:'380px'}}>

            <div className='mr-2 mb-n5'>
                <img src={`/images/avatar3.jpg`} alt="..." className="img-thumbnail h-50 rounded-circle mr-n5"/>
                <div className='float-right ml-n4 mr-2'>
                    <span className='text-uppercase font-weight-bold d-block'>{friend.name}</span>
                    <span className='d-block'>Watchlist:</span>
                    {
                        watchlist.map(stock => {
                            return <span className='badge badge-pill badge-primary mr-3'>{stock}</span>
                        })
                    }
                </div>
            </div>
        </Row>
    )
}

export default FriendWatchListInfoComponent
