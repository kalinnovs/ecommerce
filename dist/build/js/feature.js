(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
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

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/app.routes.js","/../../../app")
},{"+7ZJp0":56,"buffer":53}],2:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
  .service('UserService', ['$http', '$rootScope', 'ENDPOINT_URI', function ($http, $rootScope, ENDPOINT_URI) {
    var service = this;

    service.GetAll = function(url) {
        // var url = "http://17.168.81.74:8080/HaastikaDataService/home";
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
        return $http.post(url, user).then(service.handleSuccess, service.handleError('Error updating user'));
    }

    service.Put = function(url, user) {
        return $http.put(url, user).then(service.handleSuccess, service.handleError('Error updating user'));
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

  }]);

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/app.services.js","/../../../app")
},{"+7ZJp0":56,"buffer":53}],3:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
  .controller('pagenotfoundCtrl', ['$scope', '$rootScope', '$sce', '$timeout', 'PRODUCTDATA_URL', 
    function ($scope, $rootScope, $sce, $timeout, PRODUCTDATA_URL) {
    var pagenotfound = this;
    var scoper = $scope;
    
    $scope.$broadcast('dataloaded');
    $(".progress").hide();
    window.dataloaded = true;

    var Application = ( function () {
        var canvas;
        var ctx;
        var imgData;
        var pix;
        var WIDTH;
        var HEIGHT;
        var flickerInterval;

        var init = function () {
            canvas = document.getElementById('canvas');
            ctx = canvas.getContext('2d');
            canvas.width = WIDTH = 700;
            canvas.height = HEIGHT = 500;
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, WIDTH, HEIGHT);
            ctx.fill();
            imgData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
            pix = imgData.data;
            flickerInterval = setInterval(flickering, 30);
        };

        var flickering = function () {
            for (var i = 0; i < pix.length; i += 4) {
                var color = (Math.random() * 255) + 50;
                pix[i] = color;
                pix[i + 1] = color;
                pix[i + 2] = color;
            }
            ctx.putImageData(imgData, 0, 0);
        };

        return {
            init: init
        };
    }());

    Application.init();
    
}]
);

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/404/404Controller.js","/../../../app/components/404")
},{"+7ZJp0":56,"buffer":53}],4:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
  .service('AboutService',['$http', 'ENDPOINT_URI', function ($http, ENDPOINT_URI) {
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
        // return $http.get(url).then(service.extract);
        return $http({
            method: 'GET',
            url: url
        }).then(service.extract);
    }


  }]);

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/aboutus/aboutService.js","/../../../app/components/aboutus")
},{"+7ZJp0":56,"buffer":53}],5:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
  .controller('aboutCtrl', ['$scope', '$rootScope', '$sce', 'UserService', '$timeout', 'AboutService', 'PRODUCTDATA_URL', 'BASE_URI', 
    function ($scope, $rootScope, $sce, UserService, $timeout, AboutService, PRODUCTDATA_URL, BASE_URI) {
    var about = this;
    var scoper = $scope;
    
    AboutService.getFromURL( PRODUCTDATA_URL + '/aboutus')
        .then(function(data) {
          $scope.htmlDescription = data.content;
          $scope.$broadcast('dataloaded');
        })
        .catch(function(error) {
            //
        })
        .finally(function() {
            //
        })
    // debugger;

    $scope.$on('dataloaded', function() {
        $timeout(function () { 
            window.dataLoaded = true;
        }, 100, false);
    });
    
    $scope.getHtml = function(html){
        return $sce.trustAsHtml(html);
    };
  }])
.filter('html', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
}]);

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/aboutus/aboutusController.js","/../../../app/components/aboutus")
},{"+7ZJp0":56,"buffer":53}],6:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
  .controller('AccoutsCtrl', ['$scope', '$timeout', '$rootScope', 'UserService', 'PRODUCTDATA_URL', '$http', 'AccountsService', 'orderList', 'savedCart', 'getAddress', 'getAccountDetail', 
    function ($scope, $timeout, $rootScope, UserService, PRODUCTDATA_URL, $http, AccountsService, orderList, savedCart, getAddress, getAccountDetail) {

  	$scope.loggedUser = window.userDetails;
  	$scope.orderList = orderList.orderList;
    $scope.savedCart = savedCart.cartList;
    $scope.addressList = getAddress;
    $scope.accountDetail = getAccountDetail;

    window.dataLoaded = true;
    // View Setters
    $scope.mySubscription = false;
    $scope.myAddress = false;
    $scope.myOrders = true;
    // Currency Update
    if(window.userDetails && window.userDetails.preferredCurrency) {
        $rootScope.$broadcast("updateCurrency", window.userDetails.preferredCurrency);
    }


  	$scope.viewOrder = function(event) {
        var orderId = $(event.currentTarget).attr("data-orderid");
        if($(".orderDetailsVisible-"+orderId).css("display") !== "none") {
            return;
        }
        var orderLookupData = this.orderList.filter(function(val, key){
            return (val.webOrderNumber === orderId);
        });
        this.orderLookupData = orderLookupData[0];
        $(event.currentTarget).parents("li").siblings("li").removeClass("expanded")
        $(event.currentTarget).parents("ul").find(".orderLookupList").hide();
        $(".orderDetailsVisible-"+orderId).slideDown().parent().addClass("expanded");
  	};

  	$scope.cancelOrder = function(event) {
      var orderId = $(event.currentTarget).attr("data-orderid");
      $(".orderDetailsVisible-"+orderId).slideUp().parent().removeClass("expanded")
  	};

    $scope.enableAddressEntry = function(event) {
        this.hasAddress = false;
    };

    $scope.cancelAddressEntry = function(event) {
        this.hasAddress = true;
    };

    $scope.addAddress = function(event) {
        var self = this;
        var objectToSerialize = this.address;
        var promise = $http({
            method: 'POST',
            url: PRODUCTDATA_URL + '/cart/address/update',
            data: JSON.stringify(objectToSerialize)
        }).then(function successCallback(data, status) {
				$rootScope.$broadcast("updateFlash", {"alertType": "success", "delay": 10, "message": "Address Saved !!!"});
            });
    };

    $scope.nextAddressSlider = function(evt) {
        var carousel = $(evt.currentTarget).siblings(".carouselStrip"),
            carouselWrapper = $(evt.currentTarget).parent(),
            eachAddressWidth = carousel.find("li").eq(0).width(),
            totalStripLength = carousel.find("li").length * eachAddressWidth,
            carouselLeft = parseInt(carousel.css("left")),
            calculateLeft = totalStripLength - carouselWrapper.width() - Math.abs(parseInt(carousel.css("left")));
        
        if(calculateLeft > 200) {
            carouselWrapper.addClass("prevActive");
            carousel.css("left", parseInt(carouselLeft - 200)+"px");
        } else {
            carousel.css("left", parseInt(carouselLeft - calculateLeft)+"px");
            carouselWrapper.addClass("removeNext");
        }
    };

    $scope.prevAddressSlider = function(evt) {
        var carousel = $(evt.currentTarget).siblings(".carouselStrip"),
            carouselWrapper = $(evt.currentTarget).parent(),
            eachAddressWidth = carousel.find("li").eq(0).width(),
            totalStripLength = carousel.find("li").length * eachAddressWidth,
            carouselLeft = parseInt(carousel.css("left")),
            calculateLeft = totalStripLength - carouselWrapper.width() - Math.abs(parseInt(carousel.css("left")));
        
        if(carouselLeft === 0) {
            return true;  
        } 
        carouselWrapper.removeClass("removeNext");
        (Math.abs(carouselLeft) === 200) ? carouselWrapper.removeClass("prevActive") : "";
        if(Math.abs(carouselLeft) >= 200) {
            carousel.css("left", parseInt(carouselLeft + 200)+"px");
        } else {
            carousel.css("left", "-3px");
            carouselWrapper.removeClass("prevActive");
        }
    };

    $scope.deleteAddress = function(event, id) {
        var id = id;
        var addressFilterMap = this.addressList.map(function(i, j) {
            return (i.addressId === id);
        });
        var addressFilterIndex = addressFilterMap.indexOf(true);
        // Remove the item from list
        this.addressList.splice( addressFilterIndex, 1 );
        $http({
				method: 'GET',
              	url: PRODUCTDATA_URL + '/cart/address/delete/'+ id
            }).then(function successCallback(data, status) {
				$rootScope.$broadcast("updateFlash", {"alertType": "success", "delay": 10, "message": "Address Deleted !!!"});
            });
        $(event.currentTarget).parents(".carouselStrip").css("left", "-3px");
        // Broadcast cart update to mini cart
        $rootScope.$broadcast("updateFlash", {"alertType": "success", "message": "Address removed successfully !!"});
    };                        

    $(".accounts-menu > li a").click(function() {
        var dataModel = $(this).data("model");
        $scope.myAccounts = false;
        $scope.mySubscription = false;
        $scope.myAddress = false;
        $scope.hasAddress = false;
        $scope.myOrders = false;
        switch(dataModel) {
            case "myDashboard":
                $scope.myOrders = true;
                break;
            case "myAccounts":
                $scope.myAccounts = true;
                break;
            case "myAddress":
                $scope.myAddress = true;
                $scope.hasAddress = true;
                break;
            case "myOrders":
                $scope.myOrders = true;
                break;
            case "mySubscription":
                $scope.mySubscription = true;
                break;
            default:
                // default code block
        }
        $scope.$apply();
        // $scope[dataModel] = true;
    });

  }]);
}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/accounts/accountsController.js","/../../../app/components/accounts")
},{"+7ZJp0":56,"buffer":53}],7:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
  .service('AccountsService', ['$http', 'ENDPOINT_URI', 'PRODUCTDATA_URL',
    function ($http, ENDPOINT_URI, PRODUCTDATA_URL) {
    var service = this;
    //to create unique contact id
    var uid = 1;

    //simply returns the contacts list
    service.list = function () {
        return service.contacts;
    }

    service.GetAll = function(url) {
        return $http.get(url).then(service.extract, service.handleError('Error getting all users'));
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

    service.handleError = function(res) {
        return function () {
            return { success: false, message: res.message };
        };
    }

    service.getServiceData = function(url) {
        return $http.get(PRODUCTDATA_URL + url);
    }

    service.getOrderList = function() {
        // Read Cart Array and pass to URL
        return $http({
                method: 'GET',
                url: PRODUCTDATA_URL + '/order/list'
            }).then(function successCallback(response) {
            	$.each(response.data.orderList, function(i, j) {
            		var dt = new Date(j.orderDate);
					var month = ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
					j.orderDateConverted = month[dt.getMonth()] +" "+ dt.getDate()+', '+ dt.getFullYear();
            	});
                return response.data;
            }, function errorCallback(response) {
                console.log("Error in saving.");
        }); 
    } 

    service.getAccountDetail = function() {
        return $http({
                method: 'GET',
                url: PRODUCTDATA_URL + '/account/details'
            }).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {
                console.log("Error in saving.");
        }); 
    } 

    service.getSavedCart = function() {
        // Read Cart Array and pass to URL
        var cartArray,
            cartItems = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [],
            objectToSerialize, 
            responseData;
            cartArray = cartItems.map(function(i, j) {
                        return (i.partNumber || i.productId);
                    });
            objectToSerialize={'products':cartArray};

        return $http({
                method: 'POST',
                url: PRODUCTDATA_URL + '/cart/viewCart',
                data: JSON.stringify(objectToSerialize)
            }).then(function successCallback(response) {
                responseData = response.data;
                return responseData;
            }, function errorCallback(response) {
                console.log("Error in saving.");
        }); 
    }

    service.orderLookup = function(obj) {
        var deferred = $q.defer();
        // Read Cart Array and pass to URL
        var objectToSerialize = {};
            objectToSerialize[obj[1].name] = obj[1].value;

        return $http({
                method: 'GET',
                url: PRODUCTDATA_URL + '/order/guest/' + obj[0].value,
                params: objectToSerialize
            }).then(function successCallback(response) {
                deferred.resolve(response.data)
                return deferred.promise;
            }, function errorCallback(response) {
                console.log("Error in saving.");
            }); 
    }

    service.getAddress = function() {
        // Read Cart Array and pass to URL
        return $http({
                method: 'GET',
                url: PRODUCTDATA_URL + '/cart/address'
            }).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {
                console.log("Error in saving.");
        }); 
    }


  }]);

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/accounts/accountsService.js","/../../../app/components/accounts")
},{"+7ZJp0":56,"buffer":53}],8:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
  .controller('AdminCtrl', ['$scope', '$rootScope', '$http', '$state', '$timeout', 'UserService', '$cookies', 'PRODUCTDATA_URL', 'AuthenticationService', 'OrderDetailService', 
    function ($scope, $rootScope, $http, $state, $timeout, UserService, $cookies, PRODUCTDATA_URL, AuthenticationService, OrderDetailService) {
    var admin = this;
    
    // UserService.GetAll( BASE_URI + '/eCommerce/home.json')
    UserService.GetAll( PRODUCTDATA_URL + '/admin/visitors')
        .then(function(data) {
          if(data.totalUniqueVisitorsCount) {
          	admin.uniqueViews = data.totalUniqueVisitorsCount;
          	admin.totalCount = data.totalVisitorsCount;
          }
        })
    
    $scope.chooseTemplate = function(e) { 
        $(".adminMenu label").removeClass("active");
        $(e.target).addClass("active");
        $(".tabbedPane").find("> div").removeClass("show hide").addClass("hide");
        $(".tabbedPane").find("."+$(e.target).attr("id")).removeClass("hide").addClass("show");
        
        if(e.target.id === 'ordermanagement' && !$scope.orderList){
            OrderDetailService.getOrderList().then(function(data){
                $scope.orderList = data.orderList;
            });
        } else if (e.target.id === 'subscriber' && !$scope.subscriberData){
            UserService.GetAll( PRODUCTDATA_URL + '/admin/subscribers').then(function(data) {
                $scope.subscriberData = data;
            })
        } else if (e.target.id === 'promomailgenerator' && !$scope.promomailgenerator){
            UserService.GetAll( PRODUCTDATA_URL + '/admin/promoMails').then(function(data) {
                $scope.promomailgenerator = true;
                $scope.subject = data.subject;
                $scope.id = data.id;
                CKEDITOR.instances.haastikaeditor.setData(data.content);
            })
        }

    };

    $scope.logout = function() {
        // reset login status
        AuthenticationService.ClearCredentials();
        window.localStorage.setItem("accessToken", "");
        window.sessionStorage.setItem("checkoutState", '{"login": false, "address": false, "order": false, "payment": false }');
        window.userDetails = {"name": "Guest","imageUrl": "","user": null};
        $state.go('home');
    };
    
  }]
);

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/admin/adminController.js","/../../../app/components/admin")
},{"+7ZJp0":56,"buffer":53}],9:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
    .controller('CartCtrl', ['$scope', '$http', '$rootScope', '$timeout', '$state', '$location', 'CartService', 'UserService', 'PRODUCTDATA_URL', 'user', 'cartData', 
        function($scope, $http, $rootScope, $timeout, $state, $location, CartService, UserService, PRODUCTDATA_URL, user, cartData) {
        var cart = this,
        responseData,
        loginStatus = user,
        cartData = cartData;   
        
        $scope.location = $location;
        
        // Currency Update
        if(window.userDetails && window.userDetails.preferredCurrency) {
            $rootScope.$broadcast("updateCurrency", window.userDetails.preferredCurrency);    
        }
        
        // Read Cart Array and pass to URL
        var cartItems = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [];
        if(cartData.loggedUser !== null) {
            $scope.cartItems = cartData.cartList;
        } else {
            responseData = cartData.cartList;
            $.each(responseData, function(key, val) {
                val["quantity"] = cartItems[key].quantity;
            });
            $scope.cartItems = (responseData) ? responseData : [];
        }
        
        // Cart Configuration
        $scope.cartConfig = {
            "shippingCost": 0,
            "tax": 6.5,
            "discount": 0
        };

        // Injecting Math into cart scope
        $scope.Math = window.Math;
        // $(document).on("keyup", ".item-quantity", this.getTotal);
        
        $scope.getTotal = function() {
            $scope.currency = $("body").attr("data-currency").toUpperCase();
            var cartItems = this.cartItems,
            totalCost = 0,
            priceObj,
            currency = $("body").attr("data-currency");
            $(cartItems).each(function(i, j) {
                priceObj = j.productPriceOptions.filter(function(key, val) {
                    return key.currencyCode === currency.toUpperCase();
                });
                totalCost += priceObj[0].price * j.quantity;
            });
            return totalCost;
        };

        $scope.subTotal = function() {
            var totalCost = this.getTotal(),
                cartConfig = this.cartConfig,
                totalCostToUser,
                priceObj,
                currency = $("body").attr("data-currency");

            totalCostToUser = totalCost - cartConfig.shippingCost + (cartConfig.tax/100*totalCost);
            return totalCostToUser;
        };

        $scope.calculateTax = function() {
            var totalCost = this.getTotal(),
                cartConfig = this.cartConfig,
                currency = $("body").attr("data-currency");
            return (cartConfig.tax/100*totalCost);
        };
        
        $scope.manipulatePrice = function(event, call) {
            var index = $(event.currentTarget).parents(".item").attr("data-index"),
                lineItemId = $(event.currentTarget).attr("data-lineId"),
                items = this.cartItems,
                currentSize = parseInt(items[index].quantity),
                currency = $("body").attr("data-currency"),
                updateObj = {},
                finalQuantity = 0;
                if(call === "substract" && currentSize === 1) {
                    // Broadcast cart update to mini cart
                    $rootScope.$broadcast("updateFlash", {"alertType": "danger", "message": "You cannot reduce the cart size below zero. Please remove the item."});
                    return;
                }
            
            items[index].quantity = (call === "add") ? currentSize+=1 : currentSize-=1;
            
            var itemsArray = [];
            $.each(items, function(i, item) {
                var priceObj = item.productPriceOptions.filter(function(key, val) {
                    return key.currencyCode === currency.toUpperCase();
                });
                var obj = {
                    "partNumber": item.productPartNumber || item.productId,
                    "quantity": item.quantity || 1
                }
                itemsArray.push(obj);
                finalQuantity += item.quantity || 1;
            });
            if(lineItemId === "") {
                window.sessionStorage.setItem('itemsArray', JSON.stringify(itemsArray));
                // Broadcast cart update to mini cart
                $rootScope.$broadcast("updateMiniCartCount", finalQuantity);
            } else {
                window.sessionStorage.setItem('cartLength', ((call === "add") ? parseInt(window.sessionStorage.cartLength || 0)+1 : parseInt(window.sessionStorage.cartLength || 0)-1));
                updateObj["lineItemId"] = items[index].lineItemId;
                updateObj["quantity"] = items[index].quantity;
                var promise = CartService.updateCartLineItem(updateObj);
                promise.then(function(response) {
                    // Broadcast cart update to mini cart
                    $rootScope.$broadcast("updateMiniCartCount", finalQuantity);
                });     
            }
            this.getTotal();
            // Broadcast cart update to mini cart
            $rootScope.$broadcast("updateMiniCart", this.cartItems);

        };

        $scope.removeItem = function(event) {
            var lineItemId = $(event.currentTarget).attr("data-lineId"),
                currency = $("body").attr("data-currency"),
                qty = this.$parent.cartItems.filter(function(i, j) {
                    return (i.lineItemId === parseInt(lineItemId));
                });
            var count = (window.sessionStorage.cartLength) ? parseInt(window.sessionStorage.cartLength) : 0;
            if(lineItemId === "") {
                // Removes the line item from Local storage when there is no logged in User.
                var currentIndex = $(event.currentTarget).parents("li").data("index"),
                    cartItems = (typeof(this.cartItems) === "string") ? JSON.parse(this.cartItems) : this.cartItems;
                // Reduce the cartLength counter
                window.sessionStorage.setItem('cartLength', count - cartItems[currentIndex].quantity);

                cartItems.splice(currentIndex,1);

                // Remove the item from storage
                var itemList = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [];
                itemList.splice(currentIndex,1);

                var itemsArray = [];
                $.each(itemList, function(i, item) {
                    var obj = {
                        "partNumber": item.productPartNumber || item.productId || item.partNumber,
                        "quantity": item.quantity || 1
                    }
                    itemsArray.push(obj);
                });
                
                // insert the new stringified array into LocalStorage
                window.sessionStorage.setItem('itemsArray', JSON.stringify(itemsArray));

                // If cart goes empty page redirects to home page
                if(itemList.length === 0) {
                    $timeout(function() {
                        $state.go("home");
                    }, 1000, false);
                }
                
                // Broadcast cart update to mini cart
                $rootScope.$broadcast("updateMiniCartCount");

            } else {
                // window.sessionStorage.setItem('cartLength', parseInt(window.sessionStorage.cartLength) - qty[0].quantity);
                var part, itemList, newList, itemsArray, quantity, count;
                count = (window.sessionStorage.cartLength) ? parseInt(window.sessionStorage.cartLength) : 0;
                part = $(event.currentTarget).data("part");
                quantity = $(event.currentTarget).data("quantity");

                window.sessionStorage.setItem('cartLength', count - parseInt(quantity));

                itemList = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [];
                // Remove the item from storage
                newList = itemList.filter(function(i) {
                    return i.partNumber != part;
                });

                itemsArray = [];
                $.each(newList, function(i, item) {
                    var obj = {
                        "partNumber": item.productPartNumber || item.productId || item.partNumber,
                        "quantity": item.quantity || 1
                    }
                    itemsArray.push(obj);
                });
                
                // insert the new stringified array into LocalStorage
                window.sessionStorage.setItem('itemsArray', JSON.stringify(itemsArray));

                // Removes the line item from data base when there is a logged in User.
                $http({
                    method: 'GET',
                    url: PRODUCTDATA_URL + '/cart/remove/'+ parseInt(lineItemId)
                }).then(function successCallback(response) {
                    // Broadcast cart update to mini cart
                    $rootScope.$broadcast("updateMiniCartCount");
                    $state.go($state.current, {}, {reload: true});
                }, function errorCallback(response) {
                    console.log("Error in saving.");
                });
            }

            event.preventDefault();
        };
        
        $scope.saveCart = function(event) {
            // Read Cart Array and pass to URL
            var cartArray = this.cartItems;
            $.each(cartArray, function(key, val) {
                val["unitPrice"] = val["productPriceOptions"][0].price;
            });
            var objectToSerialize={'lineItems':cartArray, "currencyId":1};
            
            $http({
                method: 'POST',
                url: PRODUCTDATA_URL + '/cart/save',
                data: JSON.stringify(objectToSerialize),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function successCallback(response) {
                debugger;
            }, function errorCallback(response) {
                console.log("Error in saving.");
            }); 
        };
        
        $scope.updateCart = function(event) {
            // Read Cart Array and pass to URL
            var cartArray = this.cartItems;
            $.each(cartArray, function(key, val) {
                val["unitPrice"] = val["productPriceOptions"][0].price;
            });
            var objectToSerialize={'lineItems':cartArray, "currencyId":1};
            
            $http({
                method: 'POST',
                url: PRODUCTDATA_URL + '/cart/update',
                data: JSON.stringify(objectToSerialize),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function successCallback(response) {
                // Broadcast cart update to mini cart
                $rootScope.$broadcast("updateMiniCartCount");
                
            }, function errorCallback(response) {
                console.log("Error in saving.");
            }); 
        };

        $scope.gotoCheckout = function() {
            // this.location.path("/checkout/login");
            //Validate Checkout URI states with actual submitted data
            // If the state is not cleared then it will redirect to beginning of the state.
            var validateURI = false, validStateIndex = 0,
            steps = JSON.parse(window.sessionStorage.checkoutState);

            function validateStateUrls() {
                for(var keys in steps) {
                  if(steps[keys]) {
                      validStateIndex++;
                      validateURI = true; 
                  } else {
                      validateURI = false;
                  }
                }  
            };
              
            // Checkout redirection on zero cart items
            var cartlength = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray).length : (window.sessionStorage.cartLength) ? parseInt(JSON.parse(window.sessionStorage.cartLength)) : 0;
            if(cartlength === 0) {
              $location.path('/');
            } else {
                validStateIndex = 0;
                validateStateUrls();
                $location.path('/checkout/'+ Object.keys(steps)[validStateIndex]);
            }

        };

        $scope.openOverlay = function() {
            $(".screen").show();
            $(".cartMailForm").css("top", $(document).scrollTop() + ($(window).height() - $(".cartMailForm").outerHeight()) / 2)
        };
        
        $scope.closeOverlay = function() {
            $(".cartMailForm").css("top", "-400px");
            setTimeout(function(){
                $(".screen").hide();
            }, 400);
        };
        
        $(document).on('data-currency-changed', $.proxy(function(e, key){
            $(".item-quantity").trigger("keyup");
        }, $scope));

        $timeout(function() {
            window.dataLoaded = true;
            $(".progress").hide();
        }, 1000, false);
    }]
);

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/cart/cartController.js","/../../../app/components/cart")
},{"+7ZJp0":56,"buffer":53}],10:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
  .service('CartService', ['$http', 'ENDPOINT_URI', 'PRODUCTDATA_URL', function ($http, ENDPOINT_URI, PRODUCTDATA_URL) {
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

    service.viewCart = function() {
        // Read Cart Array and pass to URL
        var cartArray,
            cartItems = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [],
            computedURL =  PRODUCTDATA_URL + '/cart/viewCart',
            objectToSerialize;
            cartArray = cartItems.map(function(i, j) {
                        return (i.partNumber || i.productId);
                    });
            objectToSerialize={'products':cartArray};

        return $http({
                method: 'POST',
                url: computedURL,
                data: JSON.stringify(objectToSerialize)
            }).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {
                console.log("Error in saving.");
            });
    } 

    service.updateCartLineItem = function(obj) {
        // Update Cart item in database
        return $http({
                method: 'POST',
                url: PRODUCTDATA_URL + '/cart/updateLineItem',
                data: JSON.stringify(obj)
            }).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {
                console.log("Error in saving.");
        }); 
    }    

  }]);

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/cart/cartService.js","/../../../app/components/cart")
},{"+7ZJp0":56,"buffer":53}],11:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
    .controller('categoryCtrl', ['$scope', '$rootScope', '$timeout', '$sce', '$state', 'CategoryService', 'UserService', '$stateParams', 'PRODUCTDATA_URL', 'BASE_URI', 
        function($scope, $rootScope, $timeout, $sce, $state, CategoryService, UserService, $stateParams, PRODUCTDATA_URL, BASE_URI) {
        var cat = this;
        var scoper = $scope;

        CategoryService.getFromURL(PRODUCTDATA_URL + '/productData/category/' + $stateParams.id)
            .then(function(data) {
                cat.data = data.categoryDetails;
                if(data.pageNavigation) {
                    // $rootScope.navigation = data.pageNavigation.categories;
                    // try {
                    //   window.sessionStorage.setItem('navigation', JSON.stringify(data.pageNavigation.categories));
                    // } catch (e) {
                    //   if (e == QUOTA_EXCEEDED_ERR) {
                    //     alert('Quota exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
                    //   }
                    // }
                }
                $scope.iterateThrough = 5;
                $scope.$broadcast('dataloaded');
                // Currency Update
                if(window.userDetails && window.userDetails.preferredCurrency) {
                    $rootScope.$broadcast("updateCurrency", window.userDetails.preferredCurrency);
                }
                // $rootScope.$broadcast("updateCurrency", window.userDetails.preferredCurrency);
            })
            .catch(function(error) {
                $state.go('home');
            })
            .finally(function() {
                //
            })
            // debugger;

        $scope.$on('dataloaded', function() {
            $timeout(function() {
                window.dataLoaded = true;
                $(".progress").hide();
            }, 1000, false);
        });

        $scope.showFilter = function(elem) {
            if ($(".categoryTree").hasClass("show")) {
                $(".categoryTree").removeClass("show");
                $(".spacingAdjust").css("margin-left", "0px");
            } else {
                $(".categoryTree").addClass("show");
                $(".spacingAdjust").css("margin-left", "285px");
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

        $scope.getHtml = function(html) {
            return $sce.trustAsHtml(html);
        };

        
    }])
    .filter('html', ['$sce', function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    }]);

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/category/categoryController.js","/../../../app/components/category")
},{"+7ZJp0":56,"buffer":53}],12:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){

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



}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/category/categoryCtrl.js","/../../../app/components/category")
},{"+7ZJp0":56,"buffer":53}],13:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
  .service('CategoryService', ['$http', 'ENDPOINT_URI', function ($http, ENDPOINT_URI) {
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


  }]);
}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/category/categoryService.js","/../../../app/components/category")
},{"+7ZJp0":56,"buffer":53}],14:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
    .controller('CheckoutCtrl', ['$scope', '$http', '$rootScope', '$q', '$timeout', '$controller', '$state', 'checkoutStorage', 'CheckoutService', 'PRODUCTDATA_URL', '$location', 'cartItems', 'getAddress', 'getLoginStatus', 'viewCart', 'AuthenticationService', 'Facebook', 'Google',  
        function($scope, $http, $rootScope, $q, $timeout, $controller, $state, checkoutStorage, CheckoutService, PRODUCTDATA_URL, $location, cartItems, getAddress, getLoginStatus, viewCart, AuthenticationService, Facebook, Google) {
        var checkout = this,
        responseData,
        self = $scope;
        
        $scope.state = $state;
        $scope.location = $location;
        $scope.loginService = AuthenticationService;
        window.storageFactory = checkoutStorage;

        // Retrieves data from storage
        $scope.co = checkoutStorage.getData('storage');

        // Currency Update
        if(window.userDetails && window.userDetails.preferredCurrency) {
            $rootScope.$broadcast("updateCurrency", window.userDetails.preferredCurrency);
        }

        // Cart Configuration
        $scope.checkoutCartConfig = {
            "shippingCost": 0,
            "tax": 3,
            "discount": 15
        };

        // Singleton Variables to restrict repeated service calls
        window.singleCall = (window.singleCall === undefined) ? { cartDetails: true, authenticateUser: false, authenticateUserAddress: false, authenticateUserOrder: false, authenticateUserPayment: false } : window.singleCall;

        // Checks for pre available address and updates address view selections
        if(getAddress && getAddress.length > 0) {
            $scope.hasAddress = true;
            $scope.addressList = getAddress;
        } else {
            $scope.hasAddress = false;
        }

        // Selets the default step on Page load
        // and stores the cart items for order page.
        if(viewCart) {
            var responseData,
                cartItems = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [];
            if(getLoginStatus && getLoginStatus.success === true) {
                if(viewCart.cartList.length === 0) {
                    
                }
                $scope.cartItems = viewCart.cartList;
            } else {
                responseData = viewCart.cartList;
                $.each(responseData, function(key, val) {
                    val["quantity"] = val.quantity || 1;
                });
                $scope.cartItems = (responseData) ? responseData : [];
            }
            // if(getLoginStatus && getLoginStatus.success === true) {
            //     $scope.cartItems = viewCart.cartList;
            // } else {
            //     $scope.cartItems = cartItems;
            // }
            // $scope.cartItems = viewCart.cartList;
            // Stores the steps completed on page load
            checkoutStorage.setData($scope.steps, 'steps');
        }


        // Injecting Math into cart scope
        $scope.Math = window.Math;

        window.dataLoaded = true;
        scrollTo($state.current.name);

        $scope.getCityState = function(event) {
            var self = this,
            val = $(event.target).val(),
            url = 'http://maps.googleapis.com/maps/api/geocode/json?address=94086&sensor=true';
        };

        $scope.updateAddressToStorage = function(event, id) {
            $(event.currentTarget).siblings().removeClass("active");
            if($scope.co && $scope.co.address) {
                $(event.currentTarget).addClass("active");
                $scope.co.user["addressId"] = id;
            } else {
                if(!$scope.co) {
                    $scope.co = {};
                    $scope.co["user"] = {};
                }
                $scope.co["address"] = {};
                $scope.co.user["addressId"] = id;
            }
            updateStorage($scope.co);
        };

        $scope.toggleAddressForm = function(event) {
            this.hasAddress = ($scope.hasAddress) ? false : true;
        };

        $scope.selectAddress = function(event) {
            // $(event.currentTarget).parents(".section").removeClass("selected");
            if(this.addressList) {
                var obj = this.addressList.filter(function(val) {
                    return val.addressId === self.co.user.addressId;
                });
                self.co.address = obj[0];
            }
            if($(".address-wraper > ul li.active").length === 0) {
                // Broadcast cart update to mini cart
                $rootScope.$broadcast("updateFlash", {"alertType": "warning", "message": "Please select an address before proceeding !!"});
            } else {
                this.updateCheckoutStep(event, 'address', 'order');
            }
            
        };

        $scope.redeemCouponCode = function(event) {
            var self = this,
                thisVal = $(event.currentTarget).siblings("input").val().toLowerCase(),
                updatedView = this.co.order && this.co.order.couponcode,
                objectToSerialize={'emailId': this.co.user.emailId, "promoCode": (this.co.order && this.co.order.couponcode) ? this.co.order.couponcode : 0};
            
            // Validate Coupon Code and proceed with below code.
            function applyDiscount() {
                self.co.user.eligibleForDiscount = true;
                self.co.order.discountPrice = self.calculateDiscount();
                // Saves coupon code to storage
                updateStorage(self.co);   
            };
            
            var promise = $http({
                method: 'POST',
                url: PRODUCTDATA_URL + '/cart/isValidPromo',
                data: JSON.stringify(objectToSerialize)
            });
            promise.then(function(response) {
                if(response.data) {
                    applyDiscount(); 
                } else {
                    self.co.user.eligibleForDiscount = false;
                    if(!self.co.order) {
                        self.co["order"] = {};    
                    }
                    self.co.order.discountPrice = 0;
                }

                // updates view with confirmation code
                $(".coupon-code").height(0);
                $(".coupon-applied").height(24);
                self.calculateTax();
                self.subTotal(); 
            });
        };
        
        $scope.proceedTo = function(event, step) {
            // updates storage with reference to 'checkout' object from view
            updateStorage(this.co);
            // Updates path
            $(event.currentTarget).parents(".container.form-views").animate({height: 0 }, 400, function() {
                $rootScope.$broadcast("checkout_uri_changed", {'step': step});
            });
        };

        $scope.skipToPage = function(event, step) {
            // updates storage with reference to 'checkout' object from view
            updateStorage(window.storageFactory.getData('storage'));
            // Updates path
            $(".form-views.active").animate({height: 0 }, 400, function() {
                $rootScope.$broadcast("checkout_uri_changed", {'step': step});
            });
        };

        function updateStorage(obj) {
            checkoutStorage.setData(obj, 'storage');
        };

        $scope.getTotal = function() {
            $scope.currency = $("body").attr("data-currency").toUpperCase();
            var cartItems = this.cartItems,
            totalCost = 0,
            priceObj,
            currency = $("body").attr("data-currency");
            $(cartItems).each(function(i, j) {
                priceObj = j.productPriceOptions.filter(function(key, val) {
                    return key.currencyCode === currency.toUpperCase();
                });
                totalCost += priceObj[0].price * j.quantity;
            });
            return totalCost;
        };

        $scope.subTotal = function() {
            var totalCost = this.getTotal(),
                checkoutCartConfig = this.checkoutCartConfig,
                totalCostToUser,
                totalCostToUserAfterDiscount,
                priceObj,
                currency = $("body").attr("data-currency"),
                discount = (this.co && this.co.order && this.co.order.couponcode && this.co.user.eligibleForDiscount) ? checkoutCartConfig.discount : 0;

            totalCostToUserAfterDiscount = totalCost - (discount/100*totalCost);
            totalCostToUser = totalCostToUserAfterDiscount - checkoutCartConfig.shippingCost + (checkoutCartConfig.tax/100*totalCostToUserAfterDiscount);
            
            return totalCostToUser;
        };

        $scope.calculateTax = function() {
            var totalCost = this.getTotal(),
                checkoutCartConfig = this.checkoutCartConfig,
                currency = $("body").attr("data-currency"),
                discount = (this.co.order && this.co.order.couponcode && this.co.user.eligibleForDiscount) ? checkoutCartConfig.discount : 0;
            return (this.co.user.eligibleForDiscount) ? (checkoutCartConfig.tax/100* (totalCost-discount/100*totalCost)) : (checkoutCartConfig.tax/100*totalCost);
        };

        $scope.calculateDiscount = function() {
            var totalCost = this.getTotal(),
                checkoutCartConfig = this.checkoutCartConfig,
                currency = $("body").attr("data-currency");
            return (this.co.user.eligibleForDiscount) ? (checkoutCartConfig.discount/100*totalCost) : 0;
        };

        $scope.addCouponCode = function(event) {
            $(".coupon-applied").height(0);
            $(event.currentTarget.parentNode).next().height(28);
        };

        $scope.checkoutLogin = function () {
            var user = $scope.co.user;
            updateStorage($scope.co);
            var rootScope = $rootScope;
            AuthenticationService.Login(user.emailId, user.password, function(response) {
                if(response.success) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    rootScope.$broadcast("checkout_uri_changed", {'step': 'address'});
                } else {
                    $scope.error = response.message;
                }
            });
        };

        $scope.manipulatePrice = function(event, call) {
            var index = $(event.currentTarget).parents(".item").attr("data-index"),
                lineItemId = $(event.currentTarget).attr("data-lineId"),
                items = this.cartItems,
                currentSize = parseInt(items[index].quantity),
                currency = $("body").attr("data-currency"),
                updateObj = {},
                finalQuantity = 0;
                if(call === "substract" && currentSize === 1) {
                    // Broadcast cart update to mini cart
                    $rootScope.$broadcast("updateFlash", {"alertType": "danger", "message": "You cannot reduce the cart size below zero. Please remove the item."});
                    return;
                }
            
            items[index].quantity = (call === "add") ? currentSize+=1 : currentSize-=1;
            
            var itemsArray = [];
            $.each(items, function(i, item) {
                var priceObj = item.productPriceOptions.filter(function(key, val) {
                    return key.currencyCode === currency.toUpperCase();
                });
                var obj = {
                    "partNumber": item.productPartNumber || item.productId,
                    "quantity": item.quantity || 1
                }
                itemsArray.push(obj);
                finalQuantity += item.quantity || 1;
            });
            
            if(lineItemId === "") {
                window.sessionStorage.setItem('itemsArray', JSON.stringify(itemsArray));
                // Broadcast cart update to mini cart
                $rootScope.$broadcast("updateMiniCartCount", finalQuantity);
            } else {
                window.sessionStorage.setItem('cartLength', ((call === "add") ? parseInt(window.sessionStorage.cartLength || 0)+1 : parseInt(window.sessionStorage.cartLength || 0)-1));
                updateObj["lineItemId"] = items[index].lineItemId;
                updateObj["quantity"] = items[index].quantity;
                var promise = CheckoutService.updateCartLineItem(updateObj);
                promise.then(function(response) {
                    // Broadcast cart update to mini cart
                    $rootScope.$broadcast("updateMiniCartCount", finalQuantity);
                });     
            }
            this.getTotal();
            // Broadcast cart update to mini cart
            $rootScope.$broadcast("updateMiniCart", this.cartItems);

        };

        $scope.removeItem = function(event) {
            var lineItemId = $(event.currentTarget).attr("data-lineId"),
                currency = $("body").attr("data-currency"),
                qty = this.$parent.cartItems.filter(function(i, j) {
                    return (i.lineItemId === parseInt(lineItemId));
                });
            var count = (window.sessionStorage.cartLength) ? parseInt(window.sessionStorage.cartLength) : 0;
            if(lineItemId === "") {
                // Removes the line item from Local storage when there is no logged in User.
                var currentIndex = $(event.currentTarget).parents("li").data("index"),
                    cartItems = (typeof(this.cartItems) === "string") ? JSON.parse(this.cartItems) : this.cartItems;
                // Reduce the cartLength counter
                window.sessionStorage.setItem('cartLength', count - cartItems[currentIndex].quantity);

                cartItems.splice(currentIndex,1);

                // Remove the item from storage
                var itemList = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [];
                itemList.splice(currentIndex,1);

                var itemsArray = [];
                $.each(itemList, function(i, item) {
                    var obj = {
                        "partNumber": item.productPartNumber || item.productId || item.partNumber,
                        "quantity": item.quantity || 1
                    }
                    itemsArray.push(obj);
                });
                
                // insert the new stringified array into LocalStorage
                window.sessionStorage.setItem('itemsArray', JSON.stringify(itemList));

                // If cart goes empty page redirects to home page
                if(itemList.length === 0) {
                    $timeout(function() {
                        $state.go("home");
                    }, 1000, false);
                }
                
                // Broadcast cart update to mini cart
                $rootScope.$broadcast("updateMiniCartCount");

            } else {
                window.sessionStorage.setItem('cartLength', parseInt(window.sessionStorage.cartLength) - qty[0].quantity);
                // Removes the line item from data base when there is a logged in User.
                $http({
                    method: 'GET',
                    url: PRODUCTDATA_URL + '/cart/remove/'+ parseInt(lineItemId)
                }).then(function successCallback(response) {
                    // Broadcast cart update to mini cart
                    $rootScope.$broadcast("updateMiniCartCount");
                    $state.go($state.current, {}, {reload: true});
                }, function errorCallback(response) {
                    console.log("Error in saving.");
                });
            }

            event.preventDefault();
        };

        $scope.updateAddress = function(event) {
            var self = this;
            var objectToSerialize = this.co.address;
            var promise = $http({
                method: 'POST',
                url: PRODUCTDATA_URL + '/cart/address/update',
                data: JSON.stringify(objectToSerialize)
            });
            this.updateCheckoutStep(event, 'address', 'order');
        };

        $scope.verifyUser = function() {
            // var validateUser = scope.currentScope.loginService.validateToken();
            window.singleCall.authenticateUser = true;
            CheckoutService.GetAll( PRODUCTDATA_URL + '/authenticate/validate')
              .then(function(data) {
                if(data.success === true) {
                    $rootScope.$broadcast("checkout_uri_changed", {'step': 'address'});
                    window.singleCall.authenticateUser = true;
                } else {
                    window.singleCall.authenticateUser = false;
                }
              }
            );
        };
        
        // // Detect On DOM loaded change
        $scope.$on('$viewContentLoaded', function(event){
            var promise;
            window.scope = event;
            // Clearing independent calls
            window.getAddressOnce = false;
            window.getViewCartOnce = false;

            // window.singleCall.authenticateUser = false;
            var currentState = $state.current.name.split("checkout.")[1];
            $(".checkout > .section").removeClass("selected");
            setTimeout(function() {
                $(".checkout").find("."+currentState).addClass("selected");
            }, 10);

            //Checks if user is already logged in
            if(!window.singleCall.authenticateUser && location.pathname.indexOf("login") !== -1) {
                window.singleCall.authenticateUser = true;
                if(getLoginStatus && getLoginStatus.success === true) {
                    scope.targetScope.getLoginStatus = getLoginStatus;
                    // var userDetails = (window.userDetails) ? JSON.parse(window.userDetails) : {"name": "Guest","imageUrl": "","user": null};
                    scope.targetScope.co = {};
                    scope.targetScope.co["user"] = {};
                    // scope.targetScope.co["user"]["emailId"] = userDetails.emailId;
                    scope.targetScope.updateCheckoutStep(scope, 'login', 'address');
                } else {
                    $rootScope.$broadcast("checkout_uri_changed", {'step': 'login'});
                }
            }

            //Here your view content is fully loaded !!
            $(".checkout .section").each(function(i, j) {
                if(!$(this).find(".container").hasClass("active")) {
                    $(this).find(".container").remove();
                }
            });
        });

        function scrollTo(page) {
            var loginTop = $(".login-details").position().top;
            var addressTop = $(".address-details").position().top - $(".login-container").height();
            var orderTop = $(".order-summary").position().top - $(".address-container").height() - $(".login-container").height();
            var paymentTop = $(".payment").position().top - $(".address-container").height() - $(".login-container").height() - $(".order-container").height()

            $timeout(function() {
                switch(page) {
                    case "checkout.login":
                        $('html, body').animate({scrollTop: loginTop - 30}, 10);
                        break;
                    case "checkout.address":
                        $('html, body').animate({scrollTop: addressTop - 30}, 10);
                        break;
                    case "checkout.order":
                        $('html, body').animate({scrollTop: orderTop - 30}, 10);
                        break;
                    case "checkout.payments":
                        $('html, body').animate({scrollTop: paymentTop - 30}, 10);
                        break;
                    default:
                        // default code block
                }
            }, 1, false); 
        };

        $scope.openOverlay = function() {
            $(".screen").show();
            $(".cartMailForm").css("top", $(document).scrollTop() + ($(window).height() - $(".cartMailForm").outerHeight()) / 2)
        };
        
        $scope.closeOverlay = function() {
            $(".cartMailForm").css("top", "-400px");
            setTimeout(function(){
                $(".screen").hide();
            }, 400);
        };

        $scope.nextAddressSlider = function(evt) {
            var carousel = $(evt.currentTarget).siblings(".carouselStrip"),
                carouselWrapper = $(evt.currentTarget).parent(),
                eachAddressWidth = carousel.find("li").eq(0).width(),
                totalStripLength = carousel.find("li").length * eachAddressWidth,
                carouselLeft = parseInt(carousel.css("left")),
                calculateLeft = totalStripLength - carouselWrapper.width() - Math.abs(parseInt(carousel.css("left")));
            
            if(calculateLeft > 200) {
                carouselWrapper.addClass("prevActive");
                carousel.css("left", parseInt(carouselLeft - 200)+"px");
            } else {
                carousel.css("left", parseInt(carouselLeft - calculateLeft)+"px");
                carouselWrapper.addClass("removeNext");
            }
        };

        $scope.prevAddressSlider = function(evt) {
            var carousel = $(evt.currentTarget).siblings(".carouselStrip"),
                carouselWrapper = $(evt.currentTarget).parent(),
                eachAddressWidth = carousel.find("li").eq(0).width(),
                totalStripLength = carousel.find("li").length * eachAddressWidth,
                carouselLeft = parseInt(carousel.css("left")),
                calculateLeft = totalStripLength - carouselWrapper.width() - Math.abs(parseInt(carousel.css("left")));
            
            if(carouselLeft === 0) {
                return true;  
            } 
            carouselWrapper.removeClass("removeNext");
            (Math.abs(carouselLeft) === 200) ? carouselWrapper.removeClass("prevActive") : "";
            if(Math.abs(carouselLeft) >= 200) {
                carousel.css("left", parseInt(carouselLeft + 200)+"px");
            } else {
                carousel.css("left", "-3px");
                carouselWrapper.removeClass("prevActive");
            }
        };

        $scope.deleteAddress = function(event, id) {
            var id = id;
            var addressFilterMap = this.addressList.map(function(i, j) {
                return (i.addressId === id);
            });
            var addressFilterIndex = addressFilterMap.indexOf(true);
            // Remove the item from list
            this.addressList.splice( addressFilterIndex, 1 );
            $(event.currentTarget).parents(".carouselStrip").css("left", "-3px");
            // Broadcast cart update to mini cart
            $rootScope.$broadcast("updateFlash", {"alertType": "success", "message": "Address removed successfully !!"});
        };  

        // Order place
        $scope.placeOrder = function() {
            var self = this,
                lineItems = [],
                objectToSerialize;
            $.each(this.cartItems, function(key, val) {
                lineItems.push({
                    "productId": val.productId,
                    "quantity": val.quantity
                });
            });
            objectToSerialize = {"lineItems": lineItems, "address": this.co.address, "currencyId": 1, "emailId": this.co.user.emailId, "promoUsed": this.co.user.eligibleForDiscount};

            var promise = $http({
                method: 'POST',
                url: PRODUCTDATA_URL + '/order/createOrder',
                data: JSON.stringify(objectToSerialize)
            });
            promise.then(function(response) {
                if(response.data.success) {
                    window.orderNumber = response.data.webOrderNumber;
                    window.miniCartStorage = [];
                    window.itemsArray = [];
                    window.sessionStorage.removeItem('itemsArray');
                    window.sessionStorage.removeItem('storage');
                    window.sessionStorage.setItem('checkoutState', '{"login": false, "address": false, "order": false, "payment": false }');
                    window.restrictView = false;
                    window.sessionStorage.cartLength = 0;
                    
                    // Broadcast cart update to mini cart
                    $rootScope.$broadcast("updateMiniCartCount");

                    // Redirect to thankyou page
                    self.location.path('/thankyou');
                }
            });
        };

        // function to submit the form after all validation has occurred            
        $scope.updateCheckoutStep = $.proxy(function(event, from, to) {
            var self = this,
                rootElem = (event.currentTarget) ? event.currentTarget : $(".section."+from).find(".columns");
            // updates storage with reference to 'checkout' object from view
            updateStorage(this.co, 'storage');

            // Updates path
            $(rootElem).parents(".container.form-views").removeClass("active").animate({height: 0 }, 400, function() {
                var steps = JSON.parse(window.sessionStorage.checkoutState);
                steps[from] = true;
                window.sessionStorage.setItem('checkoutState', JSON.stringify(steps));
                $rootScope.$broadcast("checkout_uri_changed", {'step': to});
            });
        }, $scope);

        $(document).on('data-currency-changed', $.proxy(function(e, key){
            $scope.subTotal();
        }, $scope));


        /* Facebook Authentication Login code goes here */
        $scope.fblogin = function () {
            $timeout(function () {
                Facebook.login('checkout.address', function() {
                    window.singleCall.authenticateUser = true;
                    window.scope.targetScope.co = {"user": {"emailId": ""}};
                    window.scope.targetScope.updateCheckoutStep(window.scope, 'login', 'address');
                });
            }, 100, false);
        };

        /* Google Authentication code goes here */
        $scope.googleHandleAuthClick = function() {
            Google.login(function() {
                    window.singleCall.authenticateUser = true;
                    window.scope.targetScope.co = {"user": {"emailId": ""}};
                    window.scope.targetScope.updateCheckoutStep(window.scope, 'login', 'address');
                });
        };

    }]
);

