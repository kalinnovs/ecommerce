
angular.module('eCommerce')
.controller('productTreeCtrl', ['$scope', 'Upload', 'productTreeService', function($scope, Upload, productTreeService) {
    productTreeService.list().then(function(data){
        // debugger;
        $scope.categoryMetaData = data.data.categoryMetaData;
        $scope.categoryList = data.data.categoryList;

        $(".progress").hide();
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
        $scope.subCategoryList = _.where($scope.categoryList,{'categoryId':parseInt(productRootCategoryId)})[0]. subCategoryList;
    }
    $scope.cancel =function(){
        $scope.nodeType = "";
    }
    $scope.editNode = function(nodeType,node, productCategoryId, productRootCategoryId){
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
    };

    $scope.populateSubCategory = function(productRootCategoryId){
        console.log("hi"+productRootCategoryId);
    };

    $scope.saveCategory = function(category){
        $scope.dataLoading = true;
        categoryObj = angular.copy(category);
        delete categoryObj["subCategoryList"];
        delete categoryObj["productsList"];
        productTreeService.saveNode('/saveCategory', categoryObj, $scope.saveCategorySucess);
    }

    $scope.saveProduct = function(product){
        $scope.dataLoading = true;
        productObj = angular.copy(product);
        productTreeService.saveNode('/saveProduct', productObj, $scope.saveProductSucess);
    }

    $scope.saveCategorySucess = function(resp) {
        debugger;
        $scope.node.categoryId = resp.data.id;
        $scope.dataLoading = false;
    }

    $scope.saveProductSucess = function(resp) {
        debugger;
        $scope.dataLoading = false;
    }

    $scope.uploadCatalogImage = function() {
        var imageData = {};

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
    };

    $scope.categoryImageUploadSucess = function(resp) {
        debugger;
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
        imageData.currentImageFolderId = 2;

        productTreeService.uploadImage('/saveProductImages', imageData, $scope.productImageUploadSucess);
    };

    $scope.productImageUploadSucess = function(resp) {
        debugger;
    }

//     $scope.uploadFile = function (file) {
//         $scope.imgLoading = true;
//         var imageData = {};

//         // imageData.categoryId = $scope.node.categoryId;
//         // imageData.categoryPartNumber = $scope.node.categoryPartNumber;
//         if($scope.categoryMenuImage){
//             imageData.categoryMenuImage = $scope.categoryMenuImage;
//         }
//         if($scope.categoryBannerImage){
//             imageData.categoryBannerImage = $scope.categoryBannerImage;
//         }
//         if($scope.categoryTileImage){
//             imageData.categoryTileImage = $scope.categoryTileImage;
//         }


//         if($scope.baseImage){
//             imageData.mediumImage = $scope.baseImage;
//         }
//         if($scope.thumbImage){
//             imageData.thumbImage = $scope.thumbImage;
//         }
//         if($scope.largeImage){
//             imageData.largeImage = $scope.largeImage;
//         }
//         if($scope.xlargeImage){
//             imageData.extraLargeImage = $scope.xlargeImage;
//         }
//         imageData.productId = $scope.node.productId;
//         // imageData.imageName = null;
//         imageData.currentImageFolderId = 2;
        


// // saveProductImages saveCategoryImages
//         Upload.upload({
//             url: 'http://17.114.31.185:8080/HaastikaDataService/admin/saveProductImages',
//             data: imageData
//         }).then(function (resp) {
//             // console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
//             $scope.categoryMenuImage = null;
//             $scope.categoryBannerImage = null;
//             $scope.categoryTileImage = null;
//             $scope.imgLoading = false;

//             $scope.node.categoryBannerImagePath = resp.data.bannerImageUploadStatus.uplodedImagePath;
//             $scope.node.categoryMenuImagePath = resp.data.menuImageUploadStatus.uplodedImagePath;
//             $scope.node.categoryTileImagePath = resp.data.tileImageUploadStatus.uplodedImagePath;

//             $scope.saveCategory($scope.node);

//         }, function (resp) {
//             console.log('Error status: ' + resp);
//         }, function (evt) {
//             var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
//             // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
//         });
//     };
    
    

}]);

