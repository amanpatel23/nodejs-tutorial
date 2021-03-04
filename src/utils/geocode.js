const request = require('request');

const geoCode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoiYW1hbnBhdGVsMjMiLCJhIjoiY2toZzNybDg4MGkyZTJxbnc4YTA3eTloOSJ9.ebEbw9lgBZXu-9nE33UFNQ&limit=1';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      const {center, place_name: location} = body.features[0];
      callback(undefined, {
        latitude: center[1],
        longitude: center[0],
        location
      });
    }
  });
};

module.exports = geoCode;
