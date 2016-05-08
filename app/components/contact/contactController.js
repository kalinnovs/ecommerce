'use strict';

angular.module('eCommerce')
  .controller('ContactCtrl', function ($scope, $timeout, $location, $http, $rootScope, UserService, BASE_URI) {
    var contacts = this;
    var original = $scope.user;

    // $rootScope.navigation = UserService.get().data.pageNavigation.categories;
    
    // function to submit the form after all validation has occurred            
    $scope.submitForm = function() {

        var mailService = "http://haastika.com/app/app.sendFeedback.php";
        // check to make sure the form is completely valid
        if ($scope.userForm.$valid) {
            $http({
              method: 'POST',
              url: mailService,
              data: contacts.user,
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(function successCallback(data, status) {
                contacts.feedbackSent = data.data.status;
                contacts.pushNotification = data.data.message;
                contacts.sentSuccesfully = data.data.sentSuccesfully;
                contacts.sentFailed = data.data.sentFailed;
                contacts.user={id:null,firstName:'',lastName:'',emailId:'',contactNo:''};
                $scope.userForm.$setPristine();
                $timeout(function() {
                  $location.path( "/home" );
                }, 3000);
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
            // $http.post(mailService, contacts.user).success(function(data, status) {
            //     contacts.feedbackSent = data.status;
            //     contacts.pushNotification = data.message;
            //     contacts.sentSuccesfully = data.sentSuccesfully;
            //     contacts.sentFailed = data.sentFailed;
            //     contacts.user={id:null,firstName:'',lastName:'',emailId:'',contactNo:''};
            //     $scope.userForm.$setPristine();
            //     $timeout(function() {
            //       $location.path( "/home" );
            //     }, 3000);
            //     // $scope.reset();
            // });
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
