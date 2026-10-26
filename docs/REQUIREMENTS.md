# Requisitos

## Contexto e objetivo
Aplicação web para consulta de câmbio sem cadastro. Objetivo: converter valores, analisar a evolução de um par de moedas e exportar os dados para uso externo.

## Público-alvo
Viajantes, estudantes, freelancers e pequenos negócios que precisam de referência rápida de câmbio (não é plataforma de negociação).

## Escopo
**Dentro:** conversor, gráfico histórico, tabela com filtros/ordenação, exportação CSV.
**Fora:** login, cotação em tempo real intradiária, criptomoedas, persistência de dados.

## Requisitos funcionais
| ID | Requisito |
|----|-----------|
| RF01 | Listar moedas dinamicamente via `/currencies`. |
| RF02 | Converter valor entre origem e destino, exibindo resultado, taxa e data da cotação. |
| RF03 | Inverter origem e destino com um clique. |
| RF04 | Validar valor (vazio, texto, zero e negativo são inválidos; aceita vírgula decimal). |
| RF05 | Exibir gráfico para 7d, 15d, 30d, 3m, 6m, 1a, 5a e 10a, atualizado ao mudar par ou período. |
| RF06 | Exibir tabela: Data, Origem, Destino, Cotação. |
| RF07 | Filtrar por intervalo de datas, cotação mínima e máxima (combináveis) e limpar filtros. |
| RF08 | Ordenar por data (asc/desc) e cotação (asc/desc). |
| RF09 | Mostrar quantidade de registros filtrados. |
| RF10 | Exportar CSV apenas dos registros filtrados, com cabeçalho e nome identificável. |

## Requisitos não funcionais
- RNF01 Responsivo (desktop e mobile, a partir de 360px).
- RNF02 Estados de `loading`, `error` e `empty` em todas as chamadas.
- RNF03 Requisições obsoletas são canceladas (AbortController).
- RNF04 Acessibilidade: labels, `aria-invalid`, `role="alert"`, foco visível.
- RNF05 Estilos isolados com CSS Modules.

## Regras de negócio
1. Valor convertido = valor × taxa da data mais recente publicada.
2. Moedas iguais: taxa 1; histórico indisponível com aviso.
3. Datas sem cotação (fins de semana/feriados) não aparecem; não há interpolação.
4. Filtros combinam com E lógico; campos vazios são ignorados.
5. Data inicial > final ou mínima > máxima: aviso e exportação bloqueada.
6. Exportação nunca gera arquivo vazio.

## Critérios de aceite
- CA01 Ao abrir, o app mostra USD→BRL com 100 convertidos e gráfico de 30 dias.
- CA02 Inverter troca os selects e recalcula resultado e gráfico.
- CA03 Digitar "abc" ou "-5" mostra erro e oculta o resultado.
- CA04 Com API offline, cada seção mostra mensagem de erro sem quebrar a página.
- CA05 O CSV baixado tem o mesmo número de linhas que a tabela mais o cabeçalho.
- CA06 Filtro sem resultados mostra mensagem e desabilita a exportação.
