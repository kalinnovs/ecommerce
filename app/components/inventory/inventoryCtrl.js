
angular.module('eCommerce')
.controller('InventoryCtrl',['$scope', '$http', '$uibModal', function($scope, $http, $uibModal){
    var url = "assets/json/product.json";
debugger;
    $http.get(url).success( function(response) {
        $scope.products = response.productList;
        $scope.categoryList = response.categoryList;
    });
    
    $scope.columns = [
                    {text:"Part No",predicate:"productPartNo",sortable:true,dataType:"number"},
                    {text:"Product Name",predicate:"productName",sortable:true},
                    {text:"Description",predicate:"description",sortable:true},
                    {text:"Stock",predicate:"productAvailablility",sortable:true},
                    {text:"Price",predicate:"productPrice",sortable:true},
                    {text:"Thumbnail",predicate:"",sortable:false},
                    {text:"Status",predicate:"productStatus",sortable:true},
                    {text:"Action",predicate:"",sortable:false}
                ];

    $scope.orderByField = 'PartNo';
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
          templateUrl: 'app/components/inventory/productEdit.html',
          controller: 'productEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            },
            categoryList: function () {
              return $scope.categoryList;
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
.controller('productEditCtrl', function ($scope) {
debugger;
    $scope.product = angular.copy(item);
    $scope.categoryList = angular.copy(categoryList);
    $scope.cancel = function () {
        $uibModalInstance.dismiss('Close');
    };
    $scope.title = (item.PartNo > 0) ? 'Edit Product' : 'Add Product';
    $scope.buttonText = (item.PartNo > 0) ? 'Update Product' : 'Add New Product';

    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.product);
    };

    $scope.getSubCategories = function(){
        debugger;
        console.log($scope.product.categoryId);
    }
});
