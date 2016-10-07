console.log('Connect MySql');
var mysql = require("mysql");

// var pool = mysql.createPool({
//   host: "127.0.0.1",
//   user: "root",
//   password: "Deepankar",
//   database: "local_schema"
// });

var pool = mysql.createPool({
  host: "127.0.0.1",
  user: "haastika",
  password: "#HaastikaDB",
  database: "haastikalivedb"
});

exports.query = function(query, done) {
	console.log("Inside connect calling.");
    pool.getConnection(function(err, connection){
        if(err){
            console.log("Error in connection.");
            return;
        }
		connection.query(query, done);
        connection.release();
	});
    
};
