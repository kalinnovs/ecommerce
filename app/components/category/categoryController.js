'use strict';

angular.module('eCommerce')
    .controller('categoryCtrl', function($scope, $rootScope, $timeout, $sce, CategoryService, UserService, $stateParams, SERVICE_URL, PRODUCTDATA_URL, BASE_URI) {
        var cat = this;
        var scoper = $scope;

        CategoryService.getFromURL(SERVICE_URL + '/category/' + $stateParams.id)
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
                //
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

        $scope.toggleInBasket = function(event, item) {
            var obj = {
                "partNumber": item.productPartNumber,
                "description": item.productDescription,
                "price": item.productPrice,
                "priceArray": item.productPriceOptions,
                "image": item.productImageGallery
            }

            var addItem = function(item) {
                var oldItems = JSON.parse(sessionStorage.getItem('itemsArray')) || [];
                var repeatedItem = oldItems.filter(function(val, index) {
                    return (val.partNumber === item.partNumber);
                });
                if(repeatedItem.length > 0) {
                    alert("Item already added to cart !");
                    return true;
                }
                oldItems.push(item);

                window.miniCartStorage.push(item.partNumber);
                window.sessionStorage.setItem('cartParts', JSON.stringify(window.miniCartStorage));
                window.sessionStorage.setItem('itemsArray', JSON.stringify(oldItems));

                window.itemsArray.push(item);
            };

            addItem(obj);

            // window.localStorage.miniCart.items.push(obj);
            event.preventDefault();
            return false;
        };
    })
    .filter('html', function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    });
