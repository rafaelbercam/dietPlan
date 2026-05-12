<template>
  <div class="rounded-3xl border border-slate-200 bg-white p-4">
    <div class="flex items-center justify-between gap-3">
      <div>
        <p class="text-sm font-semibold text-slate-900">Seleção múltipla</p>
        <p class="mt-1 text-sm text-slate-500">Escolha uma ou mais opções.</p>
      </div>
      <span class="text-xs uppercase tracking-[0.2em] text-slate-400">{{ food.amount }}</span>
    </div>

    <div v-if="currentSelections.length" class="mt-3 flex flex-wrap gap-2">
      <span
        v-for="opt in currentSelections"
        :key="opt.id"
        class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200/60"
      >
        {{ opt.name }}
        <button
          class="grid h-4 w-4 place-items-center rounded-full transition hover:bg-emerald-200"
          @click="toggleOption(opt.id)"
        >
          <span class="material-symbols-outlined" style="font-size: 14px;">close</span>
        </button>
      </span>
    </div>

    <div class="mt-3 relative">
      <button
        type="button"
        class="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition hover:border-slate-300"
        @click="dropdownOpen = !dropdownOpen"
      >
        <span>{{ currentSelections.length ? `${currentSelections.length} selecionado(s)` : 'Selecionar opções...' }}</span>
        <span class="material-symbols-outlined text-slate-400" style="font-size: 20px;">{{ dropdownOpen ? 'expand_less' : 'expand_more' }}</span>
      </button>

      <div
        v-if="dropdownOpen"
        class="absolute left-0 right-0 z-10 mt-1 max-h-56 overflow-y-auto rounded-2xl border border-slate-200 bg-white py-1 shadow-lg"
      >
        <label
          v-for="option in food.options"
          :key="option.id"
          class="flex cursor-pointer items-center gap-3 px-4 py-2.5 transition hover:bg-slate-50"
        >
          <input
            type="checkbox"
            :checked="isSelected(option.id)"
            class="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            @change="toggleOption(option.id)"
          />
          <span class="text-sm text-slate-900">{{ option.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { FoodItem, FoodOption } from '../../types'

const props = defineProps<{ mealId: string; food: FoodItem }>()
const emit = defineEmits<{
  (e: 'toggle', payload: { foodId: string; optionId: string }): void
}>()

const dropdownOpen = ref(false)

const currentSelections = computed<FoodOption[]>(() => props.food.selectedOptions || [])

function isSelected(optionId: string) {
  return currentSelections.value.some((o) => o.id === optionId)
}

function toggleOption(optionId: string) {
  emit('toggle', { foodId: props.food.id, optionId })
}
</script>
