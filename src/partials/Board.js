import { SVG_NS } from "../settings";
export default class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  render(svg) {
    const boardSvg = document.createElementNS(SVG_NS, "rect");
    const centerLine = document.createElementNS(SVG_NS, "line");
    const center = this.width / 2;
    boardSvg.setAttributeNS(null, "x", 0);
    boardSvg.setAttributeNS(null, "y", 0);
    boardSvg.setAttributeNS(null, "width", this.width);
    boardSvg.setAttributeNS(null, "height", this.height);
    boardSvg.setAttributeNS(null, "fill", "#353535");
    centerLine.setAttributeNS(null, "x1", center);
    centerLine.setAttributeNS(null, "y1", 0);
    centerLine.setAttributeNS(null, "x2", center);
    centerLine.setAttributeNS(null, "y2", this.height);
    centerLine.setAttributeNS(null, "stroke", "white");
    centerLine.setAttributeNS(null, "stroke-dasharray", "20 15");
    svg.appendChild(boardSvg);
    svg.appendChild(centerLine);
  }
}
