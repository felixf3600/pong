import { SVG_NS } from "../settings";
export default class Paddle {
  constructor(boardHeight, width, height, x, y, keyUp, KeyDown, speed) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.score = 0;
    this.speed = speed;
    document.addEventListener("keydown", event => {
      // console.log(event.key);
      switch (event.key) {
        case keyUp:
          this.movePaddle(-speed);
          break;
        case KeyDown:
          this.movePaddle(speed);
          break;
        // default:
        //   break;
      }
    });
  }

  movePaddle(speed) {
    const nextSpace = this.y + speed;
    const maxBottom = nextSpace + this.height;
    if (nextSpace >= 0 && nextSpace <= maxBottom) {
      this.y = nextSpace;
    }
    // console.log(maxBottom, nextSpace, this.speed, direction);
    // this.render(svg);
  }

  render(svg) {
    const paddleSvg = document.createElementNS(SVG_NS, "rect");
    paddleSvg.setAttributeNS(null, "x", this.x);
    paddleSvg.setAttributeNS(null, "y", this.y);
    paddleSvg.setAttributeNS(null, "width", this.width);
    paddleSvg.setAttributeNS(null, "height", this.height);
    paddleSvg.setAttributeNS(null, "fill", "white");
    svg.appendChild(paddleSvg);
  }
}
