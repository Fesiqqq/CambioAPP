# Etapas de desenvolvimento

| # | Commit |
|---|---|
| 01 | `chore: initialize project structure with vite and react` |
| 02 | `docs: add initial project requirements and component architecture` |
| 03 | `feat: implement frankfurter api service and document endpoints` |
| 04 | `feat: create currency converter interface and selection inputs` |
| 05 | `feat: implement real-time currency conversion and coin swapping logic` |
| 06 | `refactor: extract exchange logic into custom hook and add loading states` |
| 07 | `feat: integrate historical exchange rate chart across multiple periods` |
| 08 | `feat: add data table with multi-criteria filtering and sorting` |
| 09 | `feat: implement csv export for filtered records and add function tests` |
| 10 | `Currency-Exchange-app finalizado!` |

## Status de testes por etapa

**Etapa 01:** node --check: 1 .js/.mjs OK, 0 com erro; 2 arquivo(s) JSX sem compilação (sem esbuild/rede); package.json válido. Build do Vite não executado aqui (sem rede para npm install): validação estática; rode npm install && npm run dev para confirmar.

**Etapa 02:** Revisão de escopo por contagem: 10 requisitos funcionais, 5 não funcionais, 6 critérios de aceite, 6 regras de negócio, 8 componentes mapeados.

**Etapa 03:** node --check: 3 .js/.mjs OK, 0 com erro; 2 arquivo(s) JSX sem compilação (sem esbuild/rede); serviço com fetch mockado: 7/7 passaram. Coleção Postman criada (4 requests), mas NÃO executada contra a API real (sem rede): resultados reais pendentes em docs/API_TESTS.md.

**Etapa 04:** node --check: 4 .js/.mjs OK, 0 com erro; 4 arquivo(s) JSX sem compilação (sem esbuild/rede); seleção de moedas via getCurrencies() validada só por leitura de código (React/DOM não executados aqui); botão de inverter presente porém desabilitado até a etapa 05.

**Etapa 05:** node --check: 6 .js/.mjs OK, 0 com erro; 4 arquivo(s) JSX sem compilação (sem esbuild/rede); formatters/dates: 5 asserções OK. Inversão (estado elevado ao App) e cálculo validados por leitura de código; sem execução no navegador.

**Etapa 06:** node --check: 8 .js/.mjs OK, 0 com erro; 5 arquivo(s) JSX sem compilação (sem esbuild/rede); hooks (useAsync com AbortController) e estados loading/erro revisados por leitura; falha de rede coberta no nível do serviço pelos testes mockados da etapa 03 (7/7 passaram). Teste visual com DevTools > Offline pendente para você.

**Etapa 07:** node --check: 9 .js/.mjs OK, 0 com erro; 7 arquivo(s) JSX sem compilação (sem esbuild/rede); 8 períodos + normalizeSeries: OK. Renderização do Recharts não verificada visualmente (sem npm install/navegador); recharts adicionado ao package.json.

**Etapa 08:** node --check: 9 .js/.mjs OK, 0 com erro; 9 arquivo(s) JSX sem compilação (sem esbuild/rede); testes de filtro/ordenação/validação/datas executados (suite sem as funções de CSV): 14/14 passaram. Interface da tabela validada só por leitura.

**Etapa 09:** node --check: 11 .js/.mjs OK, 0 com erro; 9 arquivo(s) JSX sem compilação (sem esbuild/rede); npm test: 7/7 passaram 16/16 passaram . buildCsv é testado; o download via Blob (exportCsv) depende do navegador e ficou sem teste automatizado.

**Etapa 10:** auditoria estática: imports relativos quebrados = 0; npm test: 7/7 passaram 16/16 passaram . Responsividade definida por media queries em 720px e 480px, **não testada em dispositivos reais**.
