'use strict';

angular.module('eCommerce')
  .service('CheckoutService', ['$http', 'ENDPOINT_URI', 'PRODUCTDATA_URL', 'checkoutStorage', 
    function ($http, ENDPOINT_URI, PRODUCTDATA_URL, checkoutStorage) {
    var service = this;
    //to create unique contact id
    var uid = 1;

    //simply returns the contacts list
    service.list = function () {
        return service.contacts;
    }

    service.GetAll = function(url) {
        return $http.get(url).then(service.extract, service.handleError('Error getting all users'));
    }

    service.extract = function(result) {
    	return result.data;
    }

    service.getURL = function() {
    	return ENDPOINT_URI + "assets/json/default.json";
    }

    //simply returns the contacts list
    service.all = function () {
        return $http.get(service.getURL()).then(service.extract);
    }

    service.getFromURL = function(url) {
        return $http.get(url).then(service.extract);
    }

    service.handleError = function(res) {
        return function () {
            return { success: false, message: res.message };
        };
    }

    service.getServiceData = function(url) {
        return $http.get(PRODUCTDATA_URL + url);
    }

    service.validateToken = function() {
        if(window.validateOnce && window.validateOnce === true) {
            return;
        }
        
        return $http.get(PRODUCTDATA_URL + '/authenticate/validate').then(function (response) {
            window.validateOnce = true;
            return response.data;
        });
    } 

    service.getItems = function() {
        // Read Cart Array and pass to URL
        var cartItems = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [],
            responseData,
            cartArray,
            objectToSerialize;
            cartArray = cartItems.map(function(i, j) {
                        return (i.partNumber || i.productId);
                    });
            objectToSerialize={'products':cartArray};

            
        
        return $http({
                method: 'POST',
                url: PRODUCTDATA_URL + '/cart/products',
                data: JSON.stringify(objectToSerialize)
            }).then(function successCallback(response) {
                responseData = response.data;
                $.each(responseData, function(key, val) {
                    val["quantity"] = cartItems[key].quantity;
                });
                return responseData;
            }, function errorCallback(response) {
                console.log("Error in saving.");
        }); 
    } 

    service.viewCart = function() {
        if(window.getViewCartOnce && window.getViewCartOnce === true) {
            return;
        }
        
        // Read Cart Array and pass to URL
        var cartArray,
            cartItems = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [],
            responseData,
            objectToSerialize;
            cartArray = cartItems.map(function(i, j) {
                return (i.partNumber || i.productId);
            });
            objectToSerialize={'products':cartArray};

        return $http({
                method: 'POST',
                url: PRODUCTDATA_URL + '/cart/viewCart',
                data: JSON.stringify(objectToSerialize)
            }).then(function successCallback(response) {
                responseData = response.data;
                window.getViewCartOnce = true;
                return responseData;
            }, function errorCallback(response) {
                console.log("Error in saving.");
        }); 
    } 

    service.getAddress = function(obj) {
        if(window.getAddressOnce && window.getAddressOnce === true) {
            return;
        }
        // Read Cart Array and pass to URL
        return $http({
                method: 'GET',
                url: PRODUCTDATA_URL + '/cart/address'
            }).then(function successCallback(response) {
                window.getAddressOnce = true;
                return response.data;
            }, function errorCallback(response) {
                console.log("Error in saving.");
        }); 
    }

    service.updateCartLineItem = function(obj) {
        // Update Cart item in database
        return $http({
                method: 'POST',
                url: PRODUCTDATA_URL + '/cart/updateLineItem',
                data: JSON.stringify(obj)
            }).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {
                console.log("Error in saving.");
        }); 
    }


  }]);
