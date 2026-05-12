<template>
  <main class="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
    <div class="mb-6">
      <h1 class="text-3xl font-semibold tracking-tight text-slate-950">Cardápios Salvos</h1>
      <p class="mt-2 text-base text-slate-600">Visualize seus cardápios organizados por período.</p>
    </div>

    <section v-if="store.activePeriods.length" class="mb-8">
      <h2 class="mb-4 flex items-center gap-2 text-lg font-semibold text-emerald-700">
        <span class="material-symbols-outlined" style="font-size: 20px;">radio_button_checked</span>
        Ativos
      </h2>
      <div class="grid gap-4">
        <PeriodCard
          v-for="period in store.activePeriods"
          :key="period.id"
          :period="period"
          status="active"
          @delete="store.deletePeriod(period.id)"
          @toggle="toggleExpanded(period.id)"
          :expanded="expandedId === period.id"
        />
      </div>
    </section>

    <section v-if="store.upcomingPeriods.length" class="mb-8">
      <h2 class="mb-4 flex items-center gap-2 text-lg font-semibold text-sky-700">
        <span class="material-symbols-outlined" style="font-size: 20px;">schedule</span>
        Futuros
      </h2>
      <div class="grid gap-4">
        <PeriodCard
          v-for="period in store.upcomingPeriods"
          :key="period.id"
          :period="period"
          status="upcoming"
          @delete="store.deletePeriod(period.id)"
          @toggle="toggleExpanded(period.id)"
          :expanded="expandedId === period.id"
        />
      </div>
    </section>

    <section v-if="store.inactivePeriods.length" class="mb-8">
      <h2 class="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-500">
        <span class="material-symbols-outlined" style="font-size: 20px;">history</span>
        Inativos
      </h2>
      <div class="grid gap-4">
        <PeriodCard
          v-for="period in store.inactivePeriods"
          :key="period.id"
          :period="period"
          status="inactive"
          @delete="store.deletePeriod(period.id)"
          @toggle="toggleExpanded(period.id)"
          :expanded="expandedId === period.id"
        />
      </div>
    </section>

    <div
      v-if="!store.savedPeriods.length"
      class="flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-slate-200 bg-white/60 py-16 text-center"
    >
      <span class="material-symbols-outlined text-slate-300" style="font-size: 48px;">bookmark_border</span>
      <p class="mt-4 text-lg font-medium text-slate-500">Nenhum cardápio salvo</p>
      <p class="mt-1 text-sm text-slate-400">Salve um cardápio na página do Plano Atual para ele aparecer aqui.</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMealPlanStore } from '../stores/mealPlan.store'
import PeriodCard from '../components/period/PeriodCard.vue'

const store = useMealPlanStore()
const expandedId = ref<string | null>(null)

function toggleExpanded(id: string) {
  expandedId.value = expandedId.value === id ? null : id
}
</script>