angular.module('eCommerce')
    .factory("checkoutStorage", ['$window', '$rootScope', function($window, $rootScope) {
        angular.element($window).on('storage', function(event) {
            if (event.key === 'storage') {
                $rootScope.$apply();
            }
        });
        return {
            setData: function(val, into) {
                $window.sessionStorage && $window.sessionStorage.setItem(into, JSON.stringify(val));
                return this;
            },
            getData: function(val) {
                return $window.sessionStorage && JSON.parse($window.sessionStorage.getItem(val));
            }
        };
    }]
);
}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/checkout/checkoutController.js","/../../../app/components/checkout")
},{"+7ZJp0":56,"buffer":53}],15:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
  .service('CheckoutService', ['$http', 'ENDPOINT_URI', 'PRODUCTDATA_URL', 'checkoutStorage', 
    function ($http, ENDPOINT_URI, PRODUCTDATA_URL, checkoutStorage) {
    var service = this;
    //to create unique contact id
    var uid = 1;

    //simply returns the contacts list
    service.list = function () {
        return service.contacts;
    }

    service.GetAll = function(url) {
        return $http.get(url).then(service.extract, service.handleError('Error getting all users'));
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

    service.handleError = function(res) {
        return function () {
            return { success: false, message: res.message };
        };
    }

    service.getServiceData = function(url) {
        return $http.get(PRODUCTDATA_URL + url);
    }

    service.validateToken = function() {
        if(window.validateOnce && window.validateOnce === true) {
            return;
        }
        
        return $http.get(PRODUCTDATA_URL + '/authenticate/validate').then(function (response) {
            window.validateOnce = true;
            return response.data;
        });
    } 

    service.getItems = function() {
        // Read Cart Array and pass to URL
        var cartItems = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [],
            responseData,
            cartArray,
            objectToSerialize;
            cartArray = cartItems.map(function(i, j) {
                        return (i.partNumber || i.productId);
                    });
            objectToSerialize={'products':cartArray};

            
        
        return $http({
                method: 'POST',
                url: PRODUCTDATA_URL + '/cart/products',
                data: JSON.stringify(objectToSerialize)
            }).then(function successCallback(response) {
                responseData = response.data;
                $.each(responseData, function(key, val) {
                    val["quantity"] = cartItems[key].quantity;
                });
                return responseData;
            }, function errorCallback(response) {
                console.log("Error in saving.");
        }); 
    } 

    service.viewCart = function() {
        if(window.getViewCartOnce && window.getViewCartOnce === true) {
            return;
        }
        
        // Read Cart Array and pass to URL
        var cartArray,
            cartItems = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [],
            responseData,
            objectToSerialize;
            cartArray = cartItems.map(function(i, j) {
                return (i.partNumber || i.productId);
            });
            objectToSerialize={'products':cartArray};

        return $http({
                method: 'POST',
                url: PRODUCTDATA_URL + '/cart/viewCart',
                data: JSON.stringify(objectToSerialize)
            }).then(function successCallback(response) {
                responseData = response.data;
                window.getViewCartOnce = true;
                return responseData;
            }, function errorCallback(response) {
                console.log("Error in saving.");
        }); 
    } 

    service.getAddress = function(obj) {
        if(window.getAddressOnce && window.getAddressOnce === true) {
            return;
        }
        // Read Cart Array and pass to URL
        return $http({
                method: 'GET',
                url: PRODUCTDATA_URL + '/cart/address'
            }).then(function successCallback(response) {
                window.getAddressOnce = true;
                return response.data;
            }, function errorCallback(response) {
                console.log("Error in saving.");
        }); 
    }

    service.updateCartLineItem = function(obj) {
        // Update Cart item in database
        return $http({
                method: 'POST',
                url: PRODUCTDATA_URL + '/cart/updateLineItem',
                data: JSON.stringify(obj)
            }).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {
                console.log("Error in saving.");
        }); 
    }


  }]);

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/checkout/checkoutService.js","/../../../app/components/checkout")
},{"+7ZJp0":56,"buffer":53}],16:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
  .controller('ContactCtrl', ['$scope', '$timeout', '$location', '$http', '$rootScope', 'PRODUCTDATA_URL', 'UserService', 'BASE_URI', function ($scope, $timeout, $location, $http, $rootScope, PRODUCTDATA_URL, UserService, BASE_URI) {
    var contacts = this;
    var original = $scope.user;
    
    // function to submit the form after all validation has occurred            
    $scope.submitForm = function() {

        var mailService = PRODUCTDATA_URL+"/sendfeedback";
        // check to make sure the form is completely valid
        if ($scope.userForm.$valid) {
            $http({
              method: 'POST',
              url: mailService,
              data: contacts.user,
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(function successCallback(data, feedbackSuccessful) {
                contacts.feedbackSent = data.data.feedbackSuccessful;
                contacts.pushNotification = data.data.feedbackMessage;
                contacts.sentSuccesfully = data.data.feedbackSuccessful;
                contacts.sentFailed = data.data.sentFailed;
                contacts.user={id:null,name:'',company:'',emailId:'',message:''};
                $scope.userForm.$setPristine();
                $timeout(function() {
                  $location.path( "/" );
                }, 3000);
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }   

    };

    $scope.reset = function(data) {
        data.name = ''; data.email = ''; data.company = ''; data.message = '';
        $scope.userForm.$dirty = false;
        $scope.userForm.$pristine = true;
        $scope.userForm.$submitted = false;
    };


  }])
;

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/contact/contactController.js","/../../../app/components/contact")
},{"+7ZJp0":56,"buffer":53}],17:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
  .controller('DetailCtrl', ['$scope', '$rootScope', '$sce', '$timeout', '$state', 'UserService', 'DetailService', 'PRODUCTDATA_URL', 'BASE_URI', '$stateParams', 
    function ($scope, $rootScope, $sce, $timeout, $state, UserService, DetailService, PRODUCTDATA_URL, BASE_URI, $stateParams) {
    var details = this;
    $scope.currentState = $state.params.id;
    
    DetailService.getFromURL( PRODUCTDATA_URL + '/productData/product/'+$stateParams.id)
        .then(function(data) {
            if(jQuery.isEmptyObject(data.productDetails)) {
                $state.go('home');
            }
            $scope.data = data.productDetails;
            $scope.$broadcast('dataloaded');
            // Currency Update
            if(window.userDetails && window.userDetails.preferredCurrency) {
                $rootScope.$broadcast("updateCurrency", window.userDetails.preferredCurrency);
            }
        })
        .catch(function(error) {
            //
        })
        .finally(function() {
            //
        });


    $scope.getHtml = function(html){
        return $sce.trustAsHtml(html);
    };

    $scope.$on('dataloaded', function() {
        $timeout(function () { 
            window.dataLoaded = true;
            $('#zoomable').addimagezoom({ rootElement: '.detailsPage'});
        }, 100, false);
    });

    $scope.openModal = function(ev) {
        var url = "https://www.facebook.com/dialog/feed?",
            params = {
            'app_id' : "1719553531700651",
            'caption': 'http://haastika.com/product/'+this.currentState,
            'link': 'http://haastika.com/product/'+this.currentState,
            'picture': 'http://haastika.com/'+this.data.productImageGallery[0].baseImagePath,
            'description': this.data.productDescription,
            'name': this.data.productName
        };
        window.open(url + $.param(params), "", "width=650,height=400");
        ev.stopPropagation();
    };

  }])
  

.filter('html', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
}]);

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/details/detailController.js","/../../../app/components/details")
},{"+7ZJp0":56,"buffer":53}],18:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
  .service('DetailService', ['$http', 'ENDPOINT_URI', function ($http, ENDPOINT_URI) {
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


  }]);
}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/details/detailService.js","/../../../app/components/details")
},{"+7ZJp0":56,"buffer":53}],19:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
  .controller('HomeCtrl', ['$scope', '$timeout', '$rootScope', 'UserService', 'PRODUCTDATA_URL', '$http', 
    function ($scope, $timeout, $rootScope, UserService, PRODUCTDATA_URL, $http) {
    var home = this;
    var scoper = $scope;
    $scope.user = "pritish";
    
    // Root scoping cartItem array globally across the application
    $rootScope.cartItems = (window.localStorage.itemsArray) ? JSON.parse(window.localStorage.itemsArray) : [];
    
    // UserService.GetAll( PRODUCTDATA_URL + '/home')
    UserService.GetAll( PRODUCTDATA_URL + '/home')
        .then(function(data) {
          if(data.success === undefined || data.success) {
            $scope.$broadcast('dataloaded');
            // Currency Update
            if(window.userDetails && window.userDetails.preferredCurrency) {
              $rootScope.$broadcast("updateCurrency", window.userDetails.preferredCurrency);
            }
          } else {
            // Else pick local JSON
          }
        })
        .catch(function(error) {
            //
        })
        .finally(function() {
            //
        });


    $scope.$on('dataloaded', function() {
        $timeout(function () {
            window.dataLoaded = true;
        }, 100, false);
    });


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
  }])
