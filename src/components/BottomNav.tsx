import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutGridIcon, BookOpenIcon, PlusIcon, TrendingUpIcon, MoreHorizontalIcon } from 'lucide-react';
import { QuickAddModal } from './QuickAddModal';
export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const tabs = [{
    id: 'dashboard',
    label: 'Tablero',
    icon: LayoutGridIcon,
    path: '/dashboard'
  }, {
    id: 'diary',
    label: 'Diario',
    icon: BookOpenIcon,
    path: '/diario'
  }, {
    id: 'add',
    label: '',
    icon: PlusIcon,
    path: '',
    isCenter: true
  }, {
    id: 'progress',
    label: 'Progreso',
    icon: TrendingUpIcon,
    path: '/historial'
  }, {
    id: 'more',
    label: 'Más',
    icon: MoreHorizontalIcon,
    path: '/mas'
  }];
  const isActive = (path: string) => location.pathname === path;
  const handleTabClick = (tab: (typeof tabs)[0]) => {
    if (tab.isCenter) {
      setShowQuickAdd(true);
    } else {
      navigate(tab.path);
    }
  };
  return <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#161b22] border-t border-gray-200 dark:border-gray-800 safe-area-bottom z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-2">
          <div className="flex items-center justify-around h-16">
            {tabs.map(tab => {
            const Icon = tab.icon;
            if (tab.isCenter) {
              return <button key={tab.id} onClick={() => handleTabClick(tab)} className="flex flex-col items-center justify-center -mt-6">
                    <div className="w-14 h-14 bg-[#2196F3] rounded-full flex items-center justify-center shadow-lg hover:bg-[#1976D2] transition-colors">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </button>;
            }
            return <button key={tab.id} onClick={() => handleTabClick(tab)} className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${isActive(tab.path) ? 'text-[#2196F3]' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}>
                  <Icon className="w-6 h-6 mb-1" />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>;
          })}
          </div>
        </div>
      </nav>

      <QuickAddModal isOpen={showQuickAdd} onClose={() => setShowQuickAdd(false)} />
    </>;
}