var app = angular.module('FacebookProvider', []);
app.factory('Facebook', function ($rootScope, $http, $state) {
    return {
        getLoginStatus:function () {
            FB.getLoginStatus(function (response) {
                $rootScope.$broadcast("fb_statusChange", {'status':response.status});
            }, true);
        },
        login:function () {
            FB.getLoginStatus(function (response) {
                switch (response.status) {
                    case 'connected':
                        $rootScope.$broadcast('fb_connected', {facebook_id:response.authResponse.userID});
                        break;
                    case 'not_authorized':
                    case 'unknown':
                        FB.login(function (response) {
                            if (response.authResponse) {
                                $http({
                                    method: 'GET',
                                    url: 'http://haastika.com:8080/HaastikaDataService/authenticate/login/facebook',
                                    params: {'token': response.authResponse.accessToken}
                                }).then(function successCallback(response) {
                                    window.localStorage.accessToken = response.data.token;
                                    $state.go('home');
                                    // Pass param "X-Auth-Token" with token received from JAVA
                                }, function errorCallback(response) {
                                    console.log("Error in saving.");
                                });
                            } else {
                                $rootScope.$broadcast('fb_login_failed');
                            }
                        }, {scope:'read_stream, publish_stream, email'});
                        break;
                    default:
                        FB.login(function (response) {
                            if (response.authResponse) {
                                $rootScope.$broadcast('fb_connected', {facebook_id:response.authResponse.userID});
                                $rootScope.$broadcast('fb_get_login_status');
                            } else {
                                $rootScope.$broadcast('fb_login_failed');
                            }
                        });
                        break;
                }
            }, true);
        },
        logout:function () {
            FB.logout(function (response) {
                if (response) {
                    $rootScope.$broadcast('fb_logout_succeded');
                } else {
                    $rootScope.$broadcast('fb_logout_failed');
                }
            });
        },
        unsubscribe:function () {
            FB.api("/me/permissions", "DELETE", function (response) {
                $rootScope.$broadcast('fb_get_login_status');
            });
        }
    };
});
