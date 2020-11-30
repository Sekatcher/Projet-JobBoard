// connect To Database
var mysql = require('mysql');
var dbconfig = require("./database")
var connection = mysql.createConnection(dbconfig.connection);

connection.connect(function (err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
});

connection.query('USE ' + dbconfig.database);


module.exports.conn = connection