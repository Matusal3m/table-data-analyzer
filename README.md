# Projeto de Análise de Tabelas

Este projeto é um **analisador de dados tabulares** flexível, projetado para processar e estruturar dados a partir de arquivos CSV ou HTML e transformá-los em uma estrutura de tabela uniforme. Através de sua arquitetura modular, o sistema permite a implementação de diferentes tipos de análises sobre os dados processados. A análise de lucros é uma funcionalidade atual do projeto, mas ele está preparado para receber outras análises de dados no futuro, tornando-se uma ferramenta robusta e extensível para diferentes cenários de verificação de informações.

## Estrutura do Projeto

O projeto organiza-se em módulos que facilitam o processamento de dados, a manipulação de tabelas e a análise. Seus principais componentes incluem:

- `DOMParser`: converte strings HTML em documentos DOM para permitir a extração de dados de tabelas HTML.
- `Table`, `Row`, `Collumn`, `Cell`, e `Header`: abstraem a estrutura da tabela, organizando dados em linhas, colunas, células e cabeçalhos.
- `CSVTableParser` e `HTMLTableParser`: interpretam arquivos CSV e HTML, respectivamente, transformando-os em tabelas.
- `ParserFactory`: uma fábrica de parsers, que cria o parser apropriado conforme o tipo de arquivo fornecido.
- `ProfitAnalyser`: exemplo de funcionalidade de análise que verifica a consistência de valores de lucro dentro da tabela, destacando dados suspeitos.

## Funcionalidades

1. **Parsing de Arquivos para Estruturação em Tabelas**:

   - `CSVTableParser`: lê arquivos CSV e cria uma estrutura de tabela organizada em colunas e linhas.
   - `HTMLTableParser`: processa tabelas HTML e converte dados em uma tabela interna.

2. **Análise de Dados Personalizada**:

   - `ProfitAnalyser` (funcionalidade atual): analisa colunas específicas para verificar a consistência dos dados de lucro.
   - **Extensibilidade para outras análises**: o projeto é projetado para suportar outros tipos de análises sobre dados tabulares, permitindo a adição de novos módulos de análise conforme as necessidades.

3. **Identificação e Filtragem de Dados**:
   - Extração de colunas e linhas válidas.
   - Filtragem e validação de dados para análises específicas.

## Instalação

### Pré-requisitos

- **Node.js** v12+ e npm.
- Clone este repositório:
  ```bash
  git clone <link-do-repositorio>
  cd <diretorio-do-projeto>
  ```

````

### Instalação de Dependências

Instale as dependências do projeto:

```bash
npm install
```

## Uso

### Exemplo de Execução

Para realizar a análise sobre uma tabela gerada a partir de um arquivo CSV ou HTML, utilize:

```bash
node index.mjs
```

O arquivo `index.mjs` executa a análise de lucros sobre dados de `produtos.csv` e retorna uma lista de valores suspeitos. Para outras análises, basta adicionar novos módulos e configurá-los conforme o padrão da aplicação.

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
2. **Novos tipos de análise**: Implementar outras análises para verificar dados em diversas colunas ou linhas.
3. **Validações de dados**: Identificar e lidar com dados inválidos.
4. **Melhorias de performance**: Processar arquivos grandes com streams.
5. **Relatórios**: Exportar resultados de análise para CSV ou PDF.
6. **Mais análises**: Adicionar outras funcionalidades de análise.
````
