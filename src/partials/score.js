import { SVG_NS } from "../settings";

export default class Score {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  render(
    svg,
    score //this renders the score in the middle top of the board.
  ) {
    const scoreSvg = document.createElementNS(SVG_NS, "text");
    scoreSvg.setAttributeNS(null, "x", this.x);
    scoreSvg.setAttributeNS(null, "y", this.y);
    scoreSvg.textContent = score;
    scoreSvg.setAttributeNS(null, "font-size", this.size);
    scoreSvg.setAttributeNS(null, "font-family", "'Silkscreen Web', monotype");
    scoreSvg.setAttributeNS(null, "fill", "white");
    svg.appendChild(scoreSvg);
  }
}
