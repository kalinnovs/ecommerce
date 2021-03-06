'use strict';

angular.module('eCommerce')
    .controller('categoryCtrl', function($scope, $rootScope, $timeout, $sce, $state, CategoryService, UserService, $stateParams, SERVICE_URL, PRODUCTDATA_URL, BASE_URI) {
        var cat = this;
        var scoper = $scope;

        CategoryService.getFromURL(PRODUCTDATA_URL + '/productData/category/' + $stateParams.id)
            .then(function(data) {
                cat.data = data.categoryDetails;
                // $rootScope.navigation.selectedCategory = data.categoryDetails.selectedCategory.partNumber;
                $scope.iterateThrough = 5;
                $rootScope.navigation = data.pageNavigation.categories;
                window.sessionStorage.setItem('navigation', JSON.stringify(data.pageNavigation.categories));
                $scope.$broadcast('dataloaded');
                // $scope.htmlDescription = data.productDescription;
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
