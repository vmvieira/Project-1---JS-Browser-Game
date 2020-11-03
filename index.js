// Declarações necessárias de variáveis, objetos e classes.

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Game {
  constructor(topBox, botBox) {
    this.topBox = topBox;
    this.botBox = botBox;
    this.animationId;
    this.frames = 0;
    this.score = 0;
  }

  updateGame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.topBox.draw();
    this.topBox.bounce();
    this.topBox.release();
    this.botBox.draw();
    //this.updateScore(this.score)
    this.animationId = requestAnimationFrame(this.updateGame);
    this.boxCheck();
  };

  boxCheck = () => {
    const colided = this.topBox.isColidedWith(botBox);
    if (colided) {
      this.topBox.gameMode = "static";
      let difference = Math.abs(this.topBox.x - this.botBox.x);
      console.log(difference);
      cancelAnimationFrame(this.animationId);
    }
    //newBox();
  };
}

class Box {
  constructor(x, y, width, height, xSpeed, ySpeed, gameMode) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.gameMode = gameMode;
  }

  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  newBox() {}

  bounce() {
    if (this.gameMode == "bounce") {
      this.x += this.xSpeed;
    }
    if (this.xSpeed > 0 && this.x + this.width > canvas.width) {
      this.xSpeed = -this.xSpeed;
    }
    if (this.xSpeed < 0 && this.x < 0) {
      this.xSpeed = -this.xSpeed;
    }
  }

  release() {
    if (this.gameMode == "release") {
      this.y += this.ySpeed;
    }
  }

  left() {
    return this.x;
  }

  right() {
    return this.x + this.width;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.height;
  }

  isColidedWith(botBox) {
    const condition = !(
      this.bottom() < botBox.top() ||
      this.top() > botBox.bottom() ||
      this.right() < botBox.left() ||
      this.left() > botBox.right()
    );

    return condition;
  }
}

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  function startGame() {
    const game = new Game(
      (topBox = new Box(50, 50, 400, 50, 2, 2, "bounce")),
      (botBox = new Box(300, canvas.height - 50, 400, 50, 0, 0, "static"))
    );

    game.updateGame();
  }

  canvas.onpointerdown = function () {
    if (topBox.gameMode == "bounce") {
      topBox.gameMode = "release";
    }
  };
};
