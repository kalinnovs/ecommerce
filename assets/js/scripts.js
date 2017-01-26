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

window.dataLoaded = false;
window.itemsArray = (window.sessionStorage.itemsArray) ? JSON.parse(window.sessionStorage.itemsArray) : [] || [];

//Watcher for dataLoader
window.watch('dataLoaded', function(id, oldval, newval) {
    if(oldval === newval) {
        return;
    }
    if (newval === true) {
        $(".progress").hide();
        // updateMiniKartCount();
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
    },
    userDetails = (window.userDetails) ? window.userDetails : emptyUser;
    if(userDetails.imageUrl !== "") {
        $(".profilePicUpdate").addClass("loggedIn");
    } else {
        $(".profilePicUpdate").removeClass("loggedIn");
    }
    $(".profilePicUpdate").find(".profilePic").attr("src", userDetails.imageUrl);
    $(".userDetailsUpdate").text((userDetails.name === "Guest") ? "Login" : userDetails.name);
    $(".social-strip ul > li > a.profile").attr("href", (userDetails.name === "Guest") ? "/login" : "/accounts");
};

$(document).ready(function(e) {

    // Adds Safari class to body
    if(/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        $("body").addClass("isSafari");
    }

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
            $(this).toggleClass("fa-bars fa-close");
            if ($(this).siblings("ul").css("display") == undefined || $(this).siblings("ul").css("display") == "none") {
                $(this).siblings("ul").show();
            } else {
                $(this).siblings("ul").hide();
            }
        });

        $('footer .back-top a').click(function(e) {
            e.preventDefault();
            $("html, body").animate({
                scrollTop: 0
            }, 600);
            return false;
        });

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
