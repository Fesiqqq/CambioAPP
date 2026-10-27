# Uso de IA

**Ferramenta:** Claude (Anthropic), em conversa de chat.

## O que a IA fez
- Propôs a arquitetura (hooks, serviço, utilitários, CSS Modules) e gerou o código-fonte de React/Vite.
- Redigiu a documentação (requisitos, componentes, testes de API e de funções).
- Escreveu e executou os testes das funções puras e do serviço (com `fetch` mockado).

## Limites e verificação humana necessária
- O ambiente de geração da IA não tinha acesso à internet: a IA não chamou a Frankfurter API, não executou o Postman nem rodou `npm install`/`vite build`. Esses testes foram feitos localmente pelo autor, com prints em `docs/img/` (aplicação) e CSV em `docs/evidencias/`; os resultados do Postman devem ser registrados em `docs/API_TESTS.md`.
- Os componentes React foram validados visualmente pelo autor no navegador; demais testes manuais estão em `docs/FUNCTION_TESTS.md`.
- Revise o código antes de entregar e registre aqui eventuais ajustes feitos por você.

## Prompts principais
1. Especificação do app (stack, funcionalidades, estrutura, documentação).
2. Roteiro de 10 etapas evolutivas com commits semânticos e status de testes.
