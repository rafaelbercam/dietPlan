import { defineStore } from 'pinia'
import type { Meal, FoodOption } from '../types'
import { useLocalStorage } from '../composables/useLocalStorage'
import { getDefaultMealPlan } from '../services/mealPlanService'

const STORAGE_KEY = 'meal-plan-state'

export const useMealPlanStore = defineStore('meal-plan', () => {
  const meals = useLocalStorage<Meal[]>(STORAGE_KEY, getDefaultMealPlan())

  function updateFoodSelection(mealId: string, foodId: string, optionId: string) {
    const meal = meals.value.find((item) => item.id === mealId)
    if (!meal) return

    const food = meal.foods.find((item) => item.id === foodId)
    if (!food || !food.options) return

    const nextOption = food.options.find((option) => option.id === optionId)
    if (!nextOption) return

    food.selectedOption = nextOption
  }

  function getSelectedOption(mealId: string, foodId: string): FoodOption | undefined {
    const meal = meals.value.find((item) => item.id === mealId)
    const food = meal?.foods.find((item) => item.id === foodId)
    return food?.selectedOption
  }

  return {
    meals,
    updateFoodSelection,
    getSelectedOption
  }
})
