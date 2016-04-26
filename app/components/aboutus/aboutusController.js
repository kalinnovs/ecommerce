'use strict';

angular.module('eCommerce')
  .controller('aboutCtrl', function ($scope, $rootScope, $sce, UserService, BASE_URI) {
    var about = this;
    var scoper = $scope;

    UserService.GetAll( BASE_URI + 'eCommerce/aboutUs.json')
        .then(function(data) {
          $rootScope.navigation = data.Navigation;
          $scope.htmlDescription = data.content;
        })
        .catch(function(error) {
            //
        })
        .finally(function() {
            //
        })
    // debugger;

    $scope.getHtml = function(html){
        return $sce.trustAsHtml(html);
    };
  })
.filter('html', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});
