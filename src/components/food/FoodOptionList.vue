<template>
  <div class="space-y-3">
    <template v-if="mode === 'radio'">
      <label
        v-for="option in options"
        :key="option.id"
        class="group flex cursor-pointer items-center gap-4 rounded-3xl border border-slate-200 bg-white px-4 py-4 transition hover:border-primary/60 hover:bg-primary/5"
      >
        <input
          type="radio"
          :value="option.id"
          :checked="option.id === selected"
          class="h-4 w-4 text-primary focus:ring-primary"
          @change="onSelect(option.id)"
        />
        <div class="min-w-0 flex-1">
          <p class="font-semibold text-slate-950">{{ option.name }}</p>
          <p class="mt-1 text-sm text-slate-500">{{ option.amount }}</p>
        </div>
        <span
          v-if="option.id === selected"
          class="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
        >
          Selecionado
        </span>
      </label>
    </template>

    <template v-else>
      <select
        class="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900"
        :value="selected"
        @change="onSelect($event.target.value)"
      >
        <option
          v-for="option in options"
          :key="option.id"
          :value="option.id"
        >
          {{ option.name }} — {{ option.amount }}
        </option>
      </select>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { FoodOption } from '../../types'

const props = defineProps<{
  options: FoodOption[]
  selected: string
  mode?: 'radio' | 'select'
}>()

const emit = defineEmits<{
  (e: 'select', optionId: string): void
}>()

function onSelect(optionId: string) {
  emit('select', optionId)
}
</script>
