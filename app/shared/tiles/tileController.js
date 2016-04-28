'use strict';

angular.module('eCommerce')
  .controller('tileCtrl', function ($scope, $rootScope, UserService, BASE_URI) {
    var tile = this;

    $rootScope.$on('event:data-change', function() {
      var object = UserService.get();
      tile.layout = object.data.pageLayoutDetails.layouts;
      tile.renderTemplate();
    });

    tile.renderTemplate = function() {
      $.each(tile.layout, function(k, v) {
          /// do stuff
          $scope[k] = 'app/shared/tiles/'+k+'.html';
      });
    };

  })
;
