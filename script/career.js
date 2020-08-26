'use strict';

class Chrono {
  constructor(container) {
    this.container = document.querySelector(container);
    this.init();
  }

  handleEvent(event) {
    let a = window.pageYOffset + window.innerHeight;
    let b = document.body.clientHeight;
    let c = a / b;
    if (c <= 0.5) {
      this.container.textContent = '2011';
    } else if (c <= 0.6) {
      this.container.textContent = '2012';
    } else if (c <= 0.65) {
      this.container.textContent = '2013'
    } else if (c <= 0.75) {
      this.container.textContent = '2014';
    } else if (c <= 0.81) {
      this.container.textContent = '2015';
    } else if (c <= 0.85) {
      this.container.textContent = '2016';
    } else if (c <= 0.98) {
      this.container.textContent = '2018';
    } else if (c >= 0.99) {
      this.container.innerText = '2020';
    }
  }

  init() {
    window.addEventListener('scroll', this);
  }
}

let chronograph = new Chrono('.chronograph');

class CareerModals {
  constructor(container, opnBtns, clsBtns, shadow, mdls) {
    this.container = document.querySelector(container);
    this.openButtons = document.querySelectorAll(opnBtns);
    this.closeButtons = document.querySelectorAll(clsBtns);
    this.shadow = document.querySelector(shadow);
    this.modals = document.querySelectorAll(mdls);
    this.init();
  }

  handleEvent(event) {
    if (event.target == this.shadow) {
      for (let i = 0; i < this.modals.length; i++) {
        this.modals[i].classList.add('hidden');
        this.shadow.classList.add('hidden');
        document.body.classList.remove('freezed');
      }
    } else {
      for (let i = 0; i < this.openButtons.length; i++) {
        if (event.target == this.openButtons[i]) {
          let modal = document.getElementById(event.target.dataset.id);
          modal.classList.remove('hidden');
          this.shadow.classList.remove('hidden');
          document.body.classList.add('freezed');
        } else if (event.target == this.closeButtons[i]) {
          let modal = document.getElementById(event.target.dataset.id);
          modal.classList.add('hidden');
          this.shadow.classList.add('hidden');
          document.body.classList.remove('freezed');
        }
      }
    }
  }

  init() {
    this.container.addEventListener('click', this);
    this.shadow.addEventListener('click', this);
  }
}

let carModals = new CareerModals('.carrer-main-inner-wrapper', '.more-info-career', '.close-modal-btn', '.shadow', '.career-info');