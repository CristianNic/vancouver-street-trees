import React, { Component } from "react";
import axios from 'axios';
import Header from "../components/Header/Header";
import Map from "../components/Map/Map";
// import Graphs from "../components/Graphs/Graphs";
import Footer from "../components/Footer/Footer";
// import Chart from "../components/Chart/Chart";
import Chart from "../components/Chart/Chart";
// import Highcharts from 'highcharts'

// 1st Neighbourhood: MOUNT PLEASANT 6,500+ trees
// API --> (neighbourhood, Geom,)(Genus, Species, Common)(diameter when planted, year)
// TODO: Set total Rows to all
// TODO: Select Neighbourhood

// https://opendata.vancouver.ca/api/records/1.0/search/?dataset=street-trees&q=&rows=20&facet=neighbourhood_name&facet=street_side_name&refine.neighbourhood_name=GRANDVIEW-WOODLAND
// https://opendata.vancouver.ca/api/records/1.0/search/?dataset=street-trees&q=&rows=20&refine.neighbourhood_name=MOUNT+PLEASANT
// const dataset = "?dataset=street-trees&q=&"
// const rows = "rows=20&"
// const facets = "facet=neighbourhood_name&refine.neighbourhood_name=MOUNT+PLEASANT"
// const API_URL = base_url + dataset + rows + facets

const BASE_URL = "https://opendata.vancouver.ca/api/records/1.0/search/"
const DATASET = "?dataset=street-trees&q=&rows=1000"
const NEIGHBOURHOOD = "MOUNT+PLEASANT"
const FACET_COMMON_NAME = "&facet=common_name"
const REFINE_COMMON_NAME = "&refine.common_name="
const FACET_NEIGHBOURHOOD = "&facet=neighbourhood_name"
const REFINE_NEIGHBOURHOOD = "&refine.neighbourhood_name="
const FACET_DATE_PLANTED = "&facet=date_planted"

const API_URL_NEIGHBOURHOOD = BASE_URL + DATASET + FACET_COMMON_NAME + REFINE_NEIGHBOURHOOD + NEIGHBOURHOOD

// const URL_date =  base_url + "?dataset=street-trees&q=date_planted%3A%5B1989-01-01+TO+2020-01-01%5D&facet=common_name&facet=neighbourhood_name&facet=date_planted&refine.neighbourhood_name=MOUNT+PLEASANT"
// const top1_rows100 = base_url + "?dataset=street-trees&q=date_planted%3A%5B1989-01-01+TO+2020-01-01%5D&rows=300&" +
//                                 "facet=common_name&facet=neighbourhood_name&facet=date_planted&refine.neighbourhood_name=MOUNT+PLEASANT&refine.common_name=CHANTICLEER+PEAR"
// 221 CHANTICLEER PEAR in Mount Pleasant 

// const top2nd = base_url + "?dataset=street-trees&q=date_planted%3A%5B1989-01-01+TO+2020-01-01%5D&rows=400&facet=common_name&facet=neighbourhood_name&facet=date_planted&refine.neighbourhood_name=MOUNT+PLEASANT&refine.common_name=PYRAMIDAL+EUROPEAN+HORNBEAM"
// const top2ndTest = base_url + "?dataset=street-trees&q=&rows=400&facet=common_name&facet=neighbourhood_name&facet=date_planted&refine.neighbourhood_name=MOUNT+PLEASANT&refine.common_name=PYRAMIDAL+EUROPEAN+HORNBEAM"
// const API_URL_WITH_NEIGHBOURHOOD_AND_COMMON_NAME = base_url
//   + "?dataset=street-trees&q=&rows=400&facet=common_name&facet=neighbourhood_name&facet=date_planted&refine.neighbourhood_name="
//   + NEIGHBOURHOOD + "&refine.common_name=PYRAMIDAL+EUROPEAN+HORNBEAM"

// const TREE_COMMON_NAME = "PYRAMIDAL+EUROPEAN+HORNBEAM"
// const API_URL_WITH_NEIGHBOURHOOD_AND_COMMON_NAME =
//   BASE_URL + DATASET + FACET_COMMON_NAME + FACET_NEIGHBOURHOOD + FACET_DATE_PLANTED
//   + REFINE_NEIGHBOURHOOD + NEIGHBOURHOOD + REFINE_COMMON_NAME + TREE_COMMON_NAME

// const API_URL_WITH_NEIGHBOURHOOD_AND_COMMON_NAME = BASE_URL + DATASET
//   + "&facet=common_name&facet=neighbourhood_name&facet=date_planted&refine.neighbourhood_name="
//   + NEIGHBOURHOOD + "&refine.common_name=" + TREE_COMMON_NAME

class Dashboard extends Component {

  state = {
    neighbourhood: '',
    top5Trees: [],
    // allCommonNamesWithTotals: [],
    // top5CommonNames: [],
    // numberOfCommonNames: [],
    // recordsWithGeom: [],
    // recordsNoGeom: [],
    top5CommonNames: [],             
    totalCounts: [],
    series: []
  }