;

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/home/homeController.js","/../../../app/components/home")
},{"+7ZJp0":56,"buffer":53}],20:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
  .service('HomeService', ['$http', 'ENDPOINT_URI', function ($http, ENDPOINT_URI) {
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

  }]);
}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/home/homeService.js","/../../../app/components/home")
},{"+7ZJp0":56,"buffer":53}],21:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){

angular.module('eCommerce')
.controller('InventoryCtrl',['$scope', '$http', '$uibModal', function($scope, $http, $uibModal){
    var url = "assets/json/product.json";
// debugger;
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
.controller('productEditCtrl', ['$scope', function ($scope) {
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
}]);

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/inventory/inventoryCtrl.js","/../../../app/components/inventory")
},{"+7ZJp0":56,"buffer":53}],22:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){

angular.module('eCommerce')
.controller('productTreeCtrl', ['$scope', 'Upload', 'productTreeService', '$timeout', function($scope, Upload, productTreeService, $timeout) {
    productTreeService.list().then(function(data){
        // 
        $scope.$broadcast('dataloaded');
        $scope.categoryMetaData = data.data.categoryMetaData;
        $scope.categoryList = data.data.categoryList;
    });

    $scope.selected = true;

    $scope.$on('dataloaded', function() {
        $scope.collapseAll();
        $timeout(function () { 
            window.dataLoaded = true;
        }, 100, false);
    });
    
    $scope.collapse = function(event){
        var el = jQuery(event.currentTarget);
        if(jQuery(el.parents('li')[0]).find('li').length){
            jQuery(el.parents('li')[0]).find('> ul').toggle();
            el.toggleClass('fa-minus-square fa-plus-square');
        }
    }

    $scope.collapsed_cat = true;
    $scope.collapsed_subcat = true;
    $scope.collapseAll = function(type){
        if(type === 'category'){
            if($scope.collapsed_cat){
                jQuery('.category-view > ul').show();
                jQuery('.category-expand-all i').removeClass('fa-plus-square').addClass('fa-minus-square');
                jQuery('.category-view i.category').removeClass('fa-plus-square').addClass('fa-minus-square');
            } else {
                jQuery('.category-view > ul').hide();
                jQuery('.category-expand-all i').removeClass('fa-minus-square').addClass('fa-plus-square');
                jQuery('.category-view i.category').removeClass('fa-minus-square').addClass('fa-plus-square');
            }
            $scope.collapsed_cat = !$scope.collapsed_cat;
        } else{
            if($scope.collapsed_subcat){
                jQuery('.subcategory-view > ul').show();
                jQuery('.subcategory-expand-all i').removeClass('fa-plus-square').addClass('fa-minus-square');
                jQuery('.subcategory-view i.subcategory').removeClass('fa-plus-square').addClass('fa-minus-square');
            } else {
                jQuery('.subcategory-view > ul').hide();
                jQuery('.subcategory-expand-all i').removeClass('fa-minus-square').addClass('fa-plus-square');
                jQuery('.subcategory-view i.subcategory').removeClass('fa-minus-square').addClass('fa-plus-square');
            }
            $scope.collapsed_subcat = !$scope.collapsed_subcat;
        }
    }

    $scope.getSubCategories = function(productRootCategoryId){
        $scope.subCategoryList = _.find($scope.categoryList,{'categoryId':parseInt(productRootCategoryId)}). subCategoryList;
    }
    $scope.cancel =function(){
        $scope.nodeType = "";
    }
    $scope.editNode = function(nodeType,node, productCategoryId, productRootCategoryId){
        $('html,body').animate({scrollTop: $(".panel-heading").offset().top},'slow');
        $scope.nodeType = nodeType;
        $scope.node = node;
        $scope.productCategoryId = productCategoryId ? productCategoryId.toString() : null;
        $scope.productRootCategoryId = productRootCategoryId ? productRootCategoryId.toString() : null;
        if($scope.node.rootCategory) {
            $scope.node.rootCategory.categoryId = $scope.node.rootCategory.categoryId.toString();
        }
        if(productRootCategoryId){
            $scope.getSubCategories(productRootCategoryId);
        }
        $scope.categoryMenuImage = null;		
        $scope.categoryBannerImage = null;		
        $scope.categoryTileImage = null;
    };

    $scope.addNode = function(nodeType,node, productCategoryId, productRootCategoryId){
        $scope.nodeType = nodeType;
        $scope.node = {};
        
        if(nodeType === 'product'){
            $scope.node.priceOptions = [];
            $scope.node.priceOptions.push({
                "countryName": "India",
                "currencyCode": "INR",
                "currencyId": 1,
                "currencySymbol": "INR",
                "price": 0
            });
            $scope.node.priceOptions.push({
                "countryName": "United States",
                "currencyCode": "USD",
                "currencyId": 2,
                "currencySymbol": "$",
                "price": 0
            });
            $scope.node.priceOptions.push({
                "countryName": "United Kingdom",
                "currencyCode": "EUR",
                "currencyId": 3,
                "currencySymbol": "GBP",
                "price": 0
            });
        }
    };

    $scope.saveCategory = function(category){
        $scope.dataLoading = true;
        categoryObj = angular.copy(category);
        delete categoryObj["subCategoryList"];
        delete categoryObj["productsList"];
        productTreeService.saveNode('/admin/saveCategory', categoryObj, $scope.saveCategorySucess);
    }

    $scope.saveProduct = function(product){
        $scope.dataLoading = true;
        
        product.productCategory = {'categoryId': parseInt($('#subCategory').val() ? $('#subCategory').val() : $('#category').val())};
        productObj = angular.copy(product);
        productTreeService.saveNode('/admin/saveProduct', productObj, $scope.saveProductSucess);
    }

    $scope.saveCategorySucess = function(resp) {
        if(!$scope.node.categoryId){
            $scope.node.categoryId = resp.data.id;
            if($scope.node.rootCategory){
                _.find($scope.categoryList,{'categoryId':parseInt($scope.node.rootCategory.categoryId)}).subCategoryList.push($scope.node);
            } else {
                $scope.categoryList.push($scope.node);    
            }
        }
        $scope.dataLoading = false;
        $('.message').fadeIn(500).fadeOut(3000);
    }

    $scope.saveProductSucess = function(resp) {
        if(!$scope.node.productId) {
            $scope.node.productId = resp.data.id;
            if($scope.node.productCategory){
                _.find($scope.categoryList, function(obj) {
                    if(obj.categoryId == $scope.node.productCategory.categoryId){
                        obj.productsList.push($scope.node);
                    }
                    else {
                        debugger
                        if(obj.subCategoryList){
                            var subcat = _.find(obj.subCategoryList, {'categoryId':$scope.node.productCategory.categoryId});
                            if(subcat){
                                subcat.productsList.push($scope.node);
                            }
                        }
                    }
                });
            }
        }
        $scope.dataLoading = false;
        $('.message').fadeIn(500).fadeOut(3000);
    }

    $scope.deleteCategory = function(category) {
        category.enabled = false;
        $scope.saveCategory(category);
    }
    $scope.deleteProduct = function(product) {
        product.enabled = false;
        $scope.saveProduct(product);   
    }
    $scope.deleteNodeSucess = function(resp) {
        
        $scope.dataLoading = false;
    }

    $scope.uploadCatalogImage = function() {
        var imageData = {};
        $scope.imgLoading = true;

        if($scope.categoryMenuImage || $scope.categoryBannerImage || $scope.categoryTileImage){
            imageData.categoryId = $scope.node.categoryId;
            imageData.categoryPartNumber = $scope.node.categoryPartNumber;
            if($scope.categoryMenuImage){
                imageData.categoryMenuImage = $scope.categoryMenuImage;
            }
            if($scope.categoryBannerImage){
                imageData.categoryBannerImage = $scope.categoryBannerImage;
            }
            if($scope.categoryTileImage){
                imageData.categoryTileImage = $scope.categoryTileImage;
            }

            productTreeService.uploadImage('/admin/saveCategoryImages', imageData, $scope.categoryImageUploadSucess);
        }
    };

    $scope.categoryImageUploadSucess = function(resp) {
        $scope.imgLoading = false;
        $scope.categoryMenuImage = null;
        $scope.categoryBannerImage = null;
        $scope.categoryTileImage = null;
    }

    $scope.uploadProductImage = function() {
        var imageData = {};
        $scope.imgLoading = true;
        if($scope.baseImage){
            imageData.mediumImage = $scope.baseImage;
        }
        if($scope.thumbImage){
            imageData.thumbImage = $scope.thumbImage;
        }
        if($scope.largeImage){
            imageData.largeImage = $scope.largeImage;
        }
        if($scope.xlargeImage){
            imageData.extraLargeImage = $scope.xlargeImage;
        }
        imageData.productId = $scope.node.productId;
        // imageData.imageName = null;
        // imageData.currentImageFolderId = 2;

        productTreeService.uploadImage('/admin/saveProductImages', imageData, $scope.productImageUploadSucess);
    };

    $scope.productImageUploadSucess = function(resp) {
        $scope.node.productImageGallery.push(resp.data);
        $scope.baseImage = null;
        $scope.thumbImage = null;
        $scope.largeImage = null;
        $scope.xlargeImage = null;
        $scope.imgLoading = false;		
        $('.message').fadeIn(500).fadeOut(3000);
    }

    $scope.deleteProductImage = function(imageId){
        productTreeService.deleteNode("/admin/deleteProductImage/"+imageId, $scope.productImageDeleteSucess)
    }
    
    $scope.productImageDeleteSucess = function(resp) {
        var obj = _.find($scope.node.productImageGallery, {
            'productImageId':resp.data.id
        });		
        $scope.node.productImageGallery.splice($scope.node.productImageGallery.indexOf(obj),1);		
        $('.message').fadeIn(500).fadeOut(3000);
    }
}]);

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/inventory/productTreeCtrl.js","/../../../app/components/inventory")
},{"+7ZJp0":56,"buffer":53}],23:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
  .service('productTreeService', ['$http', 'Upload', 'PRODUCTDATA_URL', function ($http, Upload, PRODUCTDATA_URL) {
    var service = this;
    // var BASE_URL = "http://ec2-52-33-88-59.us-west-2.compute.amazonaws.com/HaastikaWebService/admin";
    // var BASE_URL = "http://ec2-52-32-195-43.us-west-2.compute.amazonaws.com/HaastikaWebService/admin";
    // var BASE_URL = "http://107.180.73.220/HaastikaWebService/admin";
    // var BASE_URL = "assets/json/productTree.json";
    var BASE_URL = 'http://107.180.66.21//HaastikaWebService/admin';

    //simply returns the category list
    service.list = function () {
        return $http.get("assets/json/productTree.json");
    }

    service.saveNode = function (url, node, callBack) {
        $http({
            method: 'POST',
            url: PRODUCTDATA_URL + url,
            data: JSON.stringify(node),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(data) {
            callBack(data);
        }, function errorCallback(response) {
            console.log("Error in saving.");
        });
    }

    service.deleteNode = function (url, callBack) {
        $http({
            method: 'GET',
            url: PRODUCTDATA_URL + url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(data) {
            callBack(data);
        }, function errorCallback(response) {
            console.log("Error in saving.");
        });
    }

    service.uploadImage = function(url, imageData, callBack){
        Upload.upload({
            url: PRODUCTDATA_URL + url,
            data: imageData
        }).then(function (resp) {
            callBack(resp);
        }, function (resp) {
            console.log('Error status: ' + resp);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    }


}]);
}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/inventory/productTreeService.js","/../../../app/components/inventory")
},{"+7ZJp0":56,"buffer":53}],24:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// var app = angular.module('FacebookProvider', []);
// app.factory('Facebook', ['$rootScope', '$http', '$state', 'AuthenticationService', function ($rootScope, $http, $state, AuthenticationService) {
//     return {
//         getLoginStatus:function () {
//             FB.getLoginStatus(function (response) {
//                 $rootScope.$broadcast("fb_statusChange", {'status':response.status});
//             }, true);
//         },
//         login:function () {
//             FB.getLoginStatus(function (response) {
//                 switch (response.status) {
//                     case 'connected':
//                         $rootScope.$broadcast('fb_connected', {facebook_id:response.authResponse.userID});
//                         break;
//                     case 'not_authorized':
//                     case 'unknown':
//                         FB.login(function (response) {
//                             if (response.authResponse) {
//                                 $http({
//                                     method: 'GET',
//                                     url: 'http://haastika.com:8080/HaastikaDataService/authenticate/login/facebook',
//                                     params: {'token': response.authResponse.accessToken}
//                                 }).then(function successCallback(response) {
//                                     debugger;
//                                     window.localStorage.accessToken = response.data.token;
//                                     $state.go('home');
//                                     // Pass param "X-Auth-Token" with token received from JAVA
//                                 }, function errorCallback(response) {
//                                     console.log("Error in saving.");
//                                 });
//                             } else {
//                                 $rootScope.$broadcast('fb_login_failed');
//                             }
//                         }, {scope:'read_stream, publish_stream, email'});
//                         break;
//                     default:
//                         FB.login(function (response) {
//                             if (response.authResponse) {
//                                 $rootScope.$broadcast('fb_connected', {facebook_id:response.authResponse.userID});
//                                 $rootScope.$broadcast('fb_get_login_status');
//                             } else {
//                                 $rootScope.$broadcast('fb_login_failed');
//                             }
//                         });
//                         break;
//                 }
//             }, true);
//         },
//         logout:function () {
//             FB.logout(function (response) {
//                 if (response) {
//                     $rootScope.$broadcast('fb_logout_succeded');
//                 } else {
//                     $rootScope.$broadcast('fb_logout_failed');
//                 }
//             });
//         },
//         unsubscribe:function () {
//             FB.api("/me/permissions", "DELETE", function (response) {
//                 $rootScope.$broadcast('fb_get_login_status');
//             });
//         }
//     };
// }]);

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/login/facebookAuth.js","/../../../app/components/login")
},{"+7ZJp0":56,"buffer":53}],25:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';
 
var LoginCtrl = function ($scope, $rootScope, $state, $timeout, $http, $location, $stateParams, LoginService, PRODUCTDATA_URL, AuthenticationService, Facebook, Google, user) {
        
        this.state = "login";
        this.header = "Login Haastika";
        var that = this,
        loginStatus = user;
        this.root = $rootScope;

        // Login Status Check
        if(loginStatus.success === true) {
            var emptyUser = {"name": "Guest","imageUrl": "","user": null};
            window.userDetails = window.userDetails || emptyUser;
            if(loginStatus.userType === "Admin") {
                $state.go('admin');
            } else {
                $state.go('home');    
            }
            
        } else {
            // Else pick local JSON
            window.userDetails = {"name": "Guest","imageUrl": "","user": null};
        }

        if ($stateParams.uid) {
            this.uid = $stateParams.uid;
            AuthenticationService.validateUid(this.uid, function(response) {

                $scope.dataLoading = false;
                if(response.success) {
                    this.state = "resetPwd";
                    this.header = "Reset Password";
                } else {
                    $scope.resetPwdError = response.message;
                }
            }.bind(this));
        }

        this.login = function () {
            var globals = $scope.$root.globals;
            $scope.dataLoading = true;
            $scope.state = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                if(response.success) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password, response.userType);
                    if(response.userType === "Admin") {
                        $location.path('/admin');
                        // Broadcast cart update to mini cart
                        $rootScope.$broadcast("updateFlash", {"alertType": "success", "delay": 10, "message": "Admin Login Successful !!"});
                    } else {
                        // Broadcast cart update to mini cart
                        $rootScope.$broadcast("updateFlash", {"alertType": "success", "delay": 10, "message": "Login Successful !!"});
                        $location.path('/');
                    }
                    // Broadcast cart update to mini cart
                    $rootScope.$broadcast("updateMiniCartCount");
                } else {
                    // Broadcast cart update to mini cart
                    $rootScope.$broadcast("updateFlash", {"alertType": "warning", "message": "Login Failed !! Please verify your username and password."});
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };

        $scope.info = {};

        $rootScope.$on("fb_statusChange", function (event, args) {
            $rootScope.fb_status = args.status;
            $rootScope.$apply();
        });
        $rootScope.$on("fb_get_login_status", function () {
            Facebook.getLoginStatus();
        });
        $rootScope.$on("fb_connected", function (event, args) {
            window.fbConnected = true;
        });

        $scope.fblogin = function () {
            $timeout(function () {
                Facebook.login('home', function() {
                	// Broadcast cart update to mini cart
                	$rootScope.$broadcast("updateFlash", {"alertType": "success", "delay": 10, "message": "Login Successful !!"});
                });
            }, 100, false);
        };

        $scope.logout = function () {
            Facebook.logout();
            $rootScope.session = {};
            // window.localStorage.setItem("accessToken", "");
            window.fbConnected = false;
            //make a call to a php page that will erase the session data
            // $http.post("php/logout.php");
        };

        this.changeState = function(state) {
            this.state = state;
            if (this.state === "login") {
                this.header = "Login Haastika";
            } else if (this.state === "signUp") {
                this.header = "Signup Haastika";
            } else {
                this.header = "Reset Login Haastika";
            }
        };

        this.signUp = function signUp(e) {
            $scope.dataLoading = true;

            $scope.user.emailId = $scope.user.userName;
            AuthenticationService.signUp($scope.user, function(response) {
                $scope.dataLoading = false;
                if(response.success) {
                    console.info("Login success.");
                    $location.path('/');
                    $rootScope.$broadcast("updateFlash", {"alertType": "success", "delay": 10, "message": "Login Successful !!"});
                } else {
                    $scope.signUpError = response.message;
                }
            });

        };

        this.requestPwd = function requestPwd() {
            $scope.dataLoading = true;

            AuthenticationService.requestResetPassword($scope.user.emailId, function(response) {
                $scope.dataLoading = false;
                if(response.success) {
                    $scope.resetPwdSuccess = response.message;
                } else {
                    $scope.resetPwdError = response.message;
                }
            });
        };

        this.resetPwd = function resetPwd() {
            $scope.dataLoading = true;

            AuthenticationService.resetPassword(this.uid, $scope.user, function(response) {
                $scope.dataLoading = false;
                if(response.success) {
                    $scope.resetPwdSuccess = response.message;
                    this.state = "login";
                    this.header = "Login Haastika";
                } else {
                    $scope.resetPwdError = response.message;
                }
            }.bind(this));
        };

        /* Google Authentication code goes here */
        $scope.googleHandleAuthClick = function() {
            Google.login('home', function() {
            	// Broadcast cart update to mini cart
           		$rootScope.$broadcast("updateFlash", {"alertType": "success", "delay": 10, "message": "Login Successful !!"});
            });
        };

        $scope.googleLogout = function() {
            Google.logout();
            $rootScope.session = {};
        };

        $rootScope.$on("google_statusChange", function (event, args) {
            debugger;
        });
    };

LoginCtrl.$inject = ['$scope', '$rootScope', '$state', '$timeout', '$http', '$location', '$stateParams', 'LoginService', 'PRODUCTDATA_URL', 'AuthenticationService', 'Facebook', 'Google', 'user'];
angular.module('eCommerce').controller('LoginCtrl', LoginCtrl); 
}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/login/loginController.js","/../../../app/components/login")
},{"+7ZJp0":56,"buffer":53}],26:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';
 
