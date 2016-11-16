'use strict';

angular.module('eCommerce')
  .controller('DetailCtrl', function ($scope, $rootScope, $sce, $timeout, $state, UserService, DetailService, SERVICE_URL, PRODUCTDATA_URL, BASE_URI, $stateParams) {
    var details = this;
    $scope.currentState = $state.params.id;
    

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

    $scope.openModal = function(ev) {
        debugger;
        var url = "https://www.facebook.com/dialog/feed?",
            params = {
            'app_id' : "1719553531700651",
            'display': 'popup',
            'caption': 'http://haastika.com/product/'+this.currentState,
            'link': 'http://haastika.com/product/'+this.currentState,
            'picture': 'http://haastika.com/'+this.data.productImageGallery[0].baseImagePath,
            'description': this.data.productDescription,
            'name': this.data.productName
        };
        window.open(url + $.param(params), "", "width=650,height=500");
        ev.stopPropagation();
    };

  })
  

.filter('html', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});
