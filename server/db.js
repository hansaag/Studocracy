const Pool = require("pg").Pool;

const pool = new Pool({
  user: "hans",
  password: "test1234",
  host: "localhost",
  port: 5432,
  database: "studocracy",
});

module.exports = pool;
