    // object.watch
if (!Object.prototype.watch) {
    Object.defineProperty(Object.prototype, "watch", {
        enumerable: false,
        configurable: true,
        writable: false,
        value: function(prop, handler) {
            var oldval = this[prop],
                newval = oldval,
                getter = function() {
                    return newval;
                },
                setter = function(val) {
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
};

// Stores partnumbers to localstorage and data temporarily to minicart in sessionStorage
window.itemsArray = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [] || [];
window.miniCartStorage = (window.sessionStorage.cartParts) ? JSON.parse(window.sessionStorage.cartParts) : [] || [];

// Array Watch
Object.defineProperty(window.itemsArray, "push", {
    configurable: false,
    enumerable: false, // hide from for...in
    writable: false,
    value: function() {
        for (var i = 0, n = this.length, l = arguments.length; i < l; i++, n++) {
            RaiseMyEvent(this, n, this[n] = arguments[i]); // assign/raise your event
        }
        return n;
    }
});

function RaiseMyEvent(id, oldVal, newVal) {
    createMiniKart();
};

function createMiniKart() {
    var imagePath;
    if (window.itemsArray.length > 0) {
        $("body").find(".cartCount").html(window.itemsArray.length);
    }
};

window.dataLoaded = false;

//Watcher for dataLoader
window.watch('dataLoaded', function(id, oldval, newval) {
    if(oldval === newval) {
        return;
    }
    if (newval === true) {
        $(".progress").hide();
        updateUser();
    } else {
        $(".progress").show();
    }
    return newval;
});

function updateUser() {
    var emptyUser = {
        "name": "Guest",
        "imageUrl": "",
        "user": null 
    };
    window.userDetails = window.userDetails || emptyUser;
    if(window.userDetails.imageUrl !== "") {
        $(".profilePicUpdate").addClass("loggedIn");
    } else {
        $(".profilePicUpdate").removeClass("loggedIn");
    }
    $(".profilePicUpdate").find(".profilePic").attr("src", window.userDetails.imageUrl);
    $(".userDetailsUpdate").text((window.userDetails.name === "Guest") ? "Login" : window.userDetails.name);
    $(".profile").attr("href", (window.userDetails.name === "Guest") ? "/login" : "/accounts");
};

$(document).ready(function(e) {

    // Adds Safari class to body
    if(/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        $("body").addClass("isSafari");
    }

    // Set default currency INR to body
    $("body").attr("data-currency", "INR");
    $("body").find(".cartCount").html(window.itemsArray.length);

    setTimeout(function() {

        //Login popup
        $(".toggleLoginPopup").click(function() {
            var chk = $(this).next().css("display");
            if (chk == "none") {
                $(this).next(".login").show();
                $(this).next().stop(true, true).slideDown();
            } else {
                $(this).next(".login").hide();
                $(this).next().stop(true, true).slideUp();
            }
        });

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            $("body").addClass("mobile");
        } else {
            $("body").removeClass("mobile");
        }

        $(document).on({
            mouseenter: function() {
                //stuff to do on mouse enter
                $(this).find("a").eq(1).addClass("active");
                $(this).children('.sub-menu').stop(true, true).fadeIn(300);
            },
            mouseleave: function() {
                //stuff to do on mouse leave
                $(this).find("a").eq(1).removeClass("active");
                $(this).children('.sub-menu').stop(true, true).fadeOut(400);
            }
        }, "body:not(.mobile) nav ul > li");

        $(document).on("click", ".mobile nav ul > li > a", function(e) {
            e.preventDefault();
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                $(this).siblings('.sub-menu').css("display", "none");
                $(this).find(".fa-minus").hide();
                $(this).find(".fa-plus").show();
            } else {
                $(this).addClass("active");
                $(this).siblings('.sub-menu').css("display", "block");
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
            $(this).next('.sub-menu').css("display", "none");
            $(this).parents(".menuRoot").hide();
        });

        $(document).on("click", ".mobile .desktop-nav a.mobileNavBtn", function(e) {
            e.preventDefault();
            if ($(this).siblings("ul").css("display") == undefined || $(this).siblings("ul").css("display") == "none") {
                $(this).siblings("ul").show();
            } else {
                $(this).siblings("ul").hide();
            }
        });

        $(document).on("click", ".currencyConverter a, .currencyChooser a", function(e) {
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
            var selectedCurrency = $(this).attr("rel");
            $(this).parents(".menuRoot").hide()
            $(".price.inr, .price.usd, .price.eur").hide();
            $(".price." + selectedCurrency).show();
            $("body").attr("data-currency", selectedCurrency);
            $(document).trigger('data-currency-changed');
        });

        $('footer .back-top a').click(function(e) {
            e.preventDefault();
            $("html, body").animate({
                scrollTop: 0
            }, 600);
            return false;
        });

        // Wait until the DOM has loaded before querying the document
        if ((!sessionStorage.isTriggered || sessionStorage.isTriggered == "false") &&
            window.location.hash.match(/register/g) == null) {
            setTimeout(function() {
                window.modalComponent.open(".adMessageBox");
                $("html, body").animate({
                    scrollTop: 0
                }, 600);
                sessionStorage.isTriggered = "true";
            }, 45000);
        }

        $(".tapToClose").click(function() {
            sessionStorage.isTriggered = "true";
            window.modalComponent.close();
        });
        
        $(".modalComponent .overlay-close").click(function() {
            $(".modalComponent").css("top", "-400px");
            setTimeout(function(){
                $(".screen").hide();
            }, 400);
        });
        
        $(".screen").click(function() {
            $(".modalComponent").css("top", "-400px");
            setTimeout(function(){
                $(".screen").hide();
            }, 400);
        });
        
        $(window).on("scroll", function() {
            if(parseInt($(".modalComponent").css("top")) > 0) {
                $(".modalComponent").css("top", $(document).scrollTop() + ($(window).height() - $(".modalComponent").outerHeight()) / 2);
            }
        })


    }, 1500);

});
