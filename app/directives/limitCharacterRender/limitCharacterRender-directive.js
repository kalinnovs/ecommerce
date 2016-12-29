angular.module('eCommerce')
  .directive('limitCharacterRender', function ($compile) {
  	var template = "{{modelBind}}";

  	var linker = function(scope, element, attrs) {
  		var str = scope.modelBind,
  		replaceStr = (str === null) ? "" : (str) ? str.substring(0, attrs.charLength - 3) + "..." : "";

  		if((str !== null) && (str.length > attrs.charLength)) {
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
  })
 ;
