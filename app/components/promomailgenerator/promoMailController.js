'use strict';

angular.module('eCommerce')
  .controller('PromoMailCtrl', function ($scope, $rootScope, $location, $timeout, UserService, $http, SERVICE_URL, PRODUCTDATA_URL) {
    var mail = this;
    var scoper = $scope;
    
    window.dataLoaded = false;

    $scope.getPromoEmail = function() {
        UserService.GetAll( PRODUCTDATA_URL + '/admin/promoMails')
        .then(function(data) {
          //subscriber.data = data;
          scoper.subject = data.subject;
          scoper.id = data.id;
          CKEDITOR.instances.haastikaeditor.setData(data.content);
        })
        .catch(function(error) {
            //
        })
        .finally(function() {
            //
        })
    }

    $scope.savePromoEmail = function(elem) {
        var data = {};
        data.content = CKEDITOR.instances.haastikaeditor.getData();
        $http({
              method: 'POST',
              url: PRODUCTDATA_URL + '/admin/savePromoMailContent',
              data: data,
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(function successCallback(data, status) {
                debugger;
            });

    };
    $scope.sendPromoEmail = function(elem) {
        var data = {};
        data.content = CKEDITOR.instances.haastikaeditor.getData();
        data.subject = scoper.subject;
        data.id = scoper.id;
        $http({
              method: 'POST',
              url: PRODUCTDATA_URL + '/admin/sendPromoMail',
              data: data,
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(function successCallback(data, status) {
                $rootScope.$broadcast("updateFlash", {"alertType": "success", "delay": 10, "message": data.data.errorMessage});
            });

    };
});
