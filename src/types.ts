export interface User {
  name: string;
  email?: string;
  age: number;
  sex: 'male' | 'female';
  weight: number; // kg - initial weight
  height: number; // cm
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'intense';
  tdee: number; // calculated daily calorie goal
  createdAt: string;
  authMethod?: 'email' | 'google';
  photoURL?: string;
}
export interface Food {
  id: string;
  name: string;
  category: 'fruits' | 'proteins' | 'dairy' | 'beverages' | 'grains' | 'vegetables';
  caloriesPer100g: number;
  hasUnits?: boolean;
  caloriesPerUnit?: number;
  unitName?: string; // e.g., 'pieza', 'taza', 'unidad'
  gramsPerUnit?: number;
}
export interface FoodEntry {
  id: string;
  foodId: string;
  foodName: string;
  grams: number;
  calories: number;
  timestamp: string;
  meal: MealType;
  quantity?: number;
  unit?: 'grams' | 'units';
}
export interface DailyLog {
  date: string; // YYYY-MM-DD
  entries: FoodEntry[];
  totalCalories: number;
  breakfastCalories: number;
  lunchCalories: number;
  dinnerCalories: number;
  snackCalories: number;
}
export interface WeightEntry {
  id: string;
  weight: number; // kg
  date: string; // YYYY-MM-DD
  timestamp: string;
}
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'intense';
export type FoodCategory = 'fruits' | 'proteins' | 'dairy' | 'beverages' | 'grains' | 'vegetables';
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';