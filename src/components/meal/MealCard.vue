<template>
  <article ref="cardRef" class="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_-18px_rgba(15,23,42,0.12)]">
    <header class="mb-5 flex flex-col gap-4 rounded-[1.75rem] border border-slate-200/80 bg-gradient-to-r from-emerald-50 to-slate-50 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div class="space-y-2">
        <p class="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">{{ meal.time }}</p>
        <h2 class="text-2xl font-semibold tracking-tight text-slate-950">{{ meal.title }}</h2>
      </div>
      <div class="flex items-center gap-2">
        <button
          class="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50 hover:text-slate-700 print:hidden"
          @click="printCard"
        >
          <span class="material-symbols-outlined" style="font-size: 16px;">print</span>
          Imprimir
        </button>
        <span class="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
          <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span class="material-symbols-outlined" style="font-size: 18px;">check_circle</span>
          </span>
          {{ completedCount }} de {{ meal.foods.length }} itens
        </span>
      </div>
    </header>

    <div class="space-y-4">
      <div
        v-for="food in meal.foods"
        :key="food.id"
        class="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4 shadow-sm"
      >
        <div class="flex flex-wrap items-center gap-4">
          <div class="grid h-12 w-12 place-items-center rounded-3xl shadow-sm" :class="categoryIconBg(food.category)">
            <span class="material-symbols-outlined" style="font-size: 22px;" :class="categoryIconColor(food.category)">{{ categoryIcon(food.category) }}</span>
          </div>
          <div class="min-w-0 flex-1">
            <p class="font-semibold text-slate-950">{{ food.name }}</p>
            <p class="mt-1 text-sm text-slate-600">{{ food.amount }}</p>
            <div v-if="food.multiSelect && food.selectedOptions?.length" class="mt-1.5 flex flex-wrap gap-1">
              <span
                v-for="opt in food.selectedOptions"
                :key="opt.id"
                class="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200/60"
              >{{ opt.name }}</span>
            </div>
            <p v-else-if="food.selectedOption" class="mt-1 text-xs text-emerald-600 font-medium">{{ food.selectedOption.name }}</p>
          </div>
          <span class="inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]" :class="categoryBadge(food.category)">
            {{ categoryLabel(food.category) }}
          </span>
        </div>

        <div v-if="food.replaceable && food.multiSelect && food.options" class="mt-4 print-hide">
          <FoodMultiSelector
            :mealId="meal.id"
            :food="food"
            @toggle="onToggleMultiSelection"
          />
        </div>

        <div v-else-if="food.replaceable && food.options" class="mt-4 print-hide">
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
import { ref, computed } from 'vue'
import { useMealPlanStore } from '../../stores/mealPlan.store'
import type { Meal, FoodCategory } from '../../types'
import FoodSelector from '../food/FoodSelector.vue'
import FoodMultiSelector from '../food/FoodMultiSelector.vue'

const props = defineProps<{ meal: Meal }>()
const mealStore = useMealPlanStore()
const cardRef = ref<HTMLElement | null>(null)

const completedCount = computed(() => {
  return props.meal.foods.filter((food) => {
    if (!food.replaceable) return true
    if (food.multiSelect) return (food.selectedOptions?.length ?? 0) > 0
    return !!food.selectedOption
  }).length
})

