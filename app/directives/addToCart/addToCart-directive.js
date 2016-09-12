'use strict';

angular.module('eCommerce')
    .directive('addToCart', function() {
        var def = {
            restrict: 'EA',
            scope: {
                'partNumber': '&',
                'itemClick': '&'
            },
            template: "<div class='add-to-cart'><button class='fa fa-cart-plus' ng-click='storeData($event, item);'></button></div>",
            link: function(scope, element, attrs) {
                var scope = scope,
                    attrs = attrs;

                scope.storeData = function(event) {
                    scope.itemClick({
                        'item': this.partNumber(),
                        'event': event
                    });
                };
            }
        };
        return def;
    });
