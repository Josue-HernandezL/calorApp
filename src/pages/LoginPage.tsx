import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppleIcon, MailIcon, LoaderIcon } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { ThemeToggle } from '../components/ThemeToggle';
import { useUser } from '../hooks/useUser';
import { signInWithGoogle, signInWithEmail, handleGoogleRedirectResult } from '../services/authService';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser, isLoading: authLoading } = useUser();
  const navigate = useNavigate();

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
          setError('Error al iniciar sesión con Google. Por favor intenta de nuevo.');
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

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    setIsLoading(true);

    try {
      const userData = await signInWithEmail(email, password);
      
      if (userData) {
        setUser(userData);
        navigate('/dashboard');
      } else {
        setError('Usuario no encontrado. Por favor verifica tus credenciales.');
      }
    } catch (err) {
      const error = err as { code?: string };
      if (error.code === 'auth/user-not-found') {
        setError('Usuario no encontrado. Por favor regístrate primero.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Contraseña incorrecta.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Correo electrónico inválido.');
      } else {
        setError('Error al iniciar sesión. Intenta de nuevo.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);

    try {
      console.log('🔵 Iniciando login con Google...');
      const userData = await signInWithGoogle(false); // false = usar popup
      
      console.log('🔵 Resultado de login:', userData);
      
      if (userData) {
        console.log('✅ Usuario existente encontrado');
        setUser(userData);
        navigate('/dashboard');
      } else {
        console.log('⚠️ Usuario nuevo, redirigiendo a completar-registro');
        // Usuario autenticado con Google pero sin perfil completo
        console.log('🔄 Navegando a /completar-registro...');
        navigate('/completar-registro', { replace: true });
        console.log('✅ Navegación ejecutada');
      }
    } catch (err) {
      console.error('❌ Error en handleGoogleLogin:', err);
      const error = err as { code?: string; message?: string };
      
      if (error.code === 'auth/popup-closed-by-user') {
        setError('Inicio de sesión cancelado. Por favor intenta de nuevo.');
      } else if (error.code === 'auth/popup-blocked') {
        setError('El popup fue bloqueado. Por favor habilita los popups para este sitio.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        setError('Solicitud de popup cancelada. Intenta de nuevo.');
      } else if (error.code === 'auth/network-request-failed') {
        setError('Error de red. Verifica tu conexión a internet.');
      } else {
        setError(`Error al iniciar sesión con Google: ${error.message || 'Intenta de nuevo.'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen bg-gray-50 dark:bg-[#0d1117] flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#2196F3] rounded-full mb-4">
            <AppleIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            CaloriApp
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Inicia sesión para continuar
          </p>
        </div>

        <Card>
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <Input label="Correo electrónico" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" />

            <Input label="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" fullWidth size="lg" disabled={isLoading}>
              {isLoading ? (
                <>
                  <LoaderIcon className="w-5 h-5 mr-2 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                <>
                  <MailIcon className="w-5 h-5 mr-2" />
                  Iniciar sesión
                </>
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-[#161b22] text-gray-600 dark:text-gray-400">
                O continúa con
              </span>
            </div>
          </div>

          <Button type="button" variant="outline" fullWidth size="lg" onClick={handleGoogleLogin} disabled={isLoading}>
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
                Continuar con Google
              </>
            )}
          </Button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ¿No tienes cuenta?{' '}
              <button onClick={() => navigate('/registro')} className="text-[#2196F3] hover:underline font-medium">
                Regístrate
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>;
}