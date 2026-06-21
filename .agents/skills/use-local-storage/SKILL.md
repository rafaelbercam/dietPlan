---
name: use-local-storage
description: Documenta composable useLocalStorage, ref persistido, SSR guard e deep watch. Usar ao alterar persistencia local, serializacao JSON ou comportamento de localStorage.
---

# Use Local Storage

## Localizacao

[src/composables/useLocalStorage.ts](../../../src/composables/useLocalStorage.ts)

## API

```ts
useLocalStorage<T>(key: string, initialValue: T)
```

Retorna um `ref<T>` inicializado com `localStorage[key]` quando existir, ou `initialValue`.

## Padroes

- Usa `typeof window !== 'undefined'` para evitar acesso fora do browser.
- Serializa com `JSON.stringify`.
- Desserializa com `JSON.parse`.
- `watch` profundo (`{ deep: true }`) persiste mutacoes internas.

## Ao modificar / estender

- Se adicionar tratamento de erro para JSON invalido, mantenha fallback para `initialValue`.
- Se trocar por `@vueuse/core`, revise todas as chaves e comportamento de deep watch.
- Evite side effects fora do watch para manter API previsivel.

## Referencias

- [meal-plan-store skill](../meal-plan-store/SKILL.md)
- [src/stores/mealPlan.store.ts](../../../src/stores/mealPlan.store.ts)
