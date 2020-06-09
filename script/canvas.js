'use strict';


class Canvas {
  constructor(canvas, quantity, width, height) {
    this.container = document.querySelector(canvas);
    this.ctx = this.container.getContext('2d');
    this.width = width;
    this.height = height;
    this.balls = [];
    this.quantity = quantity;
    this.init();
  }

  getRandom(max) {
    let rand = Math.random() * max;
    return rand;
  }

  createBalls() {
    for (let i = 0; i < this.quantity; i++) {
      let x = this.getRandom(this.width);
      let y = this.getRandom(this.height);
      let r = this.getRandom(5);
      let vx = this.getRandom(1);
      let vy = this.getRandom(1);;
      let ball = {
        x: x,
        y: y,
        r: r,
        vx: vx,
        vy: vy
      };
      this.balls.push(ball);
    }
  }

  checkborder() {
    this.balls.forEach((ball) => {
      if (ball.x >= (this.width + 10) || ball.x <= -10) {
        ball.vx *= -1;
      };
      if (ball.y >= (this.height + 10) || ball.y <= -10) {
        ball.vy *= -1;
      };
    });
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.balls.forEach((ball) => {
      this.ctx.strokeStyle = 'rgba(190, 120, 120, .3)';
      this.ctx.fillStyle = 'rgba(120, 120, 120, .05)';
      this.ctx.beginPath();
      this.ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2, true);
      this.ctx.stroke();
      this.ctx.fill();
    });
  }

  run() {
    this.balls.forEach((ball) => {
      this.checkborder();
      ball.x += ball.vx;
      ball.y += ball.vy;
    });
    this.render();
    requestAnimationFrame(() => this.run());
  }

  init() {
    this.createBalls();
    requestAnimationFrame(() => this.run());
  }
}

let canv = new Canvas('canvas', 25, 396, 345);