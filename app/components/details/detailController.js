'use strict';

angular.module('eCommerce')
  .controller('DetailCtrl', function ($scope, $rootScope, $sce, DetailService, BASE_URI, $stateParams) {
    var details = this;
    

    DetailService.getFromURL( BASE_URI + '/eCommerce/productDetails.json')
        .then(function(data) {
            $scope.data = data;
            $rootScope.navigation = data.Navigation;
            $scope.htmlDescription = data.details.productDescription; 
        })
        .catch(function(error) {
            //
        })
        .finally(function() {
            
            
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
