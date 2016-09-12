'use strict';

angular.module('eCommerce')
  .directive('stickyMenu', function ($compile, DIRECTIVE_URI) {
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
                headerCart.addClass("hide");
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
});
