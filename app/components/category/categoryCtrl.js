
angular.module('eCommerce')
.controller('CategoryCtrl',['$scope', '$http', '$uibModal', function($scope, $http, $uibModal){
    var url = "assets/json/category.json";

    $http.get(url).success( function(response) {
        $scope.categories = response;
    });
    
    $scope.columns = [
                    {text:"Category No",predicate:"categoryId",sortable:true,dataType:"number"},
                    {text:"Category Name",predicate:"categoryName",sortable:true},
                    {text:"Description",predicate:"description",sortable:true},
                    {text:"Thumbnail",predicate:"",sortable:false},
                    {text:"Status",predicate:"categoryStatus",sortable:true},
                    {text:"Action",predicate:"",sortable:false}
                ];

    $scope.orderByField = 'categoryId';
    $scope.reverseSort = false;

    // Sort Product
    $scope.order = function(predicate) {
        $scope.reverseSort = ($scope.orderByField === predicate) ? !$scope.reverseSort : false;
        $scope.orderByField = predicate;
    };

    // Edit Product Status
    $scope.changeProductStatus = function(product){
        product.productStatus = (product.productStatus=="Active" ? "Inactive" : "Active");
    };

    // Delete Product
    $scope.deleteProduct = function(product){
        if(confirm("Are you sure to remove the product")){
            $scope.products = _.without($scope.products, _.findWhere($scope.products, {PartNo:product.PartNo}));
        }
    };

    // Open Product Detail
    $scope.open = function (p,size) {
        var modalInstance = $uibModal.open({
          templateUrl: 'app/components/category/categoryEdit.html',
          controller: 'categoryEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
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
.controller('categoryEditCtrl', function ($scope, $uibModalInstance, item) {

    $scope.category = angular.copy(item);
        
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


