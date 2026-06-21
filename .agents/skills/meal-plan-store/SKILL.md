---
name: meal-plan-store
description: Documenta useMealPlanStore, estado Pinia, actions, migracao v4 e chaves localStorage. Usar ao alterar refeicoes, periodos, consulta, persistencia, CURRENT_VERSION ou schema.
---

# Meal Plan Store

## Localizacao

[src/stores/mealPlan.store.ts](../../../src/stores/mealPlan.store.ts)

## Estado e chaves

| Item | Chave/Tipo | Descricao |
| --- | --- | --- |
| `meals` | `meal-plan-state` / `Meal[]` | Plano atual. |
| `savedPeriods` | `meal-plan-periods` / `MealPlanPeriod[]` | Snapshots salvos. |
| `consultInfo` | `meal-plan-consult` / `ConsultInfo` | Dados da consulta. |
| `CURRENT_VERSION` | `4` | Versao do schema persistido. |

## Computeds

- `consultExpiration`: data de expiracao, dias restantes e flag `expired`.
- `activePeriods`: periodos que incluem hoje.
- `inactivePeriods`: periodos encerrados.
- `upcomingPeriods`: periodos futuros.

## Actions

- `updateFoodSelection(mealId, foodId, optionId)`
- `toggleFoodMultiSelection(mealId, foodId, optionId)`
- `getSelectedOption(mealId, foodId)`
- `savePeriod(label, startDate, endDate)`
- `deletePeriod(periodId)`
- `resetToDefaults()`
- `updateConsultInfo(info)`

## Migracao

`migrateMeals` compara dados persistidos com `getDefaultMealPlan()`, adiciona/remover alimentos, atualiza metadados, preserva selecoes validas e trata `multiSelect`.

## Ao modificar / estender

- Ao mudar schema de `Meal`, `FoodItem`, `MealPlanPeriod` ou `ConsultInfo`, atualize tipos e considere incrementar `CURRENT_VERSION`.
- Snapshots usam `JSON.parse(JSON.stringify(meals.value))`; revise se tipos deixarem de ser serializaveis.
- Mantenha guards para ids invalidos em actions.

## Referencias

- [src/types/index.ts](../../../src/types/index.ts)
- [src/services/mealPlanService.ts](../../../src/services/mealPlanService.ts)
- [use-local-storage skill](../use-local-storage/SKILL.md)
