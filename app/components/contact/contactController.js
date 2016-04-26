'use strict';

angular.module('eCommerce')
  .controller('ContactCtrl', function ($scope, $http, $rootScope, UserService, BASE_URI) {
    var contacts = this;
    var original = $scope.user;
    
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

        var mailService = "http://kalinnovs.com/ecommerce/app/app.sendFeedback.php";
        // check to make sure the form is completely valid
        if ($scope.userForm.$valid) {
            $http.post(mailService, contacts.user).success(function(data, status) {
                contacts.feedbackSent = data.status;
                contacts.pushNotification = data.message;
                contacts.sentSuccesfully = data.sentSuccesfully;
                contacts.sentFailed = data.sentFailed;
                // $scope.reset();
            });
            // $scope.reset($scope.userForm);
        }   

    };

    $scope.reset = function(data) {
        data.name = ''; data.email = ''; data.company = ''; data.message = '';
        $scope.userForm.$dirty = false;
        $scope.userForm.$pristine = true;
        $scope.userForm.$submitted = false;
    };


  })
;
