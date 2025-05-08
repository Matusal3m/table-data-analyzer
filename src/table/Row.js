import Cell from "./Cell.js";

export default class Row {
  /**
   * @param {Cell[]} cells
   * @param {number} rowIndex
   */
  constructor(cells, rowIndex) {
    this.cells = cells;
    this.index = rowIndex;
  }

  /**
   *
   * @param {string[]} cellsValues
   * @param {number} rowIndex
   */
  static create(cellsValues, rowIndex) {
    const cells = cellsValues.map((value) => new Cell(value));

    return new Row(cells);
  }

  allValues() {
    return this.cells.map((cell) => cell.value);
  }

  existRowCells() {
    return this.cells.length > 0;
  }

  atLeastOneCellHasValue() {
    return this.cells.some((cell) => cell.value !== "");
  }

  isValidRow(collumns) {
    const rowLengthIsValid = this.cells.length === collumns.length;

    return (
      this.existRowCells() && this.atLeastOneCellHasValue() && rowLengthIsValid
    );
  }
}
