'use strict';

angular.module('eCommerce')
  .controller('DetailCtrl', function ($scope, $rootScope, $sce, UserService, DetailService, SERVICE_URL, BASE_URI, $stateParams) {
    var details = this;
    

    // DetailService.getFromURL( BASE_URI + '/eCommerce/productDetails.json')
    // $rootScope.navigation = UserService.get().data.pageNavigation.categories;
    DetailService.getFromURL( SERVICE_URL + '/product/'+$stateParams.id)
        .then(function(data) {
            $scope.data = data.productDetails;
            if(data.pageNavigation) {
                $rootScope.navigation = data.pageNavigation.categories;     
            } else if ( UserService.get()) {
                $rootScope.navigation = UserService.get().data.pageNavigation.categories;
            }
            // $scope.htmlDescription = data.productDescription; 
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
