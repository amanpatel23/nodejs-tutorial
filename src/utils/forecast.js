const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=0e46a94628f43cf39fa7b2c1f0d627ff&query=' +
    encodeURIComponent(latitude) +
    ',' +
    encodeURIComponent(longitude);

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services', undefined);
    } else if (body.location === undefined) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      const {
        temperature,
        wind_speed: windSpeed,
        humidity,
      } = body.current;
      callback(undefined, {
        temperature,
        windSpeed,
        humidity,
      });
    }
  });
};

module.exports = forecast;
