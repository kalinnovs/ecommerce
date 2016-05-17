// object.watch
if (!Object.prototype.watch) {
    Object.defineProperty(Object.prototype, "watch", {
          enumerable: false, 
          configurable: true, 
          writable: false, 
          value: function (prop, handler) {
            var oldval = this[prop], 
              newval = oldval, 
              getter = function () {
                return newval;
              }, 
              setter = function (val) {
                oldval = newval;
                return (newval = handler.call(this, prop, oldval, val));
              };
            
            if (delete this[prop]) { // can't watch constants
                Object.defineProperty(this, prop, {
                      get: getter, 
                      set: setter, 
                      enumerable: true, 
                      configurable: true
                });
            }
        }
    });
}

// object.unwatch
if (!Object.prototype.unwatch) {
    Object.defineProperty(Object.prototype, "unwatch", {
        enumerable: false, 
        configurable: true, 
        writable: false, 
        value: function (prop) {
            var val = this[prop];
            delete this[prop]; // remove accessors
            this[prop] = val;
        }
    });
}

window.dataLoaded = false;

//Watcher for dataLoader 
window.watch('dataLoaded', function (id, oldval, newval) {
    if(newval === true) {
        $(".progress").hide();
    } else {
        $(".progress").show();
    }
    return newval;
});

// setTimeout(function(){
//     window.unwatch('dataLoaded');
//     // Loading Finish
//     $(".progress").hide();
// },16000);


$(document).ready(function(e) {

    setTimeout( function() { 

        //Login popup
        $(".toggleLoginPopup").click(function() {
            var chk = $(this).next().css("display");
            if(chk == "none") {
                $(this).next(".login").show();
                $(this).next().stop(true, true).slideDown();
            } else {
                $(this).next(".login").hide();
                $(this).next().stop(true, true).slideUp();
            }
        });

        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            $("body").addClass("mobile");
        } else {
            $("body").removeClass("mobile");
        }

        $(document).on({
            mouseenter: function () {
                //stuff to do on mouse enter
                $(this).find("a").eq(1).addClass("active");
                $(this).children('.sub-menu').stop(true, true).fadeIn(300);
            },
            mouseleave: function () {
                //stuff to do on mouse leave
                $(this).find("a").eq(1).removeClass("active");
                $(this).children('.sub-menu').stop(true, true).fadeOut(400);
            }
        }, "body:not(.mobile) nav ul > li");

        $(document).on("click", ".mobile nav ul > li > a", function (e) {
            e.preventDefault();
            if($(this).hasClass("active")) {
                $(this).removeClass("active");
                $(this).siblings('.sub-menu').css("display","none");
                $(this).find(".fa-minus").hide();
                $(this).find(".fa-plus").show();
            } else {
                $(this).addClass("active");
                $(this).siblings('.sub-menu').css("display","block");
                $(this).find(".fa-minus").show();
                $(this).find(".fa-plus").hide();
            }
            $(this).siblings().each(function() { 
                $(this).removeClass("active");
            });
        });

        $(document).on("click", ".mobile nav ul li li a", function(e) {
            e.preventDefault();
            $(this).parent().siblings().find("> a").each(function() { 
                $(this).parent().removeClass("active");
            });
            $(this).next('.sub-menu').css("display","none");
            $(this).parents(".menuRoot").hide();
        });

        $(document).on("click", ".mobile .desktop-nav a.mobileNavBtn", function(e){
            e.preventDefault();
            if($(this).next("ul").css("display") == undefined || $(this).next("ul").css("display") == "none") {
                $(this).next("ul").show();
            } else {
                $(this).next("ul").hide();
            }
        });
        
        $(document).on("click", "body:not(.mobile) .menuRoot a", function(e) {
            window.dataLoaded = false;
        });

        $(document).on("click", ".currencyConverter a, .currencyChooser a", function(e){
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
            var selectedCurrency = $(this).attr("rel");
            $(this).parents(".menuRoot").hide()
            $(".price.inr, .price.usd, .price.eur").hide();
            $(".price."+selectedCurrency).show();
        });

        $('footer .back-top a').click(function(e){
            e.preventDefault();
            $("html, body").animate({ scrollTop: 0 }, 600);
            return false;
        });

        // Wait until the DOM has loaded before querying the document
        if((!sessionStorage.isTriggered || sessionStorage.isTriggered == "false")
             && window.location.hash.match(/register/g) == null) {
            setTimeout(function() {
                window.modalComponent.open(".adMessageBox");
                $("html, body").animate({ scrollTop: 0 }, 600);
                sessionStorage.isTriggered = "true";
            }, 3200);    
        }

        $(".tapToClose").click(function() {
            sessionStorage.isTriggered = "true";
            window.modalComponent.close();
        });

        $.ajax({
              method: 'POST',
              url: "http://haastika.com/app/app.pageCounter.php",
              contentType: "application/json",
              dataType: 'jsonp'
            }).then(function successCallback(data, status) {
                var result = JSON.parse(data.data);
                $(".pageCounter").html(data.data.counter);
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

        // $.ajax({url: "http://haastika.com/app/app.pageCounter.php", success: function(result){
        //     var result = JSON.parse(result);
        //     $(".pageCounter").html(result.counter);
        // }});
        

    }, 1500);

});