angular.module('eCommerce')
.factory('AuthenticationService', ['Base64', '$http', '$rootScope', '$timeout', 'PRODUCTDATA_URL','LoginService',
  function (Base64, $http, $rootScope, $timeout, PRODUCTDATA_URL,LoginService) {
    var service = {};

    service.Login = function (username, password, callback) {

        /* Use this for real authentication
         ----------------------------------------------*/
        var url = PRODUCTDATA_URL + '/authenticate/checklogin';
        var username = username, password = password;
        $http({
              method: 'POST',
              url: url,
              data: { emailId: username, password: password },
              headers: {
                'Content-Type': 'application/json'
              }
            })
           .then(function (response) {
                var response = (response.data === undefined || response.data === "") ? {} : response.data;
                if(response.token) {
                    response.success = true;
                    response.userType = response.userType;
                    window.localStorage.setItem("accessToken", response.token);
                    window.userDetails = response.loggedUser;
                    window.sessionStorage.setItem('cartLength', response.cartCount);
                    
                    var promise = LoginService.updateCartFromLocal();
                    promise.then(function() {
                        // Broadcast cart update to mini cart
                        $rootScope.$broadcast("updateMiniCartCount");
                    });
                }
                else {
                    response.message = 'Username or password is incorrect';
                }
                callback(response);
           });

    };

    service.SetCredentials = function (username, password, userType, imageurl) {
        if(!imageurl) {
          imageurl = '';
        }
        var authdata = Base64.encode(username + ':' + password);

        $rootScope.globals = {
            currentUser: {
                username: username,
                authdata: authdata,
                userType: userType,
                imageURL: imageurl
            }
        };

        window.localStorage.setItem('globals', JSON.stringify($rootScope.globals));
        $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
    };

    service.ClearCredentials = function () {
        $rootScope.globals = {};
        window.localStorage.removeItem('globals');
        $http.defaults.headers.common.Authorization = 'Basic ';
    };

    service.validateToken = function() {
        return $http.get(PRODUCTDATA_URL + '/authenticate/validate').then(function (response) {
            return response.data;
        });
    };

    service.signUp = function (userObj, callback) {
        var url = PRODUCTDATA_URL + '/account/register';
        $http({
              method: 'POST',
              url: url,
              data: userObj,
              headers: {
                'Content-Type': 'application/json'
              }
            })
           .then(function (response) {
                response = response.data;
                if(response.token) {
                    response.success = true;
                    response.userType = response.userType;
                    window.localStorage.setItem("accessToken", response.token);
                    window.userDetails = response.loggedUser;
                }
                callback(response);
           });
    };

    service.requestResetPassword = function (emailId, callback) {
        var url = PRODUCTDATA_URL + '/account/sendResetlink?emailId=' + emailId;
        $http({
              method: 'GET',
              url: url,
              headers: {
                'Content-Type': 'application/json'
              }
            })
           .then(function (response) {
                callback(response.data);
           });
    };

    service.resetPassword = function (uid, userObj, callback) {
        var url = PRODUCTDATA_URL + '/account/reset-password/' + uid;
        $http({
              method: 'POST',
              url: url,
              data: userObj,
              headers: {
                'Content-Type': 'application/json'
              }
            })
           .then(function (response) {
                callback(response.data);
           });
    };


    service.validateUid = function (uid, callback) {
        var url = PRODUCTDATA_URL + '/account/isValidResetlink/' + uid;
        $http({
              method: 'GET',
              url: url,
              headers: {
                'Content-Type': 'application/json'
              }
            })
           .then(function (response) {
                callback(response.data);
           });
    };

    return service;
  }]
)
.factory('Facebook', ['$rootScope', '$http', '$state', 'PRODUCTDATA_URL', 'LoginService',  
  function ($rootScope, $http, $state, PRODUCTDATA_URL, LoginService) {
    // return {
    var facebook = {};
    facebook.getLoginStatus = function () {
        FB.getLoginStatus(function (response) {
            $rootScope.$broadcast("fb_statusChange", {'status':response.status});
        }, true);
    };
    facebook.login = function (return_url, onSuccess) {
        FB.getLoginStatus(function (response) {
            switch (response.status) {
                case 'connected':
                    $rootScope.$broadcast('fb_connected', {facebook_id:response.authResponse.userID});
                    $http({
                        method: 'GET',
                        url: PRODUCTDATA_URL + '/authenticate/login/facebook',
                        params: {'token': response.authResponse.accessToken}
                    }).then(function successCallback(response) {
                        window.localStorage.setItem("accessToken", response.data.token);
                        // Hardcoded 
                        // response.data.loggedUser.emailId = "pdwibedi@gmail.com";
                        window.userDetails = response.data.loggedUser;
                        window.sessionStorage.setItem('cartLength', response.data.cartCount);
                        
                        var promise = LoginService.updateCartFromLocal();
                        promise.then(function() {
                            // Broadcast cart update to mini cart
                            $rootScope.$broadcast("updateMiniCartCount");
                        });
                        if(onSuccess) {
                            onSuccess();
                        }
                        $state.go(return_url);
                    }, function errorCallback(response) {
                        console.log("Error in saving.");
                    });
                    break;
                case 'not_authorized':
                case 'unknown':
                    FB.login(function (response) {
                        if (response.authResponse) {
                            $http({
                                method: 'GET',
                                url: PRODUCTDATA_URL + '/authenticate/login/facebook',
                                params: {'token': response.authResponse.accessToken}
                            }).then(function successCallback(response) {
                                // Stores the access token for 30 sec and then resets automatically
                                window.localStorage.setItem("accessToken", response.data.token);
                                // Hardcoded 
                                // response.data.loggedUser.emailId = "pdwibedi@gmail.com";
                                window.userDetails = response.data.loggedUser;
                                window.sessionStorage.setItem('cartLength', response.data.cartCount);
                                
                                var promise = LoginService.updateCartFromLocal();
                                promise.then(function() {
                                    // Broadcast cart update to mini cart
                                    $rootScope.$broadcast("updateMiniCartCount");
                                });
                                if(onSuccess) {
                                    onSuccess();
                                }
                                $state.go(return_url);
                            }, function errorCallback(response) {
                                console.log("Error in saving.");
                            });
                        } else {
                            $rootScope.$broadcast('fb_login_failed');
                        }
                    }, {scope:'read_stream, publish_stream, email'});
                    break;
                default:
                    FB.login(function (response) {
                        if (response.authResponse) {
                            $rootScope.$broadcast('fb_connected', {facebook_id:response.authResponse.userID});
                            $rootScope.$broadcast('fb_get_login_status');
                        } else {
                            $rootScope.$broadcast('fb_login_failed');
                        }
                    });
                    break;
            }
        }, true);
    };
    facebook.logout = function () {
        FB.logout(function (response) {
            if (response) {
                $rootScope.$broadcast('fb_logout_succeded');
            } else {
                $rootScope.$broadcast('fb_logout_failed');
            }
        });
    };
    facebook.unsubscribe = function () {
        FB.api("/me/permissions", "DELETE", function (response) {
            $rootScope.$broadcast('fb_get_login_status');
        });
    };
    return facebook;
  }]
) 
.factory('Google', ['$rootScope', '$http', '$state', 'PRODUCTDATA_URL', 'LoginService', 
    function ($rootScope, $http, $state, PRODUCTDATA_URL, LoginService) {
        return {
            return_url: "",
            onSuccess: null,
            apiKey: 'AIzaSyDtSivbvsJStXeutrpQrul99gZTCjgP9Os',
            discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
            clientId: '102964097568-l2jpsbqv509crlh401md5h4pmihkd8di.apps.googleusercontent.com',
            scopes: 'profile',
            updateSigninStatus: function (isSignedIn) {
                var self = this;
                var accessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
                if(!accessToken) {
                    self.login(self.return_url, self.onSuccess);
                }
                if(isSignedIn) {
                    $http({
                        method: 'GET',
                        url: PRODUCTDATA_URL + '/authenticate/login/google',
                        params: {'token': accessToken}
                    }).then(function successCallback(response) {
                        window.localStorage.setItem("accessToken", response.data.token);
                        // Hardcoded 
                        // response.data.loggedUser.emailId = "pdwibedi@gmail.com";
                        window.userDetails = response.data.loggedUser;
                        window.sessionStorage.setItem('cartLength', response.data.cartCount);
                        
                        var promise = LoginService.updateCartFromLocal();
                        promise.then(function() {
                            // Broadcast cart update to mini cart
                            $rootScope.$broadcast("updateMiniCartCount");
                        });
                        if(self && self.onSuccess) {
                            self.onSuccess();
                        }
                        
                        window.setTimeout(function() {
                            var return_url = (self !== undefined) ? ((self.return_url) ? self.return_url : 'home') : 'home';
                            $state.go(return_url);    
                        }, 100);
                        
                    }, function errorCallback(response) {
                        console.log("Error in saving.");
                    });
                }
            },
            login: function (return_url, onSuccess) {
                this.return_url = return_url;
                this.onSuccess = onSuccess;
                if(onSuccess) { this.onSuccess = onSuccess; }
                if(gapi.auth2 && gapi.auth2.getAuthInstance()) {
                    var isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
                    if(isSignedIn) {
                        this.updateSigninStatus(isSignedIn);
                    } else {
                        gapi.auth2.getAuthInstance().signIn();    
                    }
                } else {
                    this.init();
                }
                
            },
            logout: function () {
                gapi.auth2.getAuthInstance().signOut();
            },
            // Load the API and make an API call.  Display the results on the screen.
            makeApiCall: function () {
                gapi.client.people.people.get({
                  resourceName: 'people/me'
                }).then(function(resp) {
                  var p = document.createElement('p');
                  var name = resp.result.names[0].givenName;
                  p.appendChild(document.createTextNode('Hello, '+name+'!'));
                  document.getElementById('content').appendChild(p);
                });
            },
            initClient: function(scope) {
                var self = scope;
                function gapiInit() {
                    gapi.client.init({
                        apiKey: self.apiKey,
                        discoveryDocs: self.discoveryDocs,
                        clientId: self.clientId,
                        scope: self.scopes
                    }).then(function () {
                      // Listen for sign-in state changes.
                      gapi.auth2.getAuthInstance().isSignedIn.listen(self.updateSigninStatus);
                      // Handle the initial sign-in state.
                      self.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
                    });        
                };

                if(!gapi.client) {
                    gapi.load('client', function() { 
                      gapiInit();
                    });
                } else {
                    gapiInit();
                }
            },
            init: function() {
                var self = this;
                gapi.load('client:auth2', function() {
                    self.initClient(self); 
                });
            }
        };
    }]
)
.factory('Base64', function () {
    /* jshint ignore:start */
 
    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
 
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
 
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
 
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
 
                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
 
            return output;
        },
 
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));
 
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
 
                output = output + String.fromCharCode(chr1);
 
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
 
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
 
            } while (i < input.length);
 
            return output;
        }
    };
 
    /* jshint ignore:end */
})
.service('LoginService', ['$http', 'ENDPOINT_URI', 'PRODUCTDATA_URL', function ($http, ENDPOINT_URI, PRODUCTDATA_URL) {
    var service = this;
    //to create unique contact id
    var uid = 1;

    //simply returns the contacts list
    service.list = function () {
        return service.contacts;
    }

    service.GetAll = function(url) {
        return $http.get(url).then(service.extract, service.handleError('Error getting all users'));
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

    service.handleError = function(res) {
        return function () {
            return { success: false, message: res.message };
        };
    }

    service.updateCartFromLocal = function() {
        var cartItems = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [],
            responseData,
            cartCount = 0,
            objectToSerialize= [];
        $.each(cartItems, function(i, val) {
            var obj = {};   
            obj["productId"] = parseInt((val.partNumber || val.productId).substr(4));
            obj["quantity"] = val.quantity;    
            cartCount+= parseInt(val.quantity);
            objectToSerialize.push(obj);
        });
        window.sessionStorage.setItem('cartLength', cartCount + ((window.sessionStorage.cartLength) ? parseInt(window.sessionStorage.cartLength) : 0));

        return $http({
                method: 'POST',
                url: PRODUCTDATA_URL + '/cart/convertToCart',
                data: JSON.stringify(objectToSerialize)
            }).then(function successCallback(response) {
                // debugger;
                window.sessionStorage.removeItem('itemsArray');
                return response.data;
            }, function errorCallback(response) {
                console.log("Error in saving.");
        }); 
    }
}]);
}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/login/loginService.js","/../../../app/components/login")
},{"+7ZJp0":56,"buffer":53}],27:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
    .controller('orderCtrl', ['$scope', '$http', '$rootScope', 'PRODUCTDATA_URL', 'OrderService',  function($scope, $http, $rootScope, PRODUCTDATA_URL, OrderService) {
    	window.dataLoaded = true;

    	// Injecting Math into cart scope
        $scope.Math = window.Math;
        // Currency Update
        if(window.userDetails && window.userDetails.preferredCurrency) {
            $rootScope.$broadcast("updateCurrency", window.userDetails.preferredCurrency);
        }

    	$scope.orderLookupSearch = function(event) {
    		window.order = this;
    		var serializeArray = $(event.currentTarget).serializeArray();
    		
    		OrderService.getItems(serializeArray).then(function(data) {
	    		if(data.length !==0) {
	    			order.orderLookupData = data;
	    		} else {
	    			order.orderLookupData = "";
	    			// Broadcast cart update to mini cart
                    $rootScope.$broadcast("updateFlash", {"alertType": "warning", "message": "Data not found !!"});
	    		}
	    	}); 
		};

    }]
);
}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/orderlookup/orderlookupController.js","/../../../app/components/orderlookup")
},{"+7ZJp0":56,"buffer":53}],28:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
  .service('OrderService', ['$q', '$http', 'ENDPOINT_URI', 'PRODUCTDATA_URL', 'checkoutStorage', function ($q, $http, ENDPOINT_URI, PRODUCTDATA_URL, checkoutStorage) {
    var service = this;
    //to create unique contact id
    var uid = 1;

    service.getItems = function(obj) {
        var deferred = $q.defer();
        // Read Cart Array and pass to URL
        var objectToSerialize = {};
            objectToSerialize[obj[1].name] = obj[1].value;

        return $http({
                method: 'GET',
                url: PRODUCTDATA_URL + '/order/guest/' + obj[0].value,
                params: objectToSerialize
            }).then(function successCallback(response) {
                deferred.resolve(response.data)
                return deferred.promise;
            }, function errorCallback(response) {
                console.log("Error in saving.");
            }); 
    } 

  }]);

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/orderlookup/orderlookupService.js","/../../../app/components/orderlookup")
},{"+7ZJp0":56,"buffer":53}],29:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
	.controller('OrderDetailCtrl', ['$scope', 'OrderDetailService', '$rootScope', function($scope, OrderDetailService, $rootScope) {
		
		$scope.getOrderList = function(){
			OrderDetailService.getOrderList().then(function(data){
				$scope.orderList = data.orderList
			});
		}
		
		$scope.saveOrder = function(order){
			var orderObj = {};
			orderObj.webOrderNumber = order.webOrderNumber;
			orderObj.trackId = order.trackId;
			orderObj.trackLink = order.trackURL;
			orderObj.state = order.orderState;

			OrderDetailService.saveOrder(orderObj).then(function(data){
				if(data.operationStatus){
					$rootScope.$broadcast("updateFlash", {"alertType": "success", "message": "Data savedd successfully."});
				}
			});
		}
	}]);
}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/ordermanagement/orderManagementCtrl.js","/../../../app/components/ordermanagement")
},{"+7ZJp0":56,"buffer":53}],30:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
.service('OrderDetailService', ['$q', '$http', 'PRODUCTDATA_URL', function($q, $http, PRODUCTDATA_URL){
	var service = this;
	var deferred = $q.defer();

	service.getOrderList = function(){
		return $http({
                method: 'GET',
                url: PRODUCTDATA_URL + '/admin/orders/list'
            }).then(function successCallback(response) {
                deferred.resolve(response.data)
                return deferred.promise;
            }, function errorCallback(response) {
                console.log("Error in getting order list.");
            }); 
	}
	service.saveOrder = function(orderObj){
		return $http({
                method: 'POST',
                url: PRODUCTDATA_URL + '/admin/updateOrderStatus',
                data: JSON.stringify(orderObj),
	            headers: {
	                'Content-Type': 'application/json'
	            }
            }).then(function successCallback(response) {
            	deferred = $q.defer();
                deferred.resolve(response.data)
                return deferred.promise;
            }, function errorCallback(response) {
                console.log("Error in getting order list.");
            }); 
	}
}]);
}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/ordermanagement/orderManagementService.js","/../../../app/components/ordermanagement")
},{"+7ZJp0":56,"buffer":53}],31:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
  .controller('PromoMailCtrl', ['$scope', '$rootScope', '$location', '$timeout', 'UserService', '$http', 'PRODUCTDATA_URL', function ($scope, $rootScope, $location, $timeout, UserService, $http, PRODUCTDATA_URL) {
    var mail = this;
    var scoper = $scope;
    
    window.dataLoaded = false;

    $scope.getPromoEmail = function() {
        UserService.GetAll( PRODUCTDATA_URL + '/admin/promoMails')
        .then(function(data) {
          //subscriber.data = data;
          scoper.subject = data.subject;
          scoper.id = data.id;
          CKEDITOR.instances.haastikaeditor.setData(data.content);
        })
        .catch(function(error) {
            //
        })
        .finally(function() {
            //
        })
    }

    $scope.savePromoEmail = function(elem) {
        var data = {};
        data.content = CKEDITOR.instances.haastikaeditor.getData();
        $http({
              method: 'POST',
              url: PRODUCTDATA_URL + '/admin/savePromoMailContent',
              data: data,
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(function successCallback(data, status) {
                debugger;
            });

    };
    $scope.sendPromoEmail = function(elem) {
        var data = {};
        data.content = CKEDITOR.instances.haastikaeditor.getData();
        data.subject = scoper.subject;
        data.id = scoper.id;
        $http({
              method: 'POST',
              url: PRODUCTDATA_URL + '/admin/sendPromoMail',
              data: data,
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(function successCallback(data, status) {
                $rootScope.$broadcast("updateFlash", {"alertType": "success", "delay": 10, "message": data.data.errorMessage});
            });

    };
}]);

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/promomailgenerator/promoMailController.js","/../../../app/components/promomailgenerator")
},{"+7ZJp0":56,"buffer":53}],32:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
  .controller('RegisterCtrl', ['$scope', '$timeout', '$rootScope', '$location', 'UserService', '$http', 'BASE_URI', 'PRODUCTDATA_URL', function ($scope, $timeout, $rootScope, $location, UserService, $http, BASE_URI, PRODUCTDATA_URL) {
        var register = this;
        var scoper = $scope;
        
        $(".progress").hide();
        this.register = function() {
            
            /* Real Time Service STARTS */
            var url = PRODUCTDATA_URL+"/saveNewUserSubscription";
            var mailService = "http://haastika.com/app/app.sendMail.php";
            
            $http({
              method: 'POST',
              url: url,
              data: register.user,
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(function successCallback(data, status) {
                if(data.data.subscribedSuccessfully) {
                    register.pushNotification = data.data.subscriptionMessage;
                    register.subscribedFailed = false;
                    register.user.promoCode = data.data.promoCode;
                    register.subscribedSuccesfully = true;
                    register.user={id:null,firstName:'',lastName:'',emailId:'',contactNo:''};
                    $scope.form.$setPristine();
                    $timeout(function() {
                    	$location.path( "/" );
                    }, 3000);
                } else {
                    register.subscribedFailed = true;
                    register.subscribedSuccesfully = false;
                    register.pushNotification = data.data.errorMessage;
                }
              }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
              });
        };
    
    }])
;

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/register/registerController.js","/../../../app/components/register")
},{"+7ZJp0":56,"buffer":53}],33:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){

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
.controller('subCategoryEditCtrl', ['$scope', '$uibModalInstance', 'item', 'category', function ($scope, $uibModalInstance, item, category) {

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
}]);



}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/subCategory/subCategoryCtrl.js","/../../../app/components/subCategory")
},{"+7ZJp0":56,"buffer":53}],34:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
  .controller('SubscriberCtrl', ['$scope', '$rootScope', '$location', '$timeout', 'UserService', '$http', 'PRODUCTDATA_URL', function ($scope, $rootScope, $location, $timeout, UserService, $http, PRODUCTDATA_URL) {
    var subscriber = this;
    var scoper = $scope;
    
    window.dataLoaded = false;

    $scope.getSubscribers = function() {
        UserService.GetAll( PRODUCTDATA_URL + '/admin/subscribers')
            .then(function(data) {
              subscriber.data = data;
            })
            .catch(function(error) {
                //
            })
            .finally(function() {
                //
            })
    }

    $scope.approvePromo = function(elem) {
        var data = {};
        data.emailId = $(event.target).parents("tr").find(".email").html();
        data.promoCode = $(event.target).parents("tr").find(".promocode").html();
        data.promoUsed = !JSON.parse($(event.target).parents("tr").find(".promoUsed").val());
        $http({
              method: 'POST',
              url: PRODUCTDATA_URL + '/admin/updateSubscriber',
              data: data,
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(function successCallback(data, status) {
				$rootScope.$broadcast("updateFlash", {"alertType": "success", "delay": 10, "message": data.data.errorMessage});
            });

        var className = $(elem.target).hasClass("fa-toggle-off");
        if(className) {
            $(elem.target).removeClass("fa-toggle-off").addClass("fa-toggle-on");
            $(elem.target).parents("tr").addClass("flash");
        } else {
            $(elem.target).removeClass("fa-toggle-on").addClass("fa-toggle-off");
            $(elem.target).parents("tr").removeClass("flash");
        }
    };

}]
);

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/subscribers/subscriberController.js","/../../../app/components/subscribers")
},{"+7ZJp0":56,"buffer":53}],35:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
    .controller('thankyouCtrl', ['$scope', '$http', '$rootScope',  function($scope, $http, $rootScope) {
    	$scope.order = window.orderNumber;
    	
    	window.dataLoaded = true;
    	window.restrictView = true;
    }]
);
}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/components/thankyou/thankyouController.js","/../../../app/components/thankyou")
},{"+7ZJp0":56,"buffer":53}],36:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
    .directive('addToCart', ['$http', '$rootScope', 'PRODUCTDATA_URL', 'AuthenticationService', function($http, $rootScope, PRODUCTDATA_URL, AuthenticationService) {
        var def = {
            restrict: 'EA',
            scope: {
                'partNumber': '&',
                'itemClick': '&'
            },
            transclude: true,
            template: "<div class='add-to-cart'><button class='fa fa-cart-plus' data-part='item' ng-transclude></button></div>",
            link: function(scope, element, attrs) {
                function toggleInBasket(event, elem) {
                    var item = scope.partNumber();
                    var obj = {
                        "partNumber": item.productPartNumber || item.productId,
                        "quantity": item.quantity || 1
                    };
                    var count = (window.sessionStorage.cartLength) ? parseInt(window.sessionStorage.cartLength) : 0;

                    var addItem = function(item) {

                        // debugger;
                        var oldItems = JSON.parse(sessionStorage.getItem('itemsArray')) || [];
                        var repeatedItem = oldItems.filter(function(val, index) {
                            return (val.partNumber === item.partNumber);
                        });
                        window.sessionStorage.setItem('cartLength', ++count);
                        if(repeatedItem.length > 0) {
                            // repeatedItem[0]["quantity"] += 1
                            oldItems.map(function(val, index) {
                                (val.partNumber === repeatedItem[0]["partNumber"]) ? val.quantity += 1 : '';
                            });
                            window.sessionStorage.setItem('itemsArray', JSON.stringify(oldItems));
                            // Broadcast cart update to mini cart
                            $rootScope.$broadcast("updateMiniCartCount");
                            return true;
                        }
                        oldItems.push(item);

                        window.sessionStorage.setItem('itemsArray', JSON.stringify(oldItems));
                        window.itemsArray.push(item);

                        // Broadcast cart update to mini cart
                        $rootScope.$broadcast("updateMiniCartCount");
                        event.preventDefault();
                    };

                    addItem(obj);

                    // Add to Cart for Logged In user
                    $http({
                        method: 'POST',
                        url: PRODUCTDATA_URL+ '/cart/addToCart',
                        data: JSON.stringify({"productId": parseInt(obj.partNumber.substr(4))})
                    }).then(function successCallback(response) {
                        // console.log(response);
                        // Broadcast cart update to mini cart
                        $rootScope.$broadcast("updateFlash", {"alertType": "success", "message": "Item added to cart successfully !!"});
                    }, function errorCallback(response) {
                        console.log("Error in saving.");
                    });
                    

                    // window.localStorage.miniCart.items.push(obj);
                    event.preventDefault();
                    return false;
                };

                element.find("button").on("click", function(event) {
                    var currentTarget = event.currentTarget;
                    if(this === currentTarget) {
                        toggleInBasket(event, currentTarget);
                    }
                    event.preventDefault();
                });
            }
        };
        return def;
    }]);

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/directives/addToCart/addToCart-directive.js","/../../../app/directives/addToCart")
},{"+7ZJp0":56,"buffer":53}],37:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
  .directive('currencyChooser', ['$http', '$compile', 'PRODUCTDATA_URL', '$rootScope', function ($http, $compile, PRODUCTDATA_URL, $rootScope) {
    var linker = function(scope, element, attrs) {
        var elem = element;

        function updateCurrencyElem(event, elem, currencyId, currencyType) {
          if(elem[0].tagName !== "A") {
            elem = elem.find("a[rel='"+currencyType.toLowerCase()+"']");
          }
          elem.siblings().removeClass("active");
          elem.addClass("active");
          elem.parents(".menuRoot").hide();
          
          window.setTimeout(function() {
            $(".price.inr, .price.usd, .price.eur").hide();
            $(".price." + currencyType.toLowerCase()).show();
          }, 600);

          $("body").attr("data-currency", currencyType);          
          $("body").attr("data-crId", currencyId);
          
          $(document).trigger('data-currency-changed');
        };

        function returnCurrencyId(selectedCurrency) {
          var selectedCurrencyId = 1;
          if(selectedCurrency === "USD".toLowerCase()) { selectedCurrencyId = 2; }
          if(selectedCurrency === "EUR".toLowerCase()) { selectedCurrencyId = 3; }
          return selectedCurrencyId;
        };

        function returnCurrencyType(selectedCurrencyId) {
          var selectedCurrencyType = "INR";
          if(selectedCurrencyId === 2) { selectedCurrencyType = "USD"; }
          if(selectedCurrencyId === 3) { selectedCurrencyType = "EUR"; }
          return selectedCurrencyType;
        };

        element.find("a").on("click", function(event, elem) {
          var selectedCurrency = $(this).attr("rel");
          var elem = $(event.currentTarget);
          var currencyId = returnCurrencyId(selectedCurrency);
          updateCurrencyElem(event, elem, currencyId, selectedCurrency);
          $http({
              method: 'GET',
              url: PRODUCTDATA_URL + '/cart/setCurrency/'+ currencyId
          });
        });

        // Default Value set
        // $("body").attr("data-currency", selectedCurrency);          
        // $("body").attr("data-crId", selectedCurrencyId);

        // Listens to cart update
        scope.$on("updateCurrency", function (event, currencyId) {
          var selectedCurrency = returnCurrencyType(currencyId);
          updateCurrencyElem(event, elem, currencyId, selectedCurrency);
        });
    };

    return {
        restrict: "EA",
        link: linker,
        template: '<div class="currency-chooser">'+
                    '<span class="currencyTitle">Currency :</span>'+
                    '<a href="javascript:void(0);" title="American Dollar" data-id="1" rel="usd" class="usd">'+
                      '<span><i class="fa fa-usd" aria-hidden="true" class="usd"></i> USD</span>' +
                        '</a>' +
                    '<a href="javascript:void(0);" title="European Pounds" data-id="2" rel="eur" class="euro">'+
                        '<span><i class="fa fa-eur" aria-hidden="true" class="euro"></i> EUR</span>'+
                    '</a>'+
                    '<a href="javascript:void(0);" title="Indian Rupee" data-id="3" rel="inr" class="active india">'+
                        '<span><i class="fa fa-inr" aria-hidden="true"></i> INR</span>'+
                    '</a>'+
                  '</div>',
        controller: function() {
          $("body").attr("data-currency", "INR");          
          $("body").attr("data-crId", 1);
        }
    };
}]);

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/directives/currencyChooser/currencyChooser-directive.js","/../../../app/directives/currencyChooser")
},{"+7ZJp0":56,"buffer":53}],38:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
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
}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/directives/editOnFocus/editOnFocus-directive.js","/../../../app/directives/editOnFocus")
},{"+7ZJp0":56,"buffer":53}],39:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
  .directive('flasher', ['$compile', 'DIRECTIVE_URI', '$sce', function ($compile, DIRECTIVE_URI, $sce) {
    var linker = function(scope, element, attrs, $sce) {
        var elem = element,
            alert = {
                "success": {"className": "alert-success", "message": "<strong>Success!</strong>"},
                "info": {"className": "alert-info", "message": "<strong>Info!</strong>"},
                "warning": {"className": "alert-warning", "message": "<strong>Warning!</strong>"},
                "danger": {"className": "alert-danger", "message": "<strong>Danger!</strong>"}
            };

        // Listens to Flash update
        scope.$on("updateFlash", function (event, args) {
            var delay = args.delay || 1;
            var position = $("header .menu").position();
            element.css("top", position.top + 46);
            element.removeClass("animate");
            scope.className = alert[args.alertType].className;
            element.find(".alert").html(alert[args.alertType].message).append(" <span>"+ args.message +"</span>");
            setTimeout(function() { element.addClass("animate"); }, delay);
            setTimeout(function() { element.removeClass("animate"); }, 4800);
        });

    };

    return {
        restrict: "EA",
        link: linker,
        template: '<div class="alert {{className}}"></div>'
    };
}]);

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/directives/flasher/flasher-directive.js","/../../../app/directives/flasher")
},{"+7ZJp0":56,"buffer":53}],40:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
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
        template: '<div class="form-group row"><label class="col-sm-3 control-label no-padding-right" >  {{label}}</label><div class="col-sm-7"><div class="block input-icon input-icon-right" ng-transclude></div></div></div>'
      };
        
});

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/directives/formElement/formElement-directive.js","/../../../app/directives/formElement")
},{"+7ZJp0":56,"buffer":53}],41:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
angular.module('eCommerce')
  .directive('limitCharacterRender', ['$compile', function ($compile) {
  	var template = "{{modelBind}}";

  	var linker = function(scope, element, attrs) {
  		var str = scope.modelBind,
  		replaceStr = (str === null) ? "" : (str) ? str.substring(0, attrs.charLength - 3) + "..." : "";

  		if((str !== null) && str && (str.length > attrs.charLength)) {
  			scope.modelBind = replaceStr;
  		}

        element.html(template).show();
        $compile(element.contents())(scope);
    }

  	return {
        restrict: "A",
        link: linker,
        scope: {
            charLength:'=',
            modelBind:'='
        }
    };
  }])
 ;

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/directives/limitCharacterRender/limitCharacterRender-directive.js","/../../../app/directives/limitCharacterRender")
},{"+7ZJp0":56,"buffer":53}],42:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
    .directive('minicart', ['$http', 'PRODUCTDATA_URL', '$state', 'AuthenticationService', '$rootScope', '$location', function($http, PRODUCTDATA_URL, $state, AuthenticationService, $rootScope, $location) {
        var def = {
            restrict: 'A',
            scope:{
                partNumberMap: "@"
            },
            template: '<span class="count cartCount">10</span>'+
            '<i class="fa fa-shopping-cart" aria-hidden="true"></i>'+
            '<div class="cart-drawer arrow_box hide">'+
            '<div class="minicart">' +
            '<h2>Shopping Cart <a href="javascript:void(0);" class="fa fa-times closeOverlay"></a></h2>'+
            '<div class="miniKart"></div>' +
            '<p class="manyItems">Please go to cart page to check the list</p>' +
            '<p><a href="cart" title="View Cart">View Cart</a></p>' +
            // '<p><a href="checkout/login" title="Checkout">Checkout</a></p>' +
            '<p><a href="/orderLookup" title="Orders">Find Orders</a></p>' +
            // '<p><a href="javascript:void(0);" title="Accounts">Accounts</a></p>' +
            '<p><a href="javascript:void(0);" class="noDecoration profile"><span class="imageNull profilePicUpdate">'+
                '<img src="" class="profilePic" alt="ProfilePic" /><i class="fa fa-user" aria-hidden="true"></i></span>'+
                '<span class="logoutText">Logout</span> <span class="userDetailsUpdate userLogout"></span></a></p>' +
            '</div></div>',
            controller: function() {
                // (window.sessionStorage.cartLength) ? (window.sessionStorage.cartLength === "0") ? window.sessionStorage.length : 0 : '';
                if(window.loadMiniCartOnce === undefined) {
                    var responseData, html, self = this,
                        itemsArray = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [],
                        itemList = itemsArray.map(function(i, j) {
                            return (i.partNumber || i.productId);
                        }),
                        objectToSerialize = {'products':itemList},
                        computedURL =  PRODUCTDATA_URL + '/cart/viewCart';

                    $http({
                        method: 'POST',
                        url: computedURL,
                        data: JSON.stringify(objectToSerialize)
                    }).then(function successCallback(results) {
                        responseData = results.data.cartList || [];
                        $rootScope.navigation = results.data.pageNavigation.categories;
                        window.userDetails = (results.data.loggedUser !== null) ? results.data.loggedUser : {"name": "Guest","imageUrl": "","user": null};
                        
                        if(window.localStorage.accessToken !== "" && results.data.loggedUser === null) {
                            window.localStorage.setItem("accessToken", "");
                            window.sessionStorage.setItem("checkoutState", '{"login": false, "address": false, "order": false, "payment": false }');
                            window.sessionStorage.removeItem('itemsArray');
                            window.sessionStorage.removeItem('cartLength');
                        }
                        var cartCount = 0;
                        for(var i=0; i < responseData.length; i++) {
                            cartCount+= parseInt(responseData[i].quantity || itemsArray[i].quantity);
                        }
                        $(".miniKart").parents(".cart").find(".count").html(cartCount);
                    	// window.sessionStorage.setItem('cartLength', cartCount + ((window.sessionStorage.cartLength) ? parseInt(window.sessionStorage.cartLength) : 0));
                        window.sessionStorage.setItem('cartLength', cartCount);
                    }); 
                        
                    window.loadMiniCartOnce = true;
                }
            },
            link: function(scope, element, attrs) {
                function getMiniCart(elem) {
                    var responseData,
                        // Read Cart Array and pass to URL
                        itemsArray = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [],
                        itemList = itemsArray.map(function(i, j) {
                            return (i.partNumber || i.productId);
                        }),
                        objectToSerialize = {'products':itemList};

                    
                    var computedURL =  PRODUCTDATA_URL + '/cart/viewCart',
                        cartCount;
                    $http({
                        method: 'POST',
                        url: computedURL,
                        data: JSON.stringify(objectToSerialize),
                    }).then(function successCallback(results) {
                        responseData = results.data.cartList || [];
                        
                        cartCount = ListItemCounter(responseData);
                        renderHTML(responseData);
                        (responseData.length > 4) ? element.find(".manyItems").show() : element.find(".manyItems").hide();
                        // $(".miniKart").parents(".cart").find(".count").html(cartCount);
                        $(".miniKart").removeClass("loader");
                    }, function errorCallback(response) {
                        console.log("Error in saving.");
                    }); 
                };

                function ListItemCounter(itemList) {
                    var itemArray = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [],
                        count = 0;
                    for(var i=0; i < itemList.length; i++) {
                        count+= itemList[i].quantity || itemArray[i].quantity;
                    }
                    return count;
                };
                
                function renderHTML(responseData) {
                    var itemList = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [];
                    var ul = document.createElement("ul"), img;
                    for (var i = 0; i < responseData.length; i++) {
                        if(i === 4) {
                            break;
                        }
                        var currency = $("body").attr("data-currency");
                        var priceObj = responseData[i].productPriceOptions.filter(function(key, val) {
                            return key.currencyCode === currency.toUpperCase();
                        });
                        img = (responseData[i].productImage) ? responseData[i].productImage.thumbImagePath : '';
                        var currency = $("body").attr("data-currency").toUpperCase();
                        var li = document.createElement("li");
                            li.innerHTML = "<div class='wrapper'><figure><img src='" + img +
                            "' alt='cart-image"+i+"' /></figure><div class='details'><h3>" +
                            (responseData[i].partNumber || responseData[i].productId) +
                            "</h3><span class='price'>"+ currency + " " + (responseData[i].price || priceObj[0].price) + "</span> <span class='quantity'> x "+(responseData[i].quantity || itemList[i].quantity)+"</span></div></div>";
                        ul.appendChild(li);
                        element.find(".miniKart").removeClass("empty-cart");
                    }
                    if(responseData.length === 0) {
                        var li = document.createElement("li");
                            li.innerHTML = "Your cart is empty.";
                        ul.appendChild(li);  
                        element.find(".miniKart").addClass("empty-cart"); 
                    }
                    element.find(".miniKart").html("").append(ul);
                };
                
                // Listens to cart update
                scope.$on("updateMiniCart", function (event, args) {
                    renderHTML(args);
                });

                scope.$on("updateMiniCartCount", function (event, args) {
                    // getMiniCart();
                    var count, storageItemsCount = 0;
                    if(args) {
                        count = args;
                        window.sessionStorage.cartLength = args;
                    } else {
                        count = (window.sessionStorage.cartLength) ? parseInt(window.sessionStorage.cartLength) : 0;
                        // storageItemsCount = quantityCounter();
                        // if(storageItemsCount > 0 ) {
                        //     count = count + storageItemsCount;
                        // }
                    }
                    // console.log(count);
                    $(".miniKart").parents(".cart").find(".count").html(count);

                    // Broadcast currency update
                    if(window.userDetails && window.userDetails.preferredCurrency) {
                        $rootScope.$broadcast("updateCurrency", window.userDetails.preferredCurrency);
                    }
                });

                // function quantityCounter() {
                //     var itemArray = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [],
                //         count = 0;
                //     for(var i=0; i < itemArray.length; i++) {
                //         count+= parseInt(itemArray[i].quantity);
                //     }
                //     return count;
                // };
                
                element.on("click", function(event) {
                    var currentTarget = event.currentTarget;
                    if(this === currentTarget) {
                        var drawer = $(this).find(".cart-drawer");
                        if(drawer.hasClass("hide")) {
                            $(this).find(".miniKart").addClass("loader");
                            getMiniCart(currentTarget);
                            drawer.removeClass("hide");
                            if($('body').hasClass('mobile')) {
                                drawer.css('left', 0);
                            }
                        } else {
                            if(!$('body').hasClass('mobile')) {
                                drawer.addClass("hide");    
                            }
                        }    
                    }
                });

                $(".minicart .profile").on("click", function(event) {
                    window.localStorage.setItem("accessToken", "");
                    window.sessionStorage.setItem("checkoutState", '{"login": false, "address": false, "order": false, "payment": false }');
                    window.userDetails = {"name": "Guest","imageUrl": "","user": null};
                    $state.go('login');
                    window.sessionStorage.removeItem('itemsArray');
                    window.sessionStorage.removeItem('cartLength');
                    window.localStorage.removeItem('globals');
                    // Broadcast cart update to mini cart
                    $rootScope.$broadcast("updateMiniCartCount");
                    event.preventDefault();
                });

                $(".minicart .closeOverlay").on("click", function(event) {
                    $(".cart-drawer").addClass('hide').css("left", "-1000px");
                    event.preventDefault();
                    event.stopPropagation();
                });

                $("body").on("click", function(ev) {
                    if($(ev.target).parents(".mini-cart-trigger").length === 0 && !$('body').hasClass('mobile')) {
                        $(".cart-drawer").addClass("hide");
                    } else {
                        return;
                    }
                });
            }
        };
        return def;
    }]);

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/directives/miniCart/miniCart-directive.js","/../../../app/directives/miniCart")
},{"+7ZJp0":56,"buffer":53}],43:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
  .directive('stickyMenu', ['$compile', 'DIRECTIVE_URI', function ($compile, DIRECTIVE_URI) {
    var linker = function(scope, element, attrs) {
      var menu = element,
        stickyClass = "nav-sticky",
        hdr = $(element).position().top;

      /* Window Scroll event */
      $(window).scroll(function() {
            var stickyCart = menu.find(".mini-cart-trigger .cart-drawer");
            var headerCart = $("body .mini-cart-trigger .cart-drawer");
            if( $(this).scrollTop() > hdr ) {
                menu.addClass(stickyClass);
                $("body").addClass('menu-stuck');
                if(!$('body').hasClass('mobile')) {
                    headerCart.addClass("hide");
                }
                if(!stickyCart.hasClass("hide")) {
                    stickyCart.addClass("hide");
                }
            } else {
                menu.removeClass(stickyClass);
                $("body").removeClass('menu-stuck');
            }
      });
    };

    return {
        restrict: "EA",
        link: linker,
        transclude: true,
        template: '<div class="stickyMenu"><div class="controls" ng-transclude></div></div>'
    };
}]);

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/directives/sticky/stickyMenu-directive.js","/../../../app/directives/sticky")
},{"+7ZJp0":56,"buffer":53}],44:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
    .directive('ngValidate', function () {
        return {
            require: 'form',
            restrict: 'A',
            scope: {
                ngValidate: '='
            },
            link: function (scope, element, attrs, form) {
                var validator = element.validate(scope.ngValidate);

                form.validate = function (options) {
                    var oldSettings = validator.settings;

                    validator.settings = $.extend(true, {}, validator.settings, options);

                    var valid = validator.form();

                    validator.settings = oldSettings; // Reset to old settings

                    return valid;
                };

                form.numberOfInvalids = function () {
                    return validator.numberOfInvalids();
                };
            }
        };
    })

    .provider('$validator', function () {
        $.validator.setDefaults({
            onsubmit: false // to prevent validating twice
        });

        return {
            setDefaults: $.validator.setDefaults,
            addMethod: $.validator.addMethod,
            setDefaultMessages: function (messages) {
                angular.extend($.validator.messages, messages);
            },
            format: $.validator.format,
            $get: function () {
                return {};
            }
        };
    });


}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/directives/validation/validation-directive.js","/../../../app/directives/validation")
},{"+7ZJp0":56,"buffer":53}],45:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

angular.module('eCommerce')
  .controller('tileCtrl', ['$scope', '$rootScope', 'UserService', 'BASE_URI', function ($scope, $rootScope, UserService, BASE_URI) {
    var tile = this;

    $rootScope.$on('event:data-change', function() {
      var object = UserService.get();
      if(object.data.pageLayoutDetails) {
        tile.layout = object.data.pageLayoutDetails.layouts;
        tile.renderTemplate();
      }
      
    });

    tile.renderTemplate = function() {
      $.each(tile.layout, function(k, v) {
          if(v.layoutCapacity === 0) {
            return true;
          }
          var layout = "layout"+ v.layoutCapacity;
          $scope[layout] = 'app/shared/tiles/'+layout+'.html';
      });
    };

  }])
;

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../app/shared/tiles/tileController.js","/../../../app/shared/tiles")
},{"+7ZJp0":56,"buffer":53}],46:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
require("../multizoom.js");
require("../parallax.js");
require("../wowslider.js");
require("../overlay.js");
require("../scripts.js");
require("../jqzoom.js");



require("../../../vendor/js/angular-ui-router.min.js");
require("../../../vendor/js/ng-file-upload.js");

require("../../../app/app.routes.js");
require("../../../app/app.services.js");
require("../../../app/directives/limitCharacterRender/limitCharacterRender-directive.js");


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
require("../../../app/components/login/loginService.js");
require("../../../app/components/login/facebookAuth.js");

require("../../../app/components/checkout/checkoutController.js");
require("../../../app/components/checkout/checkoutService.js");

require("../../../app/components/cart/cartController.js");
require("../../../app/components/cart/cartService.js");

require("../../../app/components/404/404Controller.js");

require("../../../app/components/register/registerController.js");

require("../../../app/components/thankyou/thankyouController.js");
require("../../../app/components/orderlookup/orderlookupService.js");
require("../../../app/components/orderlookup/orderlookupController.js");

require("../../../app/components/accounts/accountsController.js");
require("../../../app/components/accounts/accountsService.js");

require("../../../app/components/subscribers/subscriberController.js");
require("../../../app/components/promomailgenerator/promoMailController.js");

require("../../../app/components/admin/adminController.js");
require("../../../app/components/inventory/inventoryCtrl.js");
require("../../../app/components/category/categoryCtrl.js");
require("../../../app/components/subCategory/subCategoryCtrl.js");
require("../../../app/shared/tiles/tileController.js");


require("../../../app/directives/sticky/stickyMenu-directive.js");
require("../../../app/directives/editOnFocus/editOnFocus-directive.js");
require("../../../app/directives/formElement/formElement-directive.js");
require("../../../app/directives/addToCart/addToCart-directive.js");
require("../../../app/directives/miniCart/miniCart-directive.js");
require("../../../app/directives/validation/validation-directive.js");
require("../../../app/directives/flasher/flasher-directive.js");
require("../../../app/directives/currencyChooser/currencyChooser-directive.js");

require("../../../app/components/inventory/productTreeCtrl.js");
require("../../../app/components/inventory/productTreeService.js");

require("../../../app/components/ordermanagement/orderManagementCtrl.js");
require("../../../app/components/ordermanagement/orderManagementService.js");

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_28896e77.js","/")
},{"+7ZJp0":56,"../../../app/app.routes.js":1,"../../../app/app.services.js":2,"../../../app/components/404/404Controller.js":3,"../../../app/components/aboutus/aboutService.js":4,"../../../app/components/aboutus/aboutusController.js":5,"../../../app/components/accounts/accountsController.js":6,"../../../app/components/accounts/accountsService.js":7,"../../../app/components/admin/adminController.js":8,"../../../app/components/cart/cartController.js":9,"../../../app/components/cart/cartService.js":10,"../../../app/components/category/categoryController.js":11,"../../../app/components/category/categoryCtrl.js":12,"../../../app/components/category/categoryService.js":13,"../../../app/components/checkout/checkoutController.js":14,"../../../app/components/checkout/checkoutService.js":15,"../../../app/components/contact/contactController.js":16,"../../../app/components/details/detailController.js":17,"../../../app/components/details/detailService.js":18,"../../../app/components/home/homeController.js":19,"../../../app/components/home/homeService.js":20,"../../../app/components/inventory/inventoryCtrl.js":21,"../../../app/components/inventory/productTreeCtrl.js":22,"../../../app/components/inventory/productTreeService.js":23,"../../../app/components/login/facebookAuth.js":24,"../../../app/components/login/loginController.js":25,"../../../app/components/login/loginService.js":26,"../../../app/components/orderlookup/orderlookupController.js":27,"../../../app/components/orderlookup/orderlookupService.js":28,"../../../app/components/ordermanagement/orderManagementCtrl.js":29,"../../../app/components/ordermanagement/orderManagementService.js":30,"../../../app/components/promomailgenerator/promoMailController.js":31,"../../../app/components/register/registerController.js":32,"../../../app/components/subCategory/subCategoryCtrl.js":33,"../../../app/components/subscribers/subscriberController.js":34,"../../../app/components/thankyou/thankyouController.js":35,"../../../app/directives/addToCart/addToCart-directive.js":36,"../../../app/directives/currencyChooser/currencyChooser-directive.js":37,"../../../app/directives/editOnFocus/editOnFocus-directive.js":38,"../../../app/directives/flasher/flasher-directive.js":39,"../../../app/directives/formElement/formElement-directive.js":40,"../../../app/directives/limitCharacterRender/limitCharacterRender-directive.js":41,"../../../app/directives/miniCart/miniCart-directive.js":42,"../../../app/directives/sticky/stickyMenu-directive.js":43,"../../../app/directives/validation/validation-directive.js":44,"../../../app/shared/tiles/tileController.js":45,"../../../vendor/js/angular-ui-router.min.js":57,"../../../vendor/js/ng-file-upload.js":58,"../jqzoom.js":47,"../multizoom.js":48,"../overlay.js":49,"../parallax.js":50,"../scripts.js":51,"../wowslider.js":52,"buffer":53}],47:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
;(function($){
	$.fn.zoom = function(options){
		// 默认配置
		var _option = {
			align: "left",				// 当前展示图片的位置，则放大的图片在其相对的位置
			thumb_image_width: 420,		// 当前展示图片的宽
			thumb_image_height: 520,	// 当前展示图片的高
			source_image_width: 900,  	// 放大图片的宽
			source_image_height: 1200,	// 放大图片的高
			zoom_area_width: 600, 		// 放大图片的展示区域的宽
			zoom_area_height: "justify",// 放大图片的展示区域的高
			zoom_area_distance: 10,     // 
			zoom_easing: true,          // 是否淡入淡出
			click_to_zoom: false,
			zoom_element: "auto",
			show_descriptions: true,
			description_location: "bottom",
			description_opacity: 0.7,
			small_thumbs: 3,			// 小图片展示的数量
			smallthumb_inactive_opacity: 0.4, 	// 小图片处于非激活状态时的遮罩透明度
			smallthumb_hide_single: true,    	// 
			smallthumb_select_on_hover: false,
			smallthumbs_position: "bottom",		// 小图片的位置
			show_icon: true,
			hide_cursor: false,			// 鼠标放到图片时，是否隐藏指针
			speed: 600,     			// 
			autoplay: true,				// 是否自动播放
			autoplay_interval: 6000, 	// 自动播放时每张图片的停留时间
			keyboard: true,
			right_to_left: false,
		}

		if(options){
			$.extend(_option, options);
		}

		var $ul = $(this);
		if($ul.is("ul") && $ul.children("li").length && $ul.find(".bzoom_big_image").length){

			$ul.addClass('bzoom clearfix').show();
			var $li = $ul.children("li").addClass("bzoom_thumb"),
				li_len = $li.length,
				autoplay = _option.autoplay;
			$li.first().addClass("bzoom_thumb_active").show();
			if(li_len<2){
				autoplay = false;
			}

			$ul.find(".bzoom_thumb_image").css({width:_option.thumb_image_width, height:_option.thumb_image_height}).show();

			var scalex = _option.thumb_image_width / _option.source_image_width,
				scaley = _option.thumb_image_height / _option.source_image_height,
				scxy = _option.thumb_image_width / _option.thumb_image_height;

			var $bzoom_magnifier, $bzoom_magnifier_img, $bzoom_zoom_area, $bzoom_zoom_img;

			// 遮罩显示的区域
			if(!$(".bzoom_magnifier").length){
				$bzoom_magnifier = $('<li class="bzoom_magnifier"><div class=""><img src="" /></div></li>');
                $bzoom_magnifier_img = $bzoom_magnifier.find('img');

                $ul.append($bzoom_magnifier);

                $bzoom_magnifier.css({top:top, left:left});
                $bzoom_magnifier_img.attr('src', $ul.find('.bzoom_thumb_active .bzoom_thumb_image').attr('src')).css({width: _option.thumb_image_width, height: _option.thumb_image_height});
                $bzoom_magnifier.find('div').css({width:_option.thumb_image_width*scalex, height:_option.thumb_image_height*scaley});
			}
			
			// 大图
			if(!$('.bzoom_zoom_area').length){
                $bzoom_zoom_area = $('<li class="bzoom_zoom_area"><div><img class="bzoom_zoom_img" /></div></li>');
                $bzoom_zoom_img = $bzoom_zoom_area.find('.bzoom_zoom_img');
                var top = 0,
                    left = 0;

                $ul.append($bzoom_zoom_area);

                if(_option.align=="left"){
                	top = 0;
                	left = 0 + _option.thumb_image_width + _option.zoom_area_distance;
                }

                $bzoom_zoom_area.css({top:top, left:left});
                $bzoom_zoom_img.css({width: _option.source_image_width, height: _option.source_image_height});
			}

			var autoPlay = {
				autotime : null,
				isplay : autoplay,

				start : function(){
					if(this.isplay && !this.autotime){
						this.autotime = setInterval(function(){
							var index = $ul.find('.bzoom_thumb_active').index();
							changeLi((index+1)%_option.small_thumbs);
						}, _option.autoplay_interval);
					}
				},

				stop : function(){
					clearInterval(this.autotime);
					this.autotime = null;
				},

				restart : function(){
					this.stop();
					this.start();
				}
			}

			// 循环小图
			var $small = '';
			if(!$(".bzoom_small_thumbs").length){
				var top = _option.thumb_image_height+10,
					width = _option.thumb_image_width,
					smwidth = (_option.thumb_image_width / _option.small_thumbs) - 10,
					smheight = smwidth / scxy,
					ulwidth = 
					smurl = '',
					html = '',
					listLength = $ul.find("li.zoomable").length;

				for(var i=0; i<listLength; i++){
					smurl = $li.eq(i).find('.bzoom_thumb_image').attr("src");

					if(i==0){
						html += '<li class="bzoom_smallthumb_active"><img src="'+smurl+'" alt="small" style="width:'+smwidth+'px; height:'+smheight+'px;" /></li>';
					}else{
						html += '<li style="opacity:0.4;"><img src="'+smurl+'" alt="small" style="width:'+smwidth+'px; height:'+smheight+'px;" /></li>';
					}
				}

				$small = $('<li class="bzoom_small_thumbs" style="top:'+top+'px; width:'+width+'px;"><ul class="clearfix" style="width: 485px;">'+html+'</ul></li>');
				$ul.append($small);

				$small.delegate("li", "click", function(event){
					changeLi($(this).index());
					autoPlay.restart();
				});

				autoPlay.start();
			}

			function changeLi(index){
				$ul.find('.bzoom_thumb_active').removeClass('bzoom_thumb_active').stop().animate({opacity: 0}, _option.speed, function() {
                    $(this).hide();
                });
                $small.find('.bzoom_smallthumb_active').removeClass('bzoom_smallthumb_active').stop().animate({opacity: _option.smallthumb_inactive_opacity}, _option.speed);

                $li.eq(index).addClass('bzoom_thumb_active').show().stop().css({opacity: 0}).animate({opacity: 1}, _option.speed);
                $small.find('li:eq('+index+')').addClass('bzoom_smallthumb_active').show().stop().css({opacity: _option.smallthumb_inactive_opacity}).animate({opacity: 1}, _option.speed);

                $bzoom_magnifier_img.attr("src", $li.eq(index).find('.bzoom_thumb_image').attr("src"));
			}

			
			

			_option.zoom_area_height = _option.zoom_area_width / scxy;
			$bzoom_zoom_area.find('div').css({width:_option.zoom_area_width, height:_option.zoom_area_height});

			$li.add($bzoom_magnifier).mousemove(function(event){
				var xpos = event.pageX - $ul.offset().left,
					ypos = event.pageY - $ul.offset().top,
					magwidth = _option.thumb_image_width*scalex,
					magheight = _option.thumb_image_height*scalex,
					magx = 0,
					magy = 0,
					bigposx = 0,
					bigposy = 0;

				if(xpos < _option.thumb_image_width/2){
					magx = xpos > magwidth/2 ? xpos-magwidth/2 : 0;
				}else{
					magx = xpos+magwidth/2 > _option.thumb_image_width ? _option.thumb_image_width-magwidth : xpos-magwidth/2;
				}
				if(ypos < _option.thumb_image_height/2){
					magy = ypos > magheight/2 ? ypos-magheight/2 : 0;
				}else{
					magy = ypos+magheight/2 > _option.thumb_image_height ? _option.thumb_image_height-magheight : ypos-magheight/2;
				}

				bigposx = magx / scalex;
				bigposy = magy / scaley;
				
				$bzoom_magnifier.css({'left':magx, 'top':magy});
				$bzoom_magnifier_img.css({'left':-magx, 'top': -magy});

				$bzoom_zoom_img.css({'left': -bigposx, 'top': -bigposy});
			}).mouseenter(function(event){
				autoPlay.stop();

				$bzoom_zoom_img.attr("src", $(this).find('.bzoom_big_image').attr('src'));
				$bzoom_zoom_area.css({"background-image":"none"}).stop().fadeIn(400);

				$ul.find('.bzoom_thumb_active').stop().animate({'opacity':0.5}, _option.speed*0.7);
				$bzoom_magnifier.stop().animate({'opacity':1}, _option.speed*0.7).show();
			}).mouseleave(function(event){
				$bzoom_zoom_area.stop().fadeOut(400);
				$ul.find('.bzoom_thumb_active').stop().animate({'opacity':1}, _option.speed*0.7);
				$bzoom_magnifier.stop().animate({'opacity':0}, _option.speed*0.7, function(){
					$(this).hide();
				});

				autoPlay.start();
			})
		}
	}
})(jQuery);
}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../jqzoom.js","/..")
},{"+7ZJp0":56,"buffer":53}],48:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){

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

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../multizoom.js","/..")
},{"+7ZJp0":56,"buffer":53}],49:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
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
}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../overlay.js","/..")
},{"+7ZJp0":56,"buffer":53}],50:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
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
}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../parallax.js","/..")
},{"+7ZJp0":56,"buffer":53}],51:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
    // object.watch
