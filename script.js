function computerPlay() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return "It's a tie!";
    } else if (
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'paper' && computerSelection === 'rock') ||
        (playerSelection === 'scissors' && computerSelection === 'paper')
    ) {
        sprinkle();
        return "You win!";
    } else {
        return "You lose!";
    }
}

function playGame(playerChoice) {
    const computerChoice = computerPlay();
    const result = playRound(playerChoice, computerChoice);
    document.getElementById('result').innerText = `Computer chose ${computerChoice}. ${result}`;
}

function sprinkle() {
    const container = document.querySelector('.container');
    const sprinkleCount = 50; // Adjust the number of sprinkles

    for (let i = 0; i < sprinkleCount; i++) {
        const sprinkle = document.createElement('div');
        sprinkle.className = 'sprinkle';
        sprinkle.style.left = Math.random() * 100 + 'vw';
        sprinkle.style.animationDuration = Math.random() * 2 + 1 + 's';
        sprinkle.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(sprinkle);

        sprinkle.addEventListener('animationend', () => {
            sprinkle.remove();
        });
    }
}
