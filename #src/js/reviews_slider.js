$(document).ready(function() { 
    $('.slider').on(`init reInit`, function(event, slick) {
    $('.slick-slide-num-current').text('0' + 1 + ' '); // ' / ' + '0' + slick.slideCount
    })
    $('.slider').on(`afterChange`, function(event, slick, currentSlide, nextSlide) {
        $('.slick-slide-num-current').text('0' + (currentSlide + 1) + ' '); // + ' / 0' + slick.slideCount
    })
    $('.slider').slick({
        dots: false,
        infinite: true,
        speed: 500,
        fade: true,
        adaptiveHeight: true,
        cssEase: 'linear',
        appendArrows: '.slick__arrows',
        prevArrow: '<button type="button" data-role="none" class="slick-prev slick-arrow" aria-label="Previous"></button>',
        nextArrow: '<button type="button" data-role="none" class="slick-next slick-arrow" aria-label="Next"></button>',
    });
});
