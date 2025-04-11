const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 15;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let bfood = {x:-10,y:-10};
let bonuc = {x:-2,y:-2};
let score = 0;
let hscore=0;
let gameInterval;
let a=5;
let b=0;
let x=1;
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
    if(score>=5)
    {
        clearInterval(gameInterval);
        gameInterval = setInterval(updateGame, 90);
        x++;
    }
    if(score>=10)
    {
        clearInterval(gameInterval);
        gameInterval = setInterval(updateGame, 70);
        x++;
    }
    
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if(score>hscore)
    {
        
        
        hscore=score;
        document.getElementById('hscore').textContent = hscore;
    }
    // Проверка столкновения со стенами
    if (head.y >tileCount) {
        clearInterval(gameInterval);
        
        head.y=0;
        rplaceFood(food.x,food.y);
        rplacebFood(bfood.x,bfood.y);
        rplaceb(bonuc.x,bonuc.y);
        gameInterval = setInterval(updateGame, 90);
    }
    if (head.y <0) {
        clearInterval(gameInterval);
        head.y=26;
        rplaceFood(food.x,food.y);
        rplacebFood(bfood.x,bfood.y);
        rplaceb(bonuc.x,bonuc.y);
        gameInterval = setInterval(updateGame, 90);
    }
    if (head.x >tileCount) {
        clearInterval(gameInterval);
        head.x=0;
        rplaceFood(food.x,food.y);
        rplacebFood(bfood.x,bfood.y);
        rplaceb(bonuc.x,bonuc.y);
        gameInterval = setInterval(updateGame, 90);
    }
    if (head.x <0) {
        clearInterval(gameInterval);
        head.x=26;
        rplaceFood(food.x,food.y);
        rplacebFood(bfood.x,bfood.y);
        rplaceb(bonuc.x,bonuc.y);
        gameInterval = setInterval(updateGame, 90);
    }
    for (let segment of snake) {
        clearInterval(gameInterval);
        if (segment.y >tileCount) {
            segment.y=0;

        }
        rplaceFood(food.x,food.y);
        rplacebFood(bfood.x,bfood.y);
        rplaceb(bonuc.x,bonuc.y);
        gameInterval = setInterval(updateGame, 90);
    }
    for (let segment of snake) {
        clearInterval(gameInterval);
        if (segment.y <0) {
            segment.y=26;
        }
        rplaceFood(food.x,food.y);
        rplacebFood(bfood.x,bfood.y);
        rplaceb(bonuc.x,bonuc.y);
        gameInterval = setInterval(updateGame, 90);
    }
    for (let segment of snake) {
        clearInterval(gameInterval);
        if (segment.x >tileCount) {
            segment.x=0;
        }
        rplaceFood(food.x,food.y);
        rplacebFood(bfood.x,bfood.y);
        rplaceb(bonuc.x,bonuc.y);
        gameInterval = setInterval(updateGame, 90);
    }
    for (let segment of snake) {
        clearInterval(gameInterval);
        if (segment.x <0) {
            segment.x=26;
        }
        rplaceFood(food.x,food.y);
        rplacebFood(bfood.x,bfood.y);
        rplaceb(bonuc.x,bonuc.y);
        gameInterval = setInterval(updateGame, 90);
    }
    head.x=head.x;
    head.y=head.y;
    for (let segment of snake) {
        
        segment.x=segment.x;
        segment.y=segment.y;

    }
    ctx.save();
    ctx.restore();
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
        
    }
    else if(head.x === food.x+1 && head.y === food.y){
        score++;
        b++;
        if(score%5===0 && score!= 0)
        {
            placeBonucFood();
            
        }
        document.getElementById('score').textContent = score;
        
        placeFood();
    }
    else if(head.x === food.x && head.y === food.y+1){
        score++;
        b++;
        if(score%5===0 && score!= 0)
        {
            placeBonucFood();
            
        }
        document.getElementById('score').textContent = score;
        
        placeFood();
    }
    else if(head.x === food.x+1 && head.y === food.y+1){
        score++;
        b++;
        if(score%5===0 && score!= 0)
        {
            placeBonucFood();
            
        }
        document.getElementById('score').textContent = score;
        
        placeFood();
    }
     else{
        snake.pop();
    }

    if ((head.x === bonuc.x && head.y === bonuc.y)||(head.x === bonuc.x+1 && head.y === bonuc.y)||(head.x === bonuc.x && head.y === bonuc.y+1)||(head.x+1 === bonuc.x && head.y === bonuc.y+1)) {
        
        ctx.clearRect(bonuc.x, bonuc.y, 1, 1);
        bonuc.x=-10;
        bonuc.y=-10;
        if(score<5){
        clearInterval(gameInterval);
        gameInterval = setInterval(updateGame, 130);
        setTimeout(bon,5000);
        if((Math.floor(Math.random() * 3))===1){
            clearInterval(gameInterval);
            gameInterval = setInterval(updateGame, 130);
            setTimeout(bon,5000);
        }
        }
        if(score>=5&&score<15){
            clearInterval(gameInterval);
            gameInterval = setInterval(updateGame, 110);
            setTimeout(bon1,5000);
            if((Math.floor(Math.random() * 3))===1){
                clearInterval(gameInterval);
                gameInterval = setInterval(updateGame, 110);
                setTimeout(bon1,5000);
            }
        }
        if(score>=15){
            clearInterval(gameInterval);
            gameInterval = setInterval(updateGame, 100);
            setTimeout(bon2,5000);
            if((Math.floor(Math.random() * 3))===1){
                clearInterval(gameInterval);
                gameInterval = setInterval(updateGame, 100);
                setTimeout(bon2,5000);
            }
        }
    }
    if ((head.x === bfood.x && head.y === bfood.y)||(head.x === bfood.x+1 && head.y === bfood.y)||(head.x === bfood.x && head.y === bfood.y+1)||(head.x === bfood.x+1 && head.y === bfood.y+1)) {
        
        score=score+2;
        bfood.x=-10;
        bfood.y=-10;

    
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
    drawRect(food.x+1, food.y, 'red');
    drawRect(food.x, food.y+1, 'red');
    drawRect(food.x+1, food.y+1, 'red');
    
    if(score%5===0 && score!= 0&&a===b)
    {
        placeBonucFood();
        a=a+5;
    }
    drawRect(bfood.x, bfood.y, 'gold');
    drawRect(bfood.x+1, bfood.y, 'gold');
    drawRect(bfood.x, bfood.y+1, 'gold');
    drawRect(bfood.x+1, bfood.y+1, 'gold');
        
    
    drawRect(bonuc.x, bonuc.y, 'blue');
    drawRect(bonuc.x+1, bonuc.y, 'blue');
    drawRect(bonuc.x, bonuc.y+1, 'blue');
    drawRect(bonuc.x+1, bonuc.y+1, 'blue');
    
}
function rplaceFood(x,y) {
    food.x=x;
    food.y=y;

   
}
function rplacebFood(x,y) {
    bfood.x=x;
    bfood.y=y;

   
}
function rplaceb(x,y) {
    bonuc.x=x;
    bonuc.y=y;

   
}
function placeFood() {
    food = {
        x: Math.floor(Math.random() * (tileCount-1)),
        y: Math.floor(Math.random() * (tileCount-1))
    };

    // Убедимся, что еда не появляется внутри змейки
    for (let segment of snake) {
        if ((segment.x === food.x && segment.y === food.y)||(segment.x === food.x+1 && segment.y === food.y)||(segment.x === food.x && segment.y === food.y+1)||(segment.x === food.x+1 && segment.y === food.y+1)) {
            placeFood();
            return;
        }
    }
    for (let segment of snake) {
        if (segment.y <3) {
            placeFood();
            return;
        }
    }
}


