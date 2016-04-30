$(document).ready(function(e) {

    setTimeout( function() { 

        // Loading Finish
        $(".progress").hide();

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
        }

        $(document).on({
            mouseenter: function () {
                //stuff to do on mouse enter
                $(this).find("a").addClass("active");
                $(this).children('.sub-menu').stop(true, true).fadeIn(300);
            },
            mouseleave: function () {
                //stuff to do on mouse leave
                $(this).find("a").removeClass("active");
                $(this).children('.sub-menu').stop(true, true).fadeOut(400);
            }
        }, "body:not(.mobile) nav ul li");

        $(".mobile nav ul li").on("click", function () {
            // debugger;
            if($(this).find("a").eq(0).hasClass("active")) {
                $(this).find("a").eq(0).removeClass("active");
                $(this).children('.sub-menu').css("display","none");
            } else {
                $(this).find("a").eq(0).addClass("active");
                $(this).children('.sub-menu').css("display","block");
            }
            $(this).siblings().find("> a").each(function() { 
                $(this).removeClass("active");
            });
        });

        $(".mobile nav ul li li a").click(function() {
            $(this).parent().siblings().find("> a").each(function() { 
                $(this).removeClass("active");
            });
            $(this).next('.sub-menu').css("display","none");
            $(this).parents(".menuRoot").hide();
        });

        $(".mobile .desktop-nav .fa").on("click", function(){
            if($(this).next("ul").css("display") == undefined || $(this).next("ul").css("display") == "none") {
                $(this).next("ul").show();
            } else {
                $(this).next("ul").hide();
            }
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

        $.ajax({url: "http://kalinnovs.com/ecommerce/app/app.pageCounter.php", success: function(result){
            var result = JSON.parse(result);
            $(".pageCounter").html(result.counter);
        }});
    

    }, 1500);

});