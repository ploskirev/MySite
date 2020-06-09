'use strict';

class Tabs {
  constructor(mainContainer, tabButton, tabButtonsContainer, tabsContent) {
    this.container = document.querySelector(mainContainer);
    this.tabButtons = this.container.querySelectorAll(tabButton);
    this.tabButtonsContainer = this.container.querySelector(tabButtonsContainer);
    this.tabsContent = this.container.querySelectorAll(tabsContent);
    this.init();
  }

  handleEvent(event) {
    this.tabButtons.forEach((tabButton, index) => {
      if (tabButton == event.target) {
        for (let i = 0; i < this.tabButtons.length; i++) {
          this.tabButtons[i].classList.remove('active');
          this.tabsContent[i].classList.add('hidden');
          tabButton.classList.add('active');
          this.tabsContent[index].classList.remove('hidden');
        }
      }
    });
  }

  init() {
    this.tabButtonsContainer.addEventListener('click', this);
    this.tabButtonsContainer.addEventListener('mouseover', this);
  }
}

let eduTabs = new Tabs('.edu-main-wrapper', '.tab', '.tabs-wrapper', '.tab-content');