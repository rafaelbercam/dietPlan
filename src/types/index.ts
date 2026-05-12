export type FoodCategory =
  | 'fruit'
  | 'meat'
  | 'carb'
  | 'vegetable'
  | 'drink'
  | 'supplement'

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
  selectedOption?: FoodOption
  options?: FoodOption[]
}

export interface Meal {
  id: string
  time: string
  title: string
  foods: FoodItem[]
}
