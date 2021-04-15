// The actual game- the whole point


var gameLoop = function() {
  // This will be the default styling for line colour and width
  ctx.strokeStyle = `rgb(${255-curr[0]}, ${255-curr[1]}, ${curr[2]}`;
  ctx.lineWidth = 5;

  // Drawing the lines
  drawGrid();
}

// Code for mouse-presses
var mousePressed = function(event) {
  let x = event.pageX - cnv.offsetLeft, y = event.pageY - cnv.offsetTop;
}

// Code for drawing the grid
var drawGrid = function() {
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
