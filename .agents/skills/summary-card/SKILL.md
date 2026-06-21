---
name: summary-card
description: Documenta SummaryCard, resumo diario e computeds de substituicoes. Usar ao editar contadores, apresentacao do resumo ou metricas de refeicoes.
---

# SummaryCard

## Localizacao

[src/components/shared/SummaryCard.vue](../../../src/components/shared/SummaryCard.vue)

## API do componente

| Prop | Tipo | Descricao |
| --- | --- | --- |
| `meals` | `Meal[]` | Refeicoes usadas para calcular metricas. |

## Padroes

- Componente presentational puro, sem acesso ao store.
- `availableReplacements` conta alimentos substituiveis com `options`.
- `selectedReplacements` conta substituicoes unicas e multiplas ja escolhidas.

## Ao modificar / estender

- Se criar novas metricas, derive tudo de `meals`.
- Mantenha o componente sem actions e sem persistencia.
- Alinhe qualquer contador duplicado em [page-home](../page-home/SKILL.md).

## Referencias

- [src/types/index.ts](../../../src/types/index.ts)
- [page-home skill](../page-home/SKILL.md)
