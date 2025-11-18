import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, AppleIcon, LoaderIcon } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Card } from '../components/Card';
import { ThemeToggle } from '../components/ThemeToggle';
import { useUser } from '../hooks/useUser';
import { calculateTMB, calculateTDEE, getActivityLevelLabel } from '../utils/calorieCalculator';
import { ActivityLevel } from '../types';
import { signInWithGoogle, registerWithEmail, createUserProfile, handleGoogleRedirectResult } from '../services/authService';

export function SignupPage() {
  const navigate = useNavigate();
  const { user, setUser, isLoading: authLoading } = useUser();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    sex: 'male' as 'male' | 'female',
    weight: '',
    height: '',
    activityLevel: 'moderate' as ActivityLevel
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Manejar resultado de redirect de Google
  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        setIsLoading(true);
        const userData = await handleGoogleRedirectResult();
        
        if (userData) {
          setUser(userData);
          navigate('/dashboard', { replace: true });
        }
      } catch (err) {
        console.error('Error al manejar redirect de Google:', err);
        const error = err as { code?: string; message?: string };
        if (error.code && error.code !== 'auth/popup-closed-by-user') {
          setErrors({ general: 'Error al registrarse con Google. Por favor intenta de nuevo.' });
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkRedirectResult();
  }, [navigate, setUser]);

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (!authLoading && user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, authLoading, navigate]);

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'El nombre es requerido';
    if (!formData.email) newErrors.email = 'El email es requerido';
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const validateStep2 = () => {
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
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const tmb = calculateTMB(parseInt(formData.age), formData.sex, parseFloat(formData.weight), parseFloat(formData.height));
      const tdee = calculateTDEE(tmb, formData.activityLevel);

      const userData = {
        name: formData.name,
        email: formData.email,
        age: parseInt(formData.age),
        sex: formData.sex,
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height),
        activityLevel: formData.activityLevel,
        tdee,
        createdAt: new Date().toISOString(),
        authMethod: 'email' as const
      };

      // Crear usuario en Firebase Auth
      const authResult = await registerWithEmail(formData.email, formData.password);

      if (authResult) {
        // Crear perfil completo en Firestore
        await createUserProfile(authResult.firebaseUid, userData);

        // Establecer usuario en contexto (esto trigger el listener de Firebase)
        // El contexto cargará automáticamente los datos desde Firestore
        navigate('/dashboard');
      } else {
        setErrors({ general: 'Error al crear la cuenta. Intenta de nuevo.' });
      }
    } catch (err) {
      console.error('Error en registro:', err);
      const error = err as { code?: string; message?: string };
      
      if (error.code === 'auth/email-already-in-use') {
        setErrors({ 
          general: 'Este correo ya está registrado. ¿Quieres iniciar sesión?' 
        });
        // Opcionalmente redirigir al login después de unos segundos
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else if (error.code === 'auth/weak-password') {
        setErrors({ general: 'La contraseña es muy débil. Usa al menos 6 caracteres.' });
      } else if (error.code === 'auth/invalid-email') {
        setErrors({ general: 'El correo electrónico no es válido.' });
      } else if (error.code === 'auth/operation-not-allowed') {
        setErrors({ general: 'El registro con email/contraseña no está habilitado.' });
      } else if (error.code === 'auth/network-request-failed') {
        setErrors({ general: 'Error de conexión. Verifica tu internet.' });
      } else {
        setErrors({ general: error.message || 'Error al crear la cuenta. Intenta de nuevo.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);

    try {
      console.log('🔵 Iniciando registro con Google...');
      const userData = await signInWithGoogle(false); // false = usar popup

      console.log('🔵 Resultado de registro:', userData);

      if (userData) {
        console.log('✅ Usuario existente encontrado, redirigiendo a dashboard');
        setUser(userData);
        navigate('/dashboard');
      } else {
        console.log('⚠️ Usuario nuevo, redirigiendo a completar-registro');
        // Usuario autenticado pero sin perfil completo, redirigir a completar registro
        console.log('🔄 Navegando a /completar-registro...');
        navigate('/completar-registro', { replace: true });
        console.log('✅ Navegación ejecutada');
      }
    } catch (err) {
      console.error('❌ Error en handleGoogleSignup:', err);
      const error = err as { code?: string; message?: string };
      
      if (error.code === 'auth/popup-closed-by-user') {
        setErrors({ email: 'Registro cancelado. Por favor intenta de nuevo.' });
      } else if (error.code === 'auth/popup-blocked') {
        setErrors({ email: 'El popup fue bloqueado. Por favor habilita los popups para este sitio.' });
      } else if (error.code === 'auth/cancelled-popup-request') {
        setErrors({ email: 'Solicitud de popup cancelada. Intenta de nuevo.' });
      } else if (error.code === 'auth/network-request-failed') {
        setErrors({ email: 'Error de red. Verifica tu conexión a internet.' });
      } else {
        setErrors({ email: `Error al registrarse con Google: ${error.message || 'Intenta de nuevo.'}` });
      }
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen bg-gray-50 dark:bg-[#0d1117] p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="max-w-2xl mx-auto pt-8">
        <Button variant="ghost" onClick={() => step === 1 ? navigate('/') : setStep(step - 1)} className="mb-4">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Atrás
        </Button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#2196F3] rounded-full mb-4">
            <AppleIcon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Crear cuenta
          </h2>
        </div>

        <Card>
          <div className="mb-6">
            <div className="flex gap-2">
              <div className={`h-2 flex-1 rounded ${step >= 1 ? 'bg-[#2196F3]' : 'bg-gray-300 dark:bg-gray-700'}`} />
              <div className={`h-2 flex-1 rounded ${step >= 2 ? 'bg-[#2196F3]' : 'bg-gray-300 dark:bg-gray-700'}`} />
              <div className={`h-2 flex-1 rounded ${step >= 3 ? 'bg-[#2196F3]' : 'bg-gray-300 dark:bg-gray-700'}`} />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Información de cuenta
                </h3>

                <Button 
                  type="button" 
                  variant="outline" 
                  fullWidth 
                  size="lg" 
                  onClick={handleGoogleSignup}
                  disabled={isLoading}
                  className="mb-4"
                >
                  {isLoading ? (
                    <>
                      <LoaderIcon className="w-5 h-5 mr-2 animate-spin" />
                      Cargando...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Registrarse con Google
                    </>
                  )}
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-[#161b22] text-gray-500 dark:text-gray-400">
                      O continuar con email
                    </span>
                  </div>
                </div>

                <Input label="Nombre completo" type="text" value={formData.name} onChange={e => setFormData({
              ...formData,
              name: e.target.value
            })} error={errors.name} required />

                <Input label="Correo electrónico" type="email" value={formData.email} onChange={e => setFormData({
              ...formData,
              email: e.target.value
            })} error={errors.email} required />

                <Input label="Contraseña" type="password" value={formData.password} onChange={e => setFormData({
              ...formData,
              password: e.target.value
            })} error={errors.password} helperText="Mínimo 6 caracteres" required />

                <Button type="button" onClick={handleNext} fullWidth size="lg" disabled={isLoading}>
                  Siguiente
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </div>}

            {step === 2 && <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Datos personales
                </h3>

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

                <Button type="button" onClick={handleNext} fullWidth size="lg">
                  Siguiente
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </div>}

            {step === 3 && <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Nivel de actividad física
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Selecciona el nivel que mejor describe tu actividad diaria
                </p>

                <div className="space-y-3">
                  {(['sedentary', 'light', 'moderate', 'intense'] as ActivityLevel[]).map(level => <label key={level} className={`
                        flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all
                        ${formData.activityLevel === level ? 'border-[#2196F3] bg-blue-50 dark:bg-[#2196F3]/10' : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'}
                      `}>
                      <input type="radio" name="activityLevel" value={level} checked={formData.activityLevel === level} onChange={e => setFormData({
                  ...formData,
                  activityLevel: e.target.value as ActivityLevel
                })} className="w-4 h-4 text-[#2196F3]" />
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

                {errors.general && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400 text-center">
                      {errors.general}
                    </p>
                    {errors.general.includes('ya está registrado') && (
                      <button
                        type="button"
                        onClick={() => navigate('/login')}
                        className="mt-2 text-sm text-[#2196F3] hover:underline w-full text-center"
                      >
                        Ir a iniciar sesión
                      </button>
                    )}
                  </div>
                )}

                <Button type="submit" fullWidth size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <LoaderIcon className="w-5 h-5 mr-2 animate-spin" />
                      Creando cuenta...
                    </>
                  ) : (
                    'Crear cuenta'
                  )}
                </Button>
              </div>}
          </form>
        </Card>
      </div>
    </div>;
}