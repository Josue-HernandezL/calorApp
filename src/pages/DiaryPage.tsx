import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useUser } from '../hooks/useUser';
import { BottomNav } from '../components/BottomNav';
import { MealSection } from '../components/MealSection';
import { FoodSearchBar } from '../components/FoodSearchBar';
import { FoodItem } from '../components/FoodItem';
import { ThemeToggle } from '../components/ThemeToggle';
import { MotivationalMessage } from '../components/MotivationalMessage';
import { FOODS } from '../data/foods';
import { MealType } from '../types';
import { Button } from '../components/Button';
export function DiaryPage() {
  const {
    user,
    getLogByDate,
    addFoodEntry,
    removeFoodEntry
  } = useUser();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddFood, setShowAddFood] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealType>('breakfast');
  const [searchQuery, setSearchQuery] = useState('');
  if (!user) return null;
  const dateString = selectedDate.toISOString().split('T')[0];
  const todayLog = getLogByDate(dateString);
  const handlePreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };
  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };
  const handleAddFood = (foodId: string, foodName: string, grams: number, calories: number) => {
    addFoodEntry({
      foodId,
      foodName,
      grams,
      calories,
      meal: selectedMeal
    }, dateString);
    setShowAddFood(false);
    setSearchQuery('');
  };
  const handleOpenAddFood = (meal: MealType) => {
    setSelectedMeal(meal);
    setShowAddFood(true);
  };
  const filteredFoods = FOODS.filter(food => food.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const getMealEntries = (meal: MealType) => {
    return todayLog.entries.filter(e => e.meal === meal);
  };
  const remaining = user.tdee - todayLog.totalCalories;
  return <div className="min-h-screen bg-gray-50 dark:bg-[#0d1117] pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Diario
            </h1>
            <ThemeToggle />
          </div>

          {/* Date Navigation */}
          <div className="flex items-center justify-between">
            <button onClick={handlePreviousDay} className="p-2 hover:bg-gray-100 dark:hover:bg-[#1a1f2e] rounded-lg transition-colors">
              <ChevronLeftIcon className="w-6 h-6 text-gray-900 dark:text-white" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {selectedDate.toLocaleDateString('es-ES', {
              weekday: 'long',
              day: 'numeric',
              month: 'long'
            })}
            </h2>
            <button onClick={handleNextDay} className="p-2 hover:bg-gray-100 dark:hover:bg-[#1a1f2e] rounded-lg transition-colors">
              <ChevronRightIcon className="w-6 h-6 text-gray-900 dark:text-white" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Calorie Equation - Simplified */}
        <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-[#30363d] rounded-lg p-4 mb-6 shadow-sm">
          <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Calorías restantes
          </h3>
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="text-center flex-1">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.tdee}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Objetivo</div>
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-2xl font-light">
              −
            </div>
            <div className="text-center flex-1">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {todayLog.totalCalories}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Alimento</div>
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-2xl font-light">
              =
            </div>
            <div className="text-center flex-1">
              <div className={`text-2xl font-bold ${remaining >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
                {remaining}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Restantes</div>
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        <MotivationalMessage consumed={todayLog.totalCalories} goal={user.tdee} />

        {/* Meal Sections */}
        <div className="space-y-4">
          <MealSection title="Desayuno" calories={todayLog.breakfastCalories} entries={getMealEntries('breakfast')} onAddClick={() => handleOpenAddFood('breakfast')} onRemoveEntry={(entryId) => removeFoodEntry(entryId, dateString)} />

          <MealSection title="Almuerzo" calories={todayLog.lunchCalories} entries={getMealEntries('lunch')} onAddClick={() => handleOpenAddFood('lunch')} onRemoveEntry={(entryId) => removeFoodEntry(entryId, dateString)} />

          <MealSection title="Cena" calories={todayLog.dinnerCalories} entries={getMealEntries('dinner')} onAddClick={() => handleOpenAddFood('dinner')} onRemoveEntry={(entryId) => removeFoodEntry(entryId, dateString)} />

          <MealSection title="Snacks" calories={todayLog.snackCalories} entries={getMealEntries('snack')} onAddClick={() => handleOpenAddFood('snack')} onRemoveEntry={(entryId) => removeFoodEntry(entryId, dateString)} />
        </div>
      </main>

      {/* Add Food Modal */}
      {showAddFood && <div className="fixed inset-0 bg-black/50 dark:bg-black/80 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white dark:bg-[#161b22] w-full sm:max-w-2xl sm:rounded-lg max-h-[90vh] overflow-hidden flex flex-col border border-gray-200 dark:border-[#30363d]">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Añadir alimento -{' '}
                {selectedMeal === 'breakfast' ? 'Desayuno' : selectedMeal === 'lunch' ? 'Almuerzo' : selectedMeal === 'dinner' ? 'Cena' : 'Snacks'}
              </h3>
              <Button variant="ghost" onClick={() => {
            setShowAddFood(false);
            setSearchQuery('');
          }} className="text-gray-900 dark:text-white">
                Cerrar
              </Button>
            </div>

            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <FoodSearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Buscar alimento..." />
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredFoods.map(food => <FoodItem key={food.id} food={food} onAdd={handleAddFood} />)}
            </div>
          </div>
        </div>}

      <BottomNav />
    </div>;
}