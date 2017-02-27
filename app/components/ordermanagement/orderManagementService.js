'use strict';

angular.module('eCommerce')
.service('OrderDetailService', function($q, $http, PRODUCTDATA_URL){
	var service = this;
	var deferred = $q.defer();

	service.getOrderList = function(){
		return $http({
                method: 'GET',
                url: PRODUCTDATA_URL + '/admin/orders/list'
            }).then(function successCallback(response) {
                deferred.resolve(response.data)
                return deferred.promise;
            }, function errorCallback(response) {
                console.log("Error in getting order list.");
            }); 
	}
	service.saveOrder = function(orderObj){
		return $http({
                method: 'POST',
                url: PRODUCTDATA_URL + '/admin/updateOrderStatus',
                data: JSON.stringify(orderObj),
	            headers: {
	                'Content-Type': 'application/json'
	            }
            }).then(function successCallback(response) {
            	deferred = $q.defer();
                deferred.resolve(response.data)
                return deferred.promise;
            }, function errorCallback(response) {
                console.log("Error in getting order list.");
            }); 
	}
});