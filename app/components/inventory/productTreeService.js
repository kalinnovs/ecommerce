'use strict';

angular.module('eCommerce')
  .service('productTreeService', ['$http', 'Upload', 'SERVICE_URL', function ($http, Upload, SERVICE_URL) {
    var service = this;
    // var BASE_URL = "http://ec2-52-33-88-59.us-west-2.compute.amazonaws.com/HaastikaWebService/admin";
    // var BASE_URL = "http://ec2-52-32-195-43.us-west-2.compute.amazonaws.com/HaastikaWebService/admin";
    // var BASE_URL = "http://107.180.73.220/HaastikaWebService/admin";
    // var BASE_URL = "assets/json/productTree.json";
    var BASE_URL = 'http://107.180.66.21//HaastikaWebService/admin';

    //simply returns the category list
    service.list = function () {
        return $http.get(SERVICE_URL + "/admin/category"); // SERVICE_URL + " /category"
    }

    service.saveNode = function (url, node, callBack) {
        $http({
            method: 'POST',
            url: SERVICE_URL + url,
            data: JSON.stringify(node),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(data) {
            callBack(data);
        }, function errorCallback(response) {
            console.log("Error in saving.");
        });
    }

    service.deleteNode = function (url, callBack) {
        $http({
            method: 'POST',
            url: SERVICE_URL + url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(data) {
            callBack(data);
        }, function errorCallback(response) {
            console.log("Error in saving.");
        });
    }

    service.uploadImage = function(url, imageData, callBack){
        Upload.upload({
            url: SERVICE_URL + url,
            data: imageData
        }).then(function (resp) {
            callBack(resp);
        }, function (resp) {
            console.log('Error status: ' + resp);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    }


}]);