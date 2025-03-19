let sequence = [1, 2];
let currentIndex = 0;
let gamePaused = false; // Flag to track if the game is paused

function revealNumber(num) {
  if (gamePaused) return; // Don't allow clicks when the game is paused

  const gbox = document.getElementById(`box${num}`);
  gbox.classList.remove("hidden");

  if (num === sequence[currentIndex]) {
    currentIndex++;
    if (currentIndex === sequence.length) {
      addNewDiv();
    }
  } else {
    resetBoxes(false); // Hide all boxes if the user clicks in the wrong order
  }
}

/* function revealAllNumbers() {
  if (gamePaused) return; // Prevent revealing numbers if the game is paused

  const boxes = document.querySelectorAll('.gbox');
  gamePaused = true; // Pause the game

  boxes.forEach(gbox => gbox.classList.remove('hidden'));

  const timeoutDuration = boxes.length * 1000; // 1 second per box

  setTimeout(() => {
    boxes.forEach(gbox => gbox.classList.add('hidden'));
    gamePaused = false; // Resume the game after the numbers are hidden
  }, timeoutDuration); // Timeout depends on the number of boxes
}

  function hideAllNumbers() {
    const boxes = document.querySelectorAll('.gbox');
    boxes.forEach(gbox => gbox.classList.add('hidden')); // Adds the 'hidden' class back to hide all numbers
  } */


function resetBoxes(shouldShuffle) {
  const gamecontainer = document.getElementById("gamecontainer");
  const boxes = Array.from(gamecontainer.children);

  boxes.forEach(gbox => gbox.classList.add("hidden"));

  if (shouldShuffle) {
    shuffle(boxes);
    boxes.forEach(gbox => gamecontainer.appendChild(gbox));
  }

  currentIndex = 0;
}

function addNewDiv() {
  const gamecontainer = document.getElementById("gamecontainer");
  const newDiv = document.createElement("div");
  newDiv.className = "gbox hidden";
  const randomNum = sequence.length + 1; // Generate the next number
  newDiv.textContent = randomNum;
  newDiv.id = `box${randomNum}`;
  newDiv.onclick = () => revealNumber(randomNum);
  gamecontainer.appendChild(newDiv);

  sequence.push(randomNum);
  resetBoxes(true); // Shuffle only when a new div is added
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
