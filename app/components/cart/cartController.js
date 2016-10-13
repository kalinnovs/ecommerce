'use strict';

angular.module('eCommerce')
    .controller('CartCtrl', function($scope, $http, $rootScope, $timeout, CartService, UserService, SERVICE_URL, PRODUCTDATA_URL) {
        var cart = this,
        responseData;
        
        // Read Cart Array and pass to URL
        var cartArray = (window.sessionStorage.cartParts) ? JSON.parse(window.sessionStorage.cartParts) : [];
        var cartItems = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [];
        
        var objectToSerialize={'products':cartArray};
        debugger;
        $http({
            method: 'GET',
            url: 'http://haastika.com/:3003/cart' // PRODUCTDATA_URL + '/cart/products', //'http://localhost:3002/cart'
            // data: JSON.stringify(objectToSerialize)
        }).then(function successCallback(response) {
            responseData = response.data;
            $.each(responseData, function(key, val) {
                val["quantity"] = cartItems[key].quantity;
            });
            $rootScope.navigation = (window.sessionStorage.navigation) ? JSON.parse(window.sessionStorage.navigation) : [];
            $scope.cartItems = (responseData) ? responseData : [];
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
            $scope.currency = $("body").attr("data-currency");
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
        
        $scope.manipulatePrice = function(event) {
            window.sessionStorage.setItem('itemsArray', JSON.stringify(this.cartItems));
            var items = this.cartItems;
            var currency = $("body").attr("data-currency");
            window.itemsArray = [];
            $.each(items, function(i, item) {
                var priceObj = item.productPriceOptions.filter(function(key, val) {
                    return key.currencyCode === currency.toUpperCase();
                });
                var obj = {
                    "partNumber": item.productPartNumber || item.productId,
                    "price": item.productPrice || priceObj[0].price,
                    "priceArray": item.productPriceOptions || item.priceOptions,
                    "image": item.productImage.thumbImagePath,
                    "quantity": item.quantity || 1
                }
                window.itemsArray.push(obj);
            });
            this.getTotal();
            
            // Broadcast cart update to mini cart
            $rootScope.$broadcast("updateMiniCart", this.cartItems);
        };

        $scope.removeItem = function(event) {
            var currentIndex = $(event.currentTarget).parents("li").data("index"),
                cartItems = (typeof(this.cartItems) === "string") ? JSON.parse(this.cartItems) : this.cartItems;
            cartItems.splice(currentIndex,1);

            // Remove the item from storage
            var itemList = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [];
            var itemStore = (window.sessionStorage.cartParts) ? JSON.parse(window.sessionStorage.cartParts) : [];
            itemList.splice(currentIndex,1);
            itemStore.splice(currentIndex,1);
            // insert the new stringified array into LocalStorage
            window.sessionStorage.itemsArray = JSON.stringify(itemList);
            window.sessionStorage.cartParts = JSON.stringify(itemStore);
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
        
        $scope.sendCartToMail = function(event) {
            var self = this;
            // Open Overlay
            this.openOverlay();
            // Read Cart Array and pass to URL
            var cartArray = this.cartItems;
            var selectedCurrency = cartArray[0].productPriceOptions.filter(function(i, j) {
                return (i.currencyCode === $("body").data("currency").toUpperCase());
            });
            
            $.each(cartArray, function(key, val) {
                val["unitPrice"] = selectedCurrency[0].price;
            });
            var objectToSerialize={'lineItems':cartArray, "currencyId":selectedCurrency[0].currencyId};
            objectToSerialize["total"] = this.getTotal();
            objectToSerialize["shipping"] = this.cartConfig.shippingCost;
            objectToSerialize["tax"] = this.cartConfig.tax;
            objectToSerialize["discount"] = this.cartConfig.discount;
            objectToSerialize["subTotal"] = this.subTotal();
            objectToSerialize["firstName"] = $(event.target).find("input[name=firstName]").val();
            objectToSerialize["lastName"] = $(event.target).find("input[name=lastName]").val();
            objectToSerialize["emailId"] = $(event.target).find("input[name=Email]").val();
            objectToSerialize["contactNo"] = $(event.target).find("input[name=Mobile]").val();
            
            $http({
                method: 'POST',
                url: PRODUCTDATA_URL + '/cart/reserve',
                data: JSON.stringify(objectToSerialize),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function successCallback(response) {
                self.closeOverlay();
            }, function errorCallback(response) {
                console.log("Error in saving.");
            }); 
            
            setTimeout(function(){
                self.closeOverlay();
                window.sessionStorage.clear();
                window.location.href = "/";
            }, 1300);
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
                debugger;
                
            }, function errorCallback(response) {
                console.log("Error in saving.");
            }); 
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
        

        $timeout(function() {
            window.dataLoaded = true;
            $(".progress").hide();
        }, 1000, false);
    }
);
