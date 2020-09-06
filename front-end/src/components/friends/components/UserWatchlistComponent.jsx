import React from 'react';
import { Paper } from '@material-ui/core';

const UserWatchlistComponent = (props) => {
    const watchlists = props.watchlists;
    return (
        <>
            {watchlists ? watchlists.map(stock => {
                return <a key={stock} className='btn badge badge-pill badge-light px-3 mx-lg-4 mx-2 my-2'
                        style={{"boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)"}}
                        >
                            <h6 className='my-2'>{stock}</h6>
                        </a>
            }) : <></>}
        </>
    )
}

export default UserWatchlistComponent