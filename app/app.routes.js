
angular.module('eCommerce', ['ui.router','ui.bootstrap','firebase'])
  .constant('BASE_URI', 'https://intense-torch-8839.firebaseio.com/')
  .constant('SERVICE_URL', 'http://ec2-52-32-195-43.us-west-2.compute.amazonaws.com/HaastikaWebService/')
  .constant('ENDPOINT_URI', './')
  .constant('DIRECTIVE_URI', '/app/directives/')
  .config(function ($stateProvider, $urlRouterProvider) {
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
      .state('details', {
        url:'/details/{id}',
        views: {
          '': { 
            templateUrl: 'app/components/details/detailView.html',
            controller: 'DetailCtrl',
            controllerAs: 'details'
          }
        }
      })
      .state('categories', {
        url:'/categories/{id}',
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
      .state('category', {
        url:'/category',
        views: {
          '': { 
            templateUrl: 'app/components/category/category.html',
            controller: 'CategoryCtrl',
            controllerAs: 'CategoryCtrl'
          }
        }
      })
      .state('subCategory', {
        url:'/subCategory',
        views: {
          '': { 
            templateUrl: 'app/components/subCategory/subCategory.html',
            controller: 'SubCategoryCtrl',
            controllerAs: 'SubCategoryCtrl'
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
      .state('contact', {
        url:'/contact',
        views: {
          '': { 
            templateUrl: 'app/components/contact/contactView.html',
            controller: 'ContactCtrl'
          }
        }
      })
    ;

    if(window.history && window.history.pushState){
      // $urlRouterProvider.html5Mode(true);
    }
  })
  .run(function run($rootScope, $location, $http) {
    $rootScope.$on('$viewContentLoaded',function(){
        // debugger;
    });
      // keep user logged in after page refresh
      // $rootScope.globals = ($cookies.globals) ? JSON.parse($cookies.globals) || {} : {};
      // if ($rootScope.globals.currentUser) {
      //     // $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
      // }

      // $rootScope.$on('$locationChangeStart', function (event, next, current) {
      //     // redirect to login page if not logged in and trying to access a restricted page
      //     var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
      //     var loggedIn = $rootScope.globals.currentUser;
      //     if (restrictedPage && !loggedIn) {
      //         $location.path('/login');
      //     }
      // });
  })
;
