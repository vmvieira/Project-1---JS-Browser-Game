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
    console.log(this.topBox);
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

  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  release() {
    if (this.gameMode == "release") {
      this.y += this.ySpeed;
    }
    if (this.ySpeed > 0 && this.y == canvas.height - 100) {
      this.ySpeed = 0;
    }
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
