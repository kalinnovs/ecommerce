
angular.module('eCommerce')
.controller('productTreeCtrl', ['$scope', 'Upload', 'productTreeService', '$timeout', function($scope, Upload, productTreeService, $timeout) {
    productTreeService.list().then(function(data){
        // 
        $scope.$broadcast('dataloaded');
        $scope.categoryMetaData = data.data.categoryMetaData;
        $scope.categoryList = data.data.categoryList;
    });

    $scope.selected = true;

    $scope.$on('dataloaded', function() {
        $scope.collapseAll();
        $timeout(function () { 
            window.dataLoaded = true;
        }, 100, false);
    });
    
    $scope.collapse = function(event){
        var el = jQuery(event.currentTarget);
        if(jQuery(el.parents('li')[0]).find('li').length){
            jQuery(el.parents('li')[0]).find('> ul').toggle();
            el.toggleClass('fa-minus-square fa-plus-square');
        }
    }

    $scope.collapsed_cat = true;
    $scope.collapsed_subcat = true;
    $scope.collapseAll = function(type){
        if(type === 'category'){
            if($scope.collapsed_cat){
                jQuery('.category-view > ul').show();
                jQuery('.category-expand-all i').removeClass('fa-plus-square').addClass('fa-minus-square');
                jQuery('.category-view i.category').removeClass('fa-plus-square').addClass('fa-minus-square');
            } else {
                jQuery('.category-view > ul').hide();
                jQuery('.category-expand-all i').removeClass('fa-minus-square').addClass('fa-plus-square');
                jQuery('.category-view i.category').removeClass('fa-minus-square').addClass('fa-plus-square');
            }
            $scope.collapsed_cat = !$scope.collapsed_cat;
        } else{
            if($scope.collapsed_subcat){
                jQuery('.subcategory-view > ul').show();
                jQuery('.subcategory-expand-all i').removeClass('fa-plus-square').addClass('fa-minus-square');
                jQuery('.subcategory-view i.subcategory').removeClass('fa-plus-square').addClass('fa-minus-square');
            } else {
                jQuery('.subcategory-view > ul').hide();
                jQuery('.subcategory-expand-all i').removeClass('fa-minus-square').addClass('fa-plus-square');
                jQuery('.subcategory-view i.subcategory').removeClass('fa-minus-square').addClass('fa-plus-square');
            }
            $scope.collapsed_subcat = !$scope.collapsed_subcat;
        }
    }

    $scope.getSubCategories = function(productRootCategoryId){
        $scope.subCategoryList = _.find($scope.categoryList,{'categoryId':parseInt(productRootCategoryId)}). subCategoryList;
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
        if($scope.node.rootCategory) {
            $scope.node.rootCategory.categoryId = $scope.node.rootCategory.categoryId.toString();
        }
        if(productRootCategoryId){
            $scope.getSubCategories(productRootCategoryId);
        }
        $scope.categoryMenuImage = null;		
        $scope.categoryBannerImage = null;		
        $scope.categoryTileImage = null;
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

    $scope.selectDefaultProductImage = function(productId, productImageId) {
        productTreeService.setDefaultImage(productId, productImageId);
        productTreeService.generatejson();
    };

    $scope.getCheckedCondition = function(actualProductImageId, selectedImageId) {
        var check = (actualProductImageId === selectedImageId) ? true : false;
        return check;
    };

    $scope.saveCategory = function(category){
        $scope.dataLoading = true;
        categoryObj = angular.copy(category);
        delete categoryObj["subCategoryList"];
        delete categoryObj["productsList"];
        productTreeService.saveNode('/admin/saveCategory', categoryObj, $scope.saveCategorySucess);
    }

    $scope.saveProduct = function(product){
        $scope.dataLoading = true;
        
        product.productCategory = {'categoryId': parseInt($('#subCategory').val() ? $('#subCategory').val() : $('#category').val())};
        productObj = angular.copy(product);
        productTreeService.saveNode('/admin/saveProduct', productObj, $scope.saveProductSucess);
    }

    $scope.saveCategorySucess = function(resp) {
        if(!$scope.node.categoryId){
            $scope.node.categoryId = resp.data.id;
            if($scope.node.rootCategory){
                _.find($scope.categoryList,{'categoryId':parseInt($scope.node.rootCategory.categoryId)}).subCategoryList.push($scope.node);
            } else {
                $scope.categoryList.push($scope.node);    
            }
        }
        $scope.dataLoading = false;
        $('.message').fadeIn(500).fadeOut(3000);
    }

    $scope.saveProductSucess = function(resp) {
        if(!$scope.node.productId) {
            $scope.node.productId = resp.data.id;
            if($scope.node.productCategory){
                _.find($scope.categoryList, function(obj) {
                    if(obj.categoryId == $scope.node.productCategory.categoryId){
                        obj.productsList.push($scope.node);
                    }
                    else {
                        debugger
                        if(obj.subCategoryList){
                            var subcat = _.find(obj.subCategoryList, {'categoryId':$scope.node.productCategory.categoryId});
                            if(subcat){
                                subcat.productsList.push($scope.node);
                            }
                        }
                    }
                });
            }
        }
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
        $scope.imgLoading = true;

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

            productTreeService.uploadImage('/admin/saveCategoryImages', imageData, $scope.categoryImageUploadSucess);
        }
    };

    $scope.categoryImageUploadSucess = function(resp) {
        $scope.imgLoading = false;
        $scope.categoryMenuImage = null;
        $scope.categoryBannerImage = null;
        $scope.categoryTileImage = null;
    }

    $scope.uploadProductImage = function() {
        var imageData = {};
        $scope.imgLoading = true;
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

        productTreeService.uploadImage('/admin/saveProductImages', imageData, $scope.productImageUploadSucess);
    };

    $scope.productImageUploadSucess = function(resp) {
        $scope.node.productImageGallery.push(resp.data);
        $scope.baseImage = null;
        $scope.thumbImage = null;
        $scope.largeImage = null;
        $scope.xlargeImage = null;
        $scope.imgLoading = false;		
        $('.message').fadeIn(500).fadeOut(3000);
    }

    $scope.deleteProductImage = function(imageId){
        productTreeService.deleteNode("/admin/deleteProductImage/"+imageId, $scope.productImageDeleteSucess)
    }
    
    $scope.productImageDeleteSucess = function(resp) {
        var obj = _.find($scope.node.productImageGallery, {
            'productImageId':resp.data.id
        });		
        $scope.node.productImageGallery.splice($scope.node.productImageGallery.indexOf(obj),1);		
        $('.message').fadeIn(500).fadeOut(3000);
    }
}]);
