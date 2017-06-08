'use strict';

angular.module('eCommerce')
  .service('AdminService', ['$http', 'ENDPOINT_URI', function ($http, ENDPOINT_URI) {
    var service = this;
    //to create unique contact id
    var uid = 1;
      
    //simply returns the contacts list
    service.list = function () {
        return service.contacts;
    }


    service.extract = function(result) {
    	return result.data;
    }

    service.getURL = function() {
    	return ENDPOINT_URI + "assets/json/default.json";
    }

    //simply returns the contacts list
    service.all = function () {
        return $http.get(service.getURL()).then(service.extract);
    }

    service.getFromURL = function(url) {
        return $http.get(url).then(service.extract);
    }

    service.getProductTree = function() {
        return $http.get('assets/json/productTree.json').then(function (response) {
            return response.data;
        });
    }


  }]);