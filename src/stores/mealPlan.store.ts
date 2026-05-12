import { computed } from 'vue'
import { defineStore } from 'pinia'
import type { Meal, FoodOption, MealPlanPeriod } from '../types'
import { useLocalStorage } from '../composables/useLocalStorage'
import { getDefaultMealPlan } from '../services/mealPlanService'

const STORAGE_KEY = 'meal-plan-state'
const PERIODS_KEY = 'meal-plan-periods'

export const useMealPlanStore = defineStore('meal-plan', () => {
  const meals = useLocalStorage<Meal[]>(STORAGE_KEY, getDefaultMealPlan())
  const savedPeriods = useLocalStorage<MealPlanPeriod[]>(PERIODS_KEY, [])

  const activePeriods = computed(() => {
    const today = new Date().toISOString().slice(0, 10)
    return savedPeriods.value.filter((p) => p.startDate <= today && p.endDate >= today)
  })

  const inactivePeriods = computed(() => {
    const today = new Date().toISOString().slice(0, 10)
    return savedPeriods.value.filter((p) => p.endDate < today)
  })

  const upcomingPeriods = computed(() => {
    const today = new Date().toISOString().slice(0, 10)
    return savedPeriods.value.filter((p) => p.startDate > today)
  })

  function updateFoodSelection(mealId: string, foodId: string, optionId: string) {
    const meal = meals.value.find((item) => item.id === mealId)
    if (!meal) return

    const food = meal.foods.find((item) => item.id === foodId)
    if (!food || !food.options) return

    const nextOption = food.options.find((option) => option.id === optionId)
    if (!nextOption) return

    food.selectedOption = nextOption
  }

  function toggleFoodMultiSelection(mealId: string, foodId: string, optionId: string) {
    const meal = meals.value.find((item) => item.id === mealId)
    if (!meal) return

    const food = meal.foods.find((item) => item.id === foodId)
    if (!food || !food.options) return

    const option = food.options.find((o) => o.id === optionId)
    if (!option) return

    if (!food.selectedOptions) {
      food.selectedOptions = []
    }

    const idx = food.selectedOptions.findIndex((o) => o.id === optionId)
    if (idx !== -1) {
      food.selectedOptions.splice(idx, 1)
    } else {
      food.selectedOptions.push(option)
    }
  }

  function getSelectedOption(mealId: string, foodId: string): FoodOption | undefined {
    const meal = meals.value.find((item) => item.id === mealId)
    const food = meal?.foods.find((item) => item.id === foodId)
    return food?.selectedOption
  }

  function savePeriod(label: string, startDate: string, endDate: string) {
    const period: MealPlanPeriod = {
      id: `period-${Date.now()}`,
      label,
      startDate,
      endDate,
      meals: JSON.parse(JSON.stringify(meals.value))
    }
    savedPeriods.value.push(period)
    return period
  }

  function deletePeriod(periodId: string) {
    const idx = savedPeriods.value.findIndex((p) => p.id === periodId)
    if (idx !== -1) savedPeriods.value.splice(idx, 1)
  }

  function resetToDefaults() {
    meals.value = getDefaultMealPlan()
  }

  return {
    meals,
    savedPeriods,
    activePeriods,
    inactivePeriods,
    upcomingPeriods,
    updateFoodSelection,
    toggleFoodMultiSelection,
    getSelectedOption,
    savePeriod,
    deletePeriod,
    resetToDefaults
  }
})
