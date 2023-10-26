module.exports = function(weatherMain) {
  switch(weatherMain) {
    case 'Clear':
      return `\u{00002600}`
    case 'Clouds':
      return '\u{000026C5}'
    case 'Fog':
      return `\u{0001F300}`
    case 'Mist':
      return `\u{0001F300}`
    case 'Smoke':
      return `\u{0001F300}`
    case 'Haze':
      return `\u{0001F300}`
    case 'Dust':
      return `\u{0001F300}`
    case 'Sand':
      return `\u{0001F300}`
    case 'Dust':
      return `\u{0001F300}`
    case 'Ash':
      return `\u{0001F300}`
    case 'Squall':
      return `\u{0001F300}`
    case 'Tornado':
      return `\u{0001F300}`
    case 'Drizzle':
      return `\u{0001F4A7}`
    case 'Rain':
      return `\u{00002614}`
    case 'Snow':
      return `\u{00002744}`
    case 'Thunderstorm':
      return `\u{0001F4A8}`
    default:
      return ``;
  }
}