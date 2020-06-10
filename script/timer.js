'use strict';

class Timer {
  constructor(startDate, timerContainer, dayContainer, hourContainer, minContainer, secContainer) {
    this.start = new Date(startDate);
    this.container = document.querySelector(timerContainer);
    this.dayField = this.container.querySelector(dayContainer);
    this.hourField = this.container.querySelector(hourContainer);
    this.minField = this.container.querySelector(minContainer);
    this.secField = this.container.querySelector(secContainer);
    setInterval(() => this.init(), 1000);
  }

  getDuration() {
    this.duration = Date.now() - this.start;
  }

  convertDuration() {
    let d = this.duration;
    this.days = Math.floor(d / (1000 * 60 * 60 * 24)) + '';
    this.hours = Math.floor(d / (1000 * 60 * 60) % 24) + '';
    this.minutes = Math.floor(d / (1000 * 60) % 60) + '';
    this.seconds = Math.floor(d / (1000) % 60) + '';
  }

  checkLength(field, digit) {
    while (digit.length < 2) {
      digit = '0' + digit;
    }
    this[field] = digit;
  }

  makeWord() {
    let lastIndex = this.days[this.days.length - 1];
    let preLastIndex = this.days[this.days.length - 2];

    let word = '';
    if (preLastIndex != 1 && lastIndex == 1) {
      word = ' день';
    } else if (preLastIndex != 1 && lastIndex <= 4 && lastIndex >= 2) {
      word = ' дня';
    } else {
      word = ' дней';
    }

    return word;
  }

  render() {
    this.dayField.textContent = `${this.days} ${this.makeWord()}`;
    this.hourField.textContent = `${this.hours}`;
    this.minField.textContent = `${this.minutes}`;
    this.secField.textContent = `${this.seconds}`;
  }

  init() {
    this.getDuration();
    this.convertDuration();
    this.checkLength('hours', this.hours);
    this.checkLength('minutes', this.minutes);
    this.checkLength('seconds', this.seconds);
    this.makeWord();
    this.render();
  }
}

let timer = new Timer('2020-06-10T02:33:00', '#timer', '#days', '#hours', '#mins', '#secs');