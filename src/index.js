import "./styles/game.css";
import Game from "./partials/Game";
import { GAME_HEIGHT, GAME_WIDTH } from "./settings";
// create a game instance
const game = new Game("game", GAME_WIDTH, GAME_HEIGHT);
let myId;
(function gameLoop() {
  //gameloop for the game
  if (game.activeKeys.exit == false) {
    game.render();
    myId = requestAnimationFrame(gameLoop);
  } else {
    cancelAnimationFrame(myId);
  }
})();
