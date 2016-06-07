'use strict';

angular.module('eCommerce')
  .controller('AdminCtrl', function ($scope, $rootScope, $http, $timeout, UserService, $cookieStore, SERVICE_URL) {
    var admin = this;
    
    // UserService.GetAll( BASE_URI + '/eCommerce/home.json')
    UserService.GetAll( SERVICE_URL + '/visitors')
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
    
  })
;
