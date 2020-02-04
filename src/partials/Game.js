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
      PADDLE_SPEED
    );
    this.paddle2 = new Paddle(
      GAME_HEIGHT,
      PADDLE_WIDTH,
      PADDLE_HEIGHT,
      GAME_WIDTH - PADDLE_WIDTH - PADDLE_GAP,
      (GAME_HEIGHT - PADDLE_HEIGHT) / 2,
      PADDLE_SPEED
    );
    this.score1 = new Score(GAME_WIDTH / 2 - 50, 30, 30);
    this.score2 = new Score(GAME_WIDTH / 2 + 25, 30, 30);
    this.ball1 = new Ball(BALL_RADIUS, GAME_WIDTH, GAME_HEIGHT);
    // variable containing the true/false variables for the game
    this.activeKeys = new KeySettings();
    // array that contains the keys that are pressed
    this.keyPressed = {}; //
    //event listener that will check
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
        console.log(event.key);
        if (event.key === " ") {
          this.activeKeys.pause = !this.activeKeys.pause;
        } else {
          this.keyPressed[event.key] = false;
        }
      },
      false
    );
  }

  // this is the set attributes of SVG
  resetScreen(svg) {
    svg.setAttributeNS(null, "width", GAME_WIDTH);
    svg.setAttributeNS(null, "height", GAME_HEIGHT);
    svg.setAttributeNS(null, "viewBox", `0 0 ${GAME_WIDTH} ${GAME_HEIGHT}`);
    this.gameElement.appendChild(svg);
  }
  // this renders the quit screen if someone presses the ESC key
  renderQuitScreen() {
    this.gameElement.innerHTML = "";
    let svg = document.createElementNS(SVG_NS, "svg");
    const finalSvg = document.createElementNS(SVG_NS, "text");
    const secondLine = document.createElementNS(SVG_NS, "text");
    this.board.render(svg);
    // sets the texts
    finalSvg.setAttributeNS(null, "x", 80);
    finalSvg.setAttributeNS(null, "y", 100);
    finalSvg.textContent = "YOU QUIT?!?!?!";
    finalSvg.setAttributeNS(null, "font-size", 30);
    finalSvg.setAttributeNS(null, "font-family", "'Silkscreen Web', monotype");
    finalSvg.setAttributeNS(null, "fill", "red");
    svg.appendChild(finalSvg);
    secondLine.setAttributeNS(null, "x", 80);
    secondLine.setAttributeNS(null, "y", 150);
    secondLine.textContent = " REFRESH TO RESTART ";
    secondLine.setAttributeNS(null, "font-size", 30);
    secondLine.setAttributeNS(
      null,
      "font-family",
      "'Silkscreen Web', monotype"
    );
    secondLine.setAttributeNS(null, "fill", "red");
    svg.appendChild(secondLine);
    this.resetScreen(svg);
  }
  //this function will display the ending score.
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
  //the main render program.
  render() {
    let svg = document.createElementNS(SVG_NS, "svg");
    this.activeKeys.getKeyesPressed(this.keyPressed, KEYS);
    //checks to see if any one won
    if (
      this.paddle1.score < ENDING_POINT &&
      this.paddle2.score < ENDING_POINT
    ) {
      if (this.activeKeys.pause !== false) {
        this.gameElement.innerHTML = "";
        console.log(this.activeKeys);

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
}
