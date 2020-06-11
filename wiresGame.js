// This array contains the engine or rules of the game. 
// Each object contains a table that corresponds to all possible cases of wire arrangement.
// It indicates the rule to be followed and the wire to be cut. 
// Theses rules can be changed at any time. 
//  In certain cases, it is required to check if the serial number is even or odd. 

const gameEngine = [
    {
        nbWires: 3,
        cases: [
            {
                ruleDescription: "If no red wire, cut the second one",
                disposition: [
                    "yellow",
                    "blue",
                    "black"
                ],
                toCut: 2
            },
            {
                ruleDescription: "If last wire is white, cut the last one",
                disposition: [
                    "yellow",
                    "blue",
                    "white"
                ],
                toCut: 3
            },
            {
                ruleDescription: "If more than one blue wire, cut the last blue wire",
                disposition: [
                    "blue",
                    "blue",
                    "red"
                ],
                toCut: 2
            },
            {
                ruleDescription: "Else, cut the last wire",
                disposition: [
                    "red",
                    "blue",
                    "black"
                ],
                toCut: 3
            }
        ]
    },
    {
        nbWires: 4,
        cases: [
            {
                ruleDescription: "If more than one red wire and serial is odd, cut the last red wire",
                disposition: [
                    "red",
                    "white",
                    "black",
                    "red"
                ],
                toCut: 4,
                serial: "odd" // If it says "odd", then the number will be odd. Same for "even"
            },
            {
                ruleDescription: "If last wire is yellow and no red wire, cut first wire",
                disposition: [
                    "white",
                    "white",
                    "black",
                    "yellow"
                ],
                toCut: 1
            },
            {
                ruleDescription: "If one blue wire, cut the first wire",
                disposition: [
                    "yellow",
                    "blue",
                    "black",
                    "red"
                ],
                toCut: 1
            },
            {
                ruleDescription: "If more than one yellow wire, cut the last wire",
                disposition: [
                    "black",
                    "yellow",
                    "white",
                    "yellow"
                ],
                toCut: 4
            },
            {
                ruleDescription: "Else, cut the second wire",
                disposition: [
                    "red",
                    "white",
                    "red",
                    "yellow"
                ],
                toCut: 2
            }
        ]
    },
    {
        nbWires: 5,
        cases: [
            {
                ruleDescription: "If the last wire is black and the serial is odd, cut the fourth wire",
                disposition: [
                    "blue",
                    "red",
                    "yellow",
                    "red",
                    "black"
                ],
                toCut: 4,
                serial: "odd"
            },
            {
                ruleDescription: "If there is one red wire and more than one yellow wire, cut the first wire",
                disposition: [
                    "yellow",
                    "blue",
                    "yellow",
                    "red",
                    "black"
                ],
                toCut: 1
            },
            {
                ruleDescription: "If there is no black wire, cut the second wire",
                disposition: [
                    "yellow",
                    "blue",
                    "blue",
                    "red",
                    "white"
                ],
                toCut: 2
            },
            {
                ruleDescription: "Else cut the fourth wire ",
                disposition: [
                    "yellow",
                    "blue",
                    "black",
                    "red",
                    "white"
                ],
                toCut: 4
            }
        ]
    },
    {
        nbWires: 6,
        cases: [
            {
                ruleDescription: "If there are no yellow wire and the serial is odd, cut the third wire",
                disposition: [
                    "blue",
                    "blue",
                    "black",
                    "white",
                    "red",
                    "white"
                ],
                toCut: 3,
                serial: "odd"
            },
            {
                ruleDescription: "If there is one yellow wire and more than one white wire, cut the fourth wire",
                disposition: [
                    "black",
                    "white",
                    "red",
                    "white",
                    "blue",
                    "yellow"
                ],
                toCut: 4
            }, {
                ruleDescription: "If there are no red wire, cut the last wire",
                disposition: [
                    "blue",
                    "yellow",
                    "black",
                    "white",
                    "blue",
                    "yellow"
                ],
                toCut: 6
            }, {
                ruleDescription: "Else cut the fourth wire",
                disposition: [
                    "blue",
                    "yellow",
                    "black",
                    "white",
                    "red",
                    "yellow"
                ],
                toCut: 4
            }
        ]
    }
]

// Here we generate a random number that will indicate the selected case in the game engine.  
const nbOfWires = gameEngine[getRandomNumber(gameEngine.length)]; // The number of wires to generate 
const selectedCase = nbOfWires.cases[getRandomNumber(nbOfWires.cases.length)]; // The case to select 
let countdown;
// Then we link the HTML and JS

const wire1 = document.getElementById("1");
const wire2 = document.getElementById("2");
const wire3 = document.getElementById("3");
const wire4 = document.getElementById("4");
const wire5 = document.getElementById("5");
const wire6 = document.getElementById("6");

const game = document.getElementById("game");
const resultBox = document.getElementById("result");
const resultLose = document.getElementById("resultLose");
const resultWin = document.getElementById("resultWin");

// We hide the part of the game that says "Win" or "Lose" and we display the game.
resultLose.style.display = "none";
resultWin.style.display = "none";
resultBox.style.display = "none";
game.style.display = "grid";

// We generate three uncut wires, as the minimum amout of wires is 3.
wire1.setAttribute("src", `img/wiresGame/${selectedCase.disposition[0]}_uncut.png`)
wire2.setAttribute("src", `img/wiresGame/${selectedCase.disposition[1]}_uncut.png`)
wire3.setAttribute("src", `img/wiresGame/${selectedCase.disposition[2]}_uncut.png`)

