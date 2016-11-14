'use strict';

angular.module('eCommerce')
  .controller('DetailCtrl', function ($scope, $rootScope, $sce, $timeout, $state, UserService, DetailService, SERVICE_URL, PRODUCTDATA_URL, BASE_URI, $stateParams) {
    var details = this;
    

    // DetailService.getFromURL( BASE_URI + '/eCommerce/productDetails.json')
    // $rootScope.navigation = UserService.get().data.pageNavigation.categories;
    DetailService.getFromURL( SERVICE_URL + '/product/'+$stateParams.id)
        .then(function(data) {
            if(jQuery.isEmptyObject(data.productDetails)) {
                $state.go('home');
            }
            $scope.data = data.productDetails;
            if(data.pageNavigation) {
                $rootScope.navigation = data.pageNavigation.categories;
            } else if ( UserService.get()) {
                $rootScope.navigation = UserService.get().data.pageNavigation.categories;
            }
            $scope.$broadcast('dataloaded');
            // $scope.htmlDescription = data.productDescription; 
        })
        .catch(function(error) {
            //
        })
        .finally(function() {
            //
        });


    $scope.getHtml = function(html){
        return $sce.trustAsHtml(html);
    };

    $scope.$on('dataloaded', function() {
        $timeout(function () { 
            window.dataLoaded = true;
            $('#zoomable').addimagezoom({ rootElement: '.detailsPage'});
        }, 100, false);
    });
  })
  

.filter('html', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});
