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
  checkMovePaddle(up, down) {
    if (up) {
      this.movePaddle(-this.speed);
    }
    if (down) {
      this.movePaddle(this.speed);
    }
  }
  getScore() {
    return this.score;
  }
  getPaddlePosition() {
    const postion = {
      top: this.y,
      left: this.x,
      bottom: this.y + this.height,
      right: this.x + this.width
    };
    return postion;
  }

  paddleScore() {
    this.score++;
  }
  movePaddle(speed) {
    const nextSpace = this.y + speed;
    const maxBottom = nextSpace + this.height;
    if (nextSpace >= 0 && maxBottom <= this.boardHeight) {
      this.y = nextSpace;
    }
  }

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
