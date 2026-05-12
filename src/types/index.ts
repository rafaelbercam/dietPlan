export type FoodCategory =
  | 'fruit'
  | 'meat'
  | 'carb'
  | 'vegetable'
  | 'drink'
  | 'supplement'
  | 'dessert'

export interface FoodOption {
  id: string
  name: string
  amount: string
}

export interface FoodItem {
  id: string
  name: string
  amount: string
  category: FoodCategory
  replaceable: boolean
  multiSelect?: boolean
  selectedOption?: FoodOption
  selectedOptions?: FoodOption[]
  options?: FoodOption[]
}

export interface Meal {
  id: string
  time: string
  title: string
  foods: FoodItem[]
}

export interface MealPlanPeriod {
  id: string
  label: string
  startDate: string
  endDate: string
  meals: Meal[]
}

export interface ConsultInfo {
  nutritionist: string
  lastConsultDate: string
  expirationDays: number
}
