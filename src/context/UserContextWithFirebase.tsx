import { createContext, useCallback, useMemo, ReactNode, useState, useEffect } from 'react';
import { User, DailyLog, FoodEntry, MealType, WeightEntry } from '../types';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { getUserData, updateUserData } from '../services/authService';

interface UserContextType {
  user: User | null;
  firebaseUid: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  dailyLogs: DailyLog[];
  addFoodEntry: (entry: Omit<FoodEntry, 'id' | 'timestamp'>) => void;
  getTodayLog: () => DailyLog;
  getLogByDate: (date: string) => DailyLog;
  clearTodayLog: () => void;
  removeFoodEntry: (entryId: string) => void;
  weightEntries: WeightEntry[];
  addWeightEntry: (weight: number) => void;
  getLatestWeight: () => WeightEntry | null;
  getWeightHistory: (days: number) => WeightEntry[];
  syncUserData: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export { UserContext };

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [firebaseUid, setFirebaseUid] = useState<string | null>(null);
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>([]);
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await getUserData(firebaseUser.uid);
          if (userData) {
            setUserState(userData);
            setFirebaseUid(userData.firebaseUid);
            setDailyLogs(userData.dailyLogs || []);
            setWeightEntries(userData.weightEntries || []);
          }
        } catch (error) {
          console.error('Error al cargar datos del usuario:', error);
        }
      } else {
        setUserState(null);
        setFirebaseUid(null);
        setDailyLogs([]);
        setWeightEntries([]);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const syncUserData = useCallback(async () => {
    if (!firebaseUid) return;

    try {
      await updateUserData(firebaseUid, {
        dailyLogs,
        weightEntries
      });
    } catch (error) {
      console.error('Error al sincronizar datos:', error);
    }
  }, [firebaseUid, dailyLogs, weightEntries]);

  useEffect(() => {
    if (firebaseUid && user) {
      const timeoutId = setTimeout(() => {
        syncUserData();
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [dailyLogs, weightEntries, firebaseUid, user, syncUserData]);

  const setUser = useCallback((newUser: User | null) => {
    setUserState(newUser);
  }, []);

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

  const addFoodEntry = useCallback((entry: Omit<FoodEntry, 'id' | 'timestamp'>) => {
    const today = new Date().toISOString().split('T')[0];
    const newEntry: FoodEntry = {
      ...entry,
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date().toISOString()
    };
    setDailyLogs(prevLogs => {
      const existingLogIndex = prevLogs.findIndex(log => log.date === today);
      if (existingLogIndex >= 0) {
        const updatedLogs = [...prevLogs];
        const updatedEntries = [...updatedLogs[existingLogIndex].entries, newEntry];
        const totalCalories = updatedEntries.reduce((sum, e) => sum + e.calories, 0);
        updatedLogs[existingLogIndex] = {
          date: today,
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
          date: today,
          entries: [newEntry],
          totalCalories: newEntry.calories,
          breakfastCalories: entry.meal === 'breakfast' ? newEntry.calories : 0,
          lunchCalories: entry.meal === 'lunch' ? newEntry.calories : 0,
          dinnerCalories: entry.meal === 'dinner' ? newEntry.calories : 0,
          snackCalories: entry.meal === 'snack' ? newEntry.calories : 0
        }];
      }
    });
  }, [calculateMealCalories]);

  const removeFoodEntry = useCallback((entryId: string) => {
    const today = new Date().toISOString().split('T')[0];
    setDailyLogs(prevLogs => {
      const existingLogIndex = prevLogs.findIndex(log => log.date === today);
      if (existingLogIndex >= 0) {
        const updatedLogs = [...prevLogs];
        const updatedEntries = updatedLogs[existingLogIndex].entries.filter(e => e.id !== entryId);
        const totalCalories = updatedEntries.reduce((sum, e) => sum + e.calories, 0);
        updatedLogs[existingLogIndex] = {
          date: today,
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
  }, [calculateMealCalories]);

  const clearTodayLog = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    setDailyLogs(prevLogs => prevLogs.filter(log => log.date !== today));
  }, []);

  const addWeightEntry = useCallback((weight: number) => {
    const today = new Date().toISOString().split('T')[0];
    const newEntry: WeightEntry = {
      id: `${Date.now()}-${Math.random()}`,
      weight,
      date: today,
      timestamp: new Date().toISOString()
    };
    setWeightEntries(prev => [...prev, newEntry]);
    
    if (user && firebaseUid) {
      const updatedUser = { ...user, weight };
      setUserState(updatedUser);
      updateUserData(firebaseUid, { ...updatedUser });
    }
  }, [user, firebaseUid]);

  const getLatestWeight = useCallback((): WeightEntry | null => {
    if (weightEntries.length === 0) return null;
    return weightEntries.reduce((latest, entry) => 
      new Date(entry.timestamp) > new Date(latest.timestamp) ? entry : latest
    );
  }, [weightEntries]);

  const getWeightHistory = useCallback((days: number): WeightEntry[] => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    return weightEntries
      .filter(entry => new Date(entry.date) >= cutoffDate)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [weightEntries]);

  const contextValue = useMemo(() => ({
    user,
    firebaseUid,
    isLoading,
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
    getWeightHistory,
    syncUserData
  }), [
    user,
    firebaseUid,
    isLoading,
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
    getWeightHistory,
    syncUserData
  ]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}
