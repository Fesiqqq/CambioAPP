# Protótipos (Figma)

**Link do Figma:** _COLE AQUI O LINK PÚBLICO DO ARQUIVO_

## Checklist exigido
| Item | Status | Evidência |
|---|---|---|
| Wireframe de baixa fidelidade | ☐ pendente | `docs/img/wireframe.png` |
| Protótipo de média fidelidade (desktop) | ☐ pendente | `docs/img/prototipo-desktop.png` |
| Adaptação mobile | ☐ pendente | `docs/img/prototipo-mobile.png` |
| Estados: loading, erro e ausência de dados | ☐ pendente | `docs/img/estados.png` |

Marque como concluído somente o que existir no arquivo do Figma.

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
