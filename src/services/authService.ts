import { 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc
} from 'firebase/firestore';
import { auth, googleProvider, db } from '../config/firebase';
import { User, DailyLog, WeightEntry } from '../types';

export interface UserData extends User {
  firebaseUid: string;
  dailyLogs: DailyLog[];
  weightEntries: WeightEntry[];
  lastUpdated: string;
}

// Función para manejar el resultado del redirect de Google
export const handleGoogleRedirectResult = async (): Promise<UserData | null> => {
  try {
    const result = await getRedirectResult(auth);
    
    if (!result) {
      return null;
    }

    const firebaseUser = result.user;
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }

    return null;
  } catch (error) {
    console.error('Error al manejar resultado de redirect:', error);
    throw error;
  }
};

export const signInWithGoogle = async (useRedirect = false): Promise<UserData | null> => {
  try {
    // Si se prefiere redirect (mejor para móviles y algunos navegadores)
    if (useRedirect) {
      await signInWithRedirect(auth, googleProvider);
      // La redirección ocurre aquí, el resultado se maneja en handleGoogleRedirectResult
      return null;
    }

    // Usar popup (por defecto)
    const result = await signInWithPopup(auth, googleProvider);
    const firebaseUser = result.user;

    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }

    return null;
  } catch (error) {
    console.error('Error al iniciar sesión con Google:', error);
    throw error;
  }
};

export const signInWithEmail = async (email: string, password: string): Promise<UserData | null> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = result.user;

    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }

    return null;
  } catch (error) {
    console.error('Error al iniciar sesión con email:', error);
    throw error;
  }
};

export const registerWithEmail = async (
  email: string, 
  password: string
): Promise<{ firebaseUid: string; email: string } | null> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return {
      firebaseUid: result.user.uid,
      email: result.user.email || email
    };
  } catch (error) {
    console.error('Error al registrarse con email:', error);
    throw error;
  }
};

export const createUserProfile = async (
  firebaseUid: string,
  userData: User
): Promise<void> => {
  try {
    const userDocRef = doc(db, 'users', firebaseUid);
    
    const fullUserData: UserData = {
      ...userData,
      firebaseUid,
      dailyLogs: [],
      weightEntries: [{
        id: `${Date.now()}-${Math.random()}`,
        weight: userData.weight,
        date: new Date().toISOString().split('T')[0],
        timestamp: new Date().toISOString()
      }],
      lastUpdated: new Date().toISOString()
    };

    await setDoc(userDocRef, fullUserData);
  } catch (error) {
    console.error('Error al crear perfil de usuario:', error);
    throw error;
  }
};

export const updateUserProfile = async (
  firebaseUid: string,
  userData: Partial<User>
): Promise<void> => {
  try {
    const userDocRef = doc(db, 'users', firebaseUid);
    await updateDoc(userDocRef, {
      ...userData,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    throw error;
  }
};

export const updateUserData = async (
  firebaseUid: string,
  data: Partial<UserData>
): Promise<void> => {
  try {
    const userDocRef = doc(db, 'users', firebaseUid);
    await updateDoc(userDocRef, {
      ...data,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error al actualizar datos:', error);
    throw error;
  }
};

export const getUserData = async (firebaseUid: string): Promise<UserData | null> => {
  try {
    const userDocRef = doc(db, 'users', firebaseUid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }

    return null;
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    throw error;
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw error;
  }
};
