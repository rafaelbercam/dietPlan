---
name: save-plan-modal
description: Documenta SavePlanModal, formulario para salvar cardapio, datas e emit save. Usar ao editar modal de snapshot, validacao, labels ou fluxo de salvar periodo.
---

# SavePlanModal

## Localizacao

[src/components/period/SavePlanModal.vue](../../../src/components/period/SavePlanModal.vue)

## API do componente

| Prop/Emit | Tipo | Descricao |
| --- | --- | --- |
| `open` | `boolean` | Exibe modal via teleport. |
| emit `close` | `void` | Fecha modal. |
| emit `save` | `{ label: string; startDate: string; endDate: string }` | Envia dados para criar periodo. |

## Padroes

- Inputs usam `required`; datas usam `type="date"`.
- Depois de salvar, campos locais sao limpos.
- O pai fecha modal e chama `mealPlan.savePeriod`.

## Ao modificar / estender

- Se adicionar validacao de intervalo, mantenha payload ISO `YYYY-MM-DD`.
- Nao salve diretamente no store a partir do modal; preserve fluxo por emit.
- Ao mudar payload, atualize [page-home](../page-home/SKILL.md).

## Referencias

- [page-home skill](../page-home/SKILL.md)
- [meal-plan-store skill](../meal-plan-store/SKILL.md)
