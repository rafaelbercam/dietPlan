import type { Meal } from '../types'
import { defaultMeals } from '../data/meals'

export function getDefaultMealPlan(): Meal[] {
  return JSON.parse(JSON.stringify(defaultMeals))
}
