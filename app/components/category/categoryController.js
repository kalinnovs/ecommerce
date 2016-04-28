'use strict';

angular.module('eCommerce')
  .controller('categoryCtrl', function ($scope, $rootScope, $sce, CategoryService, UserService, $stateParams, SERVICE_URL, BASE_URI) {
    var cat = this;
    var scoper = $scope;

    CategoryService.getFromURL( SERVICE_URL + '/category/'+$stateParams.id)
        .then(function(data) {
          cat.data = data;
          $rootScope.navigation = data.pageNavigation.categories; 
          // $scope.htmlDescription = data.productDescription; 
        })
        .catch(function(error) {
            //
        })
        .finally(function() {
            //
        })
    // debugger;

    $scope.showFilter = function(elem) {
      if($(".categoryTree").hasClass("show")) {
        $(".categoryTree").removeClass("show");
        $(".spacingAdjust").css("margin-left","0px");
      } else {
        $(".categoryTree").addClass("show");
        $(".spacingAdjust").css("margin-left","285px");  
      }
    };

    $scope.showList = function(elem) {
      $(elem.target).css('color', '#33adff');
      $(elem.target).parents(".listing").find(".spacingAdjust").addClass("listView");
    };

    $scope.showGrid = function(elem) {
      $(elem.target).css('color', '#000');
      $(elem.target).parents(".listing").find(".spacingAdjust").removeClass("listView");
    };

    $scope.getHtml = function(html){
        return $sce.trustAsHtml(html);
    };

  })
  .filter('html', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});
