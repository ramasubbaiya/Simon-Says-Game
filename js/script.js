// Declare and initiate color codes to represent each color
const COLOR_CODES = [
    0, // red
    1, // blue
    2, // green
    3 // yellow
];

// Declare and initiate color name that match color codes
const COLOR_NAMES = [
    'red', // red
    'blue', // blue
    'green', // green
    'yellow' // yellow
];

// Declare and initiate user name, score and level
let userName = 'X'; // player name
let userScore = 0; // player score
let userLevel = 0; // player game level

// Declare and initiate current sequence of color
let currentSequence = [];

const colorElements = document.querySelectorAll('.circle'); // Select all circle-elements

/**
 * ************ Game Logic ************
 */

const incrementLevelAndCreateNewSeq = function() {
    incrementTheLevel();
    generateRandomSequenceByLevel();
    blinkColorInSequence();
}

// pressed inside the circle
let count = 0;
const buttonPressed = function(color) {
    if (currentSequence.length > 0 && count <= currentSequence.length) {
        console.log("count ", count);
        console.log("currentSequence.length ", currentSequence.length);
        if (checkBlinkSequence(color, count, currentSequence)) {
            if (count === currentSequence.length - 1) {
                incrementTheScore();
                incrementLevelAndCreateNewSeq();
                alert('NEXT LEVEL');
                count = 0; // reset the count to 0
                return;
            } else {
                count++;
                incrementTheScore();
                // blink the color
                blinkCircle(color);
            }
        } else {
            alert(`Game Over \nYour Final score is ${userScore}`);
            count = 0; // reset the count to 0
            saveBtn();
        }
    } else if (currentSequence.length === 0) {
        alert('Please start the game');
    }
}

const blinkCircle = function(colorCode) {
    colorElements[colorCode].style.backgroundColor = COLOR_NAMES[colorCode];
    setTimeout(function() {
        colorElements[colorCode].style.backgroundColor = 'transparent';
    }, 70);
}

const blinkColorInSequence = function() {
    for (let i = 0; i < currentSequence.length; i++) {
        setTimeout(function() { return blinkCircle(currentSequence[i]) }, i * 800);
    }
}

const checkBlinkSequence = function(userColor, count, array) {
    return userColor === array[count];
}

const incrementTheLevel = function() {
    document.querySelector('#real-level').innerText = ++userLevel;
    return userLevel;
}

const randomInt = function(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

const generateRandomSequenceByLevel = function() {
    let arrSize = userLevel + 1;
    currentSequence = []; // sequence globally available
    for (let i = 0; i < arrSize; i++) {
        currentSequence.push(randomInt(0, 3));
    }
}

const incrementTheScore = function() {
    userScore = userScore + userLevel;
    document.querySelector('#real-score').innerText = userScore;
}

// load previously saved data
const getPreviousGamesData = function() {
    // get for existing name from local storage if present
    let name = localStorage.getItem('name');
    userName = name || 'X'; // set to globle user name variable

    // get for existing level from local storage if present
    let level = localStorage.getItem('level') || 0;
    userLevel = parseInt(level);

    // get for existing score from local storage if present
    let score = localStorage.getItem('score') || 0;
    userScore = parseInt(score);
}

/**
 * ************ END of Game Logic ************
 */

/**
 * ************ UI changes ************
 */
// shoe name, score, level buttons
const showNameScoreLevel = function() {
    let scoreEle = document.querySelector('.score');
    scoreEle.classList.replace('hide', 'show');
    let score = document.querySelector('#real-score');
    score.innerText = userScore;

    let levelEle = document.querySelector('.level');
    levelEle.classList.replace('hide', 'show');
    let level = document.querySelector('#real-level');
    level.innerText = userLevel;

    let nameEle = document.querySelector('.name');
    nameEle.classList.replace('hide', 'show');
    let name = document.querySelector('#real-name');
    name.innerText = userName;
}

// show save button
const showSaveBtn = function() {
    let save = document.querySelector('.save');
    save.classList.replace('hide', 'show');
}

/**
 * ************ END of UI changes ************
 */

/**
 * ************ Start, Save and Load Previous Buttons ************
 */

// start button
const startBtn = function() {
    // hide the start button
    let start = document.querySelector('.start');
    start.classList.add('hide');

    // reset user score, name and level - to start new game
    userLevel = 0;
    userScore = 0;
    userName = 'X';

    showNameScoreLevel();
    showSaveBtn();
    // increment the level and start the game
    incrementLevelAndCreateNewSeq();

    // hide previous button if avaiable
    let previous = document.querySelector('.previous');
    previous.classList.replace('show', 'hide');
}

// load previous game button
const loadPreviousGameBtn = function() {
    let start = document.querySelector('.start');
    start.classList.add('hide');
    let previous = document.querySelector('.previous');
    previous.classList.replace('show', 'hide');

    showNameScoreLevel();
    showSaveBtn();
    // Generate new sequence and start the game
    generateRandomSequenceByLevel();
    blinkColorInSequence();
}

// save button
const saveBtn = function() {
    let score = document.querySelector('#real-score').innerText;
    localStorage.setItem('score', score);
    let level = document.querySelector('#real-level').innerText;
    localStorage.setItem('level', level);

    let save = document.querySelector('.save');
    save.classList.replace('show', 'hide');

    let start = document.querySelector('.start');
    start.classList.replace('hide', 'show');

    if (userLevel > 0) {
        let previous = document.querySelector('.previous');
        previous.classList.replace('hide', 'show');
    }
}
console.log(saveBtn);
/**
 * ************ END of Start, Save and Load Previous Buttons ************
 */


// IIFE - when the game first loads - check for name, score and level
// load this function once all the above functions are hoisted
(function() {
    // get previously played user name, score and level
    getPreviousGamesData();

    // check for previous played 
    if (userLevel !== 0 || userName !== 'X') {
        let previous = document.querySelector('.previous');
        previous.classList.replace('hide', 'show');
    }
}());