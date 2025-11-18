// Utilidad para manejar errores comunes de Firebase causados por bloqueadores de anuncios

/**
 * Determina si un error de Firebase fue causado por un bloqueador de anuncios
 * o extensión del navegador y puede ser ignorado de forma segura
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isBlockedByClientError = (error: any): boolean => {
  if (!error) return false;
  
  const errorMessage = error?.message || '';
  const errorCode = error?.code || '';
  
  // Errores comunes causados por bloqueadores de anuncios
  const blockedPatterns = [
    'ERR_BLOCKED_BY_CLIENT',
    'net::ERR_BLOCKED_BY_CLIENT',
    'Failed to fetch',
    'NetworkError'
  ];
  
  const blockedCodes = [
    'unavailable',
    'cancelled',
    'failed-precondition'
  ];
  
  return (
    blockedPatterns.some(pattern => errorMessage.includes(pattern)) ||
    blockedCodes.includes(errorCode)
  );
};

/**
 * Maneja errores de Firebase de forma inteligente
 * Silencia errores de red causados por bloqueadores, pero registra errores reales
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleFirebaseError = (error: any, context: string = 'Firebase'): void => {
  if (isBlockedByClientError(error)) {
    // Estos errores son causados por extensiones del navegador, no son críticos
    // Silenciarlos para no confundir al usuario
    return;
  }
  
  // Registrar errores reales
  console.error(`${context}:`, error);
};

/**
 * Wrapper para operaciones de Firebase que pueden fallar por bloqueadores
 */
export async function safeFirebaseOperation<T>(
  operation: () => Promise<T>,
  fallbackValue: T,
  context: string = 'Firebase operation'
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (isBlockedByClientError(error)) {
      return fallbackValue;
    }
    handleFirebaseError(error, context);
    throw error;
  }
}
