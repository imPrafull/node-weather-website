const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=b8c54ac4f22b58676b5acb90ea1be6b9&query=${latitude},${longitude}&units=m`;

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error){
      callback('Unable to find location!', undefined)
    } else {
      const current = body.current;
      callback(undefined, `${current.weather_descriptions}. It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out. The humidity is ${current.humidity}%.`);
    }
  });
};

module.exports = forecast;