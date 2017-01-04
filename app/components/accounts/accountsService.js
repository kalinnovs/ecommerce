'use strict';

angular.module('eCommerce')
  .service('AccountsService', function ($http, ENDPOINT_URI, PRODUCTDATA_URL) {
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

    service.getOrderList = function() {
        // Read Cart Array and pass to URL
        return $http({
                method: 'GET',
                url: PRODUCTDATA_URL + '/order/list'
            }).then(function successCallback(response) {
            	$.each(response.data.orderList, function(i, j) {
            		var dt = new Date(j.orderDate);
					var month = ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
					j.orderDateConverted = month[dt.getMonth()] +" "+ dt.getDate()+', '+ dt.getFullYear();
            	});
                return response.data;
            }, function errorCallback(response) {
                console.log("Error in saving.");
        }); 
    } 

    service.getSavedCart = function() {
        // Read Cart Array and pass to URL
        var cartArray,
            cartItems = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [],
            objectToSerialize, 
            responseData;
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
                return responseData;
            }, function errorCallback(response) {
                console.log("Error in saving.");
        }); 
    }


  });
