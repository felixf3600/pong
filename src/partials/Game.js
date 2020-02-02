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
  PADDLE_SPEED,
  ENDING_POINT
} from "../settings";
import Board from "./Board";
import Paddle from "./Paddle";
import Ball from "./Ball";
import Score from "./score";

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
    this.pause = false;
    this.score1 = new Score(GAME_WIDTH / 2 - 50, 30, 30);
    this.score2 = new Score(GAME_WIDTH / 2 + 25, 30, 30);
    this.ball1 = new Ball(BALL_RADIUS, GAME_WIDTH, GAME_HEIGHT);
    document.addEventListener("keydown", event => {
      if (event.key === " ") {
        this.pause = !this.pause;
      }
    });
  }
  resetScreen(svg) {
    svg.setAttributeNS(null, "width", GAME_WIDTH);
    svg.setAttributeNS(null, "height", GAME_HEIGHT);
    svg.setAttributeNS(null, "viewBox", `0 0 ${GAME_WIDTH} ${GAME_HEIGHT}`);
    this.gameElement.appendChild(svg);
  }

  // <!-- <text x="50" y="50" text-anchor="middle">SVG</text> -->

  displayEndingScore(svg, playerScore1, playerScore2) {
    let winner = "";
    if (playerScore1 < playerScore2) {
      winner = "PLAYER 2";
    } else {
      winner = "PLAYER 1";
    }
    console.log(winner);
    const finalSvg = document.createElementNS(SVG_NS, "text");
    const secondLine = document.createElementNS(SVG_NS, "text");
    finalSvg.setAttributeNS(null, "x", 80);
    finalSvg.setAttributeNS(null, "y", 100);
    finalSvg.textContent = "WINNER IS " + winner;
    finalSvg.setAttributeNS(null, "font-size", 30);
    finalSvg.setAttributeNS(null, "font-family", "'Silkscreen Web', monotype");
    finalSvg.setAttributeNS(null, "fill", "red");
    console.log(finalSvg);
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
    console.log(secondLine);
  }
  render() {
    let svg = document.createElementNS(SVG_NS, "svg");

    if (
      this.paddle1.score < ENDING_POINT &&
      this.paddle2.score < ENDING_POINT
    ) {
      if (this.pause !== false) {
        this.gameElement.innerHTML = "";
        this.board.render(svg);
        this.paddle1.render(svg);
        this.paddle2.render(svg);
        this.ball1.render(svg, this.paddle1, this.paddle2);
        this.score1.render(svg, this.paddle1.getScore());
        this.score2.render(svg, this.paddle2.getScore());
        this.resetScreen(svg);
      }
    } else {
      this.gameElement.innerHTML = "";
      this.board.render(svg);
      this.paddle1.render(svg);
      this.paddle2.render(svg);
      this.displayEndingScore(svg, this.paddle1.score, this.paddle2.score);
      this.resetScreen(svg);
      console.log(svg);
    }
  }
  // More code goes here....
}
