(function startApp() {

    const game = (function createGame() {
        function checkWinner() {
            var board = gameBoard.getBoard();

            //check rows
            for (let i = 0; i < board.length; i += 3) {
                if (
                    board[i] !== null &&
                    board[i] === board[i + 1] &&
                    board[i + 1] === board[i + 2]
                ) {
                    return true;
                }
            }
            //check columns
            for (let i = 0; i <= 3; i++) {
                if (
                    board[i] !== null &&
                    board[i] === board[i + 3] &&
                    board[i + 3] === board[i + 6]
                ) {
                    return true;
                }
            }
            //check diagonals
            if (
                board[4] !== null &&
                ((board[0] === board[4] && board[4] === board[8]) ||
                (board[2] === board[4] && board[4] === board[6]))
            ) {
                return true;
            }
            
            return false;
        }

        function endGame(winner) {
            var boardElem = document.querySelector(".gameboard");
            boardElem.childNodes.forEach(function removeListener(cell) {
                cell.removeEventListener("click", handleBoardClick);
            });

            console.log(winner.getName() + " won!");
        }

        return {checkWinner, endGame};
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
        const name = nameInput;
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

    function handleBoardClick(click) {
        var cell = click.target;

        var currPlayer = (player1.getTurn()) ? player1 : player2;

        if (gameBoard.placeMark(Number(cell.id), currPlayer.getMark())) {
            //update DOM board display
            cell.textContent = currPlayer.getMark();

            if (game.checkWinner()) {
                game.endGame(currPlayer);
            }

            player1.changeTurn();
            player2.changeTurn();
        }
    }


    let player1 = makePlayer("first", "O", true);
    let player2 = makePlayer("second", "X");

    let boardElem = document.querySelector(".gameboard");

    for (let i = 0; i < 9; i++) {
        let cellElem = document.createElement("div");
        cellElem.id = i;
        cellElem.addEventListener("click", handleBoardClick);
        boardElem.appendChild(cellElem);
    }

})();

