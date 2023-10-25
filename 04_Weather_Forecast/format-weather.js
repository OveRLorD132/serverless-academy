module.exports = function(code) {
  switch(code) {
    case 0:
      return `Clear`;
    case 1:
      return `Mainly clear`;
    case 2:
      return `Partly cloudy`;
    case 3:
      return `Overcast`;
    case 45:
      return `Fog`;
    case 48:
      return `Depositing rime fog`;
    case 51:
      return `Light drizzle`;
    case 53:
      return `Moderate drizzle`;
    case 55:
      return `Intensive drizzle`;
    case 56:
      return `Freezing drizzle`;
    case 57: 
      return `Intensive freezing drizzle`;
    case 61:
      return `Slight rain`;
    case 63:
      return `Moderate rain`;
    case 65:
      return `Heavy rain`;
    case 66:
      return `Freezing rain`;
    case 67:
      return `Heavy freezing rain`;
    case 71:
      return `Slight snow`;
    case 73:
      return `Moderate snow`;
    case 75:
      return `Heavy snow`;
    case 77:
      return `Snow grains`;
    case 80:
      return `Rain showers`;
    case 81:
      return `Moderate rain showers`;
    case 82:
      return `Heavy rain showers`;
    case 85:
      return `Snow showers`;
    case 86:
      return `Heavy snow showers`;
    case 95:
      return `Thunderstorm`;
    case 96:
      return `Thunderstorm with slight hail`;
    case 99:
      return `Thunderstorm with heavy hail`;
    default:
      return ``;
  }
}