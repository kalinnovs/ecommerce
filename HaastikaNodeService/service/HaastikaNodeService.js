console.log("Hello world!");
var express = require('express');
var app = express();
var session = require('express-session');
var db = require("../dataaccess/DataConnection");
var _ = require("underscore");

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));


app.listen(3002);

app.get('/', function(req, res, next){
    req.session.count = (req.session.count || 0) + 1;
    res.end( "Seen ... " + req.session.count);
});

app.get('/addToCart/:productPartNumber', function(req, res, next){
    if(req.params.productPartNumber){
        req.session.products = req.session.products || [];
        req.session.products.push(req.params.productPartNumber);
    }
    res.end( "Product ... " + req.session.products);
});

app.get('/cart', function(req, res, next){
    var sql;
    var cartItems = [];
    var item;

    if(req.session.products){
        sql = "Select p.PRODUCT_ID, p.PRODUCT_NAME, pc.CURRENCY_ID, cu.CURRENCY_CODE, pc.PRICE, pm.BASE_IMAGE_PATH from product as p " + 
              "join product_price as pc on p.product_id = pc.product_id " +
              "join product_image as pm on p.product_id = pm.product_id " +
              "join currency as cu on cu.currency_id = pc.CURRENCY_ID " +
              "where p.product_id IN (" + req.session.products + ")";

        // sql = sql + " WHERE PRODUCT_ID IN (" + req.session.products + ")";

        db.query(sql, function(err, rows){
            if(err) throw err;
            productIdList = _.uniq(_.pluck(rows, 'PRODUCT_ID'));
            
            _.each(productIdList, function(ob, i){
                var ss = _.findWhere(rows, {'PRODUCT_ID': ob});
                var bb = _.unique(_.pluck(_.where(rows, {
                            'PRODUCT_ID': ob
                          }), "CURRENCY_ID"));

                item = {};
                item.productId = ss.PRODUCT_ID;
                item.productName = ss.PRODUCT_NAME;
                item.productImage = { "baseImagePath" : _.unique(_.pluck(_.where(rows, {'PRODUCT_ID': ob}), "BASE_IMAGE_PATH"))[0]};
                item.productPriceOptions = [];

                _.each(bb, function(e){
                    priceOptions = _.where(rows, {
                        'PRODUCT_ID': ob,
                        'CURRENCY_ID': e
                      })[0];

                    item.productPriceOptions.push({
                        "currencyId" : priceOptions.CURRENCY_ID,
                        "currencyCode" : priceOptions.CURRENCY_CODE,
                        "price": priceOptions.PRICE
                    });
                });
                
                cartItems.push(item);
            });
            
            // console.log(rows);

            res.json({"lineItems" : cartItems});
        });
    } else {
      res.end('Empty Cart.');
    }
    
});