'use strict';

angular.module('eCommerce')
  .controller('tileCtrl', function ($scope, UserService, BASE_URI) {
    var tile = this;

    UserService.GetAll( BASE_URI + '/eCommerce/home.json')
        .then(function(data) {
            tile.layout = data.tileLayout;
            tile.renderTemplate();
        })
        .catch(function(error) {
            //
        })
        .finally(function() {
            //
        })


    tile.renderTemplate = function() {
      $.each(tile.layout, function(k, v) {
          /// do stuff
          $scope[k] = 'app/shared/tiles/'+k+'.html';
      });
    };

  })
;
