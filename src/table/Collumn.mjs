import Cell from "./Cell.mjs";

export default class Collumn {
  /**
   *
   * @param {string} name
   * @param {Cell[]} cells
   * @param {number} collumnIndex
   */
  constructor(name, cells, collumnIndex) {
    this.name = name;
    this.cells = cells;
    this.index = collumnIndex;
  }

  static create(name, cellsValues) {
    const cells = cellsValues.map((value) => new Cell(value));

    return new Collumn(name, cells);
  }

  allValues() {
    return this.cells.map((cell) => cell.value);
  }

  existCollumnName() {
    return this.name !== "";
  }

  existCollumnCells() {
    return this.cells.length > 0;
  }

  atLeastOneCellHasValue() {
    return this.cells.some((cell) => cell.value !== "");
  }

  isValidCollumn() {
    return (
      this.existCollumnName() &&
      this.existCollumnCells() &&
      this.atLeastOneCellHasValue()
    );
  }
}
