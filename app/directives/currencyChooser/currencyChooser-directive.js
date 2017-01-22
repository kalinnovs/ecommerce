'use strict';

angular.module('eCommerce')
  .directive('currencyChooser', function ($http, $compile, PRODUCTDATA_URL, $rootScope) {
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
          }, 100);

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
});
