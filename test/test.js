// import { spriteMovements,startAnimation} from '../prova-sprite/sprite.js'
var bottom = 350;
var t = Date.now();
var speed = 20;
var cont = 0;


var animationInterval;
// var spriteSheet = document.getElementById("sprite-image");
var widthOfSpriteSheet = 832; //sbagliati
var widthOfEachSprite = 832 / 13;
var heightOfEachSprite = 64; //px

//coordinates 
var x = 0;
var y = bottom;
//prendo il canvas dall'HTML________________________________________________________________
var canvas = document.getElementById("canvas");
var mySquare = canvas.getContext("2d");
var spriteImage = document.createElement("div");
spriteImage.classList.add("sprite-image")
var gameWrapper = document.getElementById("game-wrapper")
gameWrapper.appendChild(spriteImage)

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
    // drawSprite(sprite.spriteMovements.walkDx);
    console.log("going right");
    window.requestAnimationFrame(goRight);
  }
}
 //funzione per muovere un oggetto a sx
function goLeft() {
  if (movements.goingLeft) {
    x -= speed;
    draw();
    
    // drawSprite(sprite.spriteMovements.walkSx);
    console.log("going left");
    window.requestAnimationFrame(goLeft);
  }
}

//funzione del salto;
function jump() {
  if (cont < 20) {
    y -= 10;
    draw();
    drawSprite();
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
      break;
    case 39:
      movements.goingRight = false;
      console.log("right key released");
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
    drawSprite();
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
 
}

function drawSprite(movement) {
  spriteImage.style.left = x+"px"
  spriteImage.style.top = y+"px"
  startAnimation(movement,spriteImage)
}

window.onload = function () {
  //var t = Date.now();
  console.log(spriteMovements)
  gravity();
  draw();
  drawSprite(spriteMovements.walkSx);
};


export const spriteMovements = {
  walkDx: {
    row: 10, //every movement has some properties
    numOfImg: 9,
  },
  walkSx: {
    row: 12,
    numOfImg: 9,
  },
};

// ANIMATIONS FUNCTION___________________________________________________________________

export function startAnimation(movement,spriteSheet) {
  var position = widthOfEachSprite; //start position for the image
  const speed = 100; //in millisecond(ms)
  const diff = widthOfEachSprite; //difference between two sprites

  animationInterval = setInterval(() => {
    spriteSheet.style.backgroundPosition = `-${position}px ${heightOfEachSprite * movement.row}px`;

    drawSprite(sprite.spriteMovements.walkSx);
    if (position < widthOfSpriteSheet) {
      position = position + diff;
    } else {
      //increment the position by the width of each sprite each time
      position = widthOfEachSprite;
    }
    if (position == widthOfEachSprite * movement.numOfImg) {
      //
      position = widthOfEachSprite;
    }
    //reset the position to show first sprite after the last one
  }, speed);
}
