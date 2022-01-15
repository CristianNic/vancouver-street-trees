import React, { Component } from "react"

class Header extends Component {

  render() {

    return (
      <header className="header">
        {/* <div className="header__wrapper">
          <h1 className="header__title">Top Five Trees Planted by the City of Vancouver</h1>
        </div> */}
        <div className="header__wrapper">
          {/* <h1 className="header__title">Top Five Trees Planted by the City of Vancouver</h1> */}
          {/* <h1 className="header__title">What are your neighbourhood trees? </h1> */}
          <h1 className="header__title">What trees are in your neighbourhood?</h1>
          {/* <h1 className="header__title">by the City of Vancouver</h1> */}
        </div>
      </header>
    )
  }
}

export default Header;

// {/* <h1 className="header__title">City of Vancouver Top 5 Trees Planted</h1> */}
// {/* <h1 className="header__title">Top 5 Trees Planted in each Neighbourhood by the City of Vancouver</h1> */}
// {/* <h1 className="header__title">Top 5 Trees Planted</h1> */}
// {/* <h1 className="header__title">by the City of Vancouver</h1> */}