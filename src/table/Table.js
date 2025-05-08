import Row from "./Row.mjs";
import Collumn from "./Collumn.mjs";
import Header from "./Headers.mjs";

/**
 * @interface
 * @typedef {Object} Parser
 * @property {function(string): Promise<{header: Header, rows: Row[], collumns: Collumn[]}>} parse - Função que parseia dados e retorna um objeto com os dados para uma tabela
 */

export default class Table {
  /**
   *
   * @param {Row[]} rows
   * @param {Collumn[]} collumns
   * @param {Collumn} header
   */
  constructor(rows, collumns, header) {
    this.rows = rows;
    this.collumns = collumns;
    this.header = header;
  }

  /**
   * Cria uma nova tabela a partir de um parser
   *
   * @param {Parser} parser
   * @param {string} filePath
   * @returns {Table}
   */

  static async create(parser, filePath) {
    const { rows, collumns, headers } = await parser.parse(filePath);
    return new Table(rows, collumns, headers);
  }

  extractValidCollumns() {
    return this.collumns.filter((collumn) => collumn.isValidCollumn());
  }

  extractValidRows() {
    return this.rows.filter((row) => row.isValidRow(this.collumns));
  }

  findCollumnByName(name) {
    return this.extractValidCollumns().find((collumn) =>
      collumn.name.includes(name)
    );
  }

  collumnFromIndex(collumnIndex) {
    return this.extractValidCollumns().find(collumn => collumn.index === collumnIndex);
  }

  rowFromIndex(rowIndex) {
    return this.extractValidRows().find((row) => row.index === rowIndex);
  }

  getCollumnAndRowFromCords(coords) {
    return {
      collumn: this.collumns.at(coords[0]),
      row: this.rows.at(coords[1]),
    };
  }
}
