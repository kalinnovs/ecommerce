var db = require("../dataaccess/DataConnection");
var _ = require("underscore");

// module.exports = {
// 	getOrders: function getOrders(orderId) {
// 		return new Promise(function(resolve, reject) {
// 			var sql = 'select order_id, web_order_no, email_id, order_date, '+
// 						'order_status, track_id, total from haastika_order';

// 			db.query(sql, function(err, rows){
// 				return resolve(rows);
// 			});

// 		});
// 	}
// }

exports.list = function(req,res){
	var sql = 'select order_id, web_order_no, email_id, order_date, '+
					'order_status, track_id, total from haastika_order';

	if(req.params.won){
		sql = sql + " where web_order_no = '" + req.params.won + "'";
		console.log(req.params.won);
	}

	db.query(sql, function(err, rows){
		res.json(rows);
	});
}