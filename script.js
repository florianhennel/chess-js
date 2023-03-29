class Piece{
    alive = true;
    constructor(color,piece) {
        this.color = color;
        this.piece = piece;
    }

}
class Pawn{
    constructor(color,piece){
        super(color,piece);
    }
    Moves() {
        if(color="white"){}
        else{}
    }
}
pieceArray = [];
for (let index = 0; index < 8; index++) {
    p = new Piece(white,pawn);
    pieceArray[index] = p;
}
const babuk = [
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""]
]

function setBoard(){

}