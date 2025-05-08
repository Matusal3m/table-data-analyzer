import Header from "../table/Headers.js";
import fs from "fs/promises";
import Parser from "./Parser.js";

export default class CSVTableParser extends Parser {
  async parse(csvPath) {
    const { csvHeader, csvLines } = await this.__getCSVContent(csvPath);

    const headers = this.__getHeaders(csvHeader);
    const tableRowsData = this.__getTableRowsData(csvLines);

    const { collumns, rows } = super.getCollumnsAndRows(headers, tableRowsData);

    return {
      header: Header.create(headers),
      rows,
      collumns,
    };
  }

  async __getCSVContent(csvPath) {
    const csvLines = (await fs.readFile(csvPath, "utf-8")).split("\r\n");

    const csvHeader = csvLines.shift();

    return {
      csvHeader,
      csvLines,
    };
  }

  __getHeaders(csvHeader) {
    return csvHeader.split(";").map((header) => this.clearString(header));
  }

  __getTableRowsData(csvLines) {
    return csvLines.map((line) => {
      const row = line.split(";");

      return row.map((value) => this.clearString(value));
    });
  }

  clearString(string) {
    return string.replace(/"/g, "").replace(/;/g, "").trim();
  }
}
