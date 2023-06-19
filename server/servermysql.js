const mysql = require('mysql');

const mysql2 = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql.123",
  database:"jobifydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

