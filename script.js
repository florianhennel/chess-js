document.addEventListener("DOMContentLoaded", main);
function main() {
  class Piece {
    constructor(color, piece, coordinate) {
      this.color = color;
      this.piece = piece;
      this.coordinate = coordinate;
    }
  }
  const squares = document.querySelectorAll(".squares");
  const btn = document.getElementById("btn");
  const board = document.getElementById("board");
  const status = document.getElementById("status");
  const types = ["pawn", "rook", "knight", "bishop", "queen", "king"];
  const styleSheet = document.styleSheets[0];
  var rules = styleSheet.cssRules || styleSheet.rules;
  let pieces = [[], [], [], [], [], [], [], [], []];
  let hints = [];
  let white = true;

  startGame();

  function startGame() {
    hints = [];
    setBoard();
    whitesTurn();
  }
   function whitesTurn() {
    squares.forEach((square) => {
      square.addEventListener("click", clickSquare);
    });
  }
  function resetColor(idName) {
    let color;
    for (let i = 0; i < rules.length; i++) {
      if (rules[i].selectorText == `#${idName}`) {
        color = rules[i].style.getPropertyValue("background-color");
      }
    }
    return color;
  }
  function clickSquare(event) {

    squares.forEach((square) => {
      square.removeEventListener("click", clickSquare);
    });
    const index = this.getAttribute("cellindex");
    const idName = this.getAttribute("id");
    const selectedPiece = clickOnPiece(index);
    console.log(index);
    if (selectedPiece != false) {
      if (white && selectedPiece.color == "white") {
        this.style.backgroundColor = "rgba(100%, 100%, 0%, 1)";
        whiteMoves(selectedPiece);
      }
    }
    board.addEventListener("click", (e) => {
      if (!this.contains(e.target)) {
        this.style.backgroundColor = resetColor(idName);
      }
    });
    this.removeEventListener("click",clickSquare);
  }

  function whiteMoves(selectedPiece) {

    switch (selectedPiece.piece) {
      case "pawn":
        pawnMove(selectedPiece);
      case "rook":

      case "knight":

      case "bishop":

      case "queen":

      case "king":
    }
  }
  function pawnMove(selectedPiece) {
    let co = selectedPiece.coordinate;
    let sP = {
      y: selectedPiece.coordinate / 8 == 0 ? 1 : Math.ceil(co / 8),
      x: selectedPiece.coordinate % 8 == 0 ? 8 : co % 8,
    };
    if (selectedPiece.color == "white") {
      if (pieces[sP.y - 1][sP.x] == undefined) {
        hints.push(co - 8);
      }
      if (co < 67 && co > 48) {
        hints.push(co - 16);
      }
      if (co % 8 > 1) {
        let possibleTake = [
          pieces[sP.y - 1][sP.x - 1],
          pieces[sP.y - 1][sP.x + 1],
        ];
        if (
          possibleTake.forEach((pos) => {
            if (pos != undefined) {
              if (pos.color == "black") {
                hints.push(pos.coordinate);
              }
            }
          })
        ) {
        }
      }
    }
    hints.forEach((element) => {
      squares[element - 1].classList.add("hint");
    });
    squares.forEach((square) => {
      square.addEventListener("click", move);
    });
    function move(){
      squares.forEach((square) => {
        square.removeEventListener("click", move);
      });
      let index = this.getAttribute("cellIndex");
      if (hints.includes(Number(index))) {
        let newPlace = {
          y: Number(index / 8 == 0 ? 1 : Math.ceil(index / 8)),
          x: Number(index % 8 == 0 ? 8 : index % 8),
        };
        let old = pieces[sP.y][sP.x];
        let moved = sP.y - newPlace.y;
        console.log("moved: ", moved);
        pieces[newPlace.y][newPlace.x] = new Piece(old.color,old.piece,Number(index));
        pieces[sP.y][sP.x] = undefined;
        refreshImages();
        resetHints();
        squares[selectedPiece.coordinate-1].setAttribute("style",null);

      }
      else{
        resetHints();
        const selectedPiece2 = clickOnPiece(index);
        if (selectedPiece2 != false && selectedPiece2 != selectedPiece) {
          if (white && selectedPiece2.color == "white") {
              this.style.backgroundColor = "rgba(100%, 100%, 0%, 1)";
              squares[selectedPiece.coordinate-1].setAttribute("style",null);
              whiteMoves(selectedPiece2);
          }
          else{
            whitesTurn();
          }
        }
        else{
          squares[selectedPiece.coordinate-1].setAttribute("style",null);
          whitesTurn();
        }
      }
    }
  }
  function resetHints(){
    hints.forEach((element) => {
      squares[element - 1].classList.remove("hint");
    });
  hints = [];
  }
  function clickOnPiece(squareIndex) {
    let x = squareIndex / 8 == 0 ? 1 : Math.ceil(squareIndex / 8);
    let y = squareIndex % 8 == 0 ? 8 : squareIndex % 8;
    let field = pieces[x][y];
    return field == undefined ? false : field;
    
  }
  function refreshImages() {
    for (const piece in pieces) {
      pieces[piece].filter(notEmpty).forEach((p) => {
        squares[
          p.coordinate - 1
        ].innerHTML = `<img src="pictures/${p.color}${p.piece}.png">`;
      });
    }

    for (let i = 1; i <= 8; i++) {
      for (let j = 1; j <= 8; j++) {
        if (!pieces[i][j]) {
          squares[(i - 1) * 8 + (j - 1)].innerHTML = "";
        }
      }
    }
    function notEmpty(field) {
      return field != undefined;
    }
  }
  function setBoard() {
    types.forEach((element) => {
      switch (element) {
        case "pawn":
          for (let i = 1; i <= 8; i++) {
            pieces[7][i] = new Piece("white", "pawn", 6 * 8 + i);
            pieces[2][i] = new Piece("black", "pawn", 1 * 8 + i);
          }
          pieces[3][4] = new Piece("white", element, 2 * 8 + 4);
        case "rook":
          pieces[8][1] = new Piece("white", element, 7 * 8 + 1);
          pieces[1][1] = new Piece("black", element, 0 * 8 + 1);
          pieces[8][8] = new Piece("white", element, 7 * 8 + 8);
          pieces[1][8] = new Piece("black", element, 0 * 8 + 8);
        case "knight":
          pieces[8][2] = new Piece("white", element, 7 * 8 + 2);
          pieces[1][2] = new Piece("black", element, 0 * 8 + 2);
          pieces[8][7] = new Piece("white", element, 7 * 8 + 7);
          pieces[1][7] = new Piece("black", element, 0 * 8 + 7);
        case "bishop":
          pieces[8][3] = new Piece("white", element, 7 * 8 + 3);
          pieces[1][3] = new Piece("black", element, 0 * 8 + 3);
          pieces[8][6] = new Piece("white", element, 7 * 8 + 6);
          pieces[1][6] = new Piece("black", element, 0 * 8 + 6);
        case "queen":
          pieces[8][4] = new Piece("white", element, 7 * 8 + 4);
          pieces[1][4] = new Piece("black", element, 0 * 8 + 4);
        case "king":
          pieces[8][5] = new Piece("white", element, 7 * 8 + 5);
          pieces[1][5] = new Piece("black", element, 0 * 8 + 5);
      }
    });
    refreshImages();
    squares.forEach((square) =>{
      resetColor(square.getAttribute("id"));
    });
  }
}
