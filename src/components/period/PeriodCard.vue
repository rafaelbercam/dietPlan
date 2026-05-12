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
        class="grid h-9 w-9 place-items-center rounded-xl text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-600"
        title="Imprimir cardápio"
        @click="printPeriod"
      >
        <span class="material-symbols-outlined" style="font-size: 20px;">print</span>
      </button>
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
              <span class="text-slate-500">{{ foodDisplayValue(food) }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MealPlanPeriod, FoodItem } from '../../types'

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

function foodDisplayValue(food: FoodItem): string {
  if (food.multiSelect && food.selectedOptions?.length) {
    return food.selectedOptions.map((o) => o.name).join(', ')
  }
  if (food.selectedOption) return food.selectedOption.name
  return food.amount
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

function printPeriod() {
  const mealSections = props.period.meals.map((meal) => {
    const rows = meal.foods.map((food) => {
      const selection = foodDisplayValue(food)
      return `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;font-weight:500;color:#0f172a;">${food.name}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#475569;">${food.amount}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#059669;font-weight:500;">${selection !== food.amount ? selection : '—'}</td>
        </tr>`
    }).join('')

    return `
      <div style="margin-bottom:24px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;padding-bottom:8px;border-bottom:2px solid #10b981;">
          <span style="font-size:12px;text-transform:uppercase;letter-spacing:0.15em;color:#64748b;font-weight:600;">${meal.time}</span>
          <span style="font-size:16px;font-weight:700;color:#0f172a;">${meal.title}</span>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:13px;">
          <thead>
            <tr style="background:#f8fafc;">
              <th style="padding:8px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#64748b;border-bottom:2px solid #e2e8f0;font-weight:600;">Alimento</th>
              <th style="padding:8px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#64748b;border-bottom:2px solid #e2e8f0;font-weight:600;">Quantidade</th>
              <th style="padding:8px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#64748b;border-bottom:2px solid #e2e8f0;font-weight:600;">Seleção</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`
  }).join('')

  const statusMap: Record<string, string> = {
    active: '🟢 Ativo',
    inactive: '⚫ Inativo',
    upcoming: '🔵 Futuro'
  }

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>${props.period.label} — Plano Alimentar</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:Inter,system-ui,-apple-system,sans-serif; color:#0f172a; padding:32px; }
    @media print { body { padding:16px; } }
  </style>
</head>
<body>
  <div style="max-width:700px;margin:0 auto;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;padding-bottom:16px;border-bottom:3px solid #10b981;">
      <div>
        <h1 style="font-size:22px;font-weight:700;color:#0f172a;margin-bottom:4px;">${props.period.label}</h1>
        <p style="font-size:14px;color:#64748b;">${formatDate(props.period.startDate)} — ${formatDate(props.period.endDate)}</p>
      </div>
      <div style="text-align:right;">
        <span style="display:inline-block;padding:4px 12px;border-radius:999px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;background:#f0fdf4;color:#15803d;">
          ${statusMap[props.status]}
        </span>
        <p style="font-size:11px;color:#94a3b8;margin-top:6px;">Impresso em ${new Date().toLocaleString('pt-BR')}</p>
      </div>
    </div>

    ${mealSections}

    <div style="margin-top:16px;padding-top:12px;border-top:1px solid #e2e8f0;text-align:center;">
      <p style="font-size:11px;color:#94a3b8;">${props.period.meals.length} refeições • ${props.period.meals.reduce((acc, m) => acc + m.foods.length, 0)} itens no total</p>
    </div>
  </div>

  <script>window.onload=function(){window.print();}<\/script>
</body>
</html>`

  const printWindow = window.open('', '_blank', 'width=800,height=600')
  if (!printWindow) return
  printWindow.document.write(html)
  printWindow.document.close()
}
</script>
