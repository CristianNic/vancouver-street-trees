# Vancouver Trees

What are the trees in your area?

Client developed with React, Axios, Leaflet, Mapbox, and Plotly.

Data provided from the City of Vancouver Open Data Portal.

## Usage

- Install modules inside client `npm install`

- Map tiles will require a Mapbox token which can be obtained after [signing up](https://www.mapbox.com/). Alternatively the OpenStreetMap tile layer can be uncommented in components/Map.jsx. See instructions inside `client/src/utils/MapboxToken-Sample.js` on how a Mapbox token is composed.

  Sample token:

  ```js
  URL_CUSTOM_OUTDOORS = `https://api.mapbox.com/styles/v1/${USERNAME}/${STYLE_OUTDOORS}/tiles/256/{z}/{x}/{y}@2x?access_token=${ACCESS_TOKEN}`;
  ```

  After having decided on a tile layer rename `MapboxToken-Sample.js` to `MapboxToken.js` and it will be kept local by `.gitignore`

- Inside client and server folders `npm start` Run and enjoy!