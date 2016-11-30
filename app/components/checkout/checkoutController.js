'use strict';

angular.module('eCommerce')
    .controller('CheckoutCtrl', ['$scope', '$http', '$rootScope', '$timeout', '$controller', '$state', 'CheckoutService', 'checkoutStorage', 'SERVICE_URL', 'PRODUCTDATA_URL', function($scope, $http, $rootScope, $timeout, $controller, $state, CheckoutService, checkoutStorage, SERVICE_URL, PRODUCTDATA_URL) {
        var checkout = this,
        responseData;

        $scope.state = $state;

        // Retrieves data from storage
        $scope.co = checkoutStorage.getData('storage');

        // Steps Config
        $scope.eligibleForDiscount = true;

        // Cart Configuration
        $scope.checkoutCartConfig = {
            "shippingCost": 0,
            "tax": 6.5,
            "discount": 15
        };

        // Steps store
        $scope.steps = {
            "login": true,
            "address": false,
            "order": false,
            "payment": false
        };


        // $scope.checkoutCartConfig.discount = ($scope.co && $scope.co.order) ? $scope.co.order.discountPrice : 0;

        // Validation Config
        var coValidationConfig = {
            "loginForm": {
                "firstName": ["required"],
                "password": ["required"]
            },
            "guestLoginForm": {
                "emailId": ["required"]
            },
            "addressForm": {
                "name":["required"],
                "houseNumber":["required"],
                "street":["required"],
                "landmark":["required"],
                "phone":["required"],
                "pin":["required"],
                "city":["required"],
                "state":["required"],
                "emailId":["required"],
                "cell":["required"]
            },
            "orderForm": {
                "promo": ["required"]
            }
        };

        // Injecting Math into cart scope
        $scope.Math = window.Math;

        window.dataLoaded = true;
        scrollTo($state.current.name);

        function getCartDetails() {
            // Read Cart Array and pass to URL
            var cartArray = (window.sessionStorage.cartParts) ? JSON.parse(window.sessionStorage.cartParts) : [];
            var cartItems = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [];
            
            var objectToSerialize={'products':cartArray};
            
            $http({
                method: 'POST',
                url: PRODUCTDATA_URL + '/cart/products',
                data: JSON.stringify(objectToSerialize)
            }).then(function successCallback(response) {
                responseData = response.data;
                $.each(responseData, function(key, val) {
                    val["quantity"] = cartItems[key].quantity;
                });
                $scope.orderedItems = (responseData) ? responseData : [];
                // Stores the steps completed on page load
                checkoutStorage.setData($scope.steps, 'steps');
            }, function errorCallback(response) {
                console.log("Error in saving.");
            });    
        }

        // Get details from cart
        getCartDetails();
        


        $scope.getCityState = function(event) {
            var self = this,
            val = $(event.target).val(),
            url = 'http://maps.googleapis.com/maps/api/geocode/json?address=94086&sensor=true';

            // $http.jsonp(url)
            //     .success(function(data){
            //         debugger;
            //         console.log(data.found);
            //     });
        };

        $scope.redeemCouponCode = function(event) {
            var thisVal = $(event.currentTarget).siblings("input").val().toLowerCase();
            var updatedView = JSON.parse(window.sessionStorage.storage).order && JSON.parse(window.sessionStorage.storage).order.couponcode;
            if(updatedView && (thisVal === updatedView)) {
                // updates view with confirmation code
                $(".coupon-code").height(0);
                $(".coupon-applied").height(24);
                return;
            }

            // Validate Coupon Code and proceed with below code.
            this.eligibleForDiscount = true;

            this.co.order.discountPrice = this.calculateDiscount();
            // Saves coupon code to storage
            updateStorage(this.co);

            // updates view with confirmation code
            $(".coupon-code").height(0);
            $(".coupon-applied").height(24);
            this.subTotal();
        };
        
        $scope.proceedTo = function(event, step) {
            debugger;
            // updates storage with reference to 'checkout' object from view
            updateStorage(this.co);
            // Updates path
            $(event.currentTarget).parents(".container.form-views").animate({height: 0 }, 400, function() {
                $state.go("checkout."+step);
            });
        };

        $scope.skipToPage = function(event, step) {
            // updates storage with reference to 'checkout' object from view
            updateStorage(this.co);
            // Updates path
            $(".form-views.active").animate({height: 0 }, 400, function() {
                $state.go("checkout."+step);
            });
        };

        function updateStorage(obj) {
            checkoutStorage.setData(obj, 'storage');
        };

        $scope.getTotal = function() {
            $scope.currency = $("body").attr("data-currency").toUpperCase();
            var cartItems = this.orderedItems,
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

        $scope.removeItem = function(event) {
            var currentIndex = $(event.currentTarget).parents("li").data("index"),
                cartItems = (typeof(this.orderedItems) === "string") ? JSON.parse(this.orderedItems) : this.orderedItems;
            cartItems.splice(currentIndex,1);

            // Remove the item from storage
            var itemList = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [];
            var itemStore = (window.sessionStorage.cartParts) ? JSON.parse(window.sessionStorage.cartParts) : [];
            itemList.splice(currentIndex,1);
            itemStore.splice(currentIndex,1);
            // insert the new stringified array into sessionStorage
            window.sessionStorage.setItem('itemsArray', JSON.stringify(itemList));
            window.sessionStorage.setItem('cartParts', JSON.stringify(itemStore));
            window.miniCartStorage = itemStore;
            
            // Broadcast cart update to mini cart
            $rootScope.$broadcast("updateMiniCartCount");

            // If cart goes empty page redirects to home page
            if(window.miniCartStorage.length === 0) {
                $timeout(function() {
                    $state.go("home");
                }, 1000, false);
            }
            event.preventDefault();
        };
        

        $scope.subTotal = function() {
            var totalCost = this.getTotal(),
                checkoutCartConfig = this.checkoutCartConfig,
                totalCostToUser,
                priceObj,
                currency = $("body").attr("data-currency");

            totalCostToUser = totalCost - checkoutCartConfig.shippingCost + (checkoutCartConfig.tax/100*totalCost) - checkoutCartConfig.discount;
            return totalCostToUser;
        };

        $scope.calculateTax = function() {
            var totalCost = this.getTotal(),
                checkoutCartConfig = this.checkoutCartConfig,
                currency = $("body").attr("data-currency");
            return (checkoutCartConfig.tax/100*totalCost);
        };

        $scope.calculateDiscount = function() {
            var totalCost = this.getTotal(),
                checkoutCartConfig = this.checkoutCartConfig,
                currency = $("body").attr("data-currency");
            return (this.eligibleForDiscount) ? (checkoutCartConfig.discount/100*totalCost) : 0;
        };

        $scope.addCouponCode = function(event) {
            $(".coupon-applied").height(0);
            $(event.currentTarget.parentNode).next().height(28);
        };

        
        // Detect On DOM loaded change
        $scope.$on('$viewContentLoaded', function(){
            //Here your view content is fully loaded !!
            $(".checkout .section").each(function(i, j) {
                if(!$(this).find(".container").hasClass("active")) {
                    $(this).find(".container").remove();
                }
            });
        });

        function scrollTo(page) {
            var loginTop = $(".login-details").position().top;
            var addressTop = $(".address-details").position().top - $(".login-container").height();
            var orderTop = $(".order-summary").position().top - $(".address-container").height() - $(".login-container").height();
            var paymentTop = $(".payment").position().top - $(".address-container").height() - $(".login-container").height() - $(".order-container").height()

            $timeout(function() {
                switch(page) {
                    case "checkout.login":
                        $('html, body').animate({scrollTop: loginTop - 30}, 10);
                        break;
                    case "checkout.address":
                        $('html, body').animate({scrollTop: addressTop - 30}, 10);
                        break;
                    case "checkout.order":
                        $('html, body').animate({scrollTop: orderTop - 30}, 10);
                        break;
                    case "checkout.payments":
                        $('html, body').animate({scrollTop: paymentTop - 30}, 10);
                        break;
                    default:
                        // default code block
                }
            }, 1, false); 
        };

        // Send mail to raise a request
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
            objectToSerialize["shipping"] = this.checkoutCartConfig.shippingCost;
            objectToSerialize["tax"] = this.checkoutCartConfig.tax;
            objectToSerialize["discount"] = this.checkoutCartConfig.discount;
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
                debugger;
            }, function errorCallback(response) {
                console.log("Error in saving.");
            }); 
            
        
            setTimeout(function(){
                self.closeOverlay();
                setTimeout(function(){
                    $(".screen").show();
                    $(".cartMailFormSuccess").css("top", $(document).scrollTop() + ($(window).height() - $(".cartMailFormSuccess").outerHeight()) / 2);
                }, 600);
                setTimeout(function(){
                    $(".screen").hide();
                    $(".cartMailFormSuccess").css("top", "-200px");
                }, 200);
                setTimeout(function(){
                    window.sessionStorage.clear();
                    window.location.href = "/";
                }, 2000);
            }, 1400);
            
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


        // Submits the form
        $scope.submit = function() {
            if ($scope.user_form.$valid) {
                // Submit as normal
            } else {
                // don't submit ;-)
            }
        };

        // function to submit the form after all validation has occurred            
        $scope.updateCheckoutStep = function(event, from, to, $state) {
            var self = this;
            this.steps[to] = true;
            // Stores the steps completed on page load
            checkoutStorage.setData(this.steps, 'steps');

            // updates storage with reference to 'checkout' object from view
            updateStorage(this.co, 'storage');
            // Updates path
            $(event.currentTarget).parents(".container.form-views").animate({height: 0 }, 400, function() {
                // $state.go("checkout."+step);
                self.state.go("checkout."+to);
            });
            
        };

        $(document).on('data-currency-changed', $.proxy(function(e, key){
            $scope.subTotal();
        }, $scope));

    }]
);

angular.module('eCommerce')
    .factory("checkoutStorage", function($window, $rootScope) {
        angular.element($window).on('storage', function(event) {
            if (event.key === 'storage') {
                $rootScope.$apply();
            }
        });
        return {
            setData: function(val, into) {
                $window.sessionStorage && $window.sessionStorage.setItem(into, JSON.stringify(val));
                return this;
            },
            getData: function(val) {
                return $window.sessionStorage && JSON.parse($window.sessionStorage.getItem(val));
            }
        };
    }
);
