'use strict';

angular.module('eCommerce')
  .service('productTreeService', ['$http', 'Upload', function ($http, Upload) {
    var service = this;
    // var BASE_URL = "http://ec2-52-33-88-59.us-west-2.compute.amazonaws.com/HaastikaWebService/admin";
    // var BASE_URL = "http://ec2-52-32-195-43.us-west-2.compute.amazonaws.com/HaastikaWebService/admin";
    var BASE_URL = "http://107.180.73.220/HaastikaWebService/admin";
    // var BASE_URL = "assets/json/productTree.json";
    // var BASE_URL = 'http://127.0.0.1:8081';

    //simply returns the category list
    service.list = function () {
        return $http.get(BASE_URL + "/category"); // BASE_URL + " /category"
    }

    service.saveNode = function (url, node, callBack) {
        $http({
            method: 'POST',
            url: BASE_URL + url,
            data: JSON.stringify(node),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(data) {
            debugger;
            callBack(data);
        }, function errorCallback(response) {
            console.log("Error in saving.");
        });

        // return $http.post("http://107.180.73.220/HaastikaWebService/admin" + "/saveCategory", JSON.stringify(category));
    }

    // service.saveProduct = function (product) {
    //     $http({
    //         method: 'POST',
    //         url: "http://107.180.73.220/HaastikaWebService/admin/saveProduct",
    //         data: JSON.stringify(product),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(function successCallback(data, status) {
    //         console.log("Product Saved.");
    //     }, function errorCallback(response) {
    //     // called asynchronously if an error occurs
    //     // or server returns response with an error status.
    //     });
    //     // return $http.post(BASE_URL + "/saveProduct", JSON.stringify(product));
    // }

    service.uploadImage = function(url, imageData, callBack){
        Upload.upload({
            url: BASE_URL + url,
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