if (!Object.prototype.watch) {
    Object.defineProperty(Object.prototype, "watch", {
        enumerable: false,
        configurable: true,
        writable: false,
        value: function(prop, handler) {
            var oldval = this[prop],
                newval = oldval,
                getter = function() {
                    return newval;
                },
                setter = function(val) {
                    oldval = newval;
                    return (newval = handler.call(this, prop, oldval, val));
                };

            if (delete this[prop]) { // can't watch constants
                Object.defineProperty(this, prop, {
                    get: getter,
                    set: setter,
                    enumerable: true,
                    configurable: true
                });
            }
        }
    });
};

window.dataLoaded = false;
window.itemsArray = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [] || [];

//Watcher for dataLoader
window.watch('dataLoaded', function(id, oldval, newval) {
    if(oldval === newval) {
        return;
    }
    if (newval === true) {
        $(".progress").hide();
        // updateMiniKartCount();
        updateUser();
    } else {
        $(".progress").show();
    }
    return newval;
});

function updateUser() {
    var emptyUser = {
        "name": "Guest",
        "imageUrl": "",
        "user": null 
    },
    userDetails = (window.userDetails) ? window.userDetails : emptyUser;
    if(userDetails.imageUrl !== "") {
        $(".profilePicUpdate").addClass("loggedIn");
    } else {
        $(".profilePicUpdate").removeClass("loggedIn");
    }
    $(".profilePicUpdate").find(".profilePic").attr("src", userDetails.imageUrl);
    $(".userDetailsUpdate").text((userDetails.name === "Guest") ? "Login" : userDetails.name);
    $(".social-strip ul > li > a.profile").attr("href", (userDetails.name === "Guest") ? "/login" : "/accounts");
};

$(document).ready(function(e) {

    // Adds Safari class to body
    if(/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        $("body").addClass("isSafari");
    }

    setTimeout(function() {

        //Login popup
        $(".toggleLoginPopup").click(function() {
            var chk = $(this).next().css("display");
            if (chk == "none") {
                $(this).next(".login").show();
                $(this).next().stop(true, true).slideDown();
            } else {
                $(this).next(".login").hide();
                $(this).next().stop(true, true).slideUp();
            }
        });

        if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            $("body").addClass("mobile");
        } else {
            $("body").removeClass("mobile");
        }

        $(document).on({
            mouseenter: function() {
                //stuff to do on mouse enter
                $(this).find("a").eq(1).addClass("active");
                $(this).children('.sub-menu').stop(true, true).fadeIn(300);
            },
            mouseleave: function() {
                //stuff to do on mouse leave
                $(this).find("a").eq(1).removeClass("active");
                $(this).children('.sub-menu').stop(true, true).fadeOut(400);
            }
        }, "body:not(.mobile) nav ul > li");

        $(document).on("click", ".mobile nav ul > li > a", function(e) {
            e.preventDefault();
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                $(this).siblings('.sub-menu').css("display", "none");
                $(this).find(".fa-minus").hide();
                $(this).find(".fa-plus").show();
            } else {
                $(this).addClass("active");
                $(this).siblings('.sub-menu').css("display", "block");
                $(this).find(".fa-minus").show();
                $(this).find(".fa-plus").hide();
            }
            $(this).siblings().each(function() {
                $(this).removeClass("active");
            });
        });

        $(document).on("click", ".mobile nav ul li li a", function(e) {
            e.preventDefault();
            $(this).parent().siblings().find("> a").each(function() {
                $(this).parent().removeClass("active");
            });
            $(this).next('.sub-menu').css("display", "none");
            $('a.mobileNavBtn').toggleClass("fa-bars fa-close");
            $(this).parents(".menuRoot").hide();
        });

        $(document).on("click", ".mobile nav ul li > a:not('.activator')", function(e) {
            e.preventDefault();
            $('a.mobileNavBtn').toggleClass("fa-bars fa-close");
            $('.activator').next('.sub-menu').css("display", "none");
            $(this).parents(".menuRoot").hide();
        });

        $(document).on("click", ".mobile .desktop-nav a.mobileNavBtn", function(e) {
            e.preventDefault();
            $(this).toggleClass("fa-bars fa-close");
            if ($(this).siblings(".menuRoot").css("display") == undefined || $(this).siblings(".menuRoot").css("display") == "none") {
                $(this).siblings(".menuRoot").show();
            } else {
                $(this).siblings(".menuRoot").hide();
            }
        });

        $(document).on("click", ".mobile .desktop-nav a.closeOverlay", function(e) {
            e.preventDefault();
            $('a.mobileNavBtn').toggleClass("fa-bars fa-close");
            $(this).parents(".menuRoot").hide();
        });

        $('footer .back-top a').click(function(e) {
            e.preventDefault();
            $("html, body").animate({
                scrollTop: 0
            }, 600);
            return false;
        });

        $(".tapToClose").click(function() {
            sessionStorage.isTriggered = "true";
            window.modalComponent.close();
        });
        
        $(".modalComponent .overlay-close").click(function() {
            $(".modalComponent").css("top", "-400px");
            setTimeout(function(){
                $(".screen").hide();
            }, 400);
        });
        
        $(".screen").click(function() {
            $(".modalComponent").css("top", "-400px");
            setTimeout(function(){
                $(".screen").hide();
            }, 400);
        });
        
        $(window).on("scroll", function() {
            if(parseInt($(".modalComponent").css("top")) > 0) {
                $(".modalComponent").css("top", $(document).scrollTop() + ($(window).height() - $(".modalComponent").outerHeight()) / 2);
            }
        })


    }, 1500);

});

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../scripts.js","/..")
},{"+7ZJp0":56,"buffer":53}],52:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
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

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../wowslider.js","/..")
},{"+7ZJp0":56,"buffer":53}],53:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192

/**
 * If `Buffer._useTypedArrays`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (compatible down to IE6)
 */
Buffer._useTypedArrays = (function () {
  // Detect if browser supports Typed Arrays. Supported browsers are IE 10+, Firefox 4+,
  // Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+. If the browser does not support adding
  // properties to `Uint8Array` instances, then that's the same as no `Uint8Array` support
  // because we need to be able to add all the node Buffer API methods. This is an issue
  // in Firefox 4-29. Now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() &&
        typeof arr.subarray === 'function' // Chrome 9-10 lack `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Workaround: node's base64 implementation allows for non-padded strings
  // while base64-js does not.
  if (encoding === 'base64' && type === 'string') {
    subject = stringtrim(subject)
    while (subject.length % 4 !== 0) {
      subject = subject + '='
    }
  }

  // Find the length
  var length
  if (type === 'number')
    length = coerce(subject)
  else if (type === 'string')
    length = Buffer.byteLength(subject, encoding)
  else if (type === 'object')
    length = coerce(subject.length) // assume that object is array-like
  else
    throw new Error('First argument needs to be a number, array or string.')

  var buf
  if (Buffer._useTypedArrays) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    for (i = 0; i < length; i++) {
      if (Buffer.isBuffer(subject))
        buf[i] = subject.readUInt8(i)
      else
        buf[i] = subject[i]
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

// STATIC METHODS
// ==============

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.isBuffer = function (b) {
  return !!(b !== null && b !== undefined && b._isBuffer)
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'hex':
      ret = str.length / 2
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.concat = function (list, totalLength) {
  assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' +
      'list should be an Array.')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (typeof totalLength !== 'number') {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

// BUFFER INSTANCE METHODS
// =======================

function _hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  assert(strLen % 2 === 0, 'Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    assert(!isNaN(byte), 'Invalid hex string')
    buf[offset + i] = byte
  }
  Buffer._charsWritten = i * 2
  return i
}

function _utf8Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function _asciiWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function _binaryWrite (buf, string, offset, length) {
  return _asciiWrite(buf, string, offset, length)
}

function _base64Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function _utf16leWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf16leToBytes(string), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = _asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = _binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = _base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leWrite(this, string, offset, length)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toString = function (encoding, start, end) {
  var self = this

  encoding = String(encoding || 'utf8').toLowerCase()
  start = Number(start) || 0
  end = (end !== undefined)
    ? Number(end)
    : end = self.length

  // Fastpath empty strings
  if (end === start)
    return ''

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexSlice(self, start, end)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Slice(self, start, end)
      break
    case 'ascii':
      ret = _asciiSlice(self, start, end)
      break
    case 'binary':
      ret = _binarySlice(self, start, end)
      break
    case 'base64':
      ret = _base64Slice(self, start, end)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leSlice(self, start, end)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  assert(end >= start, 'sourceEnd < sourceStart')
  assert(target_start >= 0 && target_start < target.length,
      'targetStart out of bounds')
  assert(start >= 0 && start < source.length, 'sourceStart out of bounds')
  assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 100 || !Buffer._useTypedArrays) {
    for (var i = 0; i < len; i++)
      target[i + target_start] = this[i + start]
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

function _base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function _utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function _asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++)
    ret += String.fromCharCode(buf[i])
  return ret
}

function _binarySlice (buf, start, end) {
  return _asciiSlice(buf, start, end)
}

function _hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function _utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i+1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = clamp(start, len, 0)
  end = clamp(end, len, len)

  if (Buffer._useTypedArrays) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  return this[offset]
}

function _readUInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    val = buf[offset]
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
  } else {
    val = buf[offset] << 8
    if (offset + 1 < len)
      val |= buf[offset + 1]
  }
  return val
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  return _readUInt16(this, offset, true, noAssert)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  return _readUInt16(this, offset, false, noAssert)
}

function _readUInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    if (offset + 2 < len)
      val = buf[offset + 2] << 16
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
    val |= buf[offset]
    if (offset + 3 < len)
      val = val + (buf[offset + 3] << 24 >>> 0)
  } else {
    if (offset + 1 < len)
      val = buf[offset + 1] << 16
    if (offset + 2 < len)
      val |= buf[offset + 2] << 8
    if (offset + 3 < len)
      val |= buf[offset + 3]
    val = val + (buf[offset] << 24 >>> 0)
  }
  return val
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  return _readUInt32(this, offset, true, noAssert)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  return _readUInt32(this, offset, false, noAssert)
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null,
        'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  var neg = this[offset] & 0x80
  if (neg)
    return (0xff - this[offset] + 1) * -1
  else
    return this[offset]
}

function _readInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt16(buf, offset, littleEndian, true)
  var neg = val & 0x8000
  if (neg)
    return (0xffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  return _readInt16(this, offset, true, noAssert)
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  return _readInt16(this, offset, false, noAssert)
}

function _readInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt32(buf, offset, littleEndian, true)
  var neg = val & 0x80000000
  if (neg)
    return (0xffffffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  return _readInt32(this, offset, true, noAssert)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  return _readInt32(this, offset, false, noAssert)
}

function _readFloat (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 23, 4)
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  return _readFloat(this, offset, true, noAssert)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  return _readFloat(this, offset, false, noAssert)
}

function _readDouble (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 7 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 52, 8)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  return _readDouble(this, offset, true, noAssert)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  return _readDouble(this, offset, false, noAssert)
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'trying to write beyond buffer length')
    verifuint(value, 0xff)
  }

  if (offset >= this.length) return

  this[offset] = value
}

function _writeUInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
    buf[offset + i] =
        (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
            (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, false, noAssert)
}

function _writeUInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffffffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
    buf[offset + i] =
        (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, false, noAssert)
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7f, -0x80)
  }

  if (offset >= this.length)
    return

  if (value >= 0)
    this.writeUInt8(value, offset, noAssert)
  else
    this.writeUInt8(0xff + value + 1, offset, noAssert)
}

function _writeInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fff, -0x8000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt16(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, false, noAssert)
}

function _writeInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fffffff, -0x80000000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt32(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, false, noAssert)
}

function _writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 23, 4)
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, false, noAssert)
}

function _writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 7 < buf.length,
        'Trying to write beyond buffer length')
    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 52, 8)
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, false, noAssert)
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (typeof value === 'string') {
    value = value.charCodeAt(0)
  }

  assert(typeof value === 'number' && !isNaN(value), 'value is not a number')
  assert(end >= start, 'end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  assert(start >= 0 && start < this.length, 'start out of bounds')
  assert(end >= 0 && end <= this.length, 'end out of bounds')

  for (var i = start; i < end; i++) {
    this[i] = value
  }
}

