import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContextWithFirebase';
import { LandingPage } from './pages/LandingPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthOnlyRoute } from './components/AuthOnlyRoute';

const LoginPage = lazy(() => import('./pages/LoginPage').then(module => ({ default: module.LoginPage })));
const SignupPage = lazy(() => import('./pages/SignupPage').then(module => ({ default: module.SignupPage })));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage').then(module => ({ default: module.RegistrationPage })));
const DashboardPage = lazy(() => import('./pages/DashboardPage').then(module => ({ default: module.DashboardPage })));
const DiaryPage = lazy(() => import('./pages/DiaryPage').then(module => ({ default: module.DiaryPage })));
const HistoryPage = lazy(() => import('./pages/HistoryPage').then(module => ({ default: module.HistoryPage })));
const MorePage = lazy(() => import('./pages/MorePage').then(module => ({ default: module.MorePage })));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
    <div className="text-lg text-gray-600 dark:text-gray-400">Cargando...</div>
  </div>
);

export function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<SignupPage />} />
            <Route 
              path="/completar-registro" 
              element={
                <AuthOnlyRoute>
                  <RegistrationPage />
                </AuthOnlyRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/diario" 
              element={
                <ProtectedRoute>
                  <DiaryPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/historial" 
              element={
                <ProtectedRoute>
                  <HistoryPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/mas" 
              element={
                <ProtectedRoute>
                  <MorePage />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </UserProvider>
    </BrowserRouter>
  );
}