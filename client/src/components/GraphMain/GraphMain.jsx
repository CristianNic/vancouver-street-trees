import React, { Component } from "react";
import Plot from 'react-plotly.js';
import LabelledLinesAnnotations from '../../utils/Graphs/LineCharts/LabelledLinesAnnotations';

const xData = [
  [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013],
  [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013],
  [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013],
  [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013]];
const yData = [
  [74, 82, 80, 74, 73, 72, 74, 70, 70, 66, 66, 69],
  [45, 42, 50, 46, 36, 36, 34, 35, 32, 31, 31, 28],
  [13, 14, 20, 24, 20, 24, 24, 40, 35, 41, 43, 50],
  [18, 21, 18, 21, 16, 14, 13, 18, 17, 16, 19, 23]];

class GraphMain extends Component {
  
  state = {
    xData: xData,
    yData: yData
  }

  render() {
    // console.log("Data --> ", LabelledLinesAnnotations(this.state.xData, this.state.yData).data)
    // console.log("Layout --> ", LabelledLinesAnnotations(this.state.xData, this.state.yData).layout)

    const { xData, yData } = this.state;

    return (
      <section className="graph">
        <div className="graph__box">
          <Plot
            data={LabelledLinesAnnotations(xData, yData).data}
            layout={LabelledLinesAnnotations(xData, yData).layout}
          />
        </div>
      </section>
    );
  }
}

export default GraphMain;














// https://plotly.com/javascript/line-charts/   bottom one is the one =) 
// https://plotly.com/javascript/reference/     reference 
// D3.js =) https://observablehq.com/@d3/sortable-bar-chart