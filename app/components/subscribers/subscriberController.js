'use strict';

angular.module('eCommerce')
  .controller('SubscriberCtrl', function ($scope, $rootScope, $location, $timeout, UserService, $http, SERVICE_URL, PRODUCTDATA_URL) {
    var subscriber = this;
    var scoper = $scope;
    
    window.dataLoaded = false;

    UserService.GetAll( PRODUCTDATA_URL + '/admin/subscribers')
        .then(function(data) {
          subscriber.data = data;
        })
        .catch(function(error) {
            //
        })
        .finally(function() {
            //
        })

    $scope.approvePromo = function(elem) {
        var data = {};
        data.emailId = $(event.target).parents("tr").find(".email").html();
        data.promoCode = $(event.target).parents("tr").find(".promocode").html();
        data.promoUsed = !JSON.parse($(event.target).parents("tr").find(".promoUsed").val());
        $http({
              method: 'POST',
              url: PRODUCTDATA_URL + '/admin/updateSubscriber',
              data: data,
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(function successCallback(data, status) {
                debugger;
            });

        var className = $(elem.target).hasClass("fa-toggle-off");
        if(className) {
            $(elem.target).removeClass("fa-toggle-off").addClass("fa-toggle-on");
            $(elem.target).parents("tr").addClass("flash");
        } else {
            $(elem.target).removeClass("fa-toggle-on").addClass("fa-toggle-off");
            $(elem.target).parents("tr").removeClass("flash");
        }
    };



})    

;
