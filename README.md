
### Instalação de Dependências

Instale as dependências do projeto:

```bash
npm install
```

## Uso

### Exemplo de Execução

Para realizar a análise sobre uma tabela gerada a partir de um arquivo CSV ou HTML, utilize:

```bash
node index.js
```

O arquivo `index.js` executa a análise de lucros sobre dados de `produtos.csv` e retorna uma lista de valores suspeitos. Para outras análises, basta adicionar novos módulos e configurá-los conforme o padrão da aplicação.

### Exemplo de Estrutura dos Dados de Entrada

#### CSV (`produtos.csv`)

```csv
NOME;VALOR DE COMPRA;VALOR DE VENDA;LUCRO POR UNIDADE
Produto A;10,00;15,00;5,00
Produto B;20,00;25,00;3,00
Produto C;15,00;15,00;0,00
```

#### HTML

```html
<table>
  <tr>
    <th>NOME</th>
    <th>VALOR DE COMPRA</th>
    <th>VALOR DE VENDA</th>
    <th>LUCRO POR UNIDADE</th>
  </tr>
  <tr>
    <td>Produto A</td>
    <td>10,00</td>
    <td>15,00</td>
    <td>5,00</td>
  </tr>
  <tr>
    <td>Produto B</td>
    <td>20,00</td>
    <td>25,00</td>
    <td>3,00</td>
  </tr>
</table>
```

## Detalhamento dos Módulos e Métodos

### DOMParser

```javascript
/**
 * @param {string} html
 * @returns {Document}
 */
DOMParser.parse(html);
```

### ProfitAnalyser

```javascript
/**
 * Construtor para análise de dados.
 * @param {Collumn} sellPriceCollumn - Coluna de valores de venda.
 * @param {Collumn} buyPriceCollumn - Coluna de valores de compra.
 * @param {Collumn} profitCollumn - Coluna de lucros.
 */
ProfitAnalyser(sellPriceCollumn, buyPriceCollumn, profitCollumn);

/**
 * Verifica se os lucros são suspeitos.
 * @returns {Cell[]} - Lista de células suspeitas.
 */
ProfitAnalyser.analyseIfProfitMakesSense();
```

### CSVTableParser

```javascript
/**
 * Analisa um arquivo CSV e retorna dados tabulares.
 * @param {string} csvPath - Caminho do arquivo CSV.
 * @returns {Promise<{header: Header, rows: Row[], collumns: Collumn[]}>}
 */
CSVTableParser.parse(csvPath);
```

### HTMLTableParser

```javascript
/**
 * Analisa uma tabela HTML e retorna dados tabulares.
 * @param {string} htmlPath - Caminho do arquivo HTML.
 * @returns {Promise<{header: Header, rows: Row[], collumns: Collumn[]}>}
 */
HTMLTableParser.parse(htmlPath);
```

### Table

```javascript
/**
 * Cria uma nova tabela a partir de um parser.
 * @param {Parser} parser - Instância do parser (CSV ou HTML).
 * @param {string} filePath - Caminho do arquivo.
 * @returns {Table}
 */
Table.create(parser, filePath);

/**
 * Encontra uma coluna pelo nome.
 * @param {string} name - Nome da coluna.
 * @returns {Collumn}
 */
Table.findCollumnByName(name);
```

### ParserFactory

```javascript
/**
 * Cria um parser com base no tipo de arquivo.
 * @param {"csv" | "html"} fileType - Tipo do arquivo.
 * @returns {CSVTableParser | HTMLTableParser}
 */
ParserFactory.createParser(fileType);
```

### ProfitAnalysisService

```javascript
/**
 * Organiza a análise de lucros para uma tabela.
 * @param {Table} table - Tabela para análise.
 */
ProfitAnalysisService(table);

/**
 * Obtém os lucros suspeitos.
 * @returns {Cell[]}
 */
ProfitAnalysisService.getSuspectProfits();
```

## Estrutura do Projeto

```
src/
├── controllers/
│   └── ProfitAnalyser.js
│   └── ProfitAnalysisService.js
├── data/
│   └── input/
│       └── produtos.csv
│   └── output/
│       └── produtos-teste.json
├── index.js
├── parsers/
│   └── CSVTableParser.js
│   └── HTMLTableParser.js
│   └── ParserFactory.js
├── adapters/
│   └── DOMParser.js
├── table/
│   └── Cell.js
│   └── Collumn.js
│   └── Row.js
│   └── Headers.js
│   └── Table.js
```

## Melhorias Futuras

1. **Implementação de novos parsers**: Suporte a JSON e XML.
2. **Novos tipos de análise**: Implementar outras análises para verificar dados em diversas colunas ou linhas.
3. **Validações de dados**: Identificar e lidar com dados inválidos.
4. **Melhorias de performance**: Processar arquivos grandes com streams.
5. **Relatórios**: Exportar resultados de análise para CSV ou PDF.
6. **Mais análises**: Adicionar outras funcionalidades de análise.
