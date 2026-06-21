---
name: page-saved-plans
description: Documenta SavedPlansPage, cardapios salvos, grupos ativo/futuro/inativo e accordion expandedId. Usar ao editar historico, periodos salvos ou exclusao.
---

# Page Saved Plans

## Localizacao

[src/pages/SavedPlansPage.vue](../../../src/pages/SavedPlansPage.vue)

## Dependencias

- `useMealPlanStore`
- [PeriodCard.vue](../../../src/components/period/PeriodCard.vue)

## Fluxos

- Renderiza `activePeriods`, `upcomingPeriods` e `inactivePeriods`.
- `expandedId` permite um periodo expandido por vez.
- `delete` chama `store.deletePeriod(period.id)`.
- Estado vazio aparece quando `savedPeriods.length` e zero.

## Ao modificar / estender

- Se alterar classificacao de periodos, atualize computeds no store.
- Se permitir multiplos accordions abertos, troque `expandedId` por conjunto de ids.
- Preserve os status aceitos por [period-card](../period-card/SKILL.md).

## Referencias

- [meal-plan-store skill](../meal-plan-store/SKILL.md)
- [period-card skill](../period-card/SKILL.md)
