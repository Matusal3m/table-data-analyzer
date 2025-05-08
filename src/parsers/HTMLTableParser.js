import fs from "fs/promises";
import DOMParser from "../adapters/DOMParser.mjs";
import Header from "../table/Headers.mjs";
import Parser from "./Parser.mjs";

export default class HTMLTableParser extends Parser {
  async parse(htmlPath) {
    const document = await this.__getHTMLDocument(htmlPath);
    const HTMLTable = document.querySelector("table");

    const HTMLTableRows = Array.from(HTMLTable.querySelectorAll("tr"));

    const firstRow = HTMLTableRows.shift();

    const headers = this.__getHeaders(firstRow);
    const tableRowsData = this.__getTableRowData(HTMLTableRows);

    const { collumns, rows } = super.getCollumnsAndRows(headers, tableRowsData);

    return {
      header: Header.create(headers),
      rows,
      collumns,
    };
  }

  async __getHTMLDocument(htmlPath) {
    const HTMLString = await fs
      .readFile(htmlPath, "utf-8")
      .then((data) => data);

    const HTMLDom = DOMParser.parse(HTMLString);

    return HTMLDom;
  }

  /**
   *
   * @param {HTMLTableRowElement[]} firstRow
   */
  __getHeaders(firstRow) {
    const HTMLHeaderData = firstRow.children;

    const headers = [];

    for (let i = 0; i < HTMLHeaderData.length; i++) {
      const title = HTMLHeaderData[i];

      headers.push(title.innerHTML);
    }

    return headers;
  }

  /**
   *
   * @param {string[]} headers
   * @param {HTMLTableRowElement} tableRows
   */
  __getTableRowData(tableRows) {
    const tableRowsData = tableRows.map((tableRow) => {
      const tableRowCellElements = Array.from(tableRow.querySelectorAll("td"));

      return tableRowCellElements.map((cellElement) => cellElement.innerHTML);
    });

    return tableRowsData;
  }
}