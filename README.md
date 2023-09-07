# Pacman
We're gonna implement our version of the classic 1980's arcade game: __Pac-Man__!
This game will not be completely historically accurate to the classic game.
But you can make it accurate if you want to!

## Tasks
You can find __image assets__ in the provided `./assets/` folder.  
You can use any images you want, but feel free to create your own sprites!

### Game Loop
We will need to setup our main game loop, which will run most
of our game logic every frame, including:
- __Pacman__ movement
- __ghosts__ AI and movement
- __pellet__ and __power pellet__ collection
- rendering our game elements

We will implement these features in the upcoming tasks.  
For now, create an `update` function which is run approximately
__60 times per second__. You can use `setInterval` for this.
- Create an `update` function which runs at 60 FPS.
- Write a `console.log` in the `update` function to verify
  that it is being run every frame.

### Controllable Pacman
Let's create a __Pacman__ HTML element, which moves on its
own and can be controlled using the arrow keys!  
- Create an HTML element with a Pacman image and insert it into the DOM.  
  You can use the already existing Pacman HTML element in the starter code.  
  You'll find example images in the provided `./assets/` directory.
- Pacman is always moving into one direction.  
  We can use __absolute positioning__ with CSS to freely move our element around.
- When the player presses an arrow key, Pacman moves into this new direction.
- When Pacman moves off-screen, they should loop back and appear
  at the other side of the screen.

### Animate Pacman
Pacman should be animated. It's mouth should open and close.  
You can use the provided Pacman sprites in the `./assets/images/pacman/` directory.
- Animate Pacman by changing its image in regular intervals, frame-by-frame.

### Walls
We'll need some solid walls, which Pacman (and later on Ghosts)
cannot move through. These walls will be used to create our level later on.
- Create some wall HTML elements and place them somewhere in our game.  
  You can use the provided `./assets/images/wall.png` image.
  <small>It's just a black square. You could probably be more creative than me.</small>
- Check when __Pacman__ is in collision with any wall.  
  You can use an [AABB] collision detection implementation for this.
- When __Pacman__ is moving, it cannot move through the walls.

### Pellets
Pellets are the tiny yellow dots scattered throught a typical Pacman level.  
__Pacman__ collects, or __eats__ these dots to gain __score__ points.
- Create some HTML elements for our pellets.  
  You can use the provided `./assets/images/pellet/pellet.png` image.
- Check for collision between Pacman and our pellets.
- When Pacman is touching any pellet, they __eat__ it, which does the following:
    - Removes the pellet from the game.
    - Increments our __score__ (traditionally by `10` points).

### Ghosts
In Pacman, there are __four Ghosts__:
- __Blinky__, the red one, simply follows Pacman around.
- __Pinky__, the pink one, is always 4 steps ahead of Pacman.
- __Inky__, the blue or cyan one, moves relative to Pacman's and Blinky's positions.
- __Clyde__, the orange one, moves like Pinky, but gets scared and runs away when he gets too close to Pacman.

Let's start by creating four Ghosts, which all follow Pacman.
If they catch Pacman, it's __game over__!
- Create four Ghost elements, which can also move around.
- They cannot move through our solid walls.
- They all try to move towards Pacman's position.

### Optional: Traditional Ghost AI
If you're feeling up to it, you can try to implement the
traditional Pacman Ghost AI by following this optional task.  
Otherwise it's fine if the Ghosts simply try to follow Pacman,
or you can try to invent your own Ghost movement AI!

<details>
<summary>Traditional Ghost AI description</summary>

#### Ghost Modes
The Ghosts can be in one of __two modes__:
- __Chase__ mode,
  the default mode where the Ghost tries to chase down Pacman,
  using it's personal chase behavior, as described below.
- __Scatter__ mode,
  in this mode each Ghost will try to move into a different corner of the game area,
  to spread out across the level. Each Ghost has its own dedicated corner,
  which are mentioned below.

The game will continuously switch between __Scatter__ and __Chase__ mode.
So all Ghosts will either be chasing, or scattering together at the same time.  
The game starts in __Scatter__ mode, and after `7` seconds switches to __Chase__ mode.  
Then after chasing for `20` seconds, switches back to __Scatter__ mode.
This loop continues throughout the entire game.

#### Ghost Behaviors
- __Blinky__  
  __Chase behavior__: Simply moves exactly towards Pacman's current position.  
  __Scatter corner__: Top-Right corner.
- __Pinky__  
  __Chase behavior__: Moves 4 tiles ahead of Pacman, in the direction Pacman is currently moving.  
  __Scatter corner__: Top-Left corner.
- __Inky__  
  __Chase behavior__: Moves relative to the positions of Pacman and Blinky.
  It calculates its target position using the following steps:
    - Find the position 2 tiles ahead of Pacman.
    - Subtract Blinky's position from that position.
    - Multiply the position by 2.
    - Add this position to Blinky's position.
    - This final calculated position is Inky's target position!

  Here these steps are, represented in pseudo-code:
  ```
  target = pacman.position + 2       // 2 tiles ahead of pacman
  target = target - blinky.position  // subtract blinky's position
  target = target * 2                // multiply position by 2
  target = target + blinky.position  // add blinky's position again
  ```
  __Scatter corner__: Bottom-Right corner.
