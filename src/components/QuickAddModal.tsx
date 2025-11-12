import { useState } from 'react';
import { SearchIcon, ScaleIcon, XIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { WeightModal } from './WeightModal';
import { useUser } from '../hooks/useUser';
interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export function QuickAddModal({
  isOpen,
  onClose
}: QuickAddModalProps) {
  const navigate = useNavigate();
  const {
    user,
    addWeightEntry
  } = useUser();
  const [showWeightModal, setShowWeightModal] = useState(false);
  if (!isOpen) return null;
  const handleRegistrarAlimento = () => {
    onClose();
    navigate('/diario');
  };
  const handlePeso = () => {
    setShowWeightModal(true);
  };
  const handleSaveWeight = (weight: number) => {
    addWeightEntry(weight);
    setShowWeightModal(false);
    onClose();
  };
  return <>
      <div className="fixed inset-0 bg-black/60 dark:bg-black/80 z-50 flex items-end sm:items-center justify-center p-4">
        <div className="bg-white dark:bg-[#161b22] rounded-t-2xl sm:rounded-2xl w-full max-w-md border-t-4 border-[#2196F3] sm:border-t-0 sm:border border-gray-200 dark:border-[#30363d] shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Acceso rápido
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <XIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Options */}
          <div className="p-4 space-y-3">
            {/* Registrar alimento */}
            <button onClick={handleRegistrarAlimento} className="w-full flex items-center gap-4 p-4 bg-gray-50 dark:bg-[#0d1117] hover:bg-gray-100 dark:hover:bg-[#1a1f2e] rounded-xl transition-colors border border-gray-200 dark:border-[#30363d]">
              <div className="w-12 h-12 bg-[#2196F3] rounded-full flex items-center justify-center flex-shrink-0">
                <SearchIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg font-medium text-gray-900 dark:text-white">
                Registrar alimento
              </span>
            </button>

            {/* Peso */}
            <button onClick={handlePeso} className="w-full flex items-center gap-4 p-4 bg-gray-50 dark:bg-[#0d1117] hover:bg-gray-100 dark:hover:bg-[#1a1f2e] rounded-xl transition-colors border border-gray-200 dark:border-[#30363d]">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <ScaleIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg font-medium text-gray-900 dark:text-white">
                Registrar peso
              </span>
            </button>
          </div>
        </div>
      </div>

      <WeightModal isOpen={showWeightModal} onClose={() => setShowWeightModal(false)} onSave={handleSaveWeight} currentWeight={user?.weight} />
    </>;
}