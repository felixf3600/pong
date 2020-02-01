import { SVG_NS } from "../settings";

export default class Score {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }
  // <!-- <text x="50" y="50" text-anchor="middle">SVG</text> -->

  render(svg, score) {
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
