module.exports = function(weatherObj) {
  let time = new Date(weatherObj.dt);
  time = `${time.getHours()}:${time.getMinutes()}`;
  let temperature = (weatherObj.main.temp - 273).toFixed(1);
  let feelsLike = (weatherObj.main.feels_like - 273).toFixed(1);
  return `${time} - ${weatherObj.weather[0].main}\nTemperature: ${temperature}°\nFeels like: ${feelsLike}°\nWind speed: ${weatherObj.wind.speed}`;
} 