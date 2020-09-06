import React from 'react';

const UserBannerComponent = (props) => {
    console.log(props.info)
    return (
        <>
            <div className='container'>
                <span className='text-center'>
                    <img src={`/images/avatar3.jpg`} alt="..." className="img-thumbnail rounded-circle mx-auto d-block"/>
                    <h1>{props.info ? props.info[0].user_id : ''}</h1>
                </span>
            </div>
        </>
    )
}

export default UserBannerComponent