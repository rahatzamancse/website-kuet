function cycleImagesRight() {
    $('#background-image-right').prop('disabled',true);
    $('#background-image-left').prop('disabled',true);
    var $active = $('#background-image-cycler .active');
    var $next = ($('#background-image-cycler .active').next().length > 0) ? $('#background-image-cycler .active').next() : $('#background-image-cycler img:first');
    $next.css('z-index', 3);
    $active.fadeOut(1500, function() {
        $active.css('z-index', 1).show().removeClass('active');
        $next.css('z-index', 4).addClass('active');
        var lebel = $('#background-image-cycler .active').data('imagelebel');
        $('#background-image-lebel').empty().append(lebel);
        $('#background-image-right').prop('disabled',false);
        $('#background-image-left').prop('disabled',false);
    });
}
function cycleImagesLeft() {
    $('#background-image-right').prop('disabled',true);
    $('#background-image-left').prop('disabled',true);
    var $active = $('#background-image-cycler .active');
    var $prev = ($('#background-image-cycler .active').prev().length > 0) ? $('#background-image-cycler .active').prev() : $('#background-image-cycler img:last');
    $prev.css('z-index', 3);
    $active.fadeOut(1500, function() {
        $active.css('z-index', 1).show().removeClass('active');
        $prev.css('z-index', 4).addClass('active');
        var lebel = $('#background-image-cycler .active').data('imagelebel');
        $('#background-image-lebel').empty().append(lebel);
        $('#background-image-right').prop('disabled',false);
        $('#background-image-left').prop('disabled',false);
    });
}
function checkWidthForBgCycle() {
    if($(window).width() >= 768) {
        $('#background-image-cycler').fadeIn(1500);
        $('#background-image-right').click(cycleImagesRight);
        $('#background-image-left').click(cycleImagesLeft);
        $('#background-image-cycler img.active').css('z-index', 4);
        $('#background-image-lebel').empty().append($('#background-image-cycler img.active').data('imagelebel'));
    }
    else {
        $('#background-image-cycler').css('display', 'none');
    }
}
function isElementInViewport(elem) {
    var $elem = $(elem);
    // Get the scroll position of the page.
    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    // Get the position of the element on the page.
    var elemTop = Math.round( $elem.offset().top );
    var elemBottom = elemTop + $elem.height();
    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
}
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if(!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if(callnow) func.apply(context, args);
    };
};
$(document).ready(function() {
    checkWidthForBgCycle();
    $(window).resize(checkWidthForBgCycle);
    $('.dropdown').on('show.bs.dropdown', function(e){
    $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
    });
    $('.dropdown').on('hide.bs.dropdown', function(e){
    $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
    });
    
    if($(window).width()>=768) {
        $('.horizontal-container').each(function() {
            var boxWidth = ($(this).children('div.horizontal-box').children('div').length * $(this).children('div.horizontal-box').children('div').outerWidth());
            $(this).css('width', (boxWidth+600)+'px');
            $(this).children('div').css('width', (boxWidth)+'px');
            var $box = $(this).find('.horizontal-box');
            var $boxFirst = $(this).find('.horizontal-box div:first-child');
            var $boxLast = $(this).find('.horizontal-box div:last-child');
            
            $(this).find('button.right').click(function() {
                if($boxLast.offset().left >=700) {
                    $box.animate({
                        right: "+=500px"
                    });
                }
            });
            $(this).find('button.left').click(function() {
                if($boxFirst.offset().left <=500) {
                    $box.animate({
                        right: "-=500px"
                    });
                }
            });
        });    
    }
});