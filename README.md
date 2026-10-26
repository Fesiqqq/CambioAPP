# Currency Exchange App

SPA em React + Vite para converter moedas, ver o histórico de cotações, filtrar/ordenar os dados e exportar CSV. Usa a [Frankfurter API](https://api.frankfurter.app) (sem chave, dados do BCE).

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
  hooks/       useAsync (fetch + cancelamento) e useExchangeRates (useCurrencies, useLatestRate, useHistory)
  services/    frankfurter.js: única camada que chama a API
  utils/       dates, format, rates (normalizar/filtrar/ordenar), csv
  constants/   períodos, moedas padrão, filtros vazios
```
Fluxo: `App` guarda `from`, `to` e `period` → hooks buscam dados → `normalizeSeries` gera linhas `{date, from, to, rate}` → gráfico usa todas as linhas; `DataSection` aplica filtros/ordenação e exporta exatamente o que é exibido.

## Tecnologias
React 18, Vite 5, CSS Modules, Recharts, Fetch API (`async/await`). O CSV usa função nativa (sem Papa Parse).

## Observações
- A Frankfurter publica só dias úteis e agrega séries longas (semanal/mensal), então 5 e 10 anos têm menos pontos.
- Moedas iguais: o conversor retorna taxa 1 e o histórico mostra aviso (a API não aceita origem = destino).
- Documentação em `docs/` (inclui a coleção Postman em `docs/postman/`).
