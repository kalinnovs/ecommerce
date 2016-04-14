'use strict';

angular.module('eCommerce')
  .controller('categoryCtrl', function ($scope, UserService, BASE_URI) {
    var cat = this;
    var scoper = $scope;

    UserService.GetAll( BASE_URI + 'eCommerce/categories.json')
        .then(function(data) {
          cat.data = data;
          scoper.navigation = data.Navigation;
        })
        .catch(function(error) {
            //
        })
        .finally(function() {
            //
        })
    // debugger;
  })
;
