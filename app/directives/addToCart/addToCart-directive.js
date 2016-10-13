'use strict';

angular.module('eCommerce')
    .directive('addToCart', ['$http', function($http) {
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
// console.log($http);
                scope.storeData = function(event) {
                    scope.itemClick({
                        'item': this.partNumber(),
                        'event': event
                    });
                };
                
                scope.toggleInBasket = function(event) {
                    var item = this.partNumber();
                    var obj = {
                        "partNumber": item.productPartNumber || item.productId,
                        // "description": item.productDescription,
                        "price": item.productPrice || 0,
                        "priceArray": item.productPriceOptions || item.priceOptions,
                        "image": item.productImageGallery[0].thumbImagePath,
                        "quantity": item.quantity || 1
                    }

                    var addItem = function(item) {
                        var oldItems = JSON.parse(sessionStorage.getItem('itemsArray')) || [];
                        var repeatedItem = oldItems.filter(function(val, index) {
                            return (val.partNumber === item.partNumber);
                        });
                        if(repeatedItem.length > 0) {
                            $(".screen").show();
                            $(".addToCartError").css("top", $(document).scrollTop() + ($(window).height() - $(".addToCartError").outerHeight()) / 2);
                            return true;
                        }
                        oldItems.push(item);

                        window.miniCartStorage.push(item.partNumber);
                        window.sessionStorage.setItem('cartParts', JSON.stringify(window.miniCartStorage));
                        window.sessionStorage.setItem('itemsArray', JSON.stringify(oldItems));

                        window.itemsArray.push(item);
                    };
                    
                    var closeOverlay = function() {
                        $(".addToCartError").css("top", "-200px");
                        setTimeout(function(){
                            $(".screen").hide();
                        }, 400);
                    };
                    console.log($http);

                    addItem(obj);

                    $http({
                        method: 'GET',
                        url: 'http://localhost:3003/addToCart/' + obj.partNumber.substr(4)
                    }).then(function successCallback(response) {
                        console.log(response);
                    }, function errorCallback(response) {
                        console.log("Error in saving.");
                    });

                    // window.localStorage.miniCart.items.push(obj);
                    event.preventDefault();
                    return false;
                };
            }
        };
        return def;
    }]);
