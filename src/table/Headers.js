import Cell from "./Cell.js";
import Row from "./Row.js";

export default class Header extends Row {
  /**
   *
   * @param {Cell[]} cells
   */
  constructor(cells) {
    super(cells);
  }

  static create(headers) {
    const cells = headers.map((header) => new Cell(header));

    return new Header(cells);
  }
}
