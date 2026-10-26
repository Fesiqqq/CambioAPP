# Componentes

| Componente | Responsabilidade | Props | Estado interno |
|---|---|---|---|
| `App` | Raiz; guarda par e período; orquestra hooks | — | `from`, `to`, `period` |
| `Header` | Título e descrição | — | — |
| `Converter` | Formulário, cálculo e exibição do resultado | `currencies`, `from`, `to`, `onChangeFrom`, `onChangeTo`, `onSwap` | `amountText` |
| `RateChart` | Gráfico de linha e seletor de período | `from`, `to`, `period`, `onPeriodChange`, `rows`, `loading`, `error` | — |
| `PeriodSelector` | Botões de período (radiogroup) | `value`, `onChange` | — |
| `DataSection` | Filtros, ordenação, contador, exportação | `rows`, `loading`, `error` | `filters`, `sort`, `notice` |
| `Filters` | Campos de filtro e ordenação | `filters`, `onChange`, `onClear`, `sortKey`, `sortDir`, `onSortChange` | — |
| `RatesTable` | Renderiza a tabela | `rows` | — |
| `StatusMessage` | Mensagens info/erro acessíveis | `type`, `children` | — |

## Hooks
- `useAsync(fn, deps, enabled)`: executa a chamada, devolve `{data, loading, error}` e cancela requisições obsoletas.
- `useCurrencies()`, `useLatestRate(from, to)`, `useHistory(from, to, periodId)`: encapsulam a API.

## Relações
```
App ─┬─ Header
     ├─ Converter ── useLatestRate ── StatusMessage
     ├─ RateChart ── PeriodSelector, StatusMessage   (dados de useHistory)
     └─ DataSection ─┬─ Filters ── StatusMessage
                     ├─ RatesTable
                     └─ utils/csv (exportCsv)
```
`App` busca o histórico uma vez e o compartilha entre gráfico e tabela, evitando requisição duplicada.
