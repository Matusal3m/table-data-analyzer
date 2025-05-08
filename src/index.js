import Table from "./table/Table.js";
import ParserFactory from "./parsers/ParserFactory.js";
import ProfitAnalysisService from "./controllers/ProfitAnalysisService.js";

(async () => {
  const filePath = "./src/data/input/produtos.csv";
  const outputPath = "./src/data/outputPath/produtos-csv.json";

  const parser = ParserFactory.createParser("csv");
  const table = await Table.create(parser, filePath);
  const profitAnalyserService = new ProfitAnalysisService(table);

  const suspectProfits = profitAnalyserService.getSuspectProfits();

  const rows = suspectProfits.map((profit) =>
    table.rowFromIndex(profit.coords[0]),
  );

  const verifiedData = rows.map((row, index) => {
    return {
      name: row.cells[0].value,
      buyPrice: row.cells[1].value,
      sellPrice: row.cells[2].value,
      suspectProfit: suspectProfits[index],
    };
  });

  console.table(verifiedData);
})();
