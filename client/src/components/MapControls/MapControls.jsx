import React, { Component } from "react";
import { Button } from "semantic-ui-react";

class MapControls extends Component {

  render() {

    const { activeTrees, handleClickActiveTree, top5TreeNamesLowerCaps } = this.props

    return (
      <section className="map-controls">
        <div className="map-controls__container">
          <div className="map-controls__space">
            <Button
              className={`button${0}`}
              id={0}
              active={activeTrees[0]}
              onClick={handleClickActiveTree}
            >
            </Button>
            <h4 className="map-controls__label">
              {top5TreeNamesLowerCaps[0]}
            </h4>
          </div> 
          <div className="map-controls__space">
            <Button
              className={`button${1}`}
              id={1}
              active={activeTrees[1]}
              onClick={handleClickActiveTree}
            >
            </Button>
            <h4 className="map-controls__label">
              {top5TreeNamesLowerCaps[1]}
            </h4>
          </div>
          <div className="map-controls__space">
            <Button
              className={`button${2}`}
              id={2}
              active={activeTrees[2]}
              onClick={handleClickActiveTree}
            >
            </Button>
            <h4 className="map-controls__label">
              {top5TreeNamesLowerCaps[2]}
            </h4>
          </div>
          <div className="map-controls__space">
              <Button
                className={`button${3}`}
                id={3}
                active={activeTrees[3]}
                onClick={handleClickActiveTree}
              >
              </Button>
            <h4 className="map-controls__label">
              {top5TreeNamesLowerCaps[3]}
            </h4>
          </div>
          <div className="map-controls__space">
            <Button
              className={`button${4}`}
              id={4}
              active={activeTrees[4]}
              onClick={handleClickActiveTree}
            >
            </Button>
            <h4 className="map-controls__label">
              {top5TreeNamesLowerCaps[4]}
            </h4>
          </div>          
        </div>
      </section>
    );
  }
}

export default MapControls;
