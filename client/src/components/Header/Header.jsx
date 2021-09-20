import React, { Component } from 'react'

class Header extends Component {
  
  // capitalizeFirstLetter(sentence) {
  //   const words = sentence.split(" ");
  //   const caps = words.map(word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
  //   const newSentence = caps.join(" ");
  //   return newSentence
  // }

  render() {

    return (
      <header className="header">
        <div className="header__wrapper">
          <h1 className="header__title">City of Vancouver Trees</h1>
          <h1 className="header__neighbourhood">
            Neighbourhood: <br/>
            <span className="header__highlight-neighbourhood">
               {/* {this.props.capitalizeFirstLetter(this.props.neighbourhoodLowerCaps)} */}
               {this.props.neighbourhood}
            </span>
          </h1>
        </div>
      </header>
    )
  }
}

export default Header;