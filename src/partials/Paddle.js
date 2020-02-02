import { SVG_NS } from "../settings";
export default class Paddle {
  constructor(boardHeight, width, height, x, y, speed) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.score = 0;
    this.speed = speed;
  }

  // checks to see if the paddle moves up and then calls function to check and move paddle position x
  checkMovePaddle(up, down) {
    if (up) {
      this.movePaddle(-this.speed);
    }
    if (down) {
      this.movePaddle(this.speed);
    }
  }

  // returns the score of the paddle calling it
  getScore() {
    return this.score;
  }

  //returns the position of each side of the paddle
  getPaddlePosition() {
    const postion = {
      top: this.y,
      left: this.x,
      bottom: this.y + this.height,
      right: this.x + this.width
    };
    return postion;
  }
  //adds to the paddle score that called it.
  paddleScore() {
    this.score++;
  }

  // checks to see if the paddle can move to the next position. if allowed then it changes its location by the speed
  movePaddle(speed) {
    const nextSpace = this.y + speed;
    const maxBottom = nextSpace + this.height;
    if (nextSpace >= 0 && maxBottom <= this.boardHeight) {
      this.y = nextSpace;
    }
  }
  // does the rendering of the paddles by first checking if the paddle moved and then redrwaing the paddle.
  render(svg, up, down) {
    this.checkMovePaddle(up, down);
    const paddleSvg = document.createElementNS(SVG_NS, "rect");
    paddleSvg.setAttributeNS(null, "x", this.x);
    paddleSvg.setAttributeNS(null, "y", this.y);
    paddleSvg.setAttributeNS(null, "width", this.width);
    paddleSvg.setAttributeNS(null, "height", this.height);
    paddleSvg.setAttributeNS(null, "fill", "white");
    svg.appendChild(paddleSvg);
  }
}
