<template>
  <teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" @click="$emit('close')" />
      <div class="relative w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl">
        <div class="flex items-center gap-3">
          <div class="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100">
            <span class="material-symbols-outlined text-emerald-700" style="font-size: 20px;">bookmark_add</span>
          </div>
          <h2 class="text-xl font-semibold text-slate-950">Salvar Cardápio</h2>
        </div>

        <form class="mt-6 space-y-4" @submit.prevent="onSubmit">
          <div>
            <label class="block text-sm font-medium text-slate-700">Nome do cardápio</label>
            <input
              v-model="label"
              type="text"
              required
              placeholder="Ex: Semana 12/05 a 16/05"
              class="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-slate-700">Data início</label>
              <input
                v-model="startDate"
                type="date"
                required
                class="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700">Data fim</label>
              <input
                v-model="endDate"
                type="date"
                required
                class="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900"
              />
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              class="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
              @click="$emit('close')"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              <span class="material-symbols-outlined" style="font-size: 18px;">save</span>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ open: boolean }>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', payload: { label: string; startDate: string; endDate: string }): void
}>()

const label = ref('')
const startDate = ref('')
const endDate = ref('')

function onSubmit() {
  if (!label.value || !startDate.value || !endDate.value) return
  emit('save', {
    label: label.value,
    startDate: startDate.value,
    endDate: endDate.value
  })
  label.value = ''
  startDate.value = ''
  endDate.value = ''
}
</script>
