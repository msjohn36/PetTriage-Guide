
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
        adaptiveHeight: true
    });
}
// quick help cards
async function quickHelp (){
    const container = document.querySelector("#quick-help-cards");
    try{
        const response = wait fetch("quickhelp.json");
        const(data) = wait resoinse.json();
        container.innerHTML="";
        data.forEach(card => {
            const urgencyClass = card.urgency === "ER" ? "qh-urgency--er": "qh-urgency--monitor";
            const urgencyLabel = card.urgency === "ER"?"Emergency" : "Monitor";
            const steps=card.steps.map(step => `<li>${step}</li>`).join("");
            const cardHTML = `<div class="quick-help-card">
                    <div class="qh-card-header">
                        <h3>${card.title}</h3>
                        <span class="qh-urgency ${urgencyClass}">${urgencyLabel}</span>
                    </div>
                    <ol class="qh-steps">${stepsHtml}</ol>
                </div>`;
                container.insterAdjacentHTML("beforeend",cardHtml);
        });
    }catch(error){
        container.innerHTML = `<p class="ajax-error"> Unable to load quick help content. Please try again later.</p>`;
        console.error(error);
    }
}


$(document).ready(function(){
    accordion();
    carousel();
    quickHelp();
});