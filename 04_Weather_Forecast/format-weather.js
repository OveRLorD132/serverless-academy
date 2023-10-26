let getWeatherEmoji = require('./get-weather-emoji');

module.exports = function(weatherObj) {
  let time = new Date(weatherObj.dt_txt);
  time = time.toLocaleString('en-US', { hour: 'numeric', hour12: true});
  let temperature = (weatherObj.main.temp - 273).toFixed(1);
  return `${time}: ${temperature}°, ${getWeatherEmoji(weatherObj.weather[0].main)} ${weatherObj.weather[0].main}`;
}