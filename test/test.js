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

var movements = {
  goingRight: false,
  goingLeft: false,
  isJumping: false,
};

//functions ------------------------

window.addEventListener("keydown", lateralMovement, false);
// window.addEventListener("keydown", startMove, false);

//JUMPING FUN ----------------------------------------------------------------
//cant jump anda translate simultaneously
//ho provato a gestire le cose con 2 eventi diversi, ma non è questa la solution
window.addEventListener("keypress", (key) => {
  if (key.code === "Space" && y == bottom) {
    cont = 0;
    jump();
  }
});

window.addEventListener("keyup", stopMove, false);

function stopMove(e) {
  switch (e.keyCode) {
    case 37:
      movements.goingLeft = false;
      window.cancelAnimationFrame(goLeft());
      break;
    case 39:
      movements.goingRight = false;
      window.cancelAnimationFrame(goRight());
      break;
  }
}

function goRight() {
  if (movements.goingRight) {
    x += speed;
    draw();
    // window.requestAnimationFrame(goRight());
    console.log("going right");
  }
}

function goLeft() {
  if (movements.goingLeft) {
    x -= speed;
    draw();
    // window.requestAnimationFrame(goLeft());
    console.log("going left");
  }
}

function lateralMovement(e) {
  switch (e.keyCode) {
    case 37:
      movements.goingLeft = true;
      if (movements.goingLeft) goLeft();
      window.requestAnimationFrame(goLeft());

      break;
    case 39:
      movements.goingRight = true;
      if (movements.goingRight) goRight();
      window.requestAnimationFrame(goRight());
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
