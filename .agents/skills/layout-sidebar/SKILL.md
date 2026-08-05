---
name: layout-sidebar
description: Documenta Sidebar, navegacao lateral, prop open, emit close, rotas e badge de cardapios salvos. Usar ao editar menu, links, responsividade ou contagem de periodos.
---

# Layout Sidebar

## Localizacao

[src/components/layout/Sidebar.vue](../../../src/components/layout/Sidebar.vue)

## API do componente

| Item | Tipo | Descricao |
| --- | --- | --- |
| prop `open` | `boolean` | Controla visibilidade no mobile. |
| emit `close` | `void` | Fecha sidebar ao clicar no overlay, link ou botao fechar. |

## Dependencias

- `useRoute` para estado ativo.
- `useMealPlanStore` para badge de `savedPeriods.length`.
- `FileSyncControl` no rodape, para conectar/desconectar o arquivo `.json` local (ver [use-file-sync](../use-file-sync/SKILL.md)).
- Rotas `/` e `/cardapios`.

## Ao modificar / estender

- Ao adicionar uma rota navegavel, atualize `navItems` e [vue-router](../vue-router/SKILL.md).
- Mantenha fechamento automatico no mobile com `@click="$emit('close')"`.
- Preserve o badge somente quando houver contagem positiva.
- `FileSyncControl` so aparece quando `store.fileSync.isSupported` e true; nao remova essa checagem.

## Referencias

- [src/router/index.ts](../../../src/router/index.ts)
- [meal-plan-store skill](../meal-plan-store/SKILL.md)
- [use-file-sync skill](../use-file-sync/SKILL.md)
- [vue-conventions skill](../vue-conventions/SKILL.md)
