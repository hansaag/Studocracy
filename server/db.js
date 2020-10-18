const Pool = require("pg").Pool;

const pool = new Pool({
  user: "hansi",
  password: "hh3ff5dD@linux",
  host: "localhost",
  port: 5432,
  database: "studocracy",
});

module.exports = pool;
