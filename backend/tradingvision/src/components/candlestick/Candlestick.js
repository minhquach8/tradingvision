import React, { useState, useEffect} from 'react';
import Candle from './Candle';
import './style.css';
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {Container, Typography, CircularProgress} from '@material-ui/core'
import useStyles from './style';

const Candlestick = () => {
  const classes = useStyles()
  const {ticker} = useParams()
  const [data, setData] = useState([])
  const [previousData, setPreviousData] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getData()
    componentDidMount()
  },[])

  const componentDidMount = async() => {
    setLoading(true)
    axios.get(`https://trading-vision.herokuapp.com/api/stocks/query?ticker=${ticker}&limit=1`)
    .then((response) =>{
      setData(response.data.stocks)
      setLoading(false)
    })
  }

  const getData = async() =>{
    setLoading(true)
    axios.get(`https://trading-vision.herokuapp.com/api/forcandlesticks/${ticker}`)
    .then((response) =>{
      setPreviousData(response.data)
      setLoading(false)
    })
  }

  const ohlc = [];
  const volume = [];

  const handleUpdate = e => {
        const chart = e.target;
        chart.navigationBindings.update();
      }

  previousData.map(point => {
    ohlc.push([
      point.Time*1000, // the date
      point.Open, // open
      point.High, // high
      point.Low, // low
      point.Close // close doi thanh cot close sau
    ]);

    volume.push([
      point.Time*1000, // the date
      point.Volume // the volume
    ]);
  })

  data.map(point => {
    ohlc.push([
      point.TimeStamp*1000, // the date
      point.PreviousClose, // open
      point.Highest, // high
      point.Lowest, // low
      point.Match // close doi thanh cot close sau
    ]);

    volume.push([
      point.TimeStamp*1000, // the date
      point.StockExchange === "hose" ? point.Volume*1000 : point.Volume *100// the volume
    ]);
  })



  console.log(ohlc)
  return (
    <div className="candlestick">
        <Typography style={{fontFamily: 'Montserrat', fontSize:"22px", marginLeft:"40%"}}>{ticker} Candlestick Chart</Typography>
        {
          loading ? (
            <div className={classes.loading_spinner}>
              <CircularProgress style={{ backgroundColor: "primary" }}/>
            </div>
          ):(
           <Candle ohlc={ohlc} volume={volume} onUpdate={handleUpdate} data={data}/>

          )
        }
    </div>
  )
}
export default Candlestick;
