'use strict';

angular.module('eCommerce')
  .controller('SubscriberCtrl', function ($scope, $rootScope, $location, $timeout, UserService, $http, SERVICE_URL) {
    var subscriber = this;
    var scoper = $scope;
    // debugger;
    window.dataLoaded = false;

    UserService.GetAll( SERVICE_URL + '/subscribers')
        .then(function(data) {
          // debugger;
          subscriber.data = data;
          // $scope.$broadcast('dataloaded');
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
        data.promoUsed = $(event.target).parents("tr").find(".promocode").html();
        UserService.Update( SERVICE_URL + '/admin/updateSubscriber', data)
        .then(function(data) {
          debugger;
        })
        .catch(function(error) {
            //
        })
        .finally(function() {
            //
        })

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
