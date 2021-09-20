import React, { Component } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
// import accessibility from "highcharts/modules/accessibility";
import drilldown from "highcharts/modules/drilldown";


// const options = {
//   title: {
//     text: 'My chart'
//   },
//   series: [{
//     data: [1, 2, 3, 5, 6, 3, 1]
//   }]
// }

const options = {
  chart: {
    type: 'column',
    events: {}
  },
  title: {
    text: 'Top 5 types of trees planted in Mount Pleasant'
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
          name: "Kwanzan Flowering Cherry",
          y: 747,
          drilldown: "Kwanzan Flowering Cherry"
        },
        {
          name: "Red Maple",
          y: 264,
          drilldown: "Red Maple"
        },
        {
          name: "Chanticleer Pear",
          y: 239,
          drilldown: "Chanticleer Pear"
        },
        {
          name: "Crimean Linden",
          y: 219,
          drilldown: "Crimean Linden"
        },
        {
          name: "Norway Maple",
          y: 217,
          drilldown: "Norway Maple"
        },
      ]
    }
  ],
  // events: {
    drilldown: {
      series: [
        {
          name: "Kwanzan Flowering Cherry",
          id: "Kwanzan Flowering Cherry",
          data: [
            [
              "1990",
              50
            ],
            [
              "1992",
              2
            ],
            [
              "1993",
              1
            ],
            [
              "1997",
              2
            ],
            [
              "1999",
              1
            ],
            [
              "2002",
              6
            ],
            [
              "2004",
              2
            ],
            [
              "2006",
              11
            ],
            [
              "2007",
              4
            ],
            [
              "2008",
              7
            ],
            [
              "2010",
              1
            ],
            [
              "2011",
              5
            ],
            [
              "2012",
              4
            ],
            [
              "2014",
              6
            ],
            [
              "2017",
              1
            ],
            [
              "2019",
              1
            ]
          ]
        },
        {
          name: "Firefox",
          id: "Firefox",
          data: [
            [
              "v58.0",
              1.02
            ],
            [
              "v57.0",
              7.36
            ],
            [
              "v56.0",
              0.35
            ],
            [
              "v55.0",
              0.11
            ],
            [
              "v54.0",
              0.1
            ],
            [
              "v52.0",
              0.95
            ],
            [
              "v51.0",
              0.15
            ],
            [
              "v50.0",
              0.1
            ],
            [
              "v48.0",
              0.31
            ],
            [
              "v47.0",
              0.12
            ]
          ]
        },
        {
          name: "Internet Explorer",
          id: "Internet Explorer",
          data: [
            [
              "v11.0",
              6.2
            ],
            [
              "v10.0",
              0.29
            ],
            [
              "v9.0",
              0.27
            ],
            [
              "v8.0",
              0.47
            ]
          ]
        },
        {
          name: "Safari",
          id: "Safari",
          data: [
            [
              "v11.0",
              3.39
            ],
            [
              "v10.1",
              0.96
            ],
            [
              "v10.0",
              0.36
            ],
            [
              "v9.1",
              0.54
            ],
            [
              "v9.0",
              0.13
            ],
            [
              "v5.1",
              0.2
            ]
          ]
        },
        {
          name: "Edge",
          id: "Edge",
          data: [
            [
              "v16",
              2.6
            ],
            [
              "v15",
              0.92
            ],
            [
              "v14",
              0.4
            ],
            [
              "v13",
              0.1
            ]
          ]
        },
        {
          name: "Opera",
          id: "Opera",
          data: [
            [
              "v50.0",
              0.96
            ],
            [
              "v49.0",
              0.82
            ],
            [
              "v12.1",
              0.14
            ]
          ]
        }
      ]
    // }
  }
};


class Chart extends Component {

  render() {
    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          // constructorType={'column'}
          options={options}
        />
      </div>
    )
  }
}

export default Chart;