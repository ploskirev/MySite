'use strict';

let canv = document.querySelector('canvas');
let ctx = canv.getContext('2d');

let balls = [];

for (let i = 0; i < 25; i++) {
  let x = Math.random() * 396;
  let y = Math.random() * 345;
  let r = Math.random() * 5;
  let vx = Math.random() * 1;
  let vy = Math.random() * 1;
  let ball = {
    x: x,
    y: y,
    r: r,
    vx: vx,
    vy: vy
  };
  balls.push(ball);
}

function render() {
  ctx.clearRect(0, 0, 396, 345);
  for (let i = 0; i < balls.length; i++) {
    ctx.strokeStyle = 'rgba(190, 120, 120, .5)';
    ctx.fillStyle = 'rgba(120, 120, 120, .05)';
    ctx.beginPath();
    ctx.arc(balls[i].x, balls[i].y, balls[i].r, 0, Math.PI*2, true);
    ctx.stroke();
    ctx.fill();
  }
}

function checkBorder() {
  for (let i = 0; i < balls.length; i++) {
    if (balls[i].x >= 415 || balls[i].x <= -10) {
      balls[i].vx *= -1;
    };
    if (balls[i].y >= 355 || balls[i].y <= -10) {
      balls[i].vy *= -1;
    };
  }
}

function run () {
  for (let i = 0; i < balls.length; i++) {
    checkBorder();
    balls[i].x += balls[i].vx;
    balls[i].y += balls[i].vy;
  }
  render();
  requestAnimationFrame(run);
}

requestAnimationFrame(run);
