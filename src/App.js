/* App.js */
import React, { Component } from "react";
import CanvasJSReact from './assets/canvasjs.stock.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;
 
 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { dataPoints: [], isLoaded: false };
  }
 
  componentDidMount() {
    //Reference: https://reactjs.org/docs/faq-ajax.html#example-using-ajax-results-to-set-local-state
    // fetch("https://canvasjs.com/data/gallery/react/btcusd2017-18.json")
    fetch("https://619496129b1e780017ca200e.mockapi.io/api/v1/node_chart")
      .then(res => res.json())
      .then(
        (data) => {
          var dps = [];
          for (var i = 0; i < data.length; i++) {
            dps.push({
              x: new Date(data[i].date),
              y: Number(data[i].volume)
            });
          }
          this.setState({
            isLoaded: true,
            dataPoints: dps
          });
        }
      )
  }
 
  render() {
    const options = {
      title:{
        text:"Product Price"
      },
      theme: "light2",
      subtitles: [{
        text: "Area Chart"
      }],
      charts: [{
        axisX: {
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            valueFormatString: "MMM YYYY"
          }
        },
        axisY: {
          title: "Bitcoin Price",
          prefix: "$",
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            valueFormatString: "$#,###"
          }
        },
        toolTip: {
          shared: true
        },
        data: [{
          name: "Price (in USD)",
          type: "splineArea",
          color: "#3576a8",
          yValueFormatString: "$#,###",
          xValueFormatString: "MMM YYYY",
          dataPoints : this.state.dataPoints
        }]
      }],
      navigator: {
        slider: {
          minimum: new Date("2017-05-01"),
          maximum: new Date("2018-05-01")
          // minimum: Number(1),
          // maximum: Number(10)
        }
      }
    };
    const containerProps = {
      width: "100%",
      height: "450px",
      margin: "auto"
    };
    return (
      <div> 
        <div>
          {
            // Reference: https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator
            this.state.isLoaded && 
            <CanvasJSStockChart containerProps={containerProps} options = {options}
              /* onRef = {ref => this.chart = ref} */
            />
          }
        </div>
      </div>
    );
  }
}
 
export default App;  