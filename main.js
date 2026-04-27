
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
        const response = await fetch("quickhelp.json");
        const data = await response.json();

        container.innerHTML="";

        data.forEach(card => {
            const urgencyClass = card.urgency === "ER" ? "qh-urgency--er": "qh-urgency--monitor";
            const urgencyLabel = card.urgency === "ER" ? "Emergency" : "Monitor";
            const cardClass = card.urgency === "ER" ? "quick-help-card er" : "quick-help-card";
            const stepsHtml=card.steps.map(step => `<li>${step}</li>`).join("");
            const cardHtml = `<div class="${cardClass}">
                    <div class="qh-card-header">
                        <h3>${card.title}</h3>
                        <span class="qh-urgency ${urgencyClass}">${urgencyLabel}</span>
                    </div>
                    <ol class="qh-steps">${stepsHtml}</ol>
                </div>`;
                container.insertAdjacentHTML("beforeend",cardHtml);
        });

    }catch(error){
        container.innerHTML = `<p class="ajax-error"> Unable to load quick help content. Please try again later.</p>`;
        console.error(error);
    }
}

// pet info form
function petInfo(){
    const form = document.querySelector("#pet-info");
    const display = document.querySelector("#pet-info-display");
    const clearBtn = document.querySelector("#clear-pet-info");
    
    if(!form) return;

    loadPetInfo();
    form.addEventListener("submit", function(e){
        e.preventDefault();

        const data = {
            name: document.querySelector("#pet-name").value,
            species: document.querySelector("#pet-species").value,
            sex: document.querySelector("#pet-sex").value,
            breed: document.querySelector("#pet-breed").value,
            age: document.querySelector("#pet-age").value,
            weight: document.querySelector("#pet-weight").value,
            clinicName: document.querySelector("#vet-clinic-name").value,
            clinicPhone: document.querySelector("#vet-clinic-phone").value,
            clinicAddress: document.querySelector("#vet-clinic-address").value,
            erVetName: document.querySelector("#ER-vet-name").value,
            erVetPhone: document.querySelector("#ER-vet-phone").value,
            erVetAddress: document.querySelector("#ER-vet-address").value,
        };
        localStorage.setItem("petInfo", JSON.stringify(data));
        renderPetInfo(data);
    });

    clearBtn.addEventListener("click", function(){
        localStorage.removeItem("petInfo");
        form.reset();
        display.innerHTML = "";
    });

    function loadPetInfo(){
        const saved = localStorage.getItem("petInfo");
         if (!saved) return;

         const data = JSON.parse(saved);

        document.querySelector("#pet-name").value = data.name || "";
        document.querySelector("#pet-species").value = data.species || "";
        document.querySelector("#pet-sex").value = data.sex || "";
        document.querySelector("#pet-breed").value = data.breed || "";
        document.querySelector("#pet-age").value = data.age || "";
        document.querySelector("#pet-weight").value = data.weight || "";
        document.querySelector("#vet-clinic-name").value = data.clinicName || "";
        document.querySelector("#vet-clinic-phone").value = data.clinicPhone || "";
        document.querySelector("#vet-clinic-address").value = data.clinicAddress || "";
        document.querySelector("#ER-vet-name").value = data.erVetName || "";
        document.querySelector("#ER-vet-phone").value = data.erVetPhone || "";
        document.querySelector("#ER-vet-address").value = data.erVetAddress || "";
        renderPetInfo(data);
    }
    function renderPetInfo(data) {
        const breedHtml = data.breed
        ? `<p><strong>Breed:</strong> ${data.breed}</p>` :"";
        const ageHtml = data.age
        ? `<p><strong>Age(years or months):</strong> ${data.age}</p>` :"";
        const weightHtml = data.weight
        ? `<p><strong>Weight(lbs):</strong> ${data.weight}</p>` :"";

        display.innerHTML = 
        `<div class ="pet-info-card">
            <h3>Saved Pet Information</h3>

            <div class = "pet-info-grid">
                <div class = "pet-info-section">
                    <h4> Pet Details</h4>
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Species:</strong> ${data.species}</p>
                    <p><strong>Sex:</strong> ${data.sex}</p>
                    ${breedHtml}
                    ${ageHtml}
                    ${weightHtml}
                </div>

                <div class="pet-info-section">
                    <h4>Regular Vet Clinic</h4>
                    <p><strong>Clinic:</strong> ${data.clinicName}</p>
                    <p><strong>Phone:</strong> <a href="tel: ${data.clinicPhone}">${data.clinicPhone}</a></p>
                    <p><strong>Address:</strong> ${data.clinicAddress}</p>
                </div>
                <div class="pet-info-section">
                    <h4>Emergency Vet Clinic</h4>
                    <p><strong>Clinic:</strong> ${data.erVetName}</p>
                    <p><strong>Phone:</strong> <a href="tel: ${data.erVetPhone}">${data.erVetPhone}</a></p>
                    <p><strong>Address:</strong> ${data.erVetAddress}</p>
                </div>
            </div>
        </div>`;
    }
}

$(document).ready(function(){
    accordion();
    carousel();
    quickHelp();
    petInfo();
});