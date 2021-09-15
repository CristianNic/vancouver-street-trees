// Tiles are free from Mapbox.com and styled in Mapbox Studio
// Use raster tiles for this project https://docs.mapbox.com/api/maps/static-tiles/

// To get up and running without designing tiles, use the Open Street Map Tiles that come with Leaflet
// Simple make sure the Open Street Map tile layer is uncomented out in ArtMap.jsx

{
	/* <TileLayer
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
/>; */
}

// Here is how the Mapbox token is composed:

export const USERNAME = "your-mapbox-username";
export const ACCESS_TOKEN = "you-mapbox-access-token";
export const STYLE_OUTDOORS = "your-custome-style";
export const STYLE_OUTDOORS_DARKER = "your-custome-style";

// Example URLs:

export const URL_CUSTOM_OUTDOORS = `https://api.mapbox.com/styles/v1/${USERNAME}/${STYLE_OUTDOORS}/tiles/256/{z}/{x}/{y}@2x?access_token=${ACCESS_TOKEN}`;
export const URL_CUSTOM_OUTDOORS_DARKER = `https://api.mapbox.com/styles/v1/${USERNAME}/${STYLE_OUTDOORS_DARKER}/tiles/256/{z}/{x}/{y}@2x?access_token=${ACCESS_TOKEN}`;
