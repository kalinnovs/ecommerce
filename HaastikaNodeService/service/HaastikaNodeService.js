console.log("Hello world!");
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


app.listen(3003);

var setHeader = function(req, res){
    var responseSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": true
    };
    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
    res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);
};

app.get('/addToCart/:partNumber', function(req, res, next){
    setHeader(req, res);
    if(req.params.partNumber){
        req.session.products = req.session.products || {};
        var partNumber = req.params.partNumber;

        if(req.session.products[partNumber] ) {
            req.session.products[partNumber]  = req.session.products[partNumber]  + 1;
        } else {
            req.session.products[partNumber] = 1;
        }
        res.json( req.session.products );
    }
});

app.get('/updateCart', function(req, res, next){
    setHeader(req, res);
    req.session.products[req.query.partNumber] = parseInt(req.query.value);
    res.json( req.session.products );
});

app.get('/removeCart', function(req, res, next){
    setHeader(req, res);
    delete req.session.products[req.query.partNumber];
    res.json( req.session.products );
});

app.get('/cart', function(req, res, next){
    var sql;
    var cartItems = [];
    var item;

    setHeader(req, res);

    if(req.session.products){
        var cartDao = require('../dao/cartDao');
        cartDao.getCartItem(req, res, _.keys(req.session.products), function(res, cartItems){
            res.json({"lineItems" : cartItems});
        });

    } else {
        res.end('Empty Cart.');
        // emailProvider.emailProvider.sendMail();
    }
    
});