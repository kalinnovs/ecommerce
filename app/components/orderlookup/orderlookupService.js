'use strict';

angular.module('eCommerce')
  .service('OrderService', ['$q', '$http', 'ENDPOINT_URI', 'PRODUCTDATA_URL', 'checkoutStorage', function ($q, $http, ENDPOINT_URI, PRODUCTDATA_URL, checkoutStorage) {
    var service = this;
    //to create unique contact id
    var uid = 1;

    service.getItems = function(obj) {
        var deferred = $q.defer();
        // Read Cart Array and pass to URL
        var objectToSerialize = {};
            objectToSerialize[obj[1].name] = obj[1].value;

        return $http({
                method: 'GET',
                url: PRODUCTDATA_URL + '/order/guest/' + obj[0].value,
                params: objectToSerialize
            }).then(function successCallback(response) {
                deferred.resolve(response.data)
                return deferred.promise;
            }, function errorCallback(response) {
                console.log("Error in saving.");
            }); 
    } 

  }]);
