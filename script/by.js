'use strict';

let modalBy = {
  modalWrapper: document.querySelector('.by-wrapper'),
  modal: document.querySelector('.by'),
  clsBtn: document.querySelector('#clsByBtn'),
  playBtn: document.querySelector('#playBtn'),

  handleEvent(event) {
    if (event.type == 'click') {
      if (event.target == this.clsBtn || event.target == this.playBtn || event.target == this.modalWrapper) {
        this.closeModal();
      }
    } else if (event.type == 'mouseout') {
      if (!event.relatedTarget && event.clientY < 1) {
        this.showModal();
      }
    }
  },

  showModal() {
    this.modalWrapper.classList.remove('hidden');
  },

  closeModal() {
    this.modalWrapper.classList.add('hidden');
  },

  init() {
    document.addEventListener('mouseout', this);
    this.modalWrapper.addEventListener('click', this);
  }
}

modalBy.init();