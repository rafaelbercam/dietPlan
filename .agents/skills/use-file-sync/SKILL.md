---
name: use-file-sync
description: Documenta useFileSync, sincronizacao do plano com um arquivo .json local via File System Access API, handle persistido em IndexedDB e FileSyncControl. Usar ao alterar sincronizacao em arquivo, permissao de escrita ou UI de conectar/desconectar.
---

# Use File Sync

## Localizacao

- [src/composables/useFileSync.ts](../../../src/composables/useFileSync.ts)
- [src/types/file-system-access.d.ts](../../../src/types/file-system-access.d.ts)
- [src/components/shared/FileSyncControl.vue](../../../src/components/shared/FileSyncControl.vue)

## API

```ts
useFileSync(getSnapshot: () => unknown)
```

Retorna `{ isSupported, status, fileName, errorMessage, connect, disconnect }`.

- `isSupported`: `boolean` simples (nao reativo), true quando `window.showSaveFilePicker` existe (Chrome/Edge).
- `status`: `'unsupported' | 'disconnected' | 'connected' | 'error'`.
- `connect()`: abre `showSaveFilePicker`, guarda o `FileSystemFileHandle` em IndexedDB e grava o snapshot atual.
- `disconnect()`: limpa handle em memoria e no IndexedDB.

## Padroes

- Grava com debounce de 500ms sempre que `getSnapshot()` muda (`watch(getSnapshot, ..., { deep: true })`), mesmo padrao de deep watch do [use-local-storage](../use-local-storage/SKILL.md).
- `FileSystemFileHandle` nao serializa em `localStorage`; e persistido via IndexedDB (`idbSet`/`idbGet`/`idbDelete` no proprio composable) porque `structuredClone` suporta handles.
- Ao recarregar a pagina, tenta restaurar o handle salvo e verifica `queryPermission({mode:'readwrite'})`; so reconecta automaticamente se a permissao ja estiver `granted` (browsers exigem gesto do usuario para `requestPermission`, entao sem permissao o status volta para `disconnected` e o usuario reconecta manualmente).
- `src/types/file-system-access.d.ts` complementa `lib.dom.d.ts` com `showSaveFilePicker`, `queryPermission` e `requestPermission`, que a versao do TypeScript do projeto ainda nao inclui.
- Este composable e independente do `useLocalStorage`; o localStorage continua sendo a fonte de verdade padrao, o arquivo e uma copia espelhada e opcional.

## Integracao com a store

`mealPlan.store.ts` chama `useFileSync` com um snapshot combinando `meals`, `savedPeriods` e `consultInfo`, e expoe o resultado como `store.fileSync`. Veja [meal-plan-store](../meal-plan-store/SKILL.md).

## Ao modificar / estender

- Se adicionar novos campos ao snapshot gravado no arquivo, mantenha consistencia com o que e persistido em `localStorage` pela store.
- Se mudar a estrategia de permissao (ex.: pedir `requestPermission` em vez de so `queryPermission` na restauracao), documente a nova UX de reconexao.
- `FileSyncControl.vue` so renderiza quando `isSupported` e true; nao adicione fallback de escrita real para browsers sem suporte (Firefox/Safari) sem revisar antes com o usuario.

## Referencias

- [use-local-storage skill](../use-local-storage/SKILL.md)
- [meal-plan-store skill](../meal-plan-store/SKILL.md)
- [layout-sidebar skill](../layout-sidebar/SKILL.md)
