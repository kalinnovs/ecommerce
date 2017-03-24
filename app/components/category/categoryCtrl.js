
angular.module('eCommerce')
.controller('CategoryCtrl',['$scope', '$http', 'categoryService', '$uibModal', function($scope, $http, categoryService, $uibModal){
    var url = "http://ec2-52-32-195-43.us-west-2.compute.amazonaws.com/HaastikaWebService/categories?callback=angular.callbacks._0";
    // var url = "assets/json/category.json";

    // $http.jsonp(url).success( function(response) {
    // $http.get(url).success( function(response) {
    //     $scope.categories = response;
    // });
    categoryService.list().then(function(data){
        $scope.categories = data.data;
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
    $scope.category = {};

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
                $scope.categories.push(selectedObject);
                // $scope.categories = $filter('orderBy')($scope.categories, 'categoryId', 'reverse');

                categoryService.save(selectedObject).then(function(data){
                    console.log('data saved');
                    debugger;
                });
            }else if(selectedObject.save == "update"){
                p.categoryName = selectedObject.categoryName;
                p.description = selectedObject.description;
                p.categoryStatus = selectedObject.categoryStatus;

                delete selectedObject["save"];
                categoryService.save(selectedObject).then(function(data){
                    console.log('data saved');
                    debugger;
                });

                // $http.post('http://ec2-52-32-195-43.us-west-2.compute.amazonaws.com/HaastikaWebService/updateCategories', {categoryId : selectedObject.categoryId , category: selectedObject})
                // .success( function(response) {
                //     debugger;
                // });
            }
        });
    };
}]);

angular.module('eCommerce')
.controller('categoryEditCtrl', ['$scope', '$uibModalInstance', 'item', function ($scope, $uibModalInstance, item) {

    $scope.category = angular.copy(item);
        
    $scope.cancel = function () {
        $uibModalInstance.dismiss('Close');
    };
    $scope.title = (item.categoryId > 0) ? 'Edit Category' : 'Add Category';
    $scope.buttonText = (item.categoryId > 0) ? 'Update Category' : 'Add New Category';

    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.product);
    };

    $scope.saveCategory = function (category) {
        if(category.categoryId > 0){
            var x = angular.copy(category);
            x.save = 'update';
            $uibModalInstance.close(x);
        }else{
            // product.status = 'Active';
            var x = angular.copy(category);
            x.save = 'insert';
            $uibModalInstance.close(x);
        }
    };
}]);


