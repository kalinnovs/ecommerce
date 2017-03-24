'use strict';

angular.module('eCommerce')
  .controller('aboutCtrl', ['$scope', '$rootScope', '$sce', 'UserService', '$timeout', 'AboutService', 'PRODUCTDATA_URL', 'BASE_URI', 
    function ($scope, $rootScope, $sce, UserService, $timeout, AboutService, PRODUCTDATA_URL, BASE_URI) {
    var about = this;
    var scoper = $scope;
    
    AboutService.getFromURL( PRODUCTDATA_URL + '/aboutus')
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
  }])
.filter('html', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
}]);
