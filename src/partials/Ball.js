import { SVG_NS } from "../settings";
export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.y = boardHeight / 2;
    this.x = boardWidth / 2;
    this.speed = 10;
    this.radius = radius;
    this.direction = 1;
  }
  render(svg) {
    const circleSvg = document.createElementNS(SVG_NS, "circle");
    circleSvg.setAttributeNS(null, "cx", this.x);
    circleSvg.setAttributeNS(null, "cy", this.y);
    circleSvg.setAttributeNS(null, "r", this.radius);
    circleSvg.setAttributeNS(null, "fill", "white");
    svg.appendChild(circleSvg);
  }
}
