import CSVTableParser from "./CSVTableParser.mjs";
import HTMLTableParser from "./HTMLTableParser.mjs";

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
