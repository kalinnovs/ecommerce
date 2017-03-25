'use strict';

angular.module('eCommerce')
    .directive('minicart', ['$http', 'PRODUCTDATA_URL', '$state', 'AuthenticationService', '$rootScope', '$location', function($http, PRODUCTDATA_URL, $state, AuthenticationService, $rootScope, $location) {
        var def = {
            restrict: 'A',
            scope:{
                partNumberMap: "@"
            },
            template: '<span class="count cartCount">10</span>'+
            '<i class="fa fa-shopping-cart" aria-hidden="true"></i>'+
            '<div class="cart-drawer arrow_box hide">'+
            '<div class="minicart">' +
            '<h2>Shopping Cart <a href="javascript:void(0);" class="fa fa-times closeOverlay"></a></h2>'+
            '<div class="miniKart"></div>' +
            '<p class="manyItems">Please go to cart page to check the list</p>' +
            '<p><a href="cart" title="View Cart">View Cart</a></p>' +
            // '<p><a href="checkout/login" title="Checkout">Checkout</a></p>' +
            '<p><a href="orderLookup" title="Orders">Find Orders</a></p>' +
            // '<p><a href="javascript:void(0);" title="Accounts">Accounts</a></p>' +
            '<p><a href="javascript:void(0);" class="noDecoration profile"><span class="imageNull profilePicUpdate">'+
                '<img src="" class="profilePic" alt="ProfilePic" /><i class="fa fa-user" aria-hidden="true"></i></span>'+
                '<span class="logoutText">Logout</span> <span class="userDetailsUpdate userLogout"></span></a></p>' +
            '</div></div>',
            controller: function() {
                // (window.sessionStorage.cartLength) ? (window.sessionStorage.cartLength === "0") ? window.sessionStorage.length : 0 : '';
                if(window.loadMiniCartOnce === undefined) {
                    var responseData, html, self = this,
                        itemsArray = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [],
                        itemList = itemsArray.map(function(i, j) {
                            return (i.partNumber || i.productId);
                        }),
                        objectToSerialize = {'products':itemList},
                        computedURL =  PRODUCTDATA_URL + '/cart/viewCart';

                    $http({
                        method: 'POST',
                        url: computedURL,
                        data: JSON.stringify(objectToSerialize)
                    }).then(function successCallback(results) {
                        responseData = results.data.cartList || [];
                        $rootScope.navigation = results.data.pageNavigation.categories;
                        window.userDetails = (results.data.loggedUser !== null) ? results.data.loggedUser : {"name": "Guest","imageUrl": "","user": null};
                        
                        if(window.localStorage.accessToken !== "" && results.data.loggedUser === null) {
                            window.localStorage.setItem("accessToken", "");
                            window.sessionStorage.setItem("checkoutState", '{"login": false, "address": false, "order": false, "payment": false }');
                            window.sessionStorage.removeItem('itemsArray');
                            window.sessionStorage.removeItem('cartLength');
                        }
                        var cartCount = 0;
                        for(var i=0; i < responseData.length; i++) {
                            cartCount+= parseInt(responseData[i].quantity || itemsArray[i].quantity);
                        }
                        $(".miniKart").parents(".cart").find(".count").html(cartCount);
                    	// window.sessionStorage.setItem('cartLength', cartCount + ((window.sessionStorage.cartLength) ? parseInt(window.sessionStorage.cartLength) : 0));
                        window.sessionStorage.setItem('cartLength', cartCount);
                    }); 
                        
                    window.loadMiniCartOnce = true;
                }
            },
            link: function(scope, element, attrs) {
                function getMiniCart(elem) {
                    var responseData,
                        // Read Cart Array and pass to URL
                        itemsArray = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [],
                        itemList = itemsArray.map(function(i, j) {
                            return (i.partNumber || i.productId);
                        }),
                        objectToSerialize = {'products':itemList};

                    
                    var computedURL =  PRODUCTDATA_URL + '/cart/viewCart',
                        cartCount;
                    $http({
                        method: 'POST',
                        url: computedURL,
                        data: JSON.stringify(objectToSerialize),
                    }).then(function successCallback(results) {
                        responseData = results.data.cartList || [];
                        
                        cartCount = ListItemCounter(responseData);
                        renderHTML(responseData);
                        (responseData.length > 4) ? element.find(".manyItems").show() : element.find(".manyItems").hide();
                        // $(".miniKart").parents(".cart").find(".count").html(cartCount);
                        $(".miniKart").removeClass("loader");
                    }, function errorCallback(response) {
                        console.log("Error in saving.");
                    }); 
                };

                function ListItemCounter(itemList) {
                    var itemArray = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [],
                        count = 0;
                    for(var i=0; i < itemList.length; i++) {
                        count+= itemList[i].quantity || itemArray[i].quantity;
                    }
                    return count;
                };
                
                function renderHTML(responseData) {
                    var itemList = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [];
                    var ul = document.createElement("ul"), img;
                    for (var i = 0; i < responseData.length; i++) {
                        if(i === 4) {
                            break;
                        }
                        var currency = $("body").attr("data-currency");
                        var priceObj = responseData[i].productPriceOptions.filter(function(key, val) {
                            return key.currencyCode === currency.toUpperCase();
                        });
                        img = (responseData[i].productImage) ? responseData[i].productImage.thumbImagePath : '';
                        var currency = $("body").attr("data-currency").toUpperCase();
                        var li = document.createElement("li");
                            li.innerHTML = "<div class='wrapper'><figure><img src='" + img +
                            "' alt='cart-image"+i+"' /></figure><div class='details'><h3>" +
                            (responseData[i].partNumber || responseData[i].productId) +
                            "</h3><span class='price'>"+ currency + " " + (responseData[i].price || priceObj[0].price) + "</span> <span class='quantity'> x "+(responseData[i].quantity || itemList[i].quantity)+"</span></div></div>";
                        ul.appendChild(li);
                        element.find(".miniKart").removeClass("empty-cart");
                    }
                    if(responseData.length === 0) {
                        var li = document.createElement("li");
                            li.innerHTML = "Your cart is empty.";
                        ul.appendChild(li);  
                        element.find(".miniKart").addClass("empty-cart"); 
                    }
                    element.find(".miniKart").html("").append(ul);
                };
                
                // Listens to cart update
                scope.$on("updateMiniCart", function (event, args) {
                    renderHTML(args);
                });

                scope.$on("updateMiniCartCount", function (event, args) {
                    // getMiniCart();
                    var count, storageItemsCount = 0;
                    if(args) {
                        count = args;
                        window.sessionStorage.cartLength = args;
                    } else {
                        count = (window.sessionStorage.cartLength) ? parseInt(window.sessionStorage.cartLength) : 0;
                        // storageItemsCount = quantityCounter();
                        // if(storageItemsCount > 0 ) {
                        //     count = count + storageItemsCount;
                        // }
                    }
                    // console.log(count);
                    $(".miniKart").parents(".cart").find(".count").html(count);

                    // Broadcast currency update
                    if(window.userDetails && window.userDetails.preferredCurrency) {
                        $rootScope.$broadcast("updateCurrency", window.userDetails.preferredCurrency);
                    }
                });

                // function quantityCounter() {
                //     var itemArray = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [],
                //         count = 0;
                //     for(var i=0; i < itemArray.length; i++) {
                //         count+= parseInt(itemArray[i].quantity);
                //     }
                //     return count;
                // };
                
                element.on("click", function(event) {
                    var currentTarget = event.currentTarget;
                    if(this === currentTarget) {
                        var drawer = $(this).find(".cart-drawer");
                        if(drawer.hasClass("hide")) {
                            $(this).find(".miniKart").addClass("loader");
                            getMiniCart(currentTarget);
                            drawer.removeClass("hide");
                            if($('body').hasClass('mobile')) {
                                drawer.css('left', 0);
                            }
                        } else {
                            if(!$('body').hasClass('mobile')) {
                                drawer.addClass("hide");    
                            }
                        }    
                    }
                });

                $(".minicart .profile").on("click", function(event) {
                    window.localStorage.setItem("accessToken", "");
                    window.sessionStorage.setItem("checkoutState", '{"login": false, "address": false, "order": false, "payment": false }');
                    window.userDetails = {"name": "Guest","imageUrl": "","user": null};
                    $state.go('login');
                    window.sessionStorage.removeItem('itemsArray');
                    window.sessionStorage.removeItem('cartLength');
                    window.localStorage.removeItem('globals');
                    // Broadcast cart update to mini cart
                    $rootScope.$broadcast("updateMiniCartCount");
                    event.preventDefault();
                });

                $(".minicart .closeOverlay").on("click", function(event) {
                    $(".cart-drawer").addClass('hide').css("left", "-1000px");
                    event.preventDefault();
                    event.stopPropagation();
                });

                $(".minicart p > a").on("click", function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    var href = $(this).attr("href");
                    $(".cart-drawer").addClass('hide').css("left", "-1000px");
                    $state.go(href);
                });

                $("body").on("click", function(ev) {
                    if($(ev.target).parents(".mini-cart-trigger").length === 0 && !$('body').hasClass('mobile')) {
                        $(".cart-drawer").addClass("hide");
                    } else {
                        return;
                    }
                });
            }
        };
        return def;
    }]);
