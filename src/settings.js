// these are the global settings of the game.
export const SVG_NS = "http://www.w3.org/2000/svg";
export const GAME_WIDTH = 512;
export const GAME_HEIGHT = 256;
export const PADDLE_WIDTH = 8;
export const PADDLE_HEIGHT = 56;
export const PADDLE_GAP = 10;
export const BALL_RADIUS = 10;
export const PADDLE_SPEED = 10;
export const ENDING_POINT = 10;
export const KEYS = {
  playerOneUp: "a",
  playerOneDown: "z",
  playerTwoUp: "ArrowUp",
  playerTwoDown: "ArrowDown",
  pause: " ",
  exit: "Escape",
  // these last 4 are for future expansions to use buttons to create balls and to use buttons to shoot
  createBall1: "Tab",
  createBall2: "Enter",
  playerOneShoot: "d",
  playerTwoShoot: "/"
};
