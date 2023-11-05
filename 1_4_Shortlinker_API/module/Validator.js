let axios = require('axios');

module.exports = class Validator {
  async validateLink(link) {
    if(link.length > 400) throw new Error('Link is too long');
    try {
      let response = await axios.head(link);
      if(response.status < 200 && response.status >= 300) throw new Error('Invalid link');
    } catch {
      throw new Error('Invalid link');
    }
  }
}