function placeBonucFood() {
    bfood = {
        x: Math.floor(Math.random() * (tileCount-1)),
        y: Math.floor(Math.random() * (tileCount -1)   )
    };

    // Убедимся, что еда не появляется внутри змейки
    for (let segment of snake) {
        if ((segment.x === bfood.x && segment.y === bfood.y)||(segment.x === bfood.x+1 && segment.y === bfood.y)||(segment.x === bfood.x && segment.y === bfood.y+1)||(segment.x === bfood.x+1 && segment.y === bfood.y+1)) {
            placeBonucFood();
            return;
        }
    }
    
}
function bon(){
    
        clearInterval(gameInterval);
        gameInterval = setInterval(updateGame, 100);
        
        
}
function bon1(){
    
    clearInterval(gameInterval);
    gameInterval = setInterval(updateGame, 90);
    
    
}
function bon2(){
    
    clearInterval(gameInterval);
    gameInterval = setInterval(updateGame, 70);
    
    
}
function placeBonuc() {
    bonuc = {
        x: Math.floor(Math.random() * (tileCount-1)),
        y: Math.floor(Math.random() * (tileCount-1))
    };

    // Убедимся, что еда не появляется внутри змейки
    for (let segment of snake) {
        if ((segment.x === bonuc.x && segment.y === bonuc.y)||(segment.x === bonuc.x+1 && segment.y === bonuc.y)||(segment.x === bonuc.x && segment.y === bonuc.y+1)||(segment.x+1 === bonuc.x && segment.y === bonuc.y+1)) {
            placeBonuc();
            return;
        }
    }
    
    
}


function resetGame() {
    clearInterval(gameInterval);
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    bfood.x=-10;
    bfood.y=-10;
    bonuc.x=-2;
    bonuc.y=-2;
    score = 0;
    a=5;
    document.getElementById('score').textContent = score;
    
    gameInterval = setInterval(updateGame, 100);
}

resetGame();