class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.position = [x, y];
    this.pacmanSmell = 0;
    this.neighbors = {
      UP: null,
      DOWN: null,
      LEFT: null,
      RIGHT: null,
    };
  }
  get getX() {
    return this.x;
  }
  get getY() {
    return this.y;
  }
  get leftNode() {
    return this.neighbors.LEFT;
  }
  get rightNode() {
    return this.neighbors.RIGHT;
  }
  get upNode() {
    return this.neighbors.UP;
  }
  get downNode() {
    return this.neighbors.DOWN;
  }
  get allPossibleNeigbourNodes() {
    let nodesList = [];
    for (const node of Object.values(this.neighbors)) {
      if (node !== null) nodesList.push(node);
    }
    if (nodesList === []) return null;
    return nodesList;
  }
  get allPossibleMoves() {
    let movesList = [];
    for (const [direction, node] of Object.entries(this.neighbors)) {
      if (node !== null) movesList.push(direction);
    }
    if (movesList === []) return null;
    return movesList;
  }
  get randomMove() {
    let movesList = this.allPossibleMoves;
    let rMove = movesList[Math.floor(Math.random() * movesList.length)];
    return rMove;
  }
  get randomNode() {
    let nodeList = this.allPossibleNeigbourNodes;
    let rNode = nodeList[Math.floor(Math.random() * nodeList.length)];
    return rNode;
  }

  set right(newRight) {
    this.neighbors.RIGHT = newRight;
  }
  set left(newLeft) {
    this.neighbors.LEFT = newLeft;
  }
  set up(newUp) {
    this.neighbors.UP = newUp;
  }
  set down(newDown) {
    this.neighbors.DOWN = newDown;
  }
  decreaseSmell(i = 1) {
    this.pacmanSmell -= i;
    if (this.pacmanSmell < 0) this.pacmanSmell = 0;
    return this.pacmanSmell;
  }
  freshSmell(top = 10) {
    this.pacmanSmell = top;
    return this.pacmanSmell;
  }
  getSmellTrace() {
    let strongestSmell = 0;
    let smellDirection = null;
    for (const [direction, node] of Object.entries(this.neighbors)) {
      if (node !== null && node.pacmanSmell > strongestSmell) {
        smellDirection = direction;
        strongestSmell = node.pacmanSmell;
      }
    }
    return smellDirection;
  }
}
//############## MAZE-STRING FUNCTIONS ##############################
const mazeTest = {
  sizeX: 8,
  sizeY: 8,
  pattern:
    "########" +
    "#X..X###" +
    "#.##.###" +
    "#X..X.X#" +
    "#.####.#" +
    "#.####.#" +
    "#X....X#" +
    "########",
};

function convertMazeTo2D(level) {
  let newMaze = [];
  let row = [];
  for (let i = 0; i < level.pattern.length; i++) {
    row.push(level.pattern[i]);
    if (row.length === level.sizeX) {
      newMaze.push(row);
      row = [];
    }
  }
  return newMaze;
}

function transposeMaze(level) {
  let maze = convertMazeTo2D(level);
  let tMaze = [];

  for (let i = 0; i < level.sizeX; i++) {
    let row = Array(level.sizeY).fill(" . ");
    tMaze.push(row);
  }

  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      tMaze[x][y] = maze[y][x];
    }
  }
  // console.log(tMaze.map((e) => e.join("")).join("\n"));
  tMaze = tMaze.map((e) => e.join("")).join("");
  return {
    sizeX: level.sizeY,
    sizeY: level.sizeX,
    pattern: tMaze,
  };
}
//############### NODE POSITIONING FUNCTIONS #########################
function constructKey(x, y, dx = RASTER_SIZE, dy = RASTER_SIZE) {
  return { x: x * dx, y: y * dy };
}

function getStartPosition(maze, name) {
  switch (name.toLowerCase()) {
    case "pacman":
      return getStartKey(maze, "@");
    case "blinky":
      return getStartKey(maze, "B");
    case "pinky":
      return getStartKey(maze, "P");
    case "inky":
      return getStartKey(maze, "I");
    case "clyde":
      return getStartKey(maze, "C");
  }
  return null;
}

function getStartKey(level, character) {
  let count = 0;
  for (let y = 0; y < level.sizeY; y++) {
    for (let x = 0; x < level.sizeX; x++) {
      let key = null;
      if (level.pattern[count] === character) {
        key = constructKey(x, y);
        return key;
      }
      count += 1;
    }
  }
  return null;
}

//############### NODE CREATION FUNCTIONS #############################
function createNodeTable(level) {
  let nodeList = [];
  let count = 0;
  for (let y = 0; y < level.sizeY; y++) {
    for (let x = 0; x < level.sizeX; x++) {
      if (nodeSymbols.includes(level.pattern[count])) {
        let coord = constructKey(x, y);
        let newNode = new Node(coord.x, coord.y);
        nodeList.push(newNode);
      }
      count += 1;
    }
  }
  return nodeList;
}

function getNodeByCoord(x, y, nodeList) {
  for (const node of nodeList) {
    if (node.getX === x && node.getY === y) return node;
  }
  return null;
}

function connectHorizontally(level, nodeList) {
  let count = 0;
  for (let y = 0; y < level.sizeY; y++) {
    let key = null;
    for (let x = 0; x < level.sizeX; x++) {
      if (nodeSymbols.includes(level.pattern[count])) {
        if (key === null) {
          key = constructKey(x, y);
        } else {
          let otherkey = constructKey(x, y);
          let firstNode = getNodeByCoord(key.x, key.y, nodeList);
          let secondNode = getNodeByCoord(otherkey.x, otherkey.y, nodeList);
          firstNode.right = secondNode;
          secondNode.left = firstNode;
          key = otherkey;
        }
      } else if (wallSymbols.includes(level.pattern[count])) {
        key = null;
      }
      count += 1;
    }
  }
  return;
}

function connectVertically(level, nodeList) {
  let tMaze = transposeMaze(level);

  let count = 0;
  for (let y = 0; y < tMaze.sizeY; y++) {
    let key = null;
    for (let x = 0; x < tMaze.sizeX; x++) {
      if (nodeSymbols.includes(tMaze.pattern[count])) {
        if (key === null) {
          key = constructKey(y, x);
        } else {
          otherkey = constructKey(y, x);
          let firstNode = getNodeByCoord(key.x, key.y, nodeList);
          let secondNode = getNodeByCoord(otherkey.x, otherkey.y, nodeList);
          firstNode.down = secondNode;

          secondNode.up = firstNode;
          key = otherkey;
        }
      } else if (wallSymbols.includes(tMaze.pattern[count])) {
        key = null;
      }
      count += 1;
    }
  }
}

function alterGhostNodes(maze, nodeList, name) {
  let ghostPos = getStartPosition(maze, name);
  let ghostNode = getNodeByCoord(ghostPos.x, ghostPos.y, nodeList);
  ghostNode.left = null;
  ghostNode.right = null;
  ghostNode.down = null;
  ghostNode.upNode.down = null;
}

/**
 * @deprecated
 */
function removeRedundantConnections(level, nodeList) {
  let maze = convertMazeTo2D(level);

  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      if (nodeSymbols.includes(maze[y][x])) {
        let key = constructKey(x, y);
        let tempNode = getNodeByCoord(key.x, key.y, nodeList);

        if (!pathSymbols.includes(maze[y][x + 1])) {
          tempNode.right = null;
        }
        if (!pathSymbols.includes(maze[y][x - 1])) {
          tempNode.left = null;
        }
        if (!pathSymbols.includes(maze[y + 1][x])) {
          tempNode.down = null;
        }
        if (!pathSymbols.includes(maze[y - 1][x])) {
          tempNode.up = null;
        }
      }
    }
  }
}
//################ GET PATH FUNCTIONS ############################
function getDirection(node, [x, y]) {
  let left = node.getX - x > 0;
  let right = node.getX - x <= 0;
  let top = node.getY - y > 0;
  let bottom = node.getY - y < 0;

  let countCall = 0;
  while (countCall < 20) {
    let move = node.randomMove.toString();
    if (left && move === "LEFT") return "LEFT";
    else if (right && move === "RIGHT") return "RIGHT";
    else if (top && move === "UP") return "UP";
    else if (bottom && move === "DOWN") return "DOWN";
    countCall += 1;
  }

  return node.randomMove;
}

