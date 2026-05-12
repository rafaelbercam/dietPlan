<template>
  <div class="rounded-[1.5rem] border bg-white shadow-sm" :class="borderClass">
    <div class="flex items-center gap-4 p-5">
      <div class="grid h-12 w-12 shrink-0 place-items-center rounded-2xl" :class="iconBg">
        <span class="material-symbols-outlined" style="font-size: 22px;" :class="iconColor">{{ statusIcon }}</span>
      </div>
      <div class="min-w-0 flex-1">
        <p class="font-semibold text-slate-950">{{ period.label }}</p>
        <p class="mt-0.5 text-sm text-slate-500">{{ formatDate(period.startDate) }} — {{ formatDate(period.endDate) }}</p>
      </div>
      <span class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider" :class="badgeClass">
        {{ statusLabel }}
      </span>
      <button
        class="grid h-9 w-9 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        @click="$emit('toggle')"
      >
        <span class="material-symbols-outlined" style="font-size: 20px;">{{ expanded ? 'expand_less' : 'expand_more' }}</span>
      </button>
      <button
        class="grid h-9 w-9 place-items-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-500"
        @click="$emit('delete')"
      >
        <span class="material-symbols-outlined" style="font-size: 20px;">delete_outline</span>
      </button>
    </div>

    <div v-if="expanded" class="border-t border-slate-100 p-5">
      <div class="space-y-3">
        <div
          v-for="meal in period.meals"
          :key="meal.id"
          class="rounded-xl border border-slate-100 bg-slate-50 p-4"
        >
          <div class="flex items-center gap-2">
            <span class="text-xs font-medium uppercase tracking-wider text-slate-400">{{ meal.time }}</span>
            <span class="font-semibold text-slate-900">{{ meal.title }}</span>
          </div>
          <ul class="mt-2 space-y-1">
            <li
              v-for="food in meal.foods"
              :key="food.id"
              class="flex items-center gap-2 text-sm text-slate-600"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-slate-300"></span>
              <span>{{ food.name }}</span>
              <span class="text-slate-400">—</span>
              <span class="text-slate-500">{{ food.selectedOption ? food.selectedOption.name : food.amount }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MealPlanPeriod } from '../../types'

const props = defineProps<{
  period: MealPlanPeriod
  status: 'active' | 'inactive' | 'upcoming'
  expanded: boolean
}>()

defineEmits<{
  (e: 'delete'): void
  (e: 'toggle'): void
}>()

const borderClass = computed(() => ({
  active: 'border-emerald-200',
  inactive: 'border-slate-200 opacity-70',
  upcoming: 'border-sky-200'
}[props.status]))

const iconBg = computed(() => ({
  active: 'bg-emerald-100',
  inactive: 'bg-slate-100',
  upcoming: 'bg-sky-100'
}[props.status]))

const iconColor = computed(() => ({
  active: 'text-emerald-600',
  inactive: 'text-slate-400',
  upcoming: 'text-sky-600'
}[props.status]))

const statusIcon = computed(() => ({
  active: 'radio_button_checked',
  inactive: 'history',
  upcoming: 'schedule'
}[props.status]))

const badgeClass = computed(() => ({
  active: 'bg-emerald-100 text-emerald-700',
  inactive: 'bg-slate-100 text-slate-500',
  upcoming: 'bg-sky-100 text-sky-700'
}[props.status]))

const statusLabel = computed(() => ({
  active: 'Ativo',
  inactive: 'Inativo',
  upcoming: 'Futuro'
}[props.status]))

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}
</script>
