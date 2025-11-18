import React from 'react';
import { Card } from './Card';
interface MotivationalMessageProps {
  consumed: number;
  goal: number;
}

// Sugerencias de alimentos con sus calorías
const FOOD_SUGGESTIONS = [
  { name: 'taza de arroz', calories: 206 },
  { name: 'plátano', calories: 105 },
  { name: 'manzana', calories: 95 },
  { name: 'huevo', calories: 78 },
  { name: 'rebanada de pan', calories: 80 },
  { name: 'taza de leche', calories: 105 },
  { name: 'yogurt', calories: 118 },
  { name: 'naranja', calories: 62 },
  { name: 'taza de avena', calories: 150 },
  { name: 'tortilla', calories: 52 },
  { name: 'porción de pollo (100g)', calories: 165 },
  { name: 'porción de atún (100g)', calories: 132 },
  { name: 'taza de pasta', calories: 220 },
  { name: 'vaso de jugo de naranja', calories: 112 }
];

const MESSAGES = {
  perfect: [
    '¡Excelente! Estás logrando tus metas 💪',
    '¡Perfecto! Mantén ese ritmo 🎯',
    '¡Increíble! Estás en el camino correcto ⭐',
    '¡Genial! Tu disciplina está dando frutos 🌟',
    '¡Muy bien! Sigue así, vas por buen camino 🚀',
    '¡Fantástico! El equilibrio perfecto 🌈',
    '¡Bravo! Tu constancia se nota 👏',
    '¡Extraordinario! Mantienes el control ideal ✨'
  ],
  over: [
    'Ups… mañana lo harás mejor 😅',
    'No te preocupes, todos tenemos días así 🤗',
    'Mañana es un nuevo día para empezar 🌅',
    'Recuerda: el equilibrio es la clave 💫',
    'No pasa nada, lo importante es seguir intentando 💪',
    'Un día no define tu progreso, sigue adelante 🌟',
    'Aprende de hoy y mejora mañana 📈',
    'El equilibrio se logra día a día, no te desanimes 🎯'
  ],
  under: [
    '¡No olvides alimentarte bien! 🥗',
    'Tu cuerpo necesita más energía 💪',
    '¡Dale a tu cuerpo el combustible que necesita! 🔋',
    'Tu cuerpo te lo agradecerá si comes más 💚',
    'No olvides nutrirte adecuadamente 🌱'
  ]
};

// Función para generar sugerencias de alimentos
const getFoodSuggestions = (remainingCalories: number): string => {
  if (remainingCalories <= 0) return '';
  
  // Filtrar alimentos que no excedan las calorías restantes
  const suitableFoods = FOOD_SUGGESTIONS.filter(food => food.calories <= remainingCalories);
  
  if (suitableFoods.length === 0) {
    return `Te faltan ${remainingCalories} kcal. ¡Come algo nutritivo! 🍎`;
  }
  
  // Intentar encontrar una combinación de 1-3 alimentos
  const combinations: { foods: typeof FOOD_SUGGESTIONS, total: number }[] = [];
  
  // Combinaciones de 1 alimento
  suitableFoods.forEach(food => {
    const diff = Math.abs(remainingCalories - food.calories);
    if (diff <= remainingCalories * 0.4) { // Si está dentro del 40% de las calorías faltantes
      combinations.push({ foods: [food], total: food.calories });
    }
  });
  
  // Combinaciones de 2 alimentos
  for (let i = 0; i < suitableFoods.length; i++) {
    for (let j = i + 1; j < suitableFoods.length; j++) {
      const total = suitableFoods[i].calories + suitableFoods[j].calories;
      const diff = Math.abs(remainingCalories - total);
      if (total <= remainingCalories && diff <= remainingCalories * 0.3) {
        combinations.push({ foods: [suitableFoods[i], suitableFoods[j]], total });
      }
    }
  }
  
  // Combinaciones de 3 alimentos
  for (let i = 0; i < suitableFoods.length && i < 8; i++) {
    for (let j = i + 1; j < suitableFoods.length && j < 10; j++) {
      for (let k = j + 1; k < suitableFoods.length && k < 12; k++) {
        const total = suitableFoods[i].calories + suitableFoods[j].calories + suitableFoods[k].calories;
        const diff = Math.abs(remainingCalories - total);
        if (total <= remainingCalories && diff <= remainingCalories * 0.2) {
          combinations.push({ foods: [suitableFoods[i], suitableFoods[j], suitableFoods[k]], total });
        }
      }
    }
  }
  
  // Si encontramos combinaciones, elegir la mejor
  if (combinations.length > 0) {
    // Ordenar por cercanía a las calorías restantes
    combinations.sort((a, b) => {
      const diffA = Math.abs(remainingCalories - a.total);
      const diffB = Math.abs(remainingCalories - b.total);
      return diffA - diffB;
    });
    
    const bestCombo = combinations[0];
    const foodList = bestCombo.foods.map(f => `${f.name} (${f.calories} kcal)`).join(' y ');
    
    return `Te faltan ${remainingCalories} kcal. Puedes comer ${foodList}.`;
  }
  
  // Si no hay buenas combinaciones, sugerir el alimento más cercano
  const closest = suitableFoods.reduce((prev, curr) => 
    Math.abs(curr.calories - remainingCalories) < Math.abs(prev.calories - remainingCalories) ? curr : prev
  );
  
  return `Te faltan ${remainingCalories} kcal. Puedes comer ${closest.name} (${closest.calories} kcal).`;
};

export function MotivationalMessage({
  consumed,
  goal
}: MotivationalMessageProps) {
  const percentage = consumed / goal * 100;
  const remaining = goal - consumed;
  
  const getMessage = () => {
    if (percentage >= 90 && percentage <= 110) {
      const messageArray = MESSAGES.perfect;
      return messageArray[Math.floor(Math.random() * messageArray.length)];
    } else if (percentage > 110) {
      const messageArray = MESSAGES.over;
      return messageArray[Math.floor(Math.random() * messageArray.length)];
    } else {
      // Cuando faltan calorías, mostrar sugerencia de alimentos
      return getFoodSuggestions(remaining);
    }
  };
  
  return <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-none">
      <p className="text-center text-lg font-medium text-gray-800 dark:text-gray-200">
        {getMessage()}
      </p>
    </Card>;
}