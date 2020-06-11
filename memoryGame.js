
/**
 * This array contains the engine or rules of the game.
 * Each array is a step of the game, and each object is the correct answer.
 * In certain objects, a "step" is  indicated. 
 * It refers to the specified step: previousNbIndex in step 1 is the index number of the number selected in step 1. 
 * @type Array
 */
const gameEngine =
        [
            [
                {
                    "nbIndex": 2
                },
                {
                    "nbIndex": 2
                },
                {
                    "nbIndex": 3
                },
                {
                    "nbIndex": 4
                }
            ],
            [
                {
                    "nb": 4
                },
                {
                    "previousNbIndex": true,
                    "step": 1
                },
                {
                    "nbIndex": 1
                },
                {
                    "previousNbIndex": true,
                    "step": 1
                }
            ],
            [
                {
                    "previousNb": true,
                    "step": 2
                },
                {
                    "previousNb": true,
                    "step": 1
                },
                {
                    "nbIndex": 3
                },
                {
                    "nb": 4
                }
            ],
            [
                {
                    "previousNbIndex": true,
                    "step": 1
                },
                {
                    "nbIndex": 1
                },
                {
                    "previousNbIndex": true,
                    "step": 2
                },
                {
                    "previousNbIndex": true,
                    "step": 2
                }
            ],
            [
                {
                    "previousNb": true,
                    "step": 1
                },
                {
                    "previousNb": true,
                    "step": 2
                },
                {
                    "previousNb": true,
                    "step": 3
                },
                {
                    "previousNb": true,
                    "step": 4
                }
            ]
        ]


// Here we link the HTML and the JS
const button1 = document.getElementById("1");
const button2 = document.getElementById("2");
const button3 = document.getElementById("3");
const button4 = document.getElementById("4");

const count = document.getElementById("count");
const result = document.getElementById("result");
const resultLose = document.getElementById("resultLose");
const resultWin = document.getElementById("resultWin");
const replay = document.getElementById("replay");
const game = document.getElementById("game");

let winHistory = []; //This is the history of the victories
let winnerValues = {}; //This object stores the value (index and number) of each winning button
let winnerBtn;
let step = 0; // This is the stage we are at
let winCount = 0; //This is the meter's state 
let countdown


 // We initialize the game
initGame()

// We begin the game
gameByStep(step);



/**
 * When the button is clicked, it calls the clickAction function and passed the number of the button
 */
button1.onclick = function () {
    clickAction(1);
}

button2.onclick = function () {
    clickAction(2);
}

button3.onclick = function () {
    clickAction(3);
}
button4.onclick = function () {
    clickAction(4);
}


/**
 * When we click on a button
 * @param {number} button
 */
function clickAction(button) {
    if (winnerValues.index === button) { // If the button clicked is the right one
        winHistory.push(winnerValues);   // We store it's value into the history
        winCount += 1;                   // We set the meter's state
        count.setAttribute("src", "img/memoryGame/count-empty.png");

        if (checkWin()) { // If the game is won we display the result box and the replay button
            won()
        } else { //Otherwise we change the step and load it
            step += 1;
            gameByStep(step);
            switch (winCount) { // Then we change the image of the meter according to the amount of victories
                case 1:
                    count.setAttribute("src", "img/memoryGame/count-1.png");
                    break;
                case 2:
                    count.setAttribute("src", "img/memoryGame/count-2.png");
                    break;
                case 3:
                    count.setAttribute("src", "img/memoryGame/count-3.png");
                    break;
                case 4:
                    count.setAttribute("src", "img/memoryGame/count-4.png");
                    break;
                case 5:
                    count.setAttribute("src", "img/memoryGame/count-full.png");
                    break;
            }

        }
    } else { //If the button was the wrong one we show the "Lose box", the replay button and hide the game
        lost()
    }

}

/**
 Function that initializes the game 
 */
function initGame() {
    initializeTime(6);
    winHistory = [];
    winnerValues = {};
    winnerBtn;
    step = 0;
    winCount = 0;
    resultLose.style.display = "none";
    resultWin.style.display = "none";
    replay.style.display = "none";
    result.style.display = "none";
    game.style.display = "block";
    count.style.display = "block";
    count.setAttribute("src", "img/memoryGame/count-empty.png");

    gameByStep(step);
}


/**
 * This function checks if the amount of win is equal to the length of the game engine. This allows the user to add  as many steps as he/she wishes  and returns a boolean true / false if the game is finished. 
 * @returns {boolean}
 */
