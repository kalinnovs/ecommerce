'use strict';

angular.module('eCommerce')
  .controller('RegisterCtrl', ['$scope', '$timeout', '$rootScope', '$location', 'UserService', '$http', 'BASE_URI', 'PRODUCTDATA_URL', function ($scope, $timeout, $rootScope, $location, UserService, $http, BASE_URI, PRODUCTDATA_URL) {
        var register = this;
        var scoper = $scope;
        
        $(".progress").hide();
        this.register = function() {
            
            /* Real Time Service STARTS */
            var url = PRODUCTDATA_URL+"/saveNewUserSubscription";
            var mailService = "http://haastika.com/app/app.sendMail.php";
            
            $http({
              method: 'POST',
              url: url,
              data: register.user,
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(function successCallback(data, status) {
                if(data.data.subscribedSuccessfully) {
                    register.pushNotification = data.data.subscriptionMessage;
                    register.subscribedFailed = false;
                    register.user.promoCode = data.data.promoCode;
                    register.subscribedSuccesfully = true;
                    register.user={id:null,firstName:'',lastName:'',emailId:'',contactNo:''};
                    $scope.form.$setPristine();
                    $timeout(function() {
                    	$location.path( "/" );
                    }, 3000);
                } else {
                    register.subscribedFailed = true;
                    register.subscribedSuccesfully = false;
                    register.pushNotification = data.data.errorMessage;
                }
              }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
              });
        };
    
    }])
;
