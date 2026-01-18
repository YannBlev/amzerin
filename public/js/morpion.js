const board = document.getElementById('board');
const status = document.getElementById('status');
const resetBtn = document.getElementById('reset');

let currentPlayer = 'X';
let cells = Array(9).fill('');
let gameOver = false;

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function updateStatus(message) {
    status.textContent = message;
}

function checkWin() {
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return cells[a];
        }
    }
    return null;
}

function checkDraw() {
    return cells.every(cell => cell !== '');
}

function handleClick(e) {
    const idx = parseInt(e.target.dataset.index);

    if (gameOver || cells[idx]) return;

    cells[idx] = currentPlayer;
    e.target.textContent = currentPlayer;

    const winner = checkWin();
    if (winner) {
        updateStatus(`Le joueur ${winner} a gagné !`);
        gameOver = true;
        return;
    }

    if (checkDraw()) {
        updateStatus("Match nul !");
        gameOver = true;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus(`Tour du joueur ${currentPlayer}`);
}

function resetGame() {
    cells.fill('');
    gameOver = false;
    currentPlayer = 'X';
    updateStatus(`Tour du joueur ${currentPlayer}`);
    document.querySelectorAll('.cell').forEach(cell => {
    cell.textContent = '';
    });
}

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleClick);
});

resetBtn.addEventListener('click', resetGame);

updateStatus(`Tour du joueur ${currentPlayer}`);
