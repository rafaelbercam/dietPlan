---
name: food-multi-selector
description: Documenta FoodMultiSelector, chips, dropdown e selecao multipla selectedOptions. Usar ao editar multi-select, toggle, chips ou substituicoes multiplas.
---

# FoodMultiSelector

## Localizacao

[src/components/food/FoodMultiSelector.vue](../../../src/components/food/FoodMultiSelector.vue)

## API do componente

| Prop/Emit | Tipo | Descricao |
| --- | --- | --- |
| `mealId` | `string` | Id da refeicao; mantido para contexto do pai. |
| `food` | `FoodItem` | Alimento com `multiSelect`, `options` e `selectedOptions`. |
| emit `toggle` | `{ foodId: string; optionId: string }` | Alterna opcao selecionada. |

## Dependencias

- `ref` para `dropdownOpen`.
- `computed<FoodOption[]>` para `currentSelections`.

## Padroes

- Chips mostram `selectedOptions`.
- Dropdown usa checkboxes e delega persistencia para o store via `MealCard`.

## Ao modificar / estender

- Preserve a possibilidade de zero, uma ou varias selecoes.
- Se adicionar fechamento automatico ou clique fora, garanta que chips continuem removendo opcoes.
- Se alterar payload, atualize `toggleFoodMultiSelection`.

## Referencias

- [meal-card skill](../meal-card/SKILL.md)
- [meal-plan-store skill](../meal-plan-store/SKILL.md)
