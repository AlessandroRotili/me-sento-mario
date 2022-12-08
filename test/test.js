bottom = 350;
var t = Date.now();
var speed = 20;
var cont = 0;

//coordinates 
var x = 0;
var y = bottom;
//prendo il canvas dall'HTML________________________________________________________________
var canvas = document.getElementById("canvas");
var mySquare = canvas.getContext("2d");
//________________________________________________________________________________________________________________________________

//generazione componente da js ___________________________________________________________________
// var myCanvas = document.createElement("canvas");
// document.body.appendChild(myCanvas); 
// var ctx = canvas.getContext("2d");
//________________________________________________________________________________________________________________________________


//Oggetto anonimo contentente lo stato dei movimenti ___________________________________________________________________
var movements = {
  goingRight: false,
  goingLeft: false,
  isJumping: false,
};

//L I S T N E N E R S ----------------------------------------------------------------
window.addEventListener("keydown", lateralMovement, false);
// window.addEventListener("keydown", startMove, false);

//JUMPING FUN Listener----------------------------------------------------------------
window.addEventListener("keypress", (key) => {
  if (key.code === "Space" && y == bottom) {
    cont = 0;
    jump();
  }
});

window.addEventListener("keyup", stopMove, false);


//FUNCTIONS ----------------------------------------------------------------

//funzione per muovere un oggetto a dx
function goRight() {
  if (movements.goingRight) {
    x += speed;
    draw();
    console.log("going right");
    window.requestAnimationFrame(goRight);
  }
}
 //funzione per muovere un oggetto a sx
function goLeft() {
  if (movements.goingLeft) {
    x -= speed;
    draw();
    console.log("going left");
    window.requestAnimationFrame(goLeft);
  }
}

//funzione del salto;
function jump() {
  if (cont < 20) {
    y -= 10;
    draw();
    cont++;
    movements.isJumping = true;
    window.requestAnimationFrame(jump);
    console.log("onair" + onAir + " cont:" + cont);
  } else {
    movements.isJumping = false;
    console.log("onair" + onAir + " cont:" + cont);
  }
}

//setter dei movimenti a false;
function stopMove(e) {
  switch (e.keyCode) {
    case 37:
      movements.goingLeft = false;
      console.log("left key released");
      window.cancelAnimationFrame(goLeft());
      break;
    case 39:
      movements.goingRight = false;
      console.log("right key released");
      window.cancelAnimationFrame(goRight());
      break;
  }
}

//funzione che richiama i movimenti laterali;
function lateralMovement(e) {
  switch (e.keyCode) {
    case 37:
      movements.goingLeft = true;
      break;
    case 39:
      movements.goingRight = true;
      break;
  }
  goLeft();
  goRight();
  console.log(e);
}

function borderCheck() {
  x = x < 0 ? 0 : x;
  x = x > 550 ? 550 : x;
  y = y < 0 ? 0 : y;
  y = y > bottom ? bottom : y; //vedemo se funzia
}

//PHYSICS__________________________________________________________________
//forza di gravità(da implementare)
function gravity() {
  if (!movements.isJumping) {
    y += speed / 2;
    draw(); 
  }
  window.requestAnimationFrame(gravity);
}

//funzione che disegna il mio quadrato -------------------------------- 
function draw() {
  mySquare.clearRect(0, 0, 600, 400);
  mySquare.beginPath();
  borderCheck();
  mySquare.rect(x, y, 50, 50);
  mySquare.fillStyle = "red";
  mySquare.fill();
  mySquare.closePath();

  // ctx.beginPath();
  // borderCheck();
  // ctx.rect(10, 10, 100, 100);
  // ctx.fillStyle = "green";
  // ctx.fill();
  // ctx.closePath(); 
}

window.onload = function () {
  //var t = Date.now();
  gravity();
  draw();
};
