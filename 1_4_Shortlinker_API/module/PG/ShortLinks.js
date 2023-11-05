let { nanoid } = require('nanoid');

module.exports = class ShortLinks {
  async getLinkByShort(shortLink) {
    return new Promise((resolve, reject) => {
      globalThis.pool.query(`SELECT * FROM short_links WHERE short_link = $1`, [shortLink], (err, result) => {
        if(err) reject(err);
        else resolve(result.rows[0]); 
      })
    })
  } 
  async getLinkByOrig(origLink) {
    return new Promise((resolve, reject) => {
      globalThis.pool.query(`SELECT * FROM short_links WHERE original_link = $1`, [origLink], (err, result) => {
        if(err) reject(err);
        else resolve(result.rows[0]);
      })
    })
  }
  async addLink(origLink) {
    let newLink = nanoid(process.env.LINK_SIZE);
    return new Promise((resolve, reject) => {
      globalThis.pool.query(`INSERT INTO short_links (original_link, short_link) VALUES ($1, $2)`, [origLink, newLink], async (err, result) => {
        if(!err) resolve(newLink);
        else if(err.constraint === 'orig_link_unique') {
          let linkObj = await this.getLinkByOrig(origLink);
          resolve(linkObj.short_link);
        } 
        else if(err.constraint === 'short_link_unique') resolve(await this.addLink(origLink));
        else reject(err);
      })
    })
  }
}