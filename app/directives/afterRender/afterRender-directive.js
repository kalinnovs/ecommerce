'use strict';

angular.module('eCommerce')
	.directive('afterRender', ['$timeout', function ($timeout) {
	    var def = {
	        restrict: 'A',
	        scope: {
	        	afterRender: '&'
	        },
	        terminal: true,
	        transclude: false,
	        link: function (scope, element, attrs) {
	            $timeout(scope.$eval(attrs.afterRender), 0);  //Calling a scoped method
	        }
	    };
	    return def;
	}])
;