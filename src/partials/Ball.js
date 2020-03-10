import { SVG_NS } from "../settings";
import ping from "../../public/sounds/pong-02.wav";
export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.speed = 10;
    this.radius = radius;
    this.determineDirection();
    this.reset();
    this.pingsound = new Audio(ping);
  }
  determineDirection() {
    let number = Math.ceil(Math.random() * 100);
    if (number % 2 == 0) {
      this.direction = 1;
    } else {
      this.direction = -1;
    }
  }

  changeDirection() {
    this.direction = this.direction * -1;
  }

  reset() {
    this.y = this.boardHeight / 2;
    this.x = this.boardWidth / 2;
    this.vy = 0;
    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10) - 5;
    }
    this.vx = (6 - Math.abs(this.vy)) * this.direction;
  }
  wallCollision(roundEnd) {
    const ballLocation = {
      top: this.vy + this.y - this.radius,
      right: this.vx + this.x + this.radius,
      bottom: this.vy + this.y + this.radius,
      left: this.vx + this.x - this.radius
    };
    if (ballLocation.bottom >= this.boardHeight || ballLocation.top < 0) {
      this.vy = this.vy * -1;
      // this.pingsound.play();
    }
    if (ballLocation.right >= this.boardWidth || ballLocation.left < 0) {
      roundEnd = true;
    }
    return roundEnd;
  }

  detectCollision(position, position2, score, roundEnd) {
    if (position.left < position2.right) {
      if (
        position.bottom >= position2.top &&
        position.top <= position2.bottom
      ) {
        this.vx = this.vx * -1;
        // this.pingsound.play();
      } else {
        score.paddleScore();
        roundEnd = true;
      }
    }
    return roundEnd;
  }

  paddleCollision(paddle1, paddle2, roundEnd) {
    const ballPosition = {
      center: this.y + this.vy + this.vy,
      top: this.y + this.vy - this.radius,
      left: this.x + this.vx - this.radius,
      bottom: this.y + this.vy + this.radius,
      right: this.x + this.vx + this.radius
    };

    const playerOne = paddle1.getPaddlePosition();
    const playerTwo = paddle2.getPaddlePosition();

    if (this.vx < 0) {
      roundEnd = this.detectCollision(
        ballPosition,
        playerOne,
        paddle2,
        roundEnd
      );
    } else {
      playerTwo.right = playerTwo.left;
      ballPosition.left = ballPosition.right;
      roundEnd = this.detectCollision(
        playerTwo,
        ballPosition,
        paddle1,
        roundEnd
      );
    }
    this.changeDirection();
    return roundEnd;
  }

  ballMove() {
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;
  }
  render(svg, paddle1, paddle2, roundEnd) {
    const circleSvg = document.createElementNS(SVG_NS, "circle");
    circleSvg.setAttributeNS(null, "cx", this.x);
    circleSvg.setAttributeNS(null, "cy", this.y);
    circleSvg.setAttributeNS(null, "r", this.radius);
    circleSvg.setAttributeNS(null, "fill", "white");
    svg.appendChild(circleSvg);
    roundEnd = this.wallCollision(roundEnd);
    roundEnd = this.paddleCollision(paddle1, paddle2, roundEnd);
    this.ballMove();
    return roundEnd;
  }
}
