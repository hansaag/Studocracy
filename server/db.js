const Pool = require("pg").Pool;

const pool = new Pool({
    user: "test",
    password: "hh3ff5dD@linux",
    host: "localhost",
    port: 5432,
    database: "studocracy",
});

module.exports = pool;
