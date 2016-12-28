'use strict';

angular.module('eCommerce')
  .controller('DetailCtrl', function ($scope, $rootScope, $sce, $timeout, $state, UserService, DetailService, SERVICE_URL, PRODUCTDATA_URL, BASE_URI, $stateParams) {
    var details = this;
    $scope.currentState = $state.params.id;
    // Scoping Navigation
    $rootScope.navigation = (window.sessionStorage.navigation) ? JSON.parse(window.sessionStorage.navigation) : [];
    
    DetailService.getFromURL( PRODUCTDATA_URL + '/productData/product/'+$stateParams.id)
        .then(function(data) {
            if(jQuery.isEmptyObject(data.productDetails)) {
                $state.go('home');
            }
            $scope.data = data.productDetails;
            $scope.$broadcast('dataloaded');
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

    $scope.openModal = function(ev) {
        var url = "https://www.facebook.com/dialog/feed?",
            params = {
            'app_id' : "1719553531700651",
            'caption': 'http://haastika.com/product/'+this.currentState,
            'link': 'http://haastika.com/product/'+this.currentState,
            'picture': 'http://haastika.com/'+this.data.productImageGallery[0].baseImagePath,
            'description': this.data.productDescription,
            'name': this.data.productName
        };
        window.open(url + $.param(params), "", "width=650,height=400");
        ev.stopPropagation();
    };

  })
  

.filter('html', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});
