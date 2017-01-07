'use strict';

angular.module('eCommerce')
  .controller('HomeCtrl', function ($scope, $timeout, $rootScope, UserService, SERVICE_URL, PRODUCTDATA_URL, $http) {
    var home = this;
    var scoper = $scope;
    $scope.user = "pritish";
    
    // Root scoping cartItem array globally across the application
    $rootScope.cartItems = (window.localStorage.itemsArray) ? JSON.parse(window.localStorage.itemsArray) : [];
    
    // UserService.GetAll( PRODUCTDATA_URL + '/home')
    UserService.GetAll( PRODUCTDATA_URL + '/home')
        .then(function(data) {
          if(data.success === undefined || data.success) {
            $rootScope.navigation = data.pageNavigation.categories;
            try {
              window.sessionStorage.setItem('navigation', JSON.stringify(data.pageNavigation.categories));
            } catch (e) {
              if (e == QUOTA_EXCEEDED_ERR) {
                alert('Quota exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
              }
            }
            $scope.$broadcast('dataloaded');
          } else {
            // Else pick local JSON
          }
        })
        .catch(function(error) {
            //
        })
        .finally(function() {
            //
        });


    $scope.$on('dataloaded', function() {
        $timeout(function () {
            window.dataLoaded = true;
        }, 100, false);
    });


    this.shuffleTiles = function() {
      var parent = $(".tileShuffle");
      var divs = parent.children();
      while (divs.length) {
          parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
      }
    };
    // Google Map
    this.initiateMap = function() {
      // Create an array of styles.
      var styles = [
          {
              stylers: [

                  { saturation: -40 }
              ]
          },{
              featureType: "road.arterial",
              elementType: "geometry",
              stylers: [
                  { saturation: 70 }
              ]
          },{
              featureType: "road.local",
              elementType: "labels",
              stylers: [
                  { visibility: "on" },
                  { saturation: -50 }
              ]
          },{
              featureType: "poi.business",
              elementType: "labels",
              stylers: [
                { visibility: "on" }
              ]
          }
      ];

      // Create a new StyledMapType object, passing it the array of styles,
      // as well as the name to be displayed on the map type control.
      var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

      // Create a map object, and include the MapTypeId to add
      // to the map type control.
      var mapOptions = {
          scrollwheel: false,
          zoom: 16,
          center: new google.maps.LatLng(20.279880, 85.796626),
          mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
          }
      };

      if($("#map_canvas").length > 0) {
          var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

          var marker = new google.maps.Marker({
              position: new google.maps.LatLng(20.279880, 85.796626),
              map: map,
              title: 'Haastika'
          });
          marker.addListener('click', function() {
              infowindow.open(map, marker);
          });

          //Associate the styled map with the MapTypeId and set it to display.
          map.mapTypes.set('map_style', styledMap);
          map.setMapTypeId('map_style');
      }
    };
    // $scope.doThis = function($scope) {
    //     // $(".progress").hide();
    //     debugger;
    //     shuffleTiles();
    // };
    $scope.afterPageRendered = function () {
      // debugger;
        $scope.foo = 'newFoo';
    }
  })
;
