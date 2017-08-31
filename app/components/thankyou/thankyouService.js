'use strict';

angular.module('eCommerce')
  .service('paymentService', ['$q', '$http', 'ENDPOINT_URI', 'PRODUCTDATA_URL', 'checkoutStorage', function ($q, $http, ENDPOINT_URI, PRODUCTDATA_URL, checkoutStorage) {
    var service = this;

    service.getExternalData = function(obj) {
        var deferred = $q.defer();
        // OrderNumber from window object
        var orderNumber = window.location.href.split("=")[1];

        return $http({
                method: 'GET',
                url: PRODUCTDATA_URL + '/order/status/' + orderNumber
            }).then(function successCallback(response) {
                deferred.resolve(response.data)
                return deferred.promise;
            }, function errorCallback(response) {
                console.log("Error in saving.");
            }); 
    } 

  }]);
