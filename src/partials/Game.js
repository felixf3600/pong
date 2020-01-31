import {
  SVG_NS,
  GAME_HEIGHT,
  GAME_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_GAP,
  PADDLE_WIDTH,
  BALL_RADIUS,
  PLAYER_ONE_DOWN,
  PLAYER_ONE_UP,
  PLAYER_TWO_DOWN,
  PLAYER_TWO_UP,
  PADDLE_SPEED
} from "../settings";
import Board from "./Board";
import Paddle from "./Paddle";
import Ball from "./Ball";

export default class Game {
  constructor(element) {
    this.gameElement = document.getElementById(element);
    this.board = new Board(GAME_WIDTH, GAME_HEIGHT);
    this.paddle1 = new Paddle(
      GAME_HEIGHT,
      PADDLE_WIDTH,
      PADDLE_HEIGHT,
      PADDLE_GAP,
      (GAME_HEIGHT - PADDLE_HEIGHT) / 2,
      PLAYER_ONE_UP,
      PLAYER_ONE_DOWN,
      PADDLE_SPEED
    );
    this.paddle2 = new Paddle(
      GAME_HEIGHT,
      PADDLE_WIDTH,
      PADDLE_HEIGHT,
      GAME_WIDTH - PADDLE_WIDTH - PADDLE_GAP,
      (GAME_HEIGHT - PADDLE_HEIGHT) / 2,
      PLAYER_TWO_UP,
      PLAYER_TWO_DOWN,
      PADDLE_SPEED
    );

    this.ball1 = new Ball(BALL_RADIUS, GAME_WIDTH, GAME_HEIGHT);
  }
  resetScreen(svg) {
    svg.setAttributeNS(null, "width", GAME_WIDTH);
    svg.setAttributeNS(null, "height", GAME_HEIGHT);
    svg.setAttributeNS(null, "viewBox", `0 0 ${GAME_WIDTH} ${GAME_HEIGHT}`);
    this.gameElement.appendChild(svg);
  }

  render() {
    this.gameElement.innerHTML = "";
    let svg = document.createElementNS(SVG_NS, "svg");
    this.resetScreen(svg);
    this.board.render(svg);
    this.paddle1.render(svg);
    this.paddle2.render(svg);
    this.ball1.render(svg, this.paddle1, this.paddle2);

    // More code goes here....
  }
}
