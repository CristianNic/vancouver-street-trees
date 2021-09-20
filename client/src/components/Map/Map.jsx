import React, { Component } from "react";
import { MapContainer, TileLayer } from "react-leaflet"; //  Marker, Popup,
import { URL_CUSTOM_OUTDOORS_DARKER } from '../../utils/MapboxToken';
import 'leaflet/dist/leaflet.css';

class Map extends Component {

  render() {

    return (
      <section className="map">
        <div>
          <h1 className="map__name">Map</h1>
        </div>
        
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
        </MapContainer>

      </section>
    );
  }
}

export default Map;