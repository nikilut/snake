const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let bfood = {x:-1,y:-1};
let bonuc = {x:-2,y:-2};
let score = 0;
let hscore=0;
let gameInterval;
let a=5;
let b=0;
document.addEventListener('keydown', changeDirection);
document.getElementById('restartButton').addEventListener('click', resetGame);

function changeDirection(event, ctx) {
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

    if(score>hscore)
    {
        hscore=score;
        document.getElementById('hscore').textContent = hscore;
    }
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
        b++;
        if(score%5===0 && score!= 0)
        {
            placeBonucFood();
            
        }
        document.getElementById('score').textContent = score;
        
        placeFood();
        
    } else {
        snake.pop();
    }

    if (head.x === bonuc.x && head.y === bonuc.y) {
        
        ctx.clearRect(bonuc.x, bonuc.y, 1, 1);
        bonuc.x=-2;
        bonuc.y=-2;
        clearInterval(gameInterval);
        gameInterval = setInterval(updateGame, 130);
        setTimeout(bon,5000);
        if((Math.floor(Math.random() * 3))===1){
            clearInterval(gameInterval);
            gameInterval = setInterval(updateGame, 130);
            setTimeout(bon,5000);
        }
    }
    if (head.x === bfood.x && head.y === bfood.y) {
        
        score=score+2;
        bfood.x=-1;
        bfood.y=-1;

    
        ctx.clearRect(bfood.x, bfood.y, 1, 1);
        if((Math.floor(Math.random() * 3))===1){
            placeBonuc();
        }
        
            
    
        
        document.getElementById('score').textContent = score;
        
        
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Отрисовка змейки
    for (let i = 0; i < snake.length; i++) {
        const segment = snake[i];
        if (i === 0) {
            drawRect(segment.x, segment.y, 'darkgreen'); // Голова
        } else {
            drawRect(segment.x, segment.y, 'green'); // Тело
        }
    }

    // Отрисовка еды
   
    drawRect(food.x, food.y, 'red');
    
    if(score%5===0 && score!= 0&&a===b)
    {
        placeBonucFood();
        a=a+5;
    }
    drawRect(bfood.x, bfood.y, 'gold');
        
    
    drawRect(bonuc.x, bonuc.y, 'blue');
    
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


function placeBonucFood() {
    bfood = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };

    // Убедимся, что еда не появляется внутри змейки
    for (let segment of snake) {
        if (segment.x === bfood.x && segment.y === bfood.y) {
            placeBonucFood();
            return;
        }
    }
}
function bon(){
    
        clearInterval(gameInterval);
        gameInterval = setInterval(updateGame, 100);
        
        
}
function placeBonuc() {
    bonuc = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };

    // Убедимся, что еда не появляется внутри змейки
    for (let segment of snake) {
        if (segment.x === bonuc.x && segment.y === bonuc.y) {
            placeBonuc();
            return;
        }
    }
    
}


function resetGame() {
    clearInterval(gameInterval);
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    bfood.x=-1;
    bfood.y=-1;
    bonuc.x=-2;
    bonuc.y=-2;
    score = 0;
    a=5;
    document.getElementById('score').textContent = score;
    
    gameInterval = setInterval(updateGame, 100);
}

resetGame();