import React from 'react';
import { TrendingUpIcon, TrendingDownIcon, CheckCircleIcon } from 'lucide-react';
import { Card } from './Card';
interface CalorieSummaryProps {
  consumed: number;
  goal: number;
}
export function CalorieSummary({
  consumed,
  goal
}: CalorieSummaryProps) {
  const difference = consumed - goal;
  const percentage = consumed / goal * 100;
  const getStatus = () => {
    if (percentage >= 90 && percentage <= 110) {
      return {
        icon: <CheckCircleIcon className="w-6 h-6 text-green-500" />,
        text: '¡Perfecto!',
        color: 'text-green-600 dark:text-green-400'
      };
    } else if (percentage > 110) {
      return {
        icon: <TrendingUpIcon className="w-6 h-6 text-red-500" />,
        text: 'Superávit',
        color: 'text-red-600 dark:text-red-400'
      };
    } else {
      return {
        icon: <TrendingDownIcon className="w-6 h-6 text-blue-500" />,
        text: 'Déficit',
        color: 'text-blue-600 dark:text-blue-400'
      };
    }
  };
  const status = getStatus();
  return <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Resumen del día
        </h3>
        {status.icon}
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Consumidas:</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {consumed} kcal
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Meta diaria:</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {goal} kcal
          </span>
        </div>

        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">
              {status.text}:
            </span>
            <span className={`text-xl font-bold ${status.color}`}>
              {difference > 0 ? '+' : ''}
              {difference} kcal
            </span>
          </div>
        </div>
      </div>
    </Card>;
}