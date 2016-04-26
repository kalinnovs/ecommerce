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
            
        }, "nav ul li");

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
                sessionStorage.isTriggered = "true";
            }, 3200);    
        } 

        $(".tapToClose").click(function() {
            sessionStorage.isTriggered = "true";
            modal.close();
        });
    

    }, 1500);

});