'use strict';

angular.module('eCommerce')
    .controller('thankyouCtrl', ['$scope', '$timeout', '$http', '$rootScope', 'getPayUData',  function($scope, $timeout, $http, $rootScope, getPayUData) {
    	$scope.order = window.location.href.split("=")[1];
        $scope.statusMessage = getPayUData.statusMessage;

        function updateProfile() {
          var emptyUser = {
              "name": "Guest",
              "imageUrl": "",
              "user": null 
          },
          userDetails = (window.userDetails) ? window.userDetails : emptyUser;
          if(userDetails.imageUrl !== "") {
              $(".profilePicUpdate").addClass("loggedIn");
          } else {
              $(".profilePicUpdate").removeClass("loggedIn");
          }
          $(".profilePicUpdate").find(".profilePic").attr("src", userDetails.imageUrl);
          $(".userDetailsUpdate").text((userDetails.name === "Guest") ? "Login" : userDetails.name);
          $(".social-strip ul > li > a.profile").attr("href", (userDetails.name === "Guest") ? "/login" : "/accounts");
        };

        $timeout(function () {
            updateProfile();
        }, 200, false);

    	if(!$.isEmptyObject(getPayUData)) {
    		window.dataLoaded = true;
    		
    		if(getPayUData.statusMessage === "UNSUCCESSFUL") {
    			
    		}
    	}
    }]
);