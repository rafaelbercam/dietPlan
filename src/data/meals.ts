import type { Meal } from '../types'
import { fruits } from './fruits'
import { meats } from './meats'

export const defaultMeals: Meal[] = [
  {
    id: 'meal-breakfast',
    time: '07:00',
    title: 'Café da manhã',
    foods: [
      {
        id: 'bread',
        name: 'Pão francês',
        amount: '1 unidade',
        category: 'carb',
        replaceable: false
      },
      {
        id: 'eggs',
        name: 'Ovos',
        amount: '2 unidades',
        category: 'meat',
        replaceable: false
      },
      {
        id: 'cheese',
        name: 'Queijo minas',
        amount: '40g',
        category: 'supplement',
        replaceable: false
      },
      {
        id: 'creatine',
        name: 'Creatina',
        amount: '5g',
        category: 'supplement',
        replaceable: false
      }
    ]
  },
  {
    id: 'meal-morning-snack',
    time: '09:00',
    title: 'Lanche da manhã',
    foods: [
      {
        id: 'fruit-morning',
        name: 'Fruta',
        amount: '1 porção',
        category: 'fruit',
        replaceable: true,
        selectedOption: fruits[0],
        options: fruits
      },
      {
        id: 'milk-powder',
        name: 'Leite em pó',
        amount: '200ml',
        category: 'drink',
        replaceable: false
      }
    ]
  },
  {
    id: 'meal-lunch',
    time: '11:30',
    title: 'Almoço',
    foods: [
      {
        id: 'vegetables',
        name: 'Vegetais',
        amount: '1 xícara',
        category: 'vegetable',
        replaceable: false
      },
      {
        id: 'olive-oil',
        name: 'Azeite',
        amount: '1 colher de sopa',
        category: 'supplement',
        replaceable: false
      },
      {
        id: 'carb-lunch',
        name: 'Carboidrato',
        amount: '1 porção',
        category: 'carb',
        replaceable: false
      },
      {
        id: 'beans',
        name: 'Feijão',
        amount: '1 concha',
        category: 'carb',
        replaceable: false
      },
      {
        id: 'meat-lunch',
        name: 'Carne magra',
        amount: '1 porção',
        category: 'meat',
        replaceable: true,
        selectedOption: meats[0],
        options: meats
      }
    ]
  },
  {
    id: 'meal-afternoon',
    time: '14:30',
    title: 'Lanche da tarde',
    foods: [
      {
        id: 'whole-milk',
        name: 'Leite integral',
        amount: '200ml',
        category: 'drink',
        replaceable: false
      },
      {
        id: 'whey',
        name: 'Whey protein',
        amount: '1 scoop',
        category: 'supplement',
        replaceable: false
      },
      {
        id: 'oat-bran',
        name: 'Farelo de aveia',
        amount: '2 colheres de sopa',
        category: 'carb',
        replaceable: false
      },
      {
        id: 'fruit-afternoon',
        name: 'Fruta',
        amount: '1 porção',
        category: 'fruit',
        replaceable: true,
        selectedOption: fruits[1],
        options: fruits
      }
    ]
  },
  {
    id: 'meal-evening-snack',
    time: '17:30',
    title: 'Lanche da tarde II',
    foods: [
      {
        id: 'bread-snack',
        name: 'Pão',
        amount: '1 unidade',
        category: 'carb',
        replaceable: false
      },
      {
        id: 'mozzarella',
        name: 'Mussarela',
        amount: '40g',
        category: 'supplement',
        replaceable: false
      },
      {
        id: 'fruit-evening',
        name: 'Fruta',
        amount: '1 porção',
        category: 'fruit',
        replaceable: true,
        selectedOption: fruits[2],
        options: fruits
      }
    ]
  },
  {
    id: 'meal-dinner',
    time: '19:30',
    title: 'Jantar',
    foods: [
      {
        id: 'vegetables-dinner',
        name: 'Vegetais',
        amount: '1 xícara',
        category: 'vegetable',
        replaceable: false
      },
      {
        id: 'carb-dinner',
        name: 'Carboidrato',
        amount: '1 porção',
        category: 'carb',
        replaceable: false
      },
      {
        id: 'beans-dinner',
        name: 'Feijão',
        amount: '1 concha',
        category: 'carb',
        replaceable: false
      },
      {
        id: 'meat-dinner',
        name: 'Carne',
        amount: '1 porção',
        category: 'meat',
        replaceable: true,
        selectedOption: meats[1],
        options: meats
      }
    ]
  }
]
