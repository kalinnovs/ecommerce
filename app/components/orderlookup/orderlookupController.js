'use strict';

angular.module('eCommerce')
    .controller('orderCtrl', ['$scope', '$http', '$rootScope', 'PRODUCTDATA_URL', 'OrderService',  function($scope, $http, $rootScope, PRODUCTDATA_URL, OrderService) {
    	window.dataLoaded = true;

    	// Injecting Math into cart scope
        $scope.Math = window.Math;
        // Currency Update
        if(window.userDetails && window.userDetails.preferredCurrency) {
            $rootScope.$broadcast("updateCurrency", window.userDetails.preferredCurrency);
        }

    	$scope.orderLookupSearch = function(event) {
    		window.order = this;
    		var serializeArray = $(event.currentTarget).serializeArray();
    		
    		OrderService.getItems(serializeArray).then(function(data) {
	    		if(data.length !==0) {
	    			order.orderLookupData = data;
	    		} else {
	    			order.orderLookupData = "";
	    			// Broadcast cart update to mini cart
                    $rootScope.$broadcast("updateFlash", {"alertType": "warning", "message": "Data not found !!"});
	    		}
	    	}); 
		};

    }]
);