import React from 'react';
import { Card } from './Card';
interface MotivationalMessageProps {
  consumed: number;
  goal: number;
}
const MESSAGES = {
  perfect: ['¡Excelente! Estás logrando tus metas 💪', '¡Perfecto! Mantén ese ritmo 🎯', '¡Increíble! Estás en el camino correcto ⭐', '¡Genial! Tu disciplina está dando frutos 🌟'],
  over: ['Ups… mañana lo harás mejor 😅', 'No te preocupes, todos tenemos días así 🤗', 'Mañana es un nuevo día para empezar 🌅', 'Recuerda: el equilibrio es la clave 💫'],
  under: ['Te faltan energías, ¡come algo nutritivo! 🍎', '¡No olvides alimentarte bien! 🥗', 'Tu cuerpo necesita más energía 💪', 'Recuerda comer lo suficiente para tu día 🍽️']
};
export function MotivationalMessage({
  consumed,
  goal
}: MotivationalMessageProps) {
  const percentage = consumed / goal * 100;
  const getMessage = () => {
    let messageArray: string[];
    if (percentage >= 90 && percentage <= 110) {
      messageArray = MESSAGES.perfect;
    } else if (percentage > 110) {
      messageArray = MESSAGES.over;
    } else {
      messageArray = MESSAGES.under;
    }
    return messageArray[Math.floor(Math.random() * messageArray.length)];
  };
  return <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-none">
      <p className="text-center text-lg font-medium text-gray-800 dark:text-gray-200">
        {getMessage()}
      </p>
    </Card>;
}