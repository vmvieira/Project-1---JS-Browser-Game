// Declarações necessárias de variáveis, objetos e classes.

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// ctx.fillStyle = "blue";
// ctx.fillRect(50, 50, 400, 50);
// ctx.fillStyle = "black";
// ctx.fillRect(300, canvas.height - 50, 400, 50);

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
    this.botBox.draw();
    //this.updateScore(this.score)
    this.animationId = requestAnimationFrame(this.updateGame);
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
}

window.onload = () => {
  document.getElementById("canvas").onclick = () => {
    startGame();
  };

  function startGame() {
    const game = new Game(
      (topBox = new Box(50, 50, 400, 50, 2, 0, "bounce")),
      (botBox = new Box(300, canvas.height - 50, 400, 50, "static"))
    );

    game.updateGame();
  }
};

//     startGame() {
//       let activeBox = new Boxes(50, 50, 400, 50, 1, 0, "bounce");
//       let staticBox = new Boxes(300,canvas.height - 50, 400, 50);

//       updateGame();
//     }
//     Função que anima o jogo, atualizando o lugar de cada elemento.

//     updateGame() {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       this.Boxes.draw();
//       requestAnimationFrame;
//     }
//     draw() {
//       ctx.fillStyle = "blue";
//       ctx.fillRect(this.x, this.y, this.width, this.height);
//     }

//     O core loop do jogo:

//     Função que fica pingando a caixa nas laterais do canvas.
//     bounceMode() {
//       Possível versão da função:
//       if (gameMode == 'bounce') {
//         this.xSpeed = 1;
//         if (this.xSpeed > 0 && this.x + this.width > canvas.width) {
//           this.xSpeed = -1;
//           }
//         if (this.xSpeed < 0 && this.X < 0) {
//           this.xSpeed = 1;
//           }
//       }
//     }

//     Função que solta a caixa do "bounceMode" e detecta ou não a colisão entre elas.
//     releaseMode() {}

//     Função que faz todas as verificações:
//     Verifica se o jogo encerrou "gameover" e, caso contrário,
//     Cria nova caixa, atualiza o placar e retorna o gameMode para o bounceMode
//     checkMode() {}
//   }

//   class Game {
//     constructor(score, frames, animationId) {
//       this.score = score;
//       this.frames = frames;
//       this.animationId;
//     }
