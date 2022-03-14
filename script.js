const CELL_SIZE = 20;
const CANVAS_SIZE = 500; //ukuran canvas
const REDRAW_INTERVAL = 60;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}
const MOVE_INTERVAL = 100; //Kecepatan gerakan snake

function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(2 + Math.random() * (HEIGHT - 2)),
    }
}


function initHeadAndBody() {
    let head = initPosition();
    let body = [{x: head.x, y: head.y}];
    return {
        head: head,
        body: body,
    }
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

function initSnake(color) {
    return {
        color: color,
        ...initHeadAndBody(),
        direction: initDirection(),
        score: 0,
        life: 3,
        level: 1,
        speed: 120,
    }
}
let snake1 = initSnake("green");
 //newwwwwww

let apple = {
    color: "red",
    position: initPosition(),
}
//newwwwwww4
let apple2 = {
    color: "red",
    position: initPosition(),
}

let lifes = [{
    color: "red",
    position: initPosition(),
}]

function drawApple(ctx, x, y) {
	let img = document.getElementById('apple');
	ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}



function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}
function drawLife(){
    let snakeCanvas = document.getElementById("snakeBoard");
    let ctx = snakeCanvas.getContext("2d");
    for(let i = 0; i < snake1.life; i++){
        ctx.drawImage(life, (i + 3) * CELL_SIZE, 10, CELL_SIZE, CELL_SIZE);
    }
}
function drawHeader()
{
    let snakeCanvas = document.getElementById("snakeBoard");
    let ctx = snakeCanvas.getContext("2d");
        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, CANVAS_SIZE, 3 * CELL_SIZE);
        ctx.font = "15px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Speed: " + snake1.speed, 7 * CELL_SIZE, 2 * CELL_SIZE);
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Life: ", CELL_SIZE, 1.5 * CELL_SIZE);
        ctx.fillText("Level: " + snake1.level,  7 * CELL_SIZE, CELL_SIZE);
        
}
function drawScore(snake) {
    let scoreCanvas;
    if (snake.color == snake1.color) {
        scoreCanvas = document.getElementById("score1Board");
    } else if (snake.color == snake2.color){
        scoreCanvas = document.getElementById("score2Board");
    } else { //newwwwwww6
        scoreCanvas = document.getElementById("score3Board");
    }
    let scoreCtx = scoreCanvas.getContext("2d");

    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "30px Arial";
    scoreCtx.fillStyle = snake.color
    scoreCtx.fillText(snake.score, 10, scoreCanvas.scrollHeight / 2);
}



function draw() {
    setInterval(function() {
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d")

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        
        
        ctx.drawImage(headsnake, snake1.head.x * CELL_SIZE, snake1.head.y * CELL_SIZE,  CELL_SIZE, CELL_SIZE);
        for (let i = 1; i < snake1.body.length; i++) {
            ctx.drawImage(body, snake1.body[i].x * CELL_SIZE, snake1.body[i].y * CELL_SIZE,CELL_SIZE, CELL_SIZE );
        }
    
        drawHeader();
        drawLife(lifes);
        drawScore(snake1);

        drawCell(ctx, apple.position.x, apple.position.y, apple.color);
        drawApple(ctx, apple.position.x, apple.position.y, apple.color); //newwwwwww3

        //newwwwwww4
        drawCell(ctx, apple2.position.x, apple2.position.y, apple2.color);
        drawApple(ctx, apple2.position.x, apple2.position.y, apple2.color);

        

        for (let i = 0; i < lifes.length; i++) {
            let life = lifes[i];
            if(snake1.life < 3){
                ctx.drawImage(life, lifes.position.x * CELL_SIZE, lifes.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }
        
    }, REDRAW_INTERVAL);
}

function teleport(snake) {
    if (snake.head.x < 0) {
        snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.x >= WIDTH) {
        snake.head.x = 0;
    }
    if (snake.head.y < 0) {
        snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.y >= HEIGHT) {
        snake.head.y = 0;
    }
}

function eat(snake, apple) {
    if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
        apple.position = initPosition();
        snake.score++;
        snake.body.push({x: snake.head.x, y: snake.head.y});
        if(snake.score % 5 == 0){ // naikkan level saat skor di kelipatan 5
            snake.level++;
            snake.speed -= 10; // naikkan kecepatan saat naik level
        }
        if (snake.level >= 5){
            snake.level = 5; // set level max
            snake.speed = 80; // set speed max
        }
    }
}
function eatLife(snake, lifes) {
    for (let i = 0; i < lifes.length; i++) {
        let life = lifes[i];
            if (snake.life < 3){
                if (snake.head.x == life.position.x && snake.head.y == life.position.y) {
                    life.position = initPosition();
                    snake.life++; // menambahkan nyawa ketika ular makan life
                    snake.score++;            
                }    
            }
    }
}


function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
    eat(snake, apple);
    eat(snake, apple2); //newwwwwww4
}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake, apple);
    eat(snake, apple2);
}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake, apple);
    eat(snake, apple2);
}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake, apple);
    eat(snake, apple2);
}

