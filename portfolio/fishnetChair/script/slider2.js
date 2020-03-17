let sliderSecond = document.querySelector('#slider-img2');
let pgn2 = sliderSecond.querySelector('#pagination2');
let pgnBtn2 = [];
let sliderImgItem2 = sliderSecond.querySelector('#slider-img-item2');
let addClick2 = function (pgnButton, image, alt) {
    pgnButton.addEventListener('click', function () {
        sliderImgItem2.src = image;
        sliderImgItem2.alt = alt;
        for(let i=0; i<pgnBtn2.length; i++) {
            pgnBtn2[i].classList.remove('pagination-button-active');
        }
        pgnButton.classList.add('pagination-button-active');
    });
};

sliderImgItem2.src = images2[0];
sliderImgItem2.alt = alt2[0];
for (let i=0; i<images2.length; i++) {
    pgnBtn2[i] = document.createElement("div");
    pgnBtn2[i].href = '#';
    pgnBtn2[i].classList.add('pagination-button');
    pgnBtn2[i].id = 'pagination-button-' + (i+1);
    pgn2.appendChild(pgnBtn2[i]);
    addClick2(pgnBtn2[i], images2[i], alt2[i]);
}

pgnBtn2[0].classList.add('pagination-button-active');