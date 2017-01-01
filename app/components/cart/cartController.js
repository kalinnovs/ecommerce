'use strict';

angular.module('eCommerce')
    .controller('CartCtrl', function($scope, $http, $rootScope, $timeout, $state, $location, CartService, UserService, SERVICE_URL, PRODUCTDATA_URL, user) {
        var cart = this,
        responseData,
        loginStatus = user;   
        // Scoping Navigation
        $rootScope.navigation = (window.sessionStorage.navigation) ? JSON.parse(window.sessionStorage.navigation) : [];

        $scope.location = $location;
        
        // Read Cart Array and pass to URL
        var cartArray,
            cartItems = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [],
            computedURL =  PRODUCTDATA_URL + ((loginStatus.success === true) ? '/cart/viewCart' : "/cart/products"),
            objectToSerialize;
            cartArray = cartItems.map(function(i, j) {
                        return (i.partNumber || i.productId);
                    });
            objectToSerialize={'products':cartArray};

        $http({
            method: 'POST',
            url: computedURL,
            data: JSON.stringify(objectToSerialize)
        }).then(function successCallback(response) {
            if(response.data.cartList) {
                $scope.cartItems = response.data.cartList;
            } else {
                responseData = response.data;
                $.each(responseData, function(key, val) {
                    val["quantity"] = cartItems[key].quantity;
                });
                $scope.cartItems = (responseData) ? responseData : [];
            }
            
        }, function errorCallback(response) {
            console.log("Error in saving.");
        });
        
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
                items = this.cartItems,
                currentSize = parseInt(items[index].quantity),
                currency = $("body").attr("data-currency"),
                updateObj = {};
                if(call === "substract" && currentSize === 1) {
                    // Broadcast cart update to mini cart
                    $rootScope.$broadcast("updateFlash", {"alertType": "danger", "message": "You cannot reduce the cart size below zero. Please remove the item."});
                    return;
                }
            items[index].quantity = (call === "add") ? currentSize+=1 : currentSize-=1;
            
            window.sessionStorage.setItem('itemsArray', JSON.stringify(this.cartItems));
            window.itemsArray = [];
            $.each(items, function(i, item) {
                var priceObj = item.productPriceOptions.filter(function(key, val) {
                    return key.currencyCode === currency.toUpperCase();
                });
                var obj = {
                    "partNumber": item.productPartNumber || item.productId,
                    "quantity": item.quantity || 1
                }
                window.itemsArray.push(obj);
            });
            this.getTotal();
            
            updateObj["lineItemId"] = items[index].lineItemId;
            updateObj["quantity"] = items[index].quantity;
            var promise = CartService.updateCartLineItem(updateObj);
            promise.then(function(response) {
                // Broadcast cart update to mini cart
                $rootScope.$broadcast("updateMiniCartCount");
            }); 
            // Broadcast cart update to mini cart
            $rootScope.$broadcast("updateMiniCart", this.cartItems);

        };

        $scope.removeItem = function(event) {
            // debugger;
            var lineItemId = $(event.currentTarget).attr("data-lineId");
            if(lineItemId === "") {
                // Removes the line item from Local storage when there is no logged in User.
                var currentIndex = $(event.currentTarget).parents("li").data("index"),
                    cartItems = (typeof(this.cartItems) === "string") ? JSON.parse(this.cartItems) : this.cartItems;
                cartItems.splice(currentIndex,1);

                // Remove the item from storage
                var itemList = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [];
                itemList.splice(currentIndex,1);
                // itemStore.splice(currentIndex,1);
                // insert the new stringified array into LocalStorage
                window.sessionStorage.setItem('itemsArray', JSON.stringify(itemList));

                // If cart goes empty page redirects to home page
                if(itemList.length === 0) {
                    $timeout(function() {
                        $state.go("home");
                    }, 1000, false);
                }
                
                // Broadcast cart update to mini cart
                $rootScope.$broadcast("updateMiniCartCount");

            } else {
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
                url: SERVICE_URL + '/cart/save',
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
                url: SERVICE_URL + '/cart/update',
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
            this.location.path("/checkout/login");
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
    }
);
