'use strict';

angular.module('eCommerce')
    .controller('orderCtrl', ['$scope', '$http', '$rootScope',  function($scope, $http, $rootScope) {
    	$scope.order = $rootScope.orderNumber;
    	// Scoping Navigation
        $rootScope.navigation = (window.sessionStorage.navigation) ? JSON.parse(window.sessionStorage.navigation) : [];

    	window.dataLoaded = true;
    }]
);