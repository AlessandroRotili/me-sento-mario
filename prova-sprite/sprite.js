
    var animationInterval;
    // var spriteSheet = document.getElementById("sprite-image");
    var widthOfSpriteSheet = 832; //sbagliati
    var widthOfEachSprite = 832 / 13;
    var heightOfEachSprite = 64; //px

    function stopAnimation() {
      clearInterval(animationInterval);
    }

    //List of movements
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
