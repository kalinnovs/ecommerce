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
