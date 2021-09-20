import React, { Component } from "react";
import axios from 'axios';
import Header from "../components/Header/Header";
import Map from "../components/Map/Map";
import Graphs from "../components/Graphs/Graphs";
import Footer from "../components/Footer/Footer";
import Chart from "../components/Chart/Chart";

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
const DATASET = "?dataset=street-trees&q=&rows=500"
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

// .get(`${URL_date}`)
// .get(`${top1_rows100}`)
// .get(`${top2nd}`)
// .get(`${top2ndTest}`)


class Dashboard extends Component {

  state = {
    // response: [],
    // neighbourhood: '',
    neighbourhoodLowerCaps: [],
    // trees: [],
    // treeCount: [],
    // allCommonNamesWithTotals: [],
    // top5CommonNames: [],
    // numberOfCommonNames: [],
    // records: [],
    // recordsWithGeom: [],
    // recordsNoGeom: [],
    top5AllData: [],
    // top5Array: [],
    top5ArrayLowerCaps: [],             // Graph Labels
    totalCounts: [],
    firstTreeYears: [],
    secondTreeYears: [],
    thirdTreeYears: [],
    fourthTreeYears: [],
    fifthTreeYears: [],
    firstTreeCount: [],
    secondTreeCount: [],
    thirdTreeCount: [],
    fourthTreeCount: [],
    fifthTreeCount: []
  }

  // async componentDidMount() {
  //   // ---- Make first request ---- //
  //   const getTop5Trees = await Promise.all([
  //     axios.get(`${API_URL_NEIGHBOURHOOD}`)])
    
  // }

  // async componentDidMount() {
  //   // ---- Make first request ---- //
  //   const getTop5Trees = await Promise.all([
  //     axios.get(`${API_URL_NEIGHBOURHOOD}`)])
    
  //   const AllTheData = getTop5Trees 
  //   console.log('----> AllTheData <--- :', AllTheData)
    
  //   const confirmNeighbourhood = getTop5Trees[0].data.facet_groups[1].facets[0].name
  //   console.log('confirmNeighbourhood:', confirmNeighbourhood)
  //   const neighbourhoodLowerCaps = this.capitalizeFirstLetter(confirmNeighbourhood)
  //   console.log('neighbourhoodLowerCaps:', neighbourhoodLowerCaps)

  //   const top5AllData = getTop5Trees[0].data.facet_groups[0].facets.slice(0, 5)
  //   // console.log("getTreesTop5", top5)
  //   const top5Array = top5AllData.map(treeName => treeName.name)
  //   // console.log('top5Array:', top5Array)
  //   const top5ArrayLowerCaps = top5Array.map(item => this.capitalizeFirstLetter(item))
  //   console.log('top5ArrayLowerCaps:', top5ArrayLowerCaps)

  //   const addPlusSigns = top5Array.map(treeName => treeName.replaceAll(' ', '+'))
  //   console.log('addPlusSigns2:', addPlusSigns)
    
  //   // ---- Formulate URLs for the next 5 requests ---- //
  //   const API_URL_NEIGHBOURHOOD_DATE_NAME = BASE_URL + DATASET + FACET_COMMON_NAME + FACET_NEIGHBOURHOOD + FACET_DATE_PLANTED
  //                                         + REFINE_NEIGHBOURHOOD + NEIGHBOURHOOD + REFINE_COMMON_NAME
    
  //   const first = API_URL_NEIGHBOURHOOD_DATE_NAME + addPlusSigns[0]
  //   // console.log('first:', first)
  //   const second = API_URL_NEIGHBOURHOOD_DATE_NAME + addPlusSigns[1]
  //   // console.log('second:', second)
  //   const third = API_URL_NEIGHBOURHOOD_DATE_NAME + addPlusSigns[2]
  //   // console.log('third:', third)
  //   const fourth = API_URL_NEIGHBOURHOOD_DATE_NAME + addPlusSigns[3]
  //   // console.log('fourth:', fourth)
  //   const fifth = API_URL_NEIGHBOURHOOD_DATE_NAME + addPlusSigns[4]
  //   // console.log('fifth:', fifth)

  //   const firstTree = await axios.get(first)   // removed await 
  //   console.log('firstTree:', firstTree)
  //   const secondTree = await axios.get(second)
  //   console.log('secondTree:', secondTree)
  //   const thirdTree = await axios.get(third)
  //   console.log('thirdTree:', thirdTree)
  //   const fourthTree = await axios.get(fourth)
  //   console.log('fourthTree:', fourthTree)
  //   const fifthTree = await axios.get(fifth)
  //   console.log('fifthTree:', fifthTree)

  //   const totalCounts = [firstTree.data.nhits, secondTree.data.nhits, thirdTree.data.nhits,
  //                        fourthTree.data.nhits, fifthTree.data.nhits]
  //   console.log('Total Counts:', totalCounts)

  //   // Years 
  //   const firstTreeYears = firstTree.data.facet_groups[2].facets.map((year) => year.name)
  //   console.log('firstTreeYears:', firstTreeYears)
  //   const secondTreeYears = firstTree.data.facet_groups[2].facets.map((year) => year.name)
  //   console.log('secondTreeYears:', secondTreeYears)
  //   const thirdTreeYears = thirdTree.data.facet_groups[2].facets.map((year) => year.name)
  //   console.log('thirdTreeYears:', thirdTreeYears)
  //   const fourthTreeYears = fourthTree.data.facet_groups[2].facets.map((year) => year.name)
  //   console.log('fourthTreeYears:', fourthTreeYears)
  //   const fifthTreeYears = fifthTree.data.facet_groups[2].facets.map((year) => year.name)
  //   console.log('fifthTreeYears:', fifthTreeYears)

