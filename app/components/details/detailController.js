'use strict';

angular.module('eCommerce')
  .controller('DetailCtrl', function ($scope, $sce, DetailService, BASE_URI, $stateParams) {
    var details = this;
    

    DetailService.getFromURL( BASE_URI + '/eCommerce/productDetails.json')
        .then(function(data) {
            $scope.data = data;
            $scope.navigation = data.Navigation;
            // $scope.htmlDescription = data.details; 
        })
        .catch(function(error) {
            //
        })
        .finally(function() {
            
            
        });


    $scope.imageChanger = function(src) {
        debugger;
        $(".product-gallery figure img").attr("src", src);
        $(".product-gallery figure img").attr("data-zoom-image", src);
    }


    $scope.getHtml = function(html){
        return $sce.trustAsHtml(html);
    };
  })

.filter('html', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});
