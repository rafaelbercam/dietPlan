---
name: vue-router
description: Documenta Vue Router, rotas / e /cardapios, createWebHistory e BASE_URL para deploy. Usar ao alterar navegacao, nomes de rota, GitHub Pages ou sidebar.
---

# Vue Router

## Localizacao

[src/router/index.ts](../../../src/router/index.ts)

## Rotas

| Path | Name | Componente |
| --- | --- | --- |
| `/` | `home` | `HomePage` |
| `/cardapios` | `saved-plans` | `SavedPlansPage` |

## Padroes

- `createWebHistory(import.meta.env.BASE_URL)` respeita `base` do Vite.
- `build:docs` usa `VITE_BASE_PATH=/dietPlan/` para GitHub Pages.
- Sidebar compara `route.path` com `item.to`.

## Ao modificar / estender

- Ao adicionar rota, atualize [layout-sidebar](../layout-sidebar/SKILL.md) se ela for navegavel.
- Nao altere `BASE_URL` sem revisar [vite.config.ts](../../../vite.config.ts), `build:docs` e deploy.
- Prefira nomes de rota estaveis e em ingles tecnico.

## Referencias

- [src/pages/HomePage.vue](../../../src/pages/HomePage.vue)
- [src/pages/SavedPlansPage.vue](../../../src/pages/SavedPlansPage.vue)
- [layout-sidebar skill](../layout-sidebar/SKILL.md)
