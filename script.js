// Storing colours
var bgNum = 28,
    curr = [bgNum, bgNum, bgNum],
    next = [bgNum, bgNum, bgNum];
// Frame rate
var fps = 1000/60;

// Track checkbox- cannot be tracked now, too early
var checkBox;
// Delayed definition of checkbox for time
setTimeout(() => {
  checkBox = document.getElementById("modeCheck");
}, 10);


// Updating mode (light/dark)
setInterval(() => {
  updateMode();

  // Execute game loop
  gameLoop();
}, fps);


// Update the background- light/dark?
var updateMode = function() {
  // Using ? operator to set next colour in one line
  next[0] = !checkBox.checked ? 255-bgNum : bgNum;
  next[1] = !checkBox.checked ? 255-bgNum : bgNum;
  next[2] = !checkBox.checked ? 255-bgNum : bgNum;
  // Lerping effect
  curr[0] = lerp(curr[0], next[0], 0.1);
  curr[1] = lerp(curr[1], next[1], 0.1);
  curr[2] = lerp(curr[2], next[2], 0.1);

  // Update colours
  document.getElementById("html").style.backgroundColor = `rgb(${curr[0]}, ${curr[1]}, ${curr[2]})`;
  let temp = document.getElementsByClassName("text");
  for (let i = 0; i < temp.length; i++) {
    temp[i].style.color = `rgb(${255-curr[0]}, ${255-curr[1]}, ${255-curr[2]})`;
  }
  document.getElementById("JScanvas").style.border = `5px solid rgb(${255-curr[0]}, ${255-curr[1]}, ${curr[2]}`;
};

// lerp function
var lerp = function(num1, num2, amt) {
  let temp = num2 - num1;
  temp *= amt;
  return num1 + temp;
}
