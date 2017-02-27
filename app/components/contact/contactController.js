'use strict';

angular.module('eCommerce')
  .controller('ContactCtrl', function ($scope, $timeout, $location, $http, $rootScope, SERVICE_URL, PRODUCTDATA_URL, UserService, BASE_URI) {
    var contacts = this;
    var original = $scope.user;
    
    // function to submit the form after all validation has occurred            
    $scope.submitForm = function() {

        var mailService = PRODUCTDATA_URL+"/sendfeedback";
        // check to make sure the form is completely valid
        if ($scope.userForm.$valid) {
            $http({
              method: 'POST',
              url: mailService,
              data: contacts.user,
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(function successCallback(data, feedbackSuccessful) {
                contacts.feedbackSent = data.data.feedbackSuccessful;
                contacts.pushNotification = data.data.feedbackMessage;
                contacts.sentSuccesfully = data.data.feedbackSuccessful;
                contacts.sentFailed = data.data.sentFailed;
                contacts.user={id:null,name:'',company:'',emailId:'',message:''};
                $scope.userForm.$setPristine();
                $timeout(function() {
                  $location.path( "/" );
                }, 3000);
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
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
