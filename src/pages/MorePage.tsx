import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon, LogOutIcon, ChevronRightIcon, TrendingUpIcon, XIcon } from 'lucide-react';
import { useUser } from '../hooks/useUser';
import { BottomNav } from '../components/BottomNav';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ThemeToggle } from '../components/ThemeToggle';
import { WeightModal } from '../components/WeightModal';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { calculateTMB, calculateTDEE } from '../utils/calorieCalculator';
import { ActivityLevel } from '../types';
import { signOut, updateUserProfile } from '../services/authService';

export function MorePage() {
  const navigate = useNavigate();
  const {
    user,
    setUser,
    weightEntries,
    addWeightEntry,
    firebaseUid
  } = useUser();
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editSex, setEditSex] = useState<'male' | 'female'>('male');
  const [editHeight, setEditHeight] = useState('');
  const [editActivityLevel, setEditActivityLevel] = useState<ActivityLevel>('sedentary');
  
  // ProtectedRoute ya maneja la redirección, solo necesitamos verificar que user existe
  if (!user) {
    return null;
  }
  
  const handleLogout = async () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      try {
        await signOut();
        setUser(null);
        navigate('/');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
        alert('Error al cerrar sesión. Intenta de nuevo.');
      }
    }
  };
  const handleSaveWeight = (weight: number) => {
    addWeightEntry(weight);
  };

  const handleOpenProfile = () => {
    if (user) {
      setEditName(user.name);
      setEditEmail(user.email || '');
      setEditAge(user.age.toString());
      setEditSex(user.sex);
      setEditHeight(user.height.toString());
      setEditActivityLevel(user.activityLevel);
      setShowProfileModal(true);
    }
  };

  const handleSaveProfile = async () => {
    if (!user || !firebaseUid) return;

    const age = parseInt(editAge);
    const height = parseInt(editHeight);

    if (!editName || age <= 0 || height <= 0) {
      alert('Por favor completa todos los campos correctamente');
      return;
    }

    const tmb = calculateTMB(age, editSex, user.weight, height);
    const tdee = calculateTDEE(tmb, editActivityLevel);

    const updatedUser = {
      ...user,
      name: editName,
      email: editEmail,
      age,
      sex: editSex,
      height,
      activityLevel: editActivityLevel,
      tdee
    };

    try {
      // Actualizar en Firebase
      await updateUserProfile(firebaseUid, {
        name: editName,
        email: editEmail,
        age,
        sex: editSex,
        height,
        activityLevel: editActivityLevel,
        tdee
      });

      // Actualizar en el contexto local
      setUser(updatedUser);
      setShowProfileModal(false);
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      alert('Error al guardar los cambios. Intenta de nuevo.');
    }
  };

  const menuItems = [{
    icon: UserIcon,
    label: 'Mi perfil',
    onClick: handleOpenProfile
  }];
  
  const recentWeights = [...weightEntries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);
  return <div className="min-h-screen bg-gray-50 dark:bg-[#0d1117] pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Más
            </h1>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* User Info Card */}
        <Card className="mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#2196F3] rounded-full flex items-center justify-center">
              {user.photoURL ? <img src={user.photoURL} alt={user.name} className="w-full h-full rounded-full" /> : <span className="text-white font-bold text-2xl">
                  {user.name.charAt(0).toUpperCase()}
                </span>}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {user.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.email || 'Usuario'}
              </p>
            </div>
          </div>
        </Card>

        {/* Stats Card */}
        <Card className="mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.weight}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Peso (kg)
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.height}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Altura (cm)
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.tdee}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Meta (kcal)
              </p>
            </div>
          </div>
        </Card>

        {/* Weight History Card */}
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUpIcon className="w-5 h-5 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Historial de peso
              </h3>
            </div>
            <Button size="sm" onClick={() => setShowWeightModal(true)}>
              Agregar
            </Button>
          </div>

          {recentWeights.length > 0 ? <div className="space-y-2">
              {recentWeights.map(entry => <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#0d1117] rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {entry.weight} kg
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(entry.date).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
                    </p>
                  </div>
                  {entry === recentWeights[0] && <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full">
                      Actual
                    </span>}
                </div>)}
            </div> : <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No hay registros de peso
              </p>
              <Button onClick={() => setShowWeightModal(true)}>
                Registrar peso
              </Button>
            </div>}
        </Card>

        {/* Menu Items */}
        <Card className="mb-6 p-0">
          {menuItems.map((item, index) => {
          const Icon = item.icon;
          return <button key={index} onClick={item.onClick} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-[#1a1f2e] transition-colors border-b border-gray-200 dark:border-gray-800 last:border-b-0">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-900 dark:text-white">
                    {item.label}
                  </span>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
              </button>;
        })}
        </Card>

        {/* Logout Button */}
        <Button variant="outline" fullWidth onClick={handleLogout} className="border-red-500 text-red-500 hover:bg-red-500/10">
          <LogOutIcon className="w-5 h-5 mr-2" />
          Cerrar sesión
        </Button>
      </main>

      <BottomNav />
      
      <WeightModal isOpen={showWeightModal} onClose={() => setShowWeightModal(false)} onSave={handleSaveWeight} currentWeight={user.weight} />

      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#161b22] w-full max-w-lg rounded-lg border border-gray-200 dark:border-[#30363d] max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between sticky top-0 bg-white dark:bg-[#161b22]">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Editar perfil
              </h3>
              <button 
                onClick={() => setShowProfileModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-[#1a1f2e] rounded-lg transition-colors"
              >
                <XIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <Input
                label="Nombre"
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Tu nombre"
              />

              <Input
                label="Correo electrónico (opcional)"
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                placeholder="tu@email.com"
              />

              <Input
                label="Edad"
                type="number"
                value={editAge}
                onChange={(e) => setEditAge(e.target.value)}
                placeholder="25"
                min="1"
                max="120"
              />

              <Select
                label="Sexo"
                value={editSex}
                onChange={(e) => setEditSex(e.target.value as 'male' | 'female')}
                options={[
                  { value: 'male', label: 'Masculino' },
                  { value: 'female', label: 'Femenino' }
                ]}
              />

              <Input
                label="Altura (cm)"
                type="number"
                value={editHeight}
                onChange={(e) => setEditHeight(e.target.value)}
                placeholder="170"
                min="1"
                max="300"
              />

              <Select
                label="Nivel de actividad"
                value={editActivityLevel}
                onChange={(e) => setEditActivityLevel(e.target.value as ActivityLevel)}
                options={[
                  { value: 'sedentary', label: 'Sedentario (poco o ningún ejercicio)' },
                  { value: 'light', label: 'Actividad ligera (ejercicio 1-3 días/semana)' },
                  { value: 'moderate', label: 'Actividad moderada (ejercicio 3-5 días/semana)' },
                  { value: 'intense', label: 'Actividad intensa (ejercicio 6-7 días/semana)' }
                ]}
              />

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-900 dark:text-blue-200">
                  <strong>Nota:</strong> El peso actual se actualiza desde el historial de peso. 
                  Tu nueva meta calórica se calculará automáticamente según estos datos.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-800 flex gap-3 sticky bottom-0 bg-white dark:bg-[#161b22]">
              <Button 
                variant="outline" 
                fullWidth 
                onClick={() => setShowProfileModal(false)}
              >
                Cancelar
              </Button>
              <Button 
                fullWidth 
                onClick={handleSaveProfile}
              >
                Guardar cambios
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>;
}