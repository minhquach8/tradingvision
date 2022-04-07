import React from 'react';
import Highcharts from 'highcharts/highstock';
import addIndicatorsAllModule from 'highcharts/indicators/indicators-all'
import addDragPanesModule from 'highcharts/modules/drag-panes'
import addAnnotationsAdvancedModule from 'highcharts/modules/annotations-advanced'
import addPriceIndicatorModule from 'highcharts/modules/price-indicator'
import addFullScreenModule from 'highcharts/modules/full-screen'
import addStockToolsModule from 'highcharts/modules/stock-tools'
import {
  HighchartsStockChart, Chart, withHighcharts, XAxis, YAxis,
  OHLCSeries, ColumnSeries, Navigator, RangeSelector, Tooltip, CandlestickSeries
} from 'react-jsx-highstock';
import {useParams} from 'react-router-dom'
addIndicatorsAllModule(Highcharts)
addDragPanesModule(Highcharts)
addAnnotationsAdvancedModule(Highcharts)
addPriceIndicatorModule(Highcharts)
addFullScreenModule(Highcharts)
addStockToolsModule(Highcharts)

function tooltipPositioner (width, height, point) {
  const chart = this.chart;
  let position = {}

  if (point.isHeader) {
    position = {
      x: Math.max(
        // Left side limit
        chart.plotLeft,
        Math.min(
          point.plotX + chart.plotLeft - width / 2,
          // Right side limit
          chart.chartWidth - width - chart.marginRight
        )
      ),
      y: point.plotY
    };
  } else {
    position = {
      x: point.series.chart.plotLeft,
      y: point.series.yAxis.top - chart.plotTop
    };
  }

  return position;
}

const MyChart = ({ ohlc, volume, onUpdate}) => {
  const {ticker} = useParams()
  return (<>
    <HighchartsStockChart >
    <Chart 
    height = "60%"
    onUpdate={onUpdate} />

    <RangeSelector>
      <RangeSelector.Button count={1} type="day">1d</RangeSelector.Button>
      <RangeSelector.Button count={7} type="day">7d</RangeSelector.Button>
      <RangeSelector.Button count={1} type="month">1m</RangeSelector.Button>
      <RangeSelector.Button type="all">All</RangeSelector.Button>
      <RangeSelector.Input boxBorderColor="#7cb5ec" />
    </RangeSelector>

    <Tooltip
      split
      shape="square"
      headerShape="callout"
      borderWidth={0}
      shadow={false}
      positioner={tooltipPositioner} 
      
      />

    <XAxis 
    crosshair
    labels={{
       
        style: {
            color: 'white'
        }
      }}>
      <XAxis.Title>Time</XAxis.Title>
    </XAxis>
    <YAxis
      opposite
      labels={{
        align: 'left',
        style: {
            color: 'white'
        }
      }}
      
      height="80%"
      resize={{
        enabled: true
      }}>
      <CandlestickSeries id="ohlc" name={ticker + ' Stock Price'} data={ohlc} />
    </YAxis>

    <YAxis
      opposite
      labels={{
        align: 'left'
      }}
      top="80%"
      height="10%"
      offset={0}
      >
      <ColumnSeries id="vol" name={ticker + " Volume"} data={volume} />
    </YAxis>

    <Navigator>
      <Navigator.Series seriesId="ohlc" />
    </Navigator>
  </HighchartsStockChart>
  </>
  )
  
}

export default withHighcharts(MyChart, Highcharts);
