
angular.module('eCommerce', ['ui.router','ui.bootstrap','ngCookies', 'firebase', 'ngFileUpload'])
  .constant('BASE_URI', 'https://intense-torch-8839.firebaseio.com/')
  // .constant('SERVICE_URL', 'http://ec2-52-33-88-59.us-west-2.compute.amazonaws.com/HaastikaWebService')
  // .constant('SERVICE_URL', '/HaastikaWebService')
  .constant('SERVICE_URL', 'http://haastika.com:8080/HaastikaWebService')
  .constant('PRODUCTDATA_URL', 'http://haastika.com:8080/HaastikaDataService')
  .constant('ENDPOINT_URI', './')
  .constant('DIRECTIVE_URI', '/app/directives/')
  .config(function ($stateProvider, $httpProvider, $urlRouterProvider, $locationProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('login', {
        url:'/login',
        templateUrl: 'app/components/login/loginView.html',
        controller: 'LoginCtrl',
        controllerAs: 'login',
        resolve: {
          user: function($stateParams, AuthenticationService) {
            return AuthenticationService.validateToken();
          }
        }
      })
      .state('resetPassword', {
        url:'/login/:uid',
        templateUrl: 'app/components/login/loginView.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .state('accounts', {
        url:'/accounts',
        templateUrl: 'app/components/accounts/accountView.html',
        controller: 'AccoutsCtrl',
        controllerAs: 'accounts'
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
      .state('checkout', {
        url:'/checkout',
        controller: 'CheckoutCtrl',
        controllerAs: 'checkout',
        templateUrl: 'app/components/checkout/checkoutView.html'
      })
      .state('checkout.login', {
        url: '/login',
        controller: 'CheckoutCtrl',
        controllerAs: 'checkout',
        templateUrl: 'app/components/checkout/login.html'
       })
      .state('checkout.address', {
        url: '/address',
        controller: 'CheckoutCtrl',
        controllerAs: 'checkout',
        templateUrl: 'app/components/checkout/address.html'
      })
      .state('checkout.order', {
        url: '/order',
        controller: 'CheckoutCtrl',
        controllerAs: 'checkout',
        templateUrl: 'app/components/checkout/order.html'
      })
      .state('checkout.payment', {
        url: '/payment',
        controller: 'CheckoutCtrl',
        controllerAs: 'checkout',
        templateUrl: 'app/components/checkout/payment.html'
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
    // $httpProvider.defaults.useXDomain = true;
    // $httpProvider.defaults.withCredentials = true;
    // delete $httpProvider.defaults.headers.common['X-Requested-With'];
    
    // use the HTML5 History API
    $locationProvider.html5Mode(true);

  })
  .run(['$rootScope', '$location', '$http', '$cookieStore', '$state', 'Google', '$window', 
    function run($rootScope, $location, $http, $cookieStore, $state, Google, $window) {
      
      // var accessToken = (window.localStorage.accessToken) ? window.localStorage.accessToken : "";
      // $http.defaults.headers.common['X-Auth-Token'] = 'Basic' + $rootScope.apiKey;

      // Steps store
      if(!window.sessionStorage.steps) {
        window.sessionStorage.setItem("checkoutState", '{"login": false, "address": false, "order": false, "payment": false }');  
      }

      $rootScope.$on('$stateChangeSuccess',function(){
        var location = window.location.pathname;
        if(window.location.pathname.indexOf("checkout/") === -1) {
          $("html, body").animate({ scrollTop: 0 }, 200);
          window.dataLoaded = false;
        }
      });

      // keep user logged in after page refresh
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

          //Validate Checkout URI states with actual submitted data
          // If the state is not cleared then it will redirect to beginning of the state.
          var validateURI = false, validStateIndex = 0,
          steps = JSON.parse(window.sessionStorage.checkoutState),
          currentState = $location.path().split("/checkout/")[1];

          function validateStateUrls() {
            for(var keys in steps) {
              if(keys === currentState) {
                  break;
              }
              if(steps[keys]) {
                  validStateIndex++;
                  validateURI = true; 
              } else {
                  validateURI = false;
              }
            }  
          };

          // $state.go("checkout."+step);
          $rootScope.$on("checkout_uri_changed", function (step, obj) {
            $state.go("checkout."+obj.step);
            $location.path('/checkout/'+obj.step);
          });

          
          // Checkout redirection on zero cart items
          if($location.path().indexOf("checkout") !== -1) {
            var authenticatedUser = (window.singleCall) ? window.singleCall.authenticateUser : false;
            var cartlength = (window.sessionStorage.cartParts) ? JSON.parse(window.sessionStorage.cartParts).length : 0;
            if(cartlength === 0) {
              $location.path('/home');
            } else {
              if(validateURI === false && !authenticatedUser) {
                validStateIndex = 0;
                if($location.path().split("/checkout/")[1] !== "login") {
                  validateStateUrls();  
                }
                $location.path('/checkout/'+ Object.keys(steps)[validStateIndex]);
              }
            }  
          }

      });

      // Facebook Authentication
      window.fbAsyncInit = function () {
        FB.init({
            appId:'1719553531700651',
            status:true,
            cookie:true,
            xfbml:true,
            version: 'v2.8'
        });
        
        FB.Event.subscribe('auth.statusChange', function(response) {
            $rootScope.$broadcast("fb_statusChange", {'status': response.status});
        });
      };

      // Google Authentication
      if(window.handleGoogleClientLoad && gapi) {
        Google.init();
      };

  }])
  .factory('httpRequestInterceptor', function () {
    return {
      request: function (config) {
        var token = (window.localStorage.accessToken) ? window.localStorage.accessToken : "";
        config.headers['Authorization'] = token;
        return config;
      }
    };
  });
