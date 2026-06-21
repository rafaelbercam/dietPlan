---
name: vue-conventions
description: Padroes transversais do frontend Vue 3 do DietPlan. Usar ao modificar componentes, paginas, store, composables, Tailwind, UI em portugues, modais ou fluxo de dados.
---

# Vue Conventions

## Quando usar esta skill

Use antes de qualquer mudanca estrutural em componentes Vue, paginas, store Pinia, composables, router ou UI compartilhada.

## Localizacao

- [src/App.vue](../../../src/App.vue)
- [src/main.ts](../../../src/main.ts)
- [tailwind.config.js](../../../tailwind.config.js)

## Padroes do projeto

- Vue 3 + Composition API com `<script setup lang="ts">`.
- Pinia instalado em `main.ts`; estado global via `useMealPlanStore`.
- Vue Router com historico em `import.meta.env.BASE_URL`.
- Tailwind CSS com tokens `surface`, `card`, `primary`, `secondary` e escalas `slate-*`, `emerald-*`, `sky-*`.
- UI em PT-BR: "refeicao", "substituicao", "periodo", "consulta", "cardapio".
- Datas armazenadas como `YYYY-MM-DD` e formatadas como `DD/MM/YYYY`.
- Icones com Material Symbols Outlined.
- Modais com `<teleport to="body">`, prop `open`, emit `close`.
- Sem slots no padrao atual; prefira props/emits ou componentes especificos.

## Ao modificar / estender

- Atualize tipos em [src/types/index.ts](../../../src/types/index.ts) antes de usar novos campos.
- Se alterar dados persistidos, revise [meal-plan-store](../meal-plan-store/SKILL.md) e migre versao.
- Se criar nova pagina, atualize [vue-router](../vue-router/SKILL.md) e [layout-sidebar](../layout-sidebar/SKILL.md) quando ela precisar aparecer na navegacao.
- Preserve acessibilidade basica: botoes com `type` quando em formularios, `title` para acoes icon-only quando necessario.

## Referencias

- [src/types/index.ts](../../../src/types/index.ts)
- [src/stores/mealPlan.store.ts](../../../src/stores/mealPlan.store.ts)
- [src/router/index.ts](../../../src/router/index.ts)
