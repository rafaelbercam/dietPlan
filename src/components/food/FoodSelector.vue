<template>
  <div class="rounded-3xl border border-slate-200 bg-white p-4">
    <div class="flex items-center justify-between gap-3">
      <div>
        <p class="text-sm font-semibold text-slate-900">Substituição</p>
        <p class="mt-1 text-sm text-slate-500">Escolha uma opção equivalente.</p>
      </div>
      <span class="text-xs uppercase tracking-[0.2em] text-slate-400">{{ food.amount }}</span>
    </div>

    <FoodOptionList
      class="mt-4"
      :options="food.options"
      :selected="selectedOptionId"
      @select="handleSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FoodItem } from '../../types'
import FoodOptionList from './FoodOptionList.vue'

const props = defineProps<{ mealId: string; food: FoodItem }>()
const emit = defineEmits<{
  (e: 'change', payload: { foodId: string; optionId: string }): void
}>()

const selectedOptionId = computed(() => props.food.selectedOption?.id || props.food.options?.[0]?.id || '')

function handleSelect(optionId: string) {
  emit('change', {
    foodId: props.food.id,
    optionId
  })
}
</script>
