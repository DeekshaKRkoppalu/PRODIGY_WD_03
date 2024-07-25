const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const playerVsPlayerButton = document.getElementById('player-vs-player');
const playerVsAIButton = document.getElementById('player-vs-ai');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let isPlayerVsAI = false;

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

playerVsPlayerButton.addEventListener('click', () => {
    isPlayerVsAI = false;
    resetGame();
});

playerVsAIButton.addEventListener('click', () => {
    isPlayerVsAI = true;
    resetGame();
});

function handleClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (gameState[index] || checkWinner()) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    
    if (checkWinner()) {
        setTimeout(() => alert(`${currentPlayer} wins!`), 100);
    } else if (gameState.every(cell => cell)) {
        setTimeout(() => alert('Draw!'), 100);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (isPlayerVsAI && currentPlayer === 'O') {
            setTimeout(makeAIMove, 500);
        }
    }
}

function makeAIMove() {
    const availableCells = gameState.map((cell, index) => cell === null ? index : null).filter(val => val !== null);
    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    gameState[randomIndex] = currentPlayer;
    document.querySelector(`.cell[data-index="${randomIndex}"]`).textContent = currentPlayer;

    if (checkWinner()) {
        setTimeout(() => alert(`${currentPlayer} wins!`), 100);
    } else if (gameState.every(cell => cell)) {
        setTimeout(() => alert('Draw!'), 100);
    } else {
        currentPlayer = 'X';
    }
}

function checkWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function resetGame() {
    gameState.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
