import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, LoaderIcon } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Card } from '../components/Card';
import { ThemeToggle } from '../components/ThemeToggle';
import { useUser } from '../hooks/useUser';
import { calculateTMB, calculateTDEE, getActivityLevelLabel } from '../utils/calorieCalculator';
import { ActivityLevel } from '../types';
import { createUserProfile } from '../services/authService';
import { auth } from '../config/firebase';

export function RegistrationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { firebaseUid } = useUser();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: location.state?.name || auth.currentUser?.displayName || '',
    email: location.state?.email || auth.currentUser?.email || '',
    age: '',
    sex: 'male' as 'male' | 'female',
    weight: '',
    height: '',
    activityLevel: 'moderate' as ActivityLevel
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Log cuando se monta el componente
  useEffect(() => {
    console.log('📝 RegistrationPage: Componente montado');
    console.log('📝 Usuario actual:', auth.currentUser?.email);
    console.log('📝 FirebaseUid del contexto:', firebaseUid);
  }, []);

  // Actualizar datos cuando cambie el usuario autenticado
  useEffect(() => {
    if (auth.currentUser) {
      console.log('📝 RegistrationPage: Actualizando datos del usuario de Firebase Auth');
      setFormData(prev => ({
        ...prev,
        name: prev.name || auth.currentUser?.displayName || '',
        email: prev.email || auth.currentUser?.email || ''
      }));
    }
  }, []);

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.age || parseInt(formData.age) < 10 || parseInt(formData.age) > 120) {
      newErrors.age = 'Ingresa una edad válida (10-120)';
    }
    if (!formData.weight || parseFloat(formData.weight) < 20 || parseFloat(formData.weight) > 300) {
      newErrors.weight = 'Ingresa un peso válido (20-300 kg)';
    }
    if (!formData.height || parseFloat(formData.height) < 100 || parseFloat(formData.height) > 250) {
      newErrors.height = 'Ingresa una altura válida (100-250 cm)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const tmb = calculateTMB(parseInt(formData.age), formData.sex, parseFloat(formData.weight), parseFloat(formData.height));
      const tdee = calculateTDEE(tmb, formData.activityLevel);

      const authMethod = auth.currentUser?.providerData[0]?.providerId === 'google.com' ? 'google' : 'email';

      const userData = {
        name: formData.name,
        email: formData.email || auth.currentUser?.email || '',
        age: parseInt(formData.age),
        sex: formData.sex,
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height),
        activityLevel: formData.activityLevel,
        tdee,
        createdAt: new Date().toISOString(),
        authMethod: authMethod as 'google' | 'email',
        photoURL: auth.currentUser?.photoURL || undefined
      };

      // Obtener el UID del usuario autenticado
      const uid = firebaseUid || auth.currentUser?.uid;

      if (uid) {
        // Crear perfil en Firestore
        await createUserProfile(uid, userData);
        
        // El contexto actualizará automáticamente el estado
        navigate('/dashboard');
      } else {
        setErrors({ name: 'Error: No se encontró usuario autenticado.' });
      }
    } catch (error) {
      console.error('Error al crear perfil:', error);
      setErrors({ name: 'Error al crear el perfil. Intenta de nuevo.' });
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="max-w-2xl mx-auto pt-8">
        <Button variant="ghost" onClick={() => step === 1 ? navigate('/') : setStep(1)} className="mb-4">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Atrás
        </Button>

        <Card>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Configuración de perfil
            </h2>
            <div className="flex gap-2 mt-4">
              <div className={`h-2 flex-1 rounded ${step >= 1 ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`} />
              <div className={`h-2 flex-1 rounded ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`} />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Datos personales
                </h3>

                <Input label="Nombre" type="text" value={formData.name} onChange={e => setFormData({
              ...formData,
              name: e.target.value
            })} required />

                <Input label="Edad" type="number" value={formData.age} onChange={e => setFormData({
              ...formData,
              age: e.target.value
            })} error={errors.age} helperText="Entre 10 y 120 años" required />

                <Select label="Sexo" value={formData.sex} onChange={e => setFormData({
              ...formData,
              sex: e.target.value as 'male' | 'female'
            })} options={[{
              value: 'male',
              label: 'Masculino'
            }, {
              value: 'female',
              label: 'Femenino'
            }]} />

                <Input label="Peso (kg)" type="number" step="0.1" value={formData.weight} onChange={e => setFormData({
              ...formData,
              weight: e.target.value
            })} error={errors.weight} helperText="Entre 20 y 300 kg" required />

                <Input label="Altura (cm)" type="number" value={formData.height} onChange={e => setFormData({
              ...formData,
              height: e.target.value
            })} error={errors.height} helperText="Entre 100 y 250 cm" required />

                <Button type="button" onClick={handleNext} fullWidth size="lg" disabled={isLoading}>
                  Siguiente
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </div>}

            {step === 2 && <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Nivel de actividad física
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Selecciona el nivel que mejor describe tu actividad diaria
                </p>

                <div className="space-y-3">
                  {(['sedentary', 'light', 'moderate', 'intense'] as ActivityLevel[]).map(level => <label key={level} className={`
                        flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all
                        ${formData.activityLevel === level ? 'border-blue-600 bg-blue-50 dark:bg-blue-950' : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'}
                      `}>
                      <input type="radio" name="activityLevel" value={level} checked={formData.activityLevel === level} onChange={e => setFormData({
                  ...formData,
                  activityLevel: e.target.value as ActivityLevel
                })} className="w-4 h-4 text-blue-600" />
                      <div className="ml-3">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {getActivityLevelLabel(level)}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {level === 'sedentary' && 'Poco o ningún ejercicio'}
                          {level === 'light' && 'Ejercicio ligero 1-3 días/semana'}
                          {level === 'moderate' && 'Ejercicio moderado 3-5 días/semana'}
                          {level === 'intense' && 'Ejercicio intenso 6-7 días/semana'}
                        </p>
                      </div>
                    </label>)}
                </div>

                <Button type="submit" fullWidth size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <LoaderIcon className="w-5 h-5 mr-2 animate-spin" />
                      Guardando perfil...
                    </>
                  ) : (
                    'Calcular mi meta calórica'
                  )}
                </Button>
              </div>}
          </form>
        </Card>
      </div>
    </div>;
}