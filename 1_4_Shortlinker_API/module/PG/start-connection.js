module.exports =  function startConnection() {
  let Pool = require('pg').Pool;
  let pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'password',
    database: 'short_linker'
  })
  pool.connect().then(() => {
    globalThis.pool = pool;
  }).catch((err) => console.log(err))
}

