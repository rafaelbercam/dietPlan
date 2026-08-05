<template>
  <div v-if="fileSync.isSupported" class="rounded-2xl bg-slate-50 p-3">
    <p class="text-xs font-medium text-slate-500">Sincronizacao em arquivo</p>

    <div v-if="fileSync.status === 'connected'" class="mt-2 flex items-center justify-between gap-2">
      <div class="flex min-w-0 items-center gap-1.5">
        <span class="material-symbols-outlined text-emerald-600" style="font-size: 18px;">cloud_done</span>
        <span class="truncate text-xs text-slate-700" :title="fileSync.fileName">{{ fileSync.fileName }}</span>
      </div>
      <button
        type="button"
        class="shrink-0 text-xs font-medium text-slate-400 hover:text-slate-600"
        title="Desconectar arquivo"
        @click="fileSync.disconnect()"
      >
        desconectar
      </button>
    </div>

    <button
      v-else
      type="button"
      class="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:border-emerald-400 hover:text-emerald-700"
      @click="fileSync.connect()"
    >
      <span class="material-symbols-outlined" style="font-size: 18px;">upload_file</span>
      Conectar arquivo .json
    </button>

    <p v-if="fileSync.status === 'error'" class="mt-1.5 text-xs text-red-500">
      {{ fileSync.errorMessage || 'Falha ao sincronizar o arquivo.' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useMealPlanStore } from '../../stores/mealPlan.store'

const store = useMealPlanStore()
const fileSync = store.fileSync
</script>
