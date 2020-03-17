'use strict';

let graphista = {
  config: {
    container: document.querySelector('#graphistaWrapper'),
    canvas: document.querySelector('#graphista'),
    ctx: null,
    width: null,
    height: null,
    url: null
  },
  memory: {
    storage: [],
    cash: [],
    current: null
  },
  style: {
    lineWidth: 1,
    color: '#000',
    lineCap: 'round',
    lineJoin: 'round'
  },
  tool: {
    current: null,
    isDrawing: false
  },
  coordinates: {
    x: 0,
    y: 0
  },

  // methods
  init() {
    this.config.ctx = this.config.canvas.getContext('2d');
    this.config.width = this.config.canvas.clientWidth;
    this.config.height = this.config.canvas.clientHeight;
    this.config.canvas.setAttribute('width', this.config.width);
    this.config.canvas.setAttribute('height', this.config.height);
    this.moveTools();
    setTimeout(this.showTools, 100);
    this.config.ctx.lineCap = this.style.lineCap;
    this.config.ctx.lineJoin = this.style.lineJoin;
    let getCoordinates = this.getCoordinates.bind(this);
    this.config.canvas.addEventListener('mousemove', getCoordinates);
    let inputHandler = this.inputHandler.bind(this);
    this.config.container.addEventListener('input', inputHandler);
    let clickHandler = this.clickHandler.bind(this);
    this.config.container.addEventListener('click', clickHandler);
    let draw = this.draw.bind(this);
    this.config.canvas.addEventListener('mousedown', draw);
    let endDraw = this.endDraw.bind(this);
    this.config.canvas.addEventListener('mouseup', endDraw);
  },
  getCoordinates(e) {
    this.coordinates.x = e.offsetX;
    this.coordinates.y = e.offsetY;
    this.config.container.querySelector('#xCoord').innerText = this.coordinates.x;
    this.config.container.querySelector('#yCoord').innerText = this.coordinates.y;
  },
  inputHandler(e) {
    if (e.target.dataset.name == 'size') {
      this.config.ctx.lineWidth = this.style.lineWidth = e.target.value;
    }
  },
  clickHandler(e) {
    if (e.target.name == 'toolButton') {
      this.tool.current = e.target.dataset.name;
      this.focusTool(e);
    } else if (e.target.name == 'actionButton') {
      if (e.target.dataset.name == 'clear') {
        this.clearCanvas();
      } else if (e.target.dataset.name == 'save') {
        this.saveImage();
      } else if (e.target.dataset.name == 'undo') {
        this.undoAction();
      } else if (e.target.dataset.name == 'redo') {
        this.redoAction();
      }
    }
  },
  draw(e) {
    this.tool.isDrawing = true;
    let xStart = e.offsetX;
    let yStart = e.offsetY;
    console.log(xStart);
    if (this.tool.current == 'brush') {
      this.drawBrush(xStart, yStart);
    } else if (this.tool.current == 'circle') {
      this.drawCircle(xStart, yStart);
    } else if (this.tool.current == 'rectangle') {
      this.drawRectangle(xStart, yStart);
    } else if (this.tool.current == 'spray') {
      this.drawSpray();
    } else if (this.tool.current == 'fill') {
      this.fillBackground();
    }
  },
  endDraw() {
    this.tool.isDrawing = false;
    this.config.ctx.lineJoin = 'mitter';
  },
  redraw() {
    this.config.ctx.clearRect(0, 0, this.config.width, this.config.height);
    this.memory.storage.forEach((figure) => {
      this.config.ctx.lineWidth = figure.lineWidth;
      this.config.ctx.strokeStyle = this.config.ctx.fillStyle = figure.color;
      this.config.ctx.beginPath();
      if (figure.type == 'brush') {
        this.config.ctx.moveTo(figure.xStart, figure.yStart);
        for (let i = 0; i < figure.x.length; i++) {
          this.config.ctx.lineTo(figure.x[i], figure.y[i]);
        }
        this.config.ctx.stroke();
      } else if (figure.type == 'circle') {
        this.config.ctx.ellipse(figure.xStart, figure.yStart, figure.radius, figure.radius, Math.PI / 4, 0, 2 * Math.PI);
        this.config.ctx.stroke();
      } else if (figure.type == 'rectangle') {
        this.config.ctx.rect(figure.xStart, figure.yStart, figure.width, figure.height);
        this.config.ctx.stroke();
      } else if (figure.type == 'spray') {
        for (let i = 0; i < figure.x.length; i++) {
          this.config.ctx.fillRect(figure.x[i], figure.y[i], 1, 1);
        }
      } else if (figure.type == 'fill') {
        this.config.ctx.fillRect(0, 0, this.config.width, this.config.height);
      }
      this.config.ctx.closePath();
    });
    this.config.ctx.lineWidth = this.style.lineWidth;
    this.config.ctx.strokeStyle = this.config.ctx.fillStyle = this.style.color;
  },
  drawBrush(xStart, yStart) {
    this.clearCash();
    this.memory.current = {
      type: 'brush',
      lineWidth: this.style.lineWidth,
      color: this.style.color,
      xStart: xStart,
      yStart: yStart,
      x: [],
      y: []
    };
    this.config.ctx.beginPath();
    this.config.ctx.moveTo(xStart, yStart);
    this.config.canvas.onmousemove = () => {
      if (this.tool.isDrawing) {
        this.config.ctx.lineTo(this.coordinates.x, this.coordinates.y);
        this.config.ctx.stroke();
        this.memory.current.x.push(this.coordinates.x);
        this.memory.current.y.push(this.coordinates.y);
      }
    };
    this.config.ctx.closePath();
    this.memory.storage.push(this.memory.current);
  },
  drawCircle(xStart, yStart) {
    console.log('рисуем круг');
    this.clearCash();
    this.memory.current = {
      type: 'circle',
      color: this.style.color,
      lineWidth: this.style.lineWidth,
      xStart: xStart,
      yStart: yStart,
      radius: 0
    };
    this.config.canvas.onmousemove = () => {
      if (this.tool.isDrawing) {
        this.memory.current.radius = Math.sqrt(Math.pow(this.coordinates.x - xStart, 2) + Math.pow(this.coordinates.y - yStart, 2));
        this.redraw();
        this.config.ctx.beginPath();
        this.config.ctx.ellipse(xStart, yStart, this.memory.current.radius, this.memory.current.radius, Math.PI / 4, 0, 2 * Math.PI);
        this.config.ctx.stroke();
        this.config.ctx.closePath();
      }
    };
    this.config.canvas.onmouseup = () => {
      this.memory.storage.push(this.memory.current);
      console.dir(this.memory.storage);
    };
  },
  drawRectangle(xStart, yStart) {
    this.clearCash();
    this.memory.current = {
      type: 'rectangle',
      color: this.style.color,
      lineWidth: this.style.lineWidth,
      xStart: xStart,
      yStart: yStart,
      width: 0,
      height: 0
    };
    this.config.canvas.onmousemove = () => {
      if (this.tool.isDrawing) {
        this.memory.current.width = this.coordinates.x - xStart;
        this.memory.current.height = this.coordinates.y - yStart;
        this.redraw();
        this.config.ctx.beginPath();
        this.config.ctx.rect(xStart, yStart, this.memory.current.width, this.memory.current.height);
        this.config.ctx.stroke();
        this.config.ctx.closePath();
      }
    };
    this.config.canvas.onmouseup = () => {
      this.memory.storage.push(this.memory.current);
    };
  },
  drawSpray() {
    this.clearCash();
    this.memory.current = {
      type: 'spray',
      color: this.style.color,
      x: [],
      y: []
    };
    let spread;
    this.style.lineWidth < 3 ? spread = 4 : spread = this.style.lineWidth * 2;
    this.config.canvas.onmousemove = () => {
      if (this.tool.isDrawing) {
        for (let i = 0; i <= spread; i++) {
          let delta1 = this.getRandom(1, spread);
          let delta2 = this.getRandom(1, spread);
          this.config.ctx.fillRect(this.coordinates.x + delta1, this.coordinates.y - delta2, 1, 1);
          this.memory.current.x.push(this.coordinates.x + delta1);
          this.memory.current.y.push(this.coordinates.y - delta2);
        }
      }
    };
    this.memory.storage.push(this.memory.current);
  },
  fillBackground() {
    this.clearCash();
    this.memory.current = {
      type: 'fill',
      color: this.style.color
    };
    this.config.ctx.fillRect(0, 0, this.config.width, this.config.height);
    this.memory.storage.push(this.memory.current);
  },
  setColor(picker) {
    this.style.color = picker.toHEXString();
    this.config.ctx.fillStyle = this.config.ctx.strokeStyle = this.style.color;
  },
  clearCanvas() {
    this.config.ctx.clearRect(0, 0, this.config.width, this.config.height);
    this.memory.storage = [];
  },
  saveImage() {
    let saveBtn = this.config.container.querySelector('#saveButton');
    this.config.url = this.config.canvas.toDataURL('image/png');
    saveBtn.href = this.config.url;
  },
  undoAction() {
    if (this.memory.storage.length > 0) {
      this.memory.cash.push(this.memory.storage.pop());
      this.redraw();
    }
  },
  redoAction() {
    if (this.memory.cash.length > 0) {
      this.memory.storage.push(this.memory.cash.pop());
      this.redraw();
    }
  },
  clearCash() {
    this.memory.cash = [];
  },
  focusTool(e) {
    let toolBtns = this.config.container.querySelectorAll('button[name="toolButton"]');
      toolBtns.forEach((btn) => {
        btn.classList.remove('activeTool');
        if (e.target == btn) {
          btn.classList.add('activeTool');
        }
      });
  },
  moveTools() {
    let toolsDiv = document.querySelector('.tools');
    toolsDiv.onmousedown = function(event) {
      if (event.target.name == 'toolButton' || event.target.name == 'actionButton' || event.target.name == 'propertyInput') {
        return;
      }
      let shiftX = event.clientX - toolsDiv.getBoundingClientRect().left;
      let shiftY = event.clientY - toolsDiv.getBoundingClientRect().top;

      function moveAt(pageX, pageY) {
        toolsDiv.style.left = pageX - shiftX + 'px';
        toolsDiv.style.top = pageY - shiftY + 'px';
      }

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }
      document.addEventListener('mousemove', onMouseMove);
      toolsDiv.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        toolsDiv.onmouseup = null;
      };
    };
    toolsDiv.ondragstart = function() {
      return false;
    };
  },
  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },
  showTools() {
    document.querySelector('.tools').classList.remove('noShow');
  }
};


graphista.init();