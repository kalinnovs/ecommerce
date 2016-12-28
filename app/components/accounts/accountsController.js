'use strict';

angular.module('eCommerce')
  .controller('AccoutsCtrl', function ($scope, $timeout, $rootScope, UserService, SERVICE_URL, PRODUCTDATA_URL, $http) {

  	window.dataLoaded = true;
  	// Scoping Navigation
    $rootScope.navigation = (window.sessionStorage.navigation) ? JSON.parse(window.sessionStorage.navigation) : [];

  	
  });