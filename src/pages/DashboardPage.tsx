import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlagIcon, UtensilsIcon, TrendingUpIcon } from 'lucide-react';
import { useUser } from '../hooks/useUser';
import { BottomNav } from '../components/BottomNav';
import { ProgressCircle } from '../components/ProgressCircle';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ThemeToggle } from '../components/ThemeToggle';
import { WeightModal } from '../components/WeightModal';
import { MotivationalMessage } from '../components/MotivationalMessage';
export function DashboardPage() {
  const navigate = useNavigate();
  const {
    user,
    getTodayLog,
    addWeightEntry,
    getWeightHistory
  } = useUser();
  const [showWeightModal, setShowWeightModal] = useState(false);
  
  // ProtectedRoute ya maneja la redirección, solo necesitamos verificar que user existe
  if (!user) {
    return null;
  }
  
  const todayLog = getTodayLog();
  const remaining = user.tdee - todayLog.totalCalories;
  const weightHistory = getWeightHistory(90);
  const handleSaveWeight = (weight: number) => {
    addWeightEntry(weight);
  };
  // Calculate weight change
  const getWeightChange = () => {
    if (weightHistory.length < 2) return null;
    const oldest = weightHistory[0].weight;
    const current = user.weight;
    const change = current - oldest;
    return change;
  };
  const weightChange = getWeightChange();
  return <div className="min-h-screen bg-gray-50 dark:bg-[#0d1117] pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#2196F3] rounded-full flex items-center justify-center">
                {user.photoURL ? <img src={user.photoURL} alt={user.name} className="w-full h-full rounded-full" /> : <span className="text-white font-bold text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </span>}
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  CalorApp
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  ¡Hola, {user.name}!
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Today Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Hoy
          </h2>
          <Button variant="ghost" onClick={() => navigate('/diario')} className="text-[#2196F3] hover:bg-gray-100 dark:hover:bg-[#161b22]">
            Editar
          </Button>
        </div>

        {/* Main Calorie Card */}
        <Card className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Calorías
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Restante = Objetivo - Alimentos
          </p>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Progress Circle */}
            <div className="flex-shrink-0">
              <ProgressCircle current={todayLog.totalCalories} goal={user.tdee} size={200} />
            </div>

            {/* Breakdown */}
            <div className="flex-1 w-full space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#0d1117] rounded-lg">
                <FlagIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Objetivo base
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {user.tdee}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#0d1117] rounded-lg">
                <UtensilsIcon className="w-5 h-5 text-[#2196F3]" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Alimento
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {todayLog.totalCalories}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Restantes
                  </p>
                  <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {remaining} kcal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Motivational Message */}
        <MotivationalMessage consumed={todayLog.totalCalories} goal={user.tdee} />

        {/* Weight Card */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Peso
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {weightHistory.length > 0 ? `Últimos ${Math.min(weightHistory.length, 90)} días` : 'Sin registros'}
              </p>
            </div>
            <button onClick={() => setShowWeightModal(true)} className="w-8 h-8 bg-[#2196F3] rounded-full flex items-center justify-center hover:bg-[#1976D2] transition-colors">
              <span className="text-white text-xl">+</span>
            </button>
          </div>

          {weightHistory.length > 0 ? <>
              <div className="h-32 flex items-end justify-between mb-4">
                <div className="flex-1 h-full relative flex items-end gap-1">
                  {weightHistory.slice(-30).map((entry) => {
                const maxWeight = Math.max(...weightHistory.map(e => e.weight));
                const minWeight = Math.min(...weightHistory.map(e => e.weight));
                const range = maxWeight - minWeight || 1;
                const height = (entry.weight - minWeight) / range * 100;
                return <div key={entry.id} className="flex-1 bg-green-500 rounded-t" style={{
                  height: `${Math.max(height, 10)}%`
                }} title={`${entry.weight} kg - ${new Date(entry.date).toLocaleDateString('es-ES')}`} />;
              })}
                </div>
              </div>

              <div className="text-center space-y-1">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {user.weight} kg
                </p>
                {weightChange !== null && <p className={`text-sm font-medium ${weightChange > 0 ? 'text-red-500' : weightChange < 0 ? 'text-green-500' : 'text-gray-500'}`}>
                    {weightChange > 0 ? '+' : ''}
                    {weightChange.toFixed(1)} kg
                    <span className="text-gray-500 dark:text-gray-400 ml-1">
                      ({weightHistory.length} registros)
                    </span>
                  </p>}
              </div>
            </> : <div className="text-center py-8">
              <TrendingUpIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No hay registros de peso
              </p>
              <Button onClick={() => setShowWeightModal(true)}>
                Registrar primer peso
              </Button>
            </div>}
        </Card>
      </main>

      <BottomNav />
      <WeightModal isOpen={showWeightModal} onClose={() => setShowWeightModal(false)} onSave={handleSaveWeight} currentWeight={user.weight} />
    </div>;
}