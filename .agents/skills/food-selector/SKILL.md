---
name: food-selector
description: Documenta FoodSelector e selecao unica de substituicao. Usar ao editar wrapper de FoodOptionList, selectedOption, emit change ou alimento substituivel.
---

# FoodSelector

## Localizacao

[src/components/food/FoodSelector.vue](../../../src/components/food/FoodSelector.vue)

## API do componente

| Prop/Emit | Tipo | Descricao |
| --- | --- | --- |
| `mealId` | `string` | Id da refeicao; mantido para contexto do pai. |
| `food` | `FoodItem` | Alimento substituivel com `options`. |
| emit `change` | `{ foodId: string; optionId: string }` | Informa selecao unica ao `MealCard`. |

## Dependencias

- [FoodOptionList.vue](../../../src/components/food/FoodOptionList.vue)
- Tipo `FoodItem`.

## Padroes

- `selectedOptionId` usa `food.selectedOption?.id` ou primeira opcao como fallback visual.
- Nao chama store diretamente; o `MealCard` faz a mutacao.

## Ao modificar / estender

- Se mudar payload, atualize [meal-card](../meal-card/SKILL.md) e `updateFoodSelection`.
- Se permitir opcoes vazias, trate `selectedOptionId` e UI sem quebrar `FoodOptionList`.

## Referencias

- [food-option-list skill](../food-option-list/SKILL.md)
- [meal-plan-store skill](../meal-plan-store/SKILL.md)