function printCard() {
  if (!cardRef.value) return

  const printWindow = window.open('', '_blank', 'width=800,height=600')
  if (!printWindow) return

  const foodRows = props.meal.foods.map((food) => {
    let selection = ''
    if (food.multiSelect && food.selectedOptions?.length) {
      selection = food.selectedOptions.map((o) => o.name).join(', ')
    } else if (food.selectedOption) {
      selection = food.selectedOption.name
    }

    return `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#0f172a;">
          ${food.name}
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#475569;">
          ${food.amount}
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">
          <span style="display:inline-block;padding:2px 10px;border-radius:999px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;background:#f0fdf4;color:#15803d;">
            ${categoryLabel(food.category)}
          </span>
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#059669;font-weight:500;">
          ${selection || '—'}
        </td>
      </tr>`
  }).join('')

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>${props.meal.title} — Plano Alimentar</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:Inter,system-ui,-apple-system,sans-serif; color:#0f172a; padding:32px; }
    @media print {
      body { padding:16px; }
      .no-print { display:none; }
    }
  </style>
</head>
<body>
  <div style="max-width:700px;margin:0 auto;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;padding-bottom:16px;border-bottom:2px solid #10b981;">
      <div>
        <p style="font-size:12px;text-transform:uppercase;letter-spacing:0.2em;color:#64748b;margin-bottom:4px;">${props.meal.time}</p>
        <h1 style="font-size:24px;font-weight:700;color:#0f172a;">${props.meal.title}</h1>
      </div>
      <div style="text-align:right;">
        <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#94a3b8;">Plano Alimentar</p>
        <p style="font-size:13px;color:#64748b;margin-top:2px;">${new Date().toLocaleDateString('pt-BR')}</p>
      </div>
    </div>

    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <thead>
        <tr style="background:#f8fafc;">
          <th style="padding:10px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#64748b;border-bottom:2px solid #e2e8f0;">Alimento</th>
          <th style="padding:10px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#64748b;border-bottom:2px solid #e2e8f0;">Quantidade</th>
          <th style="padding:10px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#64748b;border-bottom:2px solid #e2e8f0;">Categoria</th>
          <th style="padding:10px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#64748b;border-bottom:2px solid #e2e8f0;">Seleção</th>
        </tr>
      </thead>
      <tbody>
        ${foodRows}
      </tbody>
    </table>

    <div style="margin-top:24px;padding-top:16px;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
      <p style="font-size:12px;color:#94a3b8;">${props.meal.foods.length} itens no total</p>
      <p style="font-size:12px;color:#94a3b8;">Impresso em ${new Date().toLocaleString('pt-BR')}</p>
    </div>
  </div>

  <script>window.onload=function(){window.print();}<\/script>
</body>
</html>`

  printWindow.document.write(html)
  printWindow.document.close()
}

const categoryIcon = (category: FoodCategory) => {
  const map: Record<FoodCategory, string> = {
    fruit: 'nutrition',
    meat: 'kebab_dining',
    carb: 'bakery_dining',
    vegetable: 'eco',
    drink: 'water_drop',
    supplement: 'science',
    dessert: 'cake',
    dairy: 'local_cafe'
  }
  return map[category]
}

const categoryIconBg = (category: FoodCategory) => {
  const map: Record<FoodCategory, string> = {
    fruit: 'bg-orange-50',
    meat: 'bg-red-50',
    carb: 'bg-amber-50',
    vegetable: 'bg-emerald-50',
    drink: 'bg-sky-50',
    supplement: 'bg-violet-50',
    dessert: 'bg-pink-50',
    dairy: 'bg-blue-50'
  }
  return map[category]
}

const categoryIconColor = (category: FoodCategory) => {
  const map: Record<FoodCategory, string> = {
    fruit: 'text-orange-600',
    meat: 'text-red-600',
    carb: 'text-amber-600',
    vegetable: 'text-emerald-600',
    drink: 'text-sky-600',
    supplement: 'text-violet-600',
    dessert: 'text-pink-600',
    dairy: 'text-blue-600'
  }
  return map[category]
}

const categoryBadge = (category: FoodCategory) => {
  const map: Record<FoodCategory, string> = {
    fruit: 'bg-orange-100 text-orange-700',
    meat: 'bg-red-100 text-red-700',
    carb: 'bg-amber-100 text-amber-700',
    vegetable: 'bg-emerald-100 text-emerald-700',
    drink: 'bg-sky-100 text-sky-700',
    supplement: 'bg-violet-100 text-violet-700',
    dessert: 'bg-pink-100 text-pink-700',
    dairy: 'bg-blue-100 text-blue-700'
  }
  return map[category]
}

const categoryLabel = (category: FoodCategory) => {
  const map: Record<FoodCategory, string> = {
    fruit: 'Fruta',
    meat: 'Proteína',
    carb: 'Carboidrato',
    vegetable: 'Vegetal',
    drink: 'Bebida',
    supplement: 'Suplemento',
    dessert: 'Sobremesa',
    dairy: 'Laticínio'
  }
  return map[category]
}

function onChangeSelection(payload: { foodId: string; optionId: string }) {
  mealStore.updateFoodSelection(props.meal.id, payload.foodId, payload.optionId)
}

function onToggleMultiSelection(payload: { foodId: string; optionId: string }) {
  mealStore.toggleFoodMultiSelection(props.meal.id, payload.foodId, payload.optionId)
}
</script>
