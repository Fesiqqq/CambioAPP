# Currency Exchange App

SPA em React + Vite para converter moedas, ver o histórico de cotações, filtrar/ordenar os dados e exportar CSV. Usa a [Frankfurter API](https://api.frankfurter.dev/v1) (sem chave, dados do BCE).

## Funcionalidades
- Conversor com troca rápida de moedas, validação de valor, taxa e data da cotação.
- Gráfico histórico (7 dias a 10 anos) com Recharts.
- Tabela com filtros combináveis (datas, cotação mín./máx.), ordenação e contador de registros.
- Exportação CSV apenas dos registros filtrados.

## Como executar
```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # build de produção
npm test        # testes das funções utilitárias (Node, sem dependências)
```
Requer Node 18+.

## Arquitetura
```
src/
  components/  UI modular, cada um com seu .module.css
  hooks/       useAsync (fetch + cancelamento) e useCurrencyExchange (useCurrencies, useLatestRate, useHistory)
  services/    frankfurterService.js: única camada que chama a API
  utils/       dates, formatters, rates (normalizar/filtrar/ordenar), csvExporter
  constants/   períodos, moedas padrão, filtros vazios
```
Fluxo: `App` guarda `from`, `to` e `period` → hooks buscam dados → `normalizeSeries` gera linhas `{date, from, to, rate}` → gráfico usa todas as linhas; `DataSection` aplica filtros/ordenação e exporta exatamente o que é exibido.

## Tecnologias
React 18, Vite 5, CSS Modules, Recharts, Fetch API (`async/await`). O CSV usa função nativa (sem Papa Parse).

## Observações
- A Frankfurter publica só dias úteis e agrega séries longas (semanal/mensal), então 5 e 10 anos têm menos pontos.
- Moedas iguais: o conversor retorna taxa 1 e o histórico mostra aviso (a API não aceita origem = destino).
- Documentação em `docs/`.

## Documentação
`docs/REQUIREMENTS.md`, `docs/COMPONENTS.md`, `docs/API_TESTS.md`, `docs/FUNCTION_TESTS.md`, `docs/FIGMA.md`, `docs/AI_USAGE.md` e `docs/STEPS.md` (as 10 etapas, commits e status de testes). Coleção Postman em `docs/postman/`.

## Imagens
**Aplicação em execução (dados reais da Frankfurter API, 26/10/2026)**: conversão USD→BRL, gráfico de 30 dias e tabela com 22 registros.

![Aplicação desktop: conversor, histórico e tabela](docs/img/app-desktop-usd-brl.png)

**Moedas iguais**: o conversor devolve taxa 1 e o histórico exibe aviso (a API não aceita origem = destino).

![Estado com moedas iguais](docs/img/app-moedas-iguais.png)

Exemplo de arquivo exportado: [`docs/evidencias/cotacoes_BRL-EUR_2026-09-29_a_2026-10-26.csv`](docs/evidencias/cotacoes_BRL-EUR_2026-09-29_a_2026-10-26.csv)
