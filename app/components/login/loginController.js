angular.module('eCommerce')
  .controller('LoginCtrl', function () {
    var login = this;
    login.title = 'Doom';

    $scope.submitForm = function() {

    };

    $scope.resetForm = function(){
	   $scope.userForm.$dirty = false;
	   $scope.userForm.$pristine = true;
	   $scope.userForm.$submitted = false;
	};
  })
;