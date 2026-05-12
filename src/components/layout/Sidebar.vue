<template>
  <aside
    class="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0"
    :class="open ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="flex h-16 items-center gap-3 border-b border-slate-100 px-5">
      <div class="grid h-9 w-9 place-items-center rounded-xl bg-emerald-100">
        <span class="material-symbols-outlined text-emerald-700" style="font-size: 20px;">restaurant</span>
      </div>
      <span class="text-lg font-semibold tracking-tight text-slate-950">DietPlan</span>
      <button class="ml-auto lg:hidden" @click="$emit('close')">
        <span class="material-symbols-outlined text-slate-400" style="font-size: 22px;">close</span>
      </button>
    </div>

    <nav class="flex-1 space-y-1 px-3 py-4">
      <router-link
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors"
        :class="isActive(item.to) ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'"
        @click="$emit('close')"
      >
        <span class="material-symbols-outlined" style="font-size: 20px;">{{ item.icon }}</span>
        {{ item.label }}
        <span
          v-if="item.badge !== undefined && item.badge > 0"
          class="ml-auto inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-emerald-100 px-1.5 text-xs font-semibold text-emerald-700"
        >
          {{ item.badge }}
        </span>
      </router-link>
    </nav>

    <div class="border-t border-slate-100 p-4">
      <p class="text-xs text-slate-400">Plano Alimentar</p>
      <p class="mt-0.5 text-xs text-slate-500">Rafael Berçam</p>
    </div>
  </aside>

  <div
    v-if="open"
    class="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
    @click="$emit('close')"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMealPlanStore } from '../../stores/mealPlan.store'

defineProps<{ open: boolean }>()
defineEmits<{ (e: 'close'): void }>()

const route = useRoute()
const store = useMealPlanStore()

const navItems = computed(() => [
  { to: '/', icon: 'calendar_today', label: 'Plano Atual', badge: undefined },
  { to: '/cardapios', icon: 'history', label: 'Cardápios Salvos', badge: store.savedPeriods.length }
])

function isActive(path: string) {
  return route.path === path
}
</script>
