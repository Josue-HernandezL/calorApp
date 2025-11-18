import { createContext, useCallback, useMemo, ReactNode } from 'react';
import { User, DailyLog, FoodEntry, MealType, WeightEntry } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  dailyLogs: DailyLog[];
  addFoodEntry: (entry: Omit<FoodEntry, 'id' | 'timestamp'>, date?: string) => void;
  getTodayLog: () => DailyLog;
  getLogByDate: (date: string) => DailyLog;
  clearTodayLog: () => void;
  removeFoodEntry: (entryId: string, date?: string) => void;
  weightEntries: WeightEntry[];
  addWeightEntry: (weight: number) => void;
  getLatestWeight: () => WeightEntry | null;
  getWeightHistory: (days: number) => WeightEntry[];
}
const UserContext = createContext<UserContextType | undefined>(undefined);

export { UserContext };
export function UserProvider({
  children
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useLocalStorage<User | null>('calorieUser', null);
  const [dailyLogs, setDailyLogs] = useLocalStorage<DailyLog[]>('calorieLogs', []);
  const [weightEntries, setWeightEntries] = useLocalStorage<WeightEntry[]>('weightEntries', []);
  const calculateMealCalories = useCallback((entries: FoodEntry[], meal: MealType): number => {
    return entries.filter(e => e.meal === meal).reduce((sum, e) => sum + e.calories, 0);
  }, []);

  const getLogByDate = useCallback((date: string): DailyLog => {
    const existingLog = dailyLogs.find(log => log.date === date);
    if (existingLog) {
      return existingLog;
    }
    return {
      date,
      entries: [],
      totalCalories: 0,
      breakfastCalories: 0,
      lunchCalories: 0,
      dinnerCalories: 0,
      snackCalories: 0
    };
  }, [dailyLogs]);

  const getTodayLog = useCallback((): DailyLog => {
    const today = new Date().toISOString().split('T')[0];
    return getLogByDate(today);
  }, [getLogByDate]);

  const addFoodEntry = useCallback((entry: Omit<FoodEntry, 'id' | 'timestamp'>, date?: string) => {
    const targetDate = date || new Date().toISOString().split('T')[0];
    const newEntry: FoodEntry = {
      ...entry,
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date().toISOString()
    };
    setDailyLogs(prevLogs => {
      const existingLogIndex = prevLogs.findIndex(log => log.date === targetDate);
      if (existingLogIndex >= 0) {
        const updatedLogs = [...prevLogs];
        const updatedEntries = [...updatedLogs[existingLogIndex].entries, newEntry];
        const totalCalories = updatedEntries.reduce((sum, e) => sum + e.calories, 0);
        updatedLogs[existingLogIndex] = {
          date: targetDate,
          entries: updatedEntries,
          totalCalories,
          breakfastCalories: calculateMealCalories(updatedEntries, 'breakfast'),
          lunchCalories: calculateMealCalories(updatedEntries, 'lunch'),
          dinnerCalories: calculateMealCalories(updatedEntries, 'dinner'),
          snackCalories: calculateMealCalories(updatedEntries, 'snack')
        };
        return updatedLogs;
      } else {
        return [...prevLogs, {
          date: targetDate,
          entries: [newEntry],
          totalCalories: newEntry.calories,
          breakfastCalories: newEntry.meal === 'breakfast' ? newEntry.calories : 0,
          lunchCalories: newEntry.meal === 'lunch' ? newEntry.calories : 0,
          dinnerCalories: newEntry.meal === 'dinner' ? newEntry.calories : 0,
          snackCalories: newEntry.meal === 'snack' ? newEntry.calories : 0
        }];
      }
    });
  }, [setDailyLogs, calculateMealCalories]);

  const removeFoodEntry = useCallback((entryId: string, date?: string) => {
    const targetDate = date || new Date().toISOString().split('T')[0];
    setDailyLogs(prevLogs => {
      const existingLogIndex = prevLogs.findIndex(log => log.date === targetDate);
      if (existingLogIndex >= 0) {
        const updatedLogs = [...prevLogs];
        const updatedEntries = updatedLogs[existingLogIndex].entries.filter(e => e.id !== entryId);
        const totalCalories = updatedEntries.reduce((sum, e) => sum + e.calories, 0);
        updatedLogs[existingLogIndex] = {
          date: targetDate,
          entries: updatedEntries,
          totalCalories,
          breakfastCalories: calculateMealCalories(updatedEntries, 'breakfast'),
          lunchCalories: calculateMealCalories(updatedEntries, 'lunch'),
          dinnerCalories: calculateMealCalories(updatedEntries, 'dinner'),
          snackCalories: calculateMealCalories(updatedEntries, 'snack')
        };
        return updatedLogs;
      }
      return prevLogs;
    });
  }, [setDailyLogs, calculateMealCalories]);

  const clearTodayLog = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    setDailyLogs(prevLogs => prevLogs.filter(log => log.date !== today));
  }, [setDailyLogs]);

  const addWeightEntry = useCallback((weight: number) => {
    const today = new Date().toISOString().split('T')[0];
    const newEntry: WeightEntry = {
      id: `${Date.now()}-${Math.random()}`,
      weight,
      date: today,
      timestamp: new Date().toISOString()
    };
    setWeightEntries(prev => [...prev, newEntry]);
    
    if (user) {
      setUser({
        ...user,
        weight
      });
    }
  }, [setWeightEntries, user, setUser]);

  const getLatestWeight = useCallback((): WeightEntry | null => {
    if (weightEntries.length === 0) return null;
    return weightEntries.reduce((latest, entry) => new Date(entry.timestamp) > new Date(latest.timestamp) ? entry : latest);
  }, [weightEntries]);

  const getWeightHistory = useCallback((days: number): WeightEntry[] => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    return weightEntries.filter(entry => new Date(entry.date) >= cutoffDate).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [weightEntries]);

  const contextValue = useMemo(() => ({
    user,
    setUser,
    dailyLogs,
    addFoodEntry,
    getTodayLog,
    getLogByDate,
    clearTodayLog,
    removeFoodEntry,
    weightEntries,
    addWeightEntry,
    getLatestWeight,
    getWeightHistory
  }), [
    user,
    setUser,
    dailyLogs,
    addFoodEntry,
    getTodayLog,
    getLogByDate,
    clearTodayLog,
    removeFoodEntry,
    weightEntries,
    addWeightEntry,
    getLatestWeight,
    getWeightHistory
  ]);

  return <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>;
}