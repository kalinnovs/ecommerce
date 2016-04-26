'use strict';

angular.module('eCommerce')
  .controller('RegisterCtrl', function ($scope, $rootScope, $location, UserService, $http, BASE_URI, SERVICE_URL, $firebaseObject) {
        var register = this;
        var scoper = $scope;

        // debugger;

        UserService.GetAll( BASE_URI + '/eCommerce/register.json')
            .then(function(data) {
              $rootScope.navigation = data.Navigation;
            })
            .catch(function(error) {
                //
            })
            .finally(function() {
                //
            });
        
        this.register = function() {
            
            /* Firebase profile entry code for time being STARTS */

            // var ref = new Firebase(BASE_URI+ "/eCommerce/register/registeration");
            // var newMessageRef = ref.push();
            //     newMessageRef.set(register.user);
            // var path = newMessageRef.toString();

            /* Firebase profile entry code for time being ENDS */

            /* Real Time Service STARTS */
            var url = SERVICE_URL+"/saveNewUserSubscription";
            // var url = "http://17.168.50.8:8080/HaastikaDataService/saveNewUserSubscription";
            $http.post(url, register.user).success(function(data, status) {
                if(data.subscribedSuccesfully) {
                    register.subscribedSuccesfully = true;
                    register.subscribedFailed = false;
                    register.pushNotification = data.subscriptionMessage;
                } else {
                    register.subscribedFailed = true;
                    register.subscribedSuccesfully = false;
                    register.pushNotification = data.errorMessage;
                }
            })


            localStorage.registeredIp = "24.6.52.174";
            // $location.path( "/home" );
        };
    
    })
;
