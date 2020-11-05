// Declarações necessárias de variáveis, objetos e classes.

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Game {
  constructor(movingBox, botBox) {
    this.animationId;
    this.score = 0;
    this.movingBox = movingBox;
    this.boxes = [];
    this.boxes[0] = botBox;
    this.nextBoxWidth = 0;
  }

  updateGame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.movingBox.draw();
    this.movingBox.bounce();
    this.movingBox.release();
    this.boxes.map((currentBox) => {
      currentBox.draw();
    });
    this.animationId = requestAnimationFrame(this.updateGame);
    this.boxCheck();
    this.updateScore(this.score);
  };

  boxCheck = () => {
    let topBox = this.boxes[this.boxes.length - 1];
    const colided = this.movingBox.isColidedWith(topBox);
    let difference = Math.abs(this.movingBox.x - topBox.x);
    if (colided) {
      this.movingBox.gameMode = "static";
      this.boxes.push(this.movingBox);
      this.score += 1;
      let speedInc = this.movingBox.xSpeed;
      if (speedInc > 0) {
        speedInc += 2;
      } else if (speedInc < 0) {
        speedInc -= 2;
      }
      let difference = Math.abs(this.movingBox.x - topBox.x);
      let newBoxWidth = this.movingBox.width - difference;
      this.movingBox = new Box(50, 50, newBoxWidth, 50, speedInc, 2, "bounce");
      topBox.width = topBox.width - difference;
      console.log(this.movingBox);
      if (this.boxes.length > 4) {
        this.boxes.shift();
        this.boxes.forEach((box) => {
          box.y += box.height;
        });
      }
    } else if (
      this.movingBox.gameMode == "release" &&
      difference > topBox.width
    ) {
      ctx.font = "normal normal bold 20px sans-serif";
      ctx.fillStyle = "blue";
      ctx.fillText(
        "Game over! Press the start game button above to play again!",
        200,
        100
      );
    }
  };

  updateScore = (score) => {
    ctx.font = "normal normal bold 40px sans-serif";
    ctx.fillStyle = "blue";
    ctx.fillText(`Score: ${this.score} `, 25, 200);
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
      new Box(50, 50, 400, 50, 2, 2, "bounce"),
      new Box(300, canvas.height - 50, 400, 50, 0, 0, "static")
    );

    game.updateGame();
    canvas.onpointerdown = function () {
      if (game.movingBox.gameMode == "bounce") {
        game.movingBox.gameMode = "release";
      }
    };
  }
};
