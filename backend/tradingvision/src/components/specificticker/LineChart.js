import React, { useState, useEffect } from 'react'
import ReactHighcharts from 'react-highcharts/ReactHighstock.src'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import SetReminderLine from '../reminder/reminderpopup/SetReminderLine';
import {CircularProgress} from '@material-ui/core'
import useStyles from './style'

const LineChart =(props) =>{
    const [open, setOpen] = React.useState(false);
    const [stock, setStock] = useState();
    const [time, setTime] = useState();
    const {ticker} = useParams()
    const [data, setData] = useState([])
    const [predictions, setPredictions] = useState([])
    const [compare, setCompare] = useState([])
    const [comparePredictions, setComparePredictions] = useState([])
    const [loading, setLoading] = useState([])
    const priceData =[]
    const predictPrice=[]
    const compareData =[]
    const predictCompare=[]
    const classes = useStyles()

    //Get data off current stock
    useEffect(() => {
      actualPrice()
      currentStockPredictions()
    },[])

    //get data of compared stock
    useEffect(() =>{
      compareStocks()
      compareStockPredictions()
    },[props.compareTicker])

    const actualPrice = async() => {
      setLoading(true)
      axios.get(`https://trading-vision.herokuapp.com/api/forpredictions/${ticker}`)
      .then((response) =>{
        setData(response.data)
        setLoading(false)
      })
    }

    const currentStockPredictions = async() => {
      setLoading(true)
      axios.get(`https://trading-vision.herokuapp.com/api/predictions/${ticker}`)
      .then((response) =>{
        setPredictions(response.data.prediction)
        setLoading(false)
      })
    }

    const compareStocks = async()=>{
      setLoading(true)
        axios.get(`https://trading-vision.herokuapp.com/api/forpredictions/${props.compareTicker}`)
        .then((response) =>{
          setCompare(response.data)
          setLoading(false)
        })
    }

    const compareStockPredictions = async() => {
      setLoading(true)
      axios.get(`https://trading-vision.herokuapp.com/api/predictions/${props.compareTicker}`)
      .then((response) =>{
        setComparePredictions(response.data.prediction)
        setLoading(false)
      })
    }

    // actual price list
    data.map(point => {
        priceData.push([
          point.Time*1000,
          point.Close,])

    })

    // current stock's prediction price list
    predictions.map(point => {
      predictPrice.push([
        point.Date*1000,
        point.PredictedPrice
      ])
    })
    priceData.push(predictPrice[0])

    if (props.compareTicker !== null){
        // compared ticker's price list
      compare.map(point=>{
        compareData.push([
          point.Time*1000,
          point.Close,])
      })

      // compared stock's prediction price list
      comparePredictions.map(point => {
        predictCompare.push([
          point.Date*1000,
          point.PredictedPrice
        ])
      })
      compareData.push(predictCompare[0])
    }


    const options = {currency: 'VND'};
    const numberFormat = new Intl.NumberFormat('en-US', options);
    const configPrice = {
      yAxis: [{
        offset: 20,

        labels: {
          formatter: function () {
            return numberFormat.format(this.value)
          }
          ,
          x:-15,
          style: {
            "color": "#fff",
            "position": "absolute",
          },
          align: 'left',
        },

      },

      ],
      tooltip: {
        shared: false,
        // formatter: function () {
        //   return numberFormat.format(this.y, 0) +  '</b><br/>' + moment(this.x).format('MMMM Do YYYY')
        // },
        split: true,

      },
      plotOptions: {
        series: {
          showInNavigator: true,
          gapSize: 20,
          point: {
            events: {
              click: function(e){
                var seriesName = e.point.series.name;
                var val = e.point.x;
                if(seriesName === `${ticker} Predicted Price`) {
                  setOpen(true);
                  setTime(val);
                  setStock(ticker);
                  console.log(val);
                  console.log(ticker);
                }
                else if(seriesName === `${props.compareTicker} Predicted Price`) {
                  setOpen(true);
                  setTime(val);
                  setStock(props.compareTicker);
                  console.log(val);
                  console.log(props.compareTicker);
                }
                else  {
                  alert("Can only add reminder for predicted price");
                }

                }
              }
            }
          }


      },
      rangeSelector: {
        selected: 1

      },
      title: {
        text: `${ticker} stock price`,
        style: {
          color: '#F2F1F0',
          fontSize: '18px'
        }
      },
      chart: {
        height: 600,
      },

      credits: {
        enabled: false
      },

      legend: {
        enabled: true,
        itemStyle:{
            color: '#F2F1F0',
            fontSize: '13px'
        },
        itemHoverStyle:{
          color: '#E5E8E8',
        },
      },
      xAxis: {
        type: 'date',
        labels: {
          style: {
            "color": "#F2F1F0",
            "position": "absolute",
          },
        }
      },
      rangeSelector: {
        buttons: [{
          type: 'day',
          count: 1,
          text: '1d',
        }, {
          type: 'day',
          count: 7,
          text: '7d'
        }, {
          type: 'month',
          count: 1,
          text: '1m'
        }, {
          type: 'month',
          count: 3,
          text: '3m'
        },
          {
          type: 'all',
          text: 'All'
        }],
        selected: 4,
        buttonTheme: {
          fill: "rgba(0,0,0,1)",
          'stroke-width': 0,
          style: {
            color: 'grey',
        },
        states: {
            hover: {
            },
            select: {
                fill: '#FD7F20',
                style: {
                    color: '#fff',
                    fontWeight: 'bold'
                }
            }
        }},
        inputStyle: {
          color: 'grey',
          fontWeight: 'bold'
      },

      },
      series: [{
        name: `${ticker} `,
        type: 'spline',

        data: priceData,
        tooltip: {
          valueDecimals: 2
        },
        color: '#A0E7E5',

      },
      {
        name: `${ticker} Predicted Price`,
        type: 'spline',

        data: predictPrice,
        tooltip: {
          valueDecimals: 2
        },
        color: '#F51720',



      },
      {
        name: `${props.compareTicker}`,
        type: 'spline',

        data: compareData,
        tooltip: {
          valueDecimals: 2
        },
        color: '#EAC5B0',

      },
      {
        name: `${props.compareTicker} Predicted Price`,
        type: 'spline',

        data: predictCompare,
        tooltip: {
          valueDecimals: 2
        },
        color: '#4B7BF5',

      }
      ],

    };

    const configPriceWithoutCompare = {

      yAxis: [{
        offset: 20,

        labels: {
          formatter: function () {
            return numberFormat.format(this.value)
          }
          ,
          x:-15,
          style: {
            "color": "#fff",
            "position": "absolute",
          },
          align: 'left',
        },

      },

      ],
      tooltip: {
        shared: false,
        // formatter: function () {
        //   return numberFormat.format(this.y, 0) +  '</b><br/>' + moment(this.x).format('MMMM Do YYYY')
        // },
        split: true,

      },
      plotOptions: {
        series: {
          showInNavigator: true,
          gapSize: 6,
          point: {
            events: {
              click: function(e){
                let seriesName = e.point.series.name;
                // Val is the date value (UTC)
                let val = e.point.x;

                if(seriesName === `${ticker} Predicted Price`) {
                  setOpen(true);
                  setTime(val);
                  setStock(ticker);
                  console.log(seriesName);
                  console.log(ticker);
                }
                else  {
                  alert("Can only add reminder for predicted price");
                }

                }
              }
            }
        }
      },
      rangeSelector: {
        selected: 1

      },
      title: {
        text: `${ticker} stock price`,
        style: {
          color: '#F2F1F0',
          fontSize: '18px'
        }
      },
      chart: {
        height: 600,
      },

      credits: {
        enabled: false
      },

      legend: {
        enabled: true,
        itemStyle:{
            color: '#F2F1F0',
            fontSize: '13px'
        },
        itemHoverStyle:{
          color: '#E5E8E8',
        },
      },
      xAxis: {
        type: 'date',
        labels: {
          style: {
            "color": "#F2F1F0",
            "position": "absolute",
          },
        }
      },
      rangeSelector: {
        buttons: [{
          type: 'day',
          count: 1,
          text: '1d',
        }, {
          type: 'day',
          count: 7,
          text: '7d'
        }, {
          type: 'month',
          count: 1,
          text: '1m'
        }, {
          type: 'month',
          count: 3,
          text: '3m'
        },
          {
          type: 'all',
          text: 'All'
        }],
        selected: 4,
        buttonTheme: {
          fill: "rgba(0,0,0,1)",
          'stroke-width': 0,
          style: {
            color: 'grey',
        },
        states: {
            hover: {
            },
            select: {
                fill: '#FD7F20',
                style: {
                    color: '#fff',
                    fontWeight: 'bold'
                }
            }
        }},
        inputStyle: {
          color: 'grey',
          fontWeight: 'bold'
        },

      },
      series: [{
        name: `${ticker} `,
        type: 'spline',

        data: priceData,
        tooltip: {
          valueDecimals: 2
        },
        color: '#A0E7E5',


      },
      {
        name: `${ticker} Predicted Price`,
        type: 'spline',

        data: predictPrice,
        tooltip: {
          valueDecimals: 2
        },
        color: '#F51720',

      }],
    };
    return (
      <div>
      {props.compareTicker === null ? (
        <>
        {loading ? (
          <div className={classes.loading_spinner}>
              <CircularProgress style={{ backgroundColor: "primary" }}/>
            </div>
        ):(
          <>
            <ReactHighcharts config = {configPriceWithoutCompare}></ReactHighcharts>
            <SetReminderLine
              open = {open}
              setOpen = {setOpen}
              ticker = {(stock || {})}
              time ={(time || {})}/>

          </>
        )}
        </>
      ):(
        <>
        {loading ? (
          <div className={classes.loading_spinner}>
              <CircularProgress style={{ backgroundColor: "primary" }}/>
            </div>
        ):(
          <>
            <ReactHighcharts config = {configPrice}></ReactHighcharts>
            <SetReminderLine
              open = {open}
              setOpen = {setOpen}
              ticker = {(stock || {})}
              time = {(time || {})}/>
            </>
        )}
        </>
      )}

      </div>
    )
  }


export default LineChart
