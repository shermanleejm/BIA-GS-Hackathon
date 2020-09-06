import React, { useEffect } from 'react';
import { useState } from 'react';
import { Row } from 'react-bootstrap';
import axios from 'axios';

const FriendWatchListInfoComponent = (props) => {

    const [friendData, setFriendData] = useState();
    const [data,setData] = useState()

    useEffect(() => {
        setFriendData(props.data)
    }, [props])

    useEffect(() => {
        if (friendData)
        axios.get("http://" + process.env.REACT_APP_PUBLIC_IP + `:5001/user/getuserinfo/${friendData.user_id}`).then(res => {
            const data = res.data;
            setData(data);
        })
    },[friendData])

    const handleUserSelect = () => {
        console.log(data)
        props.handleUserSelect(data);
    }

    return (
        friendData ?
        <Row className={'ml-2'} style={{maxWidth:'380px'}}>
            <div className='mr-2 mb-n5' onClick={handleUserSelect}>
                <img src={`/images/avatar3.jpg`} alt="..." className="img-thumbnail h-50 rounded-circle mr-n5"/>
                <div className='float-right ml-n4 mr-2'>
                    <span className='text-uppercase font-weight-bold d-block'>{friendData.user_id}</span>
                    <span className='d-block'>Watchlist:</span>
                    {
                        data ?
                        data.watchlist.slice(0,3).map(stock => {
                            return <span key={stock} className='badge badge-pill badge-primary mr-3'>{stock}</span>
                        }) : <></>
                    }
                </div>
            </div>
        </Row> : <></>
    )
}

export default FriendWatchListInfoComponent
