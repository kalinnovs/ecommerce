window.modalComponent = (function(){
    var method = {}, $overlay, $modal, $content, $close;

    // Center the modal in the viewport
    method.center = function () {
        var top, left;

        top = Math.max($(window).height() - $modal.outerHeight(), 0) / 2;
        left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;

        $modal.css({
            top:top + $(window).scrollTop(), 
            left:left + $(window).scrollLeft()
        });
    };

    // Open the modal
    method.open = function (selector) {
        $(selector).show();
        $content.empty().append($(selector));

        // $modal.css({
        //     width: 'auto', 
        //     height: 'auto'
        // });

        // method.center();
        // $(window).bind('resize.modal', method.center);
        $modal.show();
        $overlay.show();
    };

    // Close the modal
    method.close = function () {
        var pos = $(".subscriptionLink").position();
        $modal.addClass("minimize");
        $modal.css({"left":pos.left+8, "top": pos.top+5});
        setTimeout(function() {
            $(modal).hide();
            $(overlay).hide();
            $(content).empty();
            // $(window).unbind('resize.modal');    
        }, 500);
    };

    // Generate the HTML and add it to the document
    $overlay = $('<div id="overlay"></div>');
    $modal = $('<div id="modal"></div>');
    $content = $('<div id="content"></div>');
    $close = $('<a id="close" href="#"><i class="fa fa-times"></i></a>');

    $modal.hide();
    $overlay.hide();
    $modal.append($content, $close);

    $(document).ready(function(){
        $('body').append($overlay, $modal);                     
    });

    $close.click(function(e){
        e.preventDefault();
        method.close();
    });

    return method;
}());