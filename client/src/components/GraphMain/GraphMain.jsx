import React, { Component } from "react";
import Plot from 'react-plotly.js';
import LabelledLinesAnnotations from '../../utils/Graphs/LineCharts/LabelledLinesAnnotations';

// const xData = [
//   [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013],   // x-axis --> Years all match 
//   [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013],   // same number of [] as trees so 10x 
//   [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013],
//   //[2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013],
//   [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013]];

// const yData = [
//   [74, 82, 80, 74, 73, 72, 74, 70, 70, 66, 66, 69],   // each tree number in that year
//   [45, 42, 50, 46, 36, 36, 34, 35, 32, 31, 31, 28],   // TODO: NEED NUM OF TREES by NAME PLANTED IN EACH YEAR 
//   [13, 14, 20, 24, 20, 24, 24, 40, 35, 41, 43, 50],
//   //[13, 14, 20, 24, 20, 24, 24, 40, 35, 41, 43, 50],
//   [18, 21, 18, 21, 16, 14, 13, 18, 17, 16, 19, 23]];

// const labels = ["Television", "Newspaper", "Internet", "Radio"];  

class GraphMain extends Component {
  
  state = {
    // xData: xData,
    // yData: yData,
    // labels: labels,
    labelsTest: this.props.labelsTest
  }

  componentDidMount() {
    this.formatWords()
  }

  formatWords() {
    const words = this.state.labelsTest
    console.log('words:', words)
  }
  
  render() {
    // console.log("Data --> ", LabelledLinesAnnotations(this.state.xData, this.state.yData).data)
    // console.log("Layout --> ", LabelledLinesAnnotations(this.state.xData, this.state.yData).layout)

    const { xData, yData, labels } = this.state;


    // console.log('Data Processed ---> ', LabelledLinesAnnotations(xData, yData, labels).data)
    // console.log('Layout Processed ---> ', LabelledLinesAnnotations(xData, yData, labels).layout)

    console.log("Props neighbourhood", this.props.neighbourhood)
    console.log("Props top5AllData", this.props.top5AllData)
    console.log("Props labelsTest", this.props.labelsTest)
    console.log("Props labelsTest", this.props.labelsTest.map(item => this.props.capitalizeFirstLetter(item)))
    console.log("Props xDataTest", this.props.xDataTest)
    console.log("Props yDataTest", this.props.yDataTest)

    const { xDataTest, yDataTest, labelsTest } = this.props
    
    return (
      <section className="graph">
        <div className="graph__box">
          <Plot
            // data={LabelledLinesAnnotations(xData, yData, labels).data}
            // layout={LabelledLinesAnnotations(xData, yData, labels).layout}
            data={LabelledLinesAnnotations(xDataTest, yDataTest, labelsTest).data}
            layout={LabelledLinesAnnotations(xDataTest, yDataTest, labelsTest).layout}
          />
        </div>
      </section>
    );
  }
}

export default GraphMain;













// Plotly
// https://plotly.com/javascript/line-charts/   bottom one is the one =) 
// https://plotly.com/javascript/reference/     reference 
// https://plotly.com/python/templates/         Theming and templates 

// D3.js
// https://observablehq.com/@d3/sortable-bar-chart
