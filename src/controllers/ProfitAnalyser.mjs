import Collumn from "../table/Collumn.mjs";

export default class ProfitAnalyser {
  /**
   *
   * @param {Collumn} sellPriceCollumn
   * @param {Collumn} buyPriceCollumn
   * @param {Collumn} profitCollumn
   */
  constructor(sellPriceCollumn, buyPriceCollumn, profitCollumn) {
    this.sellPriceCollumn = sellPriceCollumn;
    this.buyPriceCollumn = buyPriceCollumn;
    this.profitCollumn = profitCollumn;
  }

  analyseIfProfitMakesSense() {
    const profits = this.__collumnValuesToNumber(this.profitCollumn);
    const sellPrices = this.__collumnValuesToNumber(this.sellPriceCollumn);

    const suspectProfits = [];

    for (let i = 0; i < profits.length; i++) {
      const profit = profits[i];

      if (profit.value <= 0 || profit.value > sellPrices[i]) {
        suspectProfits.push(profit);
      }
    }

    return suspectProfits;
  }

  /**
   *
   * @param {Collumn} collumn
   * @returns
   */
  __collumnValuesToNumber(collumn) {
    return collumn.cells.map((cell) => {
      if (!cell.value) return cell;

      cell.value = cell.value.replace(",", ".");

      cell.value = Number(cell.value);

      return cell;
    });
  }
}
