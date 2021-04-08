(function startApp() {

    const game = (function createGame() {
        //check for winner, update turn status
        // var whoseTurn = "player1";

        // function getTurn() {
        //     return whoseTurn;
        // }
        // function nextTurn() {
        //     whoseTurn = (whoseTurn === "player1") ? "player2" : "player1";
        // }

        // return {getTurn, nextTurn};
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

