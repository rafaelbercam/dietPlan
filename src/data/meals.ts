import type { Meal } from '../types'
import { fruits } from './fruits'
import { meats } from './meats'
import { vegetables } from './vegetables'
import { carbs } from './carbs'
import { desserts } from './desserts'

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
        amount: '2 fatias (40g)',
        category: 'dairy',
        replaceable: false
      },
      {
        id: 'creatine',
        name: 'Creatina',
        amount: '1 medida (6g)',
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
        selectedOption: fruits[7],
        options: fruits
      },
      {
        id: 'milk-powder',
        name: 'Leite em pó',
        amount: '2 colheres de sopa',
        category: 'dairy',
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
        name: 'Vegetais crus ou cozidos',
        amount: 'Meio prato (pelo menos 2 variedades)',
        category: 'vegetable',
        replaceable: true,
        multiSelect: true,
        selectedOptions: [vegetables[0], vegetables[17]],
        options: vegetables
      },
      {
        id: 'olive-oil',
        name: 'Azeite extra virgem',
        amount: '1 colher de sobremesa',
        category: 'supplement',
        replaceable: false
      },
      {
        id: 'carb-lunch',
        name: 'Carboidratos',
        amount: 'Arroz 8 col. sopa + Feijão 8 col. sopa (somados)',
        category: 'carb',
        replaceable: true,
        multiSelect: true,
        selectedOptions: [carbs[0], carbs[1]],
        options: carbs
      },
      {
        id: 'meat-lunch',
        name: 'Carne magra',
        amount: '1 porção',
        category: 'meat',
        replaceable: true,
        selectedOption: meats[11],
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
        category: 'dairy',
        replaceable: false
      },
      {
        id: 'whey',
        name: 'Whey Protein',
        amount: '30g (1 medida)',
        category: 'supplement',
        replaceable: false
      },
      {
        id: 'oat-bran',
        name: 'Farelo de aveia',
        amount: '1 colher de sopa',
        category: 'carb',
        replaceable: false
      },
      {
        id: 'fruit-afternoon',
        name: 'Fruta',
        amount: '1 porção',
        category: 'fruit',
        replaceable: true,
        selectedOption: fruits[26],
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
        name: 'Pão francês',
        amount: '½ unidade (ou 1 fatia de pão australiano)',
        category: 'carb',
        replaceable: false
      },
      {
        id: 'mozzarella',
        name: 'Mussarela',
        amount: '1 fatia',
        category: 'dairy',
        replaceable: false
      },
      {
        id: 'fruit-evening',
        name: 'Fruta',
        amount: '1 porção',
        category: 'fruit',
        replaceable: true,
        selectedOption: fruits[24],
        options: fruits
      }
    ]
  },
  {
    id: 'meal-dinner-option1',
    time: '19:30',
    title: 'Jantar — Opção 1',
    foods: [
      {
        id: 'vegetables-dinner',
        name: 'Vegetais crus ou cozidos',
        amount: 'Meio prato (pelo menos 2 variedades)',
        category: 'vegetable',
        replaceable: true,
        multiSelect: true,
        selectedOptions: [vegetables[17], vegetables[18]],
        options: vegetables
      },
      {
        id: 'olive-oil-dinner',
        name: 'Azeite extra virgem',
        amount: '1 colher de sobremesa',
        category: 'supplement',
        replaceable: false
      },
      {
        id: 'carb-dinner',
        name: 'Carboidratos',
        amount: 'Arroz 6 col. sopa + Feijão 6 col. sopa (somados)',
        category: 'carb',
        replaceable: true,
        multiSelect: true,
        selectedOptions: [carbs[0], carbs[1]],
        options: carbs
      },
      {
        id: 'meat-dinner',
        name: 'Carne magra',
        amount: '1 porção',
        category: 'meat',
        replaceable: true,
        selectedOption: meats[3],
        options: meats
      },
      {
        id: 'dessert-dinner',
        name: 'Sobremesa',
        amount: '1 porção',
        category: 'dessert',
        replaceable: true,
        selectedOption: desserts[0],
        options: desserts
      }
    ]
  },
  {
    id: 'meal-dinner-option2',
    time: '19:30',
    title: 'Jantar — Opção 2',
    foods: [
      {
        id: 'rap10',
        name: 'Rap 10',
        amount: '2 unidades',
        category: 'carb',
        replaceable: false
      },
      {
        id: 'protein-dinner2',
        name: 'Proteína',
        amount: '6 colheres de sopa',
        category: 'meat',
        replaceable: true,
        selectedOption: meats[11],
        options: meats
      },
      {
        id: 'vegetables-dinner2',
        name: 'Vegetais crus',
        amount: 'À vontade',
        category: 'vegetable',
        replaceable: true,
        multiSelect: true,
        selectedOptions: [vegetables[0], vegetables[9]],
        options: vegetables
      },
      {
        id: 'dessert-dinner2',
        name: 'Sobremesa',
        amount: '1 porção',
        category: 'dessert',
        replaceable: true,
        selectedOption: desserts[0],
        options: desserts
      }
    ]
  }
]
