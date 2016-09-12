'use strict';

angular.module('eCommerce')
    .controller('CartCtrl', function($scope, $rootScope, $timeout, CartService, UserService, SERVICE_URL, BASE_URI) {
        var cart = this;

        var data = $.param({
            json: JSON.stringify({
                products: [{"productId": 2}]
            })
        });

        UserService.Put('http://haastika.com/HaastikaDataService/cart/', data)
            .then(function(data) {
                debugger;
            })
            .catch(function(error) {
                //
            })
            .finally(function() {
                //
            })
            // debugger;

        // Adding cartItem array to the cart scope
        var cartArray = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [];
        $.each(cartArray, function(key, val) {
            val["quantity"] = 1;
        });
        $scope.cartItems = cartArray;

        // Cart Configuration
        $scope.cartConfig = {
            "shippingCost": 0,
            "tax": 6.5,
            "discount": 0
        };

        // Injecting Math into cart scope
        $scope.Math = window.Math;

        $(document).on("keyup", ".item-quantity", this.getTotal);

        $scope.getTotal = function() {
            $scope.currency = $("body").attr("data-currency");
            var cartItems = this.cartItems,
            totalCost = 0,
            priceObj,
            currency = $("body").attr("data-currency");
            $(cartItems).each(function(i, j) {
                priceObj = j.priceArray.filter(function(key, val) {
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
            // $scope.cartItems = JSON.stringify(itemList);
            event.preventDefault();
        };

        $timeout(function() {
            window.dataLoaded = true;
            $(".progress").hide();
        }, 1000, false);
    }
);
