var WIDTH = 10;
var RADIUS = WIDTH/2;
var HEIGHT = 10;
var BOXES = 500;
var FRAME = 15;
var boxes = [];
var top = [];
var left = [];
function Container(width, height) {
  this.width = width;
  this.height = height;
  this.elem = null;

  this.init = function() {
    this.elem = document.createElement("div");
    this.elem.style.width = this.width + "px";
    this.elem.style.height = this.height + "px";
    this.elem.style.margin = "0 auto";
    this.elem.style.backgroundColor = "black";
    this.elem.style.position = "relative";
    document.body.appendChild(this.elem);
    return this;
  };
}

function createBoxes(x, y, Parent) {
  var xVelocity = 2;
  var yVelocity = 2;
  this.x = x;
  this.y = y;
  this.box = null;
  this.init = function() {
    this.box = document.createElement("div");
    this.box.style.position = "absolute";
    this.box.style.backgroundColor = "red";
    this.box.style.width = WIDTH + "px";
    this.box.style.height = HEIGHT + "px";
    this.box.style.borderRadius = 50 + '%';
    this.box.onclick = function(event) {
      var el = event.target;
      Parent.removeChild(el);
    };
    Parent.appendChild(this.box);
  };
  this.setPosition = function() {
    this.box.style.left = this.x + "px";
    this.box.style.top = this.y + "px";
  };

  this.moveBox = function() {
    if (this.x <= 0) {
      xVelocity = -xVelocity;
    }

    if (this.x + WIDTH >= 800) {
      xVelocity = -xVelocity;
    }

    if (this.y + HEIGHT >= 500) {
      yVelocity = -yVelocity;
    }
    if (this.y <= 0) {
      yVelocity = -yVelocity;
    }

    this.x += xVelocity;
    this.y += yVelocity;
  };

  this.detectCollision = function(i) {
    // for(var i = 0; i< BOXES; i++)
    // {
    for (var j = 0; j < BOXES; j++) {
      if (j != i) {
        var distanceX = boxes[i].x - boxes[j].x;
        var distanceY = boxes[i].y - boxes[j].y;
        var distance = Math.sqrt(
          Math.pow(distanceX, 2) + Math.pow(distanceY, 2)
        );
        if (distance <= (RADIUS+RADIUS)) {
          if (distanceX <= (RADIUS+RADIUS)) {
            xVelocity = -xVelocity;
            this.x += xVelocity;
          }
          if (distanceY <= (RADIUS+RADIUS)) {
            yVelocity = -yVelocity;
            this.y += yVelocity;
          }
        }
      }
    }
    // }
  };
}

function Animator(parentElem) {
  this.parentElem = parentElem;
  this.init = function() {
    for (var i = 1; i <= BOXES; i++) {
      var box = new createBoxes(
        Math.ceil(Math.random() * (800 - WIDTH)),
        Math.ceil(Math.random() * (500 - HEIGHT)),
        this.parentElem
      );
      boxes.push(box);
      box.init();
      box.setPosition();
    }
  };
  var interval = setInterval(function() {
    for (var i = 0; i < BOXES; i++) {
      boxes[i].moveBox();
      boxes[i].setPosition();
      boxes[i].detectCollision(i);
    }
  },FRAME);
}

var container = new Container(800, 500);
var parent = container.init();
new Animator(parent.elem).init();
