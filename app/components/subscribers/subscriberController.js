'use strict';

angular.module('eCommerce')
  .controller('SubscriberCtrl', function ($scope, $rootScope, $location, UserService, $http, SERVICE_URL) {
    var subscriber = this;
    var scoper = $scope;
    // debugger;

    UserService.GetAll( SERVICE_URL + 'subscribers')
        .then(function(data) {
          $rootScope.navigation = data.Navigation;
          subscriber.data = data;
        })
        .catch(function(error) {
            //
        })
        .finally(function() {
            //
        })

    $scope.approvePromo = function(elem) {
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
