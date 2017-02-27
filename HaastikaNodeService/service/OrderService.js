var express = require('express');
var app = express();
var session = require('express-session');
var db = require("../dataaccess/DataConnection");
var _ = require("underscore");
var emailProvider = require('../emailService/emailService');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

// app.listen(3002);

app.get('/haastikaOrder', function(req, res, next){
	var sql;
	var cartItems = [];
	var item;

	var orderDao = require('../dao/orderDao');
	orderDao.getOrders().then(function(result){
		res.end(result); 
	});
	
});

