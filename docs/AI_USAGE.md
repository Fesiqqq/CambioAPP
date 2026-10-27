# Uso de IA

**Ferramenta:** Claude (Anthropic), em conversa de chat.

## O que a IA fez
- Propôs a arquitetura (hooks, serviço, utilitários, CSS Modules) e gerou o código-fonte de React/Vite.
- Redigiu a documentação (requisitos, componentes, testes de API e de funções).
- Escreveu e executou os testes das funções puras e do serviço (com `fetch` mockado).

## Limites e verificação humana necessária
- O ambiente de geração não tinha acesso à internet: a Frankfurter API **não foi chamada**, o Postman **não foi executado** e `npm install`/`vite build` **não foram rodados**.
- Os componentes React não foram renderizados nem testados visualmente; faça os testes manuais descritos em `docs/FUNCTION_TESTS.md`.
- Revise o código antes de entregar e registre aqui eventuais ajustes feitos por você.

## Prompts principais
1. Especificação do app (stack, funcionalidades, estrutura, documentação).
2. Roteiro de 10 etapas evolutivas com commits semânticos e status de testes.
