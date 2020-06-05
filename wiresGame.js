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
                serial: "odd"
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

const nbOfWires = gameEngine[getRandomNumber(gameEngine.length)];
const selectedCase = nbOfWires.cases[getRandomNumber(nbOfWires.cases.length)];

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

resultLose.style.display = "none";
resultWin.style.display = "none";
resultBox.style.display = "none";
game.style.display = "grid";


wire1.setAttribute("src", `img/wiresGame/${selectedCase.disposition[0]}_uncut.png`)
wire2.setAttribute("src", `img/wiresGame/${selectedCase.disposition[1]}_uncut.png`)
wire3.setAttribute("src", `img/wiresGame/${selectedCase.disposition[2]}_uncut.png`)

const getEvenOrOdd = Math.random() >= 0.5 ? "even" : "odd"
document.getElementById("serial").innerHTML = generateSerial(selectedCase.serial ? selectedCase.serial : getEvenOrOdd);

let gameEnded = false

if (nbOfWires.nbWires >= 4) {
    wire4.setAttribute("src", `img/wiresGame/${selectedCase.disposition[3]}_uncut.png`)
}
if (nbOfWires.nbWires >= 5) {
    wire5.setAttribute("src", `img/wiresGame/${selectedCase.disposition[4]}_uncut.png`)
}
if (nbOfWires.nbWires >= 6) {
    wire6.setAttribute("src", `img/wiresGame/${selectedCase.disposition[5]}_uncut.png`)
}

wire1.onclick = function () {
    if (gameEnded === true) return
    wire1.setAttribute("src", `img/wiresGame/${selectedCase.disposition[0]}_cut.png`)
    const result = checkWin(0)
    if (result) {
        resultBox.style.display = "block";
        resultWin.style.display = "block";
    }

    else {
        resultBox.style.display = "block";
        resultLose.style.display = "block";
    }
}

wire2.onclick = function () {
    if (gameEnded === true) return
    wire2.setAttribute("src", `img/wiresGame/${selectedCase.disposition[1]}_cut.png`)
    const result = checkWin(1)
    if (result) {
        resultBox.style.display = "block";
        resultWin.style.display = "block";
    }

    else {
        resultBox.style.display = "block";
        resultLose.style.display = "block";
    }

}

wire3.onclick = function () {
    if (gameEnded === true) return
    wire3.setAttribute("src", `img/wiresGame/${selectedCase.disposition[2]}_cut.png`)
    const result = checkWin(2)
    if (result) {
        resultBox.style.display = "block";
        resultWin.style.display = "block";
    }

    else {
        resultBox.style.display = "block";
        resultLose.style.display = "block";
    }

}

wire4.onclick = function () {
    if (gameEnded === true) return
    wire4.setAttribute("src", `img/wiresGame/${selectedCase.disposition[3]}_cut.png`)
    const result = checkWin(3)
    if (result) {
        resultBox.style.display = "block";
        resultWin.style.display = "block";
    }

    else {
        resultBox.style.display = "block";
        resultLose.style.display = "block";
    }

}
wire5.onclick = function () {
    if (gameEnded === true) return
    wire5.setAttribute("src", `img/wiresGame/${selectedCase.disposition[4]}_cut.png`)
    const result = checkWin(4)
    if (result) {
        resultBox.style.display = "block";
        resultWin.style.display = "block";
    }

    else {
        resultBox.style.display = "block";
        resultLose.style.display = "block";
    }

}
wire6.onclick = function () {
    if (gameEnded === true) return
    wire6.setAttribute("src", `img/wiresGame/${selectedCase.disposition[5]}_cut.png`)
    const result = checkWin(5)
    if (result) {
        resultBox.style.display = "block";
        resultWin.style.display = "block";
    }

    else {
        resultBox.style.display = "block";
        resultLose.style.display = "block";
    }

}

function checkWin(wireIndex) {
    gameEnded = true

    if (wireIndex === selectedCase.toCut - 1) {
        return true

    }

}

function getRandomNumber(maxNb) {
    return Math.floor(Math.random() * maxNb)
}

function generateSerial(state) {

    let nb = getRandomNumber(4499) * 2 + 1000
    if (state === "odd") {
        nb = nb - 1
    }
    return nb
}


function initGame() {
    document.location.reload(true);

}