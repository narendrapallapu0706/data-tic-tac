const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const checkWinner = () => {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const checkDraw = () => {
  return board.every(cell => cell !== null);
};

const handleClick = (e) => {
  const index = e.target.dataset.index;
  if (board[index] || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    message.textContent = ${winner} Wins!;
    gameActive = false;
  } else if (checkDraw()) {
    message.textContent = 'Draw!';
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = Player ${currentPlayer}'s turn;
  }
};

const restartGame = () => {
  board = Array(9).fill(null);
  cells.forEach(cell => (cell.textContent = ''));
  currentPlayer = 'X';
  gameActive = true;
  message.textContent = Player ${currentPlayer}'s turn;
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);

// Initialize the message
message.textContent = Player ${currentPlayer}'s turn;