  async componentDidMount() {
    // ---- Async function because only after the first request (longest) can we know which are the top 5 trees to investigate ---- //
    const getAllNeighbourhoodTrees = await Promise.all([
    axios.get(`${API_URL_NEIGHBOURHOOD}`)])
    console.log('Dashboard --> :', getAllNeighbourhoodTrees)
    
    const confirmNeighbourhood = getAllNeighbourhoodTrees[0].data.facet_groups[1].facets[0].name
    const confirmNeighbourhoodLowerCaps = this.capitalizeFirstLetter(confirmNeighbourhood)
    // console.log('neighbourhoodLowerCaps:', confirmNeighbourhoodLowerCaps)

    // ------ Top 5 Trees by Common Names ------- //
    const top5TreesByCommonNames = getAllNeighbourhoodTrees[0].data.facet_groups[0].facets.slice(0, 5)
    // console.log("top5TreesByCommonNames", top5TreesByCommonNames)

    const top5TreeNames = top5TreesByCommonNames.map(treeName => treeName.name)
    const top5TreeNamesLowerCaps = top5TreeNames.map(item => this.capitalizeFirstLetter(item))
    // console.log('top5TreeNamesLowerCaps:', top5TreeNamesLowerCaps)

    // ------ Numbers of trees planted of each type in the top 5 ------- //
    const top5TreesByCount = top5TreesByCommonNames.map(count => count.count)
    // console.log('top5TreesByCount:', top5TreesByCount)

    // ------  Find the number per year of each of the 5 top trees planted in a neighbourhood.                   ------- // 
    // ------  The Tree Dataset is 147,173 records. Neighbourhood's can range from 11,650 - 2,606 trees planted. ------- //
    // ------  First narrowed it down by neighbourhood and obtained top 5 and totals of each planted             ------- //
    // ------  between 1989 - 2019. Next query the API asking how many trees were planted in each year for a     ------- //
    // ------  given type of tree (by common name).                                                              ------- //

    // ------ Find the number of trees planted each year for each of the top 5  ------- //
    // ------ ( & get all trees for each top 5 for the map geom )               ------- //
    
    // ------ Formulate API Neighbourhood Calls ------- //
    // ------ Format Tree Common Name for API format ------- //
    const FORMATTED_COMMON_NAME = top5TreeNames.map(treeName => treeName.replaceAll(' ', '+'))
    // console.log('FORMATTED_COMMON_NAME:', FORMATTED_COMMON_NAME)
    
    // ---- Formulate URLs for the next 5 requests ---- //
    const API_URL_NEIGHBOURHOOD_DATE_PLANTED_REFINE_COMMON_NAME =
      BASE_URL + DATASET + FACET_COMMON_NAME + FACET_NEIGHBOURHOOD + FACET_DATE_PLANTED
      + REFINE_NEIGHBOURHOOD + NEIGHBOURHOOD + REFINE_COMMON_NAME
    
    const firstReq = API_URL_NEIGHBOURHOOD_DATE_PLANTED_REFINE_COMMON_NAME + FORMATTED_COMMON_NAME[0]
    const secondReq = API_URL_NEIGHBOURHOOD_DATE_PLANTED_REFINE_COMMON_NAME + FORMATTED_COMMON_NAME[1]
    const thirdReq = API_URL_NEIGHBOURHOOD_DATE_PLANTED_REFINE_COMMON_NAME + FORMATTED_COMMON_NAME[2]
    const fourthReq = API_URL_NEIGHBOURHOOD_DATE_PLANTED_REFINE_COMMON_NAME + FORMATTED_COMMON_NAME[3]
    const fifthReq = API_URL_NEIGHBOURHOOD_DATE_PLANTED_REFINE_COMMON_NAME + FORMATTED_COMMON_NAME[4]

    const tree1 = await axios.get(firstReq)   // removed await 
    // console.log('tree1:', tree1)
    const tree1Years = tree1.data.facet_groups[2].facets.map((year) => year.name)
    // console.log('tree1Years:', tree1Years)
    const tree1Count = tree1.data.facet_groups[2].facets.map((count) => count.count)
    // console.log('tree1Count:', tree1Count)

    const tree2 = await axios.get(secondReq)
    // console.log('tree2:', tree2)
    const tree2Years = tree2.data.facet_groups[2].facets.map((year) => year.name)
    // console.log('tree2Years:', tree2Years)
    const tree2Count = tree2.data.facet_groups[2].facets.map((count) => count.count)
    // console.log('tree2Count:', tree2Count)

    const tree3 = await axios.get(thirdReq)
    // console.log('tree3:', tree3)
    const tree3Years = tree3.data.facet_groups[2].facets.map((year) => year.name)
    // console.log('tree3Years:', tree3Years)
    const tree3Count = tree3.data.facet_groups[2].facets.map((count) => count.count)
    // console.log('tree3Count:', tree3Count)
    
    const tree4 = await axios.get(fourthReq)
    // console.log('tree4:', tree4)
    const tree4Years = tree4.data.facet_groups[2].facets.map((year) => year.name)
    // console.log('tree4Years:', tree4Years)
    const tree4Count = tree4.data.facet_groups[2].facets.map((count) => count.count)
    // console.log('tree4Count:', tree4Count)

    const tree5 = await axios.get(fifthReq)
    // console.log('tree5:', tree5)
    const tree5Years = tree5.data.facet_groups[2].facets.map((year) => year.name)
    // console.log('tree5Years:', tree5Years)
    const tree5Count = tree5.data.facet_groups[2].facets.map((count) => count.count)
    // console.log('tree5Count:', tree5Count)
  
    const yearlyCount = (years, count) => {
      const yearlyCountArr = [];
      for (let i = 0; i < years.length; i++) {
        const output = [years[i], count[i]];
        yearlyCountArr.push(output);
      }
      return yearlyCountArr
    }
    
    const top5Trees = {
      neighbourhood: confirmNeighbourhoodLowerCaps,
      tree1:
        {name: top5TreeNamesLowerCaps[0], totalCount: top5TreesByCount[0], yearlyCount: yearlyCount(tree1Years, tree1Count)},
      tree2:
        {name: top5TreeNamesLowerCaps[1], totalCount: top5TreesByCount[1], yearlyCount: yearlyCount(tree2Years, tree2Count)},
      tree3:
        {name: top5TreeNamesLowerCaps[2], totalCount: top5TreesByCount[2], yearlyCount: yearlyCount(tree3Years, tree3Count)},
      tree4:
        {name: top5TreeNamesLowerCaps[3], totalCount: top5TreesByCount[3], yearlyCount: yearlyCount(tree4Years, tree4Count)},
      tree5:
        {name: top5TreeNamesLowerCaps[4], totalCount: top5TreesByCount[4], yearlyCount: yearlyCount(tree5Years, tree5Count)}
    }
    // console.log('Dashboard --> top5Trees:', top5Trees)

    const series = [
      {
        name: top5Trees.tree1.name,
        y: top5Trees.tree1.totalCount,
        drilldown: true
      },
      {
        name: top5Trees.tree2.name,
        y: top5Trees.tree2.totalCount,
        drilldown: true
      },
      {
        name: top5Trees.tree3.name,
        y: top5Trees.tree3.totalCount,
        drilldown: true
      },
      {
        name: top5Trees.tree4.name,
        y: top5Trees.tree4.totalCount,
        drilldown: true
      },
      {
        name: top5Trees.tree5.name,
        y: top5Trees.tree5.totalCount,
        drilldown: true
      },
    ]
    
    const drilldownSeries = [
      {
        name: top5Trees.tree1.name,
        id: top5Trees.tree1.name,
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
        ]
      }
    ]
       
