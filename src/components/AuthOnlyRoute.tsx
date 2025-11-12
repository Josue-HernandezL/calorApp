import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

interface AuthOnlyRouteProps {
  children: ReactNode;
}

/**
 * AuthOnlyRoute - Protege rutas que solo requieren autenticación de Firebase Auth
 * (no requieren perfil completo en Firestore)
 * 
 * Usado para:
 * - /completar-registro: Usuario autenticado pero sin perfil
 */
export function AuthOnlyRoute({ children }: AuthOnlyRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    console.log('🔐 AuthOnlyRoute: Verificando autenticación...');
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log('🔐 AuthOnlyRoute: Estado de auth cambió:', firebaseUser ? '✅ Autenticado' : '❌ No autenticado');
      setIsAuthenticated(!!firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  // Mientras carga, mostrar spinner
  if (isAuthenticated === null) {
    console.log('🔐 AuthOnlyRoute: Cargando estado de autenticación...');
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated) {
    console.log('❌ AuthOnlyRoute: Usuario no autenticado, redirigiendo a /login');
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, permitir acceso
  console.log('✅ AuthOnlyRoute: Usuario autenticado, permitiendo acceso');
  return <>{children}</>;
}
