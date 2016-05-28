
angular.module('eCommerce')
.controller('productTreeCtrl', ['$scope', 'Upload', 'productTreeService', function($scope, Upload, productTreeService) {
    productTreeService.list().then(function(data){
        // 
        $scope.categoryMetaData = data.data.categoryMetaData;
        $scope.categoryList = data.data.categoryList;

        $(".progress").hide();
    });

    $scope.selected = true;
    
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
        $scope.subCategoryList = _.where($scope.categoryList,{'categoryId':parseInt(productRootCategoryId)})[0]. subCategoryList;
    }
    $scope.cancel =function(){
        $scope.nodeType = "";
    }
    $scope.editNode = function(nodeType,node, productCategoryId, productRootCategoryId){
        $('html,body').animate({scrollTop: $(".panel-heading").offset().top},'slow');
        $scope.nodeType = nodeType;
        $scope.node = node;
        $scope.productCategoryId = productCategoryId ? productCategoryId.toString() : null;
        $scope.productRootCategoryId = productRootCategoryId ? productRootCategoryId.toString() : null;
        if(productRootCategoryId){
            $scope.getSubCategories(productRootCategoryId);
        }
    };

    $scope.addNode = function(nodeType,node, productCategoryId, productRootCategoryId){
        $scope.nodeType = nodeType;
        $scope.node = {};
        
        if(nodeType === 'product'){
            $scope.node.priceOptions = [];
            $scope.node.priceOptions.push({
                "countryName": "India",
                "currencyCode": "INR",
                "currencyId": 1,
                "currencySymbol": "INR",
                "price": 0
            });
            $scope.node.priceOptions.push({
                "countryName": "United States",
                "currencyCode": "USD",
                "currencyId": 2,
                "currencySymbol": "$",
                "price": 0
            });
            $scope.node.priceOptions.push({
                "countryName": "United Kingdom",
                "currencyCode": "EUR",
                "currencyId": 3,
                "currencySymbol": "GBP",
                "price": 0
            });
        }
    };

    $scope.saveCategory = function(category){
        $scope.dataLoading = true;
        categoryObj = angular.copy(category);
        delete categoryObj["subCategoryList"];
        delete categoryObj["productsList"];

        if($('#category').val()){
            categoryObj.rootCategory = {'categoryId': parseInt($('#category').val())};
        }

        productTreeService.saveNode('/saveCategory', categoryObj, $scope.saveCategorySucess);
    }

    $scope.saveProduct = function(product){
        $scope.dataLoading = true;
        
        productObj = angular.copy(product);
        productObj.productCategory = {'categoryId': parseInt($('#subCategory').val() ? $('#subCategory').val() : $('#category').val())};
        productTreeService.saveNode('/saveProduct', productObj, $scope.saveProductSucess);
    }

    $scope.saveCategorySucess = function(resp) {
        
        $scope.node.categoryId = resp.data.id;
        $scope.dataLoading = false;
        $('.message').fadeIn(500).fadeOut(3000);
    }

    $scope.saveProductSucess = function(resp) {
        
        $scope.dataLoading = false;
        $('.message').fadeIn(500).fadeOut(3000);
    }

    $scope.deleteCategory = function(category) {
        category.enabled = false;
        $scope.saveCategory(category);
    }
    $scope.deleteProduct = function(product) {
        product.enabled = false;
        $scope.saveProduct(product);   
    }
    $scope.deleteNodeSucess = function(resp) {
        
        $scope.dataLoading = false;
    }

    $scope.uploadCatalogImage = function() {
        var imageData = {};

        if($scope.categoryMenuImage || $scope.categoryBannerImage || $scope.categoryTileImage){
            imageData.categoryId = $scope.node.categoryId;
            imageData.categoryPartNumber = $scope.node.categoryPartNumber;
            if($scope.categoryMenuImage){
                imageData.categoryMenuImage = $scope.categoryMenuImage;
            }
            if($scope.categoryBannerImage){
                imageData.categoryBannerImage = $scope.categoryBannerImage;
            }
            if($scope.categoryTileImage){
                imageData.categoryTileImage = $scope.categoryTileImage;
            }

            productTreeService.uploadImage('/saveCategoryImages', imageData, $scope.categoryImageUploadSucess);
        }
    };

    $scope.categoryImageUploadSucess = function(resp) {
        
        $scope.categoryMenuImage = null;
        $scope.categoryBannerImage = null;
        $scope.categoryTileImage = null;
    }

    $scope.uploadProductImage = function() {
        var imageData = {};

        if($scope.baseImage){
            imageData.mediumImage = $scope.baseImage;
        }
        if($scope.thumbImage){
            imageData.thumbImage = $scope.thumbImage;
        }
        if($scope.largeImage){
            imageData.largeImage = $scope.largeImage;
        }
        if($scope.xlargeImage){
            imageData.extraLargeImage = $scope.xlargeImage;
        }
        imageData.productId = $scope.node.productId;
        // imageData.imageName = null;
        // imageData.currentImageFolderId = 2;

        productTreeService.uploadImage('/saveProductImages', imageData, $scope.productImageUploadSucess);
    };

    $scope.productImageUploadSucess = function(resp) {
        
        $scope.baseImage = null;
        $scope.thumbImage = null;
        $scope.largeImage = null;
        $scope.xlargeImage = null;
    }

}]);

