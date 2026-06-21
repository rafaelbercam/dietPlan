---
name: consult-edit-modal
description: Documenta ConsultEditModal, edicao de ConsultInfo, watch em current e emit save. Usar ao editar dados da consulta, validade, nutricionista ou formulario.
---

# ConsultEditModal

## Localizacao

[src/components/consult/ConsultEditModal.vue](../../../src/components/consult/ConsultEditModal.vue)

## API do componente

| Prop/Emit | Tipo | Descricao |
| --- | --- | --- |
| `open` | `boolean` | Exibe modal via teleport. |
| `current` | `ConsultInfo` | Valores atuais da consulta. |
| emit `close` | `void` | Fecha modal. |
| emit `save` | `ConsultInfo` | Envia nutricionista, data e validade. |

## Padroes

- Refs locais espelham `current`.
- `watch(() => props.current, ...)` sincroniza quando o store muda.
- `expirationDays` usa `v-model.number`.

## Ao modificar / estender

- Se adicionar campo em `ConsultInfo`, atualize tipo, store default, modal e HomePage.
- Preserve `type="date"` para `lastConsultDate`.
- Nao feche internamente apos salvar; a pagina controla o fechamento.

## Referencias

- [src/types/index.ts](../../../src/types/index.ts)
- [page-home skill](../page-home/SKILL.md)
- [meal-plan-store skill](../meal-plan-store/SKILL.md)
