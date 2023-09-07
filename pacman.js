let chosenPmMoveDir = "STILL";
let lastPmMove = "STILL";
let pacmanPos = [
  getStartPosition(LEVEL_0, "pacman").x,
  getStartPosition(LEVEL_0, "pacman").y,
];

let blinkyMoveDir = "STILL";
let lastBlinkyMove = "STILL";
let blinkyPos = [
  getStartPosition(LEVEL_0, "blinky").x,
  getStartPosition(LEVEL_0, "blinky").y,
];

let pinkyMoveDir = "STILL";
let lastPinkyMove = "STILL";
let pinkyPos = [
    getStartPosition(LEVEL_0, "pinky").x,
    getStartPosition(LEVEL_0, "pinky").y,
];

let inkyMoveDir = "STILL";
let lastInkyMove = "STILL";
let inkyPos = [
    getStartPosition(LEVEL_0, "inky").x,
    getStartPosition(LEVEL_0, "inky").y,
];

let clydeMoveDir = "STILL";
let lastClydeMove = "STILL";
let clydePos = [
    getStartPosition(LEVEL_0, "clyde").x,
    getStartPosition(LEVEL_0, "clyde").y,
];

function pacmanValidMove(pacmanPos, testNodesVar, chosenPmMoveDir, lastPmMove) {
  let nodeHit = false;
  let neighborGiven = false;
  for (let node of testNodesVar) {
    if (
      node.position[0] === pacmanPos[0] &&
      node.position[1] === pacmanPos[1]
    ) {
      nodeHit = true;
      if (node.neighbors[chosenPmMoveDir] !== null) {
        neighborGiven = true;
      }
    }
  }
  if (nodeHit === false) {
    return (chosenPmMoveDir === "RIGHT" && lastPmMove === "LEFT") ||
      (chosenPmMoveDir === "LEFT" && lastPmMove === "RIGHT") ||
      (chosenPmMoveDir === "UP" && lastPmMove === "DOWN") ||
      (chosenPmMoveDir === "DOWN" && lastPmMove === "UP")
      ? chosenPmMoveDir
      : lastPmMove;
  } else if (nodeHit === true) {
    return neighborGiven === false ? "STILL" : chosenPmMoveDir;
  }
}

function resetSpritesToNodes(spritePos, testNodesVar, VELOCITY) {
  let corrSpritePos = spritePos;
  for (let node of testNodesVar) {
    if (
      spritePos[1] === node.position[1] &&
      spritePos[0] < node.position[0] + VELOCITY &&
      spritePos[0] > node.position[0] - VELOCITY
    ) {
      corrSpritePos[0] = node.position[0];
    } else if (
      spritePos[0] === node.position[0] &&
      spritePos[1] < node.position[1] + VELOCITY &&
      spritePos[1] > node.position[1] - VELOCITY
    ) {
      corrSpritePos[1] = node.position[1];
    }
  }
  return corrSpritePos;
}

function pacmanMovementAndAnimation(pmMoveDir) {
  if (pmMoveDir === "RIGHT") {
    pacmanMovesRight();
    pacmanAnimation(pmRightAni);
  } else if (pmMoveDir === "LEFT") {
    pacmanMovesLeft();
    pacmanAnimation(pmLeftAni);
  } else if (pmMoveDir === "UP") {
    pacmanMovesUp();
    pacmanAnimation(pmUpAni);
  } else if (pmMoveDir === "DOWN") {
    pacmanMovesDown();
    pacmanAnimation(pmDownAni);
  } else {
    pacman.style.left = `${pacmanPos[0]}px`;
    pacman.style.top = `${pacmanPos[1]}px`;
    pacmanAnimation();
  }
}

