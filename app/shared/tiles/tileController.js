'use strict';

angular.module('eCommerce')
  .controller('tileCtrl', function ($scope, $rootScope, UserService, BASE_URI) {
    var tile = this;

    $rootScope.$on('event:data-change', function() {
      var object = UserService.get();
      if(object.data.pageLayoutDetails) {
        tile.layout = object.data.pageLayoutDetails.layouts;
        tile.renderTemplate();
      }
      
    });

    tile.renderTemplate = function() {
      $.each(tile.layout, function(k, v) {
          if(v.layoutCapacity === 0) {
            return true;
          }
          var layout = "layout"+ v.layoutCapacity;
          $scope[layout] = 'app/shared/tiles/'+layout+'.html';
      });
    };

  })
;
