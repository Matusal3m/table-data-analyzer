import Cell from "../table/Cell.js";
import Collumn from "../table/Collumn.js";
import Row from "../table/Row.js";

export default class Parser {
  /**
   * @param {string[]} headers
   * @param {string[][]} tableRowsData
   */
  getCollumns(headers, tableRowsData) {
    const collumns = [];

    for (let i = 0; i < headers.length; i++) {
      const currentCollumnCells = [];

      for (let j = 0; j < tableRowsData.length; j++) {
        const tableCellData = tableRowsData[j][i];
        currentCollumnCells.push(new Cell(tableCellData, [j, i]));
      }

      collumns.push(new Collumn(headers[i], currentCollumnCells, i));
    }

    return collumns;
  }

  /**
   *
   * @param {string[]} headers
   * @param {string[][]} tableRowsData
   */
  getRows(headers, tableRowsData) {
    const rows = [];

    for (let i = 0; i < tableRowsData.length; i++) {
      const currentRowCells = [];

      for (let j = 0; j < headers.length; j++) {
        const tableCellData = tableRowsData[i][j];
        currentRowCells.push(new Cell(tableCellData, [i, j]));
      }

      rows.push(new Row(currentRowCells, i));
    }

    return rows;
  }

  /**
   *
   * @param {string[]} headers
   * @param {string[][]} tableRowsData
   */
  getCollumnsAndRows(headers, tableRowsData) {
    return {
      collumns: this.getCollumns(headers, tableRowsData),
      rows: this.getRows(headers, tableRowsData),
    };
  }
}
