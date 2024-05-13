document.addEventListener("DOMContentLoaded", function() {
    let container = document.querySelector(".container");
    let snake = document.getElementById("snake");
    let food = document.getElementById("food");
    let startButton = document.getElementById("startButton");
    let upButton = document.getElementById("upButton");
    let downButton = document.getElementById("downButton");
    let leftButton = document.getElementById("leftButton");
    let rightButton = document.getElementById("rightButton");
    let scoreDisplay = document.getElementById("scoreDisplay");
    let gameOverDisplay = document.getElementById("gameOverDisplay");

    let snakeSegments = [{x: 0, y: 0}];
    let foodX = 0;
    let foodY = 0;
    let dx = 20;
    let dy = 0;
    let gameRunning = false;
    let gameInterval;
    let score = 0;

    function moveSnake() {
        let newHead = {x: snakeSegments[0].x + dx, y: snakeSegments[0].y + dy};
        snakeSegments.unshift(newHead);

        if (newHead.x === foodX && newHead.y === foodY) {
            score++;
            scoreDisplay.textContent = "Score: " + score;
            generateFood();
        } else {
            snakeSegments.pop();
        }

        snake.style.left = newHead.x + "px";
        snake.style.top = newHead.y + "px";
    }

    function generateFood() {
        foodX = Math.floor(Math.random() * (container.clientWidth / 20)) * 20;
        foodY = Math.floor(Math.random() * (container.clientHeight / 20)) * 20;
        food.style.left = foodX + "px";
        food.style.top = foodY + "px";
    }

    function gameLoop() {
        moveSnake();
        checkCollision();
    }

    function checkCollision() {
        var headX = snakeSegments[0].x;
        var headY = snakeSegments[0].y;

        // Check if the snake hits the boundary
        if (
            headX < 0 ||
            headX >= container.clientWidth ||
            headY < 0 ||
            headY >= container.clientHeight
        ) {
            endGame();
            return;
        }

        // Check if the snake hits itself
        for (var i = 1; i < snakeSegments.length; i++) {
            if (headX === snakeSegments[i].x && headY === snakeSegments[i].y) {
                endGame();
                return;
            }
        }
    }

    function startGame() {
        if (!gameRunning) {
            score = 0;
            scoreDisplay.textContent = "Score: " + score;
            scoreDisplay.style.opacity = 0;
            gameOverDisplay.style.opacity = 0;
            snakeSegments = [{x: 0, y: 0}];
            snake.style.left = "0px";
            snake.style.top = "0px";
            generateFood();
            gameInterval = setInterval(gameLoop, 150); // Adjusted speed
            gameRunning = true;
            startButton.textContent = "Pause Game";
        } else {
            clearInterval(gameInterval);
            gameRunning = false;
            startButton.textContent = "Start Game";
            scoreDisplay.style.opacity = 1;
        }
    }

    function endGame() {
        clearInterval(gameInterval);
        gameRunning = false;
        startButton.textContent = "Start Game";
        gameOverDisplay.textContent = "Game Over! Score: " + score;
        gameOverDisplay.style.opacity = 1;
    }

    function moveUp() {
        if (dy !== 20) {
            dx = 0;
            dy = -20;
        }
    }

    function moveDown() {
        if (dy !== -20) {
            dx = 0;
            dy = 20;
        }
    }

    function moveLeft() {
        if (dx !== 20) {
            dx = -20;
            dy = 0;
        }
    }

    function moveRight() {
        if (dx !== -20) {
            dx = 20;
            dy = 0;
        }
    }

    document.addEventListener("keydown", function(event) {
        if (!gameRunning) return;
        switch (event.key) {
            case "ArrowUp":
                moveUp();
                break;
            case "ArrowDown":
                moveDown();
                break;
            case "ArrowLeft":
                moveLeft();
                break;
            case "ArrowRight":
                moveRight();
                break;
        }
    });

    upButton.addEventListener("click", moveUp);
    downButton.addEventListener("click", moveDown);
    leftButton.addEventListener("click", moveLeft);
    rightButton.addEventListener("click", moveRight);
    startButton.addEventListener("click", startGame);

    generateFood();
});