    // console.log('=)=)=) series:', series)
      
    this.setState({
      neighbourhood: confirmNeighbourhoodLowerCaps,
      top5Trees: top5Trees,
      series: series,
      drilldownSeries: drilldownSeries
    })
    
  }

  capitalizeFirstLetter(sentence) { const words = sentence.split(" ");
    const caps = words.map(word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
    const newSentence = caps.join(" ");
    return newSentence
  }

  // getTreesTop() {
  //   // ---- Select Neighbourhood (insert into URL string) ---- //
  //   // ---- Get Top 5 Trees planted in this Neighbourhood ---- //
  //   axios
  //     .get(`${API_URL_NEIGHBOURHOOD}`)
  //     .then((response) => {
  //       console.log("Response", response)
  //       // Select Neighbourhood (insert into URL string)
  //       // ---- Get Top 5 Trees planted in this Neighbourhood ---- //
  //       const top5 = response.data.facet_groups[0].facets.slice(0, 5)
  //       console.log('top5:', top5)
  //       const top5Array = top5.map(treeName => treeName.name)
  //       console.log('top5Array:', top5Array)
  //       // this.setState({
  //       //   top5: top5,
  //       //   top5Array: top5Array
  //       // })
  //       return top5
  //     })
  //     .catch(err => { console.log(err) })
  
  //   console.log("getTreesTop5 Still in this function")
  //   const five = 5
  //   console.log('five:', five)
  //   console.log('TOP% FROM FN', this.state.top5)
  //   // console.log('Just the words', top5)
    
  // }

  render() {

    // console.log("Series in State", this.state.series)
    return (
      <section className="dashboard">
        <div className="dashboard__container">
          <Header
            neighbourhood={this.state.neighbourhood}
            // capitalizeFirstLetter={this.capitalizeFirstLetter}
          />
          <div className="dashboard__main">
            <Map
              neighbourhood={this.state.neighbourhood}
              // ----- let the map parse out the geom & possibly reverse code locations ----- // 
              // trees={this.state.trees}
              // treeCount={this.state.treeCount}
              // commonNamesWithEachTotal={this.state.allCommonNamesWithTotals}
              // numberOfCommonNames={this.state.numberOfCommonNames}
            />
            <Chart
              top5Trees={this.state.top5Trees}
              series={this.state.series}
              drilldownSeries={this.state.drilldownSeries}
              />
            {/* <Graphs/> */}
          </div>
          <Footer />
        </div>
    </section>
    );
  }
}

export default Dashboard;

// https://ishadeed.com/article/website-headers-flexbox/
// https://stackoverflow.com/questions/44182951/axios-chaining-multiple-api-requests
