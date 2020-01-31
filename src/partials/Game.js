import { SVG_NS } from "../settings";
import Board from "./Board";
import Paddle from "./Paddle";
import Ball from "./Ball";

export default class Game {
  constructor(element, width, height, paddleWidth, paddleHeight, ballRadius) {
    this.element = element;
    this.width = width;
    this.height = height;
    this.paddleY = paddleHeight;
    this.paddleX = paddleWidth;
    this.ballRadius = ballRadius;
    this.paddleC = this.gameElement = document.getElementById(this.element);
    this.board = new Board(this.width, this.height);
    this.paddle1 = new Paddle(
      this.height,
      this.paddleX,
      this.paddleY,
      10,
      (this.height - this.paddleY) / 2
    );
    this.paddle2 = new Paddle(
      this.height,
      this.paddleX,
      this.paddleY,
      this.width - this.paddleX,
      (this.height - this.paddleY) / 2
    );

    this.ball1 = new Ball(this.ballRadius, this.width, this.height);
  }

  render() {
    this.gameElement.innerHTML = "";

    let svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);
    svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);
    this.gameElement.appendChild(svg);
    this.board.render(svg);
    this.paddle1.render(svg);
    this.paddle2.render(svg);
    this.ball1.render(svg);

    // More code goes here....
  }
}
