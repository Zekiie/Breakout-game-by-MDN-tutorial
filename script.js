var canvas = document.getElementById('myCanvas'),
    ctx = canvas.getContext("2d"),
    x = canvas.width / 2,
    y = canvas.height - 30,
    dx = 2,
    dy = -1,
    ballRadius = 10,
    color = getColor(),
    paddleHeigth = 10, paddleWidth = 100, paddleX = (canvas.width-paddleWidth)/2,
    rightPress = false, leftPress = false,
    brickRowCount = 4,
    brickColumnCount = 5,
    brickWidth = 75,
    brickHeight = 20,
    brickPadding = 10,
    brickOffsetTop = 30,
    brickOffsetLeft = 30,
    i, j,
    bricks = [],
    score = 0,
    lives = 3;

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener('mousemove', mouseMoveHandler, false);

    for(i = 0; i < brickColumnCount; i += 1) {
        bricks[i] = [];
        for(j = 0; j < brickRowCount; j += 1) {
        bricks[i][j] = { x: 0, y: 0, status: 1 };
    }
}


function getColor () {
      return color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    }

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPress = true;
    } else if(e.keyCode == 37){
        leftPress = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPress = false;
    }
    else if(e.keyCode == 37) {
        leftPress = false;
    }
}

function gameOver (){
    ctx.font = "30px Georgia";
    ctx.fillStyle = "#fa433e";
    ctx.fillText('Game Over!',190, 150);

}

function drawBall () {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#39A2D8";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(i = 0; i < brickColumnCount; i += 1) {
        for(j = 0; j < brickRowCount; j += 1) {
            if (bricks[i][j].status == 1) {
            var brickX = (i*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (j*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[i][j].x = brickX;
            bricks[i][j].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();
            }
        }
    }
}

function youWin() {
    ctx.font = '20px Arial';
    ctx.fillStyle = '#bb04f8';
    ctx.fillText("YOU WIN, CONGRATULATIONS!", 190, 150);
}

function collisionDetection() {

    for (i = 0; i < brickColumnCount; i += 1) {
        for (j = 0; j < brickRowCount; j += 1) {
            var b = bricks[i][j];
            if (b.status == 1) {
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    color = getColor();
                    score += 1;
                    if(score == brickRowCount*brickColumnCount) {
                        youWin();
                        // document.location.reload();
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillStyle = '#15374A';
    ctx.fillText('Score: ' + score, 8, 20);
}

function drawLives() {
    ctx.font = '20px Arial';
    ctx.fillStyle = '#15374A';
    ctx.fillText('Lives: ' + lives, 400, 20);
}

function drawPaddle () {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeigth, paddleWidth, paddleHeigth);
    ctx.fillStyle = "#39a2d8";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius){
        dy = -dy;

    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            if (!lives) {
            gameOver();
            document.location.reload();
        }
            else {
            x = canvas.width / 2;
            y = canvas.height - 30;
            dx = 2;
            dy = -2;
            paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }
    if(rightPress && paddleX < canvas.width - paddleWidth) {
        paddleX += 3;
    }
    else if(leftPress && paddleX > 0) {
        paddleX -= 3;
    }
    x += dx;
    y += dy;
    requestAnimationFrame(draw)
}


draw();







