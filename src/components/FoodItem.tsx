import { useState, memo } from 'react';
import { PlusIcon } from 'lucide-react';
import { Food } from '../types';
import { Button } from './Button';

interface FoodItemProps {
  food: Food;
  onAdd: (foodId: string, foodName: string, grams: number, calories: number) => void;
}

export const FoodItem = memo(function FoodItem({ food, onAdd }: FoodItemProps) {
  const [measurementType, setMeasurementType] = useState<'grams' | 'units'>(
    food.hasUnits ? 'units' : 'grams'
  );
  const [grams, setGrams] = useState(100);
  const [units, setUnits] = useState(1);

  const calories = measurementType === 'grams' 
    ? Math.round(food.caloriesPer100g * grams / 100)
    : Math.round((food.caloriesPerUnit || 0) * units);

  const actualGrams = measurementType === 'grams' 
    ? grams 
    : Math.round((food.gramsPerUnit || 0) * units);

  const handleAdd = () => {
    onAdd(food.id, food.name, actualGrams, calories);
    setGrams(100);
    setUnits(1);
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 dark:text-white">
            {food.name}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {food.caloriesPer100g} kcal por 100g
            {food.hasUnits && food.caloriesPerUnit && (
              <> • {food.caloriesPerUnit} kcal por {food.unitName}</>
            )}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap">
        {/* Selector de tipo de medición */}
        {food.hasUnits && (
          <div className="flex gap-2">
            <button
              onClick={() => setMeasurementType('units')}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                measurementType === 'units'
                  ? 'bg-[#2196F3] text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {food.unitName}
            </button>
            <button
              onClick={() => setMeasurementType('grams')}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                measurementType === 'grams'
                  ? 'bg-[#2196F3] text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              gramos
            </button>
          </div>
        )}

        {/* Input de cantidad */}
        <div className="flex items-center gap-2">
          <input 
            type="number" 
            value={measurementType === 'grams' ? grams : units} 
            onChange={e => {
              const value = Math.max(1, parseInt(e.target.value) || 1);
              if (measurementType === 'grams') {
                setGrams(value);
              } else {
                setUnits(value);
              }
            }} 
            min="1" 
            step={measurementType === 'grams' ? '10' : '1'}
            className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded 
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     dark:bg-gray-700 dark:text-white text-center" 
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {measurementType === 'grams' ? 'g' : food.unitName}
          </span>
        </div>

        {/* Calorías */}
        <div className="text-right min-w-[80px]">
          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {calories}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">kcal</p>
        </div>

        {/* Botón agregar */}
        <Button onClick={handleAdd} size="sm" className="flex items-center gap-1">
          <PlusIcon className="w-4 h-4" />
          Agregar
        </Button>
      </div>
    </div>
  );
});