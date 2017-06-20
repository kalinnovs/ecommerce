'use strict';

angular.module('eCommerce')
  .controller('AdminCtrl', ['$scope', '$rootScope', '$http', '$state', '$timeout', '$interval', 'UserService', '$cookies', 'PRODUCTDATA_URL', 'AuthenticationService', 'OrderDetailService', 
    function ($scope, $rootScope, $http, $state, $timeout, $interval, UserService, $cookies, PRODUCTDATA_URL, AuthenticationService, OrderDetailService) {
    var admin = this;
    
    // UserService.GetAll( BASE_URI + '/eCommerce/home.json')
    UserService.GetAll( PRODUCTDATA_URL + '/admin/visitors')
        .then(function(data) {
          if(data.totalUniqueVisitorsCount) {
          	admin.uniqueViews = data.totalUniqueVisitorsCount;
          	admin.totalCount = data.totalVisitorsCount;
          }
          $rootScope.$broadcast('event:layoutChange');
        })
    
    $scope.chooseTemplate = function(e) { 
        $(".adminMenu label").removeClass("active");
        $(e.target).addClass("active");
        $(".tabbedPane").find("> div").removeClass("show hide").addClass("hide");
        $(".tabbedPane").find("."+$(e.target).attr("id")).removeClass("hide").addClass("show");
        
        if(e.target.id === 'ordermanagement' && !$scope.orderList){
            OrderDetailService.getOrderList().then(function(data){
                $scope.orderList = data.orderList;
            });
        } else if (e.target.id === 'subscriber' && !$scope.subscriberData){
            UserService.GetAll( PRODUCTDATA_URL + '/admin/subscribers').then(function(data) {
                $scope.subscriberData = data;
            })
        } else if (e.target.id === 'promomailgenerator' && !$scope.promomailgenerator){
            UserService.GetAll( PRODUCTDATA_URL + '/admin/promoMails').then(function(data) {
                $scope.promomailgenerator = true;
                $scope.subject = data.subject;
                $scope.id = data.id;
                CKEDITOR.instances.haastikaeditor.setData(data.content);
            })
        } else if (e.target.id === 'updateLayoutWrap') {
            // $rootScope.$broadcast('event:layoutChange');
            var self = this;
            var url = "assets/json/layouts.json";
            $http.get(url).success( function(response) {
                if(response.pageLayoutDetails) {
                    $scope.layout = response.pageLayoutDetails.layouts;
                    $scope.renderAdminTemplate();
                }
            });
            $http.get('assets/json/productTree.json').then(function (response) {
                $scope.productTree = response.data;
                self.productTree = response.data;
            });

            $(".layoutSelector").val("layout2");
        }
    };

    $scope.changeLayout = function(elSelector) {
        $(".item-box-layout").hide();
        elSelector = elSelector.slice(0, 6) + "-" + elSelector.slice(6);
        $("."+elSelector).show();
    };

    $scope.renderAdminTemplate = function() {
      $.each($scope.layout, function(k, v) {
          if(v.layoutCapacity === 0) {
            return true;
          }
          var layout = "layout"+ v.layoutCapacity;
          $scope[layout] = 'app/shared/tiles/'+layout+'-admin.html';
      });
    };

    $scope.getSubCategories = function(categoryId, id) {
        if(categoryId === "") {
            return true;
        };
        var categoryIndex = $.map(this.productTree.categoryList, function(obj, index) {
            if(obj.categoryId == categoryId) {
                return index;
            }
        });
        $scope.subCategoryList = $scope.subCategoryList || {};
        $scope.subCategoryList[id] = this.productTree.categoryList[categoryIndex].subCategoryList;
    };

    $scope.getProductList = function(categoryId, subCategoryId, id) {
        if(categoryId === "" || subCategoryId === "") {
            return true;
        };
        var categoryIndex = $.map(this.productTree.categoryList, function(obj, index) {
            if(obj.categoryId == categoryId) {
                return index;
            }
        });
        var subcategoryIndex = $.map(this.productTree.categoryList[categoryIndex].subCategoryList, function(obj, index) {
            if(obj.categoryId == subCategoryId) {
                return index;
            }
        });
        $scope.productList = $scope.productList || {};
        $scope.productList[id] = this.productTree.categoryList[categoryIndex].subCategoryList[subcategoryIndex].productsList;
    };

    $scope.getSelectedCategory = function(categoryId, subCategoryId, layout, boxId) {
        if(categoryId === "" || subCategoryId === "") {
            return true;
        };
        // Finds the position of category in JSON
        var categoryIndex = $.map(this.productTree.categoryList, function(obj, index) {
            if(obj.categoryId == categoryId) {
                return index;
            }
        });

        // Finds the position of subcategory in JSON
        var subcategoryIndex = $.map(this.productTree.categoryList[categoryIndex].subCategoryList, function(obj, index) {
            if(obj.categoryId == subCategoryId) {
                return index;
            }
        });

        // Find which box needs a update
        var index = $.map(this.layout[layout].tilesList, function(obj, index) {
            if(obj.tileId == boxId) {
                return index;
            }
        });

        var newObj = this.productTree.categoryList[categoryIndex].subCategoryList[subcategoryIndex];
        if(!newObj.tileImagePath) {
            newObj.tileImagePath = newObj.categoryTileImagePath;
        }
        // Updates Model
        $scope.layout[layout].tilesList[index].tileCategory = newObj;
    };

    $scope.getProductImageList = function(categoryId, subCategoryId, productId, layout, boxId) {
        if(categoryId === "" || subCategoryId === "") {
            return true;
        };
        // Finds the position of category in JSON
        var categoryIndex = $.map(this.productTree.categoryList, function(obj, index) {
            if(obj.categoryId == categoryId) {
                return index;
            }
        });

        // Finds the position of subcategory in JSON
        var subcategoryIndex = $.map(this.productTree.categoryList[categoryIndex].subCategoryList, function(obj, index) {
            if(obj.categoryId == subCategoryId) {
                return index;
            }
        });

        // Finds the position of product in JSON
        var productIndex = $.map(this.productTree.categoryList[categoryIndex].subCategoryList[subcategoryIndex].productsList, function(obj, index) {
            if(obj.productId == productId) {
                return index;
            }
        });

        // Find which box needs a update
        var index = $.map(this.layout[layout].tilesList, function(obj, index) {
            if(obj.tileId == boxId) {
                return index;
            }
        });

        var newObj = this.productTree.categoryList[categoryIndex].subCategoryList[subcategoryIndex].productsList[productIndex];
        
        // Updates Model
        $scope.imageGalleryList = $scope.imageGalleryList || {};
        $scope.imageGalleryList[boxId] = newObj.productImageGallery;
        $scope.layout[layout].tilesList[index].productTileDetails = newObj;
    };

    $scope.swapImage = function(event, boxId, imgSrc, imgSrcId, layout) {
        // Find which box needs a update
        var index = $.map(this.layout[layout].tilesList, function(obj, index) {
            if(obj.tileId == boxId) {
                return index;
            }
        });
        $scope.layout[layout].tilesList[index].productTileDetails.productImage.thumbImagePath = imgSrc;
        $scope.layout[layout].tilesList[index].productTileDetails.productImage.productImageId = imgSrcId;
        $(event.target).parents("ul").find("li").removeClass("active");
        $(event.target).parents("li").addClass("active");
    };

    $scope.logout = function() {
        // reset login status
        AuthenticationService.ClearCredentials();
        window.localStorage.setItem("accessToken", "");
        window.sessionStorage.setItem("checkoutState", '{"login": false, "address": false, "order": false, "payment": false }');
        window.userDetails = {"name": "Guest","imageUrl": "","user": null};
        $state.go('home');
    };

    $scope.saveLayoutModel = function() {
        var tileList = this.layout[this.layoutId].tilesList;
        var payload = [];
        for(var i=0 ; i < tileList.length; i++) {
            var tempObj = {};
            switch(tileList[i].tileType) {
                case "CATEGORY":
                    tempObj.tileId = tileList[i].tileId;
                    tempObj.categoryId = tileList[i].tileCategory.categoryId;
                    break;
                case "PRODUCT":
                    tempObj.tileId = tileList[i].tileId;
                    tempObj.productId = tileList[i].productTileDetails.productId;
                    tempObj.productImageId = tileList[i].productTileDetails.productImage.productImageId;
                    break;
            }
            payload.push(tempObj);
        }
        
        $http({
            method: 'POST',
            url: PRODUCTDATA_URL + '/admin/saveLayout',
            data: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // debugger;

    };
    
  }]
);
