import React, { useState } from 'react';
import { XIcon, ScaleIcon } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
interface WeightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (weight: number) => void;
  currentWeight?: number;
}
export function WeightModal({
  isOpen,
  onClose,
  onSave,
  currentWeight
}: WeightModalProps) {
  const [weight, setWeight] = useState(currentWeight?.toString() || '');
  const [error, setError] = useState('');
  if (!isOpen) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const weightNum = parseFloat(weight);
    if (!weight || isNaN(weightNum)) {
      setError('Por favor ingresa un peso válido');
      return;
    }
    if (weightNum < 20 || weightNum > 300) {
      setError('El peso debe estar entre 20 y 300 kg');
      return;
    }
    onSave(weightNum);
    setWeight('');
    onClose();
  };
  const handleClose = () => {
    setWeight('');
    setError('');
    onClose();
  };
  return <div className="fixed inset-0 bg-black/60 dark:bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#161b22] rounded-2xl w-full max-w-md border border-gray-200 dark:border-[#30363d] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <ScaleIcon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Registrar peso
            </h3>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <XIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input label="Peso (kg)" type="number" step="0.1" value={weight} onChange={e => setWeight(e.target.value)} placeholder="Ej: 70.5" error={error} helperText="Ingresa tu peso actual en kilogramos" autoFocus />

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Guardar peso
            </Button>
          </div>
        </form>

        {currentWeight && <div className="px-6 pb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Peso actual:{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                {currentWeight} kg
              </span>
            </p>
          </div>}
      </div>
    </div>;
}