'use strict';

angular.module('eCommerce')
  .controller('AdminCtrl', function ($scope, $rootScope, UserService, BASE_URI, $stateParams, $firebaseObject) {
    var admin = this;
    
    var ref = new Firebase("https://intense-torch-8839.firebaseio.com");

    $rootScope.navigation = UserService.get().data.pageNavigation.categories;
    
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
