'use strict';


class Canvas {
  constructor(canvas, width, height) {
    this.container = document.querySelector(canvas);
    this.ctx = this.container.getContext('2d');
    this.width = width;
    this.height = height;
    this.balls = [];
    this.quantity = 0;
    this.coordinates = {};
    this.init();
  }

  getRandom(max) {
    return Math.random() * max;
  }

  getRandomFrom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  getCoordinates(e) {
    this.coordinates.x = e.offsetX;
    this.coordinates.y = e.offsetY;
  }

  createBalls() {
    let x = -10;
    let col = 0;
    while (x <= this.width + 30) {
      let y = -10 + this.getRandomFrom(-10, 10);
      let row = 0;
      let xCurr = x;
      col++;
      while (row <= 17) {
        let vx = this.getRandom(0.1);
        let vy = this.getRandom(0.1)
        let ball = {
          xStart: xCurr,
          yStart: y,
          x: xCurr,
          y: y,
          r: 1,
          vx: vx,
          vy: vx,
          col: col
        }
        row++;
        this.balls.push(ball);
        y += this.width / 18 + this.getRandomFrom(-10, 10);
        xCurr = x + this.getRandomFrom(-15, 15);
      }
      x += this.width / 20 + this.getRandomFrom(5, 5);
    }
    this.quantity = this.balls.length;
  }

  checkborder() {
    this.balls.forEach((ball) => {
      if (ball.x >= (ball.xStart + 3) || ball.x <= (ball.xStart - 3)) {
        ball.vx = ((ball.vx > 0) ? (-1 * this.getRandom(0.07)) : (this.getRandom(0.07)));
      };
      if (ball.y >= (ball.yStart + 3) || ball.y <= (ball.yStart - 3)) {
        ball.vy = ((ball.vy > 0) ? (-1 * this.getRandom(0.07)) : (this.getRandom(0.07)));
      };
    });
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.balls.forEach((ball, index) => {
      this.ctx.strokeStyle = 'rgba(120, 120, 120, .3)';
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2, true);
      this.ctx.stroke();
      this.ctx.closePath();

      
      if ((index + 1) % 18 != 0) {
        this.ctx.beginPath();
        this.ctx.moveTo(ball.x, ball.y);
        this.ctx.lineTo(ball.x, ball.y);
        this.ctx.lineTo(this.balls[index + 1].x, this.balls[index + 1].y);
        this.ctx.stroke();
        this.ctx.closePath();
      }

      if (index < this.balls.length - 18) {
        this.ctx.lineWidth = 0.3;
        this.ctx.moveTo(ball.x, ball.y);
        this.ctx.lineTo(ball.x, ball.y);
        this.ctx.lineTo(this.balls[index + 18].x, this.balls[index + 18].y);
        this.ctx.stroke();
      }


      if (this.coordinates.x - ball.x > -35 && this.coordinates.x - ball.x < 35 && this.coordinates.y - ball.y > -35 && this.coordinates.y - ball.y < 35) {
        this.ctx.strokeStyle = 'rgba(190, 70, 70, .5)';
        this.ctx.lineWidth = 1;
      }
      this.ctx.stroke();
      this.ctx.closePath();
    });
  }

  run() {
    this.checkborder();
    this.balls.forEach((ball) => {
      ball.x += ball.vx;
      ball.y += ball.vy;
    });
    this.render();
    requestAnimationFrame(() => this.run());
  }

  init() {
    this.createBalls();
    this.container.addEventListener('mousemove', (e) => this.getCoordinates(e));
    this.run();
  }
}

let canv = new Canvas('canvas', 396, 345);