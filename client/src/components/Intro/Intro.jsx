import React, { Component } from 'react'
import { Dropdown } from "semantic-ui-react"
import { neighbourhoodsDropdown } from "../../utils/Variables" 

export default class Intro extends Component {

  render() {
    return (
      <section className="intro">
        <div className="intro__container">
          <div className="intro__dropdown-container">
            <h2 className="intro__dropdown-title">Select Neighbourhood</h2>
            <div className="intro__dropdown">
              <Dropdown
                text={this.props.neighbourhood}
                fluid
                options={neighbourhoodsDropdown}
                onChange={this.props.handleDropdown}
              />
            </div>
          </div>
          <h4 className="intro__text">
            Between 1989-2021 the City of Vancouver has planted 100 different types of trees
            for a total of <span className="bold"> 149,031</span>. This site displays the top five types for each area.
          </h4>
          <div className="intro__instructions-container">
            {/*--- One line ---*/}
            <h4 className="intro__instructions-paragraph">
              Click chart columns for a yearly breakdown. Select trees to display from the map legend. Export data from the chart top right dropdown. 
            </h4>
            {/*--- Separate lines ---*/}
            {/* <div className="intro__instructions-container">
              <h4 className="intro__instructions-paragraph">
                Click chart columns for a yearly breakdown.
              </h4>
              <h4 className="intro__instructions-paragraph">
                Select trees to display from the map legend.
              </h4>
              <h4 className="intro__instructions-paragraph">
                Export data from the chart top right dropdown. 
              </h4>
            </div> */}
        </div>
        </div>
      </section>
    )
  }
}

















