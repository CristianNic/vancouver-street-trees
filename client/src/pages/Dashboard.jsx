import React, { Component } from "react";
import axios from "axios";
import Header from "../components/Header/Header";
import Intro from "../components/Intro/Intro";
import Map from "../components/Map/Map";
import Chart from "../components/Chart/Chart";
import Footer from "../components/Footer/Footer";
import { capitalizeFirstLetter } from "../utils/Functions";

const street_trees_dataset_url = "https://opendata.vancouver.ca/api/records/1.0/search/?dataset=street-trees&q=&"
const rows_0 = "rows=0"
const rows_1000 = "rows=1000"
const rows_10000 = "rows=10000"
const facet_common_name = "&facet=common_name"
const facet_neighbourhood = "&facet=neighbourhood_name"
const facet_date_planted = "&facet=date_planted"
const refine_common_name = "&refine.common_name="
const refine_neighbourhood = "&refine.neighbourhood_name="

class Dashboard extends Component {

  state = {
    neighbourhood: "FAIRVIEW",
    top5TreeData: [],
    top5TreeNamesLowerCaps: [],
    top5TotalPlanted: [],
    geom0: [],
    geom1: [],
    geom2: [],
    geom3: [],
    geom4: [],
    activeTrees: [],
  }
  
  componentDidMount() {
    const selectedNeighbourhood = this.state.neighbourhood
    this.getData(selectedNeighbourhood)
  }
  
  yearlyCount(years, count) {
    const yearlyCountArr = [];
    for (let i = 0; i < years.length; i++) {
      const output = [years[i], count[i]];
      yearlyCountArr.push(output);
    }
    return yearlyCountArr
  }
  
