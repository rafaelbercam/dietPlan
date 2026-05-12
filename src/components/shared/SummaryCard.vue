<template>
  <div class="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
    <div class="flex items-center gap-4">
      <div class="grid h-14 w-14 place-items-center rounded-3xl bg-emerald-100 shadow-sm">
        <span class="material-symbols-outlined text-emerald-800" style="font-size: 28px;">monitoring</span>
      </div>
      <div>
        <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Resumo diário</p>
        <p class="mt-1 text-lg font-semibold text-slate-950">Acompanhamento rápido</p>
      </div>
    </div>

    <div class="mt-6 grid gap-4">
      <div class="rounded-3xl bg-slate-50 p-4">
        <p class="text-sm text-slate-500">Refeições planejadas</p>
        <p class="mt-2 text-3xl font-semibold text-slate-950">{{ meals.length }}</p>
      </div>
      <div class="grid gap-3 sm:grid-cols-2">
        <div class="rounded-3xl bg-slate-50 p-4">
          <p class="text-sm text-slate-500">Substituições</p>
          <p class="mt-2 text-xl font-semibold text-slate-950">{{ availableReplacements }}</p>
        </div>
        <div class="rounded-3xl bg-slate-50 p-4">
          <p class="text-sm text-slate-500">Selecionadas</p>
          <p class="mt-2 text-xl font-semibold text-slate-950">{{ selectedReplacements }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Meal } from '../../types'

const props = defineProps<{
  meals: Meal[]
}>()

const selectedReplacements = computed(() => {
  return props.meals.reduce((total, meal) => {
    return (
      total +
      meal.foods.filter((food) => {
        if (!food.replaceable) return false
        if (food.multiSelect) return (food.selectedOptions?.length ?? 0) > 0
        return !!food.selectedOption
      }).length
    )
  }, 0)
})

const availableReplacements = computed(() => {
  return props.meals.reduce((total, meal) => {
    return total + meal.foods.filter((food) => food.replaceable && food.options?.length).length
  }, 0)
})
</script>
