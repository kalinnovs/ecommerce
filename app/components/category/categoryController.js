'use strict';

angular.module('eCommerce')
    .controller('categoryCtrl', function($scope, $rootScope, $timeout, $sce, $state, CategoryService, UserService, $stateParams, PRODUCTDATA_URL, BASE_URI) {
        var cat = this;
        var scoper = $scope;

        CategoryService.getFromURL(PRODUCTDATA_URL + '/productData/category/' + $stateParams.id)
            .then(function(data) {
                cat.data = data.categoryDetails;
                if(data.pageNavigation) {
                    // $rootScope.navigation = data.pageNavigation.categories;
                    // try {
                    //   window.sessionStorage.setItem('navigation', JSON.stringify(data.pageNavigation.categories));
                    // } catch (e) {
                    //   if (e == QUOTA_EXCEEDED_ERR) {
                    //     alert('Quota exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
                    //   }
                    // }
                }
                $scope.iterateThrough = 5;
                $scope.$broadcast('dataloaded');
                // Currency Update
                if(window.userDetails && window.userDetails.preferredCurrency) {
                    $rootScope.$broadcast("updateCurrency", window.userDetails.preferredCurrency);
                }
                // $rootScope.$broadcast("updateCurrency", window.userDetails.preferredCurrency);
            })
            .catch(function(error) {
                $state.go('home');
            })
            .finally(function() {
                //
            })
            // debugger;

        $scope.$on('dataloaded', function() {
            $timeout(function() {
                window.dataLoaded = true;
                $(".progress").hide();
            }, 1000, false);
        });

        $scope.showFilter = function(elem) {
            if ($(".categoryTree").hasClass("show")) {
                $(".categoryTree").removeClass("show");
                $(".spacingAdjust").css("margin-left", "0px");
            } else {
                $(".categoryTree").addClass("show");
                $(".spacingAdjust").css("margin-left", "285px");
            }
        };

        $scope.showList = function(elem) {
            $(elem.target).css('color', '#33adff');
            $(elem.target).parents(".listing").find(".spacingAdjust").addClass("listView");
        };

        $scope.showGrid = function(elem) {
            $(elem.target).css('color', '#000');
            $(elem.target).parents(".listing").find(".spacingAdjust").removeClass("listView");
        };

        $scope.getHtml = function(html) {
            return $sce.trustAsHtml(html);
        };

        
    })
    .filter('html', function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    });
