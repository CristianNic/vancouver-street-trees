import React, { Component } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
// import High harts, { chart } from 'highcharts'
// import accessibility from "highcharts/modules/accessibility";
import drilldown from "highcharts/modules/drilldown.js";

drilldown(Highcharts); 

const dataYearsTree1 = [["1990", 50], ["1992", 2], ["1993", 1], ["1997", 2],
                        ["1999", 1], [ "2002", 6], ["2004", 2], ["2006", 11],
                        ["2007", 4], [ "2008", 7], ["2010", 1], ["2011", 5],
                        ["2012", 4], ["2014", 6], ["2017", 1], ["2019", 1]]
        
const dataYearsTree2 = [["1990", 50], ["1992", 2], ["1993", 1], ["1997", 2],
                        ["1999", 1], [ "2002", 6], ["2004", 2], ["2006", 11],
                        ["2007", 4], ["2008", 7], ["2010", 1], ["2011", 5]
                        ["2012", 4], ["2014", 6], ["2017", 1], ["2019", 1]]

const dataYearsTree3 = [["1990", 20], ["1992", 10], ["1993", 1], ["1994", 16],
                        ["1996", 1], ["1997", 4], ["2000", 4], ["2003", 1],
                        ["2004", 1], ["2005", 8]]

const dataYearsTree4 = [["1990", 8], ["1991", 25], ["1992", 12], ["2009", 1]]

const dataYearsTree5 = [["1990", 1], ["1992", 1], ["1993", 1], ["1999", 1],
                        ["2002", 1], [ "2007", 1], ["2009", 15]]

const top5Trees = {
  tree1:
    { name: "Kwanzan Flowering Cherry", count: 747, years: dataYearsTree1 },
  tree2:
    { name: "Maple", count: 800, years: dataYearsTree2 }
}

const neighbourhood = "Mount Pleasant"

// console.log('top5Trees:', top5Trees)
// console.log("Tree2.name: --> ", top5Trees.tree1.years)



const chartOptions = {
  chart: {
    type: "column",
    events: {
      drilldown: function (e) {
        if (!e.seriesOptions) {
          var chart = this;
          if (e.point.name === top5Trees.tree1.name) {
            chart.addSingleSeriesAsDrilldown(e.point, {
              name: top5Trees.tree1.name,
              color: "green",
              // data: dataYearsTree1
              data: top5Trees.tree1.years
            })
          }
          if (e.point.name === "Red Maple") {
            chart.addSingleSeriesAsDrilldown(e.point, {
              name: "Red Maple",
              color: "green",
              data: dataYearsTree2
            })
          }
          if (e.point.name === "Chanticleer Pear") {
            chart.addSingleSeriesAsDrilldown(e.point, {
              name: "Chanticleer Pear",
              color: "green",
              data: dataYearsTree3
            })
          }
          if (e.point.name === "Crimean Linden") {
            chart.addSingleSeriesAsDrilldown(e.point, {
              name: "Chanticleer Pear",
              color: "green",
              data: dataYearsTree4
            })
          }
          if (e.point.name === "Norway Maple") {
            chart.addSingleSeriesAsDrilldown(e.point, {
              name: "Chanticleer Pear",
              color: "green",
              data: dataYearsTree5
            })
          }
          chart.applyDrilldown();
        }
      }
    }
  },
  title: {
    text: "Top 5 types of trees planted in " + neighbourhood
  },
  // accessibility: {
  //   announceNewData: {
  //     enabled: true
  //   }
  // },
  xAxis: {
    type: 'category'
  },
  yAxis: {
    title: {
      text: 'Number of trees planted'
    }
  },
  legend: {
    enabled: false
  },
  tooltip: {
    // headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    // pointFormat: '<span style="color:{point.color}">{point.name}</span>: <br/>'
    shared: true // If you have multiple series then all points in each category will show up on one tooltip
  },
  series: [
    {
      name: "Trees",
      colorByPoint: true,
      data: [
        {
          name: top5Trees.tree1.name,
          y: top5Trees.tree1.count,
          drilldown: true
        },
        {
          name: "Red Maple",
          y: 264,
          drilldown: true
        },
        {
          name: "Chanticleer Pear",
          y: 239,
          drilldown: true
        },
        {
          name: "Crimean Linden",
          y: 219,
          drilldown: true
        },
        {
          name: "Norway Maple",
          y: 217,
          drilldown: true
        },
      ]
    }
  ],
  drilldown: {
    series: []
  }
};



class Chart extends Component {

  render() {
    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          // constructorType={'column'}
          options={chartOptions}
        />
      </div>
    )
  }
}

export default Chart;