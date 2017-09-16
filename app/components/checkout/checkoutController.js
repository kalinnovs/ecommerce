'use strict';

angular.module('eCommerce')
    .controller('CheckoutCtrl', ['$scope', '$http', '$rootScope', '$q', '$timeout', '$controller', '$state', 'checkoutStorage', 'CheckoutService', 'PRODUCTDATA_URL', '$location', 'cartItems', 'getAddress', 'getLoginStatus', 'viewCart', 'AuthenticationService', 'Facebook', 'Google',  
        function($scope, $http, $rootScope, $q, $timeout, $controller, $state, checkoutStorage, CheckoutService, PRODUCTDATA_URL, $location, cartItems, getAddress, getLoginStatus, viewCart, AuthenticationService, Facebook, Google) {
        var checkout = this,
        responseData,
        self = $scope;
        
        $scope.state = $state;
        $scope.location = $location;
        $scope.loginService = AuthenticationService;
        window.storageFactory = checkoutStorage;

        // Retrieves data from storage
        $scope.co = checkoutStorage.getData('storage');

        // Currency Update
        if(window.userDetails && window.userDetails.preferredCurrency) {
            $rootScope.$broadcast("updateCurrency", window.userDetails.preferredCurrency);
        }

        // Cart Configuration
        $scope.checkoutCartConfig = {
            "shippingCost": 0,
            "tax": 3,
            "discount": 15
        };

        // Singleton Variables to restrict repeated service calls
        window.singleCall = (window.singleCall === undefined) ? { cartDetails: true, authenticateUser: false, authenticateUserAddress: false, authenticateUserOrder: false, authenticateUserPayment: false } : window.singleCall;

        // Checks for pre available address and updates address view selections
        if(getAddress && getAddress.length > 0) {
            $scope.hasAddress = true;
            $scope.addressList = getAddress;
        } else {
            $scope.hasAddress = false;
        }

        // Selets the default step on Page load
        // and stores the cart items for order page.
        if(viewCart) {
            var responseData,
                cartItems = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [];
            if(getLoginStatus && getLoginStatus.success === true) {
                if(viewCart.cartList.length === 0) {
                    
                }
                $scope.cartItems = viewCart.cartList;
            } else {
                responseData = viewCart.cartList;
                $.each(responseData, function(key, val) {
                    val["quantity"] = val.quantity || 1;
                });
                $scope.cartItems = (responseData) ? responseData : [];
            }
            // if(getLoginStatus && getLoginStatus.success === true) {
            //     $scope.cartItems = viewCart.cartList;
            // } else {
            //     $scope.cartItems = cartItems;
            // }
            // $scope.cartItems = viewCart.cartList;
            // Stores the steps completed on page load
            checkoutStorage.setData($scope.steps, 'steps');
        }


        // Injecting Math into cart scope
        $scope.Math = window.Math;

        window.dataLoaded = true;
        scrollTo($state.current.name);

        $scope.getCityState = function(event) {
            var self = this,
            val = $(event.target).val(),
            url = 'http://maps.googleapis.com/maps/api/geocode/json?address=94086&sensor=true';
        };

        $scope.updateAddressToStorage = function(event, id) {
            $(event.currentTarget).siblings().removeClass("active");
            if($scope.co && $scope.co.address) {
                $(event.currentTarget).addClass("active");
                $scope.co.user["addressId"] = id;
            } else {
                if(!$scope.co) {
                    $scope.co = {};
                    $scope.co["user"] = {};
                }
                $scope.co["address"] = {};
                $scope.co.user["addressId"] = id;
            }
            updateStorage($scope.co);
        };

        $scope.toggleAddressForm = function(event) {
            this.hasAddress = ($scope.hasAddress) ? false : true;
        };

        $scope.selectAddress = function(event) {
            // $(event.currentTarget).parents(".section").removeClass("selected");
            if(this.addressList) {
                var obj = this.addressList.filter(function(val) {
                    return val.addressId === self.co.user.addressId;
                });
                self.co.address = obj[0];
            }
            if($(".address-wraper > ul li.active").length === 0) {
                // Broadcast cart update to mini cart
                $rootScope.$broadcast("updateFlash", {"alertType": "warning", "message": "Please select an address before proceeding !!"});
            } else {
                this.updateCheckoutStep(event, 'address', 'order');
            }
            
        };

        $scope.redeemCouponCode = function(event) {
            var self = this,
                thisVal = $(event.currentTarget).siblings("input").val().toLowerCase(),
                updatedView = this.co.order && this.co.order.couponcode,
                objectToSerialize={'emailId': this.co.user.emailId, "promoCode": (this.co.order && this.co.order.couponcode) ? this.co.order.couponcode : 0};
            
            // Validate Coupon Code and proceed with below code.
            function applyDiscount() {
                self.co.user.eligibleForDiscount = true;
                self.co.order.discountPrice = self.calculateDiscount();
                // Saves coupon code to storage
                updateStorage(self.co);   
            };
            
            var promise = $http({
                method: 'POST',
                url: PRODUCTDATA_URL + '/cart/isValidPromo',
                data: JSON.stringify(objectToSerialize)
            });
            promise.then(function(response) {
                if(response.data) {
                    applyDiscount(); 
                } else {
                    self.co.user.eligibleForDiscount = false;
                    if(!self.co.order) {
                        self.co["order"] = {};    
                    }
                    self.co.order.discountPrice = 0;
                }

                // updates view with confirmation code
                $(".coupon-code").height(0);
                $(".coupon-applied").height(24);
                self.calculateTax();
                self.subTotal(); 
            });
        };
        
        $scope.proceedTo = function(event, step) {
            // updates storage with reference to 'checkout' object from view
            updateStorage(this.co);
            // Updates path
            $(event.currentTarget).parents(".container.form-views").animate({height: 0 }, 400, function() {
                $rootScope.$broadcast("checkout_uri_changed", {'step': step});
            });
        };

        $scope.skipToPage = function(event, step) {
            // updates storage with reference to 'checkout' object from view
            updateStorage(window.storageFactory.getData('storage'));
            // Updates path
            $(".form-views.active").animate({height: 0 }, 400, function() {
                $rootScope.$broadcast("checkout_uri_changed", {'step': step});
            });
        };

        function updateStorage(obj) {
            checkoutStorage.setData(obj, 'storage');
        };

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
                totalTax = this.calculateTax(),
                checkoutCartConfig = this.checkoutCartConfig,
                totalDiscount = this.calculateDiscount(),
                shippingCost = this.calculateShippingCharge(),
                totalCostToUser,
                totalCostToUserAfterDiscount,
                priceObj,
                currency = $("body").attr("data-currency"),
                discount = (this.co && this.co.order && this.co.order.couponcode && this.co.user.eligibleForDiscount) ? checkoutCartConfig.discount : 0;

            totalCostToUserAfterDiscount = totalCost - totalDiscount;
            totalCostToUser = totalCostToUserAfterDiscount + shippingCost + totalTax;
            
            return totalCostToUser;
        };

        $scope.calculateShippingCharge = function() {
            return 0;
        };

        // $scope.calculateTax = function() {
        //     var totalCost = this.getTotal(),
        //         checkoutCartConfig = this.checkoutCartConfig,
        //         currency = $("body").attr("data-currency"),
        //         discount = (this.co.order && this.co.order.couponcode && this.co.user.eligibleForDiscount) ? checkoutCartConfig.discount : 0;
        //     return (this.co.user.eligibleForDiscount) ? (checkoutCartConfig.tax/100* (totalCost-discount/100*totalCost)) : (checkoutCartConfig.tax/100*totalCost);
        // };

        $scope.calculateTax = function() {
            var cartItems = this.cartItems,
                totalCost = this.getTotal(),
                checkoutCartConfig = this.checkoutCartConfig,
                individualTax = 0,
                priceObj,
                currency = $("body").attr("data-currency");

            $(cartItems).each(function(i, j) {
                priceObj = j.productPriceOptions.filter(function(key, val) {
                    return key.currencyCode === currency.toUpperCase();
                });
                individualTax += (j.tax/100 * priceObj[0].price) * j.quantity;
            });   
            return individualTax;
        };

        $scope.calculateDiscount = function() {
            var cartItems = this.cartItems,
                checkoutCartConfig = this.checkoutCartConfig,
                currency = $("body").attr("data-currency"),
                priceObj,
                totalCost = 0;
            
            $(cartItems).each(function(i, j) {
                priceObj = j.productPriceOptions.filter(function(key, val) {
                    return key.currencyCode === currency.toUpperCase();
                });
                totalCost += priceObj[0].price * j.quantity;
            });

            return (this.co.user.eligibleForDiscount) ? (checkoutCartConfig.discount/100*totalCost) : 0;
        };

        $scope.addCouponCode = function(event) {
            $(".coupon-applied").height(0);
            $(event.currentTarget.parentNode).next().height(28);
        };

        $scope.checkoutLogin = function () {
            var user = $scope.co.user;
            updateStorage($scope.co);
            var rootScope = $rootScope;
            AuthenticationService.Login(user.emailId, user.password, function(response) {
                if(response.success) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    rootScope.$broadcast("checkout_uri_changed", {'step': 'address'});
                } else {
                    $scope.error = response.message;
                }
            });
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
                var promise = CheckoutService.updateCartLineItem(updateObj);
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
                window.sessionStorage.setItem('cartLength', parseInt(window.sessionStorage.cartLength) - qty[0].quantity);
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

        $scope.updateAddress = function(event) {
            var self = this;
            var objectToSerialize = this.co.address;
            var promise = $http({
                method: 'POST',
                url: PRODUCTDATA_URL + '/cart/address/update',
                data: JSON.stringify(objectToSerialize)
            });
            this.updateCheckoutStep(event, 'address', 'order');
        };

        $scope.verifyUser = function() {
            // var validateUser = scope.currentScope.loginService.validateToken();
            window.singleCall.authenticateUser = true;
            CheckoutService.GetAll( PRODUCTDATA_URL + '/authenticate/validate')
              .then(function(data) {
                if(data.success === true) {
                    $rootScope.$broadcast("checkout_uri_changed", {'step': 'address'});
                    window.singleCall.authenticateUser = true;
                } else {
                    window.singleCall.authenticateUser = false;
                }
              }
            );
        };
        
        // // Detect On DOM loaded change
        $scope.$on('$viewContentLoaded', function(event){
            var promise;
            window.scope = event;
            // Clearing independent calls
            window.getAddressOnce = false;
            window.getViewCartOnce = false;

            // window.singleCall.authenticateUser = false;
            var currentState = $state.current.name.split("checkout.")[1];
            $(".checkout > .section").removeClass("selected");
            setTimeout(function() {
                $(".checkout").find("."+currentState).addClass("selected");
            }, 10);

            //Checks if user is already logged in
            if(!window.singleCall.authenticateUser && location.pathname.indexOf("login") !== -1) {
                window.singleCall.authenticateUser = true;
                if(getLoginStatus && getLoginStatus.success === true) {
                    scope.targetScope.getLoginStatus = getLoginStatus;
                    // var userDetails = (window.userDetails) ? JSON.parse(window.userDetails) : {"name": "Guest","imageUrl": "","user": null};
                    scope.targetScope.co = {};
                    scope.targetScope.co["user"] = {};
                    // scope.targetScope.co["user"]["emailId"] = userDetails.emailId;
                    scope.targetScope.updateCheckoutStep(scope, 'login', 'address');
                } else {
                    $rootScope.$broadcast("checkout_uri_changed", {'step': 'login'});
                }
            }

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

        $scope.nextAddressSlider = function(evt) {
            var carousel = $(evt.currentTarget).siblings(".carouselStrip"),
                carouselWrapper = $(evt.currentTarget).parent(),
                eachAddressWidth = carousel.find("li").eq(0).width(),
                totalStripLength = carousel.find("li").length * eachAddressWidth,
                carouselLeft = parseInt(carousel.css("left")),
                calculateLeft = totalStripLength - carouselWrapper.width() - Math.abs(parseInt(carousel.css("left")));
            
            if(calculateLeft > 200) {
                carouselWrapper.addClass("prevActive");
                carousel.css("left", parseInt(carouselLeft - 200)+"px");
            } else {
                carousel.css("left", parseInt(carouselLeft - calculateLeft)+"px");
                carouselWrapper.addClass("removeNext");
            }
        };

        $scope.prevAddressSlider = function(evt) {
            var carousel = $(evt.currentTarget).siblings(".carouselStrip"),
                carouselWrapper = $(evt.currentTarget).parent(),
                eachAddressWidth = carousel.find("li").eq(0).width(),
                totalStripLength = carousel.find("li").length * eachAddressWidth,
                carouselLeft = parseInt(carousel.css("left")),
                calculateLeft = totalStripLength - carouselWrapper.width() - Math.abs(parseInt(carousel.css("left")));
            
            if(carouselLeft === 0) {
                return true;  
            } 
            carouselWrapper.removeClass("removeNext");
            (Math.abs(carouselLeft) === 200) ? carouselWrapper.removeClass("prevActive") : "";
            if(Math.abs(carouselLeft) >= 200) {
                carousel.css("left", parseInt(carouselLeft + 200)+"px");
            } else {
                carousel.css("left", "-3px");
                carouselWrapper.removeClass("prevActive");
            }
        };

        $scope.deleteAddress = function(event, id) {
            var id = id;
            var addressFilterMap = this.addressList.map(function(i, j) {
                return (i.addressId === id);
            });
            var addressFilterIndex = addressFilterMap.indexOf(true);
            // Remove the item from list
            this.addressList.splice( addressFilterIndex, 1 );
            $(event.currentTarget).parents(".carouselStrip").css("left", "-3px");
            // Broadcast cart update to mini cart
            $rootScope.$broadcast("updateFlash", {"alertType": "success", "message": "Address removed successfully !!"});
        };  

        // Order place
        $scope.placeOrder = function() {
            var self = this,
                lineItems = [],
                objectToSerialize;
            $.each(this.cartItems, function(key, val) {
                lineItems.push({
                    "productId": val.productId,
                    "quantity": val.quantity
                });
            });
            objectToSerialize = {"lineItems": lineItems, "address": this.co.address, "currencyId": 1, "emailId": this.co.user.emailId, "promoUsed": this.co.user.eligibleForDiscount};

            var promise = $http({
                method: 'POST',
                url: PRODUCTDATA_URL + '/order/createOrder',
                data: JSON.stringify(objectToSerialize)
            });
            promise.then(function(response) {
                if(response.data.success) {
                    window.orderNumber = response.data.webOrderNumber;
                    window.miniCartStorage = [];
                    window.itemsArray = [];
                    window.sessionStorage.removeItem('itemsArray');
                    window.sessionStorage.removeItem('storage');
                    window.sessionStorage.setItem('checkoutState', '{"login": false, "address": false, "order": false, "payment": false }');
                    window.restrictView = false;
                    window.sessionStorage.cartLength = 0;
                    
                    // Broadcast cart update to mini cart
                    $rootScope.$broadcast("updateMiniCartCount");

                    // Create a form and submit 
                    var data = response.data.request;
                    for(var key in response.data.request) {
                        $('<input>').attr({'type':'hidden', 'name': key, 'value':data[key]}).appendTo('#redirectionData');
                    }
                    $("#redirectionData").attr("action", data.base_url).submit();
                }
            });
        };

        // function to submit the form after all validation has occurred            
        $scope.updateCheckoutStep = $.proxy(function(event, from, to) {
            var self = this,
                rootElem = (event.currentTarget) ? event.currentTarget : $(".section."+from).find(".columns");
            // updates storage with reference to 'checkout' object from view
            updateStorage(this.co, 'storage');

            // Updates path
            $(rootElem).parents(".container.form-views").removeClass("active").animate({height: 0 }, 400, function() {
                var steps = JSON.parse(window.sessionStorage.checkoutState);
                steps[from] = true;
                window.sessionStorage.setItem('checkoutState', JSON.stringify(steps));
                $rootScope.$broadcast("checkout_uri_changed", {'step': to});
            });
        }, $scope);

        $(document).on('data-currency-changed', $.proxy(function(e, key){
            $scope.subTotal();
        }, $scope));


        /* Facebook Authentication Login code goes here */
        $scope.fblogin = function () {
            $timeout(function () {
                Facebook.login('checkout.address', function() {
                    window.singleCall.authenticateUser = true;
                    window.scope.targetScope.co = {"user": {"emailId": ""}};
                    window.scope.targetScope.updateCheckoutStep(window.scope, 'login', 'address');
                });
            }, 100, false);
        };

        /* Google Authentication code goes here */
        $scope.googleHandleAuthClick = function() {
            Google.login(function() {
                    window.singleCall.authenticateUser = true;
                    window.scope.targetScope.co = {"user": {"emailId": ""}};
                    window.scope.targetScope.updateCheckoutStep(window.scope, 'login', 'address');
                });
        };

    }]
);

angular.module('eCommerce')
    .factory("checkoutStorage", ['$window', '$rootScope', function($window, $rootScope) {
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
    }]
);