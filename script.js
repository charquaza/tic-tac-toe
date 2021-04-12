(function startApp() {

    const game = (function createGame() {
        var player1;
        var player2;
        var numOfMovesMade = 0;

        function setupGame() {
            var boardElem = document.querySelector(".gameboard");
    
            for (let i = 0; i < 9; i++) {
                let cellElem = document.createElement("div");
                cellElem.id = i;
                boardElem.appendChild(cellElem);
            }
    
            var startGameBtn = document.querySelector("button.start-game");
            startGameBtn.addEventListener("click", startGame);
        }

        function startGame() {
            var player1Name = document.querySelector("#player1").value;
            var player2Name = document.querySelector("#player2").value;
    
            var player1Mark = (document.querySelector("#o").checked) ? "O" : "X";
            var player2Mark = (player1Mark === "O") ? "X" : "O";
    
            player1 = makePlayer(player1Name, player1Mark, true);
            player2 = makePlayer(player2Name, player2Mark, false);
    
            var allInputElems = document.querySelectorAll(".players-container input");
            allInputElems.forEach(function disableInput(inputElem) {
                inputElem.setAttribute("disabled", "");
            });
    
            //remove start button 
            document.querySelector("div.controls").replaceChildren();

            var boardCells = document.querySelectorAll(".gameboard div"); 
            boardCells.forEach(function addListener(cell) {
                cell.addEventListener("click", handleBoardClick);
            });
        }

        function handleBoardClick(click) {
            var cell = click.target;
    
            var currPlayer = (player1.getTurn()) ? player1 : player2;
    
            if (gameBoard.placeMark(Number(cell.id), currPlayer.getMark())) {
                //update DOM board display
                cell.textContent = currPlayer.getMark();
    
                game.checkWinner(currPlayer);
    
                player1.changeTurn();
                player2.changeTurn();
            }
        }

        function checkWinner(currPlayer) {
            numOfMovesMade++;

            if (numOfMovesMade < 5) {
                return;
            }

            var board = gameBoard.getBoard();

            //check rows
            for (let i = 0; i < board.length; i += 3) {
                if (
                    board[i] !== null &&
                    board[i] === board[i + 1] &&
                    board[i + 1] === board[i + 2]
                ) {
                    game.endGame(currPlayer);
                    return;
                }
            }
            //check columns
            for (let i = 0; i <= 3; i++) {
                if (
                    board[i] !== null &&
                    board[i] === board[i + 3] &&
                    board[i + 3] === board[i + 6]
                ) {
                    game.endGame(currPlayer);
                    return;
                }
            }
            //check diagonals
            if (
                board[4] !== null &&
                ((board[0] === board[4] && board[4] === board[8]) ||
                (board[2] === board[4] && board[4] === board[6]))
            ) {
                game.endGame(currPlayer);
                return;
            }
            //check for tie
            if (numOfMovesMade === 9) {
                game.endGame(null);
            }
        }

        function endGame(winner) {
            var boardCells = document.querySelectorAll(".gameboard div");
            boardCells.forEach(function removeListener(cell) {
                cell.removeEventListener("click", handleBoardClick);
            });

            if (winner === null) {
                console.log("It's a tie.");
            } else {
                console.log(winner.getName() + " won!");
            }
        }

        return {setupGame, startGame, handleBoardClick, checkWinner, endGame};
    })();

    const gameBoard = (function createGameboard() {
        const board = [
            null, null, null,
            null, null, null,
            null, null, null
        ];

        function getBoard() {
            return board;
        }
        function placeMark(position, mark) {
            if (board[position] === null) {
                board[position] = mark;
                return true;
            }
            return false;
        }

        return {getBoard, placeMark};
    })();

    function makePlayer(nameInput, markInput, firstPlayer) {
        const name = nameInput || (firstPlayer ? "Player1" : "Player2");
        const mark = markInput;
        let myTurn = firstPlayer || false;

        function getName() {
            return name;
        }
        function getMark() {
            return mark;
        }
        function getTurn() {
            return myTurn;
        }
        function changeTurn() {
            myTurn = !myTurn;
        }
        
        return {getName, getMark, getTurn, changeTurn};
    }

    game.setupGame();

})();

