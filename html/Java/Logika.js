let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let xScore = 0;
let oScore = 0;

function placeMarker(cell) {
  const index = Array.from(cell.parentNode.children).indexOf(cell);

  if (gameBoard[index] === '' && gameActive) {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
      document.getElementById('message').textContent = `Pemain ${currentPlayer} menang!`;
      updateScore();
      gameActive = false;
    } else if (gameBoard.every((cell) => cell !== '')) {
      document.getElementById('message').textContent = 'Permainan seri!';
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      document.getElementById('message').textContent = `Pemain ${currentPlayer} giliran`;
    }
  }
}

function checkWinner() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // baris
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // kolom
    [0, 4, 8],
    [2, 4, 6], // diagonal
  ];

  const winner = winConditions.find((condition) => condition.every((index) => gameBoard[index] === currentPlayer));

  if (winner) {
    return true;
  }

  return false;
}

function updateScore() {
  if (currentPlayer === 'X') {
    xScore++;
    document.getElementById('x-score').textContent = `: ${xScore}`;
  } else if (currentPlayer === 'O') {
    oScore++;
    document.getElementById('o-score').textContent = `: ${oScore}`;
  }
}

function restartGame() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;

  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.textContent = '';
  });

  document.getElementById('message').textContent = `Pemain ${currentPlayer} giliran`;
}

// Tambahkan event listener untuk tombol restart
document.getElementById('restart-button').addEventListener('click', restartGame);

let backgroundSound = document.getElementById('background-sound');

function toggleBackgroundSound() {
  if (backgroundSound.paused) {
    backgroundSound.play();
  } else {
    backgroundSound.pause();
  }
}

document.getElementById('toggle-sound-button').addEventListener('click', toggleBackgroundSound);
