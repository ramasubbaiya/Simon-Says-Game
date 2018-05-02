const colorCodes = [
    0, // red
    1, // blue
    2, // green
    3 // yellow
];

const colors = [
    'red', // red
    'blue', // blue
    'green', // green
    'yellow' // yellow
];

const colorElements = document.querySelectorAll('.circle');

let currentSequence = [];
let currentScore = function() {}

let start = function() {
    console.log('start');

    // change the start button to reset
    let start = document.querySelector('.start');
    start.innerText = "Reset";


    // show score and level
    let score = document.querySelector('.score');
    let level = document.querySelector('.level');
    score.classList.replace('hide', 'show');
    level.classList.replace('hide', 'show');

    incrementLevelAndCreateNewSeq();
}

let incrementLevelAndCreateNewSeq = function() {
    let currentLevel = incrementTheLevel();
    currentSequence = generateRandomSequenceByLevel(currentLevel);
    blinkColorInSequence(currentSequence);
}

let save = function() {
    console.log('stop');
    let currentScore = document.querySelector('#real-score').innerText;
    localStorage.setItem('score', currentScore);
    localStorage.setItem('name', name);
}

let count = 0;
let buttonPressed = function(color) {
    if (currentSequence.length > 0 && count <= currentSequence.length) {
        console.log("count ", count);
        console.log("currentSequence.length ", currentSequence.length);
        if (checkBlinkSequence(color, count, currentSequence)) {
            if (count === currentSequence.length - 1) {
                alert('NEXT LEVEL');
                count = 0; // reset the count to 0
                incrementLevelAndCreateNewSeq();
                return;
            } else {
                count++;
                incrementTheScore();
                // blink the color
                blinkColor(color);
            }
        } else {
            alert('Game Over');
            count = 0; // reset the count to 0
        }
    } else if (currentSequence.length === 0) {
        alert('Please start the game');
    }
}

let blinkColor = function(color) {
    colorElements[color].style.backgroundColor = colors[color];
    setTimeout(function() {
        colorElements[color].style.backgroundColor = 'transparent';
    }, 70);
}

let blinkColorInSequence = function(array) {
    for (let i = 0; i < array.length; i++) {
        setTimeout(function() { return blinkColor(array[i]) }, i * 800);
    }
}

let checkBlinkSequence = function(userColor, count, array) {
    return userColor === array[count];
}

let incrementTheLevel = function() {
    let currentLevel = document.querySelector('#real-level').innerText;
    document.querySelector('#real-level').innerText = ++currentLevel;
    return currentLevel;
}

let randomInt = function(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

let generateRandomSequenceByLevel = function(level) {
    let arrSize = level + 2;
    let array = [];
    for (let i = 0; i < 4; i++) {
        array.push(randomInt(0, 3));
    }
    return array;
}

let incrementTheScore = function() {
    let currentScore = document.querySelector('#real-score').innerText;
    document.querySelector('#real-score').innerText = ++currentScore;
}