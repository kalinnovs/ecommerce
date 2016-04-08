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

    // Google Map
    initiateMap();
    function initiateMap() {
        // Create an array of styles.
        var styles = [
            {
                stylers: [
                    { hue: "#FCB7A2" },
                    { saturation: 40 }
                ]
            },{
                featureType: "road.local",
                elementType: "geometry",
                stylers: [
                    { lightness: 100 },
                    { visibility: "simplified" }
                ]
            },{
                featureType: "road.local",
                elementType: "labels",
                stylers: [
                    { visibility: "off" }
                ]
            }
        ];

        // Create a new StyledMapType object, passing it the array of styles,
        // as well as the name to be displayed on the map type control.
        var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

        // Create a map object, and include the MapTypeId to add
        // to the map type control.
        var mapOptions = {
            scrollwheel: false,
            zoom: 11,
            center: new google.maps.LatLng(20.284321,85.79442),
            mapTypeControlOptions: {
              mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
            }
        };
        var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

        //Associate the styled map with the MapTypeId and set it to display.
        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');
    }
    



});