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

var button1 = document.getElementById("1");
var button2 = document.getElementById("2");
var button3 = document.getElementById("3");
var button4 = document.getElementById("4");

var count = document.getElementById("count");

var result = document.getElementById("result");
var resultLose = document.getElementById("resultLose");
var resultWin = document.getElementById("resultWin");

var replay = document.getElementById("replay");

var game = document.getElementById("game");

resultLose.style.display = "none";
resultWin.style.display = "none";
result.style.display = "none";
replay.style.display = "none";
count.style.display = "block";

count.setAttribute("src", "img/memoryGame/count-empty.png");




let winHistory = [];
let winnerValues = {};
let winnerBtn;
let step = 0;
let winCount = 0;

gameByStep(step);

function initGame() {
    winHistory = [];
    winnerValues = {};
    winnerBtn;
    step = 0;
    winCount = 0;
    resultLose.style.display = "none";
    resultWin.style.display = "none";
    replay.style.display = "none";
    result.style.display = "none";
    count.style.display = "block";
    count.setAttribute("src", "img/memoryGame/count-empty.png");


    game.style.display = "block";
    gameByStep(step);
}

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

function clickAction(button) {
    if (winnerValues.index === button) {
        winHistory.push(winnerValues);
        winCount += 1;
        count.setAttribute("src", "img/memoryGame/count-empty.png");

        if (checkWin()) {
            resultWin.style.display = "block";
            replay.style.display = "block";
            result.style.display = "block";
            game.style.display = "none";
            count.style.display = "none";
        } else {
            step += 1;
            gameByStep(step);
            switch (winCount) {
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
    } else {
        winCount = 0;

        resultLose.style.display = "block";
        replay.style.display = "block";
        result.style.display = "block";
        count.style.display = "none";

        game.style.display = "none";
    }

}

function checkWin() {
    return winCount === gameEngine.length;

}



function oneRandomNumberBetweenOneAndFour() {
    return Math.floor(Math.random() * 4) + 1;
}

function fourUniqueRandomNumbersInArray() {
    let randomNumbers = [];

    while (randomNumbers.length < 4) {
        const randomNumber = oneRandomNumberBetweenOneAndFour();
        if (!randomNumbers.includes(randomNumber)) {
            randomNumbers.push(randomNumber);
        }
    }
    return randomNumbers;
}


function gameByStep(step) {

    const nbScreen = oneRandomNumberBetweenOneAndFour();
    const stepButtonsValues = fourUniqueRandomNumbersInArray();

    document.getElementById("nbScreen").innerHTML = nbScreen;
    button1.innerHTML = stepButtonsValues[0];
    button1.setAttribute("src", "img/memoryGame/button" + stepButtonsValues[0] + ".png")

    button2.innerHTML = stepButtonsValues[1];
    button2.setAttribute("src", "img/memoryGame/button" + stepButtonsValues[1] + ".png")

    button3.innerHTML = stepButtonsValues[2];
    button3.setAttribute("src", "img/memoryGame/button" + stepButtonsValues[2] + ".png")

    button4.innerHTML = stepButtonsValues[3];
    button4.setAttribute("src", "img/memoryGame/button" + stepButtonsValues[3] + ".png")


    const currentObject = gameEngine[step][nbScreen - 1];
    if (currentObject.nb) {
        winnerValues.index = stepButtonsValues.indexOf(currentObject.nb) + 1;
        winnerValues.number = currentObject.nb;
    }
    if (currentObject.nbIndex) {
        winnerValues.index = currentObject.nbIndex;
        winnerValues.number = stepButtonsValues[currentObject.nbIndex - 1];
    }
    if (currentObject.previousNb) {
        const historyNbValue = winHistory[currentObject.step - 1];
        winnerValues.index = stepButtonsValues.indexOf(historyNbValue.number) + 1;
        winnerValues.number = historyNbValue.number;
    }
    if (currentObject.previousNbIndex) {
        const historyNbValue = winHistory[currentObject.step - 1];
        winnerValues.index = historyNbValue.index;
        winnerValues.number = stepButtonsValues[historyNbValue.index - 1];
    }
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 10) {
            display.classList.add("blink");
        }

        if (timer < 0) {
            timer = 0;
            display.classList.remove("blink");
            winCount = 0;
            resultLose.style.display = "block";
            replay.style.display = "block";
            result.style.display = "block";
            count.style.display = "none";

            game.style.display = "none";
        }
    }, 1000);
}

window.onload = function () {
    var oneMinute = 60,
            display = document.querySelector('#time');
    startTimer(oneMinute, display);
};