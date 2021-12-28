$(document).ready(function() { 
    $('.partners-slider-1').slick({
    arrows: false,
    dots: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    responsive:[
        {
        breakpoint: 480,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            centerMode: false,
            variableWidth: true,
        }
    }
    ],
    });
    $('.partners-slider-2').slick({
        arrows: false,
        dots: false,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 500,
        responsive:[
            {
            breakpoint: 480,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                centerMode: true,
                focusOnSelect: true,
                variableWidth: true,
            }
        }
        ],
    });
});

