'use strict';

angular.module('eCommerce')
  .controller('categoryCtrl', function ($scope, $rootScope, UserService, BASE_URI) {
    var cat = this;
    var scoper = $scope;

    UserService.GetAll( BASE_URI + 'eCommerce/categories.json')
        .then(function(data) {
          cat.data = data;
          $rootScope.navigation = data.Navigation;
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


  })
;
