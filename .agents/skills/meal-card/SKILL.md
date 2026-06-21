---
name: meal-card
description: Documenta MealCard e padroes para refeicoes, categorias, substituicoes unicas e multiSelect. Usar ao modificar card de refeicao, alimentos, badges ou logica de selecao.
---

# MealCard

## Localizacao

[src/components/meal/MealCard.vue](../../../src/components/meal/MealCard.vue)

## API do componente

| Prop | Tipo | Descricao |
| --- | --- | --- |
| `meal` | `Meal` | Refeicao com horario, titulo e alimentos. |

## Dependencias

- `useMealPlanStore`
- [FoodSelector.vue](../../../src/components/food/FoodSelector.vue)
- [FoodMultiSelector.vue](../../../src/components/food/FoodMultiSelector.vue)
- Tipos `Meal` e `FoodCategory`

## Padroes

- `completedCount` considera alimento fixo como completo.
- Para substituicao unica usa `selectedOption`.
- Para `multiSelect` usa `selectedOptions`.
- Mapas locais definem icone, cor e label por `FoodCategory`.

## Ao modificar / estender

- Ao adicionar categoria, atualize `FoodCategory`, dados default e todos os mapas locais.
- Ao mudar payload dos seletores, ajuste `onChangeSelection` ou `onToggleMultiSelection`.
- Mutacoes devem continuar centralizadas em [meal-plan-store](../meal-plan-store/SKILL.md).

## Referencias

- [src/types/index.ts](../../../src/types/index.ts)
- [food-selector skill](../food-selector/SKILL.md)
- [food-multi-selector skill](../food-multi-selector/SKILL.md)
