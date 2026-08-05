import { computed } from 'vue'
import { defineStore } from 'pinia'
import type { Meal, FoodOption, MealPlanPeriod, ConsultInfo } from '../types'
import { useLocalStorage } from '../composables/useLocalStorage'
import { useFileSync } from '../composables/useFileSync'
import { getDefaultMealPlan } from '../services/mealPlanService'

const STORAGE_KEY = 'meal-plan-state'
const PERIODS_KEY = 'meal-plan-periods'
const CONSULT_KEY = 'meal-plan-consult'
const VERSION_KEY = 'meal-plan-version'
const CURRENT_VERSION = 4

function migrateMeals(stored: Meal[]): Meal[] {
  const defaults = getDefaultMealPlan()

  for (const defaultMeal of defaults) {
    const storedMeal = stored.find((m) => m.id === defaultMeal.id)
    if (!storedMeal) {
      stored.push(defaultMeal)
      continue
    }

    const removedIds = storedMeal.foods
      .filter((f) => !defaultMeal.foods.some((df) => df.id === f.id))
      .map((f) => f.id)
    storedMeal.foods = storedMeal.foods.filter((f) => !removedIds.includes(f.id))

    for (const defaultFood of defaultMeal.foods) {
      const storedFood = storedMeal.foods.find((f) => f.id === defaultFood.id)
      if (!storedFood) {
        storedMeal.foods.push(defaultFood)
        continue
      }

      storedFood.category = defaultFood.category
      storedFood.name = defaultFood.name
      storedFood.amount = defaultFood.amount
      storedFood.replaceable = defaultFood.replaceable

      if (defaultFood.options) {
        storedFood.options = defaultFood.options
      }

      if (defaultFood.multiSelect) {
        storedFood.multiSelect = true
        delete storedFood.selectedOption
        if (!storedFood.selectedOptions || storedFood.selectedOptions.length === 0) {
          storedFood.selectedOptions = defaultFood.selectedOptions
        } else {
          storedFood.selectedOptions = storedFood.selectedOptions.filter(
            (so) => defaultFood.options!.some((o) => o.id === so.id)
          )
          if (storedFood.selectedOptions.length === 0) {
            storedFood.selectedOptions = defaultFood.selectedOptions
          }
        }
      } else {
        if (defaultFood.replaceable && defaultFood.options && !storedFood.selectedOption) {
          storedFood.selectedOption = defaultFood.selectedOption
        }
      }
    }
  }

  return stored
}

export const useMealPlanStore = defineStore('meal-plan', () => {
  const meals = useLocalStorage<Meal[]>(STORAGE_KEY, getDefaultMealPlan())
  const savedPeriods = useLocalStorage<MealPlanPeriod[]>(PERIODS_KEY, [])
  const consultInfo = useLocalStorage<ConsultInfo>(CONSULT_KEY, {
    nutritionist: 'Silvia Penna',
    lastConsultDate: '2026-04-28',
    expirationDays: 40
  })

  const fileSync = useFileSync(() => ({
    meals: meals.value,
    savedPeriods: savedPeriods.value,
    consultInfo: consultInfo.value
  }))

  const consultExpiration = computed(() => {
    const last = new Date(consultInfo.value.lastConsultDate)
    const expDate = new Date(last.getTime() + consultInfo.value.expirationDays * 86400000)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const diff = Math.ceil((expDate.getTime() - today.getTime()) / 86400000)
    return { expirationDate: expDate, daysRemaining: diff, expired: diff < 0 }
  })

  const storedVersion = typeof window !== 'undefined'
    ? Number(window.localStorage.getItem(VERSION_KEY) || '0')
    : CURRENT_VERSION

  if (storedVersion < CURRENT_VERSION) {
    meals.value = migrateMeals(meals.value)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(VERSION_KEY, String(CURRENT_VERSION))
    }
  }

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

  function updateConsultInfo(info: ConsultInfo) {
    consultInfo.value = info
  }

  return {
    meals,
    savedPeriods,
    consultInfo,
    fileSync,
    consultExpiration,
    activePeriods,
    inactivePeriods,
    upcomingPeriods,
    updateFoodSelection,
    toggleFoodMultiSelection,
    getSelectedOption,
    savePeriod,
    deletePeriod,
    resetToDefaults,
    updateConsultInfo
  }
})
