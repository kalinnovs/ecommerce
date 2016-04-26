'use strict';

angular.module('eCommerce')
  .controller('AdminCtrl', function ($scope, $rootScope, UserService, BASE_URI, $stateParams, $firebaseObject) {
    var admin = this;
    
    var ref = new Firebase("https://intense-torch-8839.firebaseio.com");

    UserService.GetAll( BASE_URI + '/eCommerce.json')
        .then(function(data) {
            $rootScope.navigation = data.Navigation;
            $scope.admin = data;
        })
        .catch(function(error) {
            //
        })
        .finally(function() {
            //
        })
    
    // download the data into a local object
    var syncObject = $firebaseObject(ref);
    
    // synchronize the object with a three-way data binding
    // click on `index.html` above to see it used in the DOM!
    syncObject.$bindTo($scope, "data");

    // create a synchronized array
    // click on `index.html` above to see it used in the DOM!
    $scope.messages = $firebaseArray(ref);

    // add new items to the array
    // the message is automatically added to our Firebase database!
    $scope.addMessage = function() {
        $scope.messages.$add({
          text: $scope.newMessageText
        });
    };

    debugger;
  })
;
