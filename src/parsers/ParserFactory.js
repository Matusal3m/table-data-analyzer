import CSVTableParser from "./CSVTableParser.js";
import HTMLTableParser from "./HTMLTableParser.js";

export default class ParserFactory {
  /**
   *
   * @param {"csv" | "html"} fileType
   * @returns
   */
  static createParser(fileType) {
    switch (fileType) {
      case "csv":
        return new CSVTableParser();
      case "html":
        return new HTMLTableParser();
      default:
        throw new Error(`Tipo de arquivo não suportado: ${fileType}`);
    }
  }
}
