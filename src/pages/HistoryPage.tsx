import { CalendarIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { Card } from '../components/Card';
import { BottomNav } from '../components/BottomNav';
import { ThemeToggle } from '../components/ThemeToggle';
import { useUser } from '../hooks/useUser';

export function HistoryPage() {
  const {
    user,
    dailyLogs
  } = useUser();
  
  // ProtectedRoute ya maneja la redirección, solo necesitamos verificar que user existe
  if (!user) {
    return null;
  }
  
  const last7Days = Array.from({
    length: 7
  }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });
  const chartData = last7Days.map(date => {
    const log = dailyLogs.find(l => l.date === date);
    const dateObj = new Date(date);
    const dayName = dateObj.toLocaleDateString('es-ES', {
      weekday: 'short'
    });
    return {
      date: dayName,
      fullDate: date,
      consumed: log?.totalCalories || 0,
      goal: user.tdee
    };
  });
  return <div className="min-h-screen bg-gray-50 dark:bg-[#0d1117] pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-6 h-6 text-[#2196F3]" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Progreso
              </h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <Card className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Últimos 7 días
          </h3>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
                <XAxis dataKey="date" className="text-gray-700 dark:text-gray-400" stroke="currentColor" />
                <YAxis className="text-gray-700 dark:text-gray-400" stroke="currentColor" />
                <Tooltip contentStyle={{
                backgroundColor: 'var(--tooltip-bg)',
                border: '1px solid var(--tooltip-border)',
                borderRadius: '0.5rem',
                color: 'var(--tooltip-text)'
              }} cursor={{
                fill: 'rgba(33, 150, 243, 0.1)'
              }} />
                <Legend />
                <ReferenceLine y={user.tdee} stroke="#ef4444" strokeDasharray="3 3" label={{
                value: 'Meta',
                position: 'right',
                fill: '#ef4444'
              }} />
                <Bar dataKey="consumed" fill="#2196F3" name="Consumidas (kcal)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Detalle por día
          </h3>

          <div className="space-y-4">
            {chartData.reverse().map(day => {
            const log = dailyLogs.find(l => l.date === day.fullDate);
            const percentage = day.consumed / day.goal * 100;
            const difference = day.consumed - day.goal;
            return <div key={day.fullDate} className="p-4 bg-gray-50 dark:bg-[#0d1117] rounded-lg border border-gray-200 dark:border-[#30363d]">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {new Date(day.fullDate).toLocaleDateString('es-ES', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long'
                    })}
                      </p>
                      {log && log.entries.length > 0 && <p className="text-sm text-gray-600 dark:text-gray-400">
                          {log.entries.length} alimento
                          {log.entries.length !== 1 ? 's' : ''} registrado
                          {log.entries.length !== 1 ? 's' : ''}
                        </p>}
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {day.consumed} kcal
                      </p>
                      <p className={`text-sm ${difference > 0 ? 'text-red-500' : 'text-[#2196F3]'}`}>
                        {difference > 0 ? '+' : ''}
                        {difference} kcal
                      </p>
                    </div>
                  </div>

                  <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
                    <div className={`h-2 rounded-full transition-all ${percentage > 110 ? 'bg-red-500' : percentage > 90 ? 'bg-green-500' : 'bg-[#2196F3]'}`} style={{
                  width: `${Math.min(percentage, 100)}%`
                }} />
                  </div>
                </div>;
          })}
          </div>
        </Card>
      </main>

      <BottomNav />
    </div>;
}