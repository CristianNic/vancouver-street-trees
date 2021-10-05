// export data -->  https://www.highcharts.com/docs/export-module/export-module-overview
// https://www.highcharts.com/docs/export-module/client-side-export?_ga=2.141122033.219977435.1633323403-1848022347.1631864256


import React, { Component } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
// import High harts, { chart } from 'highcharts'
// import accessibility from "highcharts/modules/accessibility";

import drilldown from "highcharts/modules/drilldown.js";

//import drilldown from "highcharts/modules/drilldown.src.js";
// drilldown(Highcharts); 
drilldown(Highcharts);
require("highcharts/modules/exporting")(Highcharts);
require('highcharts/modules/export-data')(Highcharts)
  
// export default function Chart2(props) {
export default function Chart2(props) {

  console.log("Chart2 - top5Trees: ", props.top5Trees)
  console.log("Chart2 - Series: ", props.series)

  const treeNames = props.series.map(name => name.name)
  console.log('treeNames:', treeNames)
  const treeNamesName = props.series.map(name => name.name)[0]
  console.log('treeNamesName:', treeNamesName)

  const totalCount = props.series.map(totalCount => totalCount.y)
  console.log('totalCount:', totalCount)
  const totalCountOne = props.series.map(totalCount => totalCount.y)[0]
  console.log('totalCountOne:', totalCountOne)

  // const Tree1YearlyCount = props.top5Trees.tree1.yearlyCount // outputs []
  // const Tree1YearlyCount = props.top5Trees.tree1.map(Count => Count.yearlyCount)
  // console.log('Tree1YearlyCount:', Tree1YearlyCount)

  // 1. - Destructure the props if possible 
  // 2. - formulate the series objects here - unless 
  // in dashboard they can be made simpler i.e - fewer lines 
  // -- and also what data does the map need? 


  drilldown(Highcharts);

  const chartOptions = {
    chart: {
      type: 'column',
      borderRadius: 10,
      // backgroundColor: #d3d3d3, 
      events: {
        drilldown: function (e) {
          //console.log("Drilldown" + e.point.name);
          if (!e.seriesOptions) {
            var chart = this;
            if (e.point.name === props.series.map(name => name.name)[0]) {  // "Kwanzan Flowering Cherry"
              chart.addSeriesAsDrilldown(e.point, {
                name: props.series.map(name => name.name)[0],               // "Kwanzan Flowering Cherry"
                color: "green",
                data: props.top5Trees.tree1.yearlyCount
              });
              console.log("Hello, from inside function - Tree Name:", props.series.map(name => name.name)[0])
              console.log("Hello, from inside function - Tree Data:", props.top5Trees.tree1.yearlyCount)
            }
            if (e.point.name === props.series.map(name => name.name)[1]) {
              chart.addSeriesAsDrilldown(e.point, {
                name: props.series.map(name => name.name)[1],                   // "Red Maple"
                color: "green",
                data: props.top5Trees.tree2.yearlyCount
              });
              console.log("Hello, from inside function:", props.series.map(name => name.name)[1])   // "Red Maple"
            }
            if (e.point.name === props.series.map(name => name.name)[2]) {
              chart.addSeriesAsDrilldown(e.point, {
                name: props.series.map(name => name.name)[2],                  // "Chanticleer Pear"
                color: "green",
                data: props.top5Trees.tree3.yearlyCount
              });
              console.log("Hello, from inside function:", props.series.map(name => name.name)[2]) // "Chanticleer Pear"
            }
            if (e.point.name === props.series.map(name => name.name)[3]) {
              chart.addSeriesAsDrilldown(e.point, {
                name: props.series.map(name => name.name)[3],                  // "Crimean Linden"
                color: "green",
                data: props.top5Trees.tree4.yearlyCount
              });
              console.log("Hello, from inside function:", props.series.map(name => name.name)[3]) // "Crimean Linden"
            }
            if (e.point.name === props.series.map(name => name.name)[4]) {
              chart.addSeriesAsDrilldown(e.point, {
                name: props.series.map(name => name.name)[4],                  // "Norway Maple
                color: "green",
                data: props.top5Trees.tree5.yearlyCount
              });
              console.log("Hello, from inside function:", props.series.map(name => name.name)[4]) // "Norway Maple"
            }
            chart.applyDrilldown();
         }
        }
      }
    },
    // exporting: {
    //   showTable: false  // no needed --> Want .csv!!! 
    // },
    title: {
      // text: "Top 5 Types of Trees Planted in " + props.top5Trees.neighbourhood
      text: "Top 5 Trees Planted in " + props.top5Trees.neighbourhood
    },
    xAxis: {
      type: 'category',
      // labels: {
      //   autoRotation: false 
      // },
    },
    yAxis: {
      title: {
        text: 'Number of Trees'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      shared: true
      // headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      // pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },
    series: [
      {
        name: "Trees",
        colorByPoint: true,
        // data: props.series
        
        data: [
          {
            name: props.series.map(name => name.name)[0],
            y: props.series.map(totalCount => totalCount.y)[0],
            drilldown: true
          },
          {
            name: props.series.map(name => name.name)[1],
            y: props.series.map(totalCount => totalCount.y)[1],
            drilldown: true
          },
          {
            name: props.series.map(name => name.name)[2],
            y: props.series.map(totalCount => totalCount.y)[2],
            drilldown: true
          },
          {
            name: props.series.map(name => name.name)[3],
            y: props.series.map(totalCount => totalCount.y)[3],
            drilldown: true
          },
          {
            name: props.series.map(name => name.name)[4],
            y: props.series.map(totalCount => totalCount.y)[4],
            drilldown: true
          },
        ]
        // {
        //   name: "Red Maple",
        //   y: 264,
        //   drilldown: true
        // },
        // {
        //   name: "Chanticleer Pear",
        //   y: 239,
        //   drilldown: true
        // },
        // {
        //   name: "Crimean Linden",
        //   y: 219,
        //   drilldown: true
        // },
        // {
        //   name: "Norway Maple",
        //   y: 217,
        //   drilldown: true
        // },
        // ]
          
      },
    ],
    // drilldown: {   // needed? 
    //   series: props.drilldownSeries
    // }
  }
  //-------------------------------- Should Working Example -----> 
  //   drilldown: {
  //     series: [
  //       {
  //       name: props.series.map(name => name.name)[0],
  //       id: props.series.map(name => name.name)[0],
  //       data: [ props.top5Trees.tree1.yearlyCount ] 
  //       }
  //     ]
  //   }
  // }
// --------------------------------------------------------
  // series: 
  
    // [
    //  {
    //    name: props.series.map(name => name.name)[0],
    //    id: props.series.map(name => name.name)[0],
    //    data: []
    //  }
    // ]
  
  
  
    // [
    //   {
    //     name: "Kwanzan Flowering Cherry",
    //     id: "Kwanzan Flowering Cherry",
    //     data: [
    //       [
    //         "1990",
    //         50
    //       ],
    //       [
    //         "1992",
    //         2
    //       ],
    //       [
    //         "1993",
    //         1
    //       ],  


  return (
    <div className="chart" id="container">
      {/* <h1>Hello, {props.top5Trees}</h1> */}

      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
      />
    </div>
  )
}


// class Chart extends Component {

//   state = {
//     newChartOptions: '',
//     // chartOptions: {
//     //   chart: {
//     //     type: "column",
//     //     events: {
//     //       drilldown: function (e) {
//     //         if (!e.seriesOptions) {
//     //           var chart = this;
//     //           if (e.point.name === this.state.top5Trees.tree1.name) {
//     //             chart.addSingleSeriesAsDrilldown(e.point, {
//     //               name: this.state.top5Trees.tree1.name,
//     //               color: "green",
//     //               // data: dataYearsTree1
//     //               data: this.state.top5Trees.tree1.yearlyCount
//     //             })
//     //           }
//     //           if (e.point.name === "Red Maple") {
//     //             chart.addSingleSeriesAsDrilldown(e.point, {
//     //               name: "Red Maple",
//     //               color: "green",
//     //               data: dataYearsTree2
//     //             })
//     //           }
//     //           if (e.point.name === "Chanticleer Pear") {
//     //             chart.addSingleSeriesAsDrilldown(e.point, {
//     //               name: "Chanticleer Pear",
//     //               color: "green",
//     //               data: dataYearsTree3
//     //             })
//     //           }
//     //           if (e.point.name === "Crimean Linden") {
//     //             chart.addSingleSeriesAsDrilldown(e.point, {
//     //               name: "Chanticleer Pear",
//     //               color: "green",
//     //               data: dataYearsTree4
//     //             })
//     //           }
//     //           if (e.point.name === "Norway Maple") {
//     //             chart.addSingleSeriesAsDrilldown(e.point, {
//     //               name: "Chanticleer Pear",
//     //               color: "green",
//     //               data: dataYearsTree5
//     //             })
//     //           }
//     //           chart.applyDrilldown();
//     //         }
//     //       }
//     //     }
//     //   },
//     //   title: {
//     //     text: "Top 5 types of trees planted in " + this.props.top5Trees.neighbourhood
//     //   },
//     //   xAxis: {
//     //     type: 'category'
//     //   },
//     //   yAxis: {
//     //     title: {
//     //       text: 'Number of trees planted'
//     //     }
//     //   },
//     //   legend: {
//     //     enabled: false
//     //   },
//     //   tooltip: {
//     //     // headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
//     //     // pointFormat: '<span style="color:{point.color}">{point.name}</span>: <br/>'
//     //     shared: true // If you have multiple series then all points in each category will show up on one tooltip
//     //   },
//     //   series: [
//     //     {
//     //       name: "Trees",
//     //       colorByPoint: true,
//     //       data: [
//     //         {
//     //           // name: this.props.top5Trees.tree1.name,
//     //           // y: this.props.top5Trees.tree1.count,
//     //           name: "Cherry",
//     //           y: 56,
//     //           drilldown: true
//     //         },
//     //         {
//     //           name: "Red Maple",
//     //           y: 264,
//     //           drilldown: true
//     //         },
//     //         {
//     //           name: "Chanticleer Pear",
//     //           y: 239,
//     //           drilldown: true
//     //         },
//     //         {
//     //           name: "Crimean Linden",
//     //           y: 219,
//     //           drilldown: true
//     //         },
//     //         {
//     //           name: "Norway Maple",
//     //           y: 217,
//     //           drilldown: true
//     //         },
//     //       ]
//     //     }
//     //   ],
//     //   drilldown: {
//     //     series: []
//     //   }
//     // },
//     // chartOptions2: {},
//     // series: [],
//     // chartOptions5: {},
//   }
  
//   componentDidMount() {
//     console.log("Will Mount Props", this.props.top5Trees)
//   }
//   // componentDidUpdate() {
//   //   this.formChartOptions()
//   //   console.log("Props", this.props.top5Trees)
//   // }

//   componentDidUpdate(previousProps, previousState) {
//     if (previousProps.newChartOptions !== this.props.newChartOptions) {
      
//       this.formChartOptions()
//       // this.setState({ newChartOptions: newChartOptions})
//     }
// }




//   formChartOptions() {
//     // drilldown(Highcharts); 
//     const top5Trees = this.props.top5Trees
//     console.log('Chart --> top5Trees:', top5Trees)
//     // const tree1Name = top5Trees.tree1.name
//     // console.log('tree1Name:', tree1Name)
//     // const tree1YearlyCount = top5Trees.tree1.yearlyCount
//     // console.log('tree1YearlyCount:', tree1YearlyCount)

//     const series = [
//       {
//         name: "Trees",
//         colorByPoint: true,
//         data: [
//           {
//             name: top5Trees.tree1.name,
//             y: top5Trees.tree1.totalCount,
//             drilldown: true
//           },
//           {
//             name: top5Trees.tree2.name,
//             y: top5Trees.tree2.totalCount,
//             drilldown: true
//           },
//           {
//             name: top5Trees.tree3.name,
//             y: top5Trees.tree3.totalCount,
//             drilldown: true
//           },
//           {
//             name: top5Trees.tree4.name,
//             y: top5Trees.tree4.totalCount,
//             drilldown: true
//           },
//           {
//             name: top5Trees.tree5.name,
//             y: top5Trees.tree5.totalCount,
//             drilldown: true
//           },
//         ]
//       }
//     ]
//     console.log("Series:", series)

//     const events = {
//       drilldown: function (e) {
//         if (!e.seriesOptions) {
//           var chart = this;
//           if (e.point.name === top5Trees.tree1.name) {
//             chart.addSingleSeriesAsDrilldown(e.point, {
//               name: top5Trees.tree1.name,
//               color: "green",
//               data: top5Trees.tree1.yearlyCount
//             })
//           }
//         }
//         if (e.point.name === top5Trees.tree2.name) {
//           chart.addSingleSeriesAsDrilldown(e.point, {
//             name: top5Trees.tree2.name,
//             color: "green",
//             data: top5Trees.tree2.yearlyCount
//           })
//         }
//         if (e.point.name === top5Trees.tree3.name) {
//           chart.addSingleSeriesAsDrilldown(e.point, {
//             name: top5Trees.tree3.name,
//             color: "green",
//             data: top5Trees.tree3.yearlyCount
//           })
//         }
//         if (e.point.name === top5Trees.tree4.name) {
//           chart.addSingleSeriesAsDrilldown(e.point, {
//             name: top5Trees.tree4.name,
//             color: "green",
//             data: top5Trees.tree4.yearlyCount
//           })
//         }
//         if (e.point.name === top5Trees.tree4.name) {
//           chart.addSingleSeriesAsDrilldown(e.point, {
//             name: top5Trees.tree4.name,
//             color: "green",
//             data: top5Trees.tree4.yearlyCount
//           })
//         }
//         chart.applyDrilldown();
//       }  
//     }
//     console.log("Events:", events)

//     chartOptions.chart.events = events
//     chartOptions.title.series = series
  
//     console.log('newChartOptions:', chartOptions)

//     this.setState({ newChartOptions: chartOptions })

//     return chartOptions
//   }

//     // const series = this.props.series
//     // console.log("Chart --> series:", series)
//     // console.log("formChartOptions --> Hello")
//     // // this.setState({
//     // //   series: series
//     // // })
//     // return series

//     // const chartOptions5 = {
//     //   series: [
//     //     {
//     //       name: "Trees",
//     //       colorByPoint: true,
//     //       data: [
//     //         {
//     //           name: this.props.top5Trees.tree.name,
//     //           y: 12,
//     //           drilldown: true
//     //         },
//     //         {
//     //           name: "Red Maple",
//     //           y: 264,
//     //           drilldown: true
//     //         },
//     //         {
//     //           name: "Chanticleer Pear",
//     //           y: 239,
//     //           drilldown: true
//     //         },
//     //         {
//     //           name: "Crimean Linden",
//     //           y: 219,
//     //           drilldown: true
//     //         },
//     //         {
//     //           name: "Norway Maple",
//     //           y: 217,
//     //           drilldown: true
//     //         },
//     //       ]
//     //     }
//     //   ],
//     //   drilldown: {
//     //     series: []
//     //   }
//     // }
//     // console.log('---> Chart --> chartOptions5:', chartOptions5)

//     // this.setState({
//     //   chartOptions5: chartOptions5
//     // })
  
//   render() {

//     const top5Trees = this.props.top5Trees
//     console.log('Render --> top5Trees:', top5Trees)

//     return (
//       <div>
//         <HighchartsReact
//           highcharts={Highcharts}
//           options={this.state.newChartOptions}
//         />
//       </div>
//     )
//   }
// }

// export default Chart;




// // componentDidMount() {
// //   this.setState({
// //     top5Trees: this.props.top5Trees
// //   })
// // }

// //   const dataYearsTree1 = [["1990", 50], ["1992", 2], ["1993", 1], ["1997", 2],
// //                         ["1999", 1], [ "2002", 6], ["2004", 2], ["2006", 11],
// //                         ["2007", 4], [ "2008", 7], ["2010", 1], ["2011", 5],
// //                         ["2012", 4], ["2014", 6], ["2017", 1], ["2019", 1]]
        
// // const dataYearsTree2 = [["1990", 50], ["1992", 2], ["1993", 1], ["1997", 2],
// //                         ["1999", 1], [ "2002", 6], ["2004", 2], ["2006", 11],
// //                         ["2007", 4], ["2008", 7], ["2010", 1], ["2011", 5],
// //                         ["2012", 4], ["2014", 6], ["2017", 1], ["2019", 1]]

// // const dataYearsTree3 = [["1990", 20], ["1992", 10], ["1993", 1], ["1994", 16],
// //                         ["1996", 1], ["1997", 4], ["2000", 4], ["2003", 1],
// //                         ["2004", 1], ["2005", 8]]

// // const dataYearsTree4 = [["1990", 8], ["1991", 25], ["1992", 12], ["2009", 1]]

// // const dataYearsTree5 = [["1990", 1], ["1992", 1], ["1993", 1], ["1999", 1],
// //                         ["2002", 1], [ "2007", 1], ["2009", 15]]

