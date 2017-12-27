import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import $ from 'jquery';

HighchartsMore(Highcharts);

let styles = {
    height: '100vh',
    overflow: 'hidden',
    width: '100vw',
    position: 'fixed'
}

export default class Chart extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

        $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-ohlcv.json&callback=?', function (data) {

            // split the data set into ohlc and volume
            var ohlc = [],
                volume = [],
                dataLength = data.length,
                // set the allowed units for data grouping
                groupingUnits = [[
                    'week',                         // unit name
                    [1]                             // allowed multiples
                ], [
                    'month',
                    [1, 2, 3, 4, 6]
                ]],

                i = 0;

            for (i; i < dataLength; i += 1) {
                ohlc.push([
                    data[i][0], // the date
                    data[i][1], // open
                    data[i][2], // high
                    data[i][3], // low
                    data[i][4] // close
                ]);

                volume.push([
                    data[i][0], // the date
                    data[i][5] // the volume
                ]);
            }


            // create the chart
            Highcharts.stockChart('container', {

                rangeSelector: {
                    selected: 1
                },

                title: {
                    text: null
                },

                navigator: {
                    enabled: false
                },

                credits: {
                    enabled: false
                },

                xAxis: {
                    dateTimeLabelFormats: {
                        millisecond: '%H:%M:%S.%L',
                        second: '%H:%M:%S',
                        minute: '%H:%M',
                        hour: '%H:%M',
                        day: '%m-%d',
                        week: '%m-%d',
                        month: '%y-%m',
                        year: '%Y'
                    }
                },

                yAxis: [{
                    labels: {
                        align: 'right',
                        x: -3
                    },
                    title: {
                        text: 'OHLC'
                    },
                    height: '60%',
                    lineWidth: 2,
                    resize: {
                        enabled: true
                    }
                }, {
                    labels: {
                        align: 'right',
                        x: -3
                    },
                    title: {
                        text: 'Volume'
                    },
                    top: '65%',
                    height: '35%',
                    offset: 0,
                    lineWidth: 2
                }],

                tooltip: {
                    followTouchMove:false,
                    split: true
                },

                series: [{
                    type: 'candlestick',
                    name: 'AAPL',
                    data: ohlc,
                    color: 'green',
                    lineColor: 'green',
                    upColor: 'red',
                    upLineColor: 'red',
                    dataGrouping: {
                        units: groupingUnits
                    }
                }, {
                    type: 'column',
                    name: 'Volume',
                    data: volume,
                    yAxis: 1,
                    dataGrouping: {
                        units: groupingUnits
                    }
                }]
            });
        });

    }

    render() {
        return (
            <div id="container" ref={r => this.chart = r} style={styles}>

            </div>
        )
    }
}