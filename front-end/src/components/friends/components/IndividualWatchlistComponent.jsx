import React, { useState } from 'react'
import StockContainer from '../../charts/containers/StockContainer'
const IndividualWatchListComponent = (props) => {
    const [hidden, setHidden] = useState(true);
    const available = ['AAPL', 'AMZN', "BRK-B", "FB", "NFLX", 'SHOP','SPOT','TSLA','TWLO','NIO','FVRR','GOOGL','NKLA','SOLO','UPWK']

    return (
        <>
        <a key={props.stock} className='btn badge badge-pill badge-light px-3 mx-lg-4 mx-2 my-2'
            style={{"boxShadow": "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)"}}
            onClick={()=>{setHidden(!hidden)}}
        >
            <h6 className='my-2'>{props.stock}</h6>
        </a>
        { available.includes(props.stock) ?
            <div hidden={hidden}>
                {/* <a>{props.stock}</a> */}
                <StockContainer stockName={props.stock}/>
            </div> : <></>
        }
        </>
    )
}

export default IndividualWatchListComponent