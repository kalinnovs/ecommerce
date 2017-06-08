angular.module('eCommerce', ['ui.router','ui.bootstrap','ngCookies', 'ngFileUpload'])
  .constant('BASE_URI', 'https://intense-torch-8839.firebaseio.com/')
  .constant('PRODUCTDATA_URL', 'https://haastika.com/HaastikaDataService')
  .constant('ENDPOINT_URI', './')
  .constant('DIRECTIVE_URI', '/app/directives/')
  .config(['$stateProvider', '$httpProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $httpProvider, $urlRouterProvider, $locationProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
    $urlRouterProvider.otherwise('/404');

    $stateProvider
      .state('login', {
        url:'/login',
        templateUrl: 'app/components/login/loginView.html',
        controller: 'LoginCtrl',
        controllerAs: 'login',
        data: {
          	pageTitle: 'Haastika - Login'
        },
        resolve: {
          user: ['$stateParams', 'AuthenticationService', function($stateParams, AuthenticationService) {
            return AuthenticationService.validateToken();
          }]
        }
      })
      .state('resetPassword', {
        url:'/login/:uid',
        templateUrl: 'app/components/login/loginView.html',
        controller: 'LoginCtrl',
        controllerAs: 'login',
        resolve: {
          user: ['$stateParams', 'AuthenticationService', function($stateParams, AuthenticationService) {
            return AuthenticationService.validateToken();
          }]
        }
      })
      .state('404', {
        url:'/404',
        templateUrl: 'app/components/404/404.html',
        controller: 'pagenotfoundCtrl',
        data: {
          	pageTitle: 'Haastika - Page Not Found'
        },
      })
      .state('accounts', {
        url:'/accounts',
        views: {
          '': {
            templateUrl: 'app/components/accounts/accountView.html',
            controller: 'AccoutsCtrl',
            controllerAs: 'accounts',
            resolve: {
              orderList: ['$stateParams', 'AccountsService', function($stateParams, AccountsService) {
                return AccountsService.getOrderList();
              }],
              savedCart: ['$stateParams', 'AccountsService', function($stateParams, AccountsService) {
                return AccountsService.getSavedCart();
              }],
              getAccountDetail: ['$stateParams', 'AccountsService', function($stateParams, AccountsService) {
                return AccountsService.getAccountDetail();
              }],
              getAddress: ['$stateParams', 'AccountsService', function($stateParams, AccountsService) {
                return AccountsService.getAddress();
              }]
            }
          },
          'orderDetails@accounts': {
            templateUrl: 'app/components/accounts/orderDetails.html'
          }, 
          'addressInfo@accounts': {
            templateUrl: 'app/components/accounts/myAddress.html'
          },
          'accountInfo@accounts': {
            templateUrl: 'app/components/accounts/myAccount.html'
          },
          'subscriptionInfo@accounts': {
            templateUrl: 'app/components/accounts/mySubscription.html'
          }
        }
      })
      .state('home', {
        url:'/',
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
        templateUrl: 'app/components/cart/cartView.html',
        controller: 'CartCtrl',
        controllerAs: 'cart',
        resolve: {
          user: ['$stateParams', 'AuthenticationService', function($stateParams, AuthenticationService) {
            return AuthenticationService.validateToken();
          }],
          cartData: ['$stateParams', 'CartService', function($stateParams, CartService) {
            return CartService.viewCart();
          }]
        }
      })
      .state('checkout', {
        url:'/checkout',
        controller: 'CheckoutCtrl',
        controllerAs: 'checkout',
        templateUrl: 'app/components/checkout/checkoutView.html',
        resolve: {
          cartItems: ['$stateParams', 'CheckoutService', function($stateParams, CheckoutService) {
            // return CheckoutService.getItems();
          }],
          getAddress: ['$stateParams', 'CheckoutService', function($stateParams, CheckoutService) {
            // return CheckoutService.getAddress();
          }],
          getLoginStatus: ['$stateParams', 'CheckoutService', function($stateParams, CheckoutService) {
            return CheckoutService.validateToken();
          }],
          viewCart: ['$stateParams', 'CheckoutService', function($stateParams, CheckoutService) {
            // return CheckoutService.viewCart();
          }]
        }
      })
      .state('checkout.login', {
        url: '/login',
        controller: 'CheckoutCtrl',
        controllerAs: 'checkout',
        templateUrl: 'app/components/checkout/login.html',
        resolve: {
          cartItems: ['$stateParams', 'CheckoutService', function($stateParams, CheckoutService) {
            // return CheckoutService.getItems();
          }],
          getAddress: ['$stateParams', 'CheckoutService', function($stateParams, CheckoutService) {
            // return CheckoutService.getAddress();
          }],
          getLoginStatus: ['$stateParams', 'CheckoutService', function($stateParams, CheckoutService) {
            return CheckoutService.validateToken();
          }],
          viewCart: ['$stateParams', 'CheckoutService', function($stateParams, CheckoutService) {
            // return CheckoutService.viewCart();
          }]
        }
       })
      .state('checkout.address', {
        url: '/address',
        controller: 'CheckoutCtrl',
        controllerAs: 'checkout',
        templateUrl: 'app/components/checkout/address.html',
        resolve: {
          cartItems: ['$stateParams', 'CheckoutService', function($stateParams, CheckoutService) {
            // return CheckoutService.getItems();
          }],
          getAddress: ['$stateParams', 'CheckoutService', function($stateParams, CheckoutService) {
            return CheckoutService.getAddress();
          }],
          getLoginStatus: ['$stateParams', 'CheckoutService', function($stateParams, CheckoutService) {
            return CheckoutService.validateToken();
          }],
          viewCart: ['$stateParams', 'CheckoutService', function($stateParams, CheckoutService) {
            // return CheckoutService.viewCart();
          }]
        }
      })
      .state('checkout.order', {
        url: '/order',
        controller: 'CheckoutCtrl',
        controllerAs: 'checkout',
        templateUrl: 'app/components/checkout/order.html',
        resolve: {
          cartItems: ['$stateParams', 'CheckoutService', function($stateParams, CheckoutService) {
            // return CheckoutService.getItems();
          }],
          viewCart: ['$stateParams', 'CheckoutService', function($stateParams, CheckoutService) {
            return CheckoutService.viewCart();
          }],
          getAddress: ['$stateParams', 'CheckoutService', function($stateParams, CheckoutService) {
            // return CheckoutService.getAddress();
          }],
          getLoginStatus: ['$stateParams', 'CheckoutService', function($stateParams, CheckoutService) {
            return CheckoutService.validateToken();
          }]
        }
      })
      .state('checkout.payment', {
        url: '/payment',
        controller: 'CheckoutCtrl',
        controllerAs: 'checkout',
        templateUrl: 'app/components/checkout/payment.html',
        resolve: {
          cartItems: ['$stateParams', 'CheckoutService', function($stateParams, CheckoutService) {
            // return CheckoutService.getItems();
          }],
          viewCart: ['$stateParams', 'CheckoutService', function($stateParams, CheckoutService) {
            return CheckoutService.viewCart();
          }],
          getAddress: ['$stateParams', 'CheckoutService', function($stateParams, CheckoutService) {
            // return CheckoutService.getAddress();
          }],
          getLoginStatus: ['$stateParams', 'CheckoutService', function($stateParams, CheckoutService) {
            return CheckoutService.validateToken();
          }]
        }
      })
      .state('thankyou', {
        url: '/thankyou',
        controller: 'thankyouCtrl',
        templateUrl: 'app/components/thankyou/thankyouView.html', 
        data: {
          	pageTitle: 'Haastika - Thank you !!'
        }
      })
      .state('orderLookup', {
        url: '/orderLookup',
        controller: 'orderCtrl',
        templateUrl: 'app/components/orderlookup/orderlookupView.html',
        data: {
          	pageTitle: 'Haastika - Order Lookup'
        },
      })
      .state('register', {
        url:'/register',
        data: {
          	pageTitle: 'Haastika - Subscribe'
        },
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
        data: {
          	pageTitle: 'Haastika - About Us'
        },
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
      .state('promomailgenerator', {
        url:'/inventory/promomailgenerator',
        views: {
          '': {
            templateUrl: 'app/components/promomailgenerator/promoMailView.html',
            controller: 'PromoMailCtrl',
            controllerAs: 'PromoMailCtrl'
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
        data: {
          	pageTitle: 'Haastika - Contact Us'
        },
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
          'promomailgenerator@admin': {
            templateUrl: 'app/components/promomailgenerator/promoMailView.html',
            controller: 'PromoMailCtrl',
            controllerAs: 'PromoMailCtrl'
          },
          'productTree@admin': {
            templateUrl: 'app/components/inventory/productTree.html',
            controller: 'productTreeCtrl',
            controllerAs: 'productTreeCtrl'
          },
          'ordermanagement@admin': {
            templateUrl: 'app/components/ordermanagement/orderManagement.html',
            controller: 'OrderDetailCtrl',
            controllerAs: 'OrderDetailCtrl'
          },
          'updateLayout@admin': {
            templateUrl: 'app/shared/tiles/tileView.html',
            controller: 'AdminCtrl',
            controllerAs: 'admin'
          }
        }
      })
      .state('privacyPolicy', {
        url:'/privacyPolicy',
        data: {
          	pageTitle: 'Haastika - Privacy Policy'
        },
		views: {
          '': {
            templateUrl: 'assets/policies/pp.html'
          }
        }
      })
      .state('deliveryOptions', {
        url:'/deliveryOptions',
        data: {
          	pageTitle: 'Haastika - Delivery Options'
        },
        views: {
          '': {
            templateUrl: 'assets/policies/do.html'
          }
        }
      })
      .state('returnPolicy', {
        url:'/returnPolicy',
        data: {
          	pageTitle: 'Haastika - Return Policy'
        },
        views: {
          '': {
            templateUrl: 'assets/policies/rp.html'
          }
        }
      })
      .state('termsCondition', {
        url:'/termsCondition',
        data: {
          	pageTitle: 'Haastika - Terms & Conditions'
        },
        views: {
          '': {
            templateUrl: 'assets/policies/tnc.html'
          }
        }
      })
    ;
    
    // use the HTML5 History API
    $locationProvider.html5Mode(true);

  }])
  .run(['$rootScope', '$location', '$http', '$state', 'Google', '$window', '$stateParams', 
    function run($rootScope, $location, $http, $state, Google, $window, $stateParams) {
    
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
      $rootScope.globals = (window.localStorage.globals) ? JSON.parse(window.localStorage.globals) : {} || {};
      if ($rootScope.globals.currentUser) {
          $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
      }

      $rootScope.$on('$locationChangeStart', function (event, next, current) {
          // redirect to login page if not logged in and trying to access a restricted page
          // Assigning Restricted pages list !!
          var restrictedPage = $.inArray($location.path(), ['/admin', '/inventory']) != -1;
          var loggedIn = $rootScope.globals.currentUser;
          if ((restrictedPage && loggedIn === undefined) || (restrictedPage && loggedIn && loggedIn.userType !== "Admin")) {
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
            var cartlength = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray).length : (window.sessionStorage.cartLength) ? parseInt(JSON.parse(window.sessionStorage.cartLength)) : 0;
            if(cartlength === 0) {
              $location.path('/');
            } else {
              if(validateURI === false && !authenticatedUser) {
                validStateIndex = 0;
                if($location.path().split("/checkout/")[1] !== "login") {
                  validateStateUrls();  
                } 
                $location.path('/checkout/'+ Object.keys(steps)[validStateIndex]);
              } else {
                if($location.path().split("/checkout/")[1] === "login") {
                  window.singleCall.authenticateUser = false;
                }
              }
            }  
          }

          // Restrict Viewers to thank you page every time.
          var restrictedPage = $.inArray($location.path(), ['/thankyou']) != -1;
          var isRestricted = (window.restrictView !== undefined) ? window.restrictView : true;
          if (restrictedPage && isRestricted) {
              $location.path('/');
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
  })
  .directive('updateTitle', ['$rootScope', '$timeout',
  function($rootScope, $timeout) {
    return {
      link: function(scope, element) {

        var listener = function(event, toState) {

          var title = 'Haastika - Online store for Odisha Handicrafts and more';
          if (toState.data && toState.data.pageTitle) title = toState.data.pageTitle;

          $timeout(function() {
            element.text(title);
          }, 0, false);
        };

        $rootScope.$on('$stateChangeSuccess', listener);
      }
    };
  }
]);
