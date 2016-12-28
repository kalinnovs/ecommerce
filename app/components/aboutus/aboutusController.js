'use strict';

angular.module('eCommerce')
  .controller('aboutCtrl', function ($scope, $rootScope, $sce, UserService, $timeout, AboutService, SERVICE_URL, BASE_URI) {
    var about = this;
    var scoper = $scope;
    // Scoping Navigation
    $rootScope.navigation = (window.sessionStorage.navigation) ? JSON.parse(window.sessionStorage.navigation) : [];
    // AboutService.GetAll( BASE_URI + 'eCommerce/aboutUs.json')
    AboutService.getFromURL( SERVICE_URL + '/aboutus')
        .then(function(data) {
          $scope.htmlDescription = data.content;
          $scope.$broadcast('dataloaded');
        })
        .catch(function(error) {
            //
        })
        .finally(function() {
            //
        })
    // debugger;

    $scope.$on('dataloaded', function() {
        $timeout(function () { 
            window.dataLoaded = true;
        }, 100, false);
    });
    
    $scope.getHtml = function(html){
        return $sce.trustAsHtml(html);
    };
  })
.filter('html', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});
