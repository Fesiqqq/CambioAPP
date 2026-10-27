# Testes da API Frankfurter

> **Importante:** o ambiente em que este projeto foi gerado não tinha acesso à internet. Os casos abaixo são o **roteiro de testes com resultados esperados** (formato documentado da API). Execute os `curl` e preencha a coluna "Resultado real" na sua máquina.

Base: `https://api.frankfurter.dev/v1` (a documentação oficial marca a v1 como descontinuada, mas ainda em funcionamento; a v2 é a recomendada para novos projetos. O projeto usa a v1 com os parâmetros `base` e `symbols`.)

| # | Endpoint | Esperado | Tratamento no app | Resultado real |
|---|---|---|---|---|
| 1 | `GET /currencies` | 200; objeto `{ "USD": "United States Dollar", ... }` | Popula os selects | ☐ |
| 2 | `GET /latest?base=USD&symbols=BRL` | 200; `{ amount:1, base:"USD", date, rates:{ BRL:n } }` | Taxa e data exibidas | ☐ |
| 3 | `GET /2024-01-01..2024-01-31?base=USD&symbols=BRL` | 200; `rates` por data útil | Gráfico e tabela | ☐ |
| 4 | Série de 5 a 10 anos | 200; pontos agregados (semanal/mensal) | Menos pontos, sem erro | ☐ |
| 5 | `GET /latest?base=USD&symbols=USD` | Erro 4xx (origem = destino) | Evitado: o app não chama; usa taxa 1 | ☐ |
| 6 | `GET /latest?base=XXX&symbols=BRL` | 404 (moeda inexistente) | "Não há cotação publicada…" | ☐ |
| 7 | Série em período sem dados | 200 com `rates` vazio, ou 404 | Estado vazio no gráfico/tabela | ☐ |
| 8 | Rede desligada | `fetch` lança `TypeError` | "Não foi possível conectar à API…" | ☐ |
| 10 | Data de fim de semana/feriado | Esperado: a API devolve a cotação do último dia útil anterior (**confirmar no Postman** e anotar aqui) | Datas sem cotação não aparecem na tabela | ☐ |
| 9 | Troca rápida de par/período | Requisição anterior abortada | `AbortError` ignorado; só a última atualiza a tela | ☐ |

## Comandos
```bash
curl "https://api.frankfurter.dev/v1/currencies"
curl "https://api.frankfurter.dev/v1/latest?base=USD&symbols=BRL"
curl "https://api.frankfurter.dev/v1/2024-01-01..2024-01-31?base=USD&symbols=BRL"
curl -i "https://api.frankfurter.dev/v1/latest?base=XXX&symbols=BRL"
```

## Postman
Importe `docs/postman/frankfurter.postman_collection.json` (4 requisições com asserções de status e formato) e execute com o Collection Runner. O ambiente de geração não tinha internet, então a coluna "Resultado real" deve ser preenchida por você.

## Teste automatizado com mock de `fetch`
`node tests/frankfurterService.test.mjs` valida URLs montadas, 404, 500, falha de rede e repasse de `AbortError`: **7/7 passaram**.

## Evidências de execução na aplicação (dados reais)
Executado localmente com `npm run dev` em 26/10/2026:

| Verificação | Evidência | Resultado |
|---|---|---|
| Moedas carregadas dinamicamente | `docs/img/app-desktop-usd-brl.png` | Selects preenchidos pela API |
| Última cotação USD→BRL | mesma imagem | 1 USD = 5,5884 BRL em 26/10/2026; 1.500 USD = R$ 8.382,60 (conferido: 1500 × 5,5884) |
| Série histórica de 30 dias | mesma imagem | Gráfico e 22 registros na tabela, todos em dias úteis |
| Origem = destino | `docs/img/app-moedas-iguais.png` | Taxa 1,0000 no conversor; histórico mostra "Escolha moedas diferentes para ver o histórico." |
| Exportação CSV | `docs/evidencias/cotacoes_BRL-EUR_2026-09-29_a_2026-10-26.csv` | Cabeçalho + 20 linhas; nome `cotacoes_BRL-EUR_<início>_a_<fim>.csv` |

### Observações
- Em 26/10/2026 a cotação aparece cerca de 10% acima da de 23/10 (USD/BRL 5,0465 → 5,5884). O mesmo salto aparece no par BRL→EUR do CSV (0,17704 → 0,15994), então vem da própria API e não de cálculo da aplicação. A documentação da Frankfurter indica que dados do dia corrente podem ser atualizados em novas publicações; confirmar no Postman.
- Para moedas iguais, a data exibida no conversor usa a data UTC do navegador (por isso pode mostrar o dia seguinte à noite no Brasil). Não afeta pares de moedas diferentes, cuja data vem da API.
