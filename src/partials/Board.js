import { SVG_NS } from "../settings";
export default class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  drawBoard(svg) {
    const boardSvg = document.createElementNS(SVG_NS, "rect");
    boardSvg.setAttributeNS(null, "x", 0);
    boardSvg.setAttributeNS(null, "y", 0);
    boardSvg.setAttributeNS(null, "width", this.width);
    boardSvg.setAttributeNS(null, "height", this.height);
    boardSvg.setAttributeNS(null, "fill", "#353535");
    svg.appendChild(boardSvg);
  }

  drawCenterLine(svg) {
    const centerLine = document.createElementNS(SVG_NS, "line");
    centerLine.setAttributeNS(null, "x1", this.width / 2);
    centerLine.setAttributeNS(null, "y1", 0);
    centerLine.setAttributeNS(null, "x2", this.width / 2);
    centerLine.setAttributeNS(null, "y2", this.height);
    centerLine.setAttributeNS(null, "stroke", "white");
    centerLine.setAttributeNS(null, "stroke-dasharray", "20 15");
    svg.appendChild(centerLine);
  }

  render(svg) {
    this.drawBoard(svg);
    this.drawCenterLine(svg);
  }
}
