'use strict';

angular.module('eCommerce')
    .controller('thankyouCtrl', ['$scope', '$http', '$rootScope', 'getPayUData',  function($scope, $http, $rootScope, getPayUData) {
    	$scope.order = window.location.href.split("=")[1];
        $scope.statusMessage = getPayUData.statusMessage;

    	if(!$.isEmptyObject(getPayUData)) {
    		window.dataLoaded = true;
    		
    		if(getPayUData.statusMessage === "UNSUCCESSFUL") {
    			
    		}
    	}
    }]
);