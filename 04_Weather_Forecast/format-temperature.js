const formatWeather = require("./format-weather");

module.exports = function(weather) {
  let temperatureList = [];
  for(let i = 1; i < 25; i++) {
    let time = new Date(weather.hourly.time[i]);
    time = time.toLocaleString('en-US', { hour: 'numeric', hour12: true});
    let temperature = + weather.hourly.temperature_2m[i];
    temperature = temperature.toFixed(1);
    temperatureList[i - 1] = {temperature, time, weather: formatWeather(weather.hourly.weathercode[i]), code: weather.hourly.weathercode[i]}
  }
  return temperatureList;
}