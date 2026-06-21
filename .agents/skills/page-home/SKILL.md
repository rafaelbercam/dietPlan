---
name: page-home
description: Documenta HomePage, plano atual, orquestracao de MealCard, SummaryCard, SavePlanModal, ConsultEditModal, reset e salvar periodo. Usar ao editar tela inicial ou fluxo principal.
---

# Page Home

## Localizacao

[src/pages/HomePage.vue](../../../src/pages/HomePage.vue)

## Dependencias

- `useMealPlanStore` com `storeToRefs`.
- [MealCard.vue](../../../src/components/meal/MealCard.vue)
- [SummaryCard.vue](../../../src/components/shared/SummaryCard.vue)
- [SavePlanModal.vue](../../../src/components/period/SavePlanModal.vue)
- [ConsultEditModal.vue](../../../src/components/consult/ConsultEditModal.vue)

## Fluxos

- Salvar cardapio: abre `SavePlanModal`, recebe payload, chama `mealPlan.savePeriod` e fecha modal.
- Editar consulta: abre `ConsultEditModal`, recebe `ConsultInfo`, chama `updateConsultInfo` e fecha modal.
- Resetar: chama `mealPlan.resetToDefaults`.
- Refeicoes: renderiza `MealCard` para cada item de `meals`.

## Padroes

- `consultExpiration` vem do store.
- `availableReplacements` e calculado localmente para hero.
- `formatDate` converte ISO para `DD/MM/YYYY`.

## Ao modificar / estender

- Ao mover contadores para shared, sincronize com [summary-card](../summary-card/SKILL.md).
- Ao mudar payload de modal, atualize modal e store.
- Evite mutacao direta de `meals`; use actions do store.

## Referencias

- [meal-plan-store skill](../meal-plan-store/SKILL.md)
- [meal-card skill](../meal-card/SKILL.md)
