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

    var controller = function() {
      var sticky = this;
      
    };

    return {
        restrict: "EA",
        link: linker,
        transclude: true,
        template: '<div class="stickyMenu"><div class="controls" ng-transclude></div></div>'
    };
});