function pacmanMovesRight() {
  pacmanPos[0] += VELOCITY;
  if (pacmanPos[0] === SCREEN_END) {
    pacmanPos[0] = SCREEN_START;
  }
  pacman.style.left = `${pacmanPos[0]}px`;
}
function pacmanMovesLeft() {
  pacmanPos[0] -= VELOCITY;
  if (pacmanPos[0] === SCREEN_START - SPRITE_SIZE) {
    pacmanPos[0] = SCREEN_END - SPRITE_SIZE;
  }
  pacman.style.left = `${pacmanPos[0]}px`;
}
function pacmanMovesUp() {
  pacmanPos[1] -= VELOCITY;
  if (pacmanPos[1] === SCREEN_START - SPRITE_SIZE) {
    pacmanPos[1] = SCREEN_END - SPRITE_SIZE;
  }
  pacman.style.top = `${pacmanPos[1]}px`;
}
function pacmanMovesDown() {
  pacmanPos[1] += VELOCITY;
  if (pacmanPos[1] === SCREEN_END) {
    pacmanPos[1] = SCREEN_START;
  }
  pacman.style.top = `${pacmanPos[1]}px`;
}

let frameForAnimation = 1;
function pacmanAnimation(arr) {
  const pacmanSprite = document.getElementById("pacman-sprite");
  frameForAnimation += 1;
  if (arr === undefined) {
    pacmanSprite.src = "./assets/images/pacman/pacman-0.png";
    frameForAnimation = 1;
  } else {
    frameForAnimation =
      frameForAnimation === pmAniSpeed * 4 + 1 ? 1 : frameForAnimation;
    if (frameForAnimation < pmAniSpeed + 1) {
      pacmanSprite.src = arr[0];
    } else if (
      frameForAnimation < pmAniSpeed * 2 + 1 ||
      frameForAnimation > pmAniSpeed * 3
    ) {
      pacmanSprite.src = arr[1];
    } else {
      pacmanSprite.src = arr[2];
    }
  }
}

function ghostRandomMove(lastGhostMove, ghostPos, testNodesVar) {
    let possibleMove = [];
    for (let node of testNodesVar) {
        if (ghostPos[0] === node.position[0] && ghostPos[1] === node.position[1]) {
            for (let neighb in node.neighbors) {
                if (node.neighbors[neighb] !== null) {
                    possibleMove.push(neighb);
                }
            }
            return (possibleMove[Math.floor(Math.random() * possibleMove.length)]);
        }
    } return lastGhostMove;
}
function ghostChaseMove(lastGhostMove, ghostPos, testNodesVar, pacmanPos) {
  for (let node of testNodesVar) {
      if (ghostPos[0] === node.position[0] && ghostPos[1] === node.position[1]) {
          return getDirection(node, pacmanPos);
      }
  } return lastGhostMove;
}
function ghostScatterMove(lastGhostMove, ghostPos, testNodesVar, ghostCorner) {
  for (let node of testNodesVar) {
      if (ghostPos[0] === node.position[0] && ghostPos[1] === node.position[1]) {
          return getDirection(node, ghostCorner);
      }
  } return lastGhostMove;
}


function ghostMovementAndAnimation(ghostSprite, ghostPos, ghostMoveDir, velocity, ghostImgArr) {
    let newGhostPos = ghostPos;
    if (ghostMoveDir === "RIGHT") {
        newGhostPos[0] = ghostPos[0] + velocity;
        ghostSprite.src = ghostImgArr[1];
      } else if (ghostMoveDir === "LEFT") {
        newGhostPos[0] = ghostPos[0] - velocity;
        ghostSprite.src = ghostImgArr[3];
      } else if (ghostMoveDir === "UP") {
        newGhostPos[1] = ghostPos[1] - velocity;
        ghostSprite.src = ghostImgArr[0];
      } else if (ghostMoveDir === "DOWN") {
        newGhostPos[1] = ghostPos[1] + velocity;
        ghostSprite.src = ghostImgArr[2];
      } 
      return newGhostPos;
}
let score = 0
function checkIfPacmanEatsPallet(pacmanPos, palletsList) {
    // for (let pallet of palletsList) {
    //     if (pallet["x"] === pacmanPos[0] && pallet["y"] === pacmanPos[1]){
    //         if (pallet["el"] !== null) {
    //             score += 10;
    //             const elementToRemove = pallet["el"];
    //             elementToRemove.remove();
    //             pallet["el"] = null;
    //         }
    //     }
    // }
    for (let pallet of palletsList) {
      if (pallet["x"] === pacmanPos[0] && pallet["y"] + (VELOCITY / 2) > pacmanPos[1] && pallet["y"] - (VELOCITY / 2) < pacmanPos[1]){
          if (pallet["el"] !== null) {
              score += 10;
              const elementToRemove = pallet["el"];
              elementToRemove.remove();
              pallet["el"] = null;
          }
      } else if (pallet["y"] === pacmanPos[1] && pallet["x"] + (VELOCITY / 2) > pacmanPos[0] && pallet["x"] - (VELOCITY / 2) < pacmanPos[0]){
          if (pallet["el"] !== null) {
            score += 10;
            const elementToRemove = pallet["el"];
            elementToRemove.remove();
            pallet["el"] = null;
          }
      }
  }
};

