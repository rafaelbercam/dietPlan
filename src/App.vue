<template>
  <div class="min-h-screen bg-surface text-slate-900">
    <Sidebar :open="sidebarOpen" @close="sidebarOpen = false" />

    <div class="lg:pl-64">
      <header class="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur lg:hidden">
        <button
          class="grid h-9 w-9 place-items-center rounded-xl text-slate-600 transition hover:bg-slate-100"
          @click="sidebarOpen = true"
        >
          <span class="material-symbols-outlined" style="font-size: 22px;">menu</span>
        </button>
        <span class="text-sm font-semibold text-slate-950">DietPlan</span>
      </header>

      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from './components/layout/Sidebar.vue'

const sidebarOpen = ref(false)
</script>
