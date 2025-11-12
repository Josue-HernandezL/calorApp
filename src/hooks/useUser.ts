import { useContext } from 'react';
import { UserContext } from '../context/UserContextWithFirebase';

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser debe usarse dentro de un UserProvider');
  }
  return context;
}
