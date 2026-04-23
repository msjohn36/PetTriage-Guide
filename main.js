
    // Mindy Johnston
"use strict";

// Accordion
function accordion() {
    $("#accordion").accordion({
        collapsible: true,
        active: false,
        heightStyle: "content",
        header: "> h3"
    });
}
// Carousel
function carousel(){
    $("#carousel").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        dots: true,
        arrows: true,
        prevArrow: "<button class= 'carousel-btn carousel-prev' aria-label = 'Previous slide'>&#8249;</button>",
        nextArrow: "<button class= 'carousel-btn carousel-next' aria-label = 'Next slide'>&#8250;</button>",
        pauseOnHover: true,
        adaptiveHeight: true,
    });
}


$(document).ready(function(){
    accordion();
});