function checkCollision(snakes) {
    let isCollide = false;
    //this
    for (let i = 0; i < snakes.length; i++) {
        for (let j = 0; j < snakes.length; j++) {
            for (let k = 1; k < snakes[j].body.length; k++) {
                if (snakes[i].head.x == snakes[j].body[k].x && snakes[i].head.y == snakes[j].body[k].y) {
                    isCollide = true;
                }
            }
        }
    }
    if (isCollide) {
        snake1.life--;
        if(snake1.life == 0){
            var audio = new Audio('assets/game-over.mp3');
            audio.play();
            alert("Game Over");
            snake1 = initSnake("green");
        }
        else{
            alert("Nyawa kamu kurang dikurangi 1");
            snake1.position = initPosition();   
        }
                        
    }

    return isCollide;
}

function move(snake) {
    switch (snake.direction) {
        case DIRECTION.LEFT:
            moveLeft(snake);
            break;
        case DIRECTION.RIGHT:
            moveRight(snake);
            break;
        case DIRECTION.DOWN:
            moveDown(snake);
            break;
        case DIRECTION.UP:
            moveUp(snake);
            break;
    }
    moveBody(snake);
    if (!checkCollision([snake1])) { //newwwwwww6
        setTimeout(function() {
            move(snake);
        }, MOVE_INTERVAL);
    } else {
        initGame();
    }
}

function moveBody(snake) {
    snake.body.unshift({ x: snake.head.x, y: snake.head.y });
    snake.body.pop();
}

function turn(snake, direction) {
    const oppositeDirections = {
        [DIRECTION.LEFT]: DIRECTION.RIGHT,
        [DIRECTION.RIGHT]: DIRECTION.LEFT,
        [DIRECTION.DOWN]: DIRECTION.UP,
        [DIRECTION.UP]: DIRECTION.DOWN,
    }

    if (direction !== oppositeDirections[snake.direction]) {
        snake.direction = direction;
    }
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        turn(snake1, DIRECTION.LEFT);
    } else if (event.key === "ArrowRight") {
        turn(snake1, DIRECTION.RIGHT);
    } else if (event.key === "ArrowUp") {
        turn(snake1, DIRECTION.UP);
    } else if (event.key === "ArrowDown") {
        turn(snake1, DIRECTION.DOWN);
    }

    if (event.key === "a") {
        turn(snake2, DIRECTION.LEFT);
    } else if (event.key === "d") {
        turn(snake2, DIRECTION.RIGHT);
    } else if (event.key === "w") {
        turn(snake2, DIRECTION.UP);
    } else if (event.key === "s") {
        turn(snake2, DIRECTION.DOWN);
    }
    //newwwwwww
    if (event.key === "j") {
        turn(snake3, DIRECTION.LEFT);
    } else if (event.key === "l") {
        turn(snake3, DIRECTION.RIGHT);
    } else if (event.key === "i") {
        turn(snake3, DIRECTION.UP);
    } else if (event.key === "k") {
        turn(snake3, DIRECTION.DOWN);
    }
})

function initGame() {
    move(snake1);
    move(snake2);
    move(snake3); //newwwwwww6
}

initGame();