<template>
  <article class="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_-18px_rgba(15,23,42,0.12)]">
    <header class="mb-5 flex flex-col gap-4 rounded-[1.75rem] border border-slate-200/80 bg-gradient-to-r from-emerald-50 to-slate-50 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div class="space-y-2">
        <p class="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">{{ meal.time }}</p>
        <h2 class="text-2xl font-semibold tracking-tight text-slate-950">{{ meal.title }}</h2>
      </div>
      <span class="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
        <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">✓</span>
        {{ completedCount }} de {{ meal.foods.length }} itens
      </span>
    </header>

    <div class="space-y-4">
      <div
        v-for="food in meal.foods"
        :key="food.id"
        class="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4 shadow-sm"
      >
        <div class="flex flex-wrap items-center gap-4">
          <div class="grid h-12 w-12 place-items-center rounded-3xl bg-white text-2xl shadow-sm">
            {{ categoryIcon(food.category) }}
          </div>
          <div class="min-w-0 flex-1">
            <p class="font-semibold text-slate-950">{{ food.name }}</p>
            <p class="mt-1 text-sm text-slate-600">{{ food.amount }}</p>
          </div>
          <span class="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
            {{ categoryLabel(food.category) }}
          </span>
        </div>

        <div v-if="food.replaceable && food.options" class="mt-4">
          <FoodSelector
            :mealId="meal.id"
            :food="food"
            @change="onChangeSelection"
          />
        </div>

        <div v-else-if="food.replaceable" class="mt-4 text-sm text-slate-500">
          Sem opções disponíveis
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMealPlanStore } from '../../stores/mealPlan.store'
import type { Meal } from '../../types'
import FoodSelector from '../food/FoodSelector.vue'

const props = defineProps<{ meal: Meal }>()
const mealStore = useMealPlanStore()

const completedCount = computed(() => {
  return props.meal.foods.filter((food) => !food.replaceable || food.selectedOption).length
})

const categoryIcon = (category: string) => {
  const map: Record<string, string> = {
    fruit: '🍌',
    meat: '🍗',
    carb: '🥖',
    vegetable: '🥦',
    drink: '🥛',
    supplement: '🌿'
  }

  return map[category] ?? '🍽️'
}

const categoryLabel = (category: string) => {
  const map: Record<string, string> = {
    fruit: 'Fruta',
    meat: 'Proteína',
    carb: 'Carboidrato',
    vegetable: 'Vegetal',
    drink: 'Bebida',
    supplement: 'Suplemento'
  }

  return map[category] ?? category
}

function onChangeSelection(payload: { foodId: string; optionId: string }) {
  mealStore.updateFoodSelection(props.meal.id, payload.foodId, payload.optionId)
}
</script>
