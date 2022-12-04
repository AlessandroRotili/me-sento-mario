bottom = 300;
var t = Date.now();
var x = 0;
var y = bottom;
var canvas = document.getElementById("canvas");
canvas.innerText = "ciao";
var context = canvas.getContext("2d");
var speed = 20;
var onAir = false;
var cont = 0;

var rightArrowDown = false;
var leftArrowDown = false;
//functions ------------------------

window.addEventListener("keydown", move, false);
// window.addEventListener("keydown", startMove, false);

window.addEventListener("keyup", stopMove, false);

function move(e) {
  switch (e.keyCode) {
    case 37:
      //   leftArrowDown = true;
      //   goLeft();
      x -= 10;
      break;
    case 39:
      //   rightArrowDown = true;
      //   goRight();
      x += 10;
      break;
    case 32:
      if (y == bottom) {
        cont = 0;
        jump();
      }
      break;
  }

  console.log(e);
  draw();
}

// function startMove(e) {
//   switch (e.keyCode) {
//     case 37:
//       leftArrowDown = true;
//       break;
//     case 39:
//       rightArrowDown = true;
//       break;
//   }
// }
function stopMove(e) {
  switch (e.keyCode) {
    case 37:
      leftArrowDown = false;
      window.cancelAnimationFrame(goLeft());
      break;
    case 39:
      rightArrowDown = false;
      window.cancelAnimationFrame(goLeft());
      break;
  }
}

function goRight() {
  if (rightArrowDown) {
    x += speed;
    draw();
    window.requestAnimationFrame(goRight());
  }
}

function goLeft() {
  if (leftArrowDown) {
    x -= speed;
    draw();
    window.requestAnimationFrame(goLeft());
  }
}

function jump() {
  if (cont < 20) {
    y -= 10;
    draw();
    cont++;
    onAir = true;
    window.requestAnimationFrame(jump);
    console.log("onair" + onAir + " cont:" + cont);
  } else {
    onAir = false;
    console.log("onair" + onAir + " cont:" + cont);
  }
}

function borderCheck() {
  x = x < 0 ? 0 : x;
  x = x > 500 ? 500 : x;
  y = y < 0 ? 0 : y;
  y = y > bottom ? bottom : y; //vedemo se funzia
}

function gravity() {
  if (!onAir) {
    y += speed / 2;
    draw();
  }
  window.requestAnimationFrame(gravity);
}

function draw() {
  context.clearRect(0, 0, 600, 400);
  context.beginPath();
  borderCheck();
  context.rect(x, y, 100, 100);
  context.fillStyle = "red";
  context.fill();
}

window.onload = function () {
  //var t = Date.now();
  gravity();
  draw();
};
