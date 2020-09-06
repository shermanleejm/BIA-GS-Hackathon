import React, { useState } from 'react';
import { ResponsiveLine } from "@nivo/line";
import {
    Grid,
    Typography
  } from "@material-ui/core";
import { useEffect } from 'react';
import axios from 'axios';

const StockContainer = (props) => {
    const stock = props.stockName;
    const [tickers, setTickers] = useState();

    useEffect(() => {
        if (stock)
        axios.get(process.env.REACT_APP_KELVIN_IP + "stock_price/" + stock).then(res => {
            console.log('=======',res)
            setTickers(res.data);
            console.log(tickers)
        })
    }, [stock])
    const available = ['AAPL', 'AMZN', "BRK-B", "FB", "NFLX", 'SHOP','SPOT','TSLA','TWLO']

    const makeLineChart = (data) => {
        return (
          <div
            style={{
              height: "500px",
              width: window.innerWidth > 800 ? "40vw" : "70vw",
            }}
          >
            <ResponsiveLine
              data={data}
              margin={{ top: 0, right: 50, bottom: 50, left: 60 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: true,
                reverse: false,
              }}
              enableGridX={false}
              axisTop={null}
              axisRight={null}
              axisBottom={null}
              // axisBottom={{
              //   orient: "bottom",
              //   tickSize: 5,
              //   tickPadding: 5,
              //   tickRotation: 0,
              //   legend: "Date",
              //   legendOffset: 36,
              //   legendPosition: "middle",
              // }}
              axisLeft={{
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "closing price",
                legendOffset: -50,
                legendPosition: "middle",
              }}
              colors={{ scheme: "nivo" }}
              pointSize={10}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabel="y"
              pointLabelYOffset={-12}
              useMesh={true}
            />
          </div>
        );
      }

    return (
        tickers ?

        <div>
            {console.log(tickers)}
            <Grid item style={{ textAlign: "center", "margin":"auto" }}>
                <Typography variant="h6">{stock}</Typography>
                <Typography variant="body1">
                From {tickers[0]["x"]} to{" "}
                {tickers[tickers.length - 1]["x"]}
                </Typography>
                {makeLineChart([
                {
                    id: stock,
                    color: "hsl(318, 70%, 50%)",
                    data: tickers,
                },
                ])}
            </Grid>
        </div> : <></>
    );

}

export default StockContainer;