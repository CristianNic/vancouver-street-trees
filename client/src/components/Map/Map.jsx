import React, { Component } from 'react';
import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
// import { URL_CUSTOM_OUTDOORS_DARKER } from '../../utils/MapboxToken';
import MapControls from '../MapControls/MapControls';
import { colors } from '../../utils/Variables'
const URL_CUSTOM_OUTDOORS_DARKER = process.env.REACT_APP_URL_CUSTOM_OUTDOORS_DARKER; 

class Map extends Component {

  state = {
    activeTrees: [true, true, true, true, true],
    cityCenter: [49.263454262907864, -123.12702707005086],    // Broadway and Oak
    radius: 1.5
  }

  handleClickActiveTree = (e, value) => {
    if (value.id === 0) {
      const toggleTrees = this.state.activeTrees
      toggleTrees[0] = !this.state.activeTrees[0]
      this.setState({
        activeTrees: toggleTrees
      })
    } else if (value.id === 1) {
      const toggleTrees = this.state.activeTrees
      toggleTrees[1] = !this.state.activeTrees[1]
      this.setState({
        activeTrees: toggleTrees
      })
    } else if (value.id === 2) {
      const toggleTrees = this.state.activeTrees
      toggleTrees[2] = !this.state.activeTrees[2]
      this.setState({
        activeTrees: toggleTrees
      })
    } else if (value.id === 3) {
      const toggleTrees = this.state.activeTrees
      toggleTrees[3] = !this.state.activeTrees[3]
      this.setState({
        activeTrees: toggleTrees
      })
    } else if (value.id === 4) {
      const toggleTrees = this.state.activeTrees
      toggleTrees[4] = !this.state.activeTrees[4]
      this.setState({
        activeTrees: toggleTrees
      })
    }
  }

  render() {
    
    const { top5TreeNamesLowerCaps, geom0, geom1, geom2, geom3, geom4 } = this.props
    const { activeTrees, radius } = this.state

    return (
      <section className="map">
        <MapControls
          activeTrees={activeTrees}
          handleClickActiveTree={this.handleClickActiveTree}
          top5TreeNamesLowerCaps={top5TreeNamesLowerCaps}
        />
        <MapContainer
          center={this.state.cityCenter}
          zoom={12}
        >
          <TileLayer
            url={`${URL_CUSTOM_OUTDOORS_DARKER}`}
            attribution="© <a href='http://osm.org/copyright'>OpenStreetMap</a> &nbsp; &VerticalSeparator; &nbsp; <a href='https://www.mapbox.com/about/maps/'>Mapbox</a>"
          />
          {activeTrees[0] === false ? (<div></div>) :
            (geom0.map(latLng => (                        
              <CircleMarker
                key={`${latLng[1].toString()}-${latLng[0].toString()}`}
                className={this.props.top5TreeData.map(name => name.name)[0]}
                center={[
                  latLng[1],
                  latLng[0]]}
                radius={radius}
                opacity={1}
                color={colors[0]}
                stroke={false}
                fill={true}
                fillOpacity={1}
              />
            ))
          )}  
          {activeTrees[1] === false ? (<div></div>) :
            (geom1.map(latLng => (
              <CircleMarker
                key={`${latLng[1].toString()}-${latLng[0].toString()}`}
                className={this.props.top5TreeData.map(name => name.name)[1]}
                center={[
                  latLng[1],
                  latLng[0]]}
                radius={radius}
                opacity={1}
                color={colors[1]}
                stroke={false}
                fill={true}
                fillOpacity={1}
              />
            ))
          )}
          {activeTrees[2] === false ? (<div></div>) :  
            (geom2.map(latLng => (   
              <CircleMarker
                key={`${latLng[1].toString()}-${latLng[0].toString()}`}
                className={this.props.top5TreeData.map(name => name.name)[2]}
                center={[   
                  latLng[1],
                  latLng[0]]} 
                radius={radius}
                opacity={1}
                color={colors[2]}
                stroke={false}
                fill={true}
                fillOpacity={1}
              />
            ))
          )}
          {activeTrees[3] === false ? (<div></div>) :
            (geom3.map(latLng => (   
              <CircleMarker
                key={`${latLng[1].toString()}-${latLng[0].toString()}`}
                className={this.props.top5TreeData.map(name => name.name)[3]}
                center={[    
                  latLng[1],
                  latLng[0]]} 
                radius={radius}
                opacity={1}
                color={colors[3]}
                stroke={false}
                fill={true}
                fillOpacity={1}
              />
            ))
          )}
          {activeTrees[4] === false ? (<div></div>) :
            (geom4.map(latLng => ( 
              <CircleMarker
                key={`${latLng[1].toString()}-${latLng[0].toString()}`}
                className={this.props.top5TreeData.map(name => name.name)[4]}
                center={[    
                  latLng[1],
                  latLng[0]]} 
                radius={radius}
                opacity={1}
                color={colors[4]}
                stroke={false}
                fill={true}
                fillOpacity={1}
              />
            ))
          )}   
        </MapContainer>
      </section>
    );
  }
}

export default Map;
