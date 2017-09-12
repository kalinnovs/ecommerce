'use strict';

angular.module('eCommerce')
  .service('productTreeService', ['$http', 'Upload', 'PRODUCTDATA_URL', function ($http, Upload, PRODUCTDATA_URL) {
    var service = this;
    // var BASE_URL = "http://ec2-52-33-88-59.us-west-2.compute.amazonaws.com/HaastikaWebService/admin";
    // var BASE_URL = "http://ec2-52-32-195-43.us-west-2.compute.amazonaws.com/HaastikaWebService/admin";
    // var BASE_URL = "http://107.180.73.220/HaastikaWebService/admin";
    // var BASE_URL = "assets/json/productTree.json";
    var BASE_URL = 'http://107.180.66.21//HaastikaWebService/admin';

    //simply returns the category list
    service.list = function () {
        return $http.get("assets/json/productTree.json");
    }

    service.saveNode = function (url, node, callBack) {
        var service = this;
        $http({
            method: 'POST',
            url: PRODUCTDATA_URL + url,
            data: JSON.stringify(node),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(data) {
            service.generatejson();
            callBack(data);
        }, function errorCallback(response) {
            console.log("Error in saving.");
        });
    }

    service.deleteNode = function (url, callBack) {
        var service = this;
        $http({
            method: 'GET',
            url: PRODUCTDATA_URL + url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(data) {
            service.generatejson();
            callBack(data);
        }, function errorCallback(response) {
            console.log("Error in saving.");
        });
    }

    service.uploadImage = function(url, imageData, callBack){
        var service = this;
        Upload.upload({
            url: PRODUCTDATA_URL + url,
            data: imageData
        }).then(function (resp) {
            service.generatejson();
            callBack(resp);
        }, function (resp) {
            console.log('Error status: ' + resp);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    }

    service.generatejson = function(){
        $http({
            method: 'GET',
            url: PRODUCTDATA_URL + '/admin/generatejson',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(data) {
            console.log("New JSON generated.");
        }, function errorCallback(response) {
            console.log("Error in saving.");
        });
    }

    service.setDefaultImage = function(productId, productImageId) {
        $http({
            method: 'GET',
            url: PRODUCTDATA_URL + '/admin/setdefaultimage/'+productId+'/'+productImageId
        }).then(function (resp) {
            if(resp.data.operationStatus) {
                service.generatejson();    
            }
        });
    }

}]);