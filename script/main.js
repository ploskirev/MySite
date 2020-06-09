'use strict';

class Modal {
    constructor(opnBtnSelector, clsBtnSelector, mdlWindowSelector) {
      this.window = document.querySelector(mdlWindowSelector);
      this.openButton = document.querySelector(opnBtnSelector);
      this.closeButton = document.querySelector(clsBtnSelector);
      this.init();
    }
  
    handleEvent() {
      this.window.classList.toggle('hidden');
    }
  
    init() {
      this.openButton.addEventListener('click', this);
      this.closeButton.addEventListener('click', this);
    }
  }
  
  let mainModalMenu = new Modal('.menu-btn', '.close-btn', '.mainmenu-wrapper');
