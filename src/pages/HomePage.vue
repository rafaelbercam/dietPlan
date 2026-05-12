<template>
  <main class="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
    <section class="mb-6 rounded-[2rem] bg-white/80 p-6 shadow-[0_28px_80px_-40px_rgba(16,185,129,0.55)] ring-1 ring-emerald-200/70 hero-panel lg:p-8">
      <div class="grid gap-6 lg:grid-cols-[1.8fr_1fr] lg:items-center">
        <div class="space-y-5">
          <div class="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm ring-1 ring-emerald-200/70">
            <span class="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            Plano ativo
          </div>
          <div>
            <h1 class="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Sua jornada alimentar hoje</h1>
            <p class="mt-3 max-w-2xl text-base leading-7 text-slate-700">Organize seu plano com substituições inteligentes e acompanhe cada refeição em um layout moderno, inspirado em apps de delivery e bem-estar.</p>
          </div>
          <div class="grid gap-3 sm:grid-cols-2">
            <div class="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-emerald-600" style="font-size: 20px;">restaurant_menu</span>
                <p class="text-sm uppercase tracking-[0.24em] text-slate-500">Refeições</p>
              </div>
              <p class="mt-3 text-2xl font-semibold text-slate-950">{{ meals.length }}</p>
              <p class="mt-2 text-sm text-slate-600">Cards fáceis para revisar e alterar cada refeição.</p>
            </div>
            <div class="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-emerald-600" style="font-size: 20px;">swap_horiz</span>
                <p class="text-sm uppercase tracking-[0.24em] text-slate-500">Opções de substituição</p>
              </div>
              <p class="mt-3 text-2xl font-semibold text-slate-950">{{ availableReplacements }}</p>
              <p class="mt-2 text-sm text-slate-600">Escolhas dinâmicas por categoria para manter a equivalência.</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col items-center gap-4 lg:items-end">
          <div class="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg">
            <SummaryCard :meals="meals" />
          </div>
          <div class="flex w-full max-w-md gap-3">
            <button
              class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              @click="showSaveModal = true"
            >
              <span class="material-symbols-outlined" style="font-size: 18px;">bookmark_add</span>
              Salvar Cardápio
            </button>
            <button
              class="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50"
              @click="onReset"
            >
              <span class="material-symbols-outlined" style="font-size: 18px;">restart_alt</span>
              Resetar
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="grid gap-6">
      <MealCard
        v-for="meal in meals"
        :key="meal.id"
        :meal="meal"
      />
    </section>

    <SavePlanModal
      :open="showSaveModal"
      @close="showSaveModal = false"
      @save="onSavePeriod"
    />
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMealPlanStore } from '../stores/mealPlan.store'
import { storeToRefs } from 'pinia'
import MealCard from '../components/meal/MealCard.vue'
import SummaryCard from '../components/shared/SummaryCard.vue'
import SavePlanModal from '../components/period/SavePlanModal.vue'

const mealPlan = useMealPlanStore()
const { meals } = storeToRefs(mealPlan)

const showSaveModal = ref(false)

const availableReplacements = computed(() => {
  return meals.value.reduce((total, meal) => {
    return total + meal.foods.filter((food) => food.replaceable && food.options?.length).length
  }, 0)
})

function onSavePeriod(payload: { label: string; startDate: string; endDate: string }) {
  mealPlan.savePeriod(payload.label, payload.startDate, payload.endDate)
  showSaveModal.value = false
}

function onReset() {
  mealPlan.resetToDefaults()
}
</script>
