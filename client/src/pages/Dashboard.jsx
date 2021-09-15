import React, { Component } from "react";
import axios from 'axios';
import Header from "../components/Header/Header";
import Map from "../components/Map/Map";
import Graphs from "../components/Graphs/Graphs";
import GraphMain from "../components/GraphMain/GraphMain";
import Footer from "../components/Footer/Footer";

// 1st Neighbourhood: MOUNT PLEASANT 6,500+ trees
// API --> (neighberhood, Geom,)(Genus, Species, Common)(diameter when planted, year)

// https://opendata.vancouver.ca/api/records/1.0/search/?dataset=street-trees&q=&rows=20&facet=neighbourhood_name&facet=street_side_name&refine.neighbourhood_name=GRANDVIEW-WOODLAND
// https://opendata.vancouver.ca/api/records/1.0/search/?dataset=street-trees&q=&rows=20&refine.neighbourhood_name=MOUNT+PLEASANT
const base_url = "https://opendata.vancouver.ca/api/records/1.0/search/"
// const dataset = "?dataset=street-trees&q=&"
// const rows = "rows=20&"
// const facets = "facet=neighbourhood_name&refine.neighbourhood_name=MOUNT+PLEASANT"
// const API_URL = base_url + dataset + rows + facets

const API_URL_WITH_COMMON_NAME = base_url + "?dataset=street-trees&q=&rows=20&facet=common_name&refine.neighbourhood_name=MOUNT+PLEASANT"

// TODO: Set total Rows to all
// TODO: Select Neighbourhood

class Dashboard extends Component {

  state = {
    neighbourhood: '',
    trees: [],
    treeCount: [],
    commonNamesWithEachTotal: [],
    numberOfCommonNames: []  
  }

  componentDidMount() {
    // this.getTrees()
  }

  getTrees() {  
  axios
    .get(`${API_URL_WITH_COMMON_NAME}`)
    .then((response) => {
      // console.log("Response", response)
      // console.log("Neighbourhood --> ", response.data.parameters.refine.neighbourhood_name)         // console.log("Neighbourhood --> ", response.data.facet_groups[1].facets[0].name)
      // console.log("Trees --> ", response.data.records.map((record) => record.fields))
      // console.log("Number of Unique Tree Results returned (nhits) -->", response.data.nhits)
      // console.log("Common Names w/ Count of each -->", response.data.facet_groups[0].facets)
      // console.log("Number of Common Names -->", response.data.facet_groups[0].facets.length)   
      this.setState({
        neighbourhood: response.data.parameters.refine.neighbourhood_name,
        trees: response.data.records.map((record) => record.fields),
        treeCount: response.data.nhits,
        commonNamesWithEachTotal: response.data.facet_groups[0].facets,
        numberOfCommonNames: response.data.facet_groups[0].facets.length
      })
    })
  }
  
  render() {

    console.log(this.state)

    return (
      <section className="dashboard">
        <Header
          neighbourhood={this.state.neighbourhood}
          />
        <GraphMain/>
        <div className="dashboard__instruments">
          <Map
            neighbourhood={this.state.neighberhood}
            trees={this.state.trees}
            treeCount={this.state.treeCount}
            commonNamesWithEachTotal={this.state.commonNamesWithEachTotal}
            numberOfCommonNames={this.state.numberOfCommonNames}
          />
          <Graphs/>
        </div>
        <Footer/>
      </section>
    );
  }
}

export default Dashboard;

// https://ishadeed.com/article/website-headers-flexbox/