- __Clyde__  
  __Chase behavior__: Moves differently depending on how close he is to Pacman.  
  When he's 8 tiles away or further, then he moves like __Pinky__.
  When he's less than 8 tiles away, he moves as if he were in Scatter mode,
  retreating to his corner.  
  __Scatter corner__: Bottom-Left  
  <small>BTW, why is his name _Clyde_?</small>
</details>

### Power Pellets
Power pellets are typically big blue pellets.  
When Pacman eats a power pellet, he'll make the Ghosts enter
__Fright mode__, which allows Pacman to __eat the Ghosts__!
Eating a Ghost will add some __score points__ and temporarily __kill__ the ghost.
The more Ghosts Pacman manages to eat during Fright mode, the more points
the player will get.  
During __Fright mode__, the Ghosts will change their __appearance__ and
frantically move around __randomly__.  
After some time, the Ghosts will go back to chasing Pacman.
- Create and place `4` power pellet HTML elements in the game.  
  You can use the provided `./assets/images/pellet/power-pellet.png` image.
- When Pacman collides with a power pellet, he __eats it__:
    - Removes the eaten power pellet from the game.
    - The player gets `50` __score points__.
    - The Ghosts enter __Fright mode__.
- When the __Ghosts__ are in __Fright mode__:
    - They change their sprite image.  
      You can use the provided `./assets/images/ghosts/ghost-fright.png` image.
    - They stop chasing Pacman and start moving __randomly__,
      by randomly switching their movement direction.
    - After `7` seconds in Fright mode, they return back to chasing Pacman again.
    - Pacman can eat the Ghosts by colliding with them:
        - During a fright phase, eating the first Ghost will add `200` score points,
          eating a second adds `400`, the third adds `800`, the final adds `1600`.
        - The Ghost is __killed__, which temporarily removes it from the game.
            - After `5` seconds, the Ghost respawns at its original
              spawn-position, and goes back to chasing Pacman.

### Level Loading
We should represent our level in some structure, which should make
it easier for us to update the level layout.
You could represent the level via a multi-line string, where each
line represents a row of tiles in our level, and each character
represents a tile.
- Load and create all entities from our chosen level representation, including:
    - Pacman
    - The Ghosts
    - Walls
    - Pellets
    - Power Pellets

You can use or get inspiration from the provided `./assets/level.txt` file.

<details>
<summary>
    In this file, these characters represent the following entities.
</summary>

- `@` - Pacman
- `#` - Wall
- `.` - Pellet
- `*` - Power Pellet
- `B` - Blinky Ghost
- `P` - Pinky Ghost
- `I` - Inky Ghost
- `C` - Clyde Ghost
</details>

### Game Over
When a Ghost catches Pacman, it's __game over__!  
- When Pacman collides with any Ghost, we should trigger a game over.
- On game over:
    - A __"Game Over"__ message is displayed somewhere in our game.
    - The final __score__ should be displayed.
    - __Optional__: The player should be able to input their __name__
      into an input field, which will be displayed on the __leaderboard__.

### Winning
When Pacman eats all __pellets__ in the level, without getting
caught by a Ghost, then the player beats the level and wins the game!
- When Pacman has eaten all pellets in the level, the game is won.
- When the game is won, we stop our game loop, which should stop
  Pacman's and the Ghosts' movements.
- A __"You Win"__ message should be displayed, alongside the
  __final score__ and the __leaderboard__.
- __Optional__: The player should be able to input their __name__
  into an input field, which will be displayed on the __leaderboard__.
- __Optional__: Instead of ending the game, load the __next level__.  
  You will need to create multiple levels for this. Each subsequent
  level could add some __difficulty__, by for example, increasing
  all movement speed, decreasing fright mode duration, etc.

### Optional: Leaderboard
When the player game-overs, they can enter their name which adds the
name and the game's score to the leaderboard.  
Next to our game area, a __leaderboard__ should be displayed,
listing all previous games' __scores__ and their __names__.
- On game over, when the user inputs their __name__ into an input field,
  the game's __score__ and the given __name__ are added to the __leaderboard__,
  which is saved to `localStorage`.
- When a game is started, the leaderboard should be loaded from
  `localStorage` and be displayed next to our game level.
- The scores on the leaderboard should be __sorted__ by __score__,
  in __descending__ order. So the highest score appears
  at the top of the leaderboard.

## Background Materials
- [Creating, inserting, removing HTML elements with JS](https://www.w3schools.com/js/js_htmldom_nodes.asp)
- [Frame-by-frame animation](https://www.geeksforgeeks.org/how-to-create-frame-by-frame-animation-using-css-and-javascript/)
- [AABB collision detection][AABB]
- [Pacman Fandom](https://pacman.fandom.com/)
- [Programming Pacman tutorial in Python](https://pacmancode.com/)  
  Use this tutorial as reference if you need to.
  Don't just follow their code, they implement the game in a
  very different way from how this project aims to do it, and how you would do it in JS.
- [Play Pacman](https://playpacman.com/pacman/)
- API docs:
    - [`setInterval`](https://developer.mozilla.org/en-US/docs/Web/API/window/setInterval)
    - [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

[AABB]: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
