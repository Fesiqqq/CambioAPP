# Testes das funções

Arquivo: `tests/utils.test.mjs`. Execute com `npm test` (Node puro, sem dependências).
**Resultado da execução: 16/16 passaram.**

| # | Função | Cenário | Esperado | Status |
|---|---|---|---|---|
| 1 | `parseAmount` | `"99,90"` e `"100"` | 99.9 e 100 | PASS |
| 2 | `parseAmount` | `""`, `"abc"`, `"-5"`, `"0"`, `"1e999"` | `null` | PASS |
| 3 | `getStartDate` | 7 dias antes de 2024-03-15 | `2024-03-08` | PASS |
| 4 | `getStartDate` | 3 meses antes de 2024-03-15 | `2023-12-15` | PASS |
| 5 | `getStartDate` | 10 anos antes de 2024-03-15 | `2014-03-15` | PASS |
| 6 | `normalizeSeries` | Resposta fora de ordem | Linhas planas ordenadas por data | PASS |
| 7 | `normalizeSeries` | `null` ou `rates` vazio | `[]` | PASS |
| 8 | `filterRows` | Intervalo de datas de 1 dia | 1 registro | PASS |
| 9 | `filterRows` | Cotação mín. 4.9 e máx. 5 | `[4.9, 5.0]` | PASS |
| 10 | `filterRows` | Data inicial + cotação mínima | 1 registro (AND) | PASS |
| 11 | `filterRows` | Filtros vazios | Todos os registros | PASS |
| 12 | `sortRows` | Data asc/desc | Primeiro/último corretos | PASS |
| 13 | `sortRows` | Cotação desc; entrada intacta | Maior primeiro, sem mutação | PASS |
| 14 | `validateFilters` | Datas e cotações invertidas | Mensagem; `null` quando válido | PASS |
| 15 | `buildCsv` | 3 registros | Cabeçalho + 3 linhas | PASS |
| 16 | `buildCsv` | Aspas e vírgulas | Células escapadas | PASS |

## Manuais (UI)
Conversão com vírgula decimal, inversão de moedas, exportação com filtro ativo (linhas do CSV = linhas da tabela), botão de exportar desabilitado sem resultados.

`npm test` também executa `tests/frankfurterService.test.mjs` (serviço com `fetch` mockado, 7/7 passaram).

## Evidências dos testes manuais
- Conversão com valor decimal, gráfico, tabela e contador de registros: `docs/img/app-desktop-usd-brl.png`.
- Moedas iguais (botão Exportar CSV desabilitado, avisos no histórico e na tabela): `docs/img/app-moedas-iguais.png`.
- Exportação CSV com filtro/período ativo: `docs/evidencias/cotacoes_BRL-EUR_2026-09-29_a_2026-10-26.csv` (cabeçalho `Data,Moeda de origem,Moeda de destino,Cotacao` e datas dentro do intervalo do nome do arquivo).
