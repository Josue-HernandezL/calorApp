import { useState, memo } from 'react';
import { PlusIcon } from 'lucide-react';
import { Food } from '../types';
import { Button } from './Button';

interface FoodItemProps {
  food: Food;
  onAdd: (foodId: string, foodName: string, grams: number, calories: number) => void;
}

export const FoodItem = memo(function FoodItem({ food, onAdd }: FoodItemProps) {
  const [grams, setGrams] = useState(100);
  const calories = Math.round(food.caloriesPer100g * grams / 100);

  const handleAdd = () => {
    onAdd(food.id, food.name, grams, calories);
    setGrams(100);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="flex-1">
        <h4 className="font-medium text-gray-900 dark:text-white">
          {food.name}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {food.caloriesPer100g} kcal por 100g
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <input 
            type="number" 
            value={grams} 
            onChange={e => setGrams(Math.max(1, parseInt(e.target.value) || 1))} 
            min="1" 
            className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded 
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     dark:bg-gray-700 dark:text-white text-center" 
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">g</span>
        </div>

        <div className="text-right min-w-[80px]">
          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {calories}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">kcal</p>
        </div>

        <Button onClick={handleAdd} size="sm" className="flex items-center gap-1">
          <PlusIcon className="w-4 h-4" />
          Agregar
        </Button>
      </div>
    </div>
  );
});