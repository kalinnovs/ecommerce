'use strict';

angular.module('eCommerce')
  .service('categoryService', ['$http', function ($http) {
    var service = this;
    // var BASE_URL = "http://ec2-52-32-195-43.us-west-2.compute.amazonaws.com/HaastikaWebService";
    var BASE_URL = "http://17.168.82.164:8080/HaastikaDataService"; //
    //simply returns the category list
    service.list = function () {
        return $http.get(BASE_URL + "/categoryadmin");
    }

    service.save = function (category) {
        return $http.post(BASE_URL + "/savecategory", JSON.stringify(category));
    }
}]);