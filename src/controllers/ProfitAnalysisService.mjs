import ProfitAnalyser from "./ProfitAnalyser.mjs";

export default class ProfitAnalysisService {
  constructor(table) {
    this.table = table;
  }

  getSuspectProfits() {
    const analyser = new ProfitAnalyser(
      this.table.findCollumnByName("VALOR DE VENDA"),
      this.table.findCollumnByName("VALOR DE COMPRA"),
      this.table.findCollumnByName("LUCRO POR UNIDADE")
    );
    return analyser.analyseIfProfitMakesSense();
  }
}
