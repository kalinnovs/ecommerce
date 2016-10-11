var db = require("../dataaccess/DataConnection");
var _ = require("underscore");

module.exports = {
    getCartItem : function getCartItem(req, res, products, callBack) {
        var sql;
        var cartItems = [];
        var item;
        
        sql = "Select p.PRODUCT_ID, p.PRODUCT_NAME, pc.CURRENCY_ID, cu.CURRENCY_CODE, pc.PRICE, pm.BASE_IMAGE_PATH from product as p " + 
              "join product_price as pc on p.product_id = pc.product_id " +
              "join product_image as pm on p.product_id = pm.product_id " +
              "join currency as cu on cu.currency_id = pc.CURRENCY_ID " +
              "where p.product_id in (" + products + ") " ;

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
                item.quantity = req.session.products[ss.PRODUCT_ID];
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

            callBack(res, cartItems);
        });
    }

}