function checkWin() {
    return winCount === gameEngine.length;

}

/**
 * This function creates a random number between one and four
 * @returns {number}
 */
function oneRandomNumberBetweenOneAndFour() {
    return Math.floor(Math.random() * 4) + 1;
}


/**
 * This function calls the function above and puts the numbers received in an array to sort them randomly. This will decide the placement of the buttons. 
 * @returns {array|fourUniqueRandomNumbersInArray.randomNumbers}
 */
function fourUniqueRandomNumbersInArray() {
    let randomNumbers = [];

    while (randomNumbers.length < 4) {
        const randomNumber = oneRandomNumberBetweenOneAndFour();
        if (!randomNumbers.includes(randomNumber)) { //If the number received is not already in the array we take it
            randomNumbers.push(randomNumber);
        }
    }
    return randomNumbers;
}

/**
 * For each step we call this functions.
 * @param {number} step
 */
function gameByStep(step) {

    const nbScreen = oneRandomNumberBetweenOneAndFour(); //We display a random number on the screen
    const stepButtonsValues = fourUniqueRandomNumbersInArray(); // And we give each button a unique value from 1 to 4

    document.getElementById("nbScreen").innerHTML = nbScreen; //We display the screen and the button and give a value from 0 to 3 to each
    button1.innerHTML = stepButtonsValues[0];
    button1.setAttribute("src", "img/memoryGame/button" + stepButtonsValues[0] + ".png")

    button2.innerHTML = stepButtonsValues[1];
    button2.setAttribute("src", "img/memoryGame/button" + stepButtonsValues[1] + ".png")

    button3.innerHTML = stepButtonsValues[2];
    button3.setAttribute("src", "img/memoryGame/button" + stepButtonsValues[2] + ".png")

    button4.innerHTML = stepButtonsValues[3];
    button4.setAttribute("src", "img/memoryGame/button" + stepButtonsValues[3] + ".png")


    const currentObject = gameEngine[step][nbScreen - 1]; //We create a variable which contains the rule and the correct answer for this round  
    if (currentObject.nb) { //If we are in a "nb" case we store in the winnerValues array the index of the right button and its number
        winnerValues.index = stepButtonsValues.indexOf(currentObject.nb) + 1;
        winnerValues.number = currentObject.nb;
    }
    if (currentObject.nbIndex) { //If we are in a "nbIndex" case we store in the winnerValues array the index of the right button and its number
        winnerValues.index = currentObject.nbIndex;
        winnerValues.number = stepButtonsValues[currentObject.nbIndex - 1];
    }
    if (currentObject.previousNb) { // If we are in a "previousNb" case we store in the winnerValue array the index of the right button and we get from the history the number
        const historyNbValue = winHistory[currentObject.step - 1];
        winnerValues.index = stepButtonsValues.indexOf(historyNbValue.number) + 1;
        winnerValues.number = historyNbValue.number;
    }
    if (currentObject.previousNbIndex) { //If we are in a "previousNbIndex" case we store in the winnerValues array the index of the right button from the history and the number 
        const historyNbValue = winHistory[currentObject.step - 1];
        winnerValues.index = historyNbValue.index;
        winnerValues.number = stepButtonsValues[historyNbValue.index - 1];
    }
}

/**
 * This function generates the timer. It requires a duration and "display"
 * @param {number} duration
 * @param {string} display
 */
function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    countdown = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 10) { // If the time is below 10 seconds, the timer will start blinking 
            display.classList.add("blink");
        }

        if (timer < 0) { // If the time reaches 0, the game stops, the timer stops blinking and the result is displayed
            clearInterval(countdown);
            display.classList.remove("blink");
            lost()
        }
    }, 1000);
}

/**
 * This function specifies the duration of the countdown, and where to display it 
 * @param {number} minutes
 */
function initializeTime(minutes) {
    const oneMinute = minutes,
            display = document.querySelector('#time');
    startTimer(oneMinute, display); // Then it calls the fonction above
}
;

/**
 * If the game is won, show the result box
 */
function won() {
    clearInterval(countdown);
    resultWin.style.display = "block";
    replay.style.display = "block";
    result.style.display = "block";
    game.style.display = "none";
    count.style.display = "none";
}

/**
 * If the game is lost, show the result box
 */
function lost() {
    winCount = 0;
    clearInterval(countdown);
    resultLose.style.display = "block";
    replay.style.display = "block";
    result.style.display = "block";
    count.style.display = "none";
    game.style.display = "none";
}