import { ActivityLevel } from '../types';

const ACTIVITY_FACTORS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  intense: 1.725
};

const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary: 'Sedentario',
  light: 'Actividad ligera',
  moderate: 'Actividad moderada',
  intense: 'Actividad intensa'
};

export function calculateTMB(age: number, sex: 'male' | 'female', weight: number, height: number): number {
  if (sex === 'male') {
    return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  }
  return 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
}

export function calculateTDEE(tmb: number, activityLevel: ActivityLevel): number {
  return Math.round(tmb * ACTIVITY_FACTORS[activityLevel]);
}

export function getActivityLevelLabel(level: ActivityLevel): string {
  return ACTIVITY_LABELS[level];
}