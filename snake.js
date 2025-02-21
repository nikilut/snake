const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;
let gameInterval;

document.addEventListener('keydown', changeDirection);
document.getElementById('restartButton').addEventListener('click', resetGame);

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const goingUp = direction.y === -1;
    const goingDown = direction.y === 1;
    const goingRight = direction.x === 1;
    const goingLeft = direction.x === -1;

    if (keyPressed === 37 && !goingRight) {
        direction = { x: -1, y: 0 };
    }
    if (keyPressed === 38 && !goingDown) {
        direction = { x: 0, y: -1 };
    }
    if (keyPressed === 39 && !goingLeft) {
        direction = { x: 1, y: 0 };
    }
    if (keyPressed === 40 && !goingUp) {
        direction = { x: 0, y: 1 };
    }
}

function drawRect(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
}

function updateGame() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Проверка столкновения со стенами
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        resetGame();
        return;
    }

    // Проверка столкновения с самой собой
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            resetGame();
            return;
        }
    }

    snake.unshift(head);

    // Проверка наличия еды
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById('score').textContent = score;
        placeFood();
    } else {
        snake.pop();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Отрисовка змейки
    snake.forEach((segment, index) => {
        if (index === 0) {
            drawRect(segment.x, segment.y, 'darkgreen'); // Голова змейки
        } else {
            drawRect(segment.x, segment.y, 'green'); // Тело змейки
        }
    });

    // Отрисовка еды
    drawRect(food.x, food.y, 'red');
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };

    // Убедимся, что еда не появляется внутри змейки
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            placeFood();
            return;
        }
    }
}

function resetGame() {
    clearInterval(gameInterval);
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
    document.getElementById('score').textContent = score;
    placeFood();
    gameInterval = setInterval(updateGame, 100);
}

resetGame();