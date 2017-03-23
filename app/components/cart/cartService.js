'use strict';

angular.module('eCommerce')
  .service('CartService', ['$http', 'ENDPOINT_URI', 'PRODUCTDATA_URL', function ($http, ENDPOINT_URI, PRODUCTDATA_URL) {
    var service = this;
    //to create unique contact id
    var uid = 1;

    //simply returns the contacts list
    service.list = function () {
        return service.contacts;
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

    service.viewCart = function() {
        // Read Cart Array and pass to URL
        var cartArray,
            cartItems = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [],
            computedURL =  PRODUCTDATA_URL + '/cart/viewCart',
            objectToSerialize;
            cartArray = cartItems.map(function(i, j) {
                        return (i.partNumber || i.productId);
                    });
            objectToSerialize={'products':cartArray};

        return $http({
                method: 'POST',
                url: computedURL,
                data: JSON.stringify(objectToSerialize)
            }).then(function successCallback(response) {
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
