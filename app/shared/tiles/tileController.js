'use strict';

angular.module('eCommerce')
  .controller('tileCtrl', ['$scope', '$rootScope', 'UserService', 'BASE_URI', '$http', function ($scope, $rootScope, UserService, BASE_URI, $http) {
    var tile = this,
        object;

    $rootScope.$on('event:data-change', function() {
      object = UserService.get();
      if(object.data.pageLayoutDetails) {
        tile.layout = object.data.pageLayoutDetails.layouts;
        tile.renderTemplate();
      }
    });

    $rootScope.$on('event:layoutChange', function() {
      var url = "assets/json/layouts.json";
      $http.get(url).success( function(response) {
          if(response.pageLayoutDetails) {
            tile.layout = response.pageLayoutDetails.layouts;
            tile.renderTemplate();
          }
      });
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
  }])
;