function checkIfPacmanEatsPowerPallet(pacmanPos, powerPalletsList) {
  for (let pallet of powerPalletsList) {
      if (pallet["x"] === pacmanPos[0] && pallet["y"] === pacmanPos[1]){
          if (pallet["el"] !== null) {
              score += 50;
              const elementToRemove = pallet["el"];
              elementToRemove.remove();
              pallet["el"] = null;
              return true;
          }
      }
  }
};

function checkIfPacmanTouchesGhosts(pacmanPos, blinkyPos, pinkyPos, inkyPos, clydePos) {
    let ghostsPos = [blinkyPos, pinkyPos, inkyPos, clydePos];
    for (let ghost of ghostsPos) {
        if (ghost[0] === pacmanPos[0] && ghost[1] < pacmanPos[1] + RASTER_SIZE && ghost[1] > pacmanPos[1] - RASTER_SIZE) {
            return ghost;
        } else if (ghost[1] === pacmanPos[1] && ghost[0] < pacmanPos[0] + RASTER_SIZE && ghost[0] > pacmanPos[0] - RASTER_SIZE) {
            return ghost;
        } 
    }
    return 0;
}

function ghostEatsPacman() {
  lives -= 1;
  lastPmMove = "STILL";
  pmMoveDir = "STILL";
  pacmanPos = [
    getStartPosition(LEVEL_0, "pacman").x,
    getStartPosition(LEVEL_0, "pacman").y,
  ];
};
function pacmanEatsGhost() {
  let scoreToAdd = frightScore * 2;
  frightScore = scoreToAdd;
  score += scoreToAdd;
  if (blinkyPos === eatenGhost) {
  blinkyPos = [
  getStartPosition(LEVEL_0, "blinky").x,
  getStartPosition(LEVEL_0, "blinky").y,
  ];
} else if (pinkyPos === eatenGhost) {
  pinkyPos = [
  getStartPosition(LEVEL_0, "pinky").x,
  getStartPosition(LEVEL_0, "pinky").y,
  ];
} else if (inkyPos === eatenGhost) {
  inkyPos = [
  getStartPosition(LEVEL_0, "inky").x,
  getStartPosition(LEVEL_0, "inky").y,
  ];
} else if (clydePos === eatenGhost) {
  clydePos = [
  getStartPosition(LEVEL_0, "clyde").x,
  getStartPosition(LEVEL_0, "clyde").y,
  ];
}
}

