
angular.module('eCommerce', ['ui.router','ui.bootstrap'])
  .constant('BASE_URI', 'https://intense-torch-8839.firebaseio.com/')
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
          // the child views will be defined here (absolutely named)
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
            templateUrl: 'app/components/register/registerView.html'
          }
        }
      })
      .state('aboutus', {
        url:'/aboutus',
        views: {
          '': { 
            templateUrl: 'app/components/aboutus/aboutusView.html'
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
          },
          // the child views will be defined here (absolutely named)
          'heroBanner@home': { 
            templateUrl: 'app/shared/hero/heroView.html'
          }
        }
      })
    ;
    // $locationProvider.html5Mode(true);  
  })
  .run(function run($rootScope, $location, $http) {
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
