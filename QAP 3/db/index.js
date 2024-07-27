// db/index.js
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: 'postgresql://postgres:Keyin2021@localhost:5432/mydatabase'
});

module.exports = {
    query: (text, params) => pool.query(text, params)
};
