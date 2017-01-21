'use strict';

angular.module('eCommerce')
  .controller('AdminCtrl', function ($scope, $rootScope, $http, $state, $timeout, UserService, $cookies, SERVICE_URL, PRODUCTDATA_URL, AuthenticationService) {
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