function mainGhostMovementAndAnimation() {
  blinkyPos = resetSpritesToNodes(blinkyPos, testNodesVar, GHOST_VELOCITY);
  pinkyPos = resetSpritesToNodes(pinkyPos, testNodesVar, GHOST_VELOCITY);
  inkyPos = resetSpritesToNodes(inkyPos, testNodesVar, GHOST_VELOCITY);
  clydePos = resetSpritesToNodes(clydePos, testNodesVar, GHOST_VELOCITY);
  
  if (gameMode === "SCATTER") {
    blinkyMoveDir = ghostScatterMove(lastBlinkyMove, blinkyPos, testNodesVar, BLINKY_CORNER);
    pinkyMoveDir = ghostScatterMove(lastPinkyMove, pinkyPos, testNodesVar, PINKY_CORNER);
    inkyMoveDir = ghostScatterMove(lastInkyMove, inkyPos, testNodesVar, INKY_CORNER);
    clydeMoveDir = ghostScatterMove(lastClydeMove, clydePos, testNodesVar, CLYDE_CORNER);
  } else if (gameMode === "CHASE") {
    blinkyMoveDir = ghostChaseMove(lastBlinkyMove, blinkyPos, testNodesVar, pacmanPos);
    pinkyMoveDir = ghostChaseMove(lastPinkyMove, pinkyPos, testNodesVar, pacmanPos);
    inkyMoveDir = ghostChaseMove(lastInkyMove, inkyPos, testNodesVar, pacmanPos);
    clydeMoveDir = ghostChaseMove(lastClydeMove, clydePos, testNodesVar, pacmanPos);
  } else if (gameMode === "FRIGHT") {
    blinkyMoveDir = ghostRandomMove(lastBlinkyMove, blinkyPos, testNodesVar);
    pinkyMoveDir = ghostRandomMove(lastPinkyMove, pinkyPos, testNodesVar);
    inkyMoveDir = ghostRandomMove(lastInkyMove, inkyPos, testNodesVar);
    clydeMoveDir = ghostRandomMove(lastClydeMove, clydePos, testNodesVar);
  }

    blinkyPos = ghostMovementAndAnimation(blinkySprite, blinkyPos, blinkyMoveDir, GHOST_VELOCITY, blinkyAni);
    blinky.style.left = `${blinkyPos[0]}px`;
    blinky.style.top = `${blinkyPos[1]}px`;
    lastBlinkyMove = blinkyMoveDir;

    pinkyPos = ghostMovementAndAnimation(pinkySprite, pinkyPos, pinkyMoveDir, GHOST_VELOCITY, pinkyAni);
    pinky.style.left = `${pinkyPos[0]}px`;
    pinky.style.top = `${pinkyPos[1]}px`;
    lastPinkyMove = pinkyMoveDir;

    inkyPos = ghostMovementAndAnimation(inkySprite, inkyPos, inkyMoveDir, GHOST_VELOCITY, inkyAni);
    inky.style.left = `${inkyPos[0]}px`;
    inky.style.top = `${inkyPos[1]}px`;
    lastInkyMove = inkyMoveDir;

    clydePos = ghostMovementAndAnimation(clydeSprite, clydePos, clydeMoveDir, GHOST_VELOCITY, clydeAni);
    clyde.style.left = `${clydePos[0]}px`;
    clyde.style.top = `${clydePos[1]}px`;
    lastClydeMove = clydeMoveDir;

    if (gameMode === "FRIGHT") {
      blinkySprite.src = "./assets/images/ghosts/ghost-fright.png";
      pinkySprite.src = "./assets/images/ghosts/ghost-fright.png";
      inkySprite.src = "./assets/images/ghosts/ghost-fright.png";
      clydeSprite.src = "./assets/images/ghosts/ghost-fright.png";
    }
};

function checkIfPlayerWon(palletsList) {
    for (let pallet of palletsList) {
        if (pallet["el"] !== null) {
            return false;
        }
    } return true;
};

function endGameWhenWon() {
  clearInterval(mainId);
  clearInterval(borderId);
  winningScreen();
  setInterval(borderBlink, BORDER_BLINK_WINNING);
}

function winningScreen() {
    MAZE_EL.insertAdjacentHTML("beforeend", `<img src="./assets/images/Win.png" class="endscreen">`);
};

function checkIfPlayerLost(lives) {
    if (lives < 1) { 
        return true;
    }
}
function endGameWhenLost() {
  // pacmanSprite = "./assets/images/pacman/pacmanGS.png";
  borderEl.style["box-shadow"] = "rgb(32, 32, 32) 10px 10px 30px";
  clearInterval(mainId);
  clearInterval(borderId);
  losingScreen();
  setInterval(mainGhostMovementAndAnimation, DT);
}

function losingScreen() {
    MAZE_EL.insertAdjacentHTML("beforeend", `<img src="./assets/images/Lose.png" class="endscreen">`);
}

function borderBlink() {
    let borderEl = document.querySelector("#maze");
    borderEl.style.border = borderEl.style.border === "20px solid rgb(197, 240, 7)" ? "20px solid rgb(32, 32, 32)" : "20px solid rgb(197, 240, 7)";
    borderEl.style["box-shadow"] = borderEl.style["box-shadow"] === "rgb(197, 240, 7) 10px 10px 30px" ? "rgb(32, 32, 32) 10px 10px 30px" : "rgb(197, 240, 7) 10px 10px 30px";
};
