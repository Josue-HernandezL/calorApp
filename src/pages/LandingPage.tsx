import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppleIcon } from 'lucide-react';
import { Button } from '../components/Button';
import { ThemeToggle } from '../components/ThemeToggle';
import { useUser } from '../hooks/useUser';
export function LandingPage() {
  const {
    user
  } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  return <div className="min-h-screen bg-gray-50 dark:bg-[#0d1117] flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-[#2196F3] rounded-full mb-6">
          <AppleIcon className="w-12 h-12 text-white" />
        </div>

        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-3">
          CalorApp
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
          Tu compañero para una alimentación saludable
        </p>

        <div className="space-y-4">
          <Button onClick={() => navigate('/login')} fullWidth size="lg" className="text-lg">
            Iniciar sesión
          </Button>

          <Button onClick={() => navigate('/registro')} variant="outline" fullWidth size="lg" className="text-lg">
            Crear cuenta
          </Button>
        </div>

        <div className="mt-12 space-y-4 text-gray-600 dark:text-gray-400 text-sm">
          <p>✓ Calcula tu meta calórica personalizada</p>
          <p>✓ Registra tus comidas diarias</p>
          <p>✓ Monitorea tu progreso</p>
        </div>
      </div>
    </div>;
}