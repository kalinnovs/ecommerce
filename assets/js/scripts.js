$(document).ready(function(e) {
    $ = jQuery;
    sessionStorage.isTriggered = false;

    setTimeout( function() { 

        // Loading Finish
        $(".progress").hide();

        // alert('dsaf');

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

        $("nav ul li").hover(function(){
            $(this).find("a").addClass("active");
            $(this).children('.sub-menu').stop(true, true).fadeIn(300);
        }, function(){
            $(this).find("a").removeClass("active");
            $(this).children('.sub-menu').stop(true, true).fadeOut(400);
        });

        $(".orderByPhone").click(function() {
            var elem = $(this).children(".more"),
                isVisible = elem.css("opacity");
            if(elem && isVisible == "0") {
                elem.css("opacity", 1);
            } else {
                elem.css("opacity", 0);
            }
        });

        $('footer .back-top a').click(function(e){
            e.preventDefault();
            $("html, body").animate({ scrollTop: 0 }, 600);
            return false;
        });


        // Wait until the DOM has loaded before querying the document
        // debugger;
        if(sessionStorage.isTriggered == "false") {
            setTimeout(function() {
                // modal.open(".adMessageBox");
                sessionStorage.isTriggered = "true";
            }, 3200);    
        } 

        $(".tapToClose").click(function() {
            sessionStorage.isTriggered = "true";
            modal.close();
        });
    

    }, 1200);

});