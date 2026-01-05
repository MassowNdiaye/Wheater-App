const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/search/geocode/v6/forward?q=" +
    encodeURIComponent(address) +
    "&access_token=pk.eyJ1IjoiZWxoYWRqaTMwIiwiYSI6ImNtanlwdml6bzRwcmczZ3B2NjM0bjR2MTcifQ.VX0o89r7I02wy8B2SbRXXw&limit=1"; //encodeURIComponent return a string for the URL and make sure space become %20 avoid to broke link

  //{url: url} inside {} defines an object with a url property. - json:true automatically parse the response
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to access geolocalizzation service", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].properties.coordinates.latitude,
        longitude: response.body.features[0].properties.coordinates.longitude,
        location: response.body.features[0].properties.full_address,
      });
    }
  });
};

module.exports = geocode; //This allow me to call it from other files.
