'use strict';

angular.module('eCommerce')
    .controller('CartCtrl', ['$scope', '$http', '$rootScope', '$timeout', '$state', '$location', 'CartService', 'UserService', 'PRODUCTDATA_URL', 'user', 'cartData', 
        function($scope, $http, $rootScope, $timeout, $state, $location, CartService, UserService, PRODUCTDATA_URL, user, cartData) {
        var cart = this,
        responseData,
        loginStatus = user,
        cartData = cartData;   
        
        $scope.location = $location;
        
        // Currency Update
        if(window.userDetails && window.userDetails.preferredCurrency) {
            $rootScope.$broadcast("updateCurrency", window.userDetails.preferredCurrency);    
        }
        
        // Read Cart Array and pass to URL
        var cartItems = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [];
        if(cartData.loggedUser !== null) {
            $scope.cartItems = cartData.cartList;
        } else {
            responseData = cartData.cartList;
            $.each(responseData, function(key, val) {
                val["quantity"] = cartItems[key].quantity;
            });
            $scope.cartItems = (responseData) ? responseData : [];
        }
        
        // Cart Configuration
        $scope.cartConfig = {
            "shippingCost": 0,
            "tax": 6.5,
            "discount": 0
        };

        // Injecting Math into cart scope
        $scope.Math = window.Math;
        // $(document).on("keyup", ".item-quantity", this.getTotal);
        
        $scope.getTotal = function() {
            $scope.currency = $("body").attr("data-currency").toUpperCase();
            var cartItems = this.cartItems,
            totalCost = 0,
            priceObj,
            currency = $("body").attr("data-currency");
            $(cartItems).each(function(i, j) {
                priceObj = j.productPriceOptions.filter(function(key, val) {
                    return key.currencyCode === currency.toUpperCase();
                });
                totalCost += priceObj[0].price * j.quantity;
            });
            return totalCost;
        };

        $scope.subTotal = function() {
            var totalCost = this.getTotal(),
                cartConfig = this.cartConfig,
                totalCostToUser,
                priceObj,
                currency = $("body").attr("data-currency");

            totalCostToUser = totalCost - cartConfig.shippingCost + (cartConfig.tax/100*totalCost);
            return totalCostToUser;
        };

        $scope.calculateTax = function() {
            var totalCost = this.getTotal(),
                cartConfig = this.cartConfig,
                currency = $("body").attr("data-currency");
            return (cartConfig.tax/100*totalCost);
        };
        
        $scope.manipulatePrice = function(event, call) {
            var index = $(event.currentTarget).parents(".item").attr("data-index"),
                lineItemId = $(event.currentTarget).attr("data-lineId"),
                items = this.cartItems,
                currentSize = parseInt(items[index].quantity),
                currency = $("body").attr("data-currency"),
                updateObj = {},
                finalQuantity = 0;
                if(call === "substract" && currentSize === 1) {
                    // Broadcast cart update to mini cart
                    $rootScope.$broadcast("updateFlash", {"alertType": "danger", "message": "You cannot reduce the cart size below zero. Please remove the item."});
                    return;
                }
            
            items[index].quantity = (call === "add") ? currentSize+=1 : currentSize-=1;
            
            var itemsArray = [];
            $.each(items, function(i, item) {
                var priceObj = item.productPriceOptions.filter(function(key, val) {
                    return key.currencyCode === currency.toUpperCase();
                });
                var obj = {
                    "partNumber": item.productPartNumber || item.productId,
                    "quantity": item.quantity || 1
                }
                itemsArray.push(obj);
                finalQuantity += item.quantity || 1;
            });
            if(lineItemId === "") {
                window.sessionStorage.setItem('itemsArray', JSON.stringify(itemsArray));
                // Broadcast cart update to mini cart
                $rootScope.$broadcast("updateMiniCartCount", finalQuantity);
            } else {
                window.sessionStorage.setItem('cartLength', ((call === "add") ? parseInt(window.sessionStorage.cartLength || 0)+1 : parseInt(window.sessionStorage.cartLength || 0)-1));
                updateObj["lineItemId"] = items[index].lineItemId;
                updateObj["quantity"] = items[index].quantity;
                var promise = CartService.updateCartLineItem(updateObj);
                promise.then(function(response) {
                    // Broadcast cart update to mini cart
                    $rootScope.$broadcast("updateMiniCartCount", finalQuantity);
                });     
            }
            this.getTotal();
            // Broadcast cart update to mini cart
            $rootScope.$broadcast("updateMiniCart", this.cartItems);

        };

        $scope.removeItem = function(event) {
            var lineItemId = $(event.currentTarget).attr("data-lineId"),
                currency = $("body").attr("data-currency"),
                qty = this.$parent.cartItems.filter(function(i, j) {
                    return (i.lineItemId === parseInt(lineItemId));
                });
            var count = (window.sessionStorage.cartLength) ? parseInt(window.sessionStorage.cartLength) : 0;
            if(lineItemId === "") {
                // Removes the line item from Local storage when there is no logged in User.
                var currentIndex = $(event.currentTarget).parents("li").data("index"),
                    cartItems = (typeof(this.cartItems) === "string") ? JSON.parse(this.cartItems) : this.cartItems;
                // Reduce the cartLength counter
                window.sessionStorage.setItem('cartLength', count - cartItems[currentIndex].quantity);

                cartItems.splice(currentIndex,1);

                // Remove the item from storage
                var itemList = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [];
                itemList.splice(currentIndex,1);

                var itemsArray = [];
                $.each(itemList, function(i, item) {
                    var obj = {
                        "partNumber": item.productPartNumber || item.productId || item.partNumber,
                        "quantity": item.quantity || 1
                    }
                    itemsArray.push(obj);
                });
                
                // insert the new stringified array into LocalStorage
                window.sessionStorage.setItem('itemsArray', JSON.stringify(itemsArray));

                // If cart goes empty page redirects to home page
                if(itemList.length === 0) {
                    $timeout(function() {
                        $state.go("home");
                    }, 1000, false);
                }
                
                // Broadcast cart update to mini cart
                $rootScope.$broadcast("updateMiniCartCount");

            } else {
                // window.sessionStorage.setItem('cartLength', parseInt(window.sessionStorage.cartLength) - qty[0].quantity);
                var part, itemList, newList, itemsArray, quantity, count;
                count = (window.sessionStorage.cartLength) ? parseInt(window.sessionStorage.cartLength) : 0;
                part = $(event.currentTarget).data("part");
                quantity = $(event.currentTarget).data("quantity");

                window.sessionStorage.setItem('cartLength', count - parseInt(quantity));

                itemList = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [];
                // Remove the item from storage
                newList = itemList.filter(function(i) {
                    return i.partNumber != part;
                });

                itemsArray = [];
                $.each(newList, function(i, item) {
                    var obj = {
                        "partNumber": item.productPartNumber || item.productId || item.partNumber,
                        "quantity": item.quantity || 1
                    }
                    itemsArray.push(obj);
                });
                
                // insert the new stringified array into LocalStorage
                window.sessionStorage.setItem('itemsArray', JSON.stringify(itemsArray));

                // Removes the line item from data base when there is a logged in User.
                $http({
                    method: 'GET',
                    url: PRODUCTDATA_URL + '/cart/remove/'+ parseInt(lineItemId)
                }).then(function successCallback(response) {
                    // Broadcast cart update to mini cart
                    $rootScope.$broadcast("updateMiniCartCount");
                    $state.go($state.current, {}, {reload: true});
                }, function errorCallback(response) {
                    console.log("Error in saving.");
                });
            }

            event.preventDefault();
        };
        
        $scope.saveCart = function(event) {
            // Read Cart Array and pass to URL
            var cartArray = this.cartItems;
            $.each(cartArray, function(key, val) {
                val["unitPrice"] = val["productPriceOptions"][0].price;
            });
            var objectToSerialize={'lineItems':cartArray, "currencyId":1};
            
            $http({
                method: 'POST',
                url: PRODUCTDATA_URL + '/cart/save',
                data: JSON.stringify(objectToSerialize),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function successCallback(response) {
                debugger;
            }, function errorCallback(response) {
                console.log("Error in saving.");
            }); 
        };
        
        $scope.updateCart = function(event) {
            // Read Cart Array and pass to URL
            var cartArray = this.cartItems;
            $.each(cartArray, function(key, val) {
                val["unitPrice"] = val["productPriceOptions"][0].price;
            });
            var objectToSerialize={'lineItems':cartArray, "currencyId":1};
            
            $http({
                method: 'POST',
                url: PRODUCTDATA_URL + '/cart/update',
                data: JSON.stringify(objectToSerialize),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function successCallback(response) {
                // Broadcast cart update to mini cart
                $rootScope.$broadcast("updateMiniCartCount");
                
            }, function errorCallback(response) {
                console.log("Error in saving.");
            }); 
        };

        $scope.gotoCheckout = function() {
            // this.location.path("/checkout/login");
            //Validate Checkout URI states with actual submitted data
            // If the state is not cleared then it will redirect to beginning of the state.
            var validateURI = false, validStateIndex = 0,
            steps = JSON.parse(window.sessionStorage.checkoutState);

            function validateStateUrls() {
                for(var keys in steps) {
                  if(steps[keys]) {
                      validStateIndex++;
                      validateURI = true; 
                  } else {
                      validateURI = false;
                  }
                }  
            };
              
            // Checkout redirection on zero cart items
            var cartlength = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray).length : (window.sessionStorage.cartLength) ? parseInt(JSON.parse(window.sessionStorage.cartLength)) : 0;
            if(cartlength === 0) {
              $location.path('/');
            } else {
                validStateIndex = 0;
                validateStateUrls();
                $location.path('/checkout/'+ Object.keys(steps)[validStateIndex]);
            }

        };

        $scope.openOverlay = function() {
            $(".screen").show();
            $(".cartMailForm").css("top", $(document).scrollTop() + ($(window).height() - $(".cartMailForm").outerHeight()) / 2)
        };
        
        $scope.closeOverlay = function() {
            $(".cartMailForm").css("top", "-400px");
            setTimeout(function(){
                $(".screen").hide();
            }, 400);
        };
        
        $(document).on('data-currency-changed', $.proxy(function(e, key){
            $(".item-quantity").trigger("keyup");
        }, $scope));

        $timeout(function() {
            window.dataLoaded = true;
            $(".progress").hide();
        }, 1000, false);
    }]
);
