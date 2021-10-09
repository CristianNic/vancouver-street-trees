import React, { Component } from "react";
import {
  MapContainer, TileLayer, SVGOverlay, Marker, CircleMarker
} from "react-leaflet";
import { URL_CUSTOM_OUTDOORS_DARKER } from '../../utils/MapboxToken';
// import 'leaflet/dist/leaflet.css';
import { legoMan } from '../../utils/MapIcons';

// Vancouver: lat 49.246292 / lon -123.116226

class Map extends Component {

  render() {

    console.log("==> MAP =>", this.props.geoms)

    const bounds = [[49.28, -123.12],
      [49.00, -123.00]]
    
    const position = [49.246292, -123.116226]
    

    return (
      <section className="map">
        <MapContainer center={[49.2780, -123.1153]} zoom={12}>
          {/* <TileLayer    
            // Use OpenStreetMap tiles if Mapbox account was not created. See utils/MapboxToken-Sample.js
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          /> */}
          <TileLayer
            url={`${URL_CUSTOM_OUTDOORS_DARKER}`}
            attribution="© <a href='http://osm.org/copyright'>OpenStreetMap</a> <a href='https://www.mapbox.com/about/maps/'>Mapbox</a>"
          />
          {/* https://react-leaflet.js.org/docs/example-svg-overlay/ */}
          <SVGOverlay attributes={{ stroke: 'red' }} bounds={bounds}>
            <circle r="3" cx="10" cy="10" fill="red" />
          </SVGOverlay>
          <Marker
            position={position}
            icon={legoMan}
          />
          <CircleMarker
            center={[49.28, -123.12]}
            radius={10}
            opacity={1}
            color={'#9999ff'}
            stroke={false}
            fill={true}
            fillOpacity={1}
          />
        </MapContainer>

      </section>
    );
  }
}

export default Map;


// -- Graph Colours -- 
// Light Blue:  rgb(124, 181, 236) /  websafe #ccff66  / hex #b5ec7c
// Brown:       rgb(67, 67, 72)    /  websafe #333333  / hex #434348
// Purple:      rgb(128, 133, 233) /  websafe #9999ff  / hex #8085e9