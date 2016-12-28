'use strict';

angular.module('eCommerce')
    .controller('thankyouCtrl', ['$scope', '$http', '$rootScope',  function($scope, $http, $rootScope) {
    	debugger;
    	$scope.order = window.orderNumber;
    	// Scoping Navigation
        $rootScope.navigation = (window.sessionStorage.navigation) ? JSON.parse(window.sessionStorage.navigation) : [];

    	window.dataLoaded = true;
    	window.restrictView = true;
    }]
);