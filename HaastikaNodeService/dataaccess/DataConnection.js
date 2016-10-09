console.log('Connect MySql');
var mysql = require("mysql");

var pool = mysql.createPool({
  host: "127.0.0.1",
  user: "haastika",
  password: "#HaastikaDB",
  database: "haastikalivedb"
});

exports.query = function() {
	var queryArgs = Array.prototype.slice.call(arguments);
    pool.getConnection(function(err, connection){
        if(err){
            console.log("Error in connection.");
            return;
        }
		connection.query.apply(connection, queryArgs);
        connection.release();
	});
    
};
