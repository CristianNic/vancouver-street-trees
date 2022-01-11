import React from "react"
import HighchartsReact from "highcharts-react-official"
import Highcharts from "highcharts"
import { colors } from "../../utils/Variables"
import drilldown from "highcharts/modules/drilldown.js";

drilldown(Highcharts);
require("highcharts/modules/exporting")(Highcharts);
require('highcharts/modules/export-data')(Highcharts)
  
export default function Chart(props) {

  const city_link = "https://opendata.vancouver.ca/explore/dataset/street-trees/information/?disjunctive.species_name&disjunctive.common_name&disjunctive.height_range_id"

  const captionText = `<span class="bold">Source:</span>\
  <a href="${city_link}">City of Vancouver Open Data Portal</a>\
  <br><span class="bold">Data accuracy:\
  Less then 50% of entries have a recorded year.</span>`

  drilldown(Highcharts);

  const chartOptions = {
    chart: {
      height: 410,   
      type: 'column',
      borderRadius: 10,
      events: {
        drilldown: function (e) {
          if (!e.seriesOptions) {
            var chart = this;
            chart.setTitle({ text: e.point.name}, {  
              text: "" // remove subtitle
            });
            if (e.point.name === props.top5TreeData.map(name => name.name)[0]) {  
              chart.addSeriesAsDrilldown(e.point, {
                name: props.top5TreeData.map(name => name.name)[0],               
                color: colors[0],
                data: props.top5TreeData.map(yearlyCount => yearlyCount.yearlyCount)[0]
              });
            }
            if (e.point.name === props.top5TreeData.map(name => name.name)[1]) {
              chart.addSeriesAsDrilldown(e.point, {
                name: props.top5TreeData.map(name => name.name)[1],                  
                color: colors[1],
                data: props.top5TreeData.map(yearlyCount => yearlyCount.yearlyCount)[1]
              });
            }
            if (e.point.name === props.top5TreeData.map(name => name.name)[2]) {
              chart.addSeriesAsDrilldown(e.point, {
                name: props.top5TreeData.map(name => name.name)[2],                 
                color: colors[2],
                data: props.top5TreeData.map(yearlyCount => yearlyCount.yearlyCount)[2]
              });
            }
            if (e.point.name === props.top5TreeData.map(name => name.name)[3]) {
              chart.addSeriesAsDrilldown(e.point, {
                name: props.top5TreeData.map(name => name.name)[3],                
                color: colors[3],
                data: props.top5TreeData.map(yearlyCount => yearlyCount.yearlyCount)[3]
              });
            }
            if (e.point.name === props.top5TreeData.map(name => name.name)[4]) {
              chart.addSeriesAsDrilldown(e.point, {
                name: props.top5TreeData.map(name => name.name)[4],                  
                color: colors[4],
                data: props.top5TreeData.map(yearlyCount => yearlyCount.yearlyCount)[4]
              });
            }
            chart.applyDrilldown();
         }
        },
        drillup: function (e) {    
          var chart = this;
          chart.setTitle({ text: props.neighbourhood }, {  
            text: "Total: " + props.top5TotalPlanted
          });
        }
      }
    },
    colors: colors,
    title: {
      text: props.neighbourhood,
    },
    subtitle: {
      text: "Total: " + props.top5TotalPlanted
    },
    caption: {
      useHTML: true,
      text: captionText,
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      title: {
        text: 'Number of Trees'
      },
    },
    legend: {
      enabled: false
    },
    tooltip: {
      shared: true,
      pointFormat: '<b style="text-align: center">{point.y}</br>'
    },
    series: [
      {
        name: "Trees",
        colorByPoint: true,
        data: [
          {
            name: props.top5TreeData.map(name => name.name)[0],
            y: props.top5TreeData.map(totalCount => totalCount.totalCount)[0],
            drilldown: true
          },
          {
            name: props.top5TreeData.map(name => name.name)[1],
            y: props.top5TreeData.map(totalCount => totalCount.totalCount)[1],
            drilldown: true
          },
          {
            name: props.top5TreeData.map(name => name.name)[2],
            y: props.top5TreeData.map(totalCount => totalCount.totalCount)[2],
            drilldown: true
          },
          {
            name: props.top5TreeData.map(name => name.name)[3],
            y: props.top5TreeData.map(totalCount => totalCount.totalCount)[3],
            drilldown: true
          },
          {
            name: props.top5TreeData.map(name => name.name)[4],
            y: props.top5TreeData.map(totalCount => totalCount.totalCount)[4],
            drilldown: true
          },
        ],
      },
    ],
  }

  return (

    <section className="chart" id="container">
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
      />
    </section>
  )
}
