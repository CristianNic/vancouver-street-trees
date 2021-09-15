import React, { Component } from "react";

const sourceUrl = "https://opendata.vancouver.ca/explore/dataset/street-trees/information/?disjunctive.species_name&disjunctive.common_name&disjunctive.height_range_id"

class Footer extends Component {

  render() {

    return (
        <footer className="footer">
          <a href={sourceUrl}>
            <h3 className="footer__data-source">
              <span className="black bold">Find out more: </span>
              <span className="black underline"> City of Vancouver Open Data Portal, Street Trees</span>
            </h3>
          </a>
        </footer>
    );
  }
}

export default Footer;

// TODO: Make with love & My info w/ Link to Githhub & LinkedIn? 