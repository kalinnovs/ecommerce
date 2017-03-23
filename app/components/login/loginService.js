'use strict';
 
angular.module('eCommerce')
.factory('AuthenticationService', ['Base64', '$http', '$rootScope', '$timeout', 'PRODUCTDATA_URL','LoginService',
  function (Base64, $http, $rootScope, $timeout, PRODUCTDATA_URL,LoginService) {
    var service = {};

    service.Login = function (username, password, callback) {

        /* Use this for real authentication
         ----------------------------------------------*/
        var url = PRODUCTDATA_URL + '/authenticate/checklogin';
        var username = username, password = password;
        $http({
              method: 'POST',
              url: url,
              data: { emailId: username, password: password },
              headers: {
                'Content-Type': 'application/json'
              }
            })
           .then(function (response) {
                var response = (response.data === undefined || response.data === "") ? {} : response.data;
                if(response.token) {
                    response.success = true;
                    response.userType = response.userType;
                    window.localStorage.setItem("accessToken", response.token);
                    window.userDetails = response.loggedUser;
                    window.sessionStorage.setItem('cartLength', response.cartCount);
                    
                    var promise = LoginService.updateCartFromLocal();
                    promise.then(function() {
                        // Broadcast cart update to mini cart
                        $rootScope.$broadcast("updateMiniCartCount");
                    });
                }
                else {
                    response.message = 'Username or password is incorrect';
                }
                callback(response);
           });

    };

    service.SetCredentials = function (username, password, userType, imageurl = '') {
        var authdata = Base64.encode(username + ':' + password);

        $rootScope.globals = {
            currentUser: {
                username: username,
                authdata: authdata,
                userType: userType,
                imageURL: imageurl
            }
        };

        window.localStorage.setItem('globals', JSON.stringify($rootScope.globals));
        $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
    };

    service.ClearCredentials = function () {
        $rootScope.globals = {};
        window.localStorage.removeItem('globals');
        $http.defaults.headers.common.Authorization = 'Basic ';
    };

    service.validateToken = function() {
        return $http.get(PRODUCTDATA_URL + '/authenticate/validate').then(function (response) {
            return response.data;
        });
    };

    service.signUp = function (userObj, callback) {
        var url = PRODUCTDATA_URL + '/account/register';
        $http({
              method: 'POST',
              url: url,
              data: userObj,
              headers: {
                'Content-Type': 'application/json'
              }
            })
           .then(function (response) {
                response = response.data;
                if(response.token) {
                    response.success = true;
                    response.userType = response.userType;
                    window.localStorage.setItem("accessToken", response.token);
                    window.userDetails = response.loggedUser;
                }
                callback(response);
           });
    };

    service.requestResetPassword = function (emailId, callback) {
        var url = PRODUCTDATA_URL + '/account/sendResetlink?emailId=' + emailId;
        $http({
              method: 'GET',
              url: url,
              headers: {
                'Content-Type': 'application/json'
              }
            })
           .then(function (response) {
                callback(response.data);
           });
    };

    service.resetPassword = function (uid, userObj, callback) {
        var url = PRODUCTDATA_URL + '/account/reset-password/' + uid;
        $http({
              method: 'POST',
              url: url,
              data: userObj,
              headers: {
                'Content-Type': 'application/json'
              }
            })
           .then(function (response) {
                callback(response.data);
           });
    };


    service.validateUid = function (uid, callback) {
        var url = PRODUCTDATA_URL + '/account/isValidResetlink/' + uid;
        $http({
              method: 'GET',
              url: url,
              headers: {
                'Content-Type': 'application/json'
              }
            })
           .then(function (response) {
                callback(response.data);
           });
    };

    return service;
  }]
)
.factory('Facebook', ['$rootScope', '$http', '$state', 'PRODUCTDATA_URL', 'LoginService',  
  function ($rootScope, $http, $state, PRODUCTDATA_URL, LoginService) {
    // return {
    var facebook = {};
    facebook.getLoginStatus = function () {
        FB.getLoginStatus(function (response) {
            $rootScope.$broadcast("fb_statusChange", {'status':response.status});
        }, true);
    };
    facebook.login = function (return_url, onSuccess) {
        FB.getLoginStatus(function (response) {
            switch (response.status) {
                case 'connected':
                    $rootScope.$broadcast('fb_connected', {facebook_id:response.authResponse.userID});
                    $http({
                        method: 'GET',
                        url: PRODUCTDATA_URL + '/authenticate/login/facebook',
                        params: {'token': response.authResponse.accessToken}
                    }).then(function successCallback(response) {
                        window.localStorage.setItem("accessToken", response.data.token);
                        // Hardcoded 
                        // response.data.loggedUser.emailId = "pdwibedi@gmail.com";
                        window.userDetails = response.data.loggedUser;
                        window.sessionStorage.setItem('cartLength', response.data.cartCount);
                        
                        var promise = LoginService.updateCartFromLocal();
                        promise.then(function() {
                            // Broadcast cart update to mini cart
                            $rootScope.$broadcast("updateMiniCartCount");
                        });
                        if(onSuccess) {
                            onSuccess();
                        }
                        $state.go(return_url);
                    }, function errorCallback(response) {
                        console.log("Error in saving.");
                    });
                    break;
                case 'not_authorized':
                case 'unknown':
                    FB.login(function (response) {
                        if (response.authResponse) {
                            $http({
                                method: 'GET',
                                url: PRODUCTDATA_URL + '/authenticate/login/facebook',
                                params: {'token': response.authResponse.accessToken}
                            }).then(function successCallback(response) {
                                // Stores the access token for 30 sec and then resets automatically
                                window.localStorage.setItem("accessToken", response.data.token);
                                // Hardcoded 
                                // response.data.loggedUser.emailId = "pdwibedi@gmail.com";
                                window.userDetails = response.data.loggedUser;
                                window.sessionStorage.setItem('cartLength', response.data.cartCount);
                                
                                var promise = LoginService.updateCartFromLocal();
                                promise.then(function() {
                                    // Broadcast cart update to mini cart
                                    $rootScope.$broadcast("updateMiniCartCount");
                                });
                                if(onSuccess) {
                                    onSuccess();
                                }
                                $state.go(return_url);
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
    };
    facebook.logout = function () {
        FB.logout(function (response) {
            if (response) {
                $rootScope.$broadcast('fb_logout_succeded');
            } else {
                $rootScope.$broadcast('fb_logout_failed');
            }
        });
    };
    facebook.unsubscribe = function () {
        FB.api("/me/permissions", "DELETE", function (response) {
            $rootScope.$broadcast('fb_get_login_status');
        });
    };
    return facebook;
  }]
) 
.factory('Google', ['$rootScope', '$http', '$state', 'PRODUCTDATA_URL', 'LoginService', 
    function ($rootScope, $http, $state, PRODUCTDATA_URL, LoginService) {
        return {
            return_url: "",
            onSuccess: null,
            apiKey: 'AIzaSyDtSivbvsJStXeutrpQrul99gZTCjgP9Os',
            discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
            clientId: '102964097568-l2jpsbqv509crlh401md5h4pmihkd8di.apps.googleusercontent.com',
            scopes: 'profile',
            updateSigninStatus: function (isSignedIn) {
                var self = this;
                var accessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
                if(!accessToken) {
                    self.login(self.return_url, self.onSuccess);
                }
                if(isSignedIn) {
                    $http({
                        method: 'GET',
                        url: PRODUCTDATA_URL + '/authenticate/login/google',
                        params: {'token': accessToken}
                    }).then(function successCallback(response) {
                        window.localStorage.setItem("accessToken", response.data.token);
                        // Hardcoded 
                        // response.data.loggedUser.emailId = "pdwibedi@gmail.com";
                        window.userDetails = response.data.loggedUser;
                        window.sessionStorage.setItem('cartLength', response.data.cartCount);
                        
                        var promise = LoginService.updateCartFromLocal();
                        promise.then(function() {
                            // Broadcast cart update to mini cart
                            $rootScope.$broadcast("updateMiniCartCount");
                        });
                        if(self && self.onSuccess) {
                            self.onSuccess();
                        }
                        
                        window.setTimeout(function() {
                            var return_url = (self !== undefined) ? ((self.return_url) ? self.return_url : 'home') : 'home';
                            $state.go(return_url);    
                        }, 100);
                        
                    }, function errorCallback(response) {
                        console.log("Error in saving.");
                    });
                }
            },
            login: function (return_url, onSuccess) {
                this.return_url = return_url;
                this.onSuccess = onSuccess;
                if(onSuccess) { this.onSuccess = onSuccess; }
                if(gapi.auth2 && gapi.auth2.getAuthInstance()) {
                    var isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
                    if(isSignedIn) {
                        this.updateSigninStatus(isSignedIn);
                    } else {
                        gapi.auth2.getAuthInstance().signIn();    
                    }
                } else {
                    this.init();
                }
                
            },
            logout: function () {
                gapi.auth2.getAuthInstance().signOut();
            },
            // Load the API and make an API call.  Display the results on the screen.
            makeApiCall: function () {
                gapi.client.people.people.get({
                  resourceName: 'people/me'
                }).then(function(resp) {
                  var p = document.createElement('p');
                  var name = resp.result.names[0].givenName;
                  p.appendChild(document.createTextNode('Hello, '+name+'!'));
                  document.getElementById('content').appendChild(p);
                });
            },
            initClient: function(scope) {
                var self = scope;
                function gapiInit() {
                    gapi.client.init({
                        apiKey: self.apiKey,
                        discoveryDocs: self.discoveryDocs,
                        clientId: self.clientId,
                        scope: self.scopes
                    }).then(function () {
                      // Listen for sign-in state changes.
                      gapi.auth2.getAuthInstance().isSignedIn.listen(self.updateSigninStatus);
                      // Handle the initial sign-in state.
                      self.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
                    });        
                };

                if(!gapi.client) {
                    gapi.load('client', function() { 
                      gapiInit();
                    });
                } else {
                    gapiInit();
                }
            },
            init: function() {
                var self = this;
                gapi.load('client:auth2', function() {
                    self.initClient(self); 
                });
            }
        };
    }]
)
.factory('Base64', function () {
    /* jshint ignore:start */
 
    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
 
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
 
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
 
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
 
                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
 
            return output;
        },
 
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));
 
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
 
                output = output + String.fromCharCode(chr1);
 
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
 
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
 
            } while (i < input.length);
 
            return output;
        }
    };
 
    /* jshint ignore:end */
})
.service('LoginService', ['$http', 'ENDPOINT_URI', 'PRODUCTDATA_URL', function ($http, ENDPOINT_URI, PRODUCTDATA_URL) {
    var service = this;
    //to create unique contact id
    var uid = 1;

    //simply returns the contacts list
    service.list = function () {
        return service.contacts;
    }

    service.GetAll = function(url) {
        return $http.get(url).then(service.extract, service.handleError('Error getting all users'));
    }

    service.extract = function(result) {
        return result.data;
    }

    service.getURL = function() {
        return ENDPOINT_URI + "assets/json/default.json";
    }

    //simply returns the contacts list
    service.all = function () {
        return $http.get(service.getURL()).then(service.extract);
    }

    service.getFromURL = function(url) {
        return $http.get(url).then(service.extract);
    }

    service.handleError = function(res) {
        return function () {
            return { success: false, message: res.message };
        };
    }

    service.updateCartFromLocal = function() {
        var cartItems = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [],
            responseData,
            cartCount = 0,
            objectToSerialize= [];
        $.each(cartItems, function(i, val) {
            var obj = {};   
            obj["productId"] = parseInt((val.partNumber || val.productId).substr(4));
            obj["quantity"] = val.quantity;    
            cartCount+= parseInt(val.quantity);
            objectToSerialize.push(obj);
        });
        window.sessionStorage.setItem('cartLength', cartCount + ((window.sessionStorage.cartLength) ? parseInt(window.sessionStorage.cartLength) : 0));

        return $http({
                method: 'POST',
                url: PRODUCTDATA_URL + '/cart/convertToCart',
                data: JSON.stringify(objectToSerialize)
            }).then(function successCallback(response) {
                // debugger;
                window.sessionStorage.removeItem('itemsArray');
                return response.data;
            }, function errorCallback(response) {
                console.log("Error in saving.");
        }); 
    }
}]);