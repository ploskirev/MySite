let sliderFirst = document.querySelector('.slider-img');
let pgn = sliderFirst.querySelector('.pagination');
let pgnBtn = [];
let sliderImgItem = sliderFirst.querySelector('.slider-img-item');
let addClick = function (pgnButton, image, alt) {
    pgnButton.addEventListener('click', function () {
        sliderImgItem.src = image;
        sliderImgItem.alt = alt;
        for(let i=0; i<pgnBtn.length; i++) {
            pgnBtn[i].classList.remove('pagination-button-active');
        }
        pgnButton.classList.add('pagination-button-active')
    });
}

sliderImgItem.src = images[0];
sliderImgItem.alt = alt[0];
for (let i=0; i<images.length; i++) {
    pgnBtn[i] = document.createElement("div");
    pgnBtn[i].href = '#';
    pgnBtn[i].classList.add('pagination-button');
    pgnBtn[i].id = 'pagination-button-' + (i+1);
    pgn.appendChild(pgnBtn[i]);
    addClick(pgnBtn[i], images[i], alt[i]);
}

pgnBtn[0].classList.add('pagination-button-active');




