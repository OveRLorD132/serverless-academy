let bcrypt = require('bcrypt');

module.exports = class Users {
  getUser(email) {
    return new Promise((resolve, reject) => {
      globalThis.pool.query(`SELECT * FROM users WHERE email = $1`, [email], (err, result) => {
        if(err) reject(err);
        else resolve(result.rows[0]);
      })
    })
  }
  async addUser(email, password) {
    password = await bcrypt.hash(password, 12);
    return new Promise((resolve, reject) => {
      globalThis.pool.query(`INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *`, [email, password], (err, result) => {
        if(err) reject(err);
        else resolve(result.rows[0]);
      })
    })
  }
}