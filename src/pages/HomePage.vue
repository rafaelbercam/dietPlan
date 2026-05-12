<template>
  <main class="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
    <section class="mb-6 rounded-[2rem] bg-white/80 p-6 shadow-[0_28px_80px_-40px_rgba(16,185,129,0.55)] ring-1 ring-emerald-200/70 hero-panel lg:p-8">
      <div class="grid gap-6 lg:grid-cols-[1.8fr_1fr] lg:items-center">
        <div class="space-y-5">
          <div class="flex flex-wrap items-center gap-2">
            <div class="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm ring-1 ring-emerald-200/70">
              <span class="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              Plano ativo
            </div>
            <div
              class="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm ring-1"
              :class="consultExpiration.expired
                ? 'bg-red-50 text-red-700 ring-red-200/70'
                : 'bg-emerald-50 text-emerald-700 ring-emerald-200/70'"
            >
              <span class="material-symbols-outlined" style="font-size: 16px;">{{ consultExpiration.expired ? 'warning' : 'verified' }}</span>
              {{ consultExpiration.expired ? 'Dieta expirada' : 'Dieta em dia' }}
            </div>
          </div>

          <div>
            <h1 class="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Sua jornada alimentar hoje</h1>

            <div class="mt-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:gap-6">
              <div class="flex items-center gap-3">
                <div class="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100">
                  <span class="material-symbols-outlined text-emerald-700" style="font-size: 20px;">person</span>
                </div>
                <div>
                  <p class="text-xs uppercase tracking-wider text-slate-400">Nutricionista</p>
                  <p class="font-semibold text-slate-900">{{ consultInfo.nutritionist }}</p>
                </div>
              </div>
              <div class="hidden h-8 w-px bg-slate-200 sm:block"></div>
              <div class="flex items-center gap-3">
                <div class="grid h-10 w-10 place-items-center rounded-xl bg-sky-100">
                  <span class="material-symbols-outlined text-sky-700" style="font-size: 20px;">event</span>
                </div>
                <div>
                  <p class="text-xs uppercase tracking-wider text-slate-400">Última consulta</p>
                  <p class="font-semibold text-slate-900">{{ formatDate(consultInfo.lastConsultDate) }}</p>
                </div>
              </div>
              <div class="hidden h-8 w-px bg-slate-200 sm:block"></div>
              <div class="flex items-center gap-3">
                <div
                  class="grid h-10 w-10 place-items-center rounded-xl"
                  :class="consultExpiration.expired ? 'bg-red-100' : 'bg-amber-100'"
                >
                  <span
                    class="material-symbols-outlined"
                    style="font-size: 20px;"
                    :class="consultExpiration.expired ? 'text-red-700' : 'text-amber-700'"
                  >timer</span>
                </div>
                <div>
                  <p class="text-xs uppercase tracking-wider text-slate-400">Validade</p>
                  <p class="font-semibold" :class="consultExpiration.expired ? 'text-red-600' : 'text-slate-900'">
                    {{ consultExpiration.expired
                      ? `Expirada há ${Math.abs(consultExpiration.daysRemaining)} dias`
                      : `${consultExpiration.daysRemaining} dias restantes` }}
                  </p>
                </div>
              </div>
              <button
                class="ml-auto grid h-9 w-9 shrink-0 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                @click="showConsultModal = true"
              >
                <span class="material-symbols-outlined" style="font-size: 18px;">edit</span>
              </button>
            </div>
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

    <ConsultEditModal
      :open="showConsultModal"
      :current="consultInfo"
      @close="showConsultModal = false"
      @save="onSaveConsult"
    />
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMealPlanStore } from '../stores/mealPlan.store'
import { storeToRefs } from 'pinia'
import type { ConsultInfo } from '../types'
import MealCard from '../components/meal/MealCard.vue'
import SummaryCard from '../components/shared/SummaryCard.vue'
import SavePlanModal from '../components/period/SavePlanModal.vue'
import ConsultEditModal from '../components/consult/ConsultEditModal.vue'

const mealPlan = useMealPlanStore()
const { meals, consultInfo, consultExpiration } = storeToRefs(mealPlan)

const showSaveModal = ref(false)
const showConsultModal = ref(false)

const availableReplacements = computed(() => {
  return meals.value.reduce((total, meal) => {
    return total + meal.foods.filter((food) => food.replaceable && food.options?.length).length
  }, 0)
})

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

function onSavePeriod(payload: { label: string; startDate: string; endDate: string }) {
  mealPlan.savePeriod(payload.label, payload.startDate, payload.endDate)
  showSaveModal.value = false
}

function onSaveConsult(info: ConsultInfo) {
  mealPlan.updateConsultInfo(info)
  showConsultModal.value = false
}

function onReset() {
  mealPlan.resetToDefaults()
}
</script>
