import React from 'react';
import { ChevronRightIcon, TrashIcon } from 'lucide-react';
import { FoodEntry } from '../types';
interface MealSectionProps {
  title: string;
  calories: number;
  entries: FoodEntry[];
  onAddClick: () => void;
  onRemoveEntry: (entryId: string) => void;
}
export function MealSection({
  title,
  calories,
  entries,
  onAddClick,
  onRemoveEntry
}: MealSectionProps) {
  return <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-[#30363d] rounded-lg overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <span className="text-lg font-bold text-gray-900 dark:text-white">
          {calories}
        </span>
      </div>

      {entries.length > 0 && <div className="border-b border-gray-200 dark:border-gray-800">
          {entries.map(entry => <div key={entry.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-[#1a1f2e] transition-colors group">
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white font-medium">
                  {entry.foodName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {entry.grams}g
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-900 dark:text-white font-semibold">
                  {entry.calories}
                </span>
                <button onClick={() => onRemoveEntry(entry.id)} className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-500/20 rounded">
                  <TrashIcon className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>)}
        </div>}

      <button onClick={onAddClick} className="w-full p-4 flex items-center justify-between text-[#2196F3] hover:bg-gray-50 dark:hover:bg-[#1a1f2e] transition-colors">
        <span className="font-semibold uppercase text-sm">Añadir alimento</span>
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>;
}