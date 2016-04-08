'use strict';

angular.module('eCommerce')
  .controller('HomeCtrl', function (UserService, BASE_URI) {
    var home = this;
    home.title = 'Doom';

    UserService.GetAll( BASE_URI + '/eCommerce/home.json')
        .then(function(data) {
            home.layout = data.tileLayout;
        })
        .catch(function(error) {
            //
        })
        .finally(function() {
            //
        })
    // debugger;
  })
  .directive('myName', function() {
      return {
        templateUrl: 'My name is pritish'
      };
    })
;
