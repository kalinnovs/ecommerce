
angular.module('eCommerce')
.controller('InventoryCtrl',['$scope', '$http', '$uibModal', function($scope, $http, $uibModal){
    var url = "data.txt";

    $http.get(url).success( function(response) {
        $scope.products = response;
    });
    
    $scope.columns = [
                    {text:"Part No",predicate:"PartNo",sortable:true,dataType:"number"},
                    {text:"Display Name",predicate:"Name",sortable:true},
                    {text:"Description",predicate:"Description",sortable:true},
                    {text:"Stock",predicate:"Stock",sortable:true},
                    {text:"Price",predicate:"Price",sortable:true},
                    {text:"Thumbnail",predicate:"",sortable:false},
                    {text:"Status",predicate:"Status",sortable:true},
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
        product.Status = (product.Status=="Active" ? "Inactive" : "Active");
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
.controller('productEditCtrl', function ($scope, $uibModalInstance, item) {

    $scope.product = angular.copy(item);
        
    $scope.cancel = function () {
        $uibModalInstance.dismiss('Close');
    };
    $scope.title = (item.PartNo > 0) ? 'Edit Product' : 'Add Product';
    $scope.buttonText = (item.PartNo > 0) ? 'Update Product' : 'Add New Product';

    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.product);
    }
});


