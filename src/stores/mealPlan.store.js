import { defineStore } from 'pinia';
import { useLocalStorage } from '../composables/useLocalStorage';
import { getDefaultMealPlan } from '../services/mealPlanService';
const STORAGE_KEY = 'meal-plan-state';
export const useMealPlanStore = defineStore('meal-plan', () => {
    const meals = useLocalStorage(STORAGE_KEY, getDefaultMealPlan());
    function updateFoodSelection(mealId, foodId, optionId) {
        const meal = meals.value.find((item) => item.id === mealId);
        if (!meal)
            return;
        const food = meal.foods.find((item) => item.id === foodId);
        if (!food || !food.options)
            return;
        const nextOption = food.options.find((option) => option.id === optionId);
        if (!nextOption)
            return;
        food.selectedOption = nextOption;
    }
    function getSelectedOption(mealId, foodId) {
        const meal = meals.value.find((item) => item.id === mealId);
        const food = meal?.foods.find((item) => item.id === foodId);
        return food?.selectedOption;
    }
    return {
        meals,
        updateFoodSelection,
        getSelectedOption
    };
});
//# sourceMappingURL=mealPlan.store.js.map