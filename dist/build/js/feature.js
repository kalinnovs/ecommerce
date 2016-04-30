(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

angular.module('eCommerce', ['ui.router','ui.bootstrap','firebase'])
  .constant('BASE_URI', 'https://intense-torch-8839.firebaseio.com/')
  .constant('SERVICE_URL', 'http://ec2-52-33-88-59.us-west-2.compute.amazonaws.com/HaastikaWebService')
  .constant('ENDPOINT_URI', './')
  .constant('DIRECTIVE_URI', '/app/directives/')
  .config(function ($stateProvider, $httpProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('login', {
        url:'/login',
        templateUrl: 'app/components/login/loginView.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .state('home', {
        url:'/home',
        views: {
          '': { 
            templateUrl: 'app/components/home/homeView.html',
            controller: 'HomeCtrl',
            controllerAs: 'home'
          },
          'heroBanner@home': { 
            templateUrl: 'app/shared/hero/heroView.html'
          },
          'tileLayout@home': {
            templateUrl: 'app/shared/tiles/tileView.html',
            controller: 'tileCtrl',
            controllerAs: 'tile'
          }
        }
      })
      .state('register', {
        url:'/register',
        views: {
          '': { 
            templateUrl: 'app/components/register/registerView.html',
            controller: 'RegisterCtrl',
            controllerAs: 'register'
          }
        }
      })
      .state('aboutus', {
        url:'/aboutus',
        views: {
          '': { 
            templateUrl: 'app/components/aboutus/aboutusView.html',
            controller: 'aboutCtrl',
            controllerAs: 'about'
          }
        }
      })
      .state('product', {
        url:'/product/{id}',
        views: {
          '': { 
            templateUrl: 'app/components/details/detailView.html',
            controller: 'DetailCtrl',
            controllerAs: 'details'
          }
        }
      })
      .state('category', {
        url:'/category/{id}',
        views: {
          '': { 
            templateUrl: 'app/components/category/categoryView.html',
            controller: 'categoryCtrl',
            controllerAs: 'cat'
          }
        }
      })
      .state('admin', {
        url:'/admin',
        views: {
          '': { 
            templateUrl: 'app/components/admin/adminView.html',
            controller: 'AdminCtrl',
            controllerAs: 'admin'
          }
        }
      })
      .state('inventory', {
        url:'/inventory',
        views: {
          '': { 
            templateUrl: 'app/components/inventory/inventory.html',
            controller: 'InventoryCtrl',
            controllerAs: 'InventoryCtrl'
          }
        }
      })
      .state('subscriber', {
        url:'/inventory/subscriber',
        views: {
          '': { 
            templateUrl: 'app/components/subscribers/subscriberView.html',
            controller: 'SubscriberCtrl',
            controllerAs: 'SubscriberCtrl'
          }
        }
      })
      .state('download', {
        url:'/download',
        views: {
          '': { 
            templateUrl: 'app/components/download/downloadView.html'
          }
        }
      })
      .state('contact', {
        url:'/contact',
        views: {
          '': { 
            templateUrl: 'app/components/contact/contactView.html',
            controller: 'ContactCtrl',
            controllerAs: 'contacts'
          }
        }
      })
      .state('productTree', {
        url:'/productTree',
        views: {
          '': { 
            templateUrl: 'app/components/inventory/productTree.html',
            controller: 'productTreeCtrl',
            controllerAs: 'productTreeCtrl'
          }
        }
      })
    ;

    // We need to setup some parameters for http requests
    // These three lines are all you need for CORS support
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

  })
  .run(function run($rootScope, $location, $http) {
    $rootScope.$on('$stateChangeSuccess',function(){
      $("html, body").animate({ scrollTop: 0 }, 200);
    });
  })
;

},{}],2:[function(require,module,exports){
'use strict';

angular.module('eCommerce')
  .service('UserService', function ($http, $rootScope, ENDPOINT_URI) {
    var service = this;
    
    service.GetAll = function(url) {
        return $http.get(url).then(service.handleSuccess, service.handleError('Error getting all users'));
    }

    service.GetById = function(id) {
        return $http.get('/api/users/' + id).then(service.handleSuccess, service.handleError('Error getting user by id'));
    }
 
    service.GetByUsername = function(username) {
        return $http.get('/api/users/' + username).then(service.handleSuccess, service.handleError('Error getting user by username'));
    }
 
    service.Create = function(user) {
        return $http.post('/api/user/register', user);
    }
 
    service.Update = function(url, user) {
        return $http.put('/api/users/' + user.id, user).then(service.handleSuccess, service.handleError('Error updating user'));
    }
 
    service.Delete = function(id) {
        return $http.delete('/api/users/' + id).then(service.handleSuccess, service.handleError('Error deleting user'));
    }
 
    // private functions
 
    service.handleSuccess = function(res) {
        service.set(res);
        return res.data;
    }
 
    service.handleError = function(res) {
        return function () {
            return { success: false, message: res.message };
        };
    }

    service.get = function() {
        return service.data;
    }

    service.set = function(data_) {
        service.data = data_;
        $rootScope.$broadcast('event:data-change');
    }

  });

},{}],3:[function(require,module,exports){
'use strict';

angular.module('eCommerce')
  .service('AboutService', function ($http, ENDPOINT_URI) {
    var service = this;
    //to create unique contact id
    var uid = 1;
      
    //simply returns the contacts list
    service.list = function () {
        return service.contacts;
    }


    service.extract = function(result) {
    	return result.data;
    }

    service.getURL = function() {
    	return ENDPOINT_URI + "assets/json/default.json";
    }

    //simply returns the contacts list
    service.all = function () {
        return $http.get(service.getURL()).then(service.extract);
    }

    service.getFromURL = function(url) {
        return $http.get(url).then(service.extract);
    }


  });
},{}],4:[function(require,module,exports){
'use strict';

angular.module('eCommerce')
  .controller('aboutCtrl', function ($scope, $rootScope, $sce, UserService, AboutService, SERVICE_URL, BASE_URI) {
    var about = this;
    var scoper = $scope;

    // $rootScope.navigation = UserService.get().data.pageNavigation.categories;
    // AboutService.GetAll( BASE_URI + 'eCommerce/aboutUs.json')
    AboutService.getFromURL( SERVICE_URL + '/aboutus')
        .then(function(data) {
          $rootScope.navigation = data.pageNavigation.categories; 
          $scope.htmlDescription = data.content;
        })
        .catch(function(error) {
            //
        })
        .finally(function() {
            //
        })
    // debugger;

    $scope.getHtml = function(html){
        return $sce.trustAsHtml(html);
    };
  })
.filter('html', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

},{}],5:[function(require,module,exports){
'use strict';

angular.module('eCommerce')
  .controller('AdminCtrl', function ($scope, $rootScope, UserService, BASE_URI, $stateParams, $firebaseObject) {
    var admin = this;
    
    var ref = new Firebase("https://intense-torch-8839.firebaseio.com");

    $rootScope.navigation = UserService.get().data.pageNavigation.categories;
    
    // download the data into a local object
    var syncObject = $firebaseObject(ref);
    
    // synchronize the object with a three-way data binding
    // click on `index.html` above to see it used in the DOM!
    syncObject.$bindTo($scope, "data");

    // create a synchronized array
    // click on `index.html` above to see it used in the DOM!
    $scope.messages = $firebaseArray(ref);

    // add new items to the array
    // the message is automatically added to our Firebase database!
    $scope.addMessage = function() {
        $scope.messages.$add({
          text: $scope.newMessageText
        });
    };

    debugger;
  })
;

},{}],6:[function(require,module,exports){
'use strict';

angular.module('eCommerce')
  .controller('categoryCtrl', function ($scope, $rootScope, $sce, CategoryService, UserService, $stateParams, SERVICE_URL, BASE_URI) {
    var cat = this;
    var scoper = $scope;

    CategoryService.getFromURL( SERVICE_URL + '/category/'+$stateParams.id)
        .then(function(data) {
          cat.data = data;
          $rootScope.navigation = data.pageNavigation.categories; 
          // $scope.htmlDescription = data.productDescription; 
        })
        .catch(function(error) {
            //
        })
        .finally(function() {
            //
        })
    // debugger;

    $scope.showFilter = function(elem) {
      if($(".categoryTree").hasClass("show")) {
        $(".categoryTree").removeClass("show");
        $(".spacingAdjust").css("margin-left","0px");
      } else {
        $(".categoryTree").addClass("show");
        $(".spacingAdjust").css("margin-left","285px");  
      }
    };

    $scope.showList = function(elem) {
      $(elem.target).css('color', '#33adff');
      $(elem.target).parents(".listing").find(".spacingAdjust").addClass("listView");
    };

    $scope.showGrid = function(elem) {
      $(elem.target).css('color', '#000');
      $(elem.target).parents(".listing").find(".spacingAdjust").removeClass("listView");
    };

    $scope.getHtml = function(html){
        return $sce.trustAsHtml(html);
    };

  })
  .filter('html', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

},{}],7:[function(require,module,exports){

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
.controller('categoryEditCtrl', function ($scope, $uibModalInstance, item) {

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
});



},{}],8:[function(require,module,exports){
'use strict';

angular.module('eCommerce')
  .service('CategoryService', function ($http, ENDPOINT_URI) {
    var service = this;
    //to create unique contact id
    var uid = 1;
      
    //simply returns the contacts list
    service.list = function () {
        return service.contacts;
    }


    service.extract = function(result) {
    	return result.data;
    }

    service.getURL = function() {
    	return ENDPOINT_URI + "assets/json/default.json";
    }

    //simply returns the contacts list
    service.all = function () {
        return $http.get(service.getURL()).then(service.extract);
    }

    service.getFromURL = function(url) {
        return $http.get(url).then(service.extract);
    }


  });
},{}],9:[function(require,module,exports){
'use strict';

angular.module('eCommerce')
  .controller('ContactCtrl', function ($scope, $http, $rootScope, UserService, BASE_URI) {
    var contacts = this;
    var original = $scope.user;

    // $rootScope.navigation = UserService.get().data.pageNavigation.categories;
    
    // function to submit the form after all validation has occurred            
    $scope.submitForm = function() {

        var mailService = "http://kalinnovs.com/ecommerce/app/app.sendFeedback.php";
        // check to make sure the form is completely valid
        if ($scope.userForm.$valid) {
            $http.post(mailService, contacts.user).success(function(data, status) {
                contacts.feedbackSent = data.status;
                contacts.pushNotification = data.message;
                contacts.sentSuccesfully = data.sentSuccesfully;
                contacts.sentFailed = data.sentFailed;
                // $scope.reset();
            });
            // $scope.reset($scope.userForm);
        }   

    };

    $scope.reset = function(data) {
        data.name = ''; data.email = ''; data.company = ''; data.message = '';
        $scope.userForm.$dirty = false;
        $scope.userForm.$pristine = true;
        $scope.userForm.$submitted = false;
    };


  })
;

},{}],10:[function(require,module,exports){
'use strict';

angular.module('eCommerce')
  .controller('DetailCtrl', function ($scope, $rootScope, $sce, UserService, DetailService, SERVICE_URL, BASE_URI, $stateParams) {
    var details = this;
    

    // DetailService.getFromURL( BASE_URI + '/eCommerce/productDetails.json')
    // $rootScope.navigation = UserService.get().data.pageNavigation.categories;
    DetailService.getFromURL( SERVICE_URL + '/product/'+$stateParams.id)
        .then(function(data) {
            $scope.data = data.productDetails;
            if(data.pageNavigation) {
                $rootScope.navigation = data.pageNavigation.categories;     
            } else if ( UserService.get()) {
                $rootScope.navigation = UserService.get().data.pageNavigation.categories;
            }
            // $scope.htmlDescription = data.productDescription; 
        });


    $scope.getHtml = function(html){
        return $sce.trustAsHtml(html);
    };
  })

.filter('html', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

},{}],11:[function(require,module,exports){
'use strict';

angular.module('eCommerce')
  .service('DetailService', function ($http, ENDPOINT_URI) {
    var service = this;
    //to create unique contact id
    var uid = 1;
      
    //simply returns the contacts list
    service.list = function () {
        return service.contacts;
    }


    service.extract = function(result) {
    	return result.data;
    }

    service.getURL = function() {
    	return ENDPOINT_URI + "assets/json/default.json";
    }

    //simply returns the contacts list
    service.all = function () {
        return $http.get(service.getURL()).then(service.extract);
    }

    service.getFromURL = function(url) {
        return $http.get(url).then(service.extract);
    }


  });
},{}],12:[function(require,module,exports){
'use strict';

angular.module('eCommerce')
  .controller('HomeCtrl', function ($scope, $rootScope, UserService, SERVICE_URL) {
    var home = this;
    var scoper = $scope;
    // debugger;

    // UserService.GetAll( BASE_URI + '/eCommerce/home.json')
    UserService.GetAll( SERVICE_URL + '/home')
        .then(function(data) {
          if(data.success === undefined || data.success) {
            $rootScope.navigation = data.pageNavigation.categories;  
          } else {
            // Else pick local JSON
          }
        })
        .catch(function(error) {
            //
        })
        .finally(function() {
            //
        })

    this.shuffleTiles = function() {
      var parent = $(".tileShuffle");
      var divs = parent.children();
      while (divs.length) {
          parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
      }
    };
    // Google Map
    this.initiateMap = function() {
      // Create an array of styles.
      var styles = [
          {
              stylers: [
                  
                  { saturation: -40 }
              ]
          },{
              featureType: "road.arterial",
              elementType: "geometry",
              stylers: [
                  { saturation: 70 }
              ]
          },{
              featureType: "road.local",
              elementType: "labels",
              stylers: [
                  { visibility: "on" },
                  { saturation: -50 }
              ]
          },{
              featureType: "poi.business",
              elementType: "labels",
              stylers: [
                { visibility: "on" }
              ]
          }
      ];

      // Create a new StyledMapType object, passing it the array of styles,
      // as well as the name to be displayed on the map type control.
      var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

      // Create a map object, and include the MapTypeId to add
      // to the map type control.
      var mapOptions = {
          scrollwheel: false,
          zoom: 16,
          center: new google.maps.LatLng(20.279880, 85.796626),
          mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
          }
      };

      if($("#map_canvas").length > 0) {
          var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

          var marker = new google.maps.Marker({
              position: new google.maps.LatLng(20.279880, 85.796626),
              map: map,
              title: 'Haastika'
          });
          marker.addListener('click', function() {
              infowindow.open(map, marker);
          });

          //Associate the styled map with the MapTypeId and set it to display.
          map.mapTypes.set('map_style', styledMap);
          map.setMapTypeId('map_style');
      }
    };
    // $scope.doThis = function($scope) {
    //     // $(".progress").hide();
    //     debugger;
    //     shuffleTiles();
    // };    
    $scope.afterPageRendered = function () {
      // debugger;
        $scope.foo = 'newFoo';
    }
  })
;

},{}],13:[function(require,module,exports){
'use strict';

angular.module('eCommerce')
  .service('HomeService', function ($http, ENDPOINT_URI) {
    var service = this;
    //to create unique contact id
    var uid = 1;
      
    //simply returns the contacts list
    service.list = function () {
        return service.data.list;
    }


    service.extract = function(result) {
    	return result.data;
    }

    service.getURL = function() {
    	return ENDPOINT_URI + "assets/json/default.json";
    }

    //simply returns the contacts list
    service.all = function () {
        return $http.get(service.getURL()).then(service.extract);
    }

    service.getFromURL = function(url) {
        return $http.get(url).then(service.extract);
    }

  });
},{}],14:[function(require,module,exports){

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

},{}],15:[function(require,module,exports){

angular.module('eCommerce')
.controller('productTreeCtrl', ['$scope', 'productTreeService', function($scope, productTreeService) {
    productTreeService.list().then(function(data){
        $scope.rootCatogories = data.data.availableRootCatogories;
        $scope.categoryList = data.data.categoryList;
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


},{}],16:[function(require,module,exports){
'use strict';

angular.module('eCommerce')
  .service('productTreeService', ['$http', function ($http) {
    var service = this;
    var BASE_URL = "http://ec2-52-33-88-59.us-west-2.compute.amazonaws.com/HaastikaWebService/admin";
    // var BASE_URL = "http://17.168.48.250:8080/HaastikaDataService/admin";
    // var BASE_URL = "assets/json/productTree.json";
    // var BASE_URL = 'http://127.0.0.1:8081';

    //simply returns the category list
    service.list = function () {
        return $http.get(BASE_URL + "/categorytree"); // + "/categorytree"
    }

    service.savecategory = function (category) {
        return $http.post(BASE_URL + "/savecategory", JSON.stringify(category));
    }

    service.saveProduct = function (category) {
        return $http.post(BASE_URL + "/saveproduct", JSON.stringify(category));
    }
}]);
},{}],17:[function(require,module,exports){
angular.module('eCommerce')
  .controller('LoginCtrl', function () {
    var login = this;
    login.title = 'Doom';

    $scope.submitForm = function() {

    };

    $scope.resetForm = function(){
	   $scope.userForm.$dirty = false;
	   $scope.userForm.$pristine = true;
	   $scope.userForm.$submitted = false;
	};
  })
;
},{}],18:[function(require,module,exports){
'use strict';

angular.module('eCommerce')
  .controller('RegisterCtrl', function ($scope, $rootScope, $location, UserService, $http, BASE_URI, SERVICE_URL, $firebaseObject) {
        var register = this;
        var scoper = $scope;

        // debugger;

        // $rootScope.navigation = UserService.get().data.pageNavigation.categories;
        
        this.register = function() {
            
            /* Firebase profile entry code for time being STARTS */

            // var ref = new Firebase(BASE_URI+ "/eCommerce/register/registeration");
            // var newMessageRef = ref.push();
            //     newMessageRef.set(register.user);
            // var path = newMessageRef.toString();

            /* Firebase profile entry code for time being ENDS */

            /* Real Time Service STARTS */
            var url = SERVICE_URL+"/saveNewUserSubscription";
            var mailService = "http://kalinnovs.com/ecommerce/app/app.sendMail.php";
            
            // $http.post(url, register.user).success(function(data, status) {
            //     if(data.subscribedSuccesfully) {
            //         register.pushNotification = data.subscriptionMessage;
            //         register.subscribedFailed = false;
            //         $http.post(mailService, register.user).success(function(data, status) {
            //             register.subscribedSuccesfully = true;
            //         });
            //     } else {
            //         register.subscribedFailed = true;
            //         register.subscribedSuccesfully = false;
            //         register.pushNotification = data.errorMessage;
            //     }
            // });

            // register.user = {};
            register.user={id:null,firstName:'',lastName:'',emailId:'',contactNo:''};
            $scope.form.$setPristine();
            // $location.path( "/home" );
        };
    
    })
;

},{}],19:[function(require,module,exports){

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



},{}],20:[function(require,module,exports){
'use strict';

angular.module('eCommerce')
  .controller('SubscriberCtrl', function ($scope, $rootScope, $location, UserService, $http, SERVICE_URL) {
    var subscriber = this;
    var scoper = $scope;
    // debugger;

    $rootScope.navigation = UserService.get().data.pageNavigation.categories;

    UserService.GetAll( SERVICE_URL + 'subscribers')
        .then(function(data) {
          subscriber.data = data;
        })
        .catch(function(error) {
            //
        })
        .finally(function() {
            //
        })

    $scope.approvePromo = function(elem) {
        var className = $(elem.target).hasClass("fa-toggle-off");
        if(className) {
            $(elem.target).removeClass("fa-toggle-off").addClass("fa-toggle-on");
            $(elem.target).parents("tr").addClass("flash");
        } else {
            $(elem.target).removeClass("fa-toggle-on").addClass("fa-toggle-off");
            $(elem.target).parents("tr").removeClass("flash");
        }
    };



})    

;

},{}],21:[function(require,module,exports){
angular.module('eCommerce')
.directive('editOnFocus', function() {
    return {
        restrict: 'E',
        scope: { value: '=' },
        template: '<span ng-click="edit()" ng-bind="value"></span><input ng-model="value"></input>',
        link: function ( $scope, element, attrs ) {
            element.addClass('editOnFocus');
            var inputElement = jQuery(element).children()[1];//angular.element( element.children()[1] );

            $scope.edit = function(){
                element.addClass('active');
                jQuery(inputElement).focus();
            };

            // When we leave the input, we're done editing.
            jQuery(inputElement).on( 'blur', function() {
                element.removeClass( 'active' );
            });
        }
    };
});
},{}],22:[function(require,module,exports){
angular.module('eCommerce')
.directive('formElement', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            label : "@",
            model : "="
        },
        link: function(scope, element, attrs) {
            scope.disabled = attrs.hasOwnProperty('disabled');
            scope.required = attrs.hasOwnProperty('required');
            scope.pattern = attrs.pattern || '.*';
        },
        template: '<div class="form-group row"><label class="col-sm-3 control-label no-padding-right" >  {{label}}</label><div class="col-sm-7"><span class="block input-icon input-icon-right" ng-transclude></span></div></div>'
      };
        
});

},{}],23:[function(require,module,exports){
'use strict';

angular.module('eCommerce')
  .directive('stickyMenu', function ($compile, DIRECTIVE_URI) {
    var linker = function(scope, element, attrs) {
      var menu = element,
        stickyClass = "nav-sticky",
        hdr = $(element).position().top;

      /* Window Scroll event */
      $(window).scroll(function() {
        if( $(this).scrollTop() > hdr ) {
          menu.addClass(stickyClass);
        } else {
          menu.removeClass(stickyClass);
        }
      });
    };

    return {
        restrict: "EA",
        link: linker,
        transclude: true,
        template: '<div class="stickyMenu"><div class="controls" ng-transclude></div></div>'
    };
});
},{}],24:[function(require,module,exports){
'use strict';

angular.module('eCommerce')
  .controller('tileCtrl', function ($scope, $rootScope, UserService, BASE_URI) {
    var tile = this;

    $rootScope.$on('event:data-change', function() {
      var object = UserService.get();
      tile.layout = object.data.pageLayoutDetails.layouts;
      tile.renderTemplate();
    });

    tile.renderTemplate = function() {
      $.each(tile.layout, function(k, v) {
          /// do stuff
          $scope[k] = 'app/shared/tiles/'+k+'.html';
      });
    };

  })
;

},{}],25:[function(require,module,exports){
require("../multizoom.js");
require("../parallax.js");
require("../wowslider.js");
require("../overlay.js");
require("../scripts.js");


require("../../../vendor/js/angular-ui-router.min.js");
require("../../../app/app.routes.js");
require("../../../app/app.services.js");


require("../../../app/components/home/homeController.js");
require("../../../app/components/home/homeService.js");
require("../../../app/shared/tiles/tileController.js");


require("../../../app/components/aboutus/aboutusController.js");
require("../../../app/components/aboutus/aboutService.js");

require("../../../app/components/contact/contactController.js");

require("../../../app/components/details/detailController.js");
require("../../../app/components/details/detailService.js");


require("../../../app/components/category/categoryController.js");
require("../../../app/components/category/categoryService.js");

require("../../../app/components/login/loginController.js");


require("../../../app/components/register/registerController.js");


require("../../../app/components/subscribers/subscriberController.js");


require("../../../app/components/admin/adminController.js");
require("../../../app/components/inventory/inventoryCtrl.js");
require("../../../app/components/category/categoryCtrl.js");
require("../../../app/components/subCategory/subCategoryCtrl.js");
require("../../../app/shared/tiles/tileController.js");


require("../../../app/directives/sticky/stickyMenu-directive.js");
require("../../../app/directives/editOnFocus/editOnFocus-directive.js");
require("../../../app/directives/formElement/formElement-directive.js");

require("../../../app/components/inventory/productTreeCtrl.js");
require("../../../app/components/inventory/productTreeService.js");
},{"../../../app/app.routes.js":1,"../../../app/app.services.js":2,"../../../app/components/aboutus/aboutService.js":3,"../../../app/components/aboutus/aboutusController.js":4,"../../../app/components/admin/adminController.js":5,"../../../app/components/category/categoryController.js":6,"../../../app/components/category/categoryCtrl.js":7,"../../../app/components/category/categoryService.js":8,"../../../app/components/contact/contactController.js":9,"../../../app/components/details/detailController.js":10,"../../../app/components/details/detailService.js":11,"../../../app/components/home/homeController.js":12,"../../../app/components/home/homeService.js":13,"../../../app/components/inventory/inventoryCtrl.js":14,"../../../app/components/inventory/productTreeCtrl.js":15,"../../../app/components/inventory/productTreeService.js":16,"../../../app/components/login/loginController.js":17,"../../../app/components/register/registerController.js":18,"../../../app/components/subCategory/subCategoryCtrl.js":19,"../../../app/components/subscribers/subscriberController.js":20,"../../../app/directives/editOnFocus/editOnFocus-directive.js":21,"../../../app/directives/formElement/formElement-directive.js":22,"../../../app/directives/sticky/stickyMenu-directive.js":23,"../../../app/shared/tiles/tileController.js":24,"../../../vendor/js/angular-ui-router.min.js":31,"../multizoom.js":26,"../overlay.js":27,"../parallax.js":28,"../scripts.js":29,"../wowslider.js":30}],26:[function(require,module,exports){

// Multi-Zoom Script (c)2012 John Davenport Scheuer
// as first seen in http://www.dynamicdrive.com/forums/
// username: jscheuer1 - This Notice Must Remain for Legal Use
// requires: a modified version of Dynamic Drive's Featured Image Zoomer (w/ adjustable power) (included)

/*Featured Image Zoomer (May 8th, 2010)
* This notice must stay intact for usage 
* Author: Dynamic Drive at http://www.dynamicdrive.com/
* Visit http://www.dynamicdrive.com/ for full source code
*/

// Feb 21st, 2011: Script updated to v1.5, which now includes new feature by jscheuer1 (http://www.dynamicdrive.com/forums/member.php?u=2033) to show optional "magnifying lens" while over thumbnail image.
// March 1st, 2011: Script updated to v1.51. Minor improvements to inner workings of script.
// July 9th, 12': Script updated to v1.5.1, which fixes mouse wheel issue with script when used with a more recent version of jQuery.
// Nov 5th, 2012: Unofficial update to v1.5.1m for integration with multi-zoom (adds multiple images to be zoomed via thumbnail activated image swapping)
// Nov 28th, 2012: Version 2.1 w/Multi Zoom, updates - new features and bug fixes

var featuredimagezoomer = { // the two options for Featured Image Zoomer:
	loadinggif: 'assets/images/spinningred.gif', // full path or URL to "loading" gif
	magnifycursor: 'crosshair' // value for CSS's 'cursor' property when over the zoomable image
};

	//////////////// No Need To Edit Beyond Here ////////////////

// jQuery.noConflict();

(function($){

	$('head').append('<style type="text/css">.featuredimagezoomerhidden {visibility: hidden!important;}</style>');

	$.fn.multizoomhide = function(){
		return $('<style type="text/css">' + this.selector + ' {visibility: hidden;}<\/style>').appendTo('head');
	};

	$.fn.addmultizoom = function(options){

		var indoptions = {largeimage: options.largeimage}, $imgObj = $(options.imgObj + ':not(".thumbs")'),
		$descArea = $(options.descArea), first = true, splitre = /, ?/;

		options = $.extend({
				speed: 'slow',
				initzoomablefade: true,
				zoomablefade: true
			}, options);

		function loadfunction(){
			var lnk = this, styleobj1 = {}, styleobj2 = {}, $nim, lnkd, lnkt, lnko, w, h;
			if((lnkd = lnk.getAttribute('data-dims'))){
				lnkd = lnkd.split(splitre);
				w = lnkd[0]; h = lnkd[1];
			}
			$(new Image()).error(function(){
				if(lnk.tagName && !options.notmulti){
					alert("Error: I couldn't find the image:\n\n" + lnk.href + ((lnkt = lnk.getAttribute('data-title'))? '\n\n"' + lnkt + '"' : ''));
					if((lnko = $imgObj.data('last-trigger'))){
						first = true;
						$(lnko).trigger('click');
					}
				}
			}).load(function(){
				var opacity = $imgObj.css('opacity'), combinedoptions = {}, $parent;
				if(isNaN(opacity)){opacity = 1;}
				if(options.notmulti || !indoptions.largeimage){
					w = options.width || $imgObj.width(); h = options.height || $imgObj.height();
				}
				$imgObj.attr('src', this.src).css({width: w || options.width || this.width, height: (h = +(h || options.height || this.height))});
				if($imgObj.data('added')) {$imgObj.data('added').remove()};
				$imgObj.data('last-trigger', lnk);
				if(options.imagevertcenter){styleobj1 = {top: ($imgObj.parent().innerHeight() - h) / 2};}
				$imgObj.css(styleobj1).addimagezoom($.extend(combinedoptions, options, indoptions))
					.data('added', $('.magnifyarea:last' + (combinedoptions.cursorshade? ', .cursorshade:last' : '') + ', .zoomstatus:last, .zoomtracker:last'));
				if(options.magvertcenter){
					$('.magnifyarea:last').css({marginTop: (h - $('.magnifyarea:last').height()) / 2});
				}
				if(options.descpos){
					$parent = $imgObj.parent();
					styleobj2 = {left: $parent.offset().left + ($parent.outerWidth() - $parent.width()) / 2, top: h + $imgObj.offset().top};
				}
				if(options.notmulti){
					$descArea.css(styleobj2);
				} else {
					$descArea.css(styleobj2).empty().append(lnk.getAttribute('data-title') || '');
				}
				if(+opacity < 1){$imgObj.add($descArea).animate({opacity: 1}, options.speed);}
			}).attr('src', $imgObj.data('src'));
		}

		this.click(function(e){
			e.preventDefault();
			var src = $imgObj.attr('src'), ms, zr, cs, opacityObj = {opacity: 0};
			if(!first && (src === this.href || src === this.getAttribute('href'))){return;}
			if(first && !options.initzoomablefade || !options.zoomablefade){opacityObj = {};}
			first = false;
			indoptions.largeimage = this.getAttribute('data-large') || options.largeimage || '';
			if(indoptions.largeimage === 'none'){indoptions.largeimage = '';}
			if((ms = this.getAttribute('data-magsize')) || options.magnifiersize){
				indoptions.magnifiersize = (ms? ms.split(splitre) : '') || options.magnifiersize;
			} else {delete indoptions.magnifiersize;}
			indoptions.zoomrange = ((zr = this.getAttribute('data-zoomrange'))? (zr = zr.split(splitre)) : '') || options.zoomrange || '';
			if(zr){zr[0] = +zr[0]; zr[1] = +zr[1];}
			indoptions.cursorshade = ((cs = this.getAttribute('data-lens'))? cs : '') || options.cursorshade || '';
			if(cs){indoptions.cursorshade = eval(cs);}
			$imgObj.data('added') &&
				$imgObj.stop(true, true).data('added').not('.zoomtracker').remove().end()
					.css({background: 'url(' + featuredimagezoomer.loadinggif + ') center no-repeat'});
			$imgObj.css($.extend({visibility: 'visible'}, ($imgObj.data('added')? options.zoomablefade? {opacity: 0.25} : opacityObj : opacityObj))).data('src', this.href);
			if ($descArea.css('position') == 'absolute')
				$(document.body).append($descArea);
			$descArea.css($.extend({visibility: 'visible'}, opacityObj));
			loadfunction.call(this);
		}).eq(0).trigger('click');

		return this;
	};

	// Featured Image Zoomer main code:

	$.extend(featuredimagezoomer, {

		dsetting: { //default settings
				magnifierpos: 'right',
				magnifiersize:[400, 400],
				cursorshadecolor: '#fff',
				cursorshadeopacity: 0.2,
				cursorshadeborder: '1px solid #dedede',
				cursorshade: false,
				leftoffset: 10, //offsets here are used (added to) the width of the magnifyarea when
				rightoffset: 10 //calculating space requirements and to position it visa vis any drop shadow
			},

		isie: (function(){/*@cc_on @*//*@if(@_jscript_version >= 5)return true;@end @*/return false;})(), //is this IE?

		showimage: function($tracker, $mag, showstatus){
			var specs=$tracker.data('specs'), d=specs.magpos, fiz=this;
			var coords=$tracker.data('specs').coords //get coords of tracker (from upper corner of document)
			specs.windimensions={w:$(window).width(), h:$(window).height()}; //remember window dimensions
			var magcoords={} //object to store coords magnifier DIV should move to
			magcoords.left = coords.left + (d === 'left'? -specs.magsize.w - specs.lo : $tracker.width() + specs.ro);
			//switch sides for magnifiers that don't have enough room to display on the right if there's room on the left:
			if(d!=='left' && magcoords.left + specs.magsize.w + specs.lo >= specs.windimensions.w && coords.left - specs.magsize.w >= specs.lo){
				magcoords.left = coords.left - specs.magsize.w - specs.lo;
			} else if(d==='left' && magcoords.left < specs.ro) { //if there's no room on the left, move to the right
				magcoords.left = coords.left + $tracker.width() + specs.ro;
			}
			$mag.css({left: magcoords.left, top:coords.top}).show(); //position magnifier DIV on page
			specs.$statusdiv.html('Current Zoom: '+specs.curpower+'<div style="font-size:80%">Use Mouse Wheel to Zoom In/Out</div>');
			if (showstatus) //show status DIV? (only when a range of zoom is defined)
				fiz.showstatusdiv(specs, 400, 2000);
		},

		hideimage: function($tracker, $mag, showstatus){
			var specs=$tracker.data('specs');
			$mag.hide();
			if (showstatus)
				this.hidestatusdiv(specs);
		},

		showstatusdiv: function(specs, fadedur, showdur){
			clearTimeout(specs.statustimer)
			specs.$statusdiv.css({visibility: 'visible'}).fadeIn(fadedur) //show status div
			specs.statustimer=setTimeout(function(){featuredimagezoomer.hidestatusdiv(specs)}, showdur) //hide status div after delay
		},

		hidestatusdiv: function(specs){
			specs.$statusdiv.stop(true, true).hide()
		},

		getboundary: function(b, val, specs){ //function to set x and y boundaries magnified image can move to (moved outside moveimage for efficiency)
			if (b=="left"){
				var rb=-specs.imagesize.w*specs.curpower+specs.magsize.w
				return (val>0)? 0 : (val<rb)? rb : val
			}
			else{
				var tb=-specs.imagesize.h*specs.curpower+specs.magsize.h
				return (val>0)? 0 : (val<tb)? tb : val
			}
		},

		moveimage: function($tracker, $maginner, $cursorshade, e){
			var specs=$tracker.data('specs'), csw = Math.round(specs.magsize.w/specs.curpower), csh = Math.round(specs.magsize.h/specs.curpower),
			csb = specs.csborder, fiz = this, imgcoords=specs.coords, pagex=(e.pageX || specs.lastpagex), pagey=(e.pageY || specs.lastpagey),
			x=pagex-imgcoords.left, y=pagey-imgcoords.top;
			$cursorshade.css({ // keep shaded area sized and positioned proportionately to area being magnified
				visibility: '',
				width: csw,
				height: csh,
				top: Math.min(specs.imagesize.h-csh-csb, Math.max(0, y-(csb+csh)/2)) + imgcoords.top,
				left: Math.min(specs.imagesize.w-csw-csb, Math.max(0, x-(csb+csw)/2)) + imgcoords.left
			});
			var newx=-x*specs.curpower+specs.magsize.w/2 //calculate x coord to move enlarged image
			var newy=-y*specs.curpower+specs.magsize.h/2
			$maginner.css({left:fiz.getboundary('left', newx, specs), top:fiz.getboundary('top', newy, specs)})
			specs.$statusdiv.css({left:pagex-10, top:pagey+20})
			specs.lastpagex=pagex //cache last pagex value (either e.pageX or lastpagex), as FF1.5 returns undefined for e.pageX for "DOMMouseScroll" event
			specs.lastpagey=pagey
		},

		magnifyimage: function($tracker, e, zoomrange){
			if (!e.detail && !e.wheelDelta){e = e.originalEvent;}
			var delta=e.detail? e.detail*(-120) : e.wheelDelta //delta returns +120 when wheel is scrolled up, -120 when scrolled down
			var zoomdir=(delta<=-120)? "out" : "in"
			var specs=$tracker.data('specs')
			var magnifier=specs.magnifier, od=specs.imagesize, power=specs.curpower
			var newpower=(zoomdir=="in")? Math.min(power+1, zoomrange[1]) : Math.max(power-1, zoomrange[0]) //get new power
			var nd=[od.w*newpower, od.h*newpower] //calculate dimensions of new enlarged image within magnifier
			magnifier.$image.css({width:nd[0], height:nd[1]})
			specs.curpower=newpower //set current power to new power after magnification
			specs.$statusdiv.html('Current Zoom: '+specs.curpower)
			this.showstatusdiv(specs, 0, 500)
			$tracker.trigger('mousemove')
		},

		highestzindex: function($img){
			var z = 0, $els = $img.parents().add($img), elz;
			$els.each(function(){
				elz = $(this).css('zIndex');
				elz = isNaN(elz)? 0 : +elz;
				z = Math.max(z, elz);
			});
			return z;
		},

		init: function($img, options){
			var targetWrapper = (options.rootElement) ? $(options.rootElement) : document.body;
			var setting=$.extend({}, this.dsetting, options), w = $img.width(), h = $img.height(), o = $img.offset(),
			fiz = this, $tracker, $cursorshade, $statusdiv, $magnifier, lastpage = {pageX: 0, pageY: 0},
			basezindex = setting.zIndex || this.highestzindex($img);
			if(h === 0 || w === 0){
				$(new Image()).load(function(){
					featuredimagezoomer.init($img, options);
				}).attr('src', $img.attr('src'));
				return;
			}
			$img.css({visibility: 'visible'});
			setting.largeimage = setting.largeimage || $img.get(0).src;
			$magnifier=$('<div class="magnifyarea" style="position:absolute;z-index:'+basezindex+';width:'+setting.magnifiersize[0]+'px;height:'+setting.magnifiersize[1]+'px;left:-10000px;top:-10000px;visibility:hidden;overflow:hidden;border:1px solid black;" />')
				.append('<div style="position:relative;left:0;top:0;z-index:'+basezindex+';" />')
				.appendTo(targetWrapper) //create magnifier container
			//following lines - create featured image zoomer divs, and absolutely positioned them for placement over the thumbnail and each other:
			if(setting.cursorshade){
				$cursorshade = $('<div class="cursorshade" style="visibility:hidden;position:absolute;left:0;top:0;z-index:'+basezindex+';" />')
					.css({border: setting.cursorshadeborder, opacity: setting.cursorshadeopacity, backgroundColor: setting.cursorshadecolor})
					.appendTo(targetWrapper);
			} else { 
				$cursorshade = $('<div />'); //dummy shade div to satisfy $tracker.data('specs')
			}
			$statusdiv = $('<div class="zoomstatus preloadevt" style="position:absolute;visibility:hidden;left:0;top:0;z-index:'+basezindex+';" />')
				.html('<img src="'+this.loadinggif+'" />')
				.appendTo(targetWrapper); //create DIV to show "loading" gif/ "Current Zoom" info
			$tracker = $('<div class="zoomtracker" style="cursor:progress;position:absolute;z-index:'+basezindex+';left:'+o.left+'px;top:'+o.top+'px;height:'+h+'px;width:'+w+'px;" />')
				.css({backgroundImage: (this.isie? 'url(cannotbe)' : 'none')})
				.appendTo(targetWrapper);
			$(window).bind('load resize', function(){ //in case resizing the window repostions the image or description
					var o = $img.offset(), $parent;
					$tracker.css({left: o.left, top: o.top});
					if(options.descpos && options.descArea){
						$parent = $img.parent();
						$(options.descArea).css({left: $parent.offset().left + ($parent.outerWidth() - $parent.width()) / 2, top: $img.height() + o.top});
					}
				});

			function getspecs($maginner, $bigimage){ //get specs function
				var magsize={w:$magnifier.width(), h:$magnifier.height()}
				var imagesize={w:w, h:h}
				var power=(setting.zoomrange)? setting.zoomrange[0] : ($bigimage.width()/w).toFixed(5)
				$tracker.data('specs', {
					$statusdiv: $statusdiv,
					statustimer: null,
					magnifier: {$outer:$magnifier, $inner:$maginner, $image:$bigimage},
					magsize: magsize,
					magpos: setting.magnifierpos,
					imagesize: imagesize,
					curpower: power,
					coords: getcoords(),
					csborder: $cursorshade.outerWidth(),
					lo: setting.leftoffset,
					ro: setting.rightoffset
				})
			}

			function getcoords(){ //get coords of thumb image function
				var offset=$tracker.offset() //get image's tracker div's offset from document
				return {left:offset.left, top:offset.top}
			}

			$tracker.mouseover(function(e){
						$cursorshade.add($magnifier).add($statusdiv).removeClass('featuredimagezoomerhidden');
						$tracker.data('premouseout', false);
				}).mouseout(function(e){
						$cursorshade.add($magnifier).add($statusdiv.not('.preloadevt')).addClass('featuredimagezoomerhidden');
						$tracker.data('premouseout', true);
				}).mousemove(function(e){ //save tracker mouse position for initial magnifier appearance, if needed
					lastpage.pageX = e.pageX;
					lastpage.pageY = e.pageY;
				});

			$tracker.one('mouseover', function(e){
				var $maginner=$magnifier.find('div:eq(0)')
				var $bigimage=$('<img src="'+setting.largeimage+'"/>').appendTo($maginner)
				var largeloaded = featuredimagezoomer.loaded[$('<a href="'+setting.largeimage+'"></a>').get(0).href];
				var showstatus=setting.zoomrange && setting.zoomrange[1]>setting.zoomrange[0]
				var imgcoords=getcoords()
				if(!largeloaded){
					$img.stop(true, true).css({opacity:0.1}) //"dim" image while large image is loading
					$statusdiv.css({left:imgcoords.left+w/2-$statusdiv.width()/2, top:imgcoords.top+h/2-$statusdiv.height()/2, visibility:'visible'})
				}
				$bigimage.bind('loadevt', function(event, e){ //magnified image ONLOAD event function (to be triggered later)
					if(e.type === 'error'){
						$img.css({opacity: 1}).data('added').remove();
						var src = $('<a href="' + $bigimage.attr('src') + '"></a>').get(0).href;
						if(window.console && console.error){
							console.error('Cannot find Featured Image Zoomer larger image: ' + src);
						} else {
							alert('Cannot find Featured Image Zoomer larger image:\n\n' + src);
						}
						return;
					}
					featuredimagezoomer.loaded[this.src] = true;
					$img.css({opacity:1}) //restore thumb image opacity
					$statusdiv.empty().css({border:'1px solid black', background:'#C0C0C0', padding:'4px', font:'bold 13px Arial', opacity:0.8}).hide().removeClass('preloadevt');
					if($tracker.data('premouseout')){
						$statusdiv.addClass('featuredimagezoomerhidden');
					}
					if (setting.zoomrange){ //if set large image to a specific power
						var nd=[w*setting.zoomrange[0], h*setting.zoomrange[0]] //calculate dimensions of new enlarged image
						$bigimage.css({width:nd[0], height:nd[1]})
					}
					getspecs($maginner, $bigimage) //remember various info about thumbnail and magnifier
					$magnifier.css({display:'none', visibility:'visible'})
					$tracker.mouseover(function(e){ //image onmouseover
						$tracker.data('specs').coords=getcoords() //refresh image coords (from upper left edge of document)
						fiz.showimage($tracker, $magnifier, showstatus)
					})
					$tracker.mousemove(function(e){ //image onmousemove
						fiz.moveimage($tracker, $maginner, $cursorshade, e)
					})
					if (!$tracker.data('premouseout')){
						fiz.showimage($tracker, $magnifier, showstatus);
						fiz.moveimage($tracker, $maginner, $cursorshade, lastpage);
					}
					$tracker.mouseout(function(e){ //image onmouseout
						fiz.hideimage($tracker, $magnifier, showstatus)
					}).css({cursor: fiz.magnifycursor});
					if (setting.zoomrange && setting.zoomrange[1]>setting.zoomrange[0]){ //if zoom range enabled
						$tracker.bind('DOMMouseScroll mousewheel', function(e){
							fiz.magnifyimage($tracker, e, setting.zoomrange);
							e.preventDefault();
						});
					} else if(setting.disablewheel){
						$tracker.bind('DOMMouseScroll mousewheel', function(e){e.preventDefault();});
					}
				})	//end $bigimage onload
				if ($bigimage.get(0).complete){ //if image has already loaded (account for IE, Opera not firing onload event if so)
					$bigimage.trigger('loadevt', {type: 'load'})
				}
				else{
					$bigimage.bind('load error', function(e){$bigimage.trigger('loadevt', e)})
				}
			})
		},

		iname: (function(){var itag = $('<img />'), iname = itag.get(0).tagName; itag.remove(); return iname;})(),

		loaded: {},

		hashre: /^#/
	});

	$.fn.addimagezoom = function(options){
		var sel = this.selector, $thumbs = $(sel.replace(featuredimagezoomer.hashre, '.') + '.thumbs a');
		options = options || {};
		if(options.multizoom !== null && ($thumbs).size()){
			$thumbs.addmultizoom($.extend(options, {imgObj: sel, multizoom: null}));
			return this;
		} else if(options.multizoom){
			$(options.multizoom).addmultizoom($.extend(options, {imgObj: sel, multizoom: null}));
			return this;
		} else if (options.multizoom !== null){
			return this.each(function(){
				if (this.tagName !== featuredimagezoomer.iname)
					return true; //skip to next matched element
				$('<a href="' + this.src + '"></a>').addmultizoom($.extend(options, {imgObj: sel, multizoom: null, notmulti: true}));
			});
		}
		return this.each(function(){ //return jQuery obj
			if (this.tagName !== featuredimagezoomer.iname)
				return true; //skip to next matched element
			featuredimagezoomer.init($(this), options);
		});
	};

})(jQuery);

},{}],27:[function(require,module,exports){
window.modalComponent = (function(){
    var method = {}, $overlay, $modal, $content, $close;

    // Center the modal in the viewport
    method.center = function () {
        var top, left;

        top = Math.max($(window).height() - $modal.outerHeight(), 0) / 2;
        left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;

        $modal.css({
            top:top + $(window).scrollTop(), 
            left:left + $(window).scrollLeft()
        });
    };

    // Open the modal
    method.open = function (selector) {
        $(selector).show();
        $content.empty().append($(selector));

        // $modal.css({
        //     width: 'auto', 
        //     height: 'auto'
        // });

        // method.center();
        // $(window).bind('resize.modal', method.center);
        $modal.show();
        $overlay.show();
    };

    // Close the modal
    method.close = function () {
        var pos = $(".subscriptionLink").position();
        $modal.addClass("minimize");
        $modal.css({"left":pos.left+8, "top": pos.top+5});
        setTimeout(function() {
            $(modal).hide();
            $(overlay).hide();
            $(content).empty();
            // $(window).unbind('resize.modal');    
        }, 500);
    };

    // Generate the HTML and add it to the document
    $overlay = $('<div id="overlay"></div>');
    $modal = $('<div id="modal"></div>');
    $content = $('<div id="content"></div>');
    $close = $('<a id="close" href="#"><i class="fa fa-times"></i></a>');

    $modal.hide();
    $overlay.hide();
    $modal.append($content, $close);

    $(document).ready(function(){
        $('body').append($overlay, $modal);                     
    });

    $close.click(function(e){
        e.preventDefault();
        method.close();
    });

    return method;
}());
},{}],28:[function(require,module,exports){
// -----------------------------------------------------------------------------------
// http://wowslider.com/
// JavaScript Wow Slider is a free software that helps you easily generate delicious 
// slideshows with gorgeous transition effects, in a few clicks without writing a single line of code.
// Generated by WOW Slider
//
//***********************************************
// Obfuscated by Javascript Obfuscator
// http://javascript-source.com
//***********************************************
function ws_parallax(t,s,e){function a(t){return Math.round(1e3*t)/1e3}var n=jQuery,r=n(this),o=t.parallax||.25,i=n("<div>").css({position:"absolute",top:0,left:0,width:"100%",height:"100%",overflow:"hidden"}).addClass("ws_effect ws_parallax").appendTo(e),d=n("<div>").css({position:"absolute",left:0,top:0,overflow:"hidden",width:"100%",height:"100%",transform:"translate3d(0,0,0)"}).appendTo(i),f=d.clone().appendTo(i);this.go=function(l,p,c){var h=n(s.get(p));h={width:h.width(),height:h.height(),marginTop:h.css("marginTop"),marginLeft:h.css("marginLeft")},c=c?1:-1;{var g=n(s.get(p)).clone().css(h).appendTo(d),m=n(s.get(l)).clone().css(h).appendTo(f),w=e.width()||t.width;e.height()||t.height}wowAnimate(function(s){s=n.easing.swing(s);var e=a(c*s*w),r=a(c*(-w+s*w)),i=a(-c*w*o*s),l=a(c*w*o*(1-s));t.support.transform?(d.css("transform","translate3d("+e+"px,0,0)"),g.css("transform","translate3d("+i+"px,0,0)"),f.css("transform","translate3d("+r+"px,0,0)"),m.css("transform","translate3d("+l+"px,0,0)")):(d.css("left",e),g.css("margin-left",i),f.css("left",r),m.css("margin-left",l))},0,1,t.duration,function(){i.hide(),g.remove(),m.remove(),r.trigger("effectEnd")})}}
},{}],29:[function(require,module,exports){
$(document).ready(function(e) {

    setTimeout( function() { 

        // Loading Finish
        $(".progress").hide();

        //Login popup
        $(".toggleLoginPopup").click(function() {
            var chk = $(this).next().css("display");
            if(chk == "none") {
                $(this).next(".login").show();
                $(this).next().stop(true, true).slideDown();
            } else {
                $(this).next(".login").hide();
                $(this).next().stop(true, true).slideUp();
            }
        });

        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            $("body").addClass("mobile");
        }

        $(document).on({
            mouseenter: function () {
                //stuff to do on mouse enter
                $(this).find("a").addClass("active");
                $(this).children('.sub-menu').stop(true, true).fadeIn(300);
            },
            mouseleave: function () {
                //stuff to do on mouse leave
                $(this).find("a").removeClass("active");
                $(this).children('.sub-menu').stop(true, true).fadeOut(400);
            }
        }, "body:not(.mobile) nav ul li");

        $(".mobile nav ul li").on("click", function () {
            // debugger;
            if($(this).find("a").eq(0).hasClass("active")) {
                $(this).find("a").eq(0).removeClass("active");
                $(this).children('.sub-menu').css("display","none");
            } else {
                $(this).find("a").eq(0).addClass("active");
                $(this).children('.sub-menu').css("display","block");
            }
            $(this).siblings().find("> a").each(function() { 
                $(this).removeClass("active");
            });
        });

        $(".mobile nav ul li li a").click(function() {
            $(this).parent().siblings().find("> a").each(function() { 
                $(this).removeClass("active");
            });
            $(this).next('.sub-menu').css("display","none");
            $(this).parents(".menuRoot").hide();
        });

        $(".mobile .desktop-nav .fa").on("click", function(){
            if($(this).next("ul").css("display") == undefined || $(this).next("ul").css("display") == "none") {
                $(this).next("ul").show();
            } else {
                $(this).next("ul").hide();
            }
        });

        $('footer .back-top a').click(function(e){
            e.preventDefault();
            $("html, body").animate({ scrollTop: 0 }, 600);
            return false;
        });

        // Wait until the DOM has loaded before querying the document
        if((!sessionStorage.isTriggered || sessionStorage.isTriggered == "false")
             && window.location.hash.match(/register/g) == null) {
            setTimeout(function() {
                window.modalComponent.open(".adMessageBox");
                $("html, body").animate({ scrollTop: 0 }, 600);
                sessionStorage.isTriggered = "true";
            }, 3200);    
        }

        $(".tapToClose").click(function() {
            sessionStorage.isTriggered = "true";
            window.modalComponent.close();
        });

        $.ajax({url: "http://kalinnovs.com/ecommerce/app/app.pageCounter.php", success: function(result){
            var result = JSON.parse(result);
            $(".pageCounter").html(result.counter);
        }});
    

    }, 1500);

});
},{}],30:[function(require,module,exports){
// -----------------------------------------------------------------------------------
// http://wowslider.com/
// JavaScript Wow Slider is a free software that helps you easily generate delicious 
// slideshows with gorgeous transition effects, in a few clicks without writing a single line of code.
// Generated by WOW Slider
//
//***********************************************
// Obfuscated by Javascript Obfuscator
// http://javascript-source.com
//***********************************************
!function(){var t;window.ws_caption_fade=function(i,n,o,a){var e=i.noDelay?0:(i.duration/2-i.captionDuration/3)/2;0>e&&(e=0),n.stop(1,1).delay(e).fadeOut(i.captionDuration/3),a&&(t&&clearTimeout(t),t=setTimeout(function(){n.stop(1,1).html(a),n.fadeIn(i.captionDuration,function(){this.filters&&this.style.removeAttribute("filter")})},i.noDelay?0:i.duration/2+e))}}();
!function(){var t;window.ws_caption_move=function(i,e,a,o){var n=jQuery,s=[{left1:"100%",top2:"100%"},{left1:"80%",left2:"-50%"},{top1:"-100%",top2:"100%",distance:.7,easing:"easeOutBack"},{top1:"-80%",top2:"-80%",distance:.3,easing:"easeOutBack"},{top1:"-80%",left2:"80%"},{left1:"80%",left2:"80%"}];s=s[Math.floor(Math.random()*s.length)];var p=.5,c="easeOutElastic1",f=i.noDelay?0:i.duration/2-i.captionDuration/3;0>f&&(f=0),e.stop(1,1).delay(f).fadeOut(i.captionDuration/3),o&&(t&&clearTimeout(t),t=setTimeout(function(){function t(t){var e=n(a[t]).css("opacity");n(a[t]).css({visibility:"visible"}).css({opacity:0}).animate({opacity:e},i.captionDuration,"easeOutCirc").animate({top:0,left:0},{duration:i.captionDuration,easing:s.easing||c,queue:!1})}e.stop(1,1).html(o);var a=e.find(">span,>div").get();n(a).css({position:"relative",visibility:"hidden"}),e.show();for(var f in s)if(/\%/.test(s[f])){s[f]=parseInt(s[f])/100;var l=e.offset()[/left/.test(f)?"left":"top"],u=/left/.test(f)?"width":"height";s[f]*=s[f]<0?l:i.$this[u]()-e[u]()-l}n(a[0]).css({left:(s.left1||0)+"px",top:(s.top1||0)+"px"}),n(a[1]).css({left:(s.left2||0)+"px",top:(s.top2||0)+"px"}),t(0),setTimeout(function(){t(1)},i.captionDuration*(s.distance||p))},i.noDelay?0:i.duration/2+f))}}();
function ws_caption_parallax(t,n,i,a,s,o){var e=jQuery;n.parent().css({position:"absolute",top:0,left:0,width:"100%",height:"100%",overflow:"hidden"}),n.html(a).css("width","100%").stop(1,1),i.html(s).css("width","100%").stop(1,1),function(n,i,a,s,o,r){function p(n,i){return n.css(t.support.transform?{transform:"translate3d("+i+"px,0px,0px)"}:{marginLeft:i}).css("display","inline-block")}var u=15,c=t.$this.width();if(u*=c/100,t.prevIdx==t.curIdx)p(n,0).fadeIn(o/3),p(e(">div,>span",n),0);else{var d=e(">div",n),f=e(">div",i),w=e(">span",n),l=e(">span",i),h=u+c*(r?-1:1),v=u+c*(r?1:-1),g=(r?-1:1)*u;p(n,h).show(),p(i,0).show(),p(d,g),p(f,0),p(w,2*g),p(l,0),wowAnimate(function(t){t=e.easing.swing(t),p(n,(1-t)*h),p(i,t*v)},0,1,t.duration);var m=.8;wowAnimate(function(t){t*=m,p(w,2*(1-t)*g),p(d,(1-t)*g),p(l,-2*t*g),p(f,t*-g)},0,1,t.duration,function(){wowAnimate(function(t){t=e.easing.easeOutCubic(1,t,0,1,1,1);var n=2*(1-m)*g,i=(1-m)*g,a=-2*m*g,s=m*-g;p(w,(1-t)*n),p(d,(1-t)*i),p(l,(1-t)*a+-2*t*g),p(f,(1-t)*s+t*-g)},0,1,/Firefox/g.test(navigator.userAgent)?1500:t.delay)})}}(n,i,a,s,t.captionDuration,o)}
function ws_caption_slide(t,e,o,i){function r(t,e){var o,i=document.defaultView;if(i&&i.getComputedStyle){var r=i.getComputedStyle(t,"");r&&(o=r.getPropertyValue(e))}else{var a=e.replace(/\-\w/g,function(t){return t.charAt(1).toUpperCase()});o=t.currentStyle?t.currentStyle[a]:t.style[a]}return o}function a(t,e,o){for(var i="padding-left|padding-right|border-left-width|border-right-width".split("|"),a=0,n=0;n<i.length;n++)a+=parseFloat(r(t,i[n]))||0;var s=parseFloat(r(t,"width"))||(t.offsetWidth||0)-a;return e&&(s+=a),o&&(s+=(parseFloat(r(t,"margin-left"))||0)+(parseFloat(r(t,"margin-right"))||0)),s}function n(t,e,o){for(var i="padding-top|padding-bottom|border-top-width|border-bottom-width".split("|"),a=0,n=0;n<i.length;n++)a+=parseFloat(r(t,i[n]))||0;var s=parseFloat(r(t,"height"))||(t.offsetHeight||0)-a;return e&&(s+=a),o&&(s+=(parseFloat(r(t,"margin-top"))||0)+(parseFloat(r(t,"margin-bottom"))||0)),s}function s(t,e){var o={position:0,top:0,left:0,bottom:0,right:0};for(var i in o)o[i]=t.get(0).style[i];t.show();var s={width:a(t.get(0),1,1),height:n(t.get(0),1,1),"float":t.css("float"),overflow:"hidden",opacity:0};for(var i in o)s[i]=o[i]||r(t.get(0),i);var l=p("<div></div>").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0});t.wrap(l),l=t.parent(),"static"==t.css("position")?(l.css({position:"relative"}),t.css({position:"relative"})):(p.extend(s,{position:t.css("position"),zIndex:t.css("z-index")}),t.css({position:"absolute",top:0,left:0,right:"auto",bottom:"auto"})),l.css(s).show();var d=e.direction||"left",u="up"==d||"down"==d?"top":"left",c="up"==d||"left"==d,g=e.distance||("top"==u?t.outerHeight(!0):t.outerWidth(!0));t.css(u,c?isNaN(g)?"-"+g:-g:g);var f={};f[u]=(c?"+=":"-=")+g,l.animate({opacity:1},{duration:e.duration,easing:e.easing}),t.animate(f,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){t.css(o),t.parent().replaceWith(t),e.complete&&e.complete()}})}var p=jQuery;e.stop(1,1).fadeOut(t.captionDuration/3,function(){i&&(e.html(i),s(e,{direction:"left",easing:"easeInOutExpo",complete:function(){e.get(0).filters&&e.get(0).style.removeAttribute("filter")},duration:t.captionDuration}))})}
!function(){var t,e=jQuery;e.extend(e.easing,{easeInQuad:function(t,e,i,o,n){return o*(e/=n)*e+i},easeOutQuad:function(t,e,i,o,n){return-o*(e/=n)*(e-2)+i}}),window.ws_caption_traces=function(i,o,n,a){function r(t){var e,i=parseInt,t=t.replace(/\s\s*/g,"");if("transparent"==t&&(t="rgba(255,255,255,0)"),e=/^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(t))e=[i(e[1],16),i(e[2],16),i(e[3],16)];else if(e=/^#([\da-fA-F])([\da-fA-F])([\da-fA-F])/.exec(t))e=[17*i(e[1],16),17*i(e[2],16),17*i(e[3],16)];else if(e=/^rgba\(([\d]+),([\d]+),([\d]+),([\d]+|[\d]*.[\d]+)\)/.exec(t))e=[+e[1],+e[2],+e[3],+e[4]];else{if(!(e=/^rgb\(([\d]+),([\d]+),([\d]+)\)/.exec(t)))throw Error(t+" is not supported by $.parseColor");e=[+e[1],+e[2],+e[3]]}return isNaN(e[3])&&(e[3]=1),e.slice(0,3+!!u)}function s(t,e,i){t=r(t),e=r(e);for(var o=[t],n=0;i>n;n++){var a=[Math.round(t[0]-(n+1)*(t[0]-e[0])/(i+1)),Math.round(t[1]-(n+1)*(t[1]-e[1])/(i+1)),Math.round(t[2]-(n+1)*(t[2]-e[2])/(i+1))];4==t.length&&a.push(t[3]-(n+1)*(t[3]-e[3])/(i+1)),o.push(a)}o.push(e);for(var n in o)o[n]=(4==t.length?"rgba(":"rgb(")+o[n].join(",")+")";return o}function d(t,i){if(!t||!t.length)return t;var o=3,n=s(t.css("background-color"),t.css("color"),o)||h,a={position:"absolute",top:0,left:0,bottom:0,right:0},r={};i.top?(a.top=-i.top*t.innerHeight(),r.height=100/n.length+"%"):i.left&&(a.position="absolute",r.height="100%",r.width=100/n.length+"%",i.left<0?(a.left=-i.left*t.innerWidth(),r["float"]="left"):(a.right=i.left*t.innerWidth(),r["float"]="right"));var d=e('<i class="ws-colored-traces">').css(a);for(var f in n)e("<i>").css({display:"block",background:n[f]}).css(r).appendTo(d);return t.append(d)}function f(t){return e(".ws-colored-traces",t).remove(),t}function l(t,o){var n={visibility:"visible"},a={},r={};o.top?(n.top=o.top*i.$this.height(),n.height=Math.abs(o.top)*i.$this.height(),a.top=0,r.height=t.height()):o.left&&(n.left=o.left*i.$this.width()*2,r.left=0,o.left<0?(a.left=n.left/2,n.width=i.$this.width(),r.width=t.width()+2):(n.width=t.width()+2,a.left=0,n.paddingLeft=i.$this.width(),r.paddingLeft=t.css("paddingLeft"))),d(t,o).css(n).animate(a,{duration:.8*i.captionDuration,easing:"easeInQuad"}).animate(r,.8*i.captionDuration,"easeOutQuad",function(){f(e(this)).css({height:"",width:"",overflow:"",top:"",left:"",paddingLeft:""})})}var h=["#fff","#ccc","#555","#000"],c=[[{top:-1},{left:1}],[{top:-1},{left:-1}],[{left:-1},{left:1}],[{left:1},{left:-1}]][Math.floor(4*Math.random())],u=function(){var t=e("<div>").css("backgroundColor","rgba(100,255,20,.5)");return/rgba/g.test(t.css("backgroundColor"))}();o.parent().css({position:"absolute",top:0,left:0,right:0,bottom:0,overflow:"hidden"});var p=i.noDelay?0:i.duration/2-i.captionDuration/1.5;0>p&&(p=0),o.stop(1,1).delay(p).fadeOut(i.captionDuration/3),a&&(t&&clearTimeout(t),t=setTimeout(function(){o.stop(1,1).html(a);var t=o.find(">span,>div").get();e(t).css({position:"relative",visibility:"hidden",verticalAlign:"top",overflow:"hidden"}),o.show(),l(e(t[0]),c[0]),setTimeout(function(){l(e(t[1]),c[1])},.3*i.captionDuration)},i.noDelay?0:i.duration/2+p))}}();

jQuery.fn.wowSlider=function(t){function e(t){return I.css({left:-t+"00%"})}function n(t){return((t||0)+N)%N}function i(e){if(window["ws_"+e]){var n=new window["ws_"+e](t,$,O);n.name="ws_"+e,B.push(n)}}function a(t,e){J?J.pause(t.curIndex,e):e()}function o(t,e){J?J.play(t,0,e):e()}function s(t,e,i){Z||(isNaN(t)&&(t=Q(G,N)),t=n(t),G!=t&&(D?D.load(t,function(){c(t,e,i)}):c(t,e,i)))}function r(t){for(var e="",n=0;n<t.length;n++)e+=String.fromCharCode(t.charCodeAt(n)^1+(t.length-n)%7);return e}function c(n,i,a){if(!Z){if(i)void 0!=a&&(K=a^t.revers),e(n);else{if(Z)return;te=!1,function(e,n,i){ee=Math.floor(Math.random()*B.length),k(B[ee]).trigger("effectStart",{curIndex:e,nextIndex:n,cont:k("."+B[ee].name,A),start:function(){K=void 0!=i?i^t.revers:!!(n>e)^t.revers?1:0,B[ee].go(n,e,K)}})}(G,n,a),A.trigger(k.Event("go",{index:n}))}G=n,G!=t.stopOn||--t.loop||(t.autoPlay=0),t.onStep&&t.onStep(n)}}function l(){A.find(".ws_effect").fadeOut(200),e(G).fadeIn(200).find("img").css({visibility:"visible"})}function u(t,e,n,i,a,o){new f(t,e,n,i,a,o)}function f(e,n,i,a,o,s){var r,c,l,u,f=0,d=0,p=0;e[0]||(e=k(e)),e.on((n?"mousedown ":"")+"touchstart",function(e){var n=e.originalEvent.touches?e.originalEvent.touches[0]:e;2==t.gestures&&A.addClass("ws_grabbing"),f=0,n?(r=n.pageX,c=n.pageY,d=p=1,a&&(d=p=a(e))):d=p=0,e.originalEvent.touches||(e.preventDefault(),e.stopPropagation())}),k(document).on((n?"mousemove ":"")+"touchmove",e,function(t){if(d){var e=t.originalEvent.touches?t.originalEvent.touches[0]:t;f=1,l=e.pageX-r,u=e.pageY-c,i&&i(t,l,u)}}),k(document).on((n?"mouseup ":"")+"touchend",e,function(e){2==t.gestures&&A.removeClass("ws_grabbing"),d&&(f&&o&&o(e,l,u),!f&&s&&s(e),f&&(e.preventDefault(),e.stopPropagation()),f=0,d=0)}),e.on("click",function(t){p&&(t.preventDefault(),t.stopPropagation()),p=0})}function d(e,n,i){if(fe.length&&_(e),de.length&&x(e),t.controlsThumb&&t.controls&&b(e),t.caption&&M(e,n,i),Y){var a=k("A",z.get(e)).get(0);a?(Y.setAttribute("href",a.href),Y.setAttribute("target",a.target),Y.style.display="block"):Y.style.display="none"}t.responsive&&E()}function p(){pe&&(pe=0,setTimeout(function(){A.trigger(k.Event("stop",{}))},t.duration))}function h(){!pe&&t.autoPlay&&(pe=1,A.trigger(k.Event("start",{})))}function m(){g(),p()}function v(){g(),t.autoPlay?(ue=setTimeout(function(){he||s(void 0,void 0,1)},t.delay),h()):p()}function g(){ue&&clearTimeout(ue),ue=null}function w(t,e,n){g(),t&&t.preventDefault(),s(e,void 0,n),v(),Ee&&Ce&&Ce.play()}function b(e){var n=t.controlsThumb,i=n[e+1]||n[0],a=n[(e||n.length)-1];be.find("img").attr("src",i),ye.find("img").attr("src",a)}function y(){function e(t){if(!r){clearTimeout(s);for(var e=.2,n=0;2>n;n++){if(n)var c=a.find("> a"),l=i?a.width():k(c.get(0)).outerWidth(!0)*c.length;else var l=a.height();var u=de[n?"width":"height"](),f=u-l;if(0>f){var d,p,h=(t[n?"pageX":"pageY"]-de.offset()[n?"left":"top"])/u;if(o==h)return;o=h;var m=a.position()[n?"left":"top"];if(a.css({transition:"0ms linear",transform:"translate3d("+m.left+"px,"+m.top+"px,0)"}),a.stop(!0),_e>0){if(h>e&&1-e>h)return;d=.5>h?0:f-1,p=_e*Math.abs(m-d)/(Math.abs(h-.5)-e)}else d=f*Math.min(Math.max((h-e)/(1-2*e),0),1),p=-_e*l/2;a.animate(n?{left:d}:{top:d},p,_e>0?"linear":"easeOutCubic")}else a.css(n?"left":"top",f/2)}}}function n(t){0>t&&(t=0),D&&D.loadTtip(t),k(v.get(x)).removeClass("ws_overbull"),k(v.get(t)).addClass("ws_overbull"),b.show();var e={left:v.get(t).offsetLeft-b.width()/2,"margin-top":v.get(t).offsetTop-v.get(0).offsetTop+"px","margin-bottom":-v.get(t).offsetTop+v.get(v.length-1).offsetTop+"px"},n=g.get(t),i={left:-n.offsetLeft+(k(n).outerWidth(!0)-k(n).outerWidth())/2};0>x?(b.css(e),y.css(i)):(document.all||(e.opacity=1),b.stop().animate(e,"fast"),y.stop().animate(i,"fast")),x=t}A.find(".ws_bullets a,.ws_thumbs a").click(function(t){w(t,k(this).index())});var i;if(de.length){de.hover(function(){xe=1},function(){xe=0});var a=de.find(">div");de.css({overflow:"hidden"});var o,s,r;if(i=de.width()<A.width(),de.bind("mousemove mouseover",e),de.mouseout(function(){s=setTimeout(function(){a.stop()},100)}),de.trigger("mousemove"),t.gestures){var c,l,f,d,p,h;u(de,2==t.gestures,function(t,e,n){if(f>p||d>h)return!1;var i=Math.min(Math.max(c+e,f-p),0),o=Math.min(Math.max(l+n,d-h),0);a.css("left",i),a.css("top",o)},function(){r=1;var t=a.find("> a");return f=de.width(),d=de.height(),p=k(t.get(0)).outerWidth(!0)*t.length,h=a.height(),c=parseFloat(a.css("left"))||0,l=parseFloat(a.css("top"))||0,!0},function(){r=0},function(){r=0})}A.find(".ws_thumbs a").each(function(t,e){u(e,0,0,function(t){return!!k(t.target).parents(".ws_thumbs").get(0)},function(){r=1},function(t){w(t,k(e).index())})})}if(fe.length){var m=fe.find(">div"),v=k("a",fe),g=v.find("IMG");if(g.length){var b=k('<div class="ws_bulframe"/>').appendTo(m),y=k("<div/>").css({width:g.length+1+"00%"}).appendTo(k("<div/>").appendTo(b));g.appendTo(y),k("<span/>").appendTo(b);var x=-1;v.hover(function(){n(k(this).index())});var _;m.hover(function(){_&&(clearTimeout(_),_=0),n(x)},function(){v.removeClass("ws_overbull"),document.all?_||(_=setTimeout(function(){b.hide(),_=0},400)):b.stop().animate({opacity:0},{duration:"fast",complete:function(){b.hide()}})}),m.click(function(t){w(t,k(t.target).index())})}}}function x(t){k("A",de).each(function(e){if(e==t){var n=k(this);if(n.addClass("ws_selthumb"),!xe){var i,a=de.find(">div"),o=n.position()||{};i=a.position()||{};for(var s=0;1>=s;s++){var r=de[s?"width":"height"](),c=a[s?"width":"height"](),l=r-c;0>l?a.stop(!0).animate(s?{left:-Math.max(Math.min(o.left,-i.left),o.left+n.outerWidth(!0)-de.width())}:{top:-Math.max(Math.min(o.top,0),o.top+n.outerHeight(!0)-de.height())}):a.css(s?"left":"top",l/2)}}}else k(this).removeClass("ws_selthumb")})}function _(t){k("A",fe).each(function(e){e==t?k(this).addClass("ws_selbull"):k(this).removeClass("ws_selbull")})}function T(t){var e=z[t],n=k("img",e).attr("title"),i=k(e).data("descr");return n.replace(/\s+/g,"")||(n=""),(n?"<span>"+n+"</span>":"")+(i?"<br><div>"+i+"</div>":"")}function M(e,n,i){var a=T(e),o=T(n),s=t.captionEffect;(Se[k.type(s)]||Se[s]||Se.none)(k.extend({$this:A,curIdx:G,prevIdx:U,noDelay:i},t),Te,Me,a,o,K)}function F(){t.autoPlay=!t.autoPlay,t.autoPlay?(v(),je.removeClass("ws_play"),je.addClass("ws_pause"),J&&J.start(G)):(P.wsStop(),je.removeClass("ws_pause"),je.addClass("ws_play"))}function S(){return!!document[Ie.fullscreenElement]}function C(){/WOW Slider/g.test(j)||(S()?document[Ie.exitFullscreen]():(De=1,A.wrap("<div class='ws_fs_wrapper'></div>").parent()[0][Ie.requestFullscreen]()))}function E(){var e=qe?4:t.responsive,n=O.width()||t.width,i=k([$,L.find("img"),R.find("img")]);if(e>0&&document.addEventListener&&A.css("fontSize",Math.max(10*Math.min(n/t.width||1,1),4)),2==e){var a=Math.max(n/t.width,1)-1;i.each(function(){k(this).css("marginTop",-t.height*a/2)})}if(3==e){var o=window.innerHeight-(A.offset().top||0),s=t.width/t.height,r=s>n/o;A.css("height",o),i.each(function(){k(this).css({width:r?"auto":"100%",height:r?"100%":"auto",marginLeft:r?(n-o*s)/2:0,marginTop:r?0:(o-n/s)/2})})}if(4==e){var c=window.innerWidth,l=window.innerHeight,s=(A.width()||t.width)/(A.height()||t.height);A.css({maxWidth:s>c/l?"100%":s*l,height:""}),i.each(function(){k(this).css({width:"100%",marginLeft:0,marginTop:0})})}else A.css({maxWidth:"",top:""})}var k=jQuery,A=this,P=A.get(0);window.ws_basic=function(t,e,n){var i=k(this);this.go=function(e){n.find(".ws_list").css("transform","translate3d(0,0,0)").stop(!0).animate({left:e?-e+"00%":/Safari/.test(navigator.userAgent)?"0%":0},t.duration,"easeInOutExpo",function(){i.trigger("effectEnd")})}},t=k.extend({effect:"fade",prev:"",next:"",duration:1e3,delay:2e3,captionDuration:1e3,captionEffect:"none",width:960,height:360,thumbRate:1,gestures:2,caption:!0,controls:!0,controlsThumb:!1,keyboardControl:!1,scrollControl:!1,autoPlay:!0,autoPlayVideo:!1,responsive:1,support:jQuery.fn.wowSlider.support,stopOnHover:0,preventCopy:1},t);var j=navigator.userAgent,O=k(".ws_images",A).css("overflow","visible"),q=k("<div>").appendTo(O).css({position:"absolute",top:0,left:0,right:0,bottom:0,overflow:"hidden"}),I=O.find("ul").css("width","100%").wrap("<div class='ws_list'></div>").parent().appendTo(q);k("<div>").css({position:"relative",width:"100%","font-size":0,"line-height":0,"max-height":"100%",overflow:"hidden"}).append(O.find("li:first img:first").clone().css({width:"100%",visibility:"hidden"})).prependTo(O),I.css({position:"absolute",top:0,height:"100%",transform:/Firefox/.test(j)?"":"translate3d(0,0,0)"});var D=t.images&&new wowsliderPreloader(this,t),z=O.find("li"),N=z.length,W=(I.width()/I.find("li").width(),{position:"absolute",top:0,height:"100%",overflow:"hidden"}),L=k("<div>").addClass("ws_swipe_left").css(W).prependTo(I),R=k("<div>").addClass("ws_swipe_right").css(W).appendTo(I);if(/MSIE/.test(j)||/Trident/.test(j)||/Safari/.test(j)||/Firefox/.test(j)){var V=Math.pow(10,Math.ceil(Math.LOG10E*Math.log(N)));I.css({width:V+"00%"}),z.css({width:100/V+"%"}),L.css({width:100/V+"%",left:-100/V+"%"}),R.css({width:100/V+"%",left:100*N/V+"%"})}else I.css({width:N+"00%",display:"table"}),z.css({display:"table-cell","float":"none",width:"auto"}),L.css({width:100/N+"%",left:-100/N+"%"}),R.css({width:100/N+"%",left:"100%"});var Q=t.onBeforeStep||function(t){return t+1};t.startSlide=n(isNaN(t.startSlide)?Q(-1,N):t.startSlide),D&&D.load(t.startSlide,function(){}),e(t.startSlide);var X,Y;t.preventCopy&&(X=k('<div class="ws_cover"><a href="#" style="display:none;position:absolute;left:0;top:0;width:100%;height:100%"></a></div>').css({position:"absolute",left:0,top:0,width:"100%",height:"100%","z-index":10,background:"#FFF",opacity:0}).appendTo(O),Y=X.find("A").get(0));{var $=[];k(".ws_frame",A)}z.each(function(){for(var t=k(">img:first,>iframe:first,>iframe:first+img,>a:first,>div:first",this),e=k("<div></div>"),n=0;n<this.childNodes.length;)this.childNodes[n]!=t.get(0)&&this.childNodes[n]!=t.get(1)?e.append(this.childNodes[n]):n++;k(this).data("descr")||(e.text().replace(/\s+/g,"")?k(this).data("descr",e.html().replace(/^\s+|\s+$/g,"")):k(this).data("descr","")),k(this).data("type",t[0].tagName);k(">iframe",this).css("opacity",0);$[$.length]=k(">a>img",this).get(0)||k(">iframe+img",this).get(0)||k(">*",this).get(0)}),$=k($),$.css("visibility","visible"),L.append(k($[N-1]).clone()),R.append(k($[0]).clone());var B=[];t.effect=t.effect.replace(/\s+/g,"").split(",");for(var H in t.effect)i(t.effect[H]);B.length||i("basic");var G=t.startSlide,U=G,J=!1,K=1,Z=0,te=!1;k(B).bind("effectStart",function(t,e){Z++,a(e,function(){l(),e.cont&&k(e.cont).stop().show().css("opacity",1),e.start&&e.start(),U=G,G=e.nextIndex,d(G,U,e.captionNoDelay)})}),k(B).bind("effectEnd",function(t,n){e(G).stop(!0,!0).show(),setTimeout(function(){o(G,function(){Z--,v(),J&&J.start(G)})},n?n.delay||0:0)}),t.loop=t.loop||Number.MAX_VALUE,t.stopOn=n(t.stopOn);var ee=Math.floor(Math.random()*B.length);2==t.gestures&&A.addClass("ws_gestures");var ne=O,ie='$#"';if(ie&&(ie=r(ie))){if(t.gestures){var ae,oe,se,re,ce=0,le=10;u(O,2==t.gestures,function(e,n){re=!!B[0].step,m(),I.stop(!0,!0),se&&(te=!0,Z++,se=0,re||l()),ce=n,n>ae&&(n=ae),-ae>n&&(n=-ae),re?B[0].step(G,n/ae):t.support.transform&&t.support.transition?I.css("transform","translate3d("+n+"px,0,0)"):I.css("left",oe+n)},function(t){var e=/ws_playpause|ws_prev|ws_next|ws_bullets/g.test(t.target.className)||k(t.target).parents(".ws_bullets").get(0),n=me?t.target==me[0]:0;return e||n||J&&J.playing()?!1:(se=1,ae=O.width(),oe=parseFloat(-G*ae)||0,!0)},function(e,i){se=0;var a=O.width(),o=n(G+(0>i?1:-1)),s=a*i/Math.abs(i);Math.abs(ce)<le&&(o=G,s=0);var r=200+200*(a-Math.abs(i))/a;Z--,k(B[0]).trigger("effectStart",{curIndex:G,nextIndex:o,cont:re?k(".ws_effect"):0,captionNoDelay:!0,start:function(){function e(){t.support.transform&&t.support.transition&&I.css({transition:"0ms",transform:/Firefox/.test(j)?"":"translate3d(0,0,0)"}),k(B[0]).trigger("effectEnd",{swipe:!0})}function n(){re?i>a||-a>i?k(B[0]).trigger("effectEnd"):wowAnimate(function(t){var e=i+(a*(i>0?1:-1)-i)*t;B[0].step(U,e/a)},0,1,r,function(){k(B[0]).trigger("effectEnd")}):t.support.transform&&t.support.transition?(I.css({transition:r+"ms ease-out",transform:"translate3d("+s+"px,0,0)"}),setTimeout(e,r)):I.animate({left:oe+s},r,e)}te=!0,D?D.load(o,n):n()}})},function(){var t=k("A",z.get(G));t&&t.click()})}var ue,fe=A.find(".ws_bullets"),de=A.find(".ws_thumbs"),pe=t.autoPlay,he=!1,me=r('8B"iucc9!jusv?+,unpuimggs)eji!"');me+=r("uq}og<%vjwjvhhh?vfn`sosa8fhtviez8ckifo8dnir(wjxd=70t{9");var ve=ne||document.body;if(ie.length<4&&(ie=ie.replace(/^\s+|\s+$/g,"")),ne=ie?k("<div>"):0,k(ne).css({position:"absolute",padding:"0 0 0 0"}).appendTo(ve),ne&&document.all){var ge=k("<iframe>");ge.css({position:"absolute",left:0,top:0,width:"100%",height:"100%",filter:"alpha(opacity=0)",opacity:.01}),ge.attr({src:"javascript:false",scrolling:"no",framespacing:0,border:0,frameBorder:"no"}),ne.append(ge)}k(ne).css({zIndex:56,right:"15px",bottom:"15px"}).appendTo(ve),me+=r("uhcrm>bwuh=majeis<dqwm:aikp.d`joi}9Csngi?!<"),me=ne?k(me):ne,me&&me.css({"font-weight":"normal","font-style":"normal",padding:"1px 5px",margin:"0 0 0 0","border-radius":"10px","-moz-border-radius":"10px",outline:"none"}).html(ie).bind("contextmenu",function(){return!1}).show().appendTo(ne||document.body).attr("target","_blank");var we=k('<div class="ws_controls">').appendTo(O);if(fe[0]&&fe.appendTo(we),t.controls){var be=k('<a href="#" class="ws_next"><span>'+t.next+"<i></i><b></b></span></a>"),ye=k('<a href="#" class="ws_prev"><span>'+t.prev+"<i></i><b></b></span></a>");we.append(be,ye),be.bind("click",function(t){w(t,G+1,1)}),ye.bind("click",function(t){w(t,G-1,0)}),/iPhone/.test(navigator.platform)&&(ye.get(0).addEventListener("touchend",function(t){w(t,G-1,1)},!1),be.get(0).addEventListener("touchend",function(t){w(t,G+1,0)},!1)),t.controlsThumb&&(be.append('<img alt="" src="">'),ye.append('<img alt="" src="">'))}var xe,_e=t.thumbRate;if(t.caption){var Te=k("<div class='ws-title' style='display:none'></div>"),Me=k("<div class='ws-title' style='display:none'></div>");k("<div class='ws-title-wrapper'>").append(Te,Me).appendTo(O),Te.bind("mouseover",function(){J&&J.playing()||g()}),Te.bind("mouseout",function(){J&&J.playing()||v()})}var Fe,Se={none:function(t,e,n,i){Fe&&clearTimeout(Fe),Fe=setTimeout(function(){e.html(i).show()},t.noDelay?0:t.duration/2)}};Se[t.captionEffect]||(Se[t.captionEffect]=window["ws_caption_"+t.captionEffect]),(fe.length||de.length)&&y(),d(G,U,!0),t.stopOnHover&&(this.bind("mouseover",function(){J&&J.playing()||g(),he=!0}),this.bind("mouseout",function(){J&&J.playing()||v(),he=!1})),J&&J.playing()||v();var Ce=A.find("audio").get(0),Ee=t.autoPlay;if(Ce){if(k(Ce).insertAfter(A),window.Audio&&Ce.canPlayType&&Ce.canPlayType("audio/mp3"))Ce.loop="loop",t.autoPlay&&(Ce.autoplay="autoplay",setTimeout(function(){Ce.play()},100));else{Ce=Ce.src;var ke=Ce.substring(0,Ce.length-/[^\\\/]+$/.exec(Ce)[0].length),Ae="wsSound"+Math.round(9999*Math.random());k("<div>").appendTo(A).get(0).id=Ae;var Pe="wsSL"+Math.round(9999*Math.random());window[Pe]={onInit:function(){}},swfobject.createSWF({data:ke+"player_mp3_js.swf",width:"1",height:"1"},{allowScriptAccess:"always",loop:!0,FlashVars:"listener="+Pe+"&loop=1&autoplay="+(t.autoPlay?1:0)+"&mp3="+Ce},Ae),Ce=0}A.bind("stop",function(){Ee=!1,Ce?Ce.pause():k(Ae).SetVariable("method:pause","")}),A.bind("start",function(){Ce?Ce.play():k(Ae).SetVariable("method:play","")})}P.wsStart=s,P.wsRestart=v,P.wsStop=m;var je=k('<a href="#" class="ws_playpause"><span><i></i><b></b></span></a>');if(t.playPause&&(je.addClass(t.autoPlay?"ws_pause":"ws_play"),je.click(function(){return F(),!1}),we.append(je)),t.keyboardControl&&k(document).on("keyup",function(t){switch(t.which){case 32:F();break;case 37:w(t,G-1,0);break;case 39:w(t,G+1,1)}}),t.scrollControl&&A.on("DOMMouseScroll mousewheel",function(t){t.originalEvent.wheelDelta<0||t.originalEvent.detail>0?w(null,G+1,1):w(null,G-1,0)}),"function"==typeof wowsliderVideo){var Oe=k('<div class="ws_video_btn"><div></div></div>').appendTo(O);J=new wowsliderVideo(A,t,l),"undefined"!=typeof $f&&(J.vimeo(!0),J.start(G)),window.onYouTubeIframeAPIReady=function(){J.youtube(!0),J.start(G)},Oe.on("click touchend",function(){Z||J.play(G,1)})}var qe=0;if(t.fullScreen){var Ie=function(){for(var t,e,n=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenchange"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitfullscreenchange"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitfullscreenchange"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozfullscreenchange"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","MSFullscreenChange"]],i={},a=0,o=n.length;o>a;a++)if(t=n[a],t&&t[1]in document){for(a=0,e=t.length;e>a;a++)i[n[0][a]]=t[a];return i}return!1}();if(Ie){var De=0;document.addEventListener(Ie.fullscreenchange,function(){S()?(qe=1,E()):(De&&(De=0,A.unwrap()),qe=0,E()),B[0].step||l()}),k("<a href='#' class='ws_fullscreen'></a>").on("click",C).appendTo(O)}}return t.responsive&&(k(E),k(window).on("load resize",E)),this}},jQuery.extend(jQuery.easing,{easeInOutExpo:function(t,e,n,i,a){return 0==e?n:e==a?n+i:(e/=a/2)<1?i/2*Math.pow(2,10*(e-1))+n:i/2*(-Math.pow(2,-10*--e)+2)+n},easeOutCirc:function(t,e,n,i,a){return i*Math.sqrt(1-(e=e/a-1)*e)+n},easeOutCubic:function(t,e,n,i,a){return i*((e=e/a-1)*e*e+1)+n},easeOutElastic1:function(t,e,n,i,a){var o=Math.PI/2,s=1.70158,r=0,c=i;if(0==e)return n;if(1==(e/=a))return n+i;if(r||(r=.3*a),c<Math.abs(i)){c=i;var s=r/4}else var s=r/o*Math.asin(i/c);return c*Math.pow(2,-10*e)*Math.sin((e*a-s)*o/r)+i+n},easeOutBack:function(t,e,n,i,a,o){return void 0==o&&(o=1.70158),i*((e=e/a-1)*e*((o+1)*e+o)+1)+n}}),jQuery.fn.wowSlider.support={transform:function(){if(!window.getComputedStyle)return!1;var t=document.createElement("div");document.body.insertBefore(t,document.body.lastChild),t.style.transform="matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)";var e=window.getComputedStyle(t).getPropertyValue("transform");return t.parentNode.removeChild(t),void 0!==e?"none"!==e:!1}(),perspective:function(){for(var t="perspectiveProperty perspective WebkitPerspective MozPerspective OPerspective MsPerspective".split(" "),e=0;e<t.length;e++)if(void 0!==document.body.style[t[e]])return!!t[e];return!1}(),transition:function(){var t=document.body||document.documentElement,e=t.style;return void 0!==e.transition||void 0!==e.WebkitTransition||void 0!==e.MozTransition||void 0!==e.MsTransition||void 0!==e.OTransition}()},function(t){function e(e,n,i,a,o,s,r){function c(t){function e(e){cancelAnimationFrame(e),t(1),r&&r()}var n=(new Date).getTime()+o,i=function(){var o=(new Date).getTime()-n;0>o&&(o=0);var s=a?o/a:1;1>s?(t(s),requestAnimationFrame(i)):e(1)};return i(),{stop:e}}function l(t,e,n){return t+(e-t)*n}function u(e,n){return"linear"==n?e:"swing"==n?t.easing[n]?t.easing[n](e):e:t.easing[n]?t.easing[n](1,e,0,1,1,1):e}function f(t,e,n,i){if("object"==typeof e){var a={};for(var o in e)a[o]=f(t,e[o],n[o],i);return a}var s=["px","%","in","cm","mm","pt","pc","em","ex","ch","rem","vh","vw","vmin","vmax","deg","rad","grad","turn"],r="";return"string"==typeof e?r=e:"string"==typeof n&&(r=n),r=function(t,e,n){for(var i in e)if(t.indexOf(e[i])>-1)return e[i];return p[n]?p[n]:""}(r,s,t),e=parseFloat(e),n=parseFloat(n),l(e,n,i)+r}if("undefined"!=typeof e){e.jquery||"function"==typeof e||(n=e.from,i=e.to,a=e.duration,o=e.delay,s=e.easing,r=e.callback,e=e.each||e.obj);var d="num";if(e.jquery&&(d="obj"),"undefined"!=typeof e&&"undefined"!=typeof n&&"undefined"!=typeof i){"function"==typeof o&&(r=o,o=0),"function"==typeof s&&(r=s,s=0),"string"==typeof o&&(s=o,o=0),a=a||0,o=o||0,s=s||0,r=r||0;var p={opacity:0,top:"px",left:"px",right:"px",bottom:"px",width:"px",height:"px",translate:"px",rotate:"deg",rotateX:"deg",rotateY:"deg",scale:0},h=c(function(t){if(t=u(t,s),"num"===d){var a=l(n,i,t);e(a)}else{var a={transform:""};for(var o in n)if("undefined"!=typeof p[o]){var r=f(o,n[o],i[o],t);switch(o){case"translate":a.transform+=" translate3d("+r[0]+","+r[1]+","+r[2]+")";break;case"rotate":a.transform+=" rotate("+r+")";break;case"rotateX":a.transform+=" rotateX("+r+")";break;case"rotateY":a.transform+=" rotateY("+r+")";break;case"scale":a.transform+="object"==typeof r?" scale("+r[0]+", "+r[1]+")":" scale("+r+")";break;default:a[o]=r}}""===a.transform&&delete a.transform,e.css(a)}});return h}}}window.wowAnimate=e}(jQuery),Date.now||(Date.now=function(){return(new Date).getTime()}),function(){"use strict";for(var t=["webkit","moz"],e=0;e<t.length&&!window.requestAnimationFrame;++e){var n=t[e];window.requestAnimationFrame=window[n+"RequestAnimationFrame"],window.cancelAnimationFrame=window[n+"CancelAnimationFrame"]||window[n+"CancelRequestAnimationFrame"]}if(/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)||!window.requestAnimationFrame||!window.cancelAnimationFrame){var i=0;window.requestAnimationFrame=function(t){var e=Date.now(),n=Math.max(i+16,e);return setTimeout(function(){t(i=n)},n-e)},window.cancelAnimationFrame=clearTimeout}}();





// extend wowslider for effect support
(function($){
	// amount of lates effects
	var effects = 10;

	// all effects list
	var allEfects = "turn|shift|cube_over|louvers|lines|carousel|dribbles|parallax|brick|collage|basic|basic_linear|blast|blinds|blur|book|bubbles|carousel_basic|cube|domino|fade|flip|fly|glass_parallax|kenburns|page|photo|rotate|seven|slices|squares|stack|stack_vertical|tv".split("|");

	var effectsPath = "assets/js/";
	// var effectsPath = (SITE_URL || 'http://wowslider.com/')+'images/effects/';

	// create effects buttons
	// @callback = function(effect)
	function createEffects(callback){
		if($('#effbuttons').length && !$("#effbuttons .effbutton").length){
			var cont=$('#effbuttons');
			//wow.parent().append(cont);
			cont.html("<span class='effects-title'>Change effect: </span>");
			
			// prepare effects links
			var effectsLinks = '';
			for (var e = 0; e < effects; e++) {
				if(e < allEfects.length)
				effectsLinks += '<a class="button effbutton" data-effect="'+allEfects[e]+'" href="#">'+allEfects[e].replace("_"," ")+'</a> ';
			}

			// all effects list
			var effectsMore = '';
			if(effects < allEfects.length) {
				for(var k = effects; k < allEfects.length; k++) {
					var exist = 0;
					for(var s = 0; s < effects.length; s++) {
						if(effects[s] == allEfects[k]) {
							exist = 1;
							break;
						}
					}
					if(!exist) {
						effectsMore += '<li data-effect="'+allEfects[k]+'">' + allEfects[k].replace("_"," ") + '</li>';
					}
				}
				effectsMore = '<a class="button effmore" href="#">More <span>^</span><ul>'+effectsMore+'</ul></a>';
			}

			cont.append(effectsLinks + effectsMore);

			// click on effect button event
			cont.on('click', '[data-effect]', function() {
				var curEffect = $(this).attr('data-effect');
				$.getScript(effectsPath+curEffect+".js", function(){
					callback(curEffect); 
				});
				return false;
			});

			// fix firefox drag event
			cont.on('dragstart', '.effmore', function(e) {
				e.preventDefault();
			})
		}	
	}
		
	function selectEffect(new_effect){
		$("#effbuttons .checked").removeClass('checked');
		var curItem = $("#effbuttons [data-effect='"+new_effect+"']");
		curItem.addClass('checked');

		// add checked to More button
		if(curItem.parents('.effmore')[0]) {
			curItem.parents('.effmore').addClass('checked');
		}
	};


	function controlDeviceButtons(wow, callback) {
		// device buttons
		var sliderCont = wow.parent(),
			curResponsive = 1;
		function resizeWnd() {
			// apply after transition
			if(curResponsive > 1)
				sliderCont.css('width', '100%');

			$(window).resize();
		}

		$('#devices').on('click', 'a', function(e) {
			var thisClass = this.className;
			e.preventDefault();

			if(/laptop|tablet|mobile/g.test(thisClass)) {
				$('#devices').find('.laptop, .tablet, .mobile').removeClass('checked');

				if(curResponsive > 1) {
					curResponsive = 1;
					$('#devices').find('.boxed, .fullwidth, .fullscreen').removeClass('checked');
					$('#devices .boxed').addClass('checked');
				}
				
				$('>div', sliderCont).css('height','');
				
				if(/laptop/g.test(thisClass)) {
					sliderCont.css('maxWidth', sliderCont.width()).animate({
						maxWidth: curResponsive>1?$(window).width():960
					}, resizeWnd);
				} else if(/tablet/g.test(thisClass)) {
					sliderCont.css('maxWidth', sliderCont.width()).animate({
						maxWidth: 700
					}, resizeWnd);
				} else if(/mobile/g.test(thisClass)) {
					sliderCont.css('maxWidth', sliderCont.width()).animate({
						maxWidth: 500
					}, resizeWnd);
				}
				$(this).addClass('checked');
			}

			else {
				if(/boxed/g.test(thisClass)) {
					curResponsive = 1;
					sliderCont.css('maxWidth', '').removeClass('fullwidth');
				} else if(/fullwidth/g.test(thisClass)) {
					sliderCont.css('maxWidth', 'none').addClass('fullwidth');
					curResponsive = 2;
				} else if(/fullscreen/g.test(thisClass)) {
					sliderCont.css('maxWidth', 'none');
					$('#'+wow.attr('id')+' .ws_fullscreen').click();
					return;
				}
				$('#devices').find('.boxed, .fullwidth, .fullscreen').removeClass('checked');

				if(curResponsive > 1) {
					$('#devices').find('.tablet, .mobile').removeClass('checked');
					$('#devices .laptop').addClass('checked');
					resizeWnd();
				}

				$(this).addClass('checked');
			}

			callback({
				responsive: curResponsive
			});
		});
	}

	
	var cSlide, bkpCont, wowInstance, firstInitBtns;

	// rewrite slider
	// window.wowReInitor = function (wow,options){
	var default_wowSlider = $.fn.wowSlider;
	var default_options;
	var newOptions;
	$.fn.wowSlider = function (options) {
		if(!default_options) {
			default_options = options;
		}
		var wow = $(this);
		if(!newOptions) {
			newOptions = $.extend({},options);
		}
		// add current effect if no in effects list
		/*
		if (newOptions.effect && (effects.join("|").indexOf(newOptions.effect)<0))
			effects[effects.length] = newOptions.effect;
		*/

		// add fullscreen api
		newOptions.fullScreen = true;

		// change sizes when click on device buttons
		if(!firstInitBtns) {
			firstInitBtns = 1;

			if(wow.attr('data-fullscreen')) {
				wow.parent().css('max-width', 'none');
			}

			if(wow.attr('data-no-devices')) {
				$('#devices').remove();
			} else {
				controlDeviceButtons(wow, function(newOpts) {
					if(newOptions.responsive !== newOpts.responsive) {
						newOptions.responsive = newOpts.responsive;
						newOptions.forceStart = 0;
						wowReInitor(wowInstance, newOptions);
					}
				});

				if(newOptions.responsive == 2) {
					$('#devices a.fullwidth').click();
				}
			}

			if(wow.attr('data-effects')) {
				$('#devices').remove();
				allEfects = wow.attr('data-effects').split("|");
			}
		}

		// get new effect script, then start
		$.getScript(effectsPath+newOptions.effect+".js", function(){
			newOptions.support = default_wowSlider.support;

			// change duration in brick effect
			if(newOptions.effect == 'brick') newOptions.duration = 5500;
			else newOptions.duration = default_options.duration;

			// recreate html or init effects
			if (!bkpCont){//first start
				bkpCont = $(document.createElement("div")).append(wow.clone()).html();	
				
				createEffects(function(eff){
					newOptions.effect = eff;
					newOptions.forceStart = 1;
					wowReInitor(wowInstance, newOptions);
					//reinitSlider(new_o);
				});

				selectEffect(newOptions.effect);
			}
			else {
				// wow.get(0).wsStop();
				wow = $(bkpCont).replaceAll(wow);
			}
			
			wowInstance = wow; // save instance for effect
			
			if (!newOptions.effect)
				newOptions.effect = (allEfects[Math.floor(Math.random()*allEfects.length)]) || "blinds";
			var new_opt = $.extend({
				startSlide:cSlide,
				onStep:function(num){cSlide=num}
			},newOptions);
			
			// run slider
			//var result = wow.wowSlider(new_opt); 
			var result = default_wowSlider.apply(wow, [new_opt]); 
			
			if (isNaN(cSlide))
				cSlide = 0;
			else if(newOptions.forceStart)
				wow.get(0).wsStart(cSlide+1);
				
			selectEffect(new_opt.effect);

			return result;
		});
	}
	
	// for old compability
	window.wowReInitor = function (wow,options){
		$(wow).wowSlider(options);
	};
})(jQuery);

},{}],31:[function(require,module,exports){
/**
 * State-based routing for AngularJS
 * @version v0.2.13
 * @link http://angular-ui.github.com/
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="ui.router"),function(a,b,c){"use strict";function d(a,b){return M(new(M(function(){},{prototype:a})),b)}function e(a){return L(arguments,function(b){b!==a&&L(b,function(b,c){a.hasOwnProperty(c)||(a[c]=b)})}),a}function f(a,b){var c=[];for(var d in a.path){if(a.path[d]!==b.path[d])break;c.push(a.path[d])}return c}function g(a){if(Object.keys)return Object.keys(a);var c=[];return b.forEach(a,function(a,b){c.push(b)}),c}function h(a,b){if(Array.prototype.indexOf)return a.indexOf(b,Number(arguments[2])||0);var c=a.length>>>0,d=Number(arguments[2])||0;for(d=0>d?Math.ceil(d):Math.floor(d),0>d&&(d+=c);c>d;d++)if(d in a&&a[d]===b)return d;return-1}function i(a,b,c,d){var e,i=f(c,d),j={},k=[];for(var l in i)if(i[l].params&&(e=g(i[l].params),e.length))for(var m in e)h(k,e[m])>=0||(k.push(e[m]),j[e[m]]=a[e[m]]);return M({},j,b)}function j(a,b,c){if(!c){c=[];for(var d in a)c.push(d)}for(var e=0;e<c.length;e++){var f=c[e];if(a[f]!=b[f])return!1}return!0}function k(a,b){var c={};return L(a,function(a){c[a]=b[a]}),c}function l(a){var b={},c=Array.prototype.concat.apply(Array.prototype,Array.prototype.slice.call(arguments,1));for(var d in a)-1==h(c,d)&&(b[d]=a[d]);return b}function m(a,b){var c=K(a),d=c?[]:{};return L(a,function(a,e){b(a,e)&&(d[c?d.length:e]=a)}),d}function n(a,b){var c=K(a)?[]:{};return L(a,function(a,d){c[d]=b(a,d)}),c}function o(a,b){var d=1,f=2,i={},j=[],k=i,m=M(a.when(i),{$$promises:i,$$values:i});this.study=function(i){function n(a,c){if(s[c]!==f){if(r.push(c),s[c]===d)throw r.splice(0,h(r,c)),new Error("Cyclic dependency: "+r.join(" -> "));if(s[c]=d,I(a))q.push(c,[function(){return b.get(a)}],j);else{var e=b.annotate(a);L(e,function(a){a!==c&&i.hasOwnProperty(a)&&n(i[a],a)}),q.push(c,a,e)}r.pop(),s[c]=f}}function o(a){return J(a)&&a.then&&a.$$promises}if(!J(i))throw new Error("'invocables' must be an object");var p=g(i||{}),q=[],r=[],s={};return L(i,n),i=r=s=null,function(d,f,g){function h(){--u||(v||e(t,f.$$values),r.$$values=t,r.$$promises=r.$$promises||!0,delete r.$$inheritedValues,n.resolve(t))}function i(a){r.$$failure=a,n.reject(a)}function j(c,e,f){function j(a){l.reject(a),i(a)}function k(){if(!G(r.$$failure))try{l.resolve(b.invoke(e,g,t)),l.promise.then(function(a){t[c]=a,h()},j)}catch(a){j(a)}}var l=a.defer(),m=0;L(f,function(a){s.hasOwnProperty(a)&&!d.hasOwnProperty(a)&&(m++,s[a].then(function(b){t[a]=b,--m||k()},j))}),m||k(),s[c]=l.promise}if(o(d)&&g===c&&(g=f,f=d,d=null),d){if(!J(d))throw new Error("'locals' must be an object")}else d=k;if(f){if(!o(f))throw new Error("'parent' must be a promise returned by $resolve.resolve()")}else f=m;var n=a.defer(),r=n.promise,s=r.$$promises={},t=M({},d),u=1+q.length/3,v=!1;if(G(f.$$failure))return i(f.$$failure),r;f.$$inheritedValues&&e(t,l(f.$$inheritedValues,p)),M(s,f.$$promises),f.$$values?(v=e(t,l(f.$$values,p)),r.$$inheritedValues=l(f.$$values,p),h()):(f.$$inheritedValues&&(r.$$inheritedValues=l(f.$$inheritedValues,p)),f.then(h,i));for(var w=0,x=q.length;x>w;w+=3)d.hasOwnProperty(q[w])?h():j(q[w],q[w+1],q[w+2]);return r}},this.resolve=function(a,b,c,d){return this.study(a)(b,c,d)}}function p(a,b,c){this.fromConfig=function(a,b,c){return G(a.template)?this.fromString(a.template,b):G(a.templateUrl)?this.fromUrl(a.templateUrl,b):G(a.templateProvider)?this.fromProvider(a.templateProvider,b,c):null},this.fromString=function(a,b){return H(a)?a(b):a},this.fromUrl=function(c,d){return H(c)&&(c=c(d)),null==c?null:a.get(c,{cache:b,headers:{Accept:"text/html"}}).then(function(a){return a.data})},this.fromProvider=function(a,b,d){return c.invoke(a,null,d||{params:b})}}function q(a,b,e){function f(b,c,d,e){if(q.push(b),o[b])return o[b];if(!/^\w+(-+\w+)*(?:\[\])?$/.test(b))throw new Error("Invalid parameter name '"+b+"' in pattern '"+a+"'");if(p[b])throw new Error("Duplicate parameter name '"+b+"' in pattern '"+a+"'");return p[b]=new O.Param(b,c,d,e),p[b]}function g(a,b,c){var d=["",""],e=a.replace(/[\\\[\]\^$*+?.()|{}]/g,"\\$&");if(!b)return e;switch(c){case!1:d=["(",")"];break;case!0:d=["?(",")?"];break;default:d=["("+c+"|",")?"]}return e+d[0]+b+d[1]}function h(c,e){var f,g,h,i,j;return f=c[2]||c[3],j=b.params[f],h=a.substring(m,c.index),g=e?c[4]:c[4]||("*"==c[1]?".*":null),i=O.type(g||"string")||d(O.type("string"),{pattern:new RegExp(g)}),{id:f,regexp:g,segment:h,type:i,cfg:j}}b=M({params:{}},J(b)?b:{});var i,j=/([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,k=/([:]?)([\w\[\]-]+)|\{([\w\[\]-]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,l="^",m=0,n=this.segments=[],o=e?e.params:{},p=this.params=e?e.params.$$new():new O.ParamSet,q=[];this.source=a;for(var r,s,t;(i=j.exec(a))&&(r=h(i,!1),!(r.segment.indexOf("?")>=0));)s=f(r.id,r.type,r.cfg,"path"),l+=g(r.segment,s.type.pattern.source,s.squash),n.push(r.segment),m=j.lastIndex;t=a.substring(m);var u=t.indexOf("?");if(u>=0){var v=this.sourceSearch=t.substring(u);if(t=t.substring(0,u),this.sourcePath=a.substring(0,m+u),v.length>0)for(m=0;i=k.exec(v);)r=h(i,!0),s=f(r.id,r.type,r.cfg,"search"),m=j.lastIndex}else this.sourcePath=a,this.sourceSearch="";l+=g(t)+(b.strict===!1?"/?":"")+"$",n.push(t),this.regexp=new RegExp(l,b.caseInsensitive?"i":c),this.prefix=n[0],this.$$paramNames=q}function r(a){M(this,a)}function s(){function a(a){return null!=a?a.toString().replace(/\//g,"%2F"):a}function e(a){return null!=a?a.toString().replace(/%2F/g,"/"):a}function f(a){return this.pattern.test(a)}function i(){return{strict:t,caseInsensitive:p}}function j(a){return H(a)||K(a)&&H(a[a.length-1])}function k(){for(;x.length;){var a=x.shift();if(a.pattern)throw new Error("You cannot override a type's .pattern at runtime.");b.extend(v[a.name],o.invoke(a.def))}}function l(a){M(this,a||{})}O=this;var o,p=!1,t=!0,u=!1,v={},w=!0,x=[],y={string:{encode:a,decode:e,is:f,pattern:/[^/]*/},"int":{encode:a,decode:function(a){return parseInt(a,10)},is:function(a){return G(a)&&this.decode(a.toString())===a},pattern:/\d+/},bool:{encode:function(a){return a?1:0},decode:function(a){return 0!==parseInt(a,10)},is:function(a){return a===!0||a===!1},pattern:/0|1/},date:{encode:function(a){return this.is(a)?[a.getFullYear(),("0"+(a.getMonth()+1)).slice(-2),("0"+a.getDate()).slice(-2)].join("-"):c},decode:function(a){if(this.is(a))return a;var b=this.capture.exec(a);return b?new Date(b[1],b[2]-1,b[3]):c},is:function(a){return a instanceof Date&&!isNaN(a.valueOf())},equals:function(a,b){return this.is(a)&&this.is(b)&&a.toISOString()===b.toISOString()},pattern:/[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,capture:/([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/},json:{encode:b.toJson,decode:b.fromJson,is:b.isObject,equals:b.equals,pattern:/[^/]*/},any:{encode:b.identity,decode:b.identity,is:b.identity,equals:b.equals,pattern:/.*/}};s.$$getDefaultValue=function(a){if(!j(a.value))return a.value;if(!o)throw new Error("Injectable functions cannot be called at configuration time");return o.invoke(a.value)},this.caseInsensitive=function(a){return G(a)&&(p=a),p},this.strictMode=function(a){return G(a)&&(t=a),t},this.defaultSquashPolicy=function(a){if(!G(a))return u;if(a!==!0&&a!==!1&&!I(a))throw new Error("Invalid squash policy: "+a+". Valid policies: false, true, arbitrary-string");return u=a,a},this.compile=function(a,b){return new q(a,M(i(),b))},this.isMatcher=function(a){if(!J(a))return!1;var b=!0;return L(q.prototype,function(c,d){H(c)&&(b=b&&G(a[d])&&H(a[d]))}),b},this.type=function(a,b,c){if(!G(b))return v[a];if(v.hasOwnProperty(a))throw new Error("A type named '"+a+"' has already been defined.");return v[a]=new r(M({name:a},b)),c&&(x.push({name:a,def:c}),w||k()),this},L(y,function(a,b){v[b]=new r(M({name:b},a))}),v=d(v,{}),this.$get=["$injector",function(a){return o=a,w=!1,k(),L(y,function(a,b){v[b]||(v[b]=new r(a))}),this}],this.Param=function(a,b,d,e){function f(a){var b=J(a)?g(a):[],c=-1===h(b,"value")&&-1===h(b,"type")&&-1===h(b,"squash")&&-1===h(b,"array");return c&&(a={value:a}),a.$$fn=j(a.value)?a.value:function(){return a.value},a}function i(b,c,d){if(b.type&&c)throw new Error("Param '"+a+"' has two type configurations.");return c?c:b.type?b.type instanceof r?b.type:new r(b.type):"config"===d?v.any:v.string}function k(){var b={array:"search"===e?"auto":!1},c=a.match(/\[\]$/)?{array:!0}:{};return M(b,c,d).array}function l(a,b){var c=a.squash;if(!b||c===!1)return!1;if(!G(c)||null==c)return u;if(c===!0||I(c))return c;throw new Error("Invalid squash policy: '"+c+"'. Valid policies: false, true, or arbitrary string")}function p(a,b,d,e){var f,g,i=[{from:"",to:d||b?c:""},{from:null,to:d||b?c:""}];return f=K(a.replace)?a.replace:[],I(e)&&f.push({from:e,to:c}),g=n(f,function(a){return a.from}),m(i,function(a){return-1===h(g,a.from)}).concat(f)}function q(){if(!o)throw new Error("Injectable functions cannot be called at configuration time");return o.invoke(d.$$fn)}function s(a){function b(a){return function(b){return b.from===a}}function c(a){var c=n(m(w.replace,b(a)),function(a){return a.to});return c.length?c[0]:a}return a=c(a),G(a)?w.type.decode(a):q()}function t(){return"{Param:"+a+" "+b+" squash: '"+z+"' optional: "+y+"}"}var w=this;d=f(d),b=i(d,b,e);var x=k();b=x?b.$asArray(x,"search"===e):b,"string"!==b.name||x||"path"!==e||d.value!==c||(d.value="");var y=d.value!==c,z=l(d,y),A=p(d,x,y,z);M(this,{id:a,type:b,location:e,array:x,squash:z,replace:A,isOptional:y,value:s,dynamic:c,config:d,toString:t})},l.prototype={$$new:function(){return d(this,M(new l,{$$parent:this}))},$$keys:function(){for(var a=[],b=[],c=this,d=g(l.prototype);c;)b.push(c),c=c.$$parent;return b.reverse(),L(b,function(b){L(g(b),function(b){-1===h(a,b)&&-1===h(d,b)&&a.push(b)})}),a},$$values:function(a){var b={},c=this;return L(c.$$keys(),function(d){b[d]=c[d].value(a&&a[d])}),b},$$equals:function(a,b){var c=!0,d=this;return L(d.$$keys(),function(e){var f=a&&a[e],g=b&&b[e];d[e].type.equals(f,g)||(c=!1)}),c},$$validates:function(a){var b,c,d,e=!0,f=this;return L(this.$$keys(),function(g){d=f[g],c=a[g],b=!c&&d.isOptional,e=e&&(b||!!d.type.is(c))}),e},$$parent:c},this.ParamSet=l}function t(a,d){function e(a){var b=/^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(a.source);return null!=b?b[1].replace(/\\(.)/g,"$1"):""}function f(a,b){return a.replace(/\$(\$|\d{1,2})/,function(a,c){return b["$"===c?0:Number(c)]})}function g(a,b,c){if(!c)return!1;var d=a.invoke(b,b,{$match:c});return G(d)?d:!0}function h(d,e,f,g){function h(a,b,c){return"/"===p?a:b?p.slice(0,-1)+a:c?p.slice(1)+a:a}function m(a){function b(a){var b=a(f,d);return b?(I(b)&&d.replace().url(b),!0):!1}if(!a||!a.defaultPrevented){var e=o&&d.url()===o;if(o=c,e)return!0;var g,h=j.length;for(g=0;h>g;g++)if(b(j[g]))return;k&&b(k)}}function n(){return i=i||e.$on("$locationChangeSuccess",m)}var o,p=g.baseHref(),q=d.url();return l||n(),{sync:function(){m()},listen:function(){return n()},update:function(a){return a?void(q=d.url()):void(d.url()!==q&&(d.url(q),d.replace()))},push:function(a,b,e){d.url(a.format(b||{})),o=e&&e.$$avoidResync?d.url():c,e&&e.replace&&d.replace()},href:function(c,e,f){if(!c.validates(e))return null;var g=a.html5Mode();b.isObject(g)&&(g=g.enabled);var i=c.format(e);if(f=f||{},g||null===i||(i="#"+a.hashPrefix()+i),i=h(i,g,f.absolute),!f.absolute||!i)return i;var j=!g&&i?"/":"",k=d.port();return k=80===k||443===k?"":":"+k,[d.protocol(),"://",d.host(),k,j,i].join("")}}}var i,j=[],k=null,l=!1;this.rule=function(a){if(!H(a))throw new Error("'rule' must be a function");return j.push(a),this},this.otherwise=function(a){if(I(a)){var b=a;a=function(){return b}}else if(!H(a))throw new Error("'rule' must be a function");return k=a,this},this.when=function(a,b){var c,h=I(b);if(I(a)&&(a=d.compile(a)),!h&&!H(b)&&!K(b))throw new Error("invalid 'handler' in when()");var i={matcher:function(a,b){return h&&(c=d.compile(b),b=["$match",function(a){return c.format(a)}]),M(function(c,d){return g(c,b,a.exec(d.path(),d.search()))},{prefix:I(a.prefix)?a.prefix:""})},regex:function(a,b){if(a.global||a.sticky)throw new Error("when() RegExp must not be global or sticky");return h&&(c=b,b=["$match",function(a){return f(c,a)}]),M(function(c,d){return g(c,b,a.exec(d.path()))},{prefix:e(a)})}},j={matcher:d.isMatcher(a),regex:a instanceof RegExp};for(var k in j)if(j[k])return this.rule(i[k](a,b));throw new Error("invalid 'what' in when()")},this.deferIntercept=function(a){a===c&&(a=!0),l=a},this.$get=h,h.$inject=["$location","$rootScope","$injector","$browser"]}function u(a,e){function f(a){return 0===a.indexOf(".")||0===a.indexOf("^")}function l(a,b){if(!a)return c;var d=I(a),e=d?a:a.name,g=f(e);if(g){if(!b)throw new Error("No reference point given for path '"+e+"'");b=l(b);for(var h=e.split("."),i=0,j=h.length,k=b;j>i;i++)if(""!==h[i]||0!==i){if("^"!==h[i])break;if(!k.parent)throw new Error("Path '"+e+"' not valid for state '"+b.name+"'");k=k.parent}else k=b;h=h.slice(i).join("."),e=k.name+(k.name&&h?".":"")+h}var m=y[e];return!m||!d&&(d||m!==a&&m.self!==a)?c:m}function m(a,b){z[a]||(z[a]=[]),z[a].push(b)}function o(a){for(var b=z[a]||[];b.length;)p(b.shift())}function p(b){b=d(b,{self:b,resolve:b.resolve||{},toString:function(){return this.name}});var c=b.name;if(!I(c)||c.indexOf("@")>=0)throw new Error("State must have a valid name");if(y.hasOwnProperty(c))throw new Error("State '"+c+"'' is already defined");var e=-1!==c.indexOf(".")?c.substring(0,c.lastIndexOf(".")):I(b.parent)?b.parent:J(b.parent)&&I(b.parent.name)?b.parent.name:"";if(e&&!y[e])return m(e,b.self);for(var f in B)H(B[f])&&(b[f]=B[f](b,B.$delegates[f]));return y[c]=b,!b[A]&&b.url&&a.when(b.url,["$match","$stateParams",function(a,c){x.$current.navigable==b&&j(a,c)||x.transitionTo(b,a,{inherit:!0,location:!1})}]),o(c),b}function q(a){return a.indexOf("*")>-1}function r(a){var b=a.split("."),c=x.$current.name.split(".");if("**"===b[0]&&(c=c.slice(h(c,b[1])),c.unshift("**")),"**"===b[b.length-1]&&(c.splice(h(c,b[b.length-2])+1,Number.MAX_VALUE),c.push("**")),b.length!=c.length)return!1;for(var d=0,e=b.length;e>d;d++)"*"===b[d]&&(c[d]="*");return c.join("")===b.join("")}function s(a,b){return I(a)&&!G(b)?B[a]:H(b)&&I(a)?(B[a]&&!B.$delegates[a]&&(B.$delegates[a]=B[a]),B[a]=b,this):this}function t(a,b){return J(a)?b=a:b.name=a,p(b),this}function u(a,e,f,h,m,o,p){function s(b,c,d,f){var g=a.$broadcast("$stateNotFound",b,c,d);if(g.defaultPrevented)return p.update(),B;if(!g.retry)return null;if(f.$retry)return p.update(),C;var h=x.transition=e.when(g.retry);return h.then(function(){return h!==x.transition?u:(b.options.$retry=!0,x.transitionTo(b.to,b.toParams,b.options))},function(){return B}),p.update(),h}function t(a,c,d,g,i,j){var l=d?c:k(a.params.$$keys(),c),n={$stateParams:l};i.resolve=m.resolve(a.resolve,n,i.resolve,a);var o=[i.resolve.then(function(a){i.globals=a})];return g&&o.push(g),L(a.views,function(c,d){var e=c.resolve&&c.resolve!==a.resolve?c.resolve:{};e.$template=[function(){return f.load(d,{view:c,locals:n,params:l,notify:j.notify})||""}],o.push(m.resolve(e,n,i.resolve,a).then(function(f){if(H(c.controllerProvider)||K(c.controllerProvider)){var g=b.extend({},e,n);f.$$controller=h.invoke(c.controllerProvider,null,g)}else f.$$controller=c.controller;f.$$state=a,f.$$controllerAs=c.controllerAs,i[d]=f}))}),e.all(o).then(function(){return i})}var u=e.reject(new Error("transition superseded")),z=e.reject(new Error("transition prevented")),B=e.reject(new Error("transition aborted")),C=e.reject(new Error("transition failed"));return w.locals={resolve:null,globals:{$stateParams:{}}},x={params:{},current:w.self,$current:w,transition:null},x.reload=function(){return x.transitionTo(x.current,o,{reload:!0,inherit:!1,notify:!0})},x.go=function(a,b,c){return x.transitionTo(a,b,M({inherit:!0,relative:x.$current},c))},x.transitionTo=function(b,c,f){c=c||{},f=M({location:!0,inherit:!1,relative:null,notify:!0,reload:!1,$retry:!1},f||{});var g,j=x.$current,m=x.params,n=j.path,q=l(b,f.relative);if(!G(q)){var r={to:b,toParams:c,options:f},y=s(r,j.self,m,f);if(y)return y;if(b=r.to,c=r.toParams,f=r.options,q=l(b,f.relative),!G(q)){if(!f.relative)throw new Error("No such state '"+b+"'");throw new Error("Could not resolve '"+b+"' from state '"+f.relative+"'")}}if(q[A])throw new Error("Cannot transition to abstract state '"+b+"'");if(f.inherit&&(c=i(o,c||{},x.$current,q)),!q.params.$$validates(c))return C;c=q.params.$$values(c),b=q;var B=b.path,D=0,E=B[D],F=w.locals,H=[];if(!f.reload)for(;E&&E===n[D]&&E.ownParams.$$equals(c,m);)F=H[D]=E.locals,D++,E=B[D];if(v(b,j,F,f))return b.self.reloadOnSearch!==!1&&p.update(),x.transition=null,e.when(x.current);if(c=k(b.params.$$keys(),c||{}),f.notify&&a.$broadcast("$stateChangeStart",b.self,c,j.self,m).defaultPrevented)return p.update(),z;for(var I=e.when(F),J=D;J<B.length;J++,E=B[J])F=H[J]=d(F),I=t(E,c,E===b,I,F,f);var K=x.transition=I.then(function(){var d,e,g;if(x.transition!==K)return u;for(d=n.length-1;d>=D;d--)g=n[d],g.self.onExit&&h.invoke(g.self.onExit,g.self,g.locals.globals),g.locals=null;for(d=D;d<B.length;d++)e=B[d],e.locals=H[d],e.self.onEnter&&h.invoke(e.self.onEnter,e.self,e.locals.globals);return x.transition!==K?u:(x.$current=b,x.current=b.self,x.params=c,N(x.params,o),x.transition=null,f.location&&b.navigable&&p.push(b.navigable.url,b.navigable.locals.globals.$stateParams,{$$avoidResync:!0,replace:"replace"===f.location}),f.notify&&a.$broadcast("$stateChangeSuccess",b.self,c,j.self,m),p.update(!0),x.current)},function(d){return x.transition!==K?u:(x.transition=null,g=a.$broadcast("$stateChangeError",b.self,c,j.self,m,d),g.defaultPrevented||p.update(),e.reject(d))});return K},x.is=function(a,b,d){d=M({relative:x.$current},d||{});var e=l(a,d.relative);return G(e)?x.$current!==e?!1:b?j(e.params.$$values(b),o):!0:c},x.includes=function(a,b,d){if(d=M({relative:x.$current},d||{}),I(a)&&q(a)){if(!r(a))return!1;a=x.$current.name}var e=l(a,d.relative);return G(e)?G(x.$current.includes[e.name])?b?j(e.params.$$values(b),o,g(b)):!0:!1:c},x.href=function(a,b,d){d=M({lossy:!0,inherit:!0,absolute:!1,relative:x.$current},d||{});var e=l(a,d.relative);if(!G(e))return null;d.inherit&&(b=i(o,b||{},x.$current,e));var f=e&&d.lossy?e.navigable:e;return f&&f.url!==c&&null!==f.url?p.href(f.url,k(e.params.$$keys(),b||{}),{absolute:d.absolute}):null},x.get=function(a,b){if(0===arguments.length)return n(g(y),function(a){return y[a].self});var c=l(a,b||x.$current);return c&&c.self?c.self:null},x}function v(a,b,c,d){return a!==b||(c!==b.locals||d.reload)&&a.self.reloadOnSearch!==!1?void 0:!0}var w,x,y={},z={},A="abstract",B={parent:function(a){if(G(a.parent)&&a.parent)return l(a.parent);var b=/^(.+)\.[^.]+$/.exec(a.name);return b?l(b[1]):w},data:function(a){return a.parent&&a.parent.data&&(a.data=a.self.data=M({},a.parent.data,a.data)),a.data},url:function(a){var b=a.url,c={params:a.params||{}};if(I(b))return"^"==b.charAt(0)?e.compile(b.substring(1),c):(a.parent.navigable||w).url.concat(b,c);if(!b||e.isMatcher(b))return b;throw new Error("Invalid url '"+b+"' in state '"+a+"'")},navigable:function(a){return a.url?a:a.parent?a.parent.navigable:null},ownParams:function(a){var b=a.url&&a.url.params||new O.ParamSet;return L(a.params||{},function(a,c){b[c]||(b[c]=new O.Param(c,null,a,"config"))}),b},params:function(a){return a.parent&&a.parent.params?M(a.parent.params.$$new(),a.ownParams):new O.ParamSet},views:function(a){var b={};return L(G(a.views)?a.views:{"":a},function(c,d){d.indexOf("@")<0&&(d+="@"+a.parent.name),b[d]=c}),b},path:function(a){return a.parent?a.parent.path.concat(a):[]},includes:function(a){var b=a.parent?M({},a.parent.includes):{};return b[a.name]=!0,b},$delegates:{}};w=p({name:"",url:"^",views:null,"abstract":!0}),w.navigable=null,this.decorator=s,this.state=t,this.$get=u,u.$inject=["$rootScope","$q","$view","$injector","$resolve","$stateParams","$urlRouter","$location","$urlMatcherFactory"]}function v(){function a(a,b){return{load:function(c,d){var e,f={template:null,controller:null,view:null,locals:null,notify:!0,async:!0,params:{}};return d=M(f,d),d.view&&(e=b.fromConfig(d.view,d.params,d.locals)),e&&d.notify&&a.$broadcast("$viewContentLoading",d),e}}}this.$get=a,a.$inject=["$rootScope","$templateFactory"]}function w(){var a=!1;this.useAnchorScroll=function(){a=!0},this.$get=["$anchorScroll","$timeout",function(b,c){return a?b:function(a){c(function(){a[0].scrollIntoView()},0,!1)}}]}function x(a,c,d,e){function f(){return c.has?function(a){return c.has(a)?c.get(a):null}:function(a){try{return c.get(a)}catch(b){return null}}}function g(a,b){var c=function(){return{enter:function(a,b,c){b.after(a),c()},leave:function(a,b){a.remove(),b()}}};if(j)return{enter:function(a,b,c){var d=j.enter(a,null,b,c);d&&d.then&&d.then(c)},leave:function(a,b){var c=j.leave(a,b);c&&c.then&&c.then(b)}};if(i){var d=i&&i(b,a);return{enter:function(a,b,c){d.enter(a,null,b),c()},leave:function(a,b){d.leave(a),b()}}}return c()}var h=f(),i=h("$animator"),j=h("$animate"),k={restrict:"ECA",terminal:!0,priority:400,transclude:"element",compile:function(c,f,h){return function(c,f,i){function j(){l&&(l.remove(),l=null),n&&(n.$destroy(),n=null),m&&(r.leave(m,function(){l=null}),l=m,m=null)}function k(g){var k,l=z(c,i,f,e),s=l&&a.$current&&a.$current.locals[l];if(g||s!==o){k=c.$new(),o=a.$current.locals[l];var t=h(k,function(a){r.enter(a,f,function(){n&&n.$emit("$viewContentAnimationEnded"),(b.isDefined(q)&&!q||c.$eval(q))&&d(a)}),j()});m=t,n=k,n.$emit("$viewContentLoaded"),n.$eval(p)}}var l,m,n,o,p=i.onload||"",q=i.autoscroll,r=g(i,c);c.$on("$stateChangeSuccess",function(){k(!1)}),c.$on("$viewContentLoading",function(){k(!1)}),k(!0)}}};return k}function y(a,b,c,d){return{restrict:"ECA",priority:-400,compile:function(e){var f=e.html();return function(e,g,h){var i=c.$current,j=z(e,h,g,d),k=i&&i.locals[j];if(k){g.data("$uiView",{name:j,state:k.$$state}),g.html(k.$template?k.$template:f);var l=a(g.contents());if(k.$$controller){k.$scope=e;var m=b(k.$$controller,k);k.$$controllerAs&&(e[k.$$controllerAs]=m),g.data("$ngControllerController",m),g.children().data("$ngControllerController",m)}l(e)}}}}}function z(a,b,c,d){var e=d(b.uiView||b.name||"")(a),f=c.inheritedData("$uiView");return e.indexOf("@")>=0?e:e+"@"+(f?f.state.name:"")}function A(a,b){var c,d=a.match(/^\s*({[^}]*})\s*$/);if(d&&(a=b+"("+d[1]+")"),c=a.replace(/\n/g," ").match(/^([^(]+?)\s*(\((.*)\))?$/),!c||4!==c.length)throw new Error("Invalid state ref '"+a+"'");return{state:c[1],paramExpr:c[3]||null}}function B(a){var b=a.parent().inheritedData("$uiView");return b&&b.state&&b.state.name?b.state:void 0}function C(a,c){var d=["location","inherit","reload"];return{restrict:"A",require:["?^uiSrefActive","?^uiSrefActiveEq"],link:function(e,f,g,h){var i=A(g.uiSref,a.current.name),j=null,k=B(f)||a.$current,l=null,m="A"===f.prop("tagName"),n="FORM"===f[0].nodeName,o=n?"action":"href",p=!0,q={relative:k,inherit:!0},r=e.$eval(g.uiSrefOpts)||{};b.forEach(d,function(a){a in r&&(q[a]=r[a])});var s=function(c){if(c&&(j=b.copy(c)),p){l=a.href(i.state,j,q);var d=h[1]||h[0];return d&&d.$$setStateInfo(i.state,j),null===l?(p=!1,!1):void g.$set(o,l)}};i.paramExpr&&(e.$watch(i.paramExpr,function(a){a!==j&&s(a)},!0),j=b.copy(e.$eval(i.paramExpr))),s(),n||f.bind("click",function(b){var d=b.which||b.button;if(!(d>1||b.ctrlKey||b.metaKey||b.shiftKey||f.attr("target"))){var e=c(function(){a.go(i.state,j,q)});b.preventDefault();var g=m&&!l?1:0;b.preventDefault=function(){g--<=0&&c.cancel(e)}}})}}}function D(a,b,c){return{restrict:"A",controller:["$scope","$element","$attrs",function(b,d,e){function f(){g()?d.addClass(j):d.removeClass(j)}function g(){return"undefined"!=typeof e.uiSrefActiveEq?h&&a.is(h.name,i):h&&a.includes(h.name,i)}var h,i,j;j=c(e.uiSrefActiveEq||e.uiSrefActive||"",!1)(b),this.$$setStateInfo=function(b,c){h=a.get(b,B(d)),i=c,f()},b.$on("$stateChangeSuccess",f)}]}}function E(a){var b=function(b){return a.is(b)};return b.$stateful=!0,b}function F(a){var b=function(b){return a.includes(b)};return b.$stateful=!0,b}var G=b.isDefined,H=b.isFunction,I=b.isString,J=b.isObject,K=b.isArray,L=b.forEach,M=b.extend,N=b.copy;b.module("ui.router.util",["ng"]),b.module("ui.router.router",["ui.router.util"]),b.module("ui.router.state",["ui.router.router","ui.router.util"]),b.module("ui.router",["ui.router.state"]),b.module("ui.router.compat",["ui.router"]),o.$inject=["$q","$injector"],b.module("ui.router.util").service("$resolve",o),p.$inject=["$http","$templateCache","$injector"],b.module("ui.router.util").service("$templateFactory",p);var O;q.prototype.concat=function(a,b){var c={caseInsensitive:O.caseInsensitive(),strict:O.strictMode(),squash:O.defaultSquashPolicy()};return new q(this.sourcePath+a+this.sourceSearch,M(c,b),this)},q.prototype.toString=function(){return this.source},q.prototype.exec=function(a,b){function c(a){function b(a){return a.split("").reverse().join("")}function c(a){return a.replace(/\\-/,"-")}var d=b(a).split(/-(?!\\)/),e=n(d,b);return n(e,c).reverse()}var d=this.regexp.exec(a);if(!d)return null;b=b||{};var e,f,g,h=this.parameters(),i=h.length,j=this.segments.length-1,k={};if(j!==d.length-1)throw new Error("Unbalanced capture group in route '"+this.source+"'");for(e=0;j>e;e++){g=h[e];var l=this.params[g],m=d[e+1];for(f=0;f<l.replace;f++)l.replace[f].from===m&&(m=l.replace[f].to);m&&l.array===!0&&(m=c(m)),k[g]=l.value(m)}for(;i>e;e++)g=h[e],k[g]=this.params[g].value(b[g]);return k},q.prototype.parameters=function(a){return G(a)?this.params[a]||null:this.$$paramNames},q.prototype.validates=function(a){return this.params.$$validates(a)},q.prototype.format=function(a){function b(a){return encodeURIComponent(a).replace(/-/g,function(a){return"%5C%"+a.charCodeAt(0).toString(16).toUpperCase()})}a=a||{};var c=this.segments,d=this.parameters(),e=this.params;if(!this.validates(a))return null;var f,g=!1,h=c.length-1,i=d.length,j=c[0];for(f=0;i>f;f++){var k=h>f,l=d[f],m=e[l],o=m.value(a[l]),p=m.isOptional&&m.type.equals(m.value(),o),q=p?m.squash:!1,r=m.type.encode(o);if(k){var s=c[f+1];if(q===!1)null!=r&&(j+=K(r)?n(r,b).join("-"):encodeURIComponent(r)),j+=s;else if(q===!0){var t=j.match(/\/$/)?/\/?(.*)/:/(.*)/;j+=s.match(t)[1]}else I(q)&&(j+=q+s)}else{if(null==r||p&&q!==!1)continue;K(r)||(r=[r]),r=n(r,encodeURIComponent).join("&"+l+"="),j+=(g?"&":"?")+(l+"="+r),g=!0}}return j},r.prototype.is=function(){return!0},r.prototype.encode=function(a){return a},r.prototype.decode=function(a){return a},r.prototype.equals=function(a,b){return a==b},r.prototype.$subPattern=function(){var a=this.pattern.toString();return a.substr(1,a.length-2)},r.prototype.pattern=/.*/,r.prototype.toString=function(){return"{Type:"+this.name+"}"},r.prototype.$asArray=function(a,b){function d(a,b){function d(a,b){return function(){return a[b].apply(a,arguments)}}function e(a){return K(a)?a:G(a)?[a]:[]}function f(a){switch(a.length){case 0:return c;case 1:return"auto"===b?a[0]:a;default:return a}}function g(a){return!a}function h(a,b){return function(c){c=e(c);var d=n(c,a);return b===!0?0===m(d,g).length:f(d)}}function i(a){return function(b,c){var d=e(b),f=e(c);if(d.length!==f.length)return!1;for(var g=0;g<d.length;g++)if(!a(d[g],f[g]))return!1;return!0}}this.encode=h(d(a,"encode")),this.decode=h(d(a,"decode")),this.is=h(d(a,"is"),!0),this.equals=i(d(a,"equals")),this.pattern=a.pattern,this.$arrayMode=b}if(!a)return this;if("auto"===a&&!b)throw new Error("'auto' array mode is for query parameters only");return new d(this,a)},b.module("ui.router.util").provider("$urlMatcherFactory",s),b.module("ui.router.util").run(["$urlMatcherFactory",function(){}]),t.$inject=["$locationProvider","$urlMatcherFactoryProvider"],b.module("ui.router.router").provider("$urlRouter",t),u.$inject=["$urlRouterProvider","$urlMatcherFactoryProvider"],b.module("ui.router.state").value("$stateParams",{}).provider("$state",u),v.$inject=[],b.module("ui.router.state").provider("$view",v),b.module("ui.router.state").provider("$uiViewScroll",w),x.$inject=["$state","$injector","$uiViewScroll","$interpolate"],y.$inject=["$compile","$controller","$state","$interpolate"],b.module("ui.router.state").directive("uiView",x),b.module("ui.router.state").directive("uiView",y),C.$inject=["$state","$timeout"],D.$inject=["$state","$stateParams","$interpolate"],b.module("ui.router.state").directive("uiSref",C).directive("uiSrefActive",D).directive("uiSrefActiveEq",D),E.$inject=["$state"],F.$inject=["$state"],b.module("ui.router.state").filter("isState",E).filter("includedByState",F)}(window,window.angular);
},{}]},{},[25]);
