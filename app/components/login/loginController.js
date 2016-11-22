'use strict';
 
angular.module('eCommerce')
.controller('LoginCtrl', ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
        // reset login status
        AuthenticationService.ClearCredentials();
        $rootScope.navigation = (window.sessionStorage.navigation) ? JSON.parse(window.sessionStorage.navigation) : [];
        this.state = "login";
        this.header = "Login Haastika"
        this.login = function () {
            $scope.dataLoading = true;
            $scope.state = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                if(response.success) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/admin');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };

        this.changeState = function(state) {
            this.state = state;
            if (this.state === "login") {
                this.header = "Login Haastika";
            } else if (this.state === "signUp") {
                this.header = "Signup Haastika";
            } else {
                this.header = "Reset Login Haastika";
            }
        }

        this.signUp = function signUp(e) {
            $scope.dataLoading = true;

            $scope.user.emailId = $scope.user.userName;
            AuthenticationService.signUp($scope.user, function(response) {
                $scope.dataLoading = false;
                if(response.success) {
                    console.info("Login success.");
                } else {
                    $scope.signUpError = response.message;
                }
            });

        }

        this.resetPwd = function resetPwd() {
            $scope.dataLoading = true;

            AuthenticationService.resetPassword($scope.user.emailId, function(response) {
                $scope.dataLoading = false;
                if(response.success) {
                    $scope.resetPwdSuccess = response.message
                } else {
                    $scope.resetPwdError = response.message;
                }
            });
        }
    }]
  )
;
