// Declarações necessárias de variáveis, objetos e classes.

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Boxes {
  constructor(x, y, width, height, speed, gameMode) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.gameMode = gameMode;
  }
}

class Game {
  constructor(score, frames, animationId) {
    this.score = score;
    this.frames = frames;
    this.animationId;
  }
}

// Função que inicia o jogo, inserindo as caixas e o placar.
function startGame() {
  const game = new Game();
  const box = new Boxes();
}

// Função que anima o jogo, atualizando o lugar de cada elemento.
function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame;
}

// O core loop do jogo:

// Função que fica pingando a caixa nas laterais do canvas.
function bounceMode() {}

// Função que solta a caixa do "bounceMode" e detecta ou não a colisão entre elas.
function releaseMode() {}

// Função que faz todas as verificações:
// Verifica se o jogo encerrou "gameover" e, caso contrário,
// Cria nova caixa, atualiza o placar e retorna o gameMode para o bounceMode
function checkMode() {}
