import React, { Component } from 'react'

class Header extends Component {
  
  capitlizeFirstLetter(sentence) {
    const words = sentence.split(" ");
    const caps = words.map(word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
    const newSentence = caps.join(" ");
    return newSentence
  }

  render() {

    return (
      <header className="header">
        <div className="header__wrapper">
          <h1 className="header__title">City of Vancouver Trees</h1>
          <h1 className="header__neighbourhood">
            Neighbourhood: {this.capitlizeFirstLetter(this.props.neighbourhood)}</h1>
        </div>
      </header>
    )
  }
}

export default Header;