  //   // Count 
  //   const firstTreeCount = firstTree.data.facet_groups[2].facets.map((count) => count.count)
  //   console.log('firstTreeCount:', firstTreeCount)
  //   const secondTreeCount = firstTree.data.facet_groups[2].facets.map((count) => count.count)
  //   console.log('secondTreeCount:', secondTreeCount)
  //   const thirdTreeCount = thirdTree.data.facet_groups[2].facets.map((count) => count.count)
  //   console.log('thirdTreeCount:', thirdTreeCount)
  //   const fourthTreeCount = fourthTree.data.facet_groups[2].facets.map((count) => count.count)
  //   console.log('fourthTreeCount:', fourthTreeCount)
  //   const fifthTreeCount = fifthTree.data.facet_groups[2].facets.map((count) => count.count)
  //   console.log('fifthTreeCount:', fifthTreeCount)

  //   this.setState({
  //     // neighbourhood: confirmNeighbourhood,  // Goes to Header 
  //     neighbourhoodLowerCaps: neighbourhoodLowerCaps,
  //     top5AllData: top5AllData,      
  //     // top5Array: top5Array,
  //     top5ArrayLowerCaps: top5ArrayLowerCaps,                 // Graph Labels
  //     totalCounts: totalCounts,
  //     firstTreeYears: firstTreeYears,
  //     secondTreeYears: secondTreeYears,
  //     thirdTreeYears: thirdTreeYears,
  //     fourthTreeYears: fourthTreeYears,
  //     fifthTreeYears: fifthTreeYears,
  //     firstTreeCount: firstTreeCount,
  //     secondTreeCount: secondTreeCount,
  //     thirdTreeCount: thirdTreeCount,
  //     fourthTreeCount: fourthTreeCount,
  //     fifthTreeCount: fifthTreeCount
  //   })
    
  // }

  // componentDidUpdate() {
  // }

  capitalizeFirstLetter(sentence) { const words = sentence.split(" ");
    const caps = words.map(word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
    const newSentence = caps.join(" ");
    return newSentence
  }
  
  getTreesTop() {
    // ---- Select Neighbourhood (insert into URL string) ---- //
    // ---- Get Top 5 Trees planted in this Neighbourhood ---- //
    axios
      .get(`${API_URL_NEIGHBOURHOOD}`)
      .then((response) => {
        console.log("Response", response)
        // Select Neighbourhood (insert into URL string)
        // ---- Get Top 5 Trees planted in this Neighbourhood ---- //
        const top5 = response.data.facet_groups[0].facets.slice(0, 5)
        console.log('top5:', top5)
        const top5Array = top5.map(treeName => treeName.name)
        console.log('top5Array:', top5Array)
        this.setState({
          top5: top5,
          top5Array: top5Array
        })
        return top5
      })
      .catch(err => { console.log(err) })
  
    console.log("getTreesTop5 Still in this function")
    const five = 5
    console.log('five:', five)
    console.log('TOP% FROM FN', this.state.top5)
    // console.log('Just the words', top5)
    
  }

  // getTreesDetails() {
  //   axios
  //     .get()
  //     .then((response) => {
  //       console.log("THIS COMES FROM STATE function 1", this.state.top5)
  //     })
  //     // .catch(err =>{console.log(err)})


  //       // Get the Record for each: Trees planted / year and geom for each tree
      
  //     // console.log("Neighbourhood --> ", response.data.parameters.refine.neighbourhood_name)         // console.log("Neighbourhood --> ", response.data.facet_groups[1].facets[0].name)
  //     // console.log("Trees --> ", response.data.records.map((record) => record.fields))
  //     // console.log("Number of Unique Tree Results returned (nhits) -->", response.data.nhits)
  //     // console.log("Common Names w/ Count of each -->", response.data.facet_groups[0].facets)
  //     // console.log("Number of Common Names -->", response.data.facet_groups[0].facets.length)   
      
  //     // const records = response.data.records.map((record) => record.fields)
  //     // const recordsWithGeom = records.filter(obj => obj.hasOwnProperty("geom"))
  //     // const recordsNoGeom = records.filter(x => !recordsWithGeom.includes(x))
  //     // const recordsWithNoGeom = records.filter(obj => !obj.hasOwnProperty("geom"))

  //     // this.setState({
  //     //   response: response.data,
  //     //   // neighbourhood: response.data.parameters.refine.neighbourhood_name,
  //     //   // trees: response.data.records.map((record) => record.fields),
  //     //   // treeCount: response.data.nhits,
  //     //   // allCommonNamesWithTotals: response.data.facet_groups[0].facets,
  //     //   // top5CommonNames: response.data.facet_groups[0].facets.slice(0, 5),
  //     //   // numberOfCommonNames: response.data.facet_groups[0].facets.length

  //     //   records: records,
  //     //   recordsWithGeom: recordsWithGeom,
  //     //   recordsNoGeom: recordsNoGeom,
  //     //   recordsWithNoGeom: recordsWithNoGeom
  //     // })
    
    
  // }

  render() {

    return (
      <section className="dashboard">
        <Header
          neighbourhood={this.state.neighbourhoodLowerCaps}
          capitalizeFirstLetter={this.capitalizeFirstLetter}
        />
        <Chart
        />
        <div className="dashboard__instruments">
          <Map
            neighbourhood={this.state.neighbourhood}
            // ----- let the map parse out the geom & possibly reverse code locations ----- // 
            // trees={this.state.trees}
            // treeCount={this.state.treeCount}
            // commonNamesWithEachTotal={this.state.allCommonNamesWithTotals}
            // numberOfCommonNames={this.state.numberOfCommonNames}
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
// https://stackoverflow.com/questions/44182951/axios-chaining-multiple-api-requests
