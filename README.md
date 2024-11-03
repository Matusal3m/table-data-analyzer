# Projeto de Análise de Tabelas e Verificação de Lucro

Este projeto realiza a análise de tabelas com o objetivo de identificar inconsistências em dados de lucro com base em arquivos CSV ou HTML. O sistema organiza dados em uma estrutura tabular e verifica valores suspeitos de lucro unitário, indicando possíveis erros ou valores fora do padrão.

## Estrutura do Projeto

O projeto é organizado em módulos que manipulam, processam e analisam os dados de entrada, suportando arquivos CSV e HTML:

- `DOMParser`: Converte strings HTML em documentos DOM.
- `ProfitAnalyser`: Realiza a análise de lucro e identifica valores suspeitos.
- `CSVTableParser` e `HTMLTableParser`: Fazem o parsing dos arquivos CSV e HTML.
- `Table`, `Row`, `Collumn`, `Cell`, e `Header`: Estruturas que abstraem a tabela, linhas, colunas, células e cabeçalhos.
- `ParserFactory`: Fábrica para criar o parser correto baseado no tipo de arquivo.
- `ProfitAnalysisService`: Organiza o fluxo da análise de lucros usando `ProfitAnalyser`.

## Funcionalidades

1. **Parsing de Arquivos CSV e HTML**:

   - `CSVTableParser`: Lê arquivos CSV, processa cabeçalhos e linhas.
   - `HTMLTableParser`: Lê e processa tabelas HTML.

2. **Análise de Lucros**:

   - `ProfitAnalyser`: Verifica se os lucros por unidade estão em um intervalo aceitável.
   - `ProfitAnalysisService`: Executa a análise de lucro e organiza os dados verificados.

3. **Identificação de Dados Suspeitos**:
   - Identifica e exibe células onde o lucro está fora do padrão, comparando com preços de venda.

## Instalação

### Pré-requisitos

- **Node.js** v12+ e npm.
- Clone este repositório:
  ```bash
  git clone <link-do-repositorio>
  cd <diretorio-do-projeto>
  ```

### Instalação de Dependências

Instale as dependências do projeto:

```bash
npm install
```

## Uso

### Exemplo de Execução

Para executar a análise, utilize:

```bash
node index.mjs
```

O arquivo `index.mjs` lê os dados de `produtos.csv` e realiza a análise de lucros, retornando uma lista de valores suspeitos.

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
 * Construtor para analisar os lucros.
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
│   └── ProfitAnalyser.mjs
│   └── ProfitAnalysisService.mjs
├── data/
│   └── input/
│       └── produtos.csv
│   └── output/
│       └── produtos-teste.json
├── index.mjs
├── parsers/
│   └── CSVTableParser.mjs
│   └── HTMLTableParser.mjs
│   └── ParserFactory.mjs
├── adapters/
│   └── DOMParser.mjs
├── table/
│   └── Cell.mjs
│   └── Collumn.mjs
│   └── Row.mjs
│   └── Headers.mjs
│   └── Table.mjs
```

## Melhorias Futuras

1. **Implementação de novos parsers**: Suporte a JSON e XML.
2. **Validações de dados**: Identificar e lidar com dados inválidos.
3. **Melhorias de performance**: Processar arquivos grandes com streams.
4. **Relatórios**: Exportar resultados de análise para CSV ou PDF.
5. **Outras formas de análises**
