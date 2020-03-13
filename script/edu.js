'use strict';

let wrapper = document.querySelector('.edu-main-wrapper');
let tabButtons = document.querySelectorAll('.tab');
let tabs = document.querySelectorAll('.tab-content');

wrapper.addEventListener('click', (e) => {
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove('active');
    tabs[i].classList.add('hidden');
    e.target.classList.add('active');
    if (e.target == tabButtons[i]) {
      tabs[i].classList.remove('hidden');
    }
  }
});