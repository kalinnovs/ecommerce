$(document).ready(function(e) {

    $ = jQuery;
    sessionStorage.isTriggered = false;
    
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

    // Lightbox
    $("a.zoom").prettyPhoto({
        social_tools: ''
    });

    $("nav ul li").hover(function(){
        $(this).find("a").addClass("active");
        $(this).children('ul').stop(true, true).fadeIn(300);
    }, function(){
        $(this).find("a").removeClass("active");
        $(this).children('ul').stop(true, true).fadeOut(400);
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

    $('.sorting-bar .sorting-btn a').hover(
        function(){
            $(this).stop().animate(
                {backgroundPosition: "(0 -29px)"},
                {duration:500}
            )
        },
        function(){
            $(this).stop().animate(
                {backgroundPosition: "(0 0)"},
                {duration:500}
            )
        }
    );

    

    $('footer .social-icon a').hover(
        function(){
            $(this).stop().animate(
                {backgroundPosition: "(0 -20px)"},
                {duration:500}
            )
        },
        function(){
            $(this).stop().animate(
                {backgroundPosition: "(0 0)"},
                {duration:500}
            )
        }
    );


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
    



    $(".shopping-cart li a").click(function(e){
        e.preventDefault();
        $(this).parents('ul').stop(true,true).fadeOut(100);
    });


    $('#thumbs a').click(function() {
        $('#carousel').trigger('slideTo', '#' + this.href.split('#').pop() );
        $('#thumbs a').removeClass('selected');
        $(this).addClass('selected');
        return false;
    });


});