# Testes da API Frankfurter

> Investigação dos endpoints da API. A coluna "Resultado real" vem da execução no Postman (seção abaixo) e do uso do app.

Base: `https://api.frankfurter.dev/v1` (a documentação oficial marca a v1 como descontinuada, mas ainda em funcionamento; a v2 é a recomendada para novos projetos. O projeto usa a v1 com os parâmetros `base` e `symbols`.)

| # | Endpoint | Esperado | Tratamento no app | Resultado real |
|---|---|---|---|---|
| 1 | `GET /currencies` | 200; objeto `{ "USD": "United States Dollar", ... }` | Popula os selects | ✅ 200 (Postman) |
| 2 | `GET /latest?base=USD&symbols=BRL` | 200; `{ amount:1, base:"USD", date, rates:{ BRL:n } }` | Taxa e data exibidas | ✅ 200 (Postman) |
| 3 | `GET /2024-01-01..2024-01-31?base=USD&symbols=BRL` | 200; `rates` por data útil | Gráfico e tabela | ✅ 200 (Postman) |
| 5 | `GET /latest?base=USD&symbols=USD` | Erro 4xx (origem = destino) | Evitado: o app não chama; usa taxa 1 | ✅ app não chama a API; ver `docs/img/app-moedas-iguais.png` |
| 6 | `GET /latest?base=XXX&symbols=BRL` | 404 (moeda inexistente) | "Não há cotação publicada…" | ✅ 404 (Postman) |
| 10 | Data de fim de semana/feriado | Esperado: a API devolve a cotação do último dia útil anterior (**confirmar no Postman** e anotar aqui) | Datas sem cotação não aparecem na tabela | ✅ 200; a API devolve a cotação do último dia útil anterior (24/10 sábado → 23/10 sexta, 5,0465); ver `docs/img/postman-sabado.png` |

## Comandos
```bash
curl "https://api.frankfurter.dev/v1/currencies"
curl "https://api.frankfurter.dev/v1/latest?base=USD&symbols=BRL"
curl "https://api.frankfurter.dev/v1/2024-01-01..2024-01-31?base=USD&symbols=BRL"
curl -i "https://api.frankfurter.dev/v1/latest?base=XXX&symbols=BRL"
```

## Postman
Coleção exportada: `docs/postman/frankfurter.postman_collection.json` (6 requisições com testes automáticos; as URLs são absolutas, **não é preciso configurar variáveis nem ambiente**).

Como reproduzir: Postman → **Import** → arquivo acima → conferir que a URL começa com `https://api.frankfurter.dev/v1/` → **Run collection**.

### Resultado da execução (Collection Runner, 26/10/2026, 22:06)
**11 testes executados, 11 passaram, 0 falharam, 0 erros.** Duração: 3 s 127 ms; tempo médio de resposta: 385 ms.

![Resultado do Collection Runner](docs/img/postman-run.png)

| # | Requisição | Status real | Testes | Resultado |
|---|---|---|---|---|
| 1 | `GET /currencies` | 200 | Status 200; contém USD e BRL | ✅ |
| 2 | `GET /latest?base=EUR&symbols=USD` | 200 (444 ms) | Status 200; base EUR e taxa numérica | ✅ |
| 3 | `GET /latest?base=USD&symbols=BRL` | 200 (15 ms) | Status 200; taxa BRL numérica e data presente | ✅ |
| 4 | `GET /2024-01-01..2024-01-31?base=USD&symbols=BRL` | 200 (454 ms) | Status 200; possui várias datas | ✅ |
| 5 | `GET /2026-10-24?base=USD&symbols=BRL` (sábado) | 200 (454 ms) | Status 200; retorna campo `date` | ✅ pediu **2026-10-24 (sábado)** e a API devolveu `date: 2026-10-23` (sexta-feira), taxa 5,0465 |
| 6 | `GET /latest?base=XXX&symbols=BRL` (moeda inexistente) | **404** (437 ms) | Erro 4xx para moeda inexistente | ✅ |

![Resposta da requisição do sábado: date 2026-10-23](docs/img/postman-sabado.png)

### Conclusões da investigação
- Moeda inexistente devolve **404**, tratado pelo app com a mensagem "Não há cotação publicada para os parâmetros informados".
- Consulta a uma data sem publicação (sábado) **não gera erro**: a API responde 200 com o campo `date`, indicando a data da cotação efetiva (consulta a 2026-10-24, sábado, devolveu `date: 2026-10-23`: a API entrega a cotação do último dia útil anterior).
- A lista de moedas, a última cotação e a série histórica respondem 200 com o formato usado pelo app (`rates`, `date`, `base`).

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
