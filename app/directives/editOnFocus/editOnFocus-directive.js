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