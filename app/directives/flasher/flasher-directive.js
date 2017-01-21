'use strict';

angular.module('eCommerce')
  .directive('flasher', function ($compile, DIRECTIVE_URI, $sce) {
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
});
