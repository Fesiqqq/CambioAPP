# Componentes

| Componente | Responsabilidade | Arquivo JSX | CSS Module | Principais props | Estados |
|---|---|---|---|---|---|
| `App` | Raiz; guarda o par de moedas e o período; orquestra os hooks (lifting state up) | `src/App.jsx` | `src/App.module.css` | — | `from`, `to`, `period` |
| `Header` | Título e descrição | `src/components/Header.jsx` | `Header.module.css` | — | — |
| `CurrencyConverter` | Formulário, validação, cálculo e exibição do resultado, taxa e data | `src/components/CurrencyConverter.jsx` | `CurrencyConverter.module.css` | `currencies`, `from`, `to`, `onChangeFrom`, `onChangeTo`, `onSwap` | `amountText` |
| `CurrencyChart` | Gráfico de linha do histórico e seletor de período | `src/components/CurrencyChart.jsx` | `CurrencyChart.module.css` | `from`, `to`, `period`, `onPeriodChange`, `rows`, `loading`, `error` | — |
| `PeriodSelector` | Botões de período (7 dias a 10 anos) | `src/components/PeriodSelector.jsx` | `PeriodSelector.module.css` | `value`, `onChange` | — |
| `CurrencyTable` | Tabela, contador de registros, ordenação, filtros e exportação CSV | `src/components/CurrencyTable.jsx` | `CurrencyTable.module.css` | `rows`, `loading`, `error` | `filters`, `sort`, `notice` |
| `CurrencyFilters` | Campos de filtro (datas, cotação mín./máx.), ordenação e limpeza | `src/components/CurrencyFilters.jsx` | `CurrencyFilters.module.css` | `filters`, `onChange`, `onClear`, `sortKey`, `sortDir`, `onSortChange` | — |
| `StatusMessage` | Mensagens acessíveis de informação e erro | `src/components/StatusMessage.jsx` | `StatusMessage.module.css` | `type`, `children` | — |

## Hooks e serviços
- `useAsync(fn, deps, enabled)` (`src/hooks/useAsync.js`): executa a chamada, devolve `{data, loading, error}` e cancela requisições obsoletas.
- `useCurrencies()`, `useLatestRate(from, to)`, `useHistory(from, to, periodId)` (`src/hooks/useCurrencyExchange.js`): encapsulam a API.
- `src/services/frankfurterService.js`: única camada que chama a Frankfurter API.

## Relações
```
App ─┬─ Header
     ├─ CurrencyConverter ── StatusMessage        (usa useLatestRate)
     ├─ CurrencyChart ── PeriodSelector, StatusMessage   (dados de useHistory)
     └─ CurrencyTable ── CurrencyFilters, StatusMessage  (+ utils/csvExporter)
```
`App` busca o histórico uma vez e o compartilha entre gráfico e tabela, evitando requisição duplicada.
