export default class Cell {
  /**
   *
   * @param {string} value
   * @param {[number, number]} coords - [collumn, row] coords
   */
  constructor(value, coords) {
    this.value = value;
    this.coords = coords
  }
}
