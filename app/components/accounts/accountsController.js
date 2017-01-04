'use strict';

angular.module('eCommerce')
  .controller('AccoutsCtrl', function ($scope, $timeout, $rootScope, UserService, SERVICE_URL, PRODUCTDATA_URL, $http, AccountsService, orderList, savedCart) {

  	$scope.loggedUser = orderList.loggedUser;
  	$scope.orderList = orderList.orderList;
    $scope.savedCart = savedCart.cartList;
  	window.dataLoaded = true;
  	// Scoping Navigation
    $rootScope.navigation = (window.sessionStorage.navigation) ? JSON.parse(window.sessionStorage.navigation) : [];

  	$scope.viewOrder = function(event) {
  		debugger;
  	};

  	$scope.cancelOrder = function(event) {
  		debugger;
  	};

  });