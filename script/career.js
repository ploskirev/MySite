let chrono = document.querySelector('.chronograph');

window.addEventListener('scroll', function() {

  let a = window.pageYOffset + window.innerHeight;
  let b = document.body.clientHeight;
  let c = a / b;
  if (c <= 0.5) {
    chrono.textContent = '2011';
  } else if (c <= 0.6) {
    chrono.textContent = '2012';
  } else if (c <= 0.65) {
    chrono.textContent = '2013'
  } else if (c <= 0.75) {
    chrono.textContent = '2014';
  } else if (c <= 0.81) {
    chrono.textContent = '2015';
  } else if (c <= 0.85) {
    chrono.textContent = '2016';
  } else if (c <= 0.98) {
    chrono.textContent = '2018';
  } else if (c == 1) {
    chrono.innerText = '2020';
    this.console.log('2020');
  }
})

let wrapper = document.querySelector('.carrer-main-inner-wrapper');
let moreButtons = document.querySelectorAll('.more-info-career');
let closeButtons = document.querySelectorAll('.close-modal-btn');
let shadow = document.querySelector('.shadow');
let modals = document.querySelectorAll('.career-info');

wrapper.addEventListener('click', (e) => {
  for (let i = 0; i < moreButtons.length; i++) {
    if (e.target == moreButtons[i]) {
      let modal = document.getElementById(e.target.dataset.id);
      modal.classList.remove('hidden');
      shadow.classList.remove('hidden');
      document.body.classList.add('freezed');
    } else if (e.target == closeButtons[i]) {
      let modal = document.getElementById(e.target.dataset.id);
      modal.classList.add('hidden');
      shadow.classList.add('hidden');
      document.body.classList.remove('freezed');
    }
  }
});

shadow.addEventListener('click', () => {
  if (!shadow.classList.contains('hidden')) {
    for (let i = 0; i < modals.length; i++) {
      modals[i].classList.add('hidden');
    }
    shadow.classList.add('hidden');
    document.body.classList.remove('freezed');
  }
})