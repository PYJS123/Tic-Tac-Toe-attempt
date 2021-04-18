// The actual game- the whole point

// Store the tic-tac-toe grid
var grid = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

// Defining players
var players = ["X", "O"],
    currIndex = 0,
    currPlayer = players[0];

// Variable to see if we are playing- avoids constant window.alert() feedback
var playing = true;


var gameLoop = function() {
  // Clear screen to redraw
  if (playing == true) {ctx.clearRect(0, 0, cnv.width, cnv.height);}

  // This will be the default styling for line colour and width
  ctx.strokeStyle = `rgb(${255-curr[0]}, ${255-curr[1]}, ${curr[2]}`;
  ctx.lineWidth = 5;

  // Drawing the lines
  drawGrid();
  let result = endGame(grid);
  if (playing == true && result.type != undefined) {
    console.log(result);
    playing = false;
  }
}

// Code for mouse-presses
var mousePressed = function(event) {
  let x = event.pageX-cnv.offsetLeft, y = event.pageY-cnv.offsetTop;
  // Do some simple maths to find out the cell
  let newX = Math.floor(x/cnv.width*3), newY = Math.floor(y/cnv.height*3);

  // Assign the new cell and update the player (only if valid), with some maths (again!)
  if (grid[newY][newX] == "" && playing == true) {
    grid[newY][newX] = currPlayer;
    currPlayer = players[++currIndex % players.length];
  }
}

// Code to find out if the game has ended on the board
var endGame = function(board) {
  let type, winner, angleWin;

  // Checking for wins
  // Columns
  if (board[0][0] == board[1][0] && board[1][0] == board[2][0] && board[0][0] != "") {type='win';angleWin='column';winner=board[0][0]}
  if (board[0][1] == board[1][1] && board[1][1] == board[2][1] && board[0][1] != "") {type='win';angleWin='column';winner=board[0][1]}
  if (board[0][2] == board[1][2] && board[1][2] == board[2][2] && board[0][2] != "") {type='win';angleWin='column';winner=board[0][2]}

  // Rows
  if (board[0][0] == board[0][1] && board[0][1] == board[0][2] && board[0][0] != "") {type='win';angleWin='row';winner=board[0][0]}
  if (board[1][0] == board[1][1] && board[1][1] == board[1][2] && board[1][0] != "") {type='win';angleWin='row';winner=board[1][0]}
  if (board[2][0] == board[2][1] && board[2][1] == board[2][2] && board[2][0] != "") {type='win';angleWin='row';winner=board[2][0]}

  // Diagonals
  if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != "") {type='win';angleWin="diagonal";winner=board[0][0]}
  if (board[2][0] == board[1][1] && board[1][1] == board[0][2] && board[2][0] != "") {type='win';angleWin="diagonal";winner=board[2][0]}

  // Checking for draws
  let full = true;
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[0].length; x++) {
      if (board[y][x] == "") {full = false;}
    }
  }
  if (full == true && type != 'win') {type='draw';}

  // Return results
  return {type: type, winner: winner, angleWin: angleWin};
};

// Code for drawing the grid
var drawGrid = function() {
  drawLines();
  drawTable(grid);
}

// Code to draw Xs, Os, and ""s
var drawTable = function(table) {
  for (let y = 0; y < table.length; y++) {
    for (let x = 0; x < table[0].length; x++) {
      let pdg = 15;  // Padding for "X";
      // My favourite- switch() {case:} statement!:
      switch(table[y][x]) {
        case "X":
          // Draw "X"
          line((x*cnv.width/3)+pdg, (y*cnv.height/3)+pdg, (x*cnv.width/3)+(cnv.width/3)-pdg, (y*cnv.height/3)+(cnv.height/3)-pdg);
          line(((x+1)*cnv.width/3)-pdg, (y*cnv.height/3)+pdg, ((x-1)*cnv.width/3)+(cnv.width/3)+pdg, (y*cnv.height/3)+(cnv.height/3)-pdg);
          break;
        case "O":
          // Draw "O"
          circle((x*cnv.width/3)+(cnv.width/6), (y*cnv.height/3)+(cnv.height/6), Math.min(cnv.width, cnv.height)/9);
          break;
        case "":
          break;  // Nothing to do!
      }
    }
  }
}

// To draw circle is to make something beatiful...
var circle = function(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, false);
  ctx.closePath();
  ctx.stroke();
}

// Code to draw lines
var drawLines = function() {
  line(cnv.width/3*1, 0, cnv.width/3*1, cnv.height);
  line(cnv.width/3*2, 0, cnv.width/3*2, cnv.height);
  line(0, cnv.height/3*1, cnv.width, cnv.height/3*1);
  line(0, cnv.height/3*2, cnv.width, cnv.height/3*2);
}

// Code for line- easier to read if it's a simplification
var line = function(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.closePath();
  ctx.stroke();
}
