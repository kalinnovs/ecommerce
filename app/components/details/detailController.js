'use strict';

angular.module('eCommerce')
  .controller('DetailCtrl', function ($scope, $sce, DetailService, BASE_URI, $stateParams) {
    var details = this;
    

    DetailService.getFromURL( BASE_URI + '/eCommerce/details/' + $stateParams.id + '.json')
        .then(function(data) {
            $scope.details = data;
            $scope.htmlDescription = data.details; 
        })
        .catch(function(error) {
            //
        })
        .finally(function() {
            //
            setTimeout(function() { 
                $("#zoomable").elevateZoom();
            }, 2000);
            
        });


    $scope.imageChanger = function(src) {
        $(".product-gallery figure img").attr("src", src);
        $(".product-gallery figure img").attr("data-zoom-image", src);
        setTimeout(function() { 
                $("#zoomable").elevateZoom();
            }, 2000);
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
