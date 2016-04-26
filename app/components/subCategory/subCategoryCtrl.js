
angular.module('eCommerce')
.controller('SubCategoryCtrl',['$scope', '$http', '$uibModal', function($scope, $http, $uibModal){
    var url = "assets/json/subCategory.json";

    $http.get(url).success( function(response) {
        $scope.categories = response.categories;
        $scope.subCategories = [];
        $.each($scope.categories, function(i,category){
            $.each(category.subcategoryList, function(i,subCategory){
                var subCategoryObj = {};
                subCategoryObj.categoryId      = category.categoryId;
                subCategoryObj.categoryName    = category.categoryName;
                subCategoryObj.subCategoryId   = subCategory.categoryId;
                subCategoryObj.subCategoryName = subCategory.categoryName;
                subCategoryObj.subCategoryStatus  = subCategory.categoryStatus;
                subCategoryObj.imagePath       = subCategory.categoryImagePath;

                $scope.subCategories.push(subCategoryObj);
            });
        });
        
    });
    
    $scope.columns = [
                    {text:"Sub Category No",predicate:"subCategoryId",sortable:true,dataType:"number"},
                    {text:"Category Name",predicate:"categoryName",sortable:true},
                    {text:"Sub Category Name",predicate:"subCategoryName",sortable:true},
                    {text:"Thumbnail",predicate:"",sortable:false},
                    {text:"Status",predicate:"subCategoryStatus",sortable:true},
                    {text:"Action",predicate:"",sortable:false}
                ];

    $scope.orderByField = 'subCategoryId';
    $scope.reverseSort = false;

    // Sort Product
    $scope.order = function(predicate) {
        $scope.reverseSort = ($scope.orderByField === predicate) ? !$scope.reverseSort : false;
        $scope.orderByField = predicate;
    };

    // Edit Product Status
    $scope.changecategoryStatus = function(subCategory){
        subCategory.subCategoryStatus = (subCategory.subCategoryStatus=="Active" ? "Inactive" : "Active");
    };

    // Delete Product
    $scope.deletecategory = function(product){
        if(confirm("Are you sure to remove the sub ")){
            $scope.subCategories = _.without($scope.subCategories, _.findWhere($scope.subCategories, {PartNo:product.PartNo}));
        }
    };

    // Open Product Detail
    $scope.open = function (p,size) {
        var modalInstance = $uibModal.open({
          templateUrl: 'app/components/subCategory/subCategoryEdit.html',
          controller: 'subCategoryEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            },
            category: function () {
              return $scope.categories;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.products.push(selectedObject);
                $scope.products = $filter('orderBy')($scope.products, 'id', 'reverse');
            }else if(selectedObject.save == "update"){
                p.description = selectedObject.description;
                p.price = selectedObject.price;
                p.stock = selectedObject.stock;
                p.packing = selectedObject.packing;
            }
        });
    };
}]);

angular.module('eCommerce')
.controller('subCategoryEditCtrl', function ($scope, $uibModalInstance, item, category) {

    $scope.subCategory = angular.copy(item);
    $scope.category = angular.copy(category);
    $scope.selectedCategory = {'categoryId': '1', 'categoryName': item.categoryName};       
    $scope.cancel = function () {
        $uibModalInstance.dismiss('Close');
    };
    $scope.title = (item.categoryId > 0) ? 'Edit Product' : 'Add Product';
    $scope.buttonText = (item.categoryId > 0) ? 'Update Category' : 'Add New Category';

    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.product);
    }
});


