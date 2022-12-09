var animationInterval;
var spriteSheet = document.getElementById("sprite-image");
var widthOfSpriteSheet = 832; //sbagliati
var widthOfEachSprite = 832/13;
var heightOfEachSprite = 64; //px

function stopAnimation() {
  clearInterval(animationInterval);
}

// ___________________________________________________________________

function startAnimation() {
  var position = widthOfEachSprite; //start position for the image
  const speed = 100; //in millisecond(ms)
  const diff = widthOfEachSprite; //difference between two sprites

  animationInterval = setInterval(() => {
    spriteSheet.style.backgroundPosition = `-${position}px ${heightOfEachSprite*2}px`;

    if (position < widthOfSpriteSheet) {
      position = position + diff;
    } else {
      //increment the position by the width of each sprite each time
      position = widthOfEachSprite;
    }
    //reset the position to show first sprite after the last one
  }, speed);
}

//prova camminata ___________________________________________________________________
function walking() {
  var position = widthOfEachSprite; //start position for the image
  const speed = 100; //in millisecond(ms)
  const diff = widthOfEachSprite; //difference between two sprites
  const numberOfImagesForWalk = 9;

    animationInterval = setInterval(() => {
      spriteSheet.style.backgroundPosition = `-${position}px ${heightOfEachSprite*10}px`;
  
      if (position < widthOfSpriteSheet) {
        position = position + diff;
      } else {
        //increment the position by the width of each sprite each time
        position = widthOfEachSprite;
      }
      if(position == widthOfEachSprite*numberOfImagesForWalk){ //
        position = widthOfEachSprite;
      }
      //reset the position to show first sprite after the last one
    }, speed);

  }


//___________________________________________________________________
//Start animation
// startAnimation();
walking();