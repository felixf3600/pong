import { SVG_NS } from "../settings";
import ping from "../../public/sounds/pong-01.wav";
export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.speed = 10;
    this.radius = radius;
    this.direction = 1;
    this.reset();
    this.pingsound = new Audio(ping);
  }
  reset() {
    this.y = this.boardHeight / 2;
    this.x = this.boardWidth / 2;
    // this.vy = this.randomV();
    this.vy = 0;
    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10) - 5;
    }
    this.vx = (6 - Math.abs(this.vy)) * this.direction;
  }
  wallCollision() {
    const ballLocation = {
      top: this.vy + this.y - this.radius,
      right: this.vx + this.x + this.radius,
      bottom: this.vy + this.y + this.radius,
      left: this.vx + this.x - this.radius
    };
    if (ballLocation.bottom >= this.boardHeight || ballLocation.top < 0) {
      this.vy = this.vy * -1;
      this.pingsound;
    }
    if (ballLocation.right >= this.boardWidth || ballLocation.left < 0) {
      this.reset();
    }
  }

  paddleCollision(paddle1, paddle2) {
    //  if (this.vx <0) {
    //    const position = paddle1.getPaddle
    //  }

    const ballPosition = {
      center: this.y + this.vy,
      top: this.y - this.radius,
      left: this.x - this.radius,
      bottom: this.y + this.radius,
      right: this.x + this.radius
    };

    const playerOne = paddle1.getPaddlePosition();
    const playerTwo = paddle2.getPaddlePosition();

    if (this.vx < 0) {
      if (ballPosition.left < playerOne.right) {
        if (
          ballPosition.center >= playerOne.top ||
          ballPosition.center <= playerOne.Bottom
        ) {
          this.vx = this.vx * -1;
        } else {
          paddle2.paddleScore();
          this.reset();
        }
      }
    } else {
      if (ballPosition.right >= playerTwo.left) {
        if (
          ballPosition.center >= playerTwo.top ||
          ballPosition.center <= playerTwo.Bottom
        ) {
          this.vx = this.vx * -1;
        } else {
          paddle1.paddleScore();
          this.reset();
        }
      }
    }
  }

  ballMove() {
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;
  }
  render(svg, paddle1, paddle2) {
    const circleSvg = document.createElementNS(SVG_NS, "circle");
    circleSvg.setAttributeNS(null, "cx", this.x);
    circleSvg.setAttributeNS(null, "cy", this.y);
    circleSvg.setAttributeNS(null, "r", this.radius);
    circleSvg.setAttributeNS(null, "fill", "white");
    svg.appendChild(circleSvg);
    this.ballMove();
    this.wallCollision();
    this.paddleCollision(paddle1, paddle2);
  }
}