// The game will  create a random number that will decide on the serial number's state.
const getEvenOrOdd = Math.random() >= 0.5 ? "even" : "odd"

// Then a serial number is displayed. If the case selected above requires a specific state, we generate it, otherwise we generate a totally random number.
document.getElementById("serial").innerHTML = generateSerial(selectedCase.serial ? selectedCase.serial : getEvenOrOdd);

// The variable gameEnded is set to false
let gameEnded = false
initializeTime(60)


// We check how many wires will be needed for this game. 

if (nbOfWires.nbWires >= 4) {
    wire4.setAttribute("src", `img/wiresGame/${selectedCase.disposition[3]}_uncut.png`)
}
if (nbOfWires.nbWires >= 5) {
    wire5.setAttribute("src", `img/wiresGame/${selectedCase.disposition[4]}_uncut.png`)
}
if (nbOfWires.nbWires >= 6) {
    wire6.setAttribute("src", `img/wiresGame/${selectedCase.disposition[5]}_uncut.png`)
}


/**
 * For each wire
 */
wire1.onclick = function () {
    if (gameEnded === true) // We stop the game
        return
    wire1.setAttribute("src", `img/wiresGame/${selectedCase.disposition[0]}_cut.png`) // We change the image and put a cut wire instead
    const result = checkWin(0) // We check if this wire is the right one (here 0 is the index of the wire )
    if (result) { // If the user won, we display the "Win box"
        resultBox.style.display = "block";
        resultWin.style.display = "block";
    } else { // Otherwise we display the "Lose box"
        resultBox.style.display = "block";
        resultLose.style.display = "block";
    }
}

wire2.onclick = function () {
    if (gameEnded === true)
        return
    wire2.setAttribute("src", `img/wiresGame/${selectedCase.disposition[1]}_cut.png`)
    const result = checkWin(1)
    if (result) {
        resultBox.style.display = "block";
        resultWin.style.display = "block";
    } else {
        resultBox.style.display = "block";
        resultLose.style.display = "block";
    }

}

wire3.onclick = function () {
    if (gameEnded === true)
        return
    wire3.setAttribute("src", `img/wiresGame/${selectedCase.disposition[2]}_cut.png`)
    const result = checkWin(2)
    if (result) {
        resultBox.style.display = "block";
        resultWin.style.display = "block";
    } else {
        resultBox.style.display = "block";
        resultLose.style.display = "block";
    }

}

wire4.onclick = function () {
    if (gameEnded === true)
        return
    wire4.setAttribute("src", `img/wiresGame/${selectedCase.disposition[3]}_cut.png`)
    const result = checkWin(3)
    if (result) {
        resultBox.style.display = "block";
        resultWin.style.display = "block";
    } else {
        resultBox.style.display = "block";
        resultLose.style.display = "block";
    }

}
wire5.onclick = function () {
    if (gameEnded === true)
        return
    wire5.setAttribute("src", `img/wiresGame/${selectedCase.disposition[4]}_cut.png`)
    const result = checkWin(4)
    if (result) {
        resultBox.style.display = "block";
        resultWin.style.display = "block";
    } else {
        resultBox.style.display = "block";
        resultLose.style.display = "block";
    }

}
wire6.onclick = function () {
    if (gameEnded === true)
        return
    wire6.setAttribute("src", `img/wiresGame/${selectedCase.disposition[5]}_cut.png`)
    const result = checkWin(5)
    if (result) {
        resultBox.style.display = "block";
        resultWin.style.display = "block";
    } else {
        resultBox.style.display = "block";
        resultLose.style.display = "block";
    }

}


/**
 * When the function is called, the game is ended.  It checks if the wireIndex passed in the function is the correct one.
 * @param {number} wireIndex
 * @returns {boolean} 
 */
function checkWin(wireIndex) {
    gameEnded = true
    clearInterval(countdown);
    if (wireIndex === selectedCase.toCut - 1) { // We do -1 because the 'toCut' is not an index, but a number. 
        return true
    }
return false
}


/**
 *  This functions returns a random number smaller than the given maxNb
 * @param {number} maxNb
 * @returns {number} 
 */
function getRandomNumber(maxNb) {
    return Math.floor(Math.random() * maxNb)
}


/**
 * This functions generate a serial number. Here we want a 4 digits number. The functions gets a state of "odd" or "even".
 * @param {string} state
 * @returns {number}
 */
function generateSerial(state) {
//We call the function getRandomNumber and we give it the maxNb of 4499
    let nb = getRandomNumber(4499) * 2 + 1000   // This will return  a maximum of 9998
    if (state === "odd") {
        nb = nb - 1
    }
    return nb
}

/**
 * This functions reloads the page in oder to reload the game
 */
function initGame() {
    document.location.reload(true);
}

/**
 * This function generates the timer. It requires a duration and "display"
 * @param {number} duration
 * @param {string} display
 */
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;

    countdown = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 10) {
            display.classList.add("blink"); // If the time is below 10 seconds, the timer will start blinking 
        }

        if (timer < 0) { // If the time reaches 0, the game stops, the timer stops blinking and the result is displayed 
            gameEnded = true
            display.classList.remove("blink");
            clearInterval(countdown);
            resultBox.style.display = "block";
            resultLose.style.display = "block";
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