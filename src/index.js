import "./styles/game.css";
import Game from "./partials/Game";
import {
  GAME_HEIGHT,
  GAME_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
  BALL_RADIUS
} from "./settings";
// create a game instance
const game = new Game(
  "game",
  GAME_WIDTH,
  GAME_HEIGHT,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  BALL_RADIUS
);

(function gameLoop() {
  game.render();
  requestAnimationFrame(gameLoop);
})();
