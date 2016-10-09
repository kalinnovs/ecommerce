'use strict';

angular.module('eCommerce')
    .directive('addToCart', function() {
        var def = {
            restrict: 'EA',
            scope: {
                'partNumber': '&',
                'itemClick': '&'
            },
            template: "<div class='add-to-cart'><button class='fa fa-cart-plus' ng-click='toggleInBasket($event, item);'></button></div>",
            link: function(scope, element, attrs) {
                var scope = scope,
                    attrs = attrs;

                scope.storeData = function(event) {
                    scope.itemClick({
                        'item': this.partNumber(),
                        'event': event
                    });
                };
                
                scope.toggleInBasket = function(event) {
                    var item = this.partNumber();
                    var obj = {
                        "partNumber": item.productPartNumber,
                        "description": item.productDescription,
                        "price": item.productPrice,
                        "priceArray": item.productPriceOptions,
                        "image": item.productImageGallery
                    }

                    var addItem = function(item) {
                        var oldItems = JSON.parse(sessionStorage.getItem('itemsArray')) || [];
                        var repeatedItem = oldItems.filter(function(val, index) {
                            return (val.partNumber === item.partNumber);
                        });
                        if(repeatedItem.length > 0) {
                            alert("Item already added to cart !");
                            return true;
                        }
                        oldItems.push(item);

                        window.miniCartStorage.push(item.partNumber);
                        window.sessionStorage.setItem('cartParts', JSON.stringify(window.miniCartStorage));
                        window.sessionStorage.setItem('itemsArray', JSON.stringify(oldItems));

                        window.itemsArray.push(item);
                    };

                    addItem(obj);

                    // window.localStorage.miniCart.items.push(obj);
                    event.preventDefault();
                    return false;
                };
            }
        };
        return def;
    });
