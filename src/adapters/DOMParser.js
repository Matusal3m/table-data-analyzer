import { JSDOM } from "jsdom";

export default class DOMParser {
  
  /**
   * 
   * @param {string} html 
   * @returns {Document} 
   */
  static parse(html) {
    const dom = new JSDOM(html);
    return dom.window.document;
  }
}