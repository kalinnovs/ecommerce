'use strict';

angular.module('eCommerce')
    .directive('addToCart', function($http, $rootScope, PRODUCTDATA_URL, AuthenticationService) {
        var def = {
            restrict: 'EA',
            scope: {
                'partNumber': '&',
                'itemClick': '&'
            },
            transclude: true,
            template: "<div class='add-to-cart'><button class='fa fa-cart-plus' data-part='item' ng-transclude></button></div>",
            link: function(scope, element, attrs) {
                function toggleInBasket(event, elem) {
                    var item = scope.partNumber();
                    var obj = {
                        "partNumber": item.productPartNumber || item.productId,
                        "quantity": item.quantity || 1
                    }

                    var addItem = function(item) {

                        // debugger;
                        var oldItems = JSON.parse(sessionStorage.getItem('itemsArray')) || [];
                        var repeatedItem = oldItems.filter(function(val, index) {
                            return (val.partNumber === item.partNumber);
                        });
                        if(repeatedItem.length > 0) {
                            // repeatedItem[0]["quantity"] += 1
                            oldItems.map(function(val, index) {
                                (val.partNumber === repeatedItem[0]["partNumber"]) ? val.quantity += 1 : '';
                            });
                            window.sessionStorage.setItem('itemsArray', JSON.stringify(oldItems));
                            
                            // Broadcast cart update to mini cart
                            $rootScope.$broadcast("updateMiniCartCount");
                            return true;
                        }
                        oldItems.push(item);

                        // window.miniCartStorage.push(item.partNumber);
                        // window.sessionStorage.setItem('cartParts', JSON.stringify(window.miniCartStorage));
                        window.sessionStorage.setItem('itemsArray', JSON.stringify(oldItems));

                        window.itemsArray.push(item);

                        // Broadcast cart update to mini cart
                        $rootScope.$broadcast("updateMiniCartCount");
                        event.preventDefault();
                    };

                    addItem(obj);

                    // Add to Cart for Logged In user
                    $http({
                        method: 'POST',
                        url: PRODUCTDATA_URL+ '/cart/addToCart',
                        data: JSON.stringify({"productId": parseInt(obj.partNumber.substr(4))})
                    }).then(function successCallback(response) {
                        // console.log(response);
                        // Broadcast cart update to mini cart
                        $rootScope.$broadcast("updateFlash", {"alertType": "success", "message": "Item added to cart successfully !!"});
                    }, function errorCallback(response) {
                        console.log("Error in saving.");
                    });
                    

                    // window.localStorage.miniCart.items.push(obj);
                    event.preventDefault();
                    return false;
                };

                element.find("button").on("click", function(event) {
                    var currentTarget = event.currentTarget;
                    if(this === currentTarget) {
                        toggleInBasket(event, currentTarget);
                    }
                    event.preventDefault();
                });
            }
        };
        return def;
    });
