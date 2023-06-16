var express = require('express');
var app = express();
const sql = require('mssql');
  // config for your database
    var config = {
        user: 'FJOLLA\fjoll',
        password: '',
        server: 'FJOLLA\\MSSQLSERVER01', 
        database: 'jobifydb',
             port: 1433,

        options: {
    trustedConnection: true,
            encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,

  },
    };
   
app.get('/', function (req, res) {
  
    var conn = new sql.ConnectionPool(config);
    conn.connect().then(function () {
        var request = new sql.Request(conn);
        request.query("SELECT * FROM empTable").then(function (recordSet) {
            console.log(recordSet);
            conn.close();
        }).catch(function (err) {
            console.log(err);
            conn.close();
        });
    }).catch(function (err) {
        console.log(err);
    });
});



var server = app.listen(5000, function () {
    console.log('Server is running..');
});