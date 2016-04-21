'use strict';

angular.module('eCommerce')
  .controller('RegisterCtrl', function ($scope, $location, UserService, $http, BASE_URI, $firebaseObject) {
        var register = this;
        var scoper = $scope;

        // debugger;

        UserService.GetAll( BASE_URI + '/eCommerce/register.json')
            .then(function(data) {
              scoper.navigation = data.Navigation;
            })
            .catch(function(error) {
                //
            })
            .finally(function() {
                //
            });
        
        this.register = function() {
            // var ip = JSON.parse(this.get('http://ifconfig.me/all.json'));
            // var ip2 = UserService.GetAll('http://ifconfig.me/all.json').then(function(data) { debugger; register.form.ip = data; })
            // debugger;
            // register.user.ip = "24.6.52.174";



            /* Firebase profile entry code for time being STARTS */

            // var ref = new Firebase(BASE_URI+ "/eCommerce/register/registeration");
            // var newMessageRef = ref.push();
            //     newMessageRef.set(register.user);
            // var path = newMessageRef.toString();

            /* Firebase profile entry code for time being ENDS */

            /* Real Time Service STARTS */
            var url = "http://ec2-52-32-195-43.us-west-2.compute.amazonaws.com/HaastikaWebService/saveNewUserSubscription";
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
