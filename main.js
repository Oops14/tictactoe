let square = Array(9).fill("");
const row = document.querySelector(".row");
const div = document.createElement("div");
div.className = "col-4 r_item";

const boardX = [];
const boardY = [];

let addToBoardX = true;

function cleanUp() {
  const elements = document.querySelectorAll(".col-4");

  elements.forEach(element => {
    // element.innerHTML = ""; // or use element.textContent = '';
    element.style.pointerEvents = "none";
  });
}

function startGame() {
  const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [6, 4, 2],
  ];

  let countX = 0;
  let countY = 0;

  for (let i = 0; i < square.length; i++) {
    const newDiv = div.cloneNode(true);
    newDiv.innerHTML = ``;
    newDiv.setAttribute("data-index", i);

    function addValue(value) {
      if (addToBoardX) {
        boardX.push(value);
        newDiv.innerHTML = "X";

        // remove event listener from the marked square.
        newDiv.style.pointerEvents = "none";
      } else {
        boardY.push(value);
        newDiv.innerHTML = "0";

        // remove event listener from the marked square.
        newDiv.style.pointerEvents = "none";
      }

      addToBoardX = !addToBoardX; // Toggle the flag
    }

    newDiv.addEventListener("click", function () {
      const index = parseInt(newDiv.getAttribute("data-index"), 10);

      // Add value from meta attributes to the boards variables.
      if (!boardX.includes(index)) {
        addValue(index);
        console.log(`Index ${index} added to boardX:`, boardX);
        console.log(`Index ${index} added to boardY:`, boardY);
      }

      for (let j = 0; j < winPatterns.length; j++) {
        console.log(winPatterns[j]);

        // When consecutive incresing to 3 at once means
        // that the first ascent with the winPatterns is defined.
        let consecutiveMatchesX = 0;
        let consecutiveMatchesY = 0;

        for (let l = 0; l < winPatterns[j].length; l++) {
          for (let k = 0; k < boardX.length; k++) {
            if (winPatterns[j][l] === boardX[k]) {
              consecutiveMatchesX++;

              if (consecutiveMatchesX === 3) {
                countX++;
              }

              break; // Exit the loop once a match is found
            }
          }

          for (let m = 0; m < boardY.length; m++) {
            if (winPatterns[j][l] === boardY[m]) {
              consecutiveMatchesY++;

              if (consecutiveMatchesY === 3) {
                countY++;
              }

              break; // Exit the loop once a match is found
            }
          }
        }
      }

      let gameOver = false;

      // Checking who won.
      if (countX > countY) {
        console.log(
          "==================== X has more matches ===================="
        );
        gameOver = true;
        cleanUp();
      } else if (countY > countX) {
        console.log(
          "==================== 0 has more matches ===================="
        );
        gameOver = true;
      } else {
        console.log("Draw");
      }

      // Example of checking the gameOver flag before proceeding with further game logic
      if (gameOver) {
        console.log("Game Over. No further moves allowed.");
        // Add any additional logic to stop the game here, such as disabling input or ending the game loop
      }
    });

    row.appendChild(newDiv);
  }
}

startGame();

function handleReset() {
  document.querySelector("#reset").addEventListener("click", function () {
    cleanUp();
    startGame();
  });
}

// handleReset();
