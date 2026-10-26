# Testes da API Frankfurter

> **Importante:** o ambiente em que este projeto foi gerado não tinha acesso à internet. Os casos abaixo são o **roteiro de testes com resultados esperados** (formato documentado da API). Execute os `curl` e preencha a coluna "Resultado real" na sua máquina.

Base: `https://api.frankfurter.app`

| # | Endpoint | Esperado | Tratamento no app | Resultado real |
|---|---|---|---|---|
| 1 | `GET /currencies` | 200; objeto `{ "USD": "United States Dollar", ... }` | Popula os selects | ☐ |
| 2 | `GET /latest?from=USD&to=BRL` | 200; `{ amount:1, base:"USD", date, rates:{ BRL:n } }` | Taxa e data exibidas | ☐ |
| 3 | `GET /2024-01-01..2024-01-31?from=USD&to=BRL` | 200; `rates` por data útil | Gráfico e tabela | ☐ |
| 4 | Série de 5 a 10 anos | 200; pontos agregados (semanal/mensal) | Menos pontos, sem erro | ☐ |
| 5 | `GET /latest?from=USD&to=USD` | Erro 4xx (origem = destino) | Evitado: o app não chama; usa taxa 1 | ☐ |
| 6 | `GET /latest?from=XXX&to=BRL` | 404 (moeda inexistente) | "Não há cotação publicada…" | ☐ |
| 7 | Série em período sem dados | 200 com `rates` vazio, ou 404 | Estado vazio no gráfico/tabela | ☐ |
| 8 | Rede desligada | `fetch` lança `TypeError` | "Não foi possível conectar à API…" | ☐ |
| 9 | Troca rápida de par/período | Requisição anterior abortada | `AbortError` ignorado; só a última atualiza a tela | ☐ |

## Comandos
```bash
curl "https://api.frankfurter.app/currencies"
curl "https://api.frankfurter.app/latest?from=USD&to=BRL"
curl "https://api.frankfurter.app/2024-01-01..2024-01-31?from=USD&to=BRL"
curl -i "https://api.frankfurter.app/latest?from=XXX&to=BRL"
```

## Postman
Coleção em `docs/postman/frankfurter.postman_collection.json` (4 requisições com testes de status e formato: moedas, última cotação, série histórica e moeda inválida).
Como executar: Postman → **Import** → selecionar o arquivo → **Run collection**. Anexe os prints dos resultados em `docs/img/` e marque a coluna "Resultado real" da tabela acima.
