
angular.module('eCommerce', ['ui.router','ui.bootstrap','ngCookies', 'firebase', 'ngFileUpload'])
  .constant('BASE_URI', 'https://intense-torch-8839.firebaseio.com/')
  // .constant('SERVICE_URL', 'http://ec2-52-33-88-59.us-west-2.compute.amazonaws.com/HaastikaWebService')
  // .constant('SERVICE_URL', '/HaastikaWebService')
  .constant('SERVICE_URL', 'http://haastika.com:8080/HaastikaWebService')
  .constant('PRODUCTDATA_URL', 'http://haastika.com:8080/HaastikaDataService')
  .constant('ENDPOINT_URI', './')
  .constant('DIRECTIVE_URI', '/app/directives/')
  .config(function ($stateProvider, $httpProvider, $urlRouterProvider, $locationProvider) {
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
      .state('cart', {
        url:'/cart',
        views: {
          '': {
            templateUrl: 'app/components/cart/cartView.html',
            controller: 'CartCtrl',
            controllerAs: 'cart'
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
      .state('admin', {
        url:'/admin',
        views: {
          '': {
            templateUrl: 'app/components/admin/adminView.html',
            controller: 'AdminCtrl',
            controllerAs: 'admin'
          },
          'subscribers@admin': {
            templateUrl: 'app/components/subscribers/subscriberView.html',
            controller: 'SubscriberCtrl',
            controllerAs: 'SubscriberCtrl'
          },
          'productTree@admin': {
            templateUrl: 'app/components/inventory/productTree.html',
            controller: 'productTreeCtrl',
            controllerAs: 'productTreeCtrl'
          }
        }
      })
      .state('privacyPolicy', {
        url:'/privacyPolicy',
        views: {
          '': {
            templateUrl: 'assets/policies/privacyPolicy.html'
          }
        }
      })
      .state('deliveryOptions', {
        url:'/deliveryOptions',
        views: {
          '': {
            templateUrl: 'assets/policies/deliveryOptions.html'
          }
        }
      })
      .state('returnPolicy', {
        url:'/returnPolicy',
        views: {
          '': {
            templateUrl: 'assets/policies/returnPolicy.html'
          }
        }
      })
      .state('termsCondition', {
        url:'/termsCondition',
        views: {
          '': {
            templateUrl: 'assets/policies/termsCondition.html'
          }
        }
      })
    ;

    // We need to setup some parameters for http requests
    // These three lines are all you need for CORS support
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    // $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    
    // use the HTML5 History API
    $locationProvider.html5Mode(true);

  })
  .run(function run($rootScope, $location, $http, $cookieStore) {
    $rootScope.$on('$stateChangeSuccess',function(){
      $("html, body").animate({ scrollTop: 0 }, 200);
      window.dataLoaded = false;
    });

    //  // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        // Assigning Restricted pages list !!
        var restrictedPage = $.inArray($location.path(), ['/admin', '/inventory']) != -1;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }
    });
  })
;
