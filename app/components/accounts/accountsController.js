'use strict';

angular.module('eCommerce')
  .controller('AccoutsCtrl', function ($scope, $timeout, $rootScope, UserService, SERVICE_URL, PRODUCTDATA_URL, $http, AccountsService, orderList, savedCart, getAddress) {

  	$scope.loggedUser = orderList.loggedUser;
  	$scope.orderList = orderList.orderList;
    $scope.savedCart = savedCart.cartList;
    $scope.addressList = getAddress;

    window.dataLoaded = true;
    // View Setters
    $scope.mySubscription = false;
    $scope.myAddress = false;
    $scope.myOrders = true;


  	// Scoping Navigation
    $rootScope.navigation = (window.sessionStorage.navigation) ? JSON.parse(window.sessionStorage.navigation) : [];

  	$scope.viewOrder = function(event) {
        var orderId = $(event.currentTarget).attr("data-orderid");
        if($(".orderDetailsVisible-"+orderId).css("display") !== "none") {
            return;
        }
        var orderLookupData = this.orderList.filter(function(val, key){
            return (val.webOrderNumber === orderId);
        });
        this.orderLookupData = orderLookupData[0];
        $(event.currentTarget).parents("li").siblings("li").removeClass("expanded")
        $(event.currentTarget).parents("ul").find(".orderLookupList").hide();
        $(".orderDetailsVisible-"+orderId).slideDown().parent().addClass("expanded");
  	};

  	$scope.cancelOrder = function(event) {
      var orderId = $(event.currentTarget).attr("data-orderid");
      $(".orderDetailsVisible-"+orderId).slideUp().parent().removeClass("expanded")
  	};

    $scope.enableAddressEntry = function(event) {
        this.hasAddress = false;
    };

    $scope.cancelAddressEntry = function(event) {
        this.hasAddress = true;
    };

    $scope.addAddress = function(event) {
        var self = this;
        var objectToSerialize = this.address;
        var promise = $http({
            method: 'POST',
            url: PRODUCTDATA_URL + '/cart/address/update',
            data: JSON.stringify(objectToSerialize)
        });
    };

    $(".accounts-menu > li a").click(function() {
        var dataModel = $(this).data("model");
        $scope.myAccounts = false;
        $scope.mySubscription = false;
        $scope.myAddress = false;
        $scope.hasAddress = false;
        $scope.myOrders = false;
        switch(dataModel) {
            case "myDashboard":
                $scope.myOrders = true;
                break;
            case "myAccounts":
                $scope.myAccounts = true;
                break;
            case "myAddress":
                $scope.myAddress = true;
                $scope.hasAddress = true;
                break;
            case "myOrders":
                $scope.myOrders = true;
                break;
            case "mySubscription":
                $scope.mySubscription = true;
                break;
            default:
                // default code block
        }
        $scope.$apply();
        // $scope[dataModel] = true;
    });

  });