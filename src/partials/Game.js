import {
  SVG_NS,
  GAME_HEIGHT,
  GAME_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_GAP,
  PADDLE_WIDTH,
  BALL_RADIUS,
  KEYS,
  PADDLE_SPEED,
  ENDING_POINT
} from "../settings";
import Board from "./Board";
import Paddle from "./Paddle";
import Ball from "./Ball";
import Score from "./score";
import KeySettings from "./keyboard";

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
      // KEYS.playerOneUp,
      // KEYS.playerOneDown,
      PADDLE_SPEED
    );
    this.paddle2 = new Paddle(
      GAME_HEIGHT,
      PADDLE_WIDTH,
      PADDLE_HEIGHT,
      GAME_WIDTH - PADDLE_WIDTH - PADDLE_GAP,
      (GAME_HEIGHT - PADDLE_HEIGHT) / 2,
      // KEYS.playerTwoUp,
      // KEYS.playerTwoUp,
      PADDLE_SPEED
    );
    this.score1 = new Score(GAME_WIDTH / 2 - 50, 30, 30);
    this.score2 = new Score(GAME_WIDTH / 2 + 25, 30, 30);
    this.ball1 = new Ball(BALL_RADIUS, GAME_WIDTH, GAME_HEIGHT);
    this.activeKeys = new KeySettings();
    this.keyPressed = {};
    document.addEventListener(
      "keydown",
      event => {
        this.keyPressed[event.key] = true;
      },
      false
    );
    document.addEventListener(
      "keyup",
      event => {
        this.keyPressed[event.key] = false;
        console.log(this.keyPressed);
      },
      false
    );
  }
  resetScreen(svg) {
    svg.setAttributeNS(null, "width", GAME_WIDTH);
    svg.setAttributeNS(null, "height", GAME_HEIGHT);
    svg.setAttributeNS(null, "viewBox", `0 0 ${GAME_WIDTH} ${GAME_HEIGHT}`);
    this.gameElement.appendChild(svg);
  }

  displayEndingScore(svg, playerScore1, playerScore2) {
    let winner = "";
    if (playerScore1 < playerScore2) {
      winner = "PLAYER 2";
    } else {
      winner = "PLAYER 1";
    }
    const finalSvg = document.createElementNS(SVG_NS, "text");
    const secondLine = document.createElementNS(SVG_NS, "text");
    finalSvg.setAttributeNS(null, "x", 80);
    finalSvg.setAttributeNS(null, "y", 100);
    finalSvg.textContent = "WINNER IS " + winner;
    finalSvg.setAttributeNS(null, "font-size", 30);
    finalSvg.setAttributeNS(null, "font-family", "'Silkscreen Web', monotype");
    finalSvg.setAttributeNS(null, "fill", "red");
    svg.appendChild(finalSvg);
    secondLine.setAttributeNS(null, "x", 150);
    secondLine.setAttributeNS(null, "y", 150);
    secondLine.textContent = playerScore1 + " vs " + playerScore2;
    secondLine.setAttributeNS(null, "font-size", 50);
    secondLine.setAttributeNS(
      null,
      "font-family",
      "'Silkscreen Web', monotype"
    );
    secondLine.setAttributeNS(null, "fill", "red");
    svg.appendChild(secondLine);
  }
  render() {
    let svg = document.createElementNS(SVG_NS, "svg");
    this.activeKeys.getKeyesPressed(this.keyPressed, KEYS);

    if (
      this.paddle1.score < ENDING_POINT &&
      this.paddle2.score < ENDING_POINT
    ) {
      if (this.activeKeys.pause !== false) {
        this.gameElement.innerHTML = "";
        this.board.render(svg);
        this.paddle1.render(
          svg,
          this.activeKeys.player1Up,
          this.activeKeys.player1Down
        );
        this.paddle2.render(
          svg,
          this.activeKeys.player2Up,
          this.activeKeys.player2Down
        );
        this.ball1.render(svg, this.paddle1, this.paddle2);
        this.score1.render(svg, this.paddle1.getScore());
        this.score2.render(svg, this.paddle2.getScore());
        this.resetScreen(svg);
      }
    } else {
      this.gameElement.innerHTML = "";
      this.board.render(svg);
      this.paddle1.render(
        svg,
        this.activeKeys.player1Up,
        this.activeKeys.player1Down
      );
      this.paddle2.render(
        svg,
        this.activeKeys.player2Up,
        this.activeKeys.player2Down
      );
      this.displayEndingScore(svg, this.paddle1.score, this.paddle2.score);
      this.resetScreen(svg);
      console.log(svg);
    }
  }
  // More code goes here....
}
// document.addEventListener("keydown", event => {
//   console.log(event);
// });
