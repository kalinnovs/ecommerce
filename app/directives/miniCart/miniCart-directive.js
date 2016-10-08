'use strict';

angular.module('eCommerce')
    .directive('minicart', function($http, PRODUCTDATA_URL) {
        var def = {
            restrict: 'EA',
            scope:{
                partNumberMap: "@"
            },
            template: '<div class="minicart">' +
                '<div id="miniKart"></div>' +
                '<p class="manyItems">Please go to cart page to check the list</p>' +
                '<button type="button" class="btn btn-primary checkoutLink">Checkout</button>' +
                '<p><a href="cart" title="View Cart">View Cart</a></p>' +
                '<p><a href="javascript:void(0);" title="Orders">Orders</a></p>' +
                '<p><a href="javascript:void(0);" title="Accounts">Accounts</a></p>' +
                '<p><a href="javascript:void(0);" title="Sign in">Sign in</a></p>' +
                '</div>',
            link: function(scope, element, attrs) {
                attrs.$observe('partNumberMap', function (newValue, oldValue) {
                    if (newValue) {
                        if (window.itemsArray.length > 0) {
                            var responseData;
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
                                debugger;
                                responseData = data.data;
                            }, function errorCallback(response) {
                                console.log("Error in saving.");
                            }); 
                            
                            var ul = document.createElement("ul");
                            for (var i = 0; i < window.itemsArray.length; i++) {
                                if(i === 4) {
                                    return;
                                }
                                var li = document.createElement("li");
                                    li.innerHTML = "<div class='wrapper'><figure><img src='" +
                                    window.itemsArray[i].image[0].thumbImagePath +
                                    "' /></figure><div class='details'><h3>" +
                                    window.itemsArray[i].partNumber +
                                    "</h3><span class='price'>INR "+ window.itemsArray[i].price + "</span> <span class='quantity'> x 1</span></div></div>";
                                ul.appendChild(li);
                            }
                            $("#miniKart").html("").append(ul);
                            (window.itemsArray.length > 4) ? element.find(".manyItems").show() : element.find(".manyItems").hide();
                            $("#miniKart").parents(".cart").find(".count").html(window.itemsArray.length);
                        }
                    } else if (newValue == false) {
                        alert('Not updated');
                    }
                });
                
            }
        };
        return def;
    });
