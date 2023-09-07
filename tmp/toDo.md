MODES = {}

## MODE.CHASE:

Ghost tries to chace down Pacman
(Optional: every Ghost has Chase behavior)
BLINKY - Pacman coordinates
PINKY - (optional) 4 tiles agead of pacman
INKY - (optional)
CLYDE - chace pacman until 8 tiles closeto pacman, then run

## MODE.SCATTER:

Ghost move into a diferent corner of game area
Each ghost has its own corner

BLINKY_CORNER = [] //top-right
PINKY_CORNER = [] //top-left
INKY_CORNER = [] //bottom-right
CLYDE_CORNER = [] //bottom-left

## MODE.FRIGHT

- 7 seconds
- ghost change apperance
- movement random
- ghost eating adds 200^n points

RESPAWN

- last 5 sec
- then ghost released

## GAME - MAIN

SCATTER MODE
last 7 sec -
CHASE MODE
last 20 sec -

FRIGHT MODE
last 7 sec
{
CHASE MODE
last 20 sec -
SCATTER MODE
last 7 sec -
}

## POWER PALLETE

- adds 50 points
- pallete removed from list
- start RUN mode

## OPTIONAL leaderboard !!!
