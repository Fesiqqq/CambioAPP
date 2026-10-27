# Protótipos (Figma)

**Link do protótipo (Figma Make):** [Conversor de Moedas com Gráficos](https://www.figma.com/make/0Z1YaJ28RLsaVOhh6nzTLg/Conversor-de-Moedas-com-Gr%C3%A1ficos?t=gICA2YKj77tSTgVk-20&fullscreen=1)

Autor: Fernando Siqueira.

## Checklist exigido
| Item | Status | Evidência |
|---|---|---|
| Wireframe de baixa fidelidade | ✅ | Protótipo no link acima |
| Protótipo de média fidelidade (desktop) | ✅ | Protótipo no link acima |
| Adaptação mobile | ✅ | Protótipo no link acima |
| Estados: loading, erro e ausência de dados | ✅ | Protótipo no link acima |

## Especificação visual usada na implementação
| Token | Valor |
|---|---|
| Fundo | `#eef2ef` |
| Superfície | `#ffffff` |
| Texto | `#14261f` |
| Texto secundário | `#5d6f67` |
| Borda | `#d5ded9` |
| Destaque | `#0f6b4f` |
| Erro | `#b3361f` |
| Raio | 10px (cards), 8px (campos), 999px (chips) |
| Fonte | Instrument Sans 400/500/600/700 |

## Layout (coluna única, largura máx. 1000px)
```
Header
[ Conversor: Valor | De | ⇄ | Para ]  → resultado, taxa, data
[ Histórico: botões de período ]       → gráfico de linha
[ Cotações: filtros + exportar ]       → contador → tabela rolável
Rodapé
```

## Breakpoints
- ≤ 720px: campos do conversor empilhados, botão ⇄ centralizado.
- ≤ 480px: margens laterais de 12px.
