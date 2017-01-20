'use strict';

angular.module('eCommerce')
    .controller('thankyouCtrl', ['$scope', '$http', '$rootScope',  function($scope, $http, $rootScope) {
    	$scope.order = window.orderNumber;
    	
    	window.dataLoaded = true;
    	window.restrictView = true;
    }]
);