Buffer.prototype.inspect = function () {
  var out = []
  var len = this.length
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i])
    if (i === exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...'
      break
    }
  }
  return '<Buffer ' + out.join(' ') + '>'
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer._useTypedArrays) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1)
        buf[i] = this[i]
      return buf.buffer
    }
  } else {
    throw new Error('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

// slice(start, end)
function clamp (index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue
  index = ~~index;  // Coerce to integer.
  if (index >= len) return len
  if (index >= 0) return index
  index += len
  if (index >= 0) return index
  return 0
}

function coerce (length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length)
  return length < 0 ? 0 : length
}

function isArray (subject) {
  return (Array.isArray || function (subject) {
    return Object.prototype.toString.call(subject) === '[object Array]'
  })(subject)
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F)
      byteArray.push(str.charCodeAt(i))
    else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++)
        byteArray.push(parseInt(h[j], 16))
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length) {
  var pos
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

/*
 * We have to make sure that the value is a valid integer. This means that it
 * is non-negative. It has no fractional component and that it does not
 * exceed the maximum allowed value.
 */
function verifuint (value, max) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value >= 0, 'specified a negative value for writing an unsigned value')
  assert(value <= max, 'value is larger than maximum value for type')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifsint (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifIEEE754 (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
}

function assert (test, message) {
  if (!test) throw new Error(message || 'Failed assertion')
}

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/index.js","/../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer")
},{"+7ZJp0":56,"base64-js":54,"buffer":53,"ieee754":55}],54:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)
	var PLUS_URL_SAFE = '-'.charCodeAt(0)
	var SLASH_URL_SAFE = '_'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS ||
		    code === PLUS_URL_SAFE)
			return 62 // '+'
		if (code === SLASH ||
		    code === SLASH_URL_SAFE)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/base64-js/lib/b64.js","/../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/base64-js/lib")
},{"+7ZJp0":56,"buffer":53}],55:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/ieee754/index.js","/../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/ieee754")
},{"+7ZJp0":56,"buffer":53}],56:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/process/browser.js","/../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/process")
},{"+7ZJp0":56,"buffer":53}],57:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * State-based routing for AngularJS
 * @version v0.2.13
 * @link http://angular-ui.github.com/
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="ui.router"),function(a,b,c){"use strict";function d(a,b){return M(new(M(function(){},{prototype:a})),b)}function e(a){return L(arguments,function(b){b!==a&&L(b,function(b,c){a.hasOwnProperty(c)||(a[c]=b)})}),a}function f(a,b){var c=[];for(var d in a.path){if(a.path[d]!==b.path[d])break;c.push(a.path[d])}return c}function g(a){if(Object.keys)return Object.keys(a);var c=[];return b.forEach(a,function(a,b){c.push(b)}),c}function h(a,b){if(Array.prototype.indexOf)return a.indexOf(b,Number(arguments[2])||0);var c=a.length>>>0,d=Number(arguments[2])||0;for(d=0>d?Math.ceil(d):Math.floor(d),0>d&&(d+=c);c>d;d++)if(d in a&&a[d]===b)return d;return-1}function i(a,b,c,d){var e,i=f(c,d),j={},k=[];for(var l in i)if(i[l].params&&(e=g(i[l].params),e.length))for(var m in e)h(k,e[m])>=0||(k.push(e[m]),j[e[m]]=a[e[m]]);return M({},j,b)}function j(a,b,c){if(!c){c=[];for(var d in a)c.push(d)}for(var e=0;e<c.length;e++){var f=c[e];if(a[f]!=b[f])return!1}return!0}function k(a,b){var c={};return L(a,function(a){c[a]=b[a]}),c}function l(a){var b={},c=Array.prototype.concat.apply(Array.prototype,Array.prototype.slice.call(arguments,1));for(var d in a)-1==h(c,d)&&(b[d]=a[d]);return b}function m(a,b){var c=K(a),d=c?[]:{};return L(a,function(a,e){b(a,e)&&(d[c?d.length:e]=a)}),d}function n(a,b){var c=K(a)?[]:{};return L(a,function(a,d){c[d]=b(a,d)}),c}function o(a,b){var d=1,f=2,i={},j=[],k=i,m=M(a.when(i),{$$promises:i,$$values:i});this.study=function(i){function n(a,c){if(s[c]!==f){if(r.push(c),s[c]===d)throw r.splice(0,h(r,c)),new Error("Cyclic dependency: "+r.join(" -> "));if(s[c]=d,I(a))q.push(c,[function(){return b.get(a)}],j);else{var e=b.annotate(a);L(e,function(a){a!==c&&i.hasOwnProperty(a)&&n(i[a],a)}),q.push(c,a,e)}r.pop(),s[c]=f}}function o(a){return J(a)&&a.then&&a.$$promises}if(!J(i))throw new Error("'invocables' must be an object");var p=g(i||{}),q=[],r=[],s={};return L(i,n),i=r=s=null,function(d,f,g){function h(){--u||(v||e(t,f.$$values),r.$$values=t,r.$$promises=r.$$promises||!0,delete r.$$inheritedValues,n.resolve(t))}function i(a){r.$$failure=a,n.reject(a)}function j(c,e,f){function j(a){l.reject(a),i(a)}function k(){if(!G(r.$$failure))try{l.resolve(b.invoke(e,g,t)),l.promise.then(function(a){t[c]=a,h()},j)}catch(a){j(a)}}var l=a.defer(),m=0;L(f,function(a){s.hasOwnProperty(a)&&!d.hasOwnProperty(a)&&(m++,s[a].then(function(b){t[a]=b,--m||k()},j))}),m||k(),s[c]=l.promise}if(o(d)&&g===c&&(g=f,f=d,d=null),d){if(!J(d))throw new Error("'locals' must be an object")}else d=k;if(f){if(!o(f))throw new Error("'parent' must be a promise returned by $resolve.resolve()")}else f=m;var n=a.defer(),r=n.promise,s=r.$$promises={},t=M({},d),u=1+q.length/3,v=!1;if(G(f.$$failure))return i(f.$$failure),r;f.$$inheritedValues&&e(t,l(f.$$inheritedValues,p)),M(s,f.$$promises),f.$$values?(v=e(t,l(f.$$values,p)),r.$$inheritedValues=l(f.$$values,p),h()):(f.$$inheritedValues&&(r.$$inheritedValues=l(f.$$inheritedValues,p)),f.then(h,i));for(var w=0,x=q.length;x>w;w+=3)d.hasOwnProperty(q[w])?h():j(q[w],q[w+1],q[w+2]);return r}},this.resolve=function(a,b,c,d){return this.study(a)(b,c,d)}}function p(a,b,c){this.fromConfig=function(a,b,c){return G(a.template)?this.fromString(a.template,b):G(a.templateUrl)?this.fromUrl(a.templateUrl,b):G(a.templateProvider)?this.fromProvider(a.templateProvider,b,c):null},this.fromString=function(a,b){return H(a)?a(b):a},this.fromUrl=function(c,d){return H(c)&&(c=c(d)),null==c?null:a.get(c,{cache:b,headers:{Accept:"text/html"}}).then(function(a){return a.data})},this.fromProvider=function(a,b,d){return c.invoke(a,null,d||{params:b})}}function q(a,b,e){function f(b,c,d,e){if(q.push(b),o[b])return o[b];if(!/^\w+(-+\w+)*(?:\[\])?$/.test(b))throw new Error("Invalid parameter name '"+b+"' in pattern '"+a+"'");if(p[b])throw new Error("Duplicate parameter name '"+b+"' in pattern '"+a+"'");return p[b]=new O.Param(b,c,d,e),p[b]}function g(a,b,c){var d=["",""],e=a.replace(/[\\\[\]\^$*+?.()|{}]/g,"\\$&");if(!b)return e;switch(c){case!1:d=["(",")"];break;case!0:d=["?(",")?"];break;default:d=["("+c+"|",")?"]}return e+d[0]+b+d[1]}function h(c,e){var f,g,h,i,j;return f=c[2]||c[3],j=b.params[f],h=a.substring(m,c.index),g=e?c[4]:c[4]||("*"==c[1]?".*":null),i=O.type(g||"string")||d(O.type("string"),{pattern:new RegExp(g)}),{id:f,regexp:g,segment:h,type:i,cfg:j}}b=M({params:{}},J(b)?b:{});var i,j=/([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,k=/([:]?)([\w\[\]-]+)|\{([\w\[\]-]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,l="^",m=0,n=this.segments=[],o=e?e.params:{},p=this.params=e?e.params.$$new():new O.ParamSet,q=[];this.source=a;for(var r,s,t;(i=j.exec(a))&&(r=h(i,!1),!(r.segment.indexOf("?")>=0));)s=f(r.id,r.type,r.cfg,"path"),l+=g(r.segment,s.type.pattern.source,s.squash),n.push(r.segment),m=j.lastIndex;t=a.substring(m);var u=t.indexOf("?");if(u>=0){var v=this.sourceSearch=t.substring(u);if(t=t.substring(0,u),this.sourcePath=a.substring(0,m+u),v.length>0)for(m=0;i=k.exec(v);)r=h(i,!0),s=f(r.id,r.type,r.cfg,"search"),m=j.lastIndex}else this.sourcePath=a,this.sourceSearch="";l+=g(t)+(b.strict===!1?"/?":"")+"$",n.push(t),this.regexp=new RegExp(l,b.caseInsensitive?"i":c),this.prefix=n[0],this.$$paramNames=q}function r(a){M(this,a)}function s(){function a(a){return null!=a?a.toString().replace(/\//g,"%2F"):a}function e(a){return null!=a?a.toString().replace(/%2F/g,"/"):a}function f(a){return this.pattern.test(a)}function i(){return{strict:t,caseInsensitive:p}}function j(a){return H(a)||K(a)&&H(a[a.length-1])}function k(){for(;x.length;){var a=x.shift();if(a.pattern)throw new Error("You cannot override a type's .pattern at runtime.");b.extend(v[a.name],o.invoke(a.def))}}function l(a){M(this,a||{})}O=this;var o,p=!1,t=!0,u=!1,v={},w=!0,x=[],y={string:{encode:a,decode:e,is:f,pattern:/[^/]*/},"int":{encode:a,decode:function(a){return parseInt(a,10)},is:function(a){return G(a)&&this.decode(a.toString())===a},pattern:/\d+/},bool:{encode:function(a){return a?1:0},decode:function(a){return 0!==parseInt(a,10)},is:function(a){return a===!0||a===!1},pattern:/0|1/},date:{encode:function(a){return this.is(a)?[a.getFullYear(),("0"+(a.getMonth()+1)).slice(-2),("0"+a.getDate()).slice(-2)].join("-"):c},decode:function(a){if(this.is(a))return a;var b=this.capture.exec(a);return b?new Date(b[1],b[2]-1,b[3]):c},is:function(a){return a instanceof Date&&!isNaN(a.valueOf())},equals:function(a,b){return this.is(a)&&this.is(b)&&a.toISOString()===b.toISOString()},pattern:/[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,capture:/([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/},json:{encode:b.toJson,decode:b.fromJson,is:b.isObject,equals:b.equals,pattern:/[^/]*/},any:{encode:b.identity,decode:b.identity,is:b.identity,equals:b.equals,pattern:/.*/}};s.$$getDefaultValue=function(a){if(!j(a.value))return a.value;if(!o)throw new Error("Injectable functions cannot be called at configuration time");return o.invoke(a.value)},this.caseInsensitive=function(a){return G(a)&&(p=a),p},this.strictMode=function(a){return G(a)&&(t=a),t},this.defaultSquashPolicy=function(a){if(!G(a))return u;if(a!==!0&&a!==!1&&!I(a))throw new Error("Invalid squash policy: "+a+". Valid policies: false, true, arbitrary-string");return u=a,a},this.compile=function(a,b){return new q(a,M(i(),b))},this.isMatcher=function(a){if(!J(a))return!1;var b=!0;return L(q.prototype,function(c,d){H(c)&&(b=b&&G(a[d])&&H(a[d]))}),b},this.type=function(a,b,c){if(!G(b))return v[a];if(v.hasOwnProperty(a))throw new Error("A type named '"+a+"' has already been defined.");return v[a]=new r(M({name:a},b)),c&&(x.push({name:a,def:c}),w||k()),this},L(y,function(a,b){v[b]=new r(M({name:b},a))}),v=d(v,{}),this.$get=["$injector",function(a){return o=a,w=!1,k(),L(y,function(a,b){v[b]||(v[b]=new r(a))}),this}],this.Param=function(a,b,d,e){function f(a){var b=J(a)?g(a):[],c=-1===h(b,"value")&&-1===h(b,"type")&&-1===h(b,"squash")&&-1===h(b,"array");return c&&(a={value:a}),a.$$fn=j(a.value)?a.value:function(){return a.value},a}function i(b,c,d){if(b.type&&c)throw new Error("Param '"+a+"' has two type configurations.");return c?c:b.type?b.type instanceof r?b.type:new r(b.type):"config"===d?v.any:v.string}function k(){var b={array:"search"===e?"auto":!1},c=a.match(/\[\]$/)?{array:!0}:{};return M(b,c,d).array}function l(a,b){var c=a.squash;if(!b||c===!1)return!1;if(!G(c)||null==c)return u;if(c===!0||I(c))return c;throw new Error("Invalid squash policy: '"+c+"'. Valid policies: false, true, or arbitrary string")}function p(a,b,d,e){var f,g,i=[{from:"",to:d||b?c:""},{from:null,to:d||b?c:""}];return f=K(a.replace)?a.replace:[],I(e)&&f.push({from:e,to:c}),g=n(f,function(a){return a.from}),m(i,function(a){return-1===h(g,a.from)}).concat(f)}function q(){if(!o)throw new Error("Injectable functions cannot be called at configuration time");return o.invoke(d.$$fn)}function s(a){function b(a){return function(b){return b.from===a}}function c(a){var c=n(m(w.replace,b(a)),function(a){return a.to});return c.length?c[0]:a}return a=c(a),G(a)?w.type.decode(a):q()}function t(){return"{Param:"+a+" "+b+" squash: '"+z+"' optional: "+y+"}"}var w=this;d=f(d),b=i(d,b,e);var x=k();b=x?b.$asArray(x,"search"===e):b,"string"!==b.name||x||"path"!==e||d.value!==c||(d.value="");var y=d.value!==c,z=l(d,y),A=p(d,x,y,z);M(this,{id:a,type:b,location:e,array:x,squash:z,replace:A,isOptional:y,value:s,dynamic:c,config:d,toString:t})},l.prototype={$$new:function(){return d(this,M(new l,{$$parent:this}))},$$keys:function(){for(var a=[],b=[],c=this,d=g(l.prototype);c;)b.push(c),c=c.$$parent;return b.reverse(),L(b,function(b){L(g(b),function(b){-1===h(a,b)&&-1===h(d,b)&&a.push(b)})}),a},$$values:function(a){var b={},c=this;return L(c.$$keys(),function(d){b[d]=c[d].value(a&&a[d])}),b},$$equals:function(a,b){var c=!0,d=this;return L(d.$$keys(),function(e){var f=a&&a[e],g=b&&b[e];d[e].type.equals(f,g)||(c=!1)}),c},$$validates:function(a){var b,c,d,e=!0,f=this;return L(this.$$keys(),function(g){d=f[g],c=a[g],b=!c&&d.isOptional,e=e&&(b||!!d.type.is(c))}),e},$$parent:c},this.ParamSet=l}function t(a,d){function e(a){var b=/^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(a.source);return null!=b?b[1].replace(/\\(.)/g,"$1"):""}function f(a,b){return a.replace(/\$(\$|\d{1,2})/,function(a,c){return b["$"===c?0:Number(c)]})}function g(a,b,c){if(!c)return!1;var d=a.invoke(b,b,{$match:c});return G(d)?d:!0}function h(d,e,f,g){function h(a,b,c){return"/"===p?a:b?p.slice(0,-1)+a:c?p.slice(1)+a:a}function m(a){function b(a){var b=a(f,d);return b?(I(b)&&d.replace().url(b),!0):!1}if(!a||!a.defaultPrevented){var e=o&&d.url()===o;if(o=c,e)return!0;var g,h=j.length;for(g=0;h>g;g++)if(b(j[g]))return;k&&b(k)}}function n(){return i=i||e.$on("$locationChangeSuccess",m)}var o,p=g.baseHref(),q=d.url();return l||n(),{sync:function(){m()},listen:function(){return n()},update:function(a){return a?void(q=d.url()):void(d.url()!==q&&(d.url(q),d.replace()))},push:function(a,b,e){d.url(a.format(b||{})),o=e&&e.$$avoidResync?d.url():c,e&&e.replace&&d.replace()},href:function(c,e,f){if(!c.validates(e))return null;var g=a.html5Mode();b.isObject(g)&&(g=g.enabled);var i=c.format(e);if(f=f||{},g||null===i||(i="#"+a.hashPrefix()+i),i=h(i,g,f.absolute),!f.absolute||!i)return i;var j=!g&&i?"/":"",k=d.port();return k=80===k||443===k?"":":"+k,[d.protocol(),"://",d.host(),k,j,i].join("")}}}var i,j=[],k=null,l=!1;this.rule=function(a){if(!H(a))throw new Error("'rule' must be a function");return j.push(a),this},this.otherwise=function(a){if(I(a)){var b=a;a=function(){return b}}else if(!H(a))throw new Error("'rule' must be a function");return k=a,this},this.when=function(a,b){var c,h=I(b);if(I(a)&&(a=d.compile(a)),!h&&!H(b)&&!K(b))throw new Error("invalid 'handler' in when()");var i={matcher:function(a,b){return h&&(c=d.compile(b),b=["$match",function(a){return c.format(a)}]),M(function(c,d){return g(c,b,a.exec(d.path(),d.search()))},{prefix:I(a.prefix)?a.prefix:""})},regex:function(a,b){if(a.global||a.sticky)throw new Error("when() RegExp must not be global or sticky");return h&&(c=b,b=["$match",function(a){return f(c,a)}]),M(function(c,d){return g(c,b,a.exec(d.path()))},{prefix:e(a)})}},j={matcher:d.isMatcher(a),regex:a instanceof RegExp};for(var k in j)if(j[k])return this.rule(i[k](a,b));throw new Error("invalid 'what' in when()")},this.deferIntercept=function(a){a===c&&(a=!0),l=a},this.$get=h,h.$inject=["$location","$rootScope","$injector","$browser"]}function u(a,e){function f(a){return 0===a.indexOf(".")||0===a.indexOf("^")}function l(a,b){if(!a)return c;var d=I(a),e=d?a:a.name,g=f(e);if(g){if(!b)throw new Error("No reference point given for path '"+e+"'");b=l(b);for(var h=e.split("."),i=0,j=h.length,k=b;j>i;i++)if(""!==h[i]||0!==i){if("^"!==h[i])break;if(!k.parent)throw new Error("Path '"+e+"' not valid for state '"+b.name+"'");k=k.parent}else k=b;h=h.slice(i).join("."),e=k.name+(k.name&&h?".":"")+h}var m=y[e];return!m||!d&&(d||m!==a&&m.self!==a)?c:m}function m(a,b){z[a]||(z[a]=[]),z[a].push(b)}function o(a){for(var b=z[a]||[];b.length;)p(b.shift())}function p(b){b=d(b,{self:b,resolve:b.resolve||{},toString:function(){return this.name}});var c=b.name;if(!I(c)||c.indexOf("@")>=0)throw new Error("State must have a valid name");if(y.hasOwnProperty(c))throw new Error("State '"+c+"'' is already defined");var e=-1!==c.indexOf(".")?c.substring(0,c.lastIndexOf(".")):I(b.parent)?b.parent:J(b.parent)&&I(b.parent.name)?b.parent.name:"";if(e&&!y[e])return m(e,b.self);for(var f in B)H(B[f])&&(b[f]=B[f](b,B.$delegates[f]));return y[c]=b,!b[A]&&b.url&&a.when(b.url,["$match","$stateParams",function(a,c){x.$current.navigable==b&&j(a,c)||x.transitionTo(b,a,{inherit:!0,location:!1})}]),o(c),b}function q(a){return a.indexOf("*")>-1}function r(a){var b=a.split("."),c=x.$current.name.split(".");if("**"===b[0]&&(c=c.slice(h(c,b[1])),c.unshift("**")),"**"===b[b.length-1]&&(c.splice(h(c,b[b.length-2])+1,Number.MAX_VALUE),c.push("**")),b.length!=c.length)return!1;for(var d=0,e=b.length;e>d;d++)"*"===b[d]&&(c[d]="*");return c.join("")===b.join("")}function s(a,b){return I(a)&&!G(b)?B[a]:H(b)&&I(a)?(B[a]&&!B.$delegates[a]&&(B.$delegates[a]=B[a]),B[a]=b,this):this}function t(a,b){return J(a)?b=a:b.name=a,p(b),this}function u(a,e,f,h,m,o,p){function s(b,c,d,f){var g=a.$broadcast("$stateNotFound",b,c,d);if(g.defaultPrevented)return p.update(),B;if(!g.retry)return null;if(f.$retry)return p.update(),C;var h=x.transition=e.when(g.retry);return h.then(function(){return h!==x.transition?u:(b.options.$retry=!0,x.transitionTo(b.to,b.toParams,b.options))},function(){return B}),p.update(),h}function t(a,c,d,g,i,j){var l=d?c:k(a.params.$$keys(),c),n={$stateParams:l};i.resolve=m.resolve(a.resolve,n,i.resolve,a);var o=[i.resolve.then(function(a){i.globals=a})];return g&&o.push(g),L(a.views,function(c,d){var e=c.resolve&&c.resolve!==a.resolve?c.resolve:{};e.$template=[function(){return f.load(d,{view:c,locals:n,params:l,notify:j.notify})||""}],o.push(m.resolve(e,n,i.resolve,a).then(function(f){if(H(c.controllerProvider)||K(c.controllerProvider)){var g=b.extend({},e,n);f.$$controller=h.invoke(c.controllerProvider,null,g)}else f.$$controller=c.controller;f.$$state=a,f.$$controllerAs=c.controllerAs,i[d]=f}))}),e.all(o).then(function(){return i})}var u=e.reject(new Error("transition superseded")),z=e.reject(new Error("transition prevented")),B=e.reject(new Error("transition aborted")),C=e.reject(new Error("transition failed"));return w.locals={resolve:null,globals:{$stateParams:{}}},x={params:{},current:w.self,$current:w,transition:null},x.reload=function(){return x.transitionTo(x.current,o,{reload:!0,inherit:!1,notify:!0})},x.go=function(a,b,c){return x.transitionTo(a,b,M({inherit:!0,relative:x.$current},c))},x.transitionTo=function(b,c,f){c=c||{},f=M({location:!0,inherit:!1,relative:null,notify:!0,reload:!1,$retry:!1},f||{});var g,j=x.$current,m=x.params,n=j.path,q=l(b,f.relative);if(!G(q)){var r={to:b,toParams:c,options:f},y=s(r,j.self,m,f);if(y)return y;if(b=r.to,c=r.toParams,f=r.options,q=l(b,f.relative),!G(q)){if(!f.relative)throw new Error("No such state '"+b+"'");throw new Error("Could not resolve '"+b+"' from state '"+f.relative+"'")}}if(q[A])throw new Error("Cannot transition to abstract state '"+b+"'");if(f.inherit&&(c=i(o,c||{},x.$current,q)),!q.params.$$validates(c))return C;c=q.params.$$values(c),b=q;var B=b.path,D=0,E=B[D],F=w.locals,H=[];if(!f.reload)for(;E&&E===n[D]&&E.ownParams.$$equals(c,m);)F=H[D]=E.locals,D++,E=B[D];if(v(b,j,F,f))return b.self.reloadOnSearch!==!1&&p.update(),x.transition=null,e.when(x.current);if(c=k(b.params.$$keys(),c||{}),f.notify&&a.$broadcast("$stateChangeStart",b.self,c,j.self,m).defaultPrevented)return p.update(),z;for(var I=e.when(F),J=D;J<B.length;J++,E=B[J])F=H[J]=d(F),I=t(E,c,E===b,I,F,f);var K=x.transition=I.then(function(){var d,e,g;if(x.transition!==K)return u;for(d=n.length-1;d>=D;d--)g=n[d],g.self.onExit&&h.invoke(g.self.onExit,g.self,g.locals.globals),g.locals=null;for(d=D;d<B.length;d++)e=B[d],e.locals=H[d],e.self.onEnter&&h.invoke(e.self.onEnter,e.self,e.locals.globals);return x.transition!==K?u:(x.$current=b,x.current=b.self,x.params=c,N(x.params,o),x.transition=null,f.location&&b.navigable&&p.push(b.navigable.url,b.navigable.locals.globals.$stateParams,{$$avoidResync:!0,replace:"replace"===f.location}),f.notify&&a.$broadcast("$stateChangeSuccess",b.self,c,j.self,m),p.update(!0),x.current)},function(d){return x.transition!==K?u:(x.transition=null,g=a.$broadcast("$stateChangeError",b.self,c,j.self,m,d),g.defaultPrevented||p.update(),e.reject(d))});return K},x.is=function(a,b,d){d=M({relative:x.$current},d||{});var e=l(a,d.relative);return G(e)?x.$current!==e?!1:b?j(e.params.$$values(b),o):!0:c},x.includes=function(a,b,d){if(d=M({relative:x.$current},d||{}),I(a)&&q(a)){if(!r(a))return!1;a=x.$current.name}var e=l(a,d.relative);return G(e)?G(x.$current.includes[e.name])?b?j(e.params.$$values(b),o,g(b)):!0:!1:c},x.href=function(a,b,d){d=M({lossy:!0,inherit:!0,absolute:!1,relative:x.$current},d||{});var e=l(a,d.relative);if(!G(e))return null;d.inherit&&(b=i(o,b||{},x.$current,e));var f=e&&d.lossy?e.navigable:e;return f&&f.url!==c&&null!==f.url?p.href(f.url,k(e.params.$$keys(),b||{}),{absolute:d.absolute}):null},x.get=function(a,b){if(0===arguments.length)return n(g(y),function(a){return y[a].self});var c=l(a,b||x.$current);return c&&c.self?c.self:null},x}function v(a,b,c,d){return a!==b||(c!==b.locals||d.reload)&&a.self.reloadOnSearch!==!1?void 0:!0}var w,x,y={},z={},A="abstract",B={parent:function(a){if(G(a.parent)&&a.parent)return l(a.parent);var b=/^(.+)\.[^.]+$/.exec(a.name);return b?l(b[1]):w},data:function(a){return a.parent&&a.parent.data&&(a.data=a.self.data=M({},a.parent.data,a.data)),a.data},url:function(a){var b=a.url,c={params:a.params||{}};if(I(b))return"^"==b.charAt(0)?e.compile(b.substring(1),c):(a.parent.navigable||w).url.concat(b,c);if(!b||e.isMatcher(b))return b;throw new Error("Invalid url '"+b+"' in state '"+a+"'")},navigable:function(a){return a.url?a:a.parent?a.parent.navigable:null},ownParams:function(a){var b=a.url&&a.url.params||new O.ParamSet;return L(a.params||{},function(a,c){b[c]||(b[c]=new O.Param(c,null,a,"config"))}),b},params:function(a){return a.parent&&a.parent.params?M(a.parent.params.$$new(),a.ownParams):new O.ParamSet},views:function(a){var b={};return L(G(a.views)?a.views:{"":a},function(c,d){d.indexOf("@")<0&&(d+="@"+a.parent.name),b[d]=c}),b},path:function(a){return a.parent?a.parent.path.concat(a):[]},includes:function(a){var b=a.parent?M({},a.parent.includes):{};return b[a.name]=!0,b},$delegates:{}};w=p({name:"",url:"^",views:null,"abstract":!0}),w.navigable=null,this.decorator=s,this.state=t,this.$get=u,u.$inject=["$rootScope","$q","$view","$injector","$resolve","$stateParams","$urlRouter","$location","$urlMatcherFactory"]}function v(){function a(a,b){return{load:function(c,d){var e,f={template:null,controller:null,view:null,locals:null,notify:!0,async:!0,params:{}};return d=M(f,d),d.view&&(e=b.fromConfig(d.view,d.params,d.locals)),e&&d.notify&&a.$broadcast("$viewContentLoading",d),e}}}this.$get=a,a.$inject=["$rootScope","$templateFactory"]}function w(){var a=!1;this.useAnchorScroll=function(){a=!0},this.$get=["$anchorScroll","$timeout",function(b,c){return a?b:function(a){c(function(){a[0].scrollIntoView()},0,!1)}}]}function x(a,c,d,e){function f(){return c.has?function(a){return c.has(a)?c.get(a):null}:function(a){try{return c.get(a)}catch(b){return null}}}function g(a,b){var c=function(){return{enter:function(a,b,c){b.after(a),c()},leave:function(a,b){a.remove(),b()}}};if(j)return{enter:function(a,b,c){var d=j.enter(a,null,b,c);d&&d.then&&d.then(c)},leave:function(a,b){var c=j.leave(a,b);c&&c.then&&c.then(b)}};if(i){var d=i&&i(b,a);return{enter:function(a,b,c){d.enter(a,null,b),c()},leave:function(a,b){d.leave(a),b()}}}return c()}var h=f(),i=h("$animator"),j=h("$animate"),k={restrict:"ECA",terminal:!0,priority:400,transclude:"element",compile:function(c,f,h){return function(c,f,i){function j(){l&&(l.remove(),l=null),n&&(n.$destroy(),n=null),m&&(r.leave(m,function(){l=null}),l=m,m=null)}function k(g){var k,l=z(c,i,f,e),s=l&&a.$current&&a.$current.locals[l];if(g||s!==o){k=c.$new(),o=a.$current.locals[l];var t=h(k,function(a){r.enter(a,f,function(){n&&n.$emit("$viewContentAnimationEnded"),(b.isDefined(q)&&!q||c.$eval(q))&&d(a)}),j()});m=t,n=k,n.$emit("$viewContentLoaded"),n.$eval(p)}}var l,m,n,o,p=i.onload||"",q=i.autoscroll,r=g(i,c);c.$on("$stateChangeSuccess",function(){k(!1)}),c.$on("$viewContentLoading",function(){k(!1)}),k(!0)}}};return k}function y(a,b,c,d){return{restrict:"ECA",priority:-400,compile:function(e){var f=e.html();return function(e,g,h){var i=c.$current,j=z(e,h,g,d),k=i&&i.locals[j];if(k){g.data("$uiView",{name:j,state:k.$$state}),g.html(k.$template?k.$template:f);var l=a(g.contents());if(k.$$controller){k.$scope=e;var m=b(k.$$controller,k);k.$$controllerAs&&(e[k.$$controllerAs]=m),g.data("$ngControllerController",m),g.children().data("$ngControllerController",m)}l(e)}}}}}function z(a,b,c,d){var e=d(b.uiView||b.name||"")(a),f=c.inheritedData("$uiView");return e.indexOf("@")>=0?e:e+"@"+(f?f.state.name:"")}function A(a,b){var c,d=a.match(/^\s*({[^}]*})\s*$/);if(d&&(a=b+"("+d[1]+")"),c=a.replace(/\n/g," ").match(/^([^(]+?)\s*(\((.*)\))?$/),!c||4!==c.length)throw new Error("Invalid state ref '"+a+"'");return{state:c[1],paramExpr:c[3]||null}}function B(a){var b=a.parent().inheritedData("$uiView");return b&&b.state&&b.state.name?b.state:void 0}function C(a,c){var d=["location","inherit","reload"];return{restrict:"A",require:["?^uiSrefActive","?^uiSrefActiveEq"],link:function(e,f,g,h){var i=A(g.uiSref,a.current.name),j=null,k=B(f)||a.$current,l=null,m="A"===f.prop("tagName"),n="FORM"===f[0].nodeName,o=n?"action":"href",p=!0,q={relative:k,inherit:!0},r=e.$eval(g.uiSrefOpts)||{};b.forEach(d,function(a){a in r&&(q[a]=r[a])});var s=function(c){if(c&&(j=b.copy(c)),p){l=a.href(i.state,j,q);var d=h[1]||h[0];return d&&d.$$setStateInfo(i.state,j),null===l?(p=!1,!1):void g.$set(o,l)}};i.paramExpr&&(e.$watch(i.paramExpr,function(a){a!==j&&s(a)},!0),j=b.copy(e.$eval(i.paramExpr))),s(),n||f.bind("click",function(b){var d=b.which||b.button;if(!(d>1||b.ctrlKey||b.metaKey||b.shiftKey||f.attr("target"))){var e=c(function(){a.go(i.state,j,q)});b.preventDefault();var g=m&&!l?1:0;b.preventDefault=function(){g--<=0&&c.cancel(e)}}})}}}function D(a,b,c){return{restrict:"A",controller:["$scope","$element","$attrs",function(b,d,e){function f(){g()?d.addClass(j):d.removeClass(j)}function g(){return"undefined"!=typeof e.uiSrefActiveEq?h&&a.is(h.name,i):h&&a.includes(h.name,i)}var h,i,j;j=c(e.uiSrefActiveEq||e.uiSrefActive||"",!1)(b),this.$$setStateInfo=function(b,c){h=a.get(b,B(d)),i=c,f()},b.$on("$stateChangeSuccess",f)}]}}function E(a){var b=function(b){return a.is(b)};return b.$stateful=!0,b}function F(a){var b=function(b){return a.includes(b)};return b.$stateful=!0,b}var G=b.isDefined,H=b.isFunction,I=b.isString,J=b.isObject,K=b.isArray,L=b.forEach,M=b.extend,N=b.copy;b.module("ui.router.util",["ng"]),b.module("ui.router.router",["ui.router.util"]),b.module("ui.router.state",["ui.router.router","ui.router.util"]),b.module("ui.router",["ui.router.state"]),b.module("ui.router.compat",["ui.router"]),o.$inject=["$q","$injector"],b.module("ui.router.util").service("$resolve",o),p.$inject=["$http","$templateCache","$injector"],b.module("ui.router.util").service("$templateFactory",p);var O;q.prototype.concat=function(a,b){var c={caseInsensitive:O.caseInsensitive(),strict:O.strictMode(),squash:O.defaultSquashPolicy()};return new q(this.sourcePath+a+this.sourceSearch,M(c,b),this)},q.prototype.toString=function(){return this.source},q.prototype.exec=function(a,b){function c(a){function b(a){return a.split("").reverse().join("")}function c(a){return a.replace(/\\-/,"-")}var d=b(a).split(/-(?!\\)/),e=n(d,b);return n(e,c).reverse()}var d=this.regexp.exec(a);if(!d)return null;b=b||{};var e,f,g,h=this.parameters(),i=h.length,j=this.segments.length-1,k={};if(j!==d.length-1)throw new Error("Unbalanced capture group in route '"+this.source+"'");for(e=0;j>e;e++){g=h[e];var l=this.params[g],m=d[e+1];for(f=0;f<l.replace;f++)l.replace[f].from===m&&(m=l.replace[f].to);m&&l.array===!0&&(m=c(m)),k[g]=l.value(m)}for(;i>e;e++)g=h[e],k[g]=this.params[g].value(b[g]);return k},q.prototype.parameters=function(a){return G(a)?this.params[a]||null:this.$$paramNames},q.prototype.validates=function(a){return this.params.$$validates(a)},q.prototype.format=function(a){function b(a){return encodeURIComponent(a).replace(/-/g,function(a){return"%5C%"+a.charCodeAt(0).toString(16).toUpperCase()})}a=a||{};var c=this.segments,d=this.parameters(),e=this.params;if(!this.validates(a))return null;var f,g=!1,h=c.length-1,i=d.length,j=c[0];for(f=0;i>f;f++){var k=h>f,l=d[f],m=e[l],o=m.value(a[l]),p=m.isOptional&&m.type.equals(m.value(),o),q=p?m.squash:!1,r=m.type.encode(o);if(k){var s=c[f+1];if(q===!1)null!=r&&(j+=K(r)?n(r,b).join("-"):encodeURIComponent(r)),j+=s;else if(q===!0){var t=j.match(/\/$/)?/\/?(.*)/:/(.*)/;j+=s.match(t)[1]}else I(q)&&(j+=q+s)}else{if(null==r||p&&q!==!1)continue;K(r)||(r=[r]),r=n(r,encodeURIComponent).join("&"+l+"="),j+=(g?"&":"?")+(l+"="+r),g=!0}}return j},r.prototype.is=function(){return!0},r.prototype.encode=function(a){return a},r.prototype.decode=function(a){return a},r.prototype.equals=function(a,b){return a==b},r.prototype.$subPattern=function(){var a=this.pattern.toString();return a.substr(1,a.length-2)},r.prototype.pattern=/.*/,r.prototype.toString=function(){return"{Type:"+this.name+"}"},r.prototype.$asArray=function(a,b){function d(a,b){function d(a,b){return function(){return a[b].apply(a,arguments)}}function e(a){return K(a)?a:G(a)?[a]:[]}function f(a){switch(a.length){case 0:return c;case 1:return"auto"===b?a[0]:a;default:return a}}function g(a){return!a}function h(a,b){return function(c){c=e(c);var d=n(c,a);return b===!0?0===m(d,g).length:f(d)}}function i(a){return function(b,c){var d=e(b),f=e(c);if(d.length!==f.length)return!1;for(var g=0;g<d.length;g++)if(!a(d[g],f[g]))return!1;return!0}}this.encode=h(d(a,"encode")),this.decode=h(d(a,"decode")),this.is=h(d(a,"is"),!0),this.equals=i(d(a,"equals")),this.pattern=a.pattern,this.$arrayMode=b}if(!a)return this;if("auto"===a&&!b)throw new Error("'auto' array mode is for query parameters only");return new d(this,a)},b.module("ui.router.util").provider("$urlMatcherFactory",s),b.module("ui.router.util").run(["$urlMatcherFactory",function(){}]),t.$inject=["$locationProvider","$urlMatcherFactoryProvider"],b.module("ui.router.router").provider("$urlRouter",t),u.$inject=["$urlRouterProvider","$urlMatcherFactoryProvider"],b.module("ui.router.state").value("$stateParams",{}).provider("$state",u),v.$inject=[],b.module("ui.router.state").provider("$view",v),b.module("ui.router.state").provider("$uiViewScroll",w),x.$inject=["$state","$injector","$uiViewScroll","$interpolate"],y.$inject=["$compile","$controller","$state","$interpolate"],b.module("ui.router.state").directive("uiView",x),b.module("ui.router.state").directive("uiView",y),C.$inject=["$state","$timeout"],D.$inject=["$state","$stateParams","$interpolate"],b.module("ui.router.state").directive("uiSref",C).directive("uiSrefActive",D).directive("uiSrefActiveEq",D),E.$inject=["$state"],F.$inject=["$state"],b.module("ui.router.state").filter("isState",E).filter("includedByState",F)}(window,window.angular);
}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../vendor/js/angular-ui-router.min.js","/../../../vendor/js")
},{"+7ZJp0":56,"buffer":53}],58:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**!
 * AngularJS file upload directives and services. Supoorts: file upload/drop/paste, resume, cancel/abort,
 * progress, resize, thumbnail, preview, validation and CORS
 * @author  Danial  <danial.farid@gmail.com>
 * @version 12.0.4
 */

if (window.XMLHttpRequest && !(window.FileAPI && FileAPI.shouldLoad)) {
  window.XMLHttpRequest.prototype.setRequestHeader = (function (orig) {
    return function (header, value) {
      if (header === '__setXHR_') {
        var val = value(this);
        // fix for angular < 1.2.0
        if (val instanceof Function) {
          val(this);
        }
      } else {
        orig.apply(this, arguments);
      }
    };
  })(window.XMLHttpRequest.prototype.setRequestHeader);
}

var ngFileUpload = angular.module('ngFileUpload', []);

ngFileUpload.version = '12.0.4';

ngFileUpload.service('UploadBase', ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
  var upload = this;
  upload.promisesCount = 0;

  this.isResumeSupported = function () {
    return window.Blob && window.Blob.prototype.slice;
  };

  var resumeSupported = this.isResumeSupported();

  function sendHttp(config) {
    config.method = config.method || 'POST';
    config.headers = config.headers || {};

    var deferred = config._deferred = config._deferred || $q.defer();
    var promise = deferred.promise;

    function notifyProgress(e) {
      if (deferred.notify) {
        deferred.notify(e);
      }
      if (promise.progressFunc) {
        $timeout(function () {
          promise.progressFunc(e);
        });
      }
    }

    function getNotifyEvent(n) {
      if (config._start != null && resumeSupported) {
        return {
          loaded: n.loaded + config._start,
          total: (config._file && config._file.size) || n.total,
          type: n.type, config: config,
          lengthComputable: true, target: n.target
        };
      } else {
        return n;
      }
    }

    if (!config.disableProgress) {
      config.headers.__setXHR_ = function () {
        return function (xhr) {
          if (!xhr || !xhr.upload || !xhr.upload.addEventListener) return;
          config.__XHR = xhr;
          if (config.xhrFn) config.xhrFn(xhr);
          xhr.upload.addEventListener('progress', function (e) {
            e.config = config;
            notifyProgress(getNotifyEvent(e));
          }, false);
          //fix for firefox not firing upload progress end, also IE8-9
          xhr.upload.addEventListener('load', function (e) {
            if (e.lengthComputable) {
              e.config = config;
              notifyProgress(getNotifyEvent(e));
            }
          }, false);
        };
      };
    }

    function uploadWithAngular() {
      $http(config).then(function (r) {
          if (resumeSupported && config._chunkSize && !config._finished && config._file) {
            notifyProgress({
                loaded: config._end,
                total: config._file && config._file.size,
                config: config, type: 'progress'
              }
            );
            upload.upload(config, true);
          } else {
            if (config._finished) delete config._finished;
            deferred.resolve(r);
          }
        }, function (e) {
          deferred.reject(e);
        }, function (n) {
          deferred.notify(n);
        }
      );
    }

    if (!resumeSupported) {
      uploadWithAngular();
    } else if (config._chunkSize && config._end && !config._finished) {
      config._start = config._end;
      config._end += config._chunkSize;
      uploadWithAngular();
    } else if (config.resumeSizeUrl) {
      $http.get(config.resumeSizeUrl).then(function (resp) {
        if (config.resumeSizeResponseReader) {
          config._start = config.resumeSizeResponseReader(resp.data);
        } else {
          config._start = parseInt((resp.data.size == null ? resp.data : resp.data.size).toString());
        }
        if (config._chunkSize) {
          config._end = config._start + config._chunkSize;
        }
        uploadWithAngular();
      }, function (e) {
        throw e;
      });
    } else if (config.resumeSize) {
      config.resumeSize().then(function (size) {
        config._start = size;
        uploadWithAngular();
      }, function (e) {
        throw e;
      });
    } else {
      if (config._chunkSize) {
        config._start = 0;
        config._end = config._start + config._chunkSize;
      }
      uploadWithAngular();
    }


    promise.success = function (fn) {
      promise.then(function (response) {
        fn(response.data, response.status, response.headers, config);
      });
      return promise;
    };

    promise.error = function (fn) {
      promise.then(null, function (response) {
        fn(response.data, response.status, response.headers, config);
      });
      return promise;
    };

    promise.progress = function (fn) {
      promise.progressFunc = fn;
      promise.then(null, null, function (n) {
        fn(n);
      });
      return promise;
    };
    promise.abort = promise.pause = function () {
      if (config.__XHR) {
        $timeout(function () {
          config.__XHR.abort();
        });
      }
      return promise;
    };
    promise.xhr = function (fn) {
      config.xhrFn = (function (origXhrFn) {
        return function () {
          if (origXhrFn) origXhrFn.apply(promise, arguments);
          fn.apply(promise, arguments);
        };
      })(config.xhrFn);
      return promise;
    };

    upload.promisesCount++;
    promise['finally'](function () {
      upload.promisesCount--;
    });
    return promise;
  }

  this.isUploadInProgress = function () {
    return upload.promisesCount > 0;
  };

  this.rename = function (file, name) {
    file.ngfName = name;
    return file;
  };

  this.jsonBlob = function (val) {
    if (val != null && !angular.isString(val)) {
      val = JSON.stringify(val);
    }
    var blob = new window.Blob([val], {type: 'application/json'});
    blob._ngfBlob = true;
    return blob;
  };

  this.json = function (val) {
    return angular.toJson(val);
  };

  function copy(obj) {
    var clone = {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        clone[key] = obj[key];
      }
    }
    return clone;
  }

  this.isFile = function (file) {
    return file != null && (file instanceof window.Blob || (file.flashId && file.name && file.size));
  };

  this.upload = function (config, internal) {
    function toResumeFile(file, formData) {
      if (file._ngfBlob) return file;
      config._file = config._file || file;
      if (config._start != null && resumeSupported) {
        if (config._end && config._end >= file.size) {
          config._finished = true;
          config._end = file.size;
        }
        var slice = file.slice(config._start, config._end || file.size);
        slice.name = file.name;
        slice.ngfName = file.ngfName;
        if (config._chunkSize) {
          formData.append('_chunkSize', config._chunkSize);
          formData.append('_currentChunkSize', config._end - config._start);
          formData.append('_chunkNumber', Math.floor(config._start / config._chunkSize));
          formData.append('_totalSize', config._file.size);
        }
        return slice;
      }
      return file;
    }

    function addFieldToFormData(formData, val, key) {
      if (val !== undefined) {
        if (angular.isDate(val)) {
          val = val.toISOString();
        }
        if (angular.isString(val)) {
          formData.append(key, val);
        } else if (upload.isFile(val)) {
          var file = toResumeFile(val, formData);
          var split = key.split(',');
          if (split[1]) {
            file.ngfName = split[1].replace(/^\s+|\s+$/g, '');
            key = split[0];
          }
          config._fileKey = config._fileKey || key;
          formData.append(key, file, file.ngfName || file.name);
        } else {
          if (angular.isObject(val)) {
            if (val.$$ngfCircularDetection) throw 'ngFileUpload: Circular reference in config.data. Make sure specified data for Upload.upload() has no circular reference: ' + key;

            val.$$ngfCircularDetection = true;
            try {
              for (var k in val) {
                if (val.hasOwnProperty(k) && k !== '$$ngfCircularDetection') {
                  var objectKey = config.objectKey == null ? '[i]' : config.objectKey;
                  if (val.length && parseInt(k) > -1) {
                    objectKey = config.arrayKey == null ? objectKey : config.arrayKey;
                  }
                  addFieldToFormData(formData, val[k], key + objectKey.replace(/[ik]/g, k));
                }
              }
            } finally {
              delete val.$$ngfCircularDetection;
            }
          } else {
            formData.append(key, val);
          }
        }
      }
    }

    function digestConfig() {
      config._chunkSize = upload.translateScalars(config.resumeChunkSize);
      config._chunkSize = config._chunkSize ? parseInt(config._chunkSize.toString()) : null;

      config.headers = config.headers || {};
      config.headers['Content-Type'] = undefined;
      config.transformRequest = config.transformRequest ?
        (angular.isArray(config.transformRequest) ?
          config.transformRequest : [config.transformRequest]) : [];
      config.transformRequest.push(function (data) {
        var formData = new window.FormData(), key;
        data = data || config.fields || {};
        if (config.file) {
          data.file = config.file;
        }
        for (key in data) {
          if (data.hasOwnProperty(key)) {
            var val = data[key];
            if (config.formDataAppender) {
              config.formDataAppender(formData, key, val);
            } else {
              addFieldToFormData(formData, val, key);
            }
          }
        }

        return formData;
      });
    }

    if (!internal) config = copy(config);
    if (!config._isDigested) {
      config._isDigested = true;
      digestConfig();
    }

    return sendHttp(config);
  };

  this.http = function (config) {
    config = copy(config);
    config.transformRequest = config.transformRequest || function (data) {
        if ((window.ArrayBuffer && data instanceof window.ArrayBuffer) || data instanceof window.Blob) {
          return data;
        }
        return $http.defaults.transformRequest[0].apply(this, arguments);
      };
    config._chunkSize = upload.translateScalars(config.resumeChunkSize);
    config._chunkSize = config._chunkSize ? parseInt(config._chunkSize.toString()) : null;

    return sendHttp(config);
  };

  this.translateScalars = function (str) {
    if (angular.isString(str)) {
      if (str.search(/kb/i) === str.length - 2) {
        return parseFloat(str.substring(0, str.length - 2) * 1024);
      } else if (str.search(/mb/i) === str.length - 2) {
        return parseFloat(str.substring(0, str.length - 2) * 1048576);
      } else if (str.search(/gb/i) === str.length - 2) {
        return parseFloat(str.substring(0, str.length - 2) * 1073741824);
      } else if (str.search(/b/i) === str.length - 1) {
        return parseFloat(str.substring(0, str.length - 1));
      } else if (str.search(/s/i) === str.length - 1) {
        return parseFloat(str.substring(0, str.length - 1));
      } else if (str.search(/m/i) === str.length - 1) {
        return parseFloat(str.substring(0, str.length - 1) * 60);
      } else if (str.search(/h/i) === str.length - 1) {
        return parseFloat(str.substring(0, str.length - 1) * 3600);
      }
    }
    return str;
  };

  this.urlToBlob = function(url) {
    var defer = $q.defer();
    $http({url: url, method: 'get', responseType: 'arraybuffer'}).then(function (resp) {
      var arrayBufferView = new Uint8Array(resp.data);
      var type = resp.headers('content-type') || 'image/WebP';
      var blob = new window.Blob([arrayBufferView], {type: type});
      defer.resolve(blob);
      //var split = type.split('[/;]');
      //blob.name = url.substring(0, 150).replace(/\W+/g, '') + '.' + (split.length > 1 ? split[1] : 'jpg');
    }, function (e) {
      defer.reject(e);
    });
    return defer.promise;
  };

  this.setDefaults = function (defaults) {
    this.defaults = defaults || {};
  };

  this.defaults = {};
  this.version = ngFileUpload.version;
}

]);

ngFileUpload.service('Upload', ['$parse', '$timeout', '$compile', '$q', 'UploadExif', function ($parse, $timeout, $compile, $q, UploadExif) {
  var upload = UploadExif;
  upload.getAttrWithDefaults = function (attr, name) {
    if (attr[name] != null) return attr[name];
    var def = upload.defaults[name];
    return (def == null ? def : (angular.isString(def) ? def : JSON.stringify(def)));
  };

  upload.attrGetter = function (name, attr, scope, params) {
    var attrVal = this.getAttrWithDefaults(attr, name);
    if (scope) {
      try {
        if (params) {
          return $parse(attrVal)(scope, params);
        } else {
          return $parse(attrVal)(scope);
        }
      } catch (e) {
        // hangle string value without single qoute
        if (name.search(/min|max|pattern/i)) {
          return attrVal;
        } else {
          throw e;
        }
      }
    } else {
      return attrVal;
    }
  };

  upload.shouldUpdateOn = function (type, attr, scope) {
    var modelOptions = upload.attrGetter('ngModelOptions', attr, scope);
    if (modelOptions && modelOptions.updateOn) {
      return modelOptions.updateOn.split(' ').indexOf(type) > -1;
    }
    return true;
  };

  upload.emptyPromise = function () {
    var d = $q.defer();
    var args = arguments;
    $timeout(function () {
      d.resolve.apply(d, args);
    });
    return d.promise;
  };

  upload.rejectPromise = function () {
    var d = $q.defer();
    var args = arguments;
    $timeout(function () {
      d.reject.apply(d, args);
    });
    return d.promise;
  };

  upload.happyPromise = function (promise, data) {
    var d = $q.defer();
    promise.then(function (result) {
      d.resolve(result);
    }, function (error) {
      $timeout(function () {
        throw error;
      });
      d.resolve(data);
    });
    return d.promise;
  };

  function applyExifRotations(files, attr, scope) {
    var promises = [upload.emptyPromise()];
    angular.forEach(files, function (f, i) {
      if (f.type.indexOf('image/jpeg') === 0 && upload.attrGetter('ngfFixOrientation', attr, scope, {$file: f})) {
        promises.push(upload.happyPromise(upload.applyExifRotation(f), f).then(function (fixedFile) {
          files.splice(i, 1, fixedFile);
        }));
      }
    });
    return $q.all(promises);
  }

  function resize(files, attr, scope) {
    var resizeVal = upload.attrGetter('ngfResize', attr, scope);
    if (!resizeVal || !upload.isResizeSupported() || !files.length) return upload.emptyPromise();
    if (resizeVal instanceof Function) {
      var defer = $q.defer();
      resizeVal(files).then(function (p) {
        resizeWithParams(p, files, attr, scope).then(function (r) {
          defer.resolve(r);
        }, function (e) {
          defer.reject(e);
        });
      }, function (e) {
        defer.reject(e);
      });
    } else {
      return resizeWithParams(resizeVal, files, attr, scope);
    }
  }

  function resizeWithParams(param, files, attr, scope) {
    var promises = [upload.emptyPromise()];

    function handleFile(f, i) {
      if (f.type.indexOf('image') === 0) {
        if (param.pattern && !upload.validatePattern(f, param.pattern)) return;
        var promise = upload.resize(f, param.width, param.height, param.quality,
          param.type, param.ratio, param.centerCrop, function (width, height) {
            return upload.attrGetter('ngfResizeIf', attr, scope,
              {$width: width, $height: height, $file: f});
          }, param.restoreExif !== false);
        promises.push(promise);
        promise.then(function (resizedFile) {
          files.splice(i, 1, resizedFile);
        }, function (e) {
          f.$error = 'resize';
          f.$errorParam = (e ? (e.message ? e.message : e) + ': ' : '') + (f && f.name);
        });
      }
    }

    for (var i = 0; i < files.length; i++) {
      handleFile(files[i], i);
    }
    return $q.all(promises);
  }

  upload.updateModel = function (ngModel, attr, scope, fileChange, files, evt, noDelay) {
    function update(files, invalidFiles, newFiles, dupFiles, isSingleModel) {
      attr.$$ngfPrevValidFiles = files;
      attr.$$ngfPrevInvalidFiles = invalidFiles;
      var file = files && files.length ? files[0] : null;
      var invalidFile = invalidFiles && invalidFiles.length ? invalidFiles[0] : null;

      if (ngModel) {
        upload.applyModelValidation(ngModel, files);
        ngModel.$setViewValue(isSingleModel ? file : files);
      }

      if (fileChange) {
        $parse(fileChange)(scope, {
          $files: files,
          $file: file,
          $newFiles: newFiles,
          $duplicateFiles: dupFiles,
          $invalidFiles: invalidFiles,
          $invalidFile: invalidFile,
          $event: evt
        });
      }

      var invalidModel = upload.attrGetter('ngfModelInvalid', attr);
      if (invalidModel) {
        $timeout(function () {
          $parse(invalidModel).assign(scope, isSingleModel ? invalidFile : invalidFiles);
        });
      }
      $timeout(function () {
        // scope apply changes
      });
    }

    var allNewFiles, dupFiles = [], prevValidFiles, prevInvalidFiles,
      invalids = [], valids = [];

    function removeDuplicates() {
      function equals(f1, f2) {
        return f1.name === f2.name && (f1.$ngfOrigSize || f1.size) === (f2.$ngfOrigSize || f2.size) &&
          f1.type === f2.type;
      }

      function isInPrevFiles(f) {
        var j;
        for (j = 0; j < prevValidFiles.length; j++) {
          if (equals(f, prevValidFiles[j])) {
            return true;
          }
        }
        for (j = 0; j < prevInvalidFiles.length; j++) {
          if (equals(f, prevInvalidFiles[j])) {
            return true;
          }
        }
        return false;
      }

      if (files) {
        allNewFiles = [];
        dupFiles = [];
        for (var i = 0; i < files.length; i++) {
          if (isInPrevFiles(files[i])) {
            dupFiles.push(files[i]);
          } else {
            allNewFiles.push(files[i]);
          }
        }
      }
    }

    function toArray(v) {
      return angular.isArray(v) ? v : [v];
    }

    function separateInvalids() {
      valids = [];
      invalids = [];
      angular.forEach(allNewFiles, function (file) {
        if (file.$error) {
          invalids.push(file);
        } else {
          valids.push(file);
        }
      });
    }

    function resizeAndUpdate() {
      function updateModel() {
        $timeout(function () {
          update(keep ? prevValidFiles.concat(valids) : valids,
            keep ? prevInvalidFiles.concat(invalids) : invalids,
            files, dupFiles, isSingleModel);
        }, options && options.debounce ? options.debounce.change || options.debounce : 0);
      }

      resize(validateAfterResize ? allNewFiles : valids, attr, scope).then(function () {
        if (validateAfterResize) {
          upload.validate(allNewFiles, prevValidFiles.length, ngModel, attr, scope).then(function () {
            separateInvalids();
            updateModel();
          });
        } else {
          updateModel();
        }
      }, function (e) {
        throw 'Could not resize files ' + e;
      });
    }

    prevValidFiles = attr.$$ngfPrevValidFiles || [];
    prevInvalidFiles = attr.$$ngfPrevInvalidFiles || [];
    if (ngModel && ngModel.$modelValue) {
      prevValidFiles = toArray(ngModel.$modelValue);
    }

    var keep = upload.attrGetter('ngfKeep', attr, scope);
    allNewFiles = (files || []).slice(0);
    if (keep === 'distinct' || upload.attrGetter('ngfKeepDistinct', attr, scope) === true) {
      removeDuplicates(attr, scope);
    }

    var isSingleModel = !keep && !upload.attrGetter('ngfMultiple', attr, scope) && !upload.attrGetter('multiple', attr);

    if (keep && !allNewFiles.length) return;

    upload.attrGetter('ngfBeforeModelChange', attr, scope, {
      $files: files,
      $file: files && files.length ? files[0] : null,
      $newFiles: allNewFiles,
      $duplicateFiles: dupFiles,
      $event: evt
    });

    var validateAfterResize = upload.attrGetter('ngfValidateAfterResize', attr, scope);

    var options = upload.attrGetter('ngModelOptions', attr, scope);
    upload.validate(allNewFiles, prevValidFiles.length, ngModel, attr, scope).then(function () {
      if (noDelay) {
        update(allNewFiles, [], files, dupFiles, isSingleModel);
      } else {
        if ((!options || !options.allowInvalid) && !validateAfterResize) {
          separateInvalids();
        } else {
          valids = allNewFiles;
        }
        if (upload.attrGetter('ngfFixOrientation', attr, scope) && upload.isExifSupported()) {
          applyExifRotations(valids, attr, scope).then(function () {
            resizeAndUpdate();
          });
        } else {
          resizeAndUpdate();
        }
      }
    });
  };

  return upload;
}]);

ngFileUpload.directive('ngfSelect', ['$parse', '$timeout', '$compile', 'Upload', function ($parse, $timeout, $compile, Upload) {
  var generatedElems = [];

  function isDelayedClickSupported(ua) {
    // fix for android native browser < 4.4 and safari windows
    var m = ua.match(/Android[^\d]*(\d+)\.(\d+)/);
    if (m && m.length > 2) {
      var v = Upload.defaults.androidFixMinorVersion || 4;
      return parseInt(m[1]) < 4 || (parseInt(m[1]) === v && parseInt(m[2]) < v);
    }

    // safari on windows
    return ua.indexOf('Chrome') === -1 && /.*Windows.*Safari.*/.test(ua);
  }

  function linkFileSelect(scope, elem, attr, ngModel, $parse, $timeout, $compile, upload) {
    /** @namespace attr.ngfSelect */
    /** @namespace attr.ngfChange */
    /** @namespace attr.ngModel */
    /** @namespace attr.ngModelOptions */
    /** @namespace attr.ngfMultiple */
    /** @namespace attr.ngfCapture */
    /** @namespace attr.ngfValidate */
    /** @namespace attr.ngfKeep */
    var attrGetter = function (name, scope) {
      return upload.attrGetter(name, attr, scope);
    };

    function isInputTypeFile() {
      return elem[0].tagName.toLowerCase() === 'input' && attr.type && attr.type.toLowerCase() === 'file';
    }

    function fileChangeAttr() {
      return attrGetter('ngfChange') || attrGetter('ngfSelect');
    }

    function changeFn(evt) {
      if (upload.shouldUpdateOn('change', attr, scope)) {
        var fileList = evt.__files_ || (evt.target && evt.target.files), files = [];
        for (var i = 0; i < fileList.length; i++) {
          files.push(fileList[i]);
        }
        upload.updateModel(ngModel, attr, scope, fileChangeAttr(),
          files.length ? files : null, evt);
      }
    }

    upload.registerModelChangeValidator(ngModel, attr, scope);

    var unwatches = [];
    unwatches.push(scope.$watch(attrGetter('ngfMultiple'), function () {
      fileElem.attr('multiple', attrGetter('ngfMultiple', scope));
    }));
    unwatches.push(scope.$watch(attrGetter('ngfCapture'), function () {
      fileElem.attr('capture', attrGetter('ngfCapture', scope));
    }));
    unwatches.push(scope.$watch(attrGetter('ngfAccept'), function () {
      fileElem.attr('accept', attrGetter('ngfAccept', scope));
    }));
    attr.$observe('accept', function () {
      fileElem.attr('accept', attrGetter('accept'));
    });
    unwatches.push(function () {
      if (attr.$$observers) delete attr.$$observers.accept;
    });
    function bindAttrToFileInput(fileElem) {
      if (elem !== fileElem) {
        for (var i = 0; i < elem[0].attributes.length; i++) {
          var attribute = elem[0].attributes[i];
          if (attribute.name !== 'type' && attribute.name !== 'class' && attribute.name !== 'style') {
            if (attribute.value == null || attribute.value === '') {
              if (attribute.name === 'required') attribute.value = 'required';
              if (attribute.name === 'multiple') attribute.value = 'multiple';
            }
            fileElem.attr(attribute.name, attribute.name === 'id' ? 'ngf-' + attribute.value : attribute.value);
          }
        }
      }
    }

    function createFileInput() {
      if (isInputTypeFile()) {
        return elem;
      }

      var fileElem = angular.element('<input type="file">');

      bindAttrToFileInput(fileElem);

      var label = angular.element('<label>upload</label>');
      label.css('visibility', 'hidden').css('position', 'absolute').css('overflow', 'hidden')
        .css('width', '0px').css('height', '0px').css('border', 'none')
        .css('margin', '0px').css('padding', '0px').attr('tabindex', '-1');
      generatedElems.push({el: elem, ref: label});

      document.body.appendChild(label.append(fileElem)[0]);

      return fileElem;
    }

    var initialTouchStartY = 0;

    function clickHandler(evt) {
      if (elem.attr('disabled')) return false;
      if (attrGetter('ngfSelectDisabled', scope)) return;

      var r = handleTouch(evt);
      if (r != null) return r;

      resetModel(evt);

      // fix for md when the element is removed from the DOM and added back #460
      try {
        if (!isInputTypeFile() && !document.body.contains(fileElem[0])) {
          generatedElems.push({el: elem, ref: fileElem.parent()});
          document.body.appendChild(fileElem.parent()[0]);
          fileElem.bind('change', changeFn);
        }
      } catch(e){/*ignore*/}

      if (isDelayedClickSupported(navigator.userAgent)) {
        setTimeout(function () {
          fileElem[0].click();
        }, 0);
      } else {
        fileElem[0].click();
      }

      return false;
    }

    function handleTouch(evt) {
      var touches = evt.changedTouches || (evt.originalEvent && evt.originalEvent.changedTouches);
      if (evt.type === 'touchstart') {
        initialTouchStartY = touches ? touches[0].clientY : 0;
        return true; // don't block event default
      } else {
        evt.stopPropagation();
        evt.preventDefault();

        // prevent scroll from triggering event
        if (evt.type === 'touchend') {
          var currentLocation = touches ? touches[0].clientY : 0;
          if (Math.abs(currentLocation - initialTouchStartY) > 20) return false;
        }
      }
    }

    var fileElem = elem;

    function resetModel(evt) {
      if (upload.shouldUpdateOn('click', attr, scope) && fileElem.val()) {
        fileElem.val(null);
        upload.updateModel(ngModel, attr, scope, fileChangeAttr(), null, evt, true);
      }
    }

    if (!isInputTypeFile()) {
      fileElem = createFileInput();
    }
    fileElem.bind('change', changeFn);

    if (!isInputTypeFile()) {
      elem.bind('click touchstart touchend', clickHandler);
    } else {
      elem.bind('click', resetModel);
    }

    function ie10SameFileSelectFix(evt) {
      if (fileElem && !fileElem.attr('__ngf_ie10_Fix_')) {
        if (!fileElem[0].parentNode) {
          fileElem = null;
          return;
        }
        evt.preventDefault();
        evt.stopPropagation();
        fileElem.unbind('click');
        var clone = fileElem.clone();
        fileElem.replaceWith(clone);
        fileElem = clone;
        fileElem.attr('__ngf_ie10_Fix_', 'true');
        fileElem.bind('change', changeFn);
        fileElem.bind('click', ie10SameFileSelectFix);
        fileElem[0].click();
        return false;
      } else {
        fileElem.removeAttr('__ngf_ie10_Fix_');
      }
    }

    if (navigator.appVersion.indexOf('MSIE 10') !== -1) {
      fileElem.bind('click', ie10SameFileSelectFix);
    }

    if (ngModel) ngModel.$formatters.push(function (val) {
      if (val == null || val.length === 0) {
        if (fileElem.val()) {
          fileElem.val(null);
        }
      }
      return val;
    });

    scope.$on('$destroy', function () {
      if (!isInputTypeFile()) fileElem.parent().remove();
      angular.forEach(unwatches, function (unwatch) {
        unwatch();
      });
    });

    $timeout(function () {
      for (var i = 0; i < generatedElems.length; i++) {
        var g = generatedElems[i];
        if (!document.body.contains(g.el[0])) {
          generatedElems.splice(i, 1);
          g.ref.remove();
        }
      }
    });

    if (window.FileAPI && window.FileAPI.ngfFixIE) {
      window.FileAPI.ngfFixIE(elem, fileElem, changeFn);
    }
  }

  return {
    restrict: 'AEC',
    require: '?ngModel',
    link: function (scope, elem, attr, ngModel) {
      linkFileSelect(scope, elem, attr, ngModel, $parse, $timeout, $compile, Upload);
    }
  };
}]);

(function () {

  ngFileUpload.service('UploadDataUrl', ['UploadBase', '$timeout', '$q', function (UploadBase, $timeout, $q) {
    var upload = UploadBase;
    upload.base64DataUrl = function (file) {
      if (angular.isArray(file)) {
        var d = $q.defer(), count = 0;
        angular.forEach(file, function (f) {
          upload.dataUrl(f, true)['finally'](function () {
            count++;
            if (count === file.length) {
              var urls = [];
              angular.forEach(file, function (ff) {
                urls.push(ff.$ngfDataUrl);
              });
              d.resolve(urls, file);
            }
          });
        });
        return d.promise;
      } else {
        return upload.dataUrl(file, true);
      }
    };
    upload.dataUrl = function (file, disallowObjectUrl) {
      if (!file) return upload.emptyPromise(file, file);
      if ((disallowObjectUrl && file.$ngfDataUrl != null) || (!disallowObjectUrl && file.$ngfBlobUrl != null)) {
        return upload.emptyPromise(disallowObjectUrl ? file.$ngfDataUrl : file.$ngfBlobUrl, file);
      }
      var p = disallowObjectUrl ? file.$$ngfDataUrlPromise : file.$$ngfBlobUrlPromise;
      if (p) return p;

      var deferred = $q.defer();
      $timeout(function () {
        if (window.FileReader && file &&
          (!window.FileAPI || navigator.userAgent.indexOf('MSIE 8') === -1 || file.size < 20000) &&
          (!window.FileAPI || navigator.userAgent.indexOf('MSIE 9') === -1 || file.size < 4000000)) {
          //prefer URL.createObjectURL for handling refrences to files of all sizes
          //since it doesn´t build a large string in memory
          var URL = window.URL || window.webkitURL;
          if (URL && URL.createObjectURL && !disallowObjectUrl) {
            var url;
            try {
              url = URL.createObjectURL(file);
            } catch (e) {
              $timeout(function () {
                file.$ngfBlobUrl = '';
                deferred.reject();
              });
              return;
            }
            $timeout(function () {
              file.$ngfBlobUrl = url;
              if (url) {
                deferred.resolve(url, file);
                upload.blobUrls = upload.blobUrls || [];
                upload.blobUrlsTotalSize = upload.blobUrlsTotalSize || 0;
                upload.blobUrls.push({url: url, size: file.size});
                upload.blobUrlsTotalSize += file.size || 0;
                var maxMemory = upload.defaults.blobUrlsMaxMemory || 268435456;
                var maxLength = upload.defaults.blobUrlsMaxQueueSize || 200;
                while ((upload.blobUrlsTotalSize > maxMemory || upload.blobUrls.length > maxLength) && upload.blobUrls.length > 1) {
                  var obj = upload.blobUrls.splice(0, 1)[0];
                  URL.revokeObjectURL(obj.url);
                  upload.blobUrlsTotalSize -= obj.size;
                }
              }
            });
          } else {
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
              $timeout(function () {
                file.$ngfDataUrl = e.target.result;
                deferred.resolve(e.target.result, file);
                $timeout(function () {
                  delete file.$ngfDataUrl;
                }, 1000);
              });
            };
            fileReader.onerror = function () {
              $timeout(function () {
                file.$ngfDataUrl = '';
                deferred.reject();
              });
            };
            fileReader.readAsDataURL(file);
          }
        } else {
          $timeout(function () {
            file[disallowObjectUrl ? '$ngfDataUrl' : '$ngfBlobUrl'] = '';
            deferred.reject();
          });
        }
      });

      if (disallowObjectUrl) {
        p = file.$$ngfDataUrlPromise = deferred.promise;
      } else {
        p = file.$$ngfBlobUrlPromise = deferred.promise;
      }
      p['finally'](function () {
        delete file[disallowObjectUrl ? '$$ngfDataUrlPromise' : '$$ngfBlobUrlPromise'];
      });
      return p;
    };
    return upload;
  }]);

  function getTagType(el) {
    if (el.tagName.toLowerCase() === 'img') return 'image';
    if (el.tagName.toLowerCase() === 'audio') return 'audio';
    if (el.tagName.toLowerCase() === 'video') return 'video';
    return /./;
  }

  function linkFileDirective(Upload, $timeout, scope, elem, attr, directiveName, resizeParams, isBackground) {
    function constructDataUrl(file) {
      var disallowObjectUrl = Upload.attrGetter('ngfNoObjectUrl', attr, scope);
      Upload.dataUrl(file, disallowObjectUrl)['finally'](function () {
        $timeout(function () {
          var src = (disallowObjectUrl ? file.$ngfDataUrl : file.$ngfBlobUrl) || file.$ngfDataUrl;
          if (isBackground) {
            elem.css('background-image', 'url(\'' + (src || '') + '\')');
          } else {
            elem.attr('src', src);
          }
          if (src) {
            elem.removeClass('ng-hide');
          } else {
            elem.addClass('ng-hide');
          }
        });
      });
    }

    $timeout(function () {
      var unwatch = scope.$watch(attr[directiveName], function (file) {
        var size = resizeParams;
        if (directiveName === 'ngfThumbnail') {
          if (!size) {
            size = {width: elem[0].clientWidth, height: elem[0].clientHeight};
          }
          if (size.width === 0 && window.getComputedStyle) {
            var style = getComputedStyle(elem[0]);
            size = {
              width: parseInt(style.width.slice(0, -2)),
              height: parseInt(style.height.slice(0, -2))
            };
          }
        }

        if (angular.isString(file)) {
          elem.removeClass('ng-hide');
          if (isBackground) {
            return elem.css('background-image', 'url(\'' + file + '\')');
          } else {
            return elem.attr('src', file);
          }
        }
        if (file && file.type && file.type.search(getTagType(elem[0])) === 0 &&
          (!isBackground || file.type.indexOf('image') === 0)) {
          if (size && Upload.isResizeSupported()) {
            Upload.resize(file, size.width, size.height, size.quality).then(
              function (f) {
                constructDataUrl(f);
              }, function (e) {
                throw e;
              }
            );
          } else {
            constructDataUrl(file);
          }
        } else {
          elem.addClass('ng-hide');
        }
      });

      scope.$on('$destroy', function () {
        unwatch();
      });
    });
  }


  /** @namespace attr.ngfSrc */
  /** @namespace attr.ngfNoObjectUrl */
  ngFileUpload.directive('ngfSrc', ['Upload', '$timeout', function (Upload, $timeout) {
    return {
      restrict: 'AE',
      link: function (scope, elem, attr) {
        linkFileDirective(Upload, $timeout, scope, elem, attr, 'ngfSrc',
          Upload.attrGetter('ngfResize', attr, scope), false);
      }
    };
  }]);

  /** @namespace attr.ngfBackground */
  /** @namespace attr.ngfNoObjectUrl */
  ngFileUpload.directive('ngfBackground', ['Upload', '$timeout', function (Upload, $timeout) {
    return {
      restrict: 'AE',
      link: function (scope, elem, attr) {
        linkFileDirective(Upload, $timeout, scope, elem, attr, 'ngfBackground',
          Upload.attrGetter('ngfResize', attr, scope), true);
      }
    };
  }]);

  /** @namespace attr.ngfThumbnail */
  /** @namespace attr.ngfAsBackground */
  /** @namespace attr.ngfSize */
  /** @namespace attr.ngfNoObjectUrl */
  ngFileUpload.directive('ngfThumbnail', ['Upload', '$timeout', function (Upload, $timeout) {
    return {
      restrict: 'AE',
      link: function (scope, elem, attr) {
        var size = Upload.attrGetter('ngfSize', attr, scope);
        linkFileDirective(Upload, $timeout, scope, elem, attr, 'ngfThumbnail', size,
          Upload.attrGetter('ngfAsBackground', attr, scope));
      }
    };
  }]);

  ngFileUpload.config(['$compileProvider', function ($compileProvider) {
    if ($compileProvider.imgSrcSanitizationWhitelist) $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|local|file|data|blob):/);
    if ($compileProvider.aHrefSanitizationWhitelist) $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|local|file|data|blob):/);
  }]);

  ngFileUpload.filter('ngfDataUrl', ['UploadDataUrl', '$sce', function (UploadDataUrl, $sce) {
    return function (file, disallowObjectUrl, trustedUrl) {
      if (angular.isString(file)) {
        return $sce.trustAsResourceUrl(file);
      }
      var src = file && ((disallowObjectUrl ? file.$ngfDataUrl : file.$ngfBlobUrl) || file.$ngfDataUrl);
      if (file && !src) {
        if (!file.$ngfDataUrlFilterInProgress && angular.isObject(file)) {
          file.$ngfDataUrlFilterInProgress = true;
          UploadDataUrl.dataUrl(file, disallowObjectUrl);
        }
        return '';
      }
      if (file) delete file.$ngfDataUrlFilterInProgress;
      return (file && src ? (trustedUrl ? $sce.trustAsResourceUrl(src) : src) : file) || '';
    };
  }]);

})();