  async getData(selectedNeighbourhood) {

    if (selectedNeighbourhood === 'VANCOUVER') {
      const API_URL_ALL_VANCOUVER = street_trees_dataset_url + rows_0 + facet_common_name
      const getAllVancouverTrees = await axios.get(`${API_URL_ALL_VANCOUVER}`)
      
      const top5TreeCommonNames = getAllVancouverTrees.data.facet_groups[0].facets.slice(0, 5)
      const top5TreeNames = top5TreeCommonNames.map(treeName => treeName.name)
      const top5TreeNamesLowerCaps = top5TreeNames.map(item => capitalizeFirstLetter(item))

      //--- Find the number of trees planted by common name ---//
      const top5TreesByCount = await top5TreeCommonNames.map(count => count.count)

      //--- Get info on each of the top 5 trees ---//
      const api_formatted_tree_common_name = await top5TreeNames.map(treeName => treeName.replaceAll(' ', '+'))
      
      const API_URL = street_trees_dataset_url + rows_10000 + facet_common_name + facet_date_planted + refine_common_name

      const getTreeInfoPromises = []
      api_formatted_tree_common_name.forEach(treeName => {
        getTreeInfoPromises.push(axios.get(`${API_URL}${treeName}`))
      })

      const getTreeInfo = await Promise.all(getTreeInfoPromises)
      const treeInfo = getTreeInfo.map(treeInfo => treeInfo.data.facet_groups[1].facets)

      //--- For each tree, find how many trees were planted and in which years ---//
      const years = []
      treeInfo.forEach(tree => {
        const yearArray = tree.map(year => year.name)
        years.push(yearArray)
      })

      const count = []
      treeInfo.forEach(tree => {
        const countArray = tree.map(tree => tree.count)
        count.push(countArray)
      })

      //--- Sum total of the top 5 tree types to display on graph ---//
      const reducer = (previousValue, currentValue) => previousValue + currentValue
      const totalTop5 = top5TreesByCount.reduce(reducer)
      const top5TotalPlanted = new Intl.NumberFormat().format(totalTop5)

      //--- Get Lat/Lng coordinates and for each tree type and create a separate geom object here so ---//
      //--- the map component can quickly map over each. Remove trees that don't have a geom record  ---//
      const treeRecords = getTreeInfo.map(treeInfo => treeInfo.data.records)

      const geom = []
      treeRecords.forEach(record => {
        const treeGeom = record.map(geoms => geoms.fields.geom)
        const removeUndefined = treeGeom.filter(geoms => geoms !== undefined)
        const coordinates = removeUndefined.map(co => co.coordinates)
        geom.push(coordinates)
      })
      const geom0 = geom[0]
      const geom1 = geom[1]
      const geom2 = geom[2]
      const geom3 = geom[3]
      const geom4 = geom[4]
    
      //--- Make an organized tree data object for the chart and possibly more future components ---//
      const top5TreeData = []
      for (let i = 0; i < treeInfo.length; i++) {
        const obj = {
          name: top5TreeNamesLowerCaps[i],
          totalCount: top5TreesByCount[i],
          yearlyCount: this.yearlyCount(years[i], count[i]),
          geom: geom[i]
        }
        top5TreeData.push(obj)
      }
      // console.log('Vancouver-top5TreeData:', top5TreeData[0])
    
      this.setState({
        neighbourhood: 'Vancouver',
        top5TreeData: top5TreeData,
        top5TreeNamesLowerCaps: top5TreeNamesLowerCaps,
        top5TotalPlanted: top5TotalPlanted,
        geom: geom,
        geom0: geom0,
        geom1: geom1,
        geom2: geom2,
        geom3: geom3,
        geom4: geom4,
        activeTrees: [true, true, true, true, true]
      })

    } else {
      const API_URL_NEIGHBOURHOOD = street_trees_dataset_url + rows_0 + facet_common_name + refine_neighbourhood + selectedNeighbourhood
      const getAllNeighbourhoodTrees = await axios.get(`${API_URL_NEIGHBOURHOOD}`)

      const confirmNeighbourhood = getAllNeighbourhoodTrees.data.facet_groups[1].facets[0].name
      const confirmNeighbourhoodLowerCaps = capitalizeFirstLetter(confirmNeighbourhood)

      const top5TreeCommonNames = getAllNeighbourhoodTrees.data.facet_groups[0].facets.slice(0, 5)
      const top5TreeNames = top5TreeCommonNames.map(treeName => treeName.name)
      const top5TreeNamesLowerCaps = top5TreeNames.map(item => capitalizeFirstLetter(item))

      //--- Find the number of trees planted by common name ---//
      const top5TreesByCount = await top5TreeCommonNames.map(count => count.count)
    
      //--- Get info on each of the top 5 trees ---//
      const api_formatted_tree_common_name = await top5TreeNames.map(treeName => treeName.replaceAll(' ', '+'))
    
      const API_URL = street_trees_dataset_url + rows_1000 + facet_common_name + facet_neighbourhood
        + facet_date_planted + refine_neighbourhood + selectedNeighbourhood + refine_common_name

      const getTreeInfoPromises = []
      api_formatted_tree_common_name.forEach(treeName => {
        getTreeInfoPromises.push(axios.get(`${API_URL}${treeName}`))
      })

      const getTreeInfo = await Promise.all(getTreeInfoPromises)
      const treeInfo = getTreeInfo.map(treeInfo => treeInfo.data.facet_groups[2].facets)

      //--- for each tree, find how many trees were planted and in which years ---//
      const years = []
      treeInfo.forEach(tree => {
        const yearArray = tree.map(year => parseInt(year.name))
        years.push(yearArray)
      })

      const count = []
      treeInfo.forEach(tree => {
        const countArray = tree.map(tree => tree.count)
        count.push(countArray)
      })

      //--- Sum total of the top 5 tree types to display on graph ---//
      const reducer = (previousValue, currentValue) => previousValue + currentValue
      const totalTop5 = top5TreesByCount.reduce(reducer)
      const top5TotalPlanted = new Intl.NumberFormat().format(totalTop5)

      //--- Get Lat/Lng coordinates and for each tree type and create a separate geom object here so ---//
      //--- the map component can quickly map over each. Remove trees that don't have a geom record  ---//
      const treeRecords = getTreeInfo.map(treeInfo => treeInfo.data.records)

      const geom = []
      treeRecords.forEach(record => {
        const treeGeom = record.map(geoms => geoms.fields.geom)
        const removeUndefined = treeGeom.filter(geoms => geoms !== undefined)
        const coordinates = removeUndefined.map(co => co.coordinates)
        geom.push(coordinates)
      })
      const geom0 = geom[0]
      const geom1 = geom[1]
      const geom2 = geom[2]
      const geom3 = geom[3]
      const geom4 = geom[4]
    
      //--- Make an organized tree data object for the chart and possibly more future components ---//
      const top5TreeData = []
      for (let i = 0; i < treeInfo.length; i++) {
        const obj = {
          name: top5TreeNamesLowerCaps[i],
          totalCount: top5TreesByCount[i],
          yearlyCount: this.yearlyCount(years[i], count[i]),
          geom: geom[i]
        }
        top5TreeData.push(obj)
      }
      // console.log('Dash-top5TreeData:', top5TreeData[0])
    
      this.setState({
        neighbourhood: confirmNeighbourhoodLowerCaps,
        top5TreeData: top5TreeData,
        top5TreeNamesLowerCaps: top5TreeNamesLowerCaps,
        top5TotalPlanted: top5TotalPlanted,
        geom: geom,
        geom0: geom0,
        geom1: geom1,
        geom2: geom2,
        geom3: geom3,
        geom4: geom4,
        activeTrees: [true, true, true, true, true]
      })
    }
  }

  handleDropdown = (e, data) => {
    this.getData(data.value)
  }
  
  render() {

    const { neighbourhood, top5TreeNamesLowerCaps, top5TotalPlanted, top5TreeData, activeTrees,
      geom, geom0, geom1, geom2, geom3, geom4 } = this.state
    
    return (
      <section className="dashboard">
        <div className="dashboard__container">
          <Header/>
          <div className="dashboard__main">
            <div className="dashboard__left">
              <Intro
                neighbourhood={neighbourhood} 
                handleDropdown={this.handleDropdown}
              />
              <Chart
                neighbourhood={neighbourhood}             
                top5TotalPlanted={top5TotalPlanted}       
                top5TreeData={top5TreeData}
              /> 
            </div>
            <div className="dashboard__right">
              <Map
                geom={geom}
                geom0={geom0}
                geom1={geom1}
                geom2={geom2}
                geom3={geom3}
                geom4={geom4}
                top5TreeData={top5TreeData}
                top5TreeNamesLowerCaps={top5TreeNamesLowerCaps}
                activeTrees={activeTrees}
              />
              </div>
          </div>
          <Footer/>
        </div>
      </section>
    );
  }
}

export default Dashboard;
