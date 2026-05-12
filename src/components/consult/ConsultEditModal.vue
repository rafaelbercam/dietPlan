<template>
  <teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" @click="$emit('close')" />
      <div class="relative w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl">
        <div class="flex items-center gap-3">
          <div class="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100">
            <span class="material-symbols-outlined text-emerald-700" style="font-size: 20px;">person</span>
          </div>
          <h2 class="text-xl font-semibold text-slate-950">Dados da Consulta</h2>
        </div>

        <form class="mt-6 space-y-4" @submit.prevent="onSubmit">
          <div>
            <label class="block text-sm font-medium text-slate-700">Nutricionista responsável</label>
            <input
              v-model="nutritionist"
              type="text"
              required
              placeholder="Nome do(a) nutricionista"
              class="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700">Data da última consulta</label>
            <input
              v-model="lastConsultDate"
              type="date"
              required
              class="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700">Validade (dias)</label>
            <input
              v-model.number="expirationDays"
              type="number"
              min="1"
              required
              class="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900"
            />
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
import { ref, watch } from 'vue'
import type { ConsultInfo } from '../../types'

const props = defineProps<{ open: boolean; current: ConsultInfo }>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', payload: ConsultInfo): void
}>()

const nutritionist = ref(props.current.nutritionist)
const lastConsultDate = ref(props.current.lastConsultDate)
const expirationDays = ref(props.current.expirationDays)

watch(() => props.current, (val) => {
  nutritionist.value = val.nutritionist
  lastConsultDate.value = val.lastConsultDate
  expirationDays.value = val.expirationDays
})

function onSubmit() {
  emit('save', {
    nutritionist: nutritionist.value,
    lastConsultDate: lastConsultDate.value,
    expirationDays: expirationDays.value
  })
}
</script>
