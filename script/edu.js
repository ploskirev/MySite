'use strict';

let wrapper = document.querySelector('.edu-main-wrapper');
let tabButtons = document.querySelectorAll('.tab');
let tabsWrapper = document.querySelector('.tabs-wrapper');
let tabs = document.querySelectorAll('.tab-content');



for (let i = 0; i < tabButtons.length; i++) {
  tabButtons[i].addEventListener('mouseover', (e) => {
    for (let j = 0; j < tabButtons.length; j++) {
      tabButtons[j].classList.remove('active');
      tabs[j].classList.add('hidden');
    }
    tabButtons[i].classList.add('active');
    tabs[i].classList.remove('hidden');
  });
}


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