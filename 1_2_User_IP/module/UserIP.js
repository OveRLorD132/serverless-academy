let fs = require('fs/promises');

let path = require('path');

module.exports = class UserIP {
  constructor() {
    fs.readFile(path.join(__dirname, '..', "./ip-table/data.CSV"), "utf-8").then((lines) => {
      lines = new Set(lines.split("\r\n"));
      let countries = new Set();
      lines.forEach((elem) => {
        if (!elem) return;
        let infoArr = elem.split(",");
        let start = infoArr[0];
        start = start.replace(/"/g, "");
        let end = infoArr[1];
        end = end.replace(/"/g, "");
        elem = {
          start,
          end,
          country: infoArr[3],
        };
        countries.add(elem);
      });
      this.countries = countries;
    });
  }
  ipToNum(ip) {
    return ip.split(".").reduce((int, v) => int * 256 + +v);
  }
  getIpCountry(ip) {
    ip = this.ipToNum(ip);
    for(let country of this.countries) {
      if(ip > +country.start && ip < +country.end) return country.country;
    }
  }
};
