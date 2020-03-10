'use strict';

let menuBtn = document.querySelector('.menu-btn');
let closeBtn = document.querySelector('.close-btn');
let modalMenu = document.querySelector('.mainmenu-wrapper');

menuBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);

function openMenu() {
  modalMenu.classList.remove('hidden');
}

function closeMenu() {
  modalMenu.classList.add('hidden');
}