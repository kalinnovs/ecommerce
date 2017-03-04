'use strict';

angular.module('eCommerce')
  .controller('AdminCtrl', function ($scope, $rootScope, $http, $state, $timeout, UserService, $cookies, PRODUCTDATA_URL, AuthenticationService, OrderDetailService) {
    var admin = this;
    
    // UserService.GetAll( BASE_URI + '/eCommerce/home.json')
    UserService.GetAll( PRODUCTDATA_URL + '/admin/visitors')
        .then(function(data) {
          if(data.totalUniqueVisitorsCount) {
          	admin.uniqueViews = data.totalUniqueVisitorsCount;
          	admin.totalCount = data.totalVisitorsCount;
          }
        })
    
    $scope.chooseTemplate = function(e) { 
        $(".adminMenu label").removeClass("active");
        $(e.target).addClass("active");
        $(".tabbedPane").find("> div").removeClass("show hide").addClass("hide");
        $(".tabbedPane").find("."+$(e.target).attr("id")).removeClass("hide").addClass("show");
        
        if(e.target.id === 'ordermanagement' && !$scope.orderList){
            OrderDetailService.getOrderList().then(function(data){
                $scope.orderList = data.orderList;
            });
        } else if (e.target.id === 'subscriber' && !$scope.subscriberData){
            UserService.GetAll( PRODUCTDATA_URL + '/admin/subscribers').then(function(data) {
                $scope.subscriberData = data;
            })
        } else if (e.target.id === 'promomailgenerator' && !$scope.promomailgenerator){
            UserService.GetAll( PRODUCTDATA_URL + '/admin/promoMails').then(function(data) {
                $scope.promomailgenerator = true;
                $scope.subject = data.subject;
                $scope.id = data.id;
                CKEDITOR.instances.haastikaeditor.setData(data.content);
            })
        }

    };

    $scope.logout = function() {
        // reset login status
        AuthenticationService.ClearCredentials();
        window.localStorage.setItem("accessToken", "");
        window.sessionStorage.setItem("checkoutState", '{"login": false, "address": false, "order": false, "payment": false }');
        window.userDetails = {"name": "Guest","imageUrl": "","user": null};
        $state.go('home');
    };
    
  })
;
