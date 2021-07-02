let nowTurn = 0;
let brownScore = 0;
let greenScroe = 0;
let boardStatus = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];

// When window load finished..
window.addEventListener('load', function () {
    // Add all pressable boards click events
    var pressableBoards = document.getElementsByClassName("pressable-board");
        
    Array.prototype.forEach.call(pressableBoards, (target, index) => {
        target.addEventListener('click', (e) => {
            if(e.target.childNodes.length != 0) {
                // Already Clicked not click.
                console.log("CAN`T!");
            }
            else {
                let addTarget;
                if(nowTurn == 0) addTarget = new BrownCircle();
                else addTarget = new GreenX();

                e.target.appendChild(addTarget.element);
                setBoard(e.target.id);
                if(checkWin()) {
                    winProcess();
                }
                else if(checkDraw()) {
                    //alert("Draw!");
                    init();
                }
                else {
                    nowTurn = (nowTurn + 1) % 2;
                    setTurnPoint();
                }
            }
        })
    });

    // toggle turn.
    setTurnPoint();
});

function setScore() {
    document.getElementById("brown-team-score").innerText = "" + brownScore;
    document.getElementById("green-team-score").innerText = "" + greenScroe;
}

function setTurnPoint() {
    // If nowTurn == 0, Brown Turn. If not, Green Turn
    if(nowTurn == 0) {
        document.getElementById("brown-turn").classList.remove('non-visible');
        document.getElementById("green-turn").classList.add('non-visible');
    }
    else {
        document.getElementById("brown-turn").classList.add('non-visible');
        document.getElementById("green-turn").classList.remove('non-visible');
    }
}

function eventBlocker(el, ev) {
    ev.stopPropagation();
}

function setBoard(id) {
    if(id == "board01") {
        boardStatus[0][0] = nowTurn;
    }
    else if(id == "board02") {
        boardStatus[0][1] = nowTurn;
    }
    else if(id == "board03") {
        boardStatus[0][2] = nowTurn;
    }
    else if(id == "board04") {
        boardStatus[1][0] = nowTurn;
    }
    else if(id == "board05") {
        boardStatus[1][1] = nowTurn;
    }
    else if(id == "board06") {
        boardStatus[1][2] = nowTurn;
    }
    else if(id == "board07") {
        boardStatus[2][0] = nowTurn;
    }
    else if(id == "board08") {
        boardStatus[2][1] = nowTurn;
    }
    else if(id == "board09") {
        boardStatus[2][2] = nowTurn;
    }
}

function checkWin() {
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(boardStatus[i][j] == nowTurn){
                if(j == 2) {
                    return true;
                }
            }
            else {
                break;
            }
        }
    }
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(boardStatus[j][i] == nowTurn){
                if(j == 2) {
                    return true;
                }
            }
            else {
                break;
            }
        }
    }
    for(let i = 0; i < 3; i++) {
        if(boardStatus[i][i] == nowTurn){
            if(i == 2) {
                return true;
            }
        }
        else {
            break;
        }
    }
    for(let i = 0; i < 3; i++) {
        if(boardStatus[i][2 - i] == nowTurn){
            if(i == 2) {
                return true;
            }
        }
        else {
            break;
        }
    }
}

function checkDraw() {
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(boardStatus[i][j] != -1) {
                if(i == 2 && j == 2) {
                    return true;
                }
            }
            else { 
                break;
            }
        }
    }
}

function winProcess() {
    // Alert who is win and win count +,
    // reset all board or turn.
    if(nowTurn == 0) {
        brownScore += 1;
        //alert("Brown is win!");
    }
    else {
        greenScroe += 1;
        //alert("Green is win!");
    }
    init();
}

function init() {
    boardStatus = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
    nowTurn = 0;
    clearBoard();
    setScore();
    setTurnPoint();
}

function clearBoard() {
    var pressableBoards = document.getElementsByClassName("pressable-board");
        
    Array.prototype.forEach.call(pressableBoards, (target, index) => {
        while(target.hasChildNodes()) {
            target.removeChild(target.firstChild);
        }
    });
}

function newGame() {
    brownScore = 0;
    greenScroe = 0;
    init();
}

class BrownCircle {
    constructor() {
        let divEl = document.createElement('div');
        divEl.innerHTML = 
        `<div class="outer-circle">
            <div class="inner-circle" onClick="eventBlocker(this, event)"></div>
        </div>`;
        this.element = divEl.firstChild;
    }
}

class GreenX {
    constructor() {
        let divEl = document.createElement('div');
        divEl.innerHTML = 
        `<div class="x-container" onClick="eventBlocker(this, event)">
            <div class="x-left"></div>
            <div class="x-right"></div>
        </div>`;
        this.element = divEl.firstChild;
    }
}