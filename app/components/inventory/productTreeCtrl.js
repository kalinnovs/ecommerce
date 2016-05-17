
angular.module('eCommerce')
.controller('productTreeCtrl', ['$scope', 'productTreeService', '$timeout', function($scope, productTreeService, $timeout) {
    productTreeService.list().then(function(data){
        $scope.rootCatogories = data.data.availableRootCatogories;
        $scope.categoryList = data.data.categoryList;
        $scope.$broadcast('dataloaded');
    });


    $scope.$on('dataloaded', function() {
        $timeout(function () { 
            window.dataLoaded = true;
        }, 100, false);
    });
    
    $scope.collapse = function(event){
        var el = jQuery(event.currentTarget);
        if(jQuery(el.parents('li')[0]).find('li').length){
            jQuery(el.parents('li')[0]).find('ul').toggle();
            el.toggleClass('fa-minus-square fa-plus-square');
        }
    }
    $scope.collapseAll = function(type){
        if(type === 'category'){
            jQuery('.category-expand-all i').toggleClass('fa-minus-square fa-plus-square');
            jQuery('.category-view > ul').toggle();
            jQuery('.category-view i.category').toggleClass('fa-minus-square fa-plus-square');
        } else{
            jQuery('.subcategory-expand-all i').toggleClass('fa-minus-square fa-plus-square');
            jQuery('.subcategory-view > ul').toggle();
            jQuery('.subcategory-view i.subcategory').toggleClass('fa-minus-square fa-plus-square');
        }
    }

    $scope.getSubCategories = function(productRootCategoryId){
        $scope.productRootCategoryId = productRootCategoryId;
    }
    $scope.cancel =function(){
        $scope.nodeType = "";
    }
    $scope.editNode = function(nodeType,node, productCategoryId, productRootCategoryId){
        $scope.nodeType = nodeType;
        $scope.node = node;
        $scope.productCategoryId = productCategoryId;
        $scope.productRootCategoryId = productRootCategoryId;
    };

    $scope.addNode = function(nodeType,node, productCategoryId, productRootCategoryId){
        $scope.nodeType = nodeType;
        $scope.node = {};
    };

    $scope.saveCategory = function(category){
        categoryObj = angular.copy(category);
        delete categoryObj["productsList"];
        // $http.post('http://192.168.0.28:8080/HaastikaDataService' + "/savecategory", JSON.stringify(categoryObj));
        productTreeService.savecategory(categoryObj).then(function(data){
            console.log('data saved');
            debugger;
        });
    }

    $scope.saveProduct = function(product){
        productObj = angular.copy(product);
        productTreeService.saveProduct(productObj).then(function(data){
            console.log('data saved');
            debugger;
        });
    }
}]);

