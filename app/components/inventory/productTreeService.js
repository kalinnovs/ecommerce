'use strict';

angular.module('eCommerce')
  .service('productTreeService', ['$http', 'SERVICE_URL', function ($http, SERVICE_URL) {
    var service = this;
    var BASE_URL = SERVICE_URL + "/admin";
    // var BASE_URL = "http://17.168.48.250:8080/HaastikaDataService/admin";
    // var BASE_URL = "assets/json/productTree.json";
    // var BASE_URL = 'http://127.0.0.1:8081';

    //simply returns the category list
    service.list = function () {
        return $http.get(BASE_URL + "/categorytree"); // + "/categorytree"
    }

    service.savecategory = function (category) {
        return $http.post(BASE_URL + "/savecategory", JSON.stringify(category));
    }

    service.saveProduct = function (category) {
        return $http.post(BASE_URL + "/saveproduct", JSON.stringify(category));
    }
}]);