let path = require('path');

let fs = require('fs/promises');

module.exports = class JSONServe {
  constructor() {
    this.path = path.resolve(__dirname, '..', 'JSON_Storage');
    console.log(this.path);
  }
  async createIfNotExists(path) {
    try {
      await fs.access(path);
    } catch(err) {
      await fs.mkdir(path);
    }
  }
  async addFile(pathArr, data) {
    let currentDir = this.path;
    for(let elem of pathArr) {
      currentDir = path.resolve(currentDir, elem);
      if(pathArr.indexOf(elem) === pathArr.length - 1) {
        if(!/\w+.json$/.test(elem)) throw new Error('Invalid path');
        try {
          await fs.writeFile(currentDir, JSON.stringify(data), 'utf-8');
        } catch(err) {
          console.log(err);
        }

      }
      else await this.createIfNotExists(currentDir);
    }
  }
  async getJSON(pathArr) {
    let currentDir = this.path;
    for(let elem of pathArr) {
      currentDir = path.resolve(currentDir, elem);
      if(pathArr.indexOf(elem) === pathArr.length - 1) {
        return await fs.readFile(currentDir, 'utf-8');
      }
    }
  } 
}