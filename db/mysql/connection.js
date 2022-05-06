const mysql = require('mysql');
const dbConfig = require("../config/mysql.config");

const connection = mysql.createPool({
  // host: "localhost",
  // user: "root",
  // password: "",
  // multipleStatements: true,
  // database : 'my_db'
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB

});
connection.on('connection', async function (connection) {
  await console.log('DB Connection established');

  connection.on('error', function (err) {
    console.error(new Date(), 'MySQL error', err.code);
  });
  connection.on('close', function (err) {
    console.error(new Date(), 'MySQL close', err);
  });

});
module.exports = connection;

