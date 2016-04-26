'use strict';

angular.module('eCommerce')
  .controller('ContactCtrl', function ($scope, $rootScope, UserService, BASE_URI) {
    var contact = this;
    
    UserService.GetAll( BASE_URI + '/eCommerce.json')
        .then(function(data) {
            $rootScope.navigation = data.Navigation;
        })
        .catch(function(error) {
            //
        })
        .finally(function() {
            //
        })
    
    // function to submit the form after all validation has occurred            
    $scope.submitForm = function() {

        // check to make sure the form is completely valid
        if ($scope.userForm.$valid) {
            alert('our form is amazing');
        }

    };


  })
;
