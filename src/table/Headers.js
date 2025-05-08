import Cell from "./Cell.mjs";
import Row from "./Row.mjs";

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
