'use strict';
 
var LoginCtrl = function ($scope, $rootScope, $state, $timeout, $http, $location, $stateParams, LoginService, PRODUCTDATA_URL, AuthenticationService, Facebook, Google, user) {
        // reset login status
        AuthenticationService.ClearCredentials();
        $rootScope.navigation = (window.sessionStorage.navigation) ? JSON.parse(window.sessionStorage.navigation) : [];
        this.state = "login";
        this.header = "Login Haastika";
        var that = this,
        loginStatus = user;

        // Login Status Check
        if(loginStatus.success === true) {
            var emptyUser = {"name": "Guest","imageUrl": "","user": null};
            debugger;
            window.userDetails = window.userDetails || emptyUser;
            $state.go('home');
        } else {
            // Else pick local JSON
            window.sessionStorage.setItem('userDetails', JSON.stringify({"name": "Guest","imageUrl": "","user": null}));
        }

        if ($stateParams.uid) {
            this.uid = $stateParams.uid;
            AuthenticationService.validateUid(this.uid, function(response) {

                $scope.dataLoading = false;
                if(response.success) {
                    this.state = "resetPwd";
                    this.header = "Reset Password";
                } else {
                    $scope.resetPwdError = response.message;
                }
            }.bind(this));
        }

        this.login = function () {
            $scope.dataLoading = true;
            $scope.state = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                if(response.success) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    // $location.path('/admin');
                    $location.path('/home');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };

        $scope.info = {};

        $rootScope.$on("fb_statusChange", function (event, args) {
            $rootScope.fb_status = args.status;
            $rootScope.$apply();
        });
        $rootScope.$on("fb_get_login_status", function () {
            Facebook.getLoginStatus();
        });
        $rootScope.$on("fb_connected", function (event, args) {
            window.fbConnected = true;
        });

        $scope.fblogin = function () {
            $timeout(function () {
                Facebook.login();
            }, 100, false);
        };

        $scope.logout = function () {
            Facebook.logout();
            $rootScope.session = {};
            // window.localStorage.setItem("accessToken", "");
            window.fbConnected = false;
            //make a call to a php page that will erase the session data
            // $http.post("php/logout.php");
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
        };

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

        };

        this.requestPwd = function requestPwd() {
            $scope.dataLoading = true;

            AuthenticationService.requestResetPassword($scope.user.emailId, function(response) {
                $scope.dataLoading = false;
                if(response.success) {
                    $scope.resetPwdSuccess = response.message;
                } else {
                    $scope.resetPwdError = response.message;
                }
            });
        };

        this.resetPwd = function resetPwd() {
            $scope.dataLoading = true;

            AuthenticationService.resetPassword(this.uid, $scope.user, function(response) {
                $scope.dataLoading = false;
                if(response.success) {
                    $scope.resetPwdSuccess = response.message;
                    this.state = "login";
                    this.header = "Login Haastika";
                } else {
                    $scope.resetPwdError = response.message;
                }
            }.bind(this));
        };

        /* Google Authentication code goes here */
        $scope.googleHandleAuthClick = function() {
            Google.login();
        };

        $scope.googleLogout = function() {
            Google.logout();
            $rootScope.session = {};
        };

        $rootScope.$on("google_statusChange", function (event, args) {
            debugger;
        });
    };

LoginCtrl.$inject = ['$scope', '$rootScope', '$state', '$timeout', '$http', '$location', '$stateParams', 'LoginService', 'PRODUCTDATA_URL', 'AuthenticationService', 'Facebook', 'Google', 'user'];
angular.module('eCommerce').controller('LoginCtrl', LoginCtrl); 