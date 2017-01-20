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

    $scope.nextAddressSlider = function(evt) {
        var carousel = $(evt.currentTarget).siblings(".carouselStrip"),
            carouselWrapper = $(evt.currentTarget).parent(),
            eachAddressWidth = carousel.find("li").eq(0).width(),
            totalStripLength = carousel.find("li").length * eachAddressWidth,
            carouselLeft = parseInt(carousel.css("left")),
            calculateLeft = totalStripLength - carouselWrapper.width() - Math.abs(parseInt(carousel.css("left")));
        
        if(calculateLeft > 100) {
            carouselWrapper.addClass("prevActive");
            carousel.css("left", parseInt(carouselLeft - 100)+"px");
        } else {
            carousel.css("left", parseInt(carouselLeft - calculateLeft)+"px");
            carouselWrapper.addClass("removeNext");
        }
    };

    $scope.prevAddressSlider = function(evt) {
        var carousel = $(evt.currentTarget).siblings(".carouselStrip"),
            carouselWrapper = $(evt.currentTarget).parent(),
            eachAddressWidth = carousel.find("li").eq(0).width(),
            totalStripLength = carousel.find("li").length * eachAddressWidth,
            carouselLeft = parseInt(carousel.css("left")),
            calculateLeft = totalStripLength - carouselWrapper.width() - Math.abs(parseInt(carousel.css("left")));
        
        if(carouselLeft === 0) {
            return true;  
        } 
        carouselWrapper.removeClass("removeNext");
        (Math.abs(carouselLeft) === 100) ? carouselWrapper.removeClass("prevActive") : "";
        if(Math.abs(carouselLeft) >= 100) {
            carousel.css("left", parseInt(carouselLeft + 100)+"px");
        } else {
            carousel.css("left", "-3px");
            carouselWrapper.removeClass("prevActive");
        }
    };

    $scope.deleteAddress = function(event, id) {
        var id = id;
        var addressFilterMap = this.addressList.map(function(i, j) {
            return (i.addressId === id);
        });
        var addressFilterIndex = addressFilterMap.indexOf(true);
        // Remove the item from list
        this.addressList.splice( addressFilterIndex, 1 );
        $(event.currentTarget).parents(".carouselStrip").css("left", "-3px");
        // Broadcast cart update to mini cart
        $rootScope.$broadcast("updateFlash", {"alertType": "success", "message": "Address removed successfully !!"});
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