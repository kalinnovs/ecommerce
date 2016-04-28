'use strict';

angular.module('eCommerce')
  .controller('aboutCtrl', function ($scope, $rootScope, $sce, UserService, AboutService, SERVICE_URL, BASE_URI) {
    var about = this;
    var scoper = $scope;

    // $rootScope.navigation = UserService.get().data.pageNavigation.categories;
    // AboutService.GetAll( BASE_URI + 'eCommerce/aboutUs.json')
    AboutService.getFromURL( SERVICE_URL + '/aboutus')
        .then(function(data) {
          $rootScope.navigation = data.pageNavigation.categories; 
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
