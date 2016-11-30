'use strict';
 
 var LoginCtrl = function ($scope, $rootScope, $timeout, $http, $location, PRODUCTDATA_URL, AuthenticationService, Facebook) {
        // reset login status
        AuthenticationService.ClearCredentials();
        $rootScope.navigation = (window.sessionStorage.navigation) ? JSON.parse(window.sessionStorage.navigation) : [];

        this.login = function () {
            $scope.dataLoading = true;
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

        $scope.info = {};

        $rootScope.$on("fb_statusChange", function (event, args) {
            $rootScope.fb_status = args.status;
            $rootScope.$apply();
        });
        $rootScope.$on("fb_get_login_status", function () {
            Facebook.getLoginStatus();
        });
        $rootScope.$on("fb_login_failed", function () {
            console.log("fb_login_failed");
        });
        $rootScope.$on("fb_logout_succeded", function () {
            console.log("fb_logout_succeded");
            $rootScope.id = "";
        });
        $rootScope.$on("fb_logout_failed", function () {
            console.log("fb_logout_failed!");
        });

        $rootScope.$on("fb_connected", function (event, args) {
            
        });

        $scope.fblogin = function () {
            $timeout(function () {
                Facebook.login();
            }, 100, false);
        };

        $scope.logout = function () {
            Facebook.logout();
            $rootScope.session = {};
            //make a call to a php page that will erase the session data
            // $http.post("php/logout.php");
        };
    };

LoginCtrl.$inject = ['$scope', '$rootScope', '$timeout', '$http', '$location', 'PRODUCTDATA_URL', 'AuthenticationService', 'Facebook'];
angular.module('eCommerce').controller('LoginCtrl', LoginCtrl); 