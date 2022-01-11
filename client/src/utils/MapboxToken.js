require("dotenv").config();

const USERNAME = process.env.REACT_APP_USERNAME;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
const STYLE_OUTDOORS_DARKER = process.env.REACT_APP_STYLE_OUTDOORS_DARKER;

export const URL_CUSTOM_OUTDOORS_DARKER = `https://api.mapbox.com/styles/v1/${USERNAME}/${STYLE_OUTDOORS_DARKER}/tiles/256/{z}/{x}/{y}@2x?access_token=${ACCESS_TOKEN}`;
