'use strict';

angular.module('eCommerce')
    .directive('minicart', function($http, PRODUCTDATA_URL) {
        var def = {
            restrict: 'A',
            scope:{
                partNumberMap: "@"
            },
            template: '<span class="count cartCount">10</span>'+
            '<i class="fa fa-shopping-cart" aria-hidden="true"></i>'+
            '<div class="cart-drawer arrow_box hide">'+
            '<div class="minicart">' +
                '<div class="miniKart"></div>' +
                '<p class="manyItems">Please go to cart page to check the list</p>' +
                // '<button type="button" class="btn btn-primary checkoutLink">Checkout</button>' +
                '<p><a href="cart" title="View Cart">View Cart</a></p>' +
                // '<p><a href="javascript:void(0);" title="Orders">Orders</a></p>' +
                // '<p><a href="javascript:void(0);" title="Accounts">Accounts</a></p>' +
                // '<p><a href="javascript:void(0);" title="Sign in">Sign in</a></p>' +
                '</div></div>',
            link: function(scope, element, attrs) {
                attrs.$observe('partNumberMap', function (newValue, oldValue) {
                    if (newValue) {
                        if (window.itemsArray.length > 0) {
                            getMiniCart();
                        }
                    } else if (newValue == false) {
                        alert('Not updated');
                    }
                });
                
                function getMiniCart(elem) {
                    var responseData, img, html, self = this;
                    // Read Cart Array and pass to URL
                    var cartArray = (window.sessionStorage.cartParts) ? JSON.parse(window.sessionStorage.cartParts) : [];
                    var jsonData=angular.toJson(cartArray);
                    var objectToSerialize={'products':cartArray};
                    

                    $http({
                        method: 'POST',
                        url: PRODUCTDATA_URL + '/cart/products',
                        data: JSON.stringify(objectToSerialize),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(function successCallback(data) {
                        responseData = data.data;
                        renderHTML(responseData);
                        (responseData.length > 4) ? element.find(".manyItems").show() : element.find(".manyItems").hide();
                        $(".miniKart").parents(".cart").find(".count").html(responseData.length);
                        $(".miniKart").removeClass("loader");
                    }, function errorCallback(response) {
                        console.log("Error in saving.");
                    }); 
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
                            "' /></figure><div class='details'><h3>" +
                            (responseData[i].partNumber || responseData[i].productId) +
                            "</h3><span class='price'>"+ currency + " " + (responseData[i].price || priceObj[0].price) + "</span> <span class='quantity'> x "+(responseData[i].quantity || itemList[i].quantity)+"</span></div></div>";
                        ul.appendChild(li);
                    }
                    element.find(".miniKart").html("").append(ul);
                };
                
                // Listens to cart update
                scope.$on("updateMiniCart", function (event, args) {
                    renderHTML(args);
                });
                
                element.on("click", function(event) {
                    var currentTarget = event.currentTarget;
                    $(this).find(".miniKart").addClass("loader");
                    var drawer = $(this).find(".cart-drawer");
                    if(drawer.hasClass("hide")) {
                        getMiniCart(currentTarget);
                        drawer.removeClass("hide");
                    } else {
                        drawer.addClass("hide");
                    }
                });
            }
        };
        return def;
    });
