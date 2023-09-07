const maze = createMaze(LEVEL_0);
let testNodesVar = createNodeChain(LEVEL_0);
let lives = 3;
let gameModeDuration = SCATTER_DURATION;

function main() {
  pacmanPos = resetSpritesToNodes(pacmanPos, testNodesVar, VELOCITY);

  let pmMoveDir = pacmanValidMove(
    pacmanPos,
    testNodesVar,
    chosenPmMoveDir,
    lastPmMove
  );
  lastPmMove = pmMoveDir;

  pacmanMovementAndAnimation(pmMoveDir);

  mainGhostMovementAndAnimation();

  checkIfPacmanEatsPallet(pacmanPos, palletsList);

  if (checkIfPacmanEatsPowerPallet(pacmanPos, palletsPowList)) {
    gameMode = "FRIGHT";

    clearTimeout(gameStartTimer);
    gameModeDuration = FRIGHT_DURATION;

    gameStartTimer = setTimeout(function GameOn() {
      gameMode = gameMode !== "SCATTER" ? "SCATTER" : "CHASE";
      gameModeDuration =
        gameMode === "SCATTER" ? SCATTER_DURATION : CHASE_DURATION;
        frightScore = 100;
      gameStartTimer = setTimeout(GameOn, gameModeDuration);
    }, gameModeDuration);
  }

  displayScore.innerHTML = `Score: ${score}`;
  if (checkIfPlayerWon(palletsList) === true) {
    endGameWhenWon();
  }

  eatenGhost = checkIfPacmanTouchesGhosts(
      pacmanPos,
      blinkyPos,
      pinkyPos,
      inkyPos,
      clydePos
    ) 
  if (eatenGhost !== 0) {
    if (gameMode === "FRIGHT") {
      pacmanEatsGhost();
    } else {
      ghostEatsPacman();
    }
  }
  displayLives.innerHTML = `Lives: ${lives}`;
  if (checkIfPlayerLost(lives) === true) {
    endGameWhenLost();
  }
}

addEventListener("keydown", (event) => {
  if (event.key === "d" || event.key === "ArrowRight") {
    chosenPmMoveDir = "RIGHT";
  } else if (event.key === "a" || event.key === "ArrowLeft") {
    chosenPmMoveDir = "LEFT";
  } else if (event.key === "w" || event.key === "ArrowUp") {
    chosenPmMoveDir = "UP";
  } else if (event.key === "s" || event.key === "ArrowDown") {
    chosenPmMoveDir = "DOWN";
  }
});

// ####### INTERVAL && TIMEOUT FUNKTION ########################
gameStartTimer = setTimeout(function GameOn() {
  gameModeDuration = gameMode === "SCATTER" ? SCATTER_DURATION : CHASE_DURATION;
  gameMode = gameMode === "SCATTER" ? "CHASE" : "SCATTER";
  gameStartTimer = setTimeout(GameOn, gameModeDuration);
}, gameModeDuration);

const mainId = setInterval(main, DT);
const borderId = setInterval(borderBlink, BORDER_BLINK_SPEED);