ngFileUpload.service('UploadValidate', ['UploadDataUrl', '$q', '$timeout', function (UploadDataUrl, $q, $timeout) {
  var upload = UploadDataUrl;

  function globStringToRegex(str) {
    var regexp = '', excludes = [];
    if (str.length > 2 && str[0] === '/' && str[str.length - 1] === '/') {
      regexp = str.substring(1, str.length - 1);
    } else {
      var split = str.split(',');
      if (split.length > 1) {
        for (var i = 0; i < split.length; i++) {
          var r = globStringToRegex(split[i]);
          if (r.regexp) {
            regexp += '(' + r.regexp + ')';
            if (i < split.length - 1) {
              regexp += '|';
            }
          } else {
            excludes = excludes.concat(r.excludes);
          }
        }
      } else {
        if (str.indexOf('!') === 0) {
          excludes.push('^((?!' + globStringToRegex(str.substring(1)).regexp + ').)*$');
        } else {
          if (str.indexOf('.') === 0) {
            str = '*' + str;
          }
          regexp = '^' + str.replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]', 'g'), '\\$&') + '$';
          regexp = regexp.replace(/\\\*/g, '.*').replace(/\\\?/g, '.');
        }
      }
    }
    return {regexp: regexp, excludes: excludes};
  }

  upload.validatePattern = function (file, val) {
    if (!val) {
      return true;
    }
    var pattern = globStringToRegex(val), valid = true;
    if (pattern.regexp && pattern.regexp.length) {
      var regexp = new RegExp(pattern.regexp, 'i');
      valid = (file.type != null && regexp.test(file.type)) ||
        (file.name != null && regexp.test(file.name));
    }
    var len = pattern.excludes.length;
    while (len--) {
      var exclude = new RegExp(pattern.excludes[len], 'i');
      valid = valid && (file.type == null || exclude.test(file.type)) &&
        (file.name == null || exclude.test(file.name));
    }
    return valid;
  };

  upload.ratioToFloat = function (val) {
    var r = val.toString(), xIndex = r.search(/[x:]/i);
    if (xIndex > -1) {
      r = parseFloat(r.substring(0, xIndex)) / parseFloat(r.substring(xIndex + 1));
    } else {
      r = parseFloat(r);
    }
    return r;
  };

  upload.registerModelChangeValidator = function (ngModel, attr, scope) {
    if (ngModel) {
      ngModel.$formatters.push(function (files) {
        if (ngModel.$dirty) {
          if (files && !angular.isArray(files)) {
            files = [files];
          }
          upload.validate(files, 0, ngModel, attr, scope).then(function () {
            upload.applyModelValidation(ngModel, files);
          });
        }
      });
    }
  };

  function markModelAsDirty(ngModel, files) {
    if (files != null && !ngModel.$dirty) {
      if (ngModel.$setDirty) {
        ngModel.$setDirty();
      } else {
        ngModel.$dirty = true;
      }
    }
  }

  upload.applyModelValidation = function (ngModel, files) {
    markModelAsDirty(ngModel, files);
    angular.forEach(ngModel.$ngfValidations, function (validation) {
      ngModel.$setValidity(validation.name, validation.valid);
    });
  };

  upload.getValidationAttr = function (attr, scope, name, validationName, file) {
    var dName = 'ngf' + name[0].toUpperCase() + name.substr(1);
    var val = upload.attrGetter(dName, attr, scope, {$file: file});
    if (val == null) {
      val = upload.attrGetter('ngfValidate', attr, scope, {$file: file});
      if (val) {
        var split = (validationName || name).split('.');
        val = val[split[0]];
        if (split.length > 1) {
          val = val && val[split[1]];
        }
      }
    }
    return val;
  };

  upload.validate = function (files, prevLength, ngModel, attr, scope) {
    ngModel = ngModel || {};
    ngModel.$ngfValidations = ngModel.$ngfValidations || [];

    angular.forEach(ngModel.$ngfValidations, function (v) {
      v.valid = true;
    });

    var attrGetter = function (name, params) {
      return upload.attrGetter(name, attr, scope, params);
    };

    if (files == null || files.length === 0) {
      return upload.emptyPromise(ngModel);
    }

    files = files.length === undefined ? [files] : files.slice(0);

    function validateSync(name, validationName, fn) {
      if (files) {
        var i = files.length, valid = null;
        while (i--) {
          var file = files[i];
          if (file) {
            var val = upload.getValidationAttr(attr, scope, name, validationName, file);
            if (val != null) {
              if (!fn(file, val, i)) {
                file.$error = name;
                (file.$errorMessages = (file.$errorMessages || {}))[name] = true;
                file.$errorParam = val;
                files.splice(i, 1);
                valid = false;
              }
            }
          }
        }
        if (valid !== null) {
          ngModel.$ngfValidations.push({name: name, valid: valid});
        }
      }
    }

    validateSync('maxFiles', null, function (file, val, i) {
      return prevLength + i < val;
    });
    validateSync('pattern', null, upload.validatePattern);
    validateSync('minSize', 'size.min', function (file, val) {
      return file.size + 0.1 >= upload.translateScalars(val);
    });
    validateSync('maxSize', 'size.max', function (file, val) {
      return file.size - 0.1 <= upload.translateScalars(val);
    });
    var totalSize = 0;
    validateSync('maxTotalSize', null, function (file, val) {
      totalSize += file.size;
      if (totalSize > upload.translateScalars(val)) {
        files.splice(0, files.length);
        return false;
      }
      return true;
    });

    validateSync('validateFn', null, function (file, r) {
      return r === true || r === null || r === '';
    });

    if (!files.length) {
      return upload.emptyPromise(ngModel, ngModel.$ngfValidations);
    }

    function validateAsync(name, validationName, type, asyncFn, fn) {
      function resolveResult(defer, file, val) {
        if (val != null) {
          asyncFn(file, val).then(function (d) {
            if (!fn(d, val)) {
              file.$error = name;
              (file.$errorMessages = (file.$errorMessages || {}))[name] = true;
              file.$errorParam = val;
              defer.reject();
            } else {
              defer.resolve();
            }
          }, function () {
            if (attrGetter('ngfValidateForce', {$file: file})) {
              file.$error = name;
              (file.$errorMessages = (file.$errorMessages || {}))[name] = true;
              file.$errorParam = val;
              defer.reject();
            } else {
              defer.resolve();
            }
          });
        } else {
          defer.resolve();
        }
      }

      var promises = [upload.emptyPromise()];
      if (files) {
        files = files.length === undefined ? [files] : files;
        angular.forEach(files, function (file) {
          var defer = $q.defer();
          promises.push(defer.promise);
          if (type && (file.type == null || file.type.search(type) !== 0)) {
            defer.resolve();
            return;
          }
          if (name === 'dimensions' && upload.attrGetter('ngfDimensions', attr) != null) {
            upload.imageDimensions(file).then(function (d) {
              resolveResult(defer, file,
                attrGetter('ngfDimensions', {$file: file, $width: d.width, $height: d.height}));
            }, function () {
              defer.reject();
            });
          } else if (name === 'duration' && upload.attrGetter('ngfDuration', attr) != null) {
            upload.mediaDuration(file).then(function (d) {
              resolveResult(defer, file,
                attrGetter('ngfDuration', {$file: file, $duration: d}));
            }, function () {
              defer.reject();
            });
          } else {
            resolveResult(defer, file,
              upload.getValidationAttr(attr, scope, name, validationName, file));
          }
        });
        return $q.all(promises).then(function () {
          ngModel.$ngfValidations.push({name: name, valid: true});
        }, function () {
          ngModel.$ngfValidations.push({name: name, valid: false});
        });
      }
    }

    var deffer = $q.defer();
    var promises = [];

    promises.push(upload.happyPromise(validateAsync('maxHeight', 'height.max', /image/,
      this.imageDimensions, function (d, val) {
        return d.height <= val;
      })));
    promises.push(upload.happyPromise(validateAsync('minHeight', 'height.min', /image/,
      this.imageDimensions, function (d, val) {
        return d.height >= val;
      })));
    promises.push(upload.happyPromise(validateAsync('maxWidth', 'width.max', /image/,
      this.imageDimensions, function (d, val) {
        return d.width <= val;
      })));
    promises.push(upload.happyPromise(validateAsync('minWidth', 'width.min', /image/,
      this.imageDimensions, function (d, val) {
        return d.width >= val;
      })));
    promises.push(upload.happyPromise(validateAsync('dimensions', null, /image/,
      function (file, val) {
        return upload.emptyPromise(val);
      }, function (r) {
        return r;
      })));
    promises.push(upload.happyPromise(validateAsync('ratio', null, /image/,
      this.imageDimensions, function (d, val) {
        var split = val.toString().split(','), valid = false;
        for (var i = 0; i < split.length; i++) {
          if (Math.abs((d.width / d.height) - upload.ratioToFloat(split[i])) < 0.0001) {
            valid = true;
          }
        }
        return valid;
      })));
    promises.push(upload.happyPromise(validateAsync('maxRatio', 'ratio.max', /image/,
      this.imageDimensions, function (d, val) {
        return (d.width / d.height) - upload.ratioToFloat(val) < 0.0001;
      })));
    promises.push(upload.happyPromise(validateAsync('minRatio', 'ratio.min', /image/,
      this.imageDimensions, function (d, val) {
        return (d.width / d.height) - upload.ratioToFloat(val) > -0.0001;
      })));
    promises.push(upload.happyPromise(validateAsync('maxDuration', 'duration.max', /audio|video/,
      this.mediaDuration, function (d, val) {
        return d <= upload.translateScalars(val);
      })));
    promises.push(upload.happyPromise(validateAsync('minDuration', 'duration.min', /audio|video/,
      this.mediaDuration, function (d, val) {
        return d >= upload.translateScalars(val);
      })));
    promises.push(upload.happyPromise(validateAsync('duration', null, /audio|video/,
      function (file, val) {
        return upload.emptyPromise(val);
      }, function (r) {
        return r;
      })));

    promises.push(upload.happyPromise(validateAsync('validateAsyncFn', null, null,
      function (file, val) {
        return val;
      }, function (r) {
        return r === true || r === null || r === '';
      })));

    return $q.all(promises).then(function () {
      deffer.resolve(ngModel, ngModel.$ngfValidations);
    });
  };

  upload.imageDimensions = function (file) {
    if (file.$ngfWidth && file.$ngfHeight) {
      var d = $q.defer();
      $timeout(function () {
        d.resolve({width: file.$ngfWidth, height: file.$ngfHeight});
      });
      return d.promise;
    }
    if (file.$ngfDimensionPromise) return file.$ngfDimensionPromise;

    var deferred = $q.defer();
    $timeout(function () {
      if (file.type.indexOf('image') !== 0) {
        deferred.reject('not image');
        return;
      }
      upload.dataUrl(file).then(function (dataUrl) {
        var img = angular.element('<img>').attr('src', dataUrl)
          .css('visibility', 'hidden').css('position', 'fixed')
          .css('max-width', 'none !important').css('max-height', 'none !important');

        function success() {
          var width = img[0].clientWidth;
          var height = img[0].clientHeight;
          img.remove();
          file.$ngfWidth = width;
          file.$ngfHeight = height;
          deferred.resolve({width: width, height: height});
        }

        function error() {
          img.remove();
          deferred.reject('load error');
        }

        img.on('load', success);
        img.on('error', error);
        var count = 0;

        function checkLoadError() {
          $timeout(function () {
            if (img[0].parentNode) {
              if (img[0].clientWidth) {
                success();
              } else if (count > 10) {
                error();
              } else {
                checkLoadError();
              }
            }
          }, 1000);
        }

        checkLoadError();

        angular.element(document.getElementsByTagName('body')[0]).append(img);
      }, function () {
        deferred.reject('load error');
      });
    });

    file.$ngfDimensionPromise = deferred.promise;
    file.$ngfDimensionPromise['finally'](function () {
      delete file.$ngfDimensionPromise;
    });
    return file.$ngfDimensionPromise;
  };

  upload.mediaDuration = function (file) {
    if (file.$ngfDuration) {
      var d = $q.defer();
      $timeout(function () {
        d.resolve(file.$ngfDuration);
      });
      return d.promise;
    }
    if (file.$ngfDurationPromise) return file.$ngfDurationPromise;

    var deferred = $q.defer();
    $timeout(function () {
      if (file.type.indexOf('audio') !== 0 && file.type.indexOf('video') !== 0) {
        deferred.reject('not media');
        return;
      }
      upload.dataUrl(file).then(function (dataUrl) {
        var el = angular.element(file.type.indexOf('audio') === 0 ? '<audio>' : '<video>')
          .attr('src', dataUrl).css('visibility', 'none').css('position', 'fixed');

        function success() {
          var duration = el[0].duration;
          file.$ngfDuration = duration;
          el.remove();
          deferred.resolve(duration);
        }

        function error() {
          el.remove();
          deferred.reject('load error');
        }

        el.on('loadedmetadata', success);
        el.on('error', error);
        var count = 0;

        function checkLoadError() {
          $timeout(function () {
            if (el[0].parentNode) {
              if (el[0].duration) {
                success();
              } else if (count > 10) {
                error();
              } else {
                checkLoadError();
              }
            }
          }, 1000);
        }

        checkLoadError();

        angular.element(document.body).append(el);
      }, function () {
        deferred.reject('load error');
      });
    });

    file.$ngfDurationPromise = deferred.promise;
    file.$ngfDurationPromise['finally'](function () {
      delete file.$ngfDurationPromise;
    });
    return file.$ngfDurationPromise;
  };
  return upload;
}
]);

