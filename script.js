document.addEventListener("DOMContentLoaded", main);
function main() {
    class Coordinate {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }
  class Piece {
    constructor(color, piece, coordinate) {
      this.color = color;
      this.piece = piece;
      this.coordinate = coordinate;
    }
  }
  const squares = document.querySelectorAll(".squares");
  const btn = document.getElementById("btn");
  const types = ["pawn", "rook", "knight", "bishop", "queen", "king"];
  let pieces = [[],[],[],[],[],[],[],[]];
  setBoard();

  squares.forEach((square) => {
    square.addEventListener("click", clickPiece);
  });
  function clickPiece() {
    const index = this.getAttribute("cellindex");
    squares[index - 1].textContent = "Here!";
  }
  function setBoard() {
    types.forEach((element) => {
      switch (element) {
        case "pawn":
          for (let i = 1; i <= 8; i++) {
            let white = new Piece("white","pawn",new Coordinate(6,i));
            let  black = new Piece("black","pawn",new Coordinate(1,i));
            pieces[6][i] = white;
            pieces[1][i] = black;
          }
      }
    });
    pieces = [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ];
  }
}
