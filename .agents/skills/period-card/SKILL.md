---
name: period-card
description: Documenta PeriodCard, cardapios salvos, status active/inactive/upcoming, accordion, delete e impressao. Usar ao editar periodos, exibicao de refeicoes ou print.
---

# PeriodCard

## Localizacao

[src/components/period/PeriodCard.vue](../../../src/components/period/PeriodCard.vue)

## API do componente

| Prop/Emit | Tipo | Descricao |
| --- | --- | --- |
| `period` | `MealPlanPeriod` | Snapshot salvo de refeicoes. |
| `status` | `'active' \| 'inactive' \| 'upcoming'` | Controla badge, cor e icone. |
| `expanded` | `boolean` | Controla accordion. |
| emit `delete` | `void` | Solicita exclusao ao pai. |
| emit `toggle` | `void` | Alterna expansao no pai. |

## Dependencias

- Tipos `MealPlanPeriod` e `FoodItem`.
- `window.open` para impressao.

## Padroes

- `foodDisplayValue` prioriza `selectedOptions`, depois `selectedOption`, depois `amount`.
- `formatDate` converte ISO para `DD/MM/YYYY`.
- HTML de impressao e montado localmente e chama `window.print()`.

## Ao modificar / estender

- Ao alterar status, atualize mapas de borda, icone, badge, label e print.
- Se mudar snapshot de periodo, ajuste [meal-plan-store](../meal-plan-store/SKILL.md).
- Cuidado com interpolacao no HTML de impressao caso passe a aceitar texto externo livre.

## Referencias

- [page-saved-plans skill](../page-saved-plans/SKILL.md)
- [src/types/index.ts](../../../src/types/index.ts)
