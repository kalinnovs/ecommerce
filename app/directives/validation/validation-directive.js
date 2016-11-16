'use strict';

angular.module('eCommerce')
    .directive('validate', function() {
        var validate_class = "htka-validate";
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
                ctrl.validate = false;
            
                element.bind('focus', function(evt) {
                    validate();
                }).bind('blur', function(evt) {
                    validate();
                });

                function validate() {
                    if(ctrl.validate && ctrl.$invalid) { // if we focus and the field was invalid, keep the validation
                        element.addClass(validate_class);
                        scope.$apply(function() {ctrl.validate = true;});
                    } else {
                        element.removeClass(validate_class);
                        scope.$apply(function() {ctrl.validate = false;});
                    }
                }
            }
        }
    }
);