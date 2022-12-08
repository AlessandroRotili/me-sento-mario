var animationInterval;
var spriteSheet = document.getElementById("sprite-image");
var widthOfSpriteSheet = 1472; //sbagliati
var widthOfEachSprite = 184;

function stopAnimation() {
  clearInterval(animationInterval);
}

// ___________________________________________________________________

function startAnimation() {
  var position = widthOfEachSprite; //start position for the image
  const speed = 100; //in millisecond(ms)
  const diff = widthOfEachSprite; //difference between two sprites

  animationInterval = setInterval(() => {
    spriteSheet.style.backgroundPosition = `-${position}px 0px`;

    if (position < widthOfSpriteSheet) {
      position = position + diff;
    } else {
      //increment the position by the width of each sprite each time
      position = widthOfEachSprite;
    }
    //reset the position to show first sprite after the last one
  }, speed);
}
//___________________________________________________________________
//Start animation
startAnimation();