$(document).ready(function() {
    $('.item__start').mouseover(function () {
    $(this).addClass('scaled');
    $('.item__business').addClass('business-scale');
    });
    $('.item__start').mouseout(function () {
        $(this).removeClass('scaled');
        $('.item__business').removeClass('business-scale');
    });
    $('.item__vip').mouseover(function () {
        $(this).addClass('scaled');
        $('.item__business').addClass('business-scale');
    });
    $('.item__vip').mouseout(function () {
        $(this).removeClass('scaled');
        $('.item__business').removeClass('business-scale');
    });
});
