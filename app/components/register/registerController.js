'use strict';

angular.module('eCommerce')
  .controller('RegisterCtrl', function ($scope, $rootScope, $location, UserService, $http, BASE_URI, SERVICE_URL, $firebaseObject) {
        var register = this;
        var scoper = $scope;

        // debugger;

        // $rootScope.navigation = UserService.get().data.pageNavigation.categories;
        
        this.register = function() {
            
            /* Firebase profile entry code for time being STARTS */

            // var ref = new Firebase(BASE_URI+ "/eCommerce/register/registeration");
            // var newMessageRef = ref.push();
            //     newMessageRef.set(register.user);
            // var path = newMessageRef.toString();

            /* Firebase profile entry code for time being ENDS */

            /* Real Time Service STARTS */
            var url = SERVICE_URL+"/saveNewUserSubscription";
            var mailService = "http://kalinnovs.com/ecommerce/app/app.sendMail.php";
            
            $http.post(url, register.user).success(function(data, status) {
                if(data.subscribedSuccesfully) {
                    register.pushNotification = data.subscriptionMessage;
                    register.subscribedFailed = false;
                    $http.post(mailService, register.user).success(function(data, status) {
                        register.subscribedSuccesfully = true;
                    });
                } else {
                    register.subscribedFailed = true;
                    register.subscribedSuccesfully = false;
                    register.pushNotification = data.errorMessage;
                }
            });

            // register.user = {};
            register.user={id:null,firstName:'',lastName:'',emailId:'',contactNo:''};
            $scope.form.$setPristine();
            // $location.path( "/home" );
        };
    
    })
;
