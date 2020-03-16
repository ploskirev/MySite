'use strict';



function getTime() {
  let now = Date.now();
  let start = new Date('2020-03-15T13:23:00');
  let diff = now - start;

  let days = '' + Math.floor(diff / 86400000);
  let hours = '' + Math.floor((diff % 86400000) / 3600000);
  let mins = '' + Math.floor(((diff % 86400000) % 3600000) / 60000);
  let secs = '' + Math.floor((((diff % 86400000) % 3600000) % 60000) / 1000);

  while (hours.length < 2) {
    hours = '0' + hours;
  }
  while (mins.length < 2) {
    mins = '0' + mins;
  }
  while (secs.length < 2) {
    secs = '0' + secs;
  }

  let lastIndex = days[days.length - 1];
  let preLastIndex = days[days.length - 2];

  let word = '';
  if (preLastIndex != 1 && lastIndex == 1) {
    word = ' день';
  } else if (preLastIndex != 1 && lastIndex <= 4 && lastIndex >= 2) {
    word = ' дня';
  } else {
    word = ' дней';
  }



  let timer = document.querySelector('#timer');
  let daysField = timer.querySelector('#days');
  let hoursField = timer.querySelector('#hours');
  let minsField = timer.querySelector('#mins');
  let secsField = timer.querySelector('#secs');

  daysField.textContent = `${days} ${word}`;
  hoursField.textContent = `${hours}`;
  minsField.textContent = `${mins}`;
  secsField.textContent = `${secs}`;
}

setInterval(getTime, 1000);