ngFileUpload.service('UploadResize', ['UploadValidate', '$q', function (UploadValidate, $q) {
  var upload = UploadValidate;

  /**
   * Conserve aspect ratio of the original region. Useful when shrinking/enlarging
   * images to fit into a certain area.
   * Source:  http://stackoverflow.com/a/14731922
   *
   * @param {Number} srcWidth Source area width
   * @param {Number} srcHeight Source area height
   * @param {Number} maxWidth Nestable area maximum available width
   * @param {Number} maxHeight Nestable area maximum available height
   * @return {Object} { width, height }
   */
  var calculateAspectRatioFit = function (srcWidth, srcHeight, maxWidth, maxHeight, centerCrop) {
    var ratio = centerCrop ? Math.max(maxWidth / srcWidth, maxHeight / srcHeight) :
      Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return {
      width: srcWidth * ratio, height: srcHeight * ratio,
      marginX: srcWidth * ratio - maxWidth, marginY: srcHeight * ratio - maxHeight
    };
  };

  // Extracted from https://github.com/romelgomez/angular-firebase-image-upload/blob/master/app/scripts/fileUpload.js#L89
  var resize = function (imagen, width, height, quality, type, ratio, centerCrop, resizeIf) {
    var deferred = $q.defer();
    var canvasElement = document.createElement('canvas');
    var imageElement = document.createElement('img');

    imageElement.onload = function () {
      if (resizeIf != null && resizeIf(imageElement.width, imageElement.height) === false) {
        deferred.reject('resizeIf');
        return;
      }
      try {
        if (ratio) {
          var ratioFloat = upload.ratioToFloat(ratio);
          var imgRatio = imageElement.width / imageElement.height;
          if (imgRatio < ratioFloat) {
            width = imageElement.width;
            height = width / ratioFloat;
          } else {
            height = imageElement.height;
            width = height * ratioFloat;
          }
        }
        if (!width) {
          width = imageElement.width;
        }
        if (!height) {
          height = imageElement.height;
        }
        var dimensions = calculateAspectRatioFit(imageElement.width, imageElement.height, width, height, centerCrop);
        canvasElement.width = Math.min(dimensions.width, width);
        canvasElement.height = Math.min(dimensions.height, height);
        var context = canvasElement.getContext('2d');
        context.drawImage(imageElement,
          Math.min(0, -dimensions.marginX / 2), Math.min(0, -dimensions.marginY / 2),
          dimensions.width, dimensions.height);
        deferred.resolve(canvasElement.toDataURL(type || 'image/WebP', quality || 0.934));
      } catch (e) {
        deferred.reject(e);
      }
    };
    imageElement.onerror = function () {
      deferred.reject();
    };
    imageElement.src = imagen;
    return deferred.promise;
  };

  upload.dataUrltoBlob = function (dataurl, name, origSize) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    var blob = new window.Blob([u8arr], {type: mime});
    blob.name = name;
    blob.$ngfOrigSize = origSize;
    return blob;
  };

  upload.isResizeSupported = function () {
    var elem = document.createElement('canvas');
    return window.atob && elem.getContext && elem.getContext('2d') && window.Blob;
  };

  if (upload.isResizeSupported()) {
    // add name getter to the blob constructor prototype
    Object.defineProperty(window.Blob.prototype, 'name', {
      get: function () {
        return this.$ngfName;
      },
      set: function (v) {
        this.$ngfName = v;
      },
      configurable: true
    });
  }

  upload.resize = function (file, width, height, quality, type, ratio, centerCrop, resizeIf, restoreExif) {
    if (file.type.indexOf('image') !== 0) return upload.emptyPromise(file);

    var deferred = $q.defer();
    upload.dataUrl(file, true).then(function (url) {
      resize(url, width, height, quality, type || file.type, ratio, centerCrop, resizeIf)
        .then(function (dataUrl) {
          if (file.type === 'image/jpeg' && restoreExif) {
            try {
              dataUrl = upload.restoreExif(url, dataUrl);
            } catch (e) {
              setTimeout(function () {throw e;}, 1);
            }
          }
          try {
            var blob = upload.dataUrltoBlob(dataUrl, file.name, file.size);
            deferred.resolve(blob);
          } catch (e) {
            deferred.reject(e);
          }
        }, function (r) {
          if (r === 'resizeIf') {
            deferred.resolve(file);
          }
          deferred.reject(r);
        });
    }, function (e) {
      deferred.reject(e);
    });
    return deferred.promise;
  };

  return upload;
}]);

(function () {
  ngFileUpload.directive('ngfDrop', ['$parse', '$timeout', '$location', 'Upload', '$http', '$q',
    function ($parse, $timeout, $location, Upload, $http, $q) {
      return {
        restrict: 'AEC',
        require: '?ngModel',
        link: function (scope, elem, attr, ngModel) {
          linkDrop(scope, elem, attr, ngModel, $parse, $timeout, $location, Upload, $http, $q);
        }
      };
    }]);

  ngFileUpload.directive('ngfNoFileDrop', function () {
    return function (scope, elem) {
      if (dropAvailable()) elem.css('display', 'none');
    };
  });

  ngFileUpload.directive('ngfDropAvailable', ['$parse', '$timeout', 'Upload', function ($parse, $timeout, Upload) {
    return function (scope, elem, attr) {
      if (dropAvailable()) {
        var model = $parse(Upload.attrGetter('ngfDropAvailable', attr));
        $timeout(function () {
          model(scope);
          if (model.assign) {
            model.assign(scope, true);
          }
        });
      }
    };
  }]);

  function linkDrop(scope, elem, attr, ngModel, $parse, $timeout, $location, upload, $http, $q) {
    var available = dropAvailable();

    var attrGetter = function (name, scope, params) {
      return upload.attrGetter(name, attr, scope, params);
    };

    if (attrGetter('dropAvailable')) {
      $timeout(function () {
        if (scope[attrGetter('dropAvailable')]) {
          scope[attrGetter('dropAvailable')].value = available;
        } else {
          scope[attrGetter('dropAvailable')] = available;
        }
      });
    }
    if (!available) {
      if (attrGetter('ngfHideOnDropNotAvailable', scope) === true) {
        elem.css('display', 'none');
      }
      return;
    }

    function isDisabled() {
      return elem.attr('disabled') || attrGetter('ngfDropDisabled', scope);
    }

    if (attrGetter('ngfSelect') == null) {
      upload.registerModelChangeValidator(ngModel, attr, scope);
    }

    var leaveTimeout = null;
    var stopPropagation = $parse(attrGetter('ngfStopPropagation'));
    var dragOverDelay = 1;
    var actualDragOverClass;

    elem[0].addEventListener('dragover', function (evt) {
      if (isDisabled() || !upload.shouldUpdateOn('drop', attr, scope)) return;
      evt.preventDefault();
      if (stopPropagation(scope)) evt.stopPropagation();
      // handling dragover events from the Chrome download bar
      if (navigator.userAgent.indexOf('Chrome') > -1) {
        var b = evt.dataTransfer.effectAllowed;
        evt.dataTransfer.dropEffect = ('move' === b || 'linkMove' === b) ? 'move' : 'copy';
      }
      $timeout.cancel(leaveTimeout);
      if (!actualDragOverClass) {
        actualDragOverClass = 'C';
        calculateDragOverClass(scope, attr, evt, function (clazz) {
          actualDragOverClass = clazz;
          elem.addClass(actualDragOverClass);
          attrGetter('ngfDrag', scope, {$isDragging: true, $class: actualDragOverClass, $event: evt});
        });
      }
    }, false);
    elem[0].addEventListener('dragenter', function (evt) {
      if (isDisabled() || !upload.shouldUpdateOn('drop', attr, scope)) return;
      evt.preventDefault();
      if (stopPropagation(scope)) evt.stopPropagation();
    }, false);
    elem[0].addEventListener('dragleave', function (evt) {
      if (isDisabled() || !upload.shouldUpdateOn('drop', attr, scope)) return;
      evt.preventDefault();
      if (stopPropagation(scope)) evt.stopPropagation();
      leaveTimeout = $timeout(function () {
        if (actualDragOverClass) elem.removeClass(actualDragOverClass);
        actualDragOverClass = null;
        attrGetter('ngfDrag', scope, {$isDragging: false, $event: evt});
      }, dragOverDelay || 100);
    }, false);
    elem[0].addEventListener('drop', function (evt) {
      if (isDisabled() || !upload.shouldUpdateOn('drop', attr, scope)) return;
      evt.preventDefault();
      if (stopPropagation(scope)) evt.stopPropagation();
      if (actualDragOverClass) elem.removeClass(actualDragOverClass);
      actualDragOverClass = null;
      var items = evt.dataTransfer.items;
      var html;
      try {
        html = evt.dataTransfer && evt.dataTransfer.getData && evt.dataTransfer.getData('text/html');
      } catch (e) {/* Fix IE11 that throw error calling getData */
      }

      extractFiles(items, evt.dataTransfer.files, attrGetter('ngfAllowDir', scope) !== false,
        attrGetter('multiple') || attrGetter('ngfMultiple', scope)).then(function (files) {
        if (files.length) {
          updateModel(files, evt);
        } else {
          extractFilesFromHtml('dropUrl', html).then(function (files) {
            updateModel(files, evt);
          });
        }
      });
    }, false);
    elem[0].addEventListener('paste', function (evt) {
      if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1 &&
        attrGetter('ngfEnableFirefoxPaste', scope)) {
        evt.preventDefault();
      }
      if (isDisabled() || !upload.shouldUpdateOn('paste', attr, scope)) return;
      var files = [];
      var clipboard = evt.clipboardData || evt.originalEvent.clipboardData;
      if (clipboard && clipboard.items) {
        for (var k = 0; k < clipboard.items.length; k++) {
          if (clipboard.items[k].type.indexOf('image') !== -1) {
            files.push(clipboard.items[k].getAsFile());
          }
        }
      }
      if (files.length) {
        updateModel(files, evt);
      } else {
        extractFilesFromHtml('pasteUrl', clipboard).then(function (files) {
          updateModel(files, evt);
        });
      }
    }, false);

    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1 &&
      attrGetter('ngfEnableFirefoxPaste', scope)) {
      elem.attr('contenteditable', true);
      elem.on('keypress', function (e) {
        if (!e.metaKey && !e.ctrlKey) {
          e.preventDefault();
        }
      });
    }

    function updateModel(files, evt) {
      upload.updateModel(ngModel, attr, scope, attrGetter('ngfChange') || attrGetter('ngfDrop'), files, evt);
    }

    function extractFilesFromHtml(updateOn, html) {
      if (!upload.shouldUpdateOn(updateOn, attr, scope) || !html) return upload.rejectPromise([]);
      var urls = [];
      html.replace(/<(img src|img [^>]* src) *=\"([^\"]*)\"/gi, function (m, n, src) {
        urls.push(src);
      });
      var promises = [], files = [];
      if (urls.length) {
        angular.forEach(urls, function (url) {
          promises.push(upload.urlToBlob(url).then(function (blob) {
            files.push(blob);
          }));
        });
        var defer = $q.defer();
        $q.all(promises).then(function () {
          defer.resolve(files);
        }, function (e) {
          defer.reject(e);
        });
        return defer.promise;
      }
      return upload.emptyPromise();
    }

    function calculateDragOverClass(scope, attr, evt, callback) {
      var obj = attrGetter('ngfDragOverClass', scope, {$event: evt}), dClass = 'dragover';
      if (angular.isString(obj)) {
        dClass = obj;
      } else if (obj) {
        if (obj.delay) dragOverDelay = obj.delay;
        if (obj.accept || obj.reject) {
          var items = evt.dataTransfer.items;
          if (items == null || !items.length) {
            dClass = obj.accept;
          } else {
            var pattern = obj.pattern || attrGetter('ngfPattern', scope, {$event: evt});
            var len = items.length;
            while (len--) {
              if (!upload.validatePattern(items[len], pattern)) {
                dClass = obj.reject;
                break;
              } else {
                dClass = obj.accept;
              }
            }
          }
        }
      }
      callback(dClass);
    }

    function extractFiles(items, fileList, allowDir, multiple) {
      var maxFiles = upload.getValidationAttr(attr, scope, 'maxFiles') || Number.MAX_VALUE;
      var maxTotalSize = upload.getValidationAttr(attr, scope, 'maxTotalSize') || Number.MAX_VALUE;
      var includeDir = attrGetter('ngfIncludeDir', scope);
      var files = [], totalSize = 0;

      function traverseFileTree(entry, path) {
        var defer = $q.defer();
        if (entry != null) {
          if (entry.isDirectory) {
            var promises = [upload.emptyPromise()];
            if (includeDir) {
              var file = {type: 'directory'};
              file.name = file.path = (path || '') + entry.name + entry.name;
              files.push(file);
            }
            var dirReader = entry.createReader();
            var entries = [];
            var readEntries = function () {
              dirReader.readEntries(function (results) {
                try {
                  if (!results.length) {
                    angular.forEach(entries.slice(0), function (e) {
                      if (files.length <= maxFiles && totalSize <= maxTotalSize) {
                        promises.push(traverseFileTree(e, (path ? path : '') + entry.name + '/'));
                      }
                    });
                    $q.all(promises).then(function () {
                      defer.resolve();
                    }, function (e) {
                      defer.reject(e);
                    });
                  } else {
                    entries = entries.concat(Array.prototype.slice.call(results || [], 0));
                    readEntries();
                  }
                } catch (e) {
                  defer.reject(e);
                }
              }, function (e) {
                defer.reject(e);
              });
            };
            readEntries();
          } else {
            entry.file(function (file) {
              try {
                file.path = (path ? path : '') + file.name;
                if (includeDir) {
                  file = upload.rename(file, file.path);
                }
                files.push(file);
                totalSize += file.size;
                defer.resolve();
              } catch (e) {
                defer.reject(e);
              }
            }, function (e) {
              defer.reject(e);
            });
          }
        }
        return defer.promise;
      }

      var promises = [upload.emptyPromise()];

      if (items && items.length > 0 && $location.protocol() !== 'file') {
        for (var i = 0; i < items.length; i++) {
          if (items[i].webkitGetAsEntry && items[i].webkitGetAsEntry() && items[i].webkitGetAsEntry().isDirectory) {
            var entry = items[i].webkitGetAsEntry();
            if (entry.isDirectory && !allowDir) {
              continue;
            }
            if (entry != null) {
              promises.push(traverseFileTree(entry));
            }
          } else {
            var f = items[i].getAsFile();
            if (f != null) {
              files.push(f);
              totalSize += f.size;
            }
          }
          if (files.length > maxFiles || totalSize > maxTotalSize ||
            (!multiple && files.length > 0)) break;
        }
      } else {
        if (fileList != null) {
          for (var j = 0; j < fileList.length; j++) {
            var file = fileList.item(j);
            if (file.type || file.size > 0) {
              files.push(file);
              totalSize += file.size;
            }
            if (files.length > maxFiles || totalSize > maxTotalSize ||
              (!multiple && files.length > 0)) break;
          }
        }
      }

      var defer = $q.defer();
      $q.all(promises).then(function () {
        if (!multiple && !includeDir && files.length) {
          var i = 0;
          while (files[i] && files[i].type === 'directory') i++;
          defer.resolve([files[i]]);
        } else {
          defer.resolve(files);
        }
      }, function (e) {
        defer.reject(e);
      });

      return defer.promise;
    }
  }

  function dropAvailable() {
    var div = document.createElement('div');
    return ('draggable' in div) && ('ondrop' in div) && !/Edge\/12./i.test(navigator.userAgent);
  }

})();

// customized version of https://github.com/exif-js/exif-js
ngFileUpload.service('UploadExif', ['UploadResize', '$q', function (UploadResize, $q) {
  var upload = UploadResize;

  upload.isExifSupported = function () {
    return window.FileReader && new FileReader().readAsArrayBuffer && upload.isResizeSupported();
  };

  function applyTransform(ctx, orientation, width, height) {
    switch (orientation) {
      case 2:
        return ctx.transform(-1, 0, 0, 1, width, 0);
      case 3:
        return ctx.transform(-1, 0, 0, -1, width, height);
      case 4:
        return ctx.transform(1, 0, 0, -1, 0, height);
      case 5:
        return ctx.transform(0, 1, 1, 0, 0, 0);
      case 6:
        return ctx.transform(0, 1, -1, 0, height, 0);
      case 7:
        return ctx.transform(0, -1, -1, 0, height, width);
      case 8:
        return ctx.transform(0, -1, 1, 0, 0, width);
    }
  }

  upload.readOrientation = function (file) {
    var defer = $q.defer();
    var reader = new FileReader();
    var slicedFile = file.slice ? file.slice(0, 64 * 1024) : file;
    reader.readAsArrayBuffer(slicedFile);
    reader.onerror = function (e) {
      return defer.reject(e);
    };
    reader.onload = function (e) {
      var result = {orientation: 1};
      var view = new DataView(this.result);
      if (view.getUint16(0, false) !== 0xFFD8) return defer.resolve(result);

      var length = view.byteLength,
        offset = 2;
      while (offset < length) {
        var marker = view.getUint16(offset, false);
        offset += 2;
        if (marker === 0xFFE1) {
          if (view.getUint32(offset += 2, false) !== 0x45786966) return defer.resolve(result);

          var little = view.getUint16(offset += 6, false) === 0x4949;
          offset += view.getUint32(offset + 4, little);
          var tags = view.getUint16(offset, little);
          offset += 2;
          for (var i = 0; i < tags; i++)
            if (view.getUint16(offset + (i * 12), little) === 0x0112) {
              var orientation = view.getUint16(offset + (i * 12) + 8, little);
              if (orientation >= 2 && orientation <= 8) {
                view.setUint16(offset + (i * 12) + 8, 1, little);
                result.fixedArrayBuffer = e.target.result;
              }
              result.orientation = orientation;
              return defer.resolve(result);
            }
        } else if ((marker & 0xFF00) !== 0xFF00) break;
        else offset += view.getUint16(offset, false);
      }
      return defer.resolve(result);
    };
    return defer.promise;
  };

  function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  upload.applyExifRotation = function (file) {
    if (file.type.indexOf('image/jpeg') !== 0) {
      return upload.emptyPromise(file);
    }

    var deferred = $q.defer();
    upload.readOrientation(file).then(function (result) {
      if (result.orientation < 2 || result.orientation > 8) {
        return deferred.resolve(file);
      }
      upload.dataUrl(file, true).then(function (url) {
        var canvas = document.createElement('canvas');
        var img = document.createElement('img');

        img.onload = function () {
          try {
            canvas.width = result.orientation > 4 ? img.height : img.width;
            canvas.height = result.orientation > 4 ? img.width : img.height;
            var ctx = canvas.getContext('2d');
            applyTransform(ctx, result.orientation, img.width, img.height);
            ctx.drawImage(img, 0, 0);
            var dataUrl = canvas.toDataURL(file.type || 'image/WebP', 0.934);
            dataUrl = upload.restoreExif(arrayBufferToBase64(result.fixedArrayBuffer), dataUrl);
            var blob = upload.dataUrltoBlob(dataUrl, file.name);
            deferred.resolve(blob);
          } catch (e) {
            return deferred.reject(e);
          }
        };
        img.onerror = function () {
          deferred.reject();
        };
        img.src = url;
      }, function (e) {
        deferred.reject(e);
      });
    }, function (e) {
      deferred.reject(e);
    });
    return deferred.promise;
  };

  upload.restoreExif = function (orig, resized) {
    var ExifRestorer = {};

    ExifRestorer.KEY_STR = 'ABCDEFGHIJKLMNOP' +
      'QRSTUVWXYZabcdef' +
      'ghijklmnopqrstuv' +
      'wxyz0123456789+/' +
      '=';

    ExifRestorer.encode64 = function (input) {
      var output = '',
        chr1, chr2, chr3 = '',
        enc1, enc2, enc3, enc4 = '',
        i = 0;

      do {
        chr1 = input[i++];
        chr2 = input[i++];
        chr3 = input[i++];

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }

        output = output +
          this.KEY_STR.charAt(enc1) +
          this.KEY_STR.charAt(enc2) +
          this.KEY_STR.charAt(enc3) +
          this.KEY_STR.charAt(enc4);
        chr1 = chr2 = chr3 = '';
        enc1 = enc2 = enc3 = enc4 = '';
      } while (i < input.length);

      return output;
    };

    ExifRestorer.restore = function (origFileBase64, resizedFileBase64) {
      if (origFileBase64.match('data:image/jpeg;base64,')) {
        origFileBase64 = origFileBase64.replace('data:image/jpeg;base64,', '');
      }

      var rawImage = this.decode64(origFileBase64);
      var segments = this.slice2Segments(rawImage);

      var image = this.exifManipulation(resizedFileBase64, segments);

      return 'data:image/jpeg;base64,' + this.encode64(image);
    };


    ExifRestorer.exifManipulation = function (resizedFileBase64, segments) {
      var exifArray = this.getExifArray(segments),
        newImageArray = this.insertExif(resizedFileBase64, exifArray);
      return new Uint8Array(newImageArray);
    };


    ExifRestorer.getExifArray = function (segments) {
      var seg;
      for (var x = 0; x < segments.length; x++) {
        seg = segments[x];
        if (seg[0] === 255 & seg[1] === 225) //(ff e1)
        {
          return seg;
        }
      }
      return [];
    };


    ExifRestorer.insertExif = function (resizedFileBase64, exifArray) {
      var imageData = resizedFileBase64.replace('data:image/jpeg;base64,', ''),
        buf = this.decode64(imageData),
        separatePoint = buf.indexOf(255, 3),
        mae = buf.slice(0, separatePoint),
        ato = buf.slice(separatePoint),
        array = mae;

      array = array.concat(exifArray);
      array = array.concat(ato);
      return array;
    };


    ExifRestorer.slice2Segments = function (rawImageArray) {
      var head = 0,
        segments = [];

      while (1) {
        if (rawImageArray[head] === 255 & rawImageArray[head + 1] === 218) {
          break;
        }
        if (rawImageArray[head] === 255 & rawImageArray[head + 1] === 216) {
          head += 2;
        }
        else {
          var length = rawImageArray[head + 2] * 256 + rawImageArray[head + 3],
            endPoint = head + length + 2,
            seg = rawImageArray.slice(head, endPoint);
          segments.push(seg);
          head = endPoint;
        }
        if (head > rawImageArray.length) {
          break;
        }
      }

      return segments;
    };


    ExifRestorer.decode64 = function (input) {
      var chr1, chr2, chr3 = '',
        enc1, enc2, enc3, enc4 = '',
        i = 0,
        buf = [];

      // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
      var base64test = /[^A-Za-z0-9\+\/\=]/g;
      if (base64test.exec(input)) {
        console.log('There were invalid base64 characters in the input text.\n' +
          'Valid base64 characters are A-Z, a-z, 0-9, ' + ', ' / ',and "="\n' +
          'Expect errors in decoding.');
      }
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

      do {
        enc1 = this.KEY_STR.indexOf(input.charAt(i++));
        enc2 = this.KEY_STR.indexOf(input.charAt(i++));
        enc3 = this.KEY_STR.indexOf(input.charAt(i++));
        enc4 = this.KEY_STR.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        buf.push(chr1);

        if (enc3 !== 64) {
          buf.push(chr2);
        }
        if (enc4 !== 64) {
          buf.push(chr3);
        }

        chr1 = chr2 = chr3 = '';
        enc1 = enc2 = enc3 = enc4 = '';

      } while (i < input.length);

      return buf;
    };

    return ExifRestorer.restore(orig, resized);  //<= EXIF
  };

  return upload;
}]);


}).call(this,require("+7ZJp0"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../vendor/js/ng-file-upload.js","/../../../vendor/js")
},{"+7ZJp0":56,"buffer":53}]},{},[46])