function setSmellTrace(node, nodeList) {
  node.freshSmell();
  for (const n of nodeList) {
    n.decreaseSmell();
  }
}
//#################### PRINT NODES FUNCTIONS ###########################

function consolePrintNodes(level, nodeList) {
  // console.log(level.sizeX, level.sizeY);
  let nodeArray = [];
  for (let i = 0; i < level.sizeY; i++) {
    let row = Array(level.sizeX).fill("   ");
    nodeArray.push(row);
  }
  // console.log(nodeArray);
  let maze = convertMazeTo2D(level);
  // console.log(maze.map((e) => e.join(" ")).join(" N\n"));

  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      if (nodeSymbols.includes(maze[y][x])) {
        nodeArray[y][x] = " X ";
        let key = constructKey(x, y);
        let tempNode = getNodeByCoord(key.x, key.y, nodeList);

        if (
          tempNode.nodeRight !== null &&
          pathSymbols.includes(maze[y][x + 1])
        ) {
          nodeArray[y][x + 1] = "-  ";
        }
        if (
          tempNode.nodeLeft !== null &&
          pathSymbols.includes(maze[y][x - 1])
        ) {
          nodeArray[y][x - 1] = "  -";
        }
        if (tempNode.nodeUp !== null && pathSymbols.includes(maze[y - 1][x])) {
          nodeArray[y - 1][x] = " | ";
        }
        if (
          tempNode.nodeDown !== null &&
          pathSymbols.includes(maze[y + 1][x])
        ) {
          nodeArray[y + 1][x] = " | ";
        }
      }
    }
  }

  console.log(nodeArray.map((e) => e.join("")).join("\n"));
}

function renderNodes(nodesList) {
  for (const node of nodesList) {
    createTableEl(node.position[0], node.position[1], PALLET_POW_SOURCE);
  }
}

//######################## TEST FUNCTIONS ##############################
function testNodes() {
  let nodeA = new Node(80, 80);
  let nodeB = new Node(160, 80);
  let nodeC = new Node(80, 160);
  let nodeD = new Node(160, 160);
  let nodeE = new Node(200, 160);
  let nodeF = new Node(80, 320);
  let nodeG = new Node(200, 320);
  nodeA.neighbors["RIGHT"] = nodeB;
  nodeA.neighbors["DOWN"] = nodeC;
  nodeB.neighbors["LEFT"] = nodeA;
  nodeB.neighbors["DOWN"] = nodeD;
  nodeC.neighbors["UP"] = nodeA;
  nodeC.neighbors["RIGHT"] = nodeD;
  nodeC.neighbors["DOWN"] = nodeF;
  nodeD.neighbors["UP"] = nodeB;
  nodeD.neighbors["LEFT"] = nodeC;
  nodeD.neighbors["RIGHT"] = nodeE;
  nodeE.neighbors["LEFT"] = nodeD;
  nodeE.neighbors["DOWN"] = nodeG;
  nodeF.neighbors["UP"] = nodeC;
  nodeF.neighbors["RIGHT"] = nodeG;
  nodeG.neighbors["UP"] = nodeE;
  nodeG.neighbors["LEFT"] = nodeF;
  return [nodeA, nodeB, nodeC, nodeD, nodeE, nodeF, nodeG];
}
function getRandomNode(nodeList) {
  let node = nodeList[Math.floor(Math.random() * nodeList.length)];
  return node;
}

//################## MAIN CREATE NODE CHAIN FUNCTION #########################
function createNodeChain(level) {
  let nodes = createNodeTable(level);
  connectHorizontally(level, nodes);
  connectVertically(level, nodes);
  ghostNames.map((name) => alterGhostNodes(level, nodes, name));
  return nodes;
}

//####################### TEST ########################################
// let testNodesList = testNodes();
// let testNode = getRandomNode(testNodesList);
// setSmellTrace(testNode, testNodesList);
// testNode = getRandomNode(testNodesList);
// setSmellTrace(testNode, testNodesList);
// testNode = getRandomNode(testNodesList);
// setSmellTrace(testNode, testNodesList);
// testNode = getRandomNode(testNodesList);
// setSmellTrace(testNode, testNodesList);
// testNode = getRandomNode(testNodesList);
// console.log(testNode.getSmellTrace());
