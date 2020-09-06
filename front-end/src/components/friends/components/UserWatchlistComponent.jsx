import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import StockContainer from '../../charts/containers/StockContainer';
import IndividualWatchListComponent from './IndividualWatchlistComponent';

const UserWatchlistComponent = (props) => {
    const watchlists = props.watchlists;
    const [hidden, setHidden] = useState(true);

    return (
        <>
            {watchlists ? watchlists.map(stock => {
                return <IndividualWatchListComponent stock={stock}/> })
            : <></>}
        </>
    )
}

export default UserWatchlistComponent