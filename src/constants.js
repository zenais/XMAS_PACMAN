const RASTER_SIZE = 20;
const GAMEBOARD_WD = 800;
const GAMEBOARD_HG = 800;
const ENTITY_EL = document.getElementById("game");
const MAZE_EL = document.getElementById("maze");
const WALL_SOURCE = "./assets/images/wall.png";
const PALLET_SOURCE = "./assets/images/pellet/pellet.png";
const PALLET_POW_SOURCE = "../assets/images/pellet/power-pellet.png";
const BORDER_BLINK_SPEED = 1000;
const BORDER_BLINK_WINNING = 200;

const BLINKY_CORNER = [800, 0];
const PINKY_CORNER = [0, 0];
const INKY_CORNER = [800, 800];
const CLYDE_CORNER = [0, 800];

const pmRightAni = [
  "./assets/images/pacman/pacman-0.png",
  "./assets/images/pacman/pacman-right/pacman-right-1.png",
  "./assets/images/pacman/pacman-right/pacman-right-2.png",
];
const pmLeftAni = [
  "./assets/images/pacman/pacman-0.png",
  "./assets/images/pacman/pacman-left/pacman-left-1.png",
  "./assets/images/pacman/pacman-left/pacman-left-2.png",
];
const pmUpAni = [
  "./assets/images/pacman/pacman-0.png",
  "./assets/images/pacman/pacman-up/pacman-up-1.png",
  "./assets/images/pacman/pacman-up/pacman-up-2.png",
];
const pmDownAni = [
  "./assets/images/pacman/pacman-0.png",
  "./assets/images/pacman/pacman-down/pacman-down-1.png",
  "./assets/images/pacman/pacman-down/pacman-down-2.png",
];
const blinkyAni = [
  "./assets/images/ghosts/ghost-blinky-up.png",
  "./assets/images/ghosts/ghost-blinky-right.png",
  "./assets/images/ghosts/ghost-blinky-down.png",
  "./assets/images/ghosts/ghost-blinky-left.png",
];
const pinkyAni = [
  "./assets/images/ghosts/ghost-pinky-up.png",
  "./assets/images/ghosts/ghost-pinky-right.png",
  "./assets/images/ghosts/ghost-pinky-down.png",
  "./assets/images/ghosts/ghost-pinky-left.png",
];
const inkyAni = [
  "./assets/images/ghosts/ghost-inky-up.png",
  "./assets/images/ghosts/ghost-inky-right.png",
  "./assets/images/ghosts/ghost-inky-down.png",
  "./assets/images/ghosts/ghost-inky-left.png",
];
const clydeAni = [
  "./assets/images/ghosts/ghost-clyde-up.png",
  "./assets/images/ghosts/ghost-clyde-right.png",
  "./assets/images/ghosts/ghost-clyde-down.png",
  "./assets/images/ghosts/ghost-clyde-left.png",
];
const pmAniSpeed = 15;
const nodeSymbols = ["X", "+", "x", "@", "B", "P", "I", "C", "1"];
const wallSymbols = ["#"];
const pathSymbols = [".", "="];
const palletSymbols = [".", "+"];
const palletsList = [];
const palletsPowList = [];
const ghostNames = ["blinky", "pinky", "inky", "clyde"];
const SPRITE_SIZE = 20;
const SCREEN_END = 800;
const SCREEN_START = 0;
const VELOCITY = 4;
const GHOST_VELOCITY = 2.5;
const FPS = 60;
const DT = 1000 / FPS;
const FRIGHT_DURATION = 7000;
const SCATTER_DURATION = 7000;
const CHASE_DURATION = 20000;

const displayScore = document.querySelector("#score");
const displayLives = document.querySelector("#lives");
const pacman = document.querySelector("#pacman");
const blinkySprite = document.querySelector("#blinky-sprite");
const pinkySprite = document.querySelector("#pinky-sprite");
const inkySprite = document.querySelector("#inky-sprite");
const clydeSprite = document.querySelector("#clyde-sprite");
var gameMode = "SCATTER";
let borderEl = document.querySelector("#maze");
let eatenGhost;
let frightScore = 100;

const LEVEL_PATTERN = {
  sizeX: 20,
  sizeY: 10,
  pattern:
    "####################" +
    "#X................X#" +
    "#.################.#" +
    "#.################.#" +
    ".X................X." +
    "#.################.#" +
    "#.################.#" +
    "#X................X#" +
    "#X................X#" +
    "####################",
};

const LEVEL_0 = {
  sizeX: 28,
  sizeY: 36,
  pattern:
    "############################" +
    "############################" +
    "############################" +
    "############################" +
    "#X....+.....+##+.....+....X#" +
    "#.####.#####.##.#####.####.#" +
    "#.####.#####.##.#####.####.#" +
    "#.####.#####.##.#####.####.#" +
    "#+....+..+..+..+..+..+....+#" +
    "#.####.##.########.##.####.#" +
    "#.####.##.########.##.####.#" +
    "#+....+##+..+##+..+##+....+#" +
    "######.#####.##.#####.######" +
    "######.#####.##.#####.######" +
    "######.##+..++++..+##.######" +
    "######.##.###==###.##.######" +
    "######.##.## BP ##.##.######" +
    "1.....+..+## == ##+..+.....1" +
    "######.##.## IC ##.##.######" +
    "######.##.########.##.######" +
    "######.##+....@...+##.######" +
    "######.##.########.##.######" +
    "######.##.########.##.######" +
    "#+....+..+..+##+..+..+....+#" +
    "#.####.#####.##.#####.####.#" +
    "#.####.#####.##.#####.####.#" +
    "#+.+##+..+..+..+..+..+##+.+#" +
    "###.##.##.########.##.##.###" +
    "###.##.##.########.##.##.###" +
    "#+.+..+##+..+##+..+##+..+.+#" +
    "#.##########.##.##########.#" +
    "#.##########.##.##########.#" +
    "#X..........+..+..........X#" +
    "############################" +
    "############################" +
    "############################",
};
