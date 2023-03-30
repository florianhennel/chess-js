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
  const types = ["pawn", "rook", "knight", "bishop", "queen", "king"];
  const styleSheet = document.styleSheets[0];
  var rules = styleSheet.cssRules || styleSheet.rules;
  let pieces = [[], [], [], [], [], [], [], [], []];



  startGame();


  function startGame(){
    setBoard();
    whitesTurn();
  }
  function blacksTurn(){
    squares.forEach((square) => {
      square.addEventListener("click", clickSquare);
    });
  }
  function whitesTurn() {
    squares.forEach((square) => {
      square.addEventListener("click", clickSquare);
    });
  }
  function resetColor(idName){
    let color;
    for (let i = 0; i < rules.length; i++) {
      if (rules[i].selectorText == `#${idName}`){
        color = rules[i].style.getPropertyValue("background-color");
      }
    }    
    return color;
  }
  function clickSquare(event) {
    let white = false;
    let selectedPiece;
    const square = this;
    const index = this.getAttribute("cellindex");
    const idName = this.getAttribute("id"); 
    
    if (!(clickOnPiece(index) == false)) {
      if(clickOnPiece(index).color == "white"){white = true;square.style.backgroundColor = "rgba(100%, 100%, 0%, 1)";}
      selectedPiece = clickOnPiece(index);
    }
    if (white) {
      whiteMoves(selectedPiece);
    }else{

      blackMoves(selectedPiece);
    }
    console.log(selectedPiece);
    board.addEventListener("click", function (e) {
      if (!square.contains(e.target)) {
        square.style.backgroundColor = resetColor(idName);
      }
    });
  }
  
  function whiteMoves(selectedPiece) {
    let hints = [];
    let co = selectedPiece.coordinate;
    let sP = {
      y:selectedPiece.coordinate/8 == 0? 1 : Math.ceil(co/8),
      x:selectedPiece.coordinate % 8 == 0 ? 8 : co % 8
    }
    switch (selectedPiece.piece) {
      case "pawn":
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
                  if(pos.color == "black"){hints.push(pos.coordinate);}
                }
              })
            ) {
            }
          }
        } else {
          hints.push(co + 8);
          if (co < 17 && co > 8) {
            hints.push(co + 16);
          }
        }
        hints.forEach(element => {
          squares[element-1].style.backgroundColor = "pink";
          squares[element-1].addEventListener("click",move);
        });
        
      case "rook":

      case "knight":

      case "bishop":

      case "queen":

      case "king":

    }
    whitesTurn();
    function move(){
      let index = this.getAttribute("cellindex");
      let newPlace = {
        y:Number(index / 8 == 0 ? 1 : Math.ceil(index/8)),
        x:Number(index % 8 == 0 ? 8 : index % 8)
      }
      let old = pieces[sP.y][sP.x];
      pieces[newPlace.y][newPlace.x] = new Piece(old.color,old.piece,Number(index));
      pieces[sP.y][sP.x] = undefined;
      refreshImages();
      this.removeEventListener("click",move);
      console.log(pieces);
      resetColor(this.getAttribute("id"));
    } 
  }
  function clickOnPiece(squareIndex) {
    let field =
      pieces[squareIndex / 8 == 0 ? 1 : Math.ceil(squareIndex / 8)][
        squareIndex % 8 == 0 ? 8 : squareIndex % 8
      ];
    return field == undefined ? false : field;
  }
  function refreshImages(){
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
          squares[(i-1) * 8 + (j-1)].innerHTML = "";
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
  }
}
