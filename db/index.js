const { Pool } = require('pg');
const dotenv       = require ( 'dotenv' ).config();

// create a DB Pool to connect to RDS doppio DB
// All database connections in the application are made using this pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
/*const pool = new Pool({
  user: 'postgres',
  host: 'visage.cjiuqnk8x2su.eu-west-3.rds.amazonaws.com',
  database: 'visage',
  password: '89hjdb-XBJBLm',
  port: 5432,
});*/
/*pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res) 
  pool.end() 
})*/

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}
