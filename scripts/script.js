class Player {
    constructor() {
        this.totalScore = 0;
        this.roundScore = 0;
    }

    rollDice() {
        return [Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6)];
    }

    calculateScore(dice) {
        const [die1, die2] = dice;
        if (die1 === 1 || die2 === 1) {
            this.roundScore = 0;
        } else if (die1 === die2) {
            this.roundScore = (die1 + die2) * 2;
        } else {
            this.roundScore = die1 + die2;
        }
        this.totalScore += this.roundScore;
    }

    reset() {
        this.totalScore = 0;
        this.roundScore = 0;
    }
}

const player = new Player();
const computer = new Player();
let round = 0;

const playerDice1 = document.getElementById('player-dice-1');
const playerDice2 = document.getElementById('player-dice-2');
const computerDice1 = document.getElementById('computer-dice-1');
const computerDice2 = document.getElementById('computer-dice-2');

const playerRoundScoreElem = document.getElementById('player-round-score');
const playerTotalScoreElem = document.getElementById('player-total-score');
const computerRoundScoreElem = document.getElementById('computer-round-score');
const computerTotalScoreElem = document.getElementById('computer-total-score');
const resultElem = document.getElementById('result');

const rollButton = document.getElementById('roll-button');
const resetButton = document.getElementById('reset-button');
const howToToggle = document.getElementById('toggle-howto');
const rulesToggle = document.getElementById('toggle-rules');
const howToList = document.getElementById('howto');
const rulesList = document.getElementById('rules');

function rollDice() {
    if (round < 3) {
        round++;
        const playerRoll = player.rollDice();
        const computerRoll = computer.rollDice();

        player.calculateScore(playerRoll);
        computer.calculateScore(computerRoll);

        updateUI(playerRoll, computerRoll);
    }
    if (round === 3) {
        displayWinner();
    }
}

function updateUI(playerRoll, computerRoll) {
    playerDice1.src = `images/dice${playerRoll[0]}.png`;
    playerDice2.src = `images/dice${playerRoll[1]}.png`;
    computerDice1.src = `images/dice${computerRoll[0]}.png`;
    computerDice2.src = `images/dice${computerRoll[1]}.png`;

    playerRoundScoreElem.textContent = player.roundScore;
    playerTotalScoreElem.textContent = player.totalScore;
    computerRoundScoreElem.textContent = computer.roundScore;
    computerTotalScoreElem.textContent = computer.totalScore;
}

function displayWinner() {
    if (player.totalScore > computer.totalScore) {
        resultElem.textContent = 'You win!';
    } else if (player.totalScore < computer.totalScore) {
        resultElem.textContent = 'Computer wins!';
    } else {
        resultElem.textContent = 'It\'s a tie!';
    }
}

function resetGame() {
    player.reset();
    computer.reset();
    round = 0;

    playerDice1.src = 'images/dice1.png';
    playerDice2.src = 'images/dice1.png';
    computerDice1.src = 'images/dice1.png';
    computerDice2.src = 'images/dice1.png';

    playerRoundScoreElem.textContent = '0';
    playerTotalScoreElem.textContent = '0';
    computerRoundScoreElem.textContent = '0';
    computerTotalScoreElem.textContent = '0';
    resultElem.textContent = '';
}

function toggleInstructions(element, toggle) {
    $(element).slideToggle();
    const text = $(toggle).text();
    $(toggle).text(text === "(show)" ? "(hide)" : "(show)");
}

$(document).ready(function() {
    $('#howto').hide();
    $('#rules').hide();
});

rollButton.addEventListener('click', rollDice);
resetButton.addEventListener('click', resetGame);
howToToggle.addEventListener('click', () => toggleInstructions('#howto', '#toggle-howto'));
rulesToggle.addEventListener('click', () => toggleInstructions('#rules', '#toggle-rules'));
