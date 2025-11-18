# 📱 CalorApp - Aplicación de Seguimiento de Calorías

> Aplicación web moderna para el seguimiento diario de consumo calórico, registro de alimentos y monitoreo de peso corporal con autenticación Firebase y sistema de recomendaciones inteligentes.

---

## 📋 Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Características Principales](#-características-principales)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Guía de Uso](#-guía-de-uso)
- [Documentación Técnica](#-documentación-técnica)
- [Actualizaciones Recientes](#-actualizaciones-recientes)
- [Roadmap](#-roadmap)

---

## 🎯 Descripción General

CalorApp es una aplicación web progresiva diseñada para ayudar a usuarios a mantener un control preciso de su consumo calórico diario. Utiliza fórmulas científicas para calcular necesidades calóricas personalizadas (TMB y TDEE) y ofrece un sistema inteligente de sugerencias nutricionales.

### Objetivos del Proyecto

- ✅ **Precisión nutricional**: Cálculo de calorías basado en TMB (Tasa Metabólica Basal) y TDEE (Gasto Energético Diario Total)
- ✅ **Facilidad de uso**: Interfaz intuitiva con registro rápido de alimentos
- ✅ **Flexibilidad**: Medición por gramos o unidades según preferencia del usuario
- ✅ **Motivación**: Sistema de mensajes contextuales con sugerencias personalizadas
- ✅ **Persistencia**: Sincronización en tiempo real con Firebase Firestore

### Casos de Uso

1. **Usuario fitness**: Seguimiento preciso de macros para objetivos deportivos
2. **Pérdida de peso**: Control de déficit calórico con recomendaciones diarias
3. **Mantenimiento saludable**: Balance nutricional y registro histórico
4. **Nutricionistas**: Herramienta de seguimiento para pacientes

---

#### ✅ Dependencias Modernizadas
- React Router v7
- Vite v6 con plugin SWC
- TypeScript 5.7
- ESLint v9 (flat config)
- Todas las dependencias actualizadas a sus últimas versiones

#### ✅ Optimizaciones de Rendimiento
- Componentes memoizados con `React.memo`
- Hooks optimizados con `useCallback` y `useMemo`
- Lazy loading de páginas con code splitting
- Context API optimizado para prevenir re-renders

#### ✅ Mejoras en Configuración
- Alias de paths configurados (@, @components, @hooks, etc.)
- Code splitting inteligente por vendor
- Compilación más rápida con SWC
- ESLint moderno con flat config

#### ✅ Sistema de Fechas y Seguimiento Histórico
- **Orden correcto de días en gráfica**: Lunes a domingo en el historial de progreso
- **Registro en fechas pasadas**: Permite guardar alimentos en cualquier fecha seleccionada, no solo en el día actual
- **Manejo seguro de zonas horarias**: Implementación de fechas sin problemas de UTC

#### ✅ Sistema Flexible de Medición de Alimentos
- **Medición por unidades**: 14+ alimentos con medición por piezas, tazas, rebanadas o vasos
- **Medición por gramos**: Opción tradicional de pesaje para todos los alimentos
- **Toggle dinámico**: Interfaz intuitiva para cambiar entre unidades y gramos
- **Conversión automática**: Cálculo de calorías preciso independiente del tipo de medición
- **Ejemplos incluidos**: Manzana (pieza), Arroz (taza), Pan (rebanada), Agua (vaso), etc.

#### ✅ Sistema de Mensajes Motivacionales Inteligentes
- **Mensajes contextuales**: Retroalimentación basada en el progreso calórico del día
  - ✨ Progreso óptimo: Felicitaciones cuando estás dentro del rango saludable
  - ⚠️ Exceso de calorías: Sugerencias de actividad física cuando superas tu meta
  - 🍽️ Déficit calórico: Recomendaciones de alimentos cuando faltan calorías
- **Sugerencias inteligentes de alimentos**: Sistema de recomendación que sugiere combinaciones de 1-3 alimentos para completar calorías faltantes
  - Algoritmo de coincidencia óptima con tolerancias ajustables
  - 14 alimentos en base de datos con calorías precisas
  - Generación automática de combinaciones que se ajusten a tus necesidades
  - Ejemplos: "Te faltan 350 kcal. Puedes comer 1 taza de arroz (200 kcal) y un plátano (150 kcal)"

#### ✅ Autenticación Mejorada
- **Registro con email y contraseña**: Sistema completo de autenticación tradicional además de Google OAuth
- **Manejo inteligente de errores**: Mensajes claros y específicos para cada tipo de error
  - Email ya registrado con redirección automática a login
  - Contraseña débil con requisitos explícitos
  - Email inválido con formato correcto
  - Errores de red con reintentos sugeridos
- **Supresión de errores de bloqueadores**: Sistema que silencia errores de Firebase causados por ad-blockers sin afectar la funcionalidad
- **Validación en tiempo real**: Feedback inmediato durante el proceso de registro

## 🛠️ Instalación

```bash
npm install
```

## 🏃 Desarrollo

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 📋 Lint

```bash
npm run lint
```

---

## ✨ Características Principales

### 🔐 Autenticación Segura
- **OAuth con Google**: Login rápido con cuenta Google
- **Email/Contraseña**: Sistema tradicional con validación robusta
- **Manejo de errores**: Mensajes claros y redirección automática
- **Persistencia de sesión**: Mantiene usuario autenticado entre sesiones

### 📊 Seguimiento Nutricional
- **Registro por comidas**: Organización en desayuno, almuerzo, cena y snacks
- **Cálculo automático**: TMB y TDEE personalizados según edad, sexo, peso, altura y actividad
- **Base de datos local**: 14+ alimentos precargados con información nutricional
- **Búsqueda inteligente**: Filtrado en tiempo real de alimentos

### ⚖️ Medición Flexible
- **Por gramos**: Pesaje tradicional para precisión máxima
- **Por unidades**: Medición práctica (piezas, tazas, rebanadas, vasos)
- **Toggle dinámico**: Cambio instantáneo entre sistemas de medición
- **Conversión automática**: Cálculo preciso independiente del método

### 📅 Gestión Temporal
- **Selector de fechas**: Registro en fechas pasadas o futuras
- **Historial de 7 días**: Gráfica visual de consumo semanal
- **Persistencia por día**: Cada fecha mantiene su propio registro
- **Formato seguro**: Manejo de zonas horarias sin errores UTC

### 💬 Sistema Motivacional
- **Mensajes contextuales**: Retroalimentación basada en progreso diario
  - ✨ **Progreso óptimo**: Cuando estás dentro del rango saludable (±100 kcal)
  - ⚠️ **Exceso calórico**: Sugerencias de actividad física cuando superas tu meta
  - 🍽️ **Déficit calórico**: Recomendaciones de alimentos para completar tu día
- **Sugerencias inteligentes**: Algoritmo que genera combinaciones de 1-3 alimentos
  - Tolerancias ajustables (40% single, 30% pairs, 20% triples)
  - 14 alimentos en base de datos con calorías exactas
  - Ejemplos: "Te faltan 350 kcal. Puedes comer 1 taza de arroz (200 kcal) y un plátano (150 kcal)"

### 📈 Seguimiento de Peso
- **Registro periódico**: Añadir mediciones de peso
- **Historial visual**: Gráfica de evolución de peso
- **Peso actual**: Sincronización automática con perfil de usuario

### 🌓 Experiencia de Usuario
- **Modo oscuro**: Toggle automático con preferencias del sistema
- **Diseño responsive**: Optimizado para móvil, tablet y desktop
- **Navegación inferior**: Acceso rápido a todas las secciones
- **Feedback visual**: Círculos de progreso animados

---

## 🧰 Stack Tecnológico

### Frontend Framework
- **React 18.3.1**: Biblioteca UI con componentes funcionales y hooks
- **TypeScript 5.7**: Type-safety completo en toda la aplicación
- **React Router v7**: Enrutamiento con lazy loading y code splitting

### Build Tools
- **Vite 6**: Build tool ultra-rápido con HMR instantáneo
- **SWC Plugin**: Compilador Rust para máxima velocidad
- **Path Aliases**: Imports limpios (@, @components, @hooks, etc.)

### Backend & Database
- **Firebase 12.5.0**:
  - **Authentication**: Google OAuth + Email/Password
  - **Firestore**: Base de datos NoSQL en tiempo real
  - **Security Rules**: Protección a nivel de documento

### UI & Styling
- **Tailwind CSS 3.4**: Framework utility-first para estilos
- **PostCSS**: Procesamiento de CSS con autoprefixer
- **Lucide React 0.468**: Iconos SVG optimizados

### Data Visualization
- **Recharts 2.14.1**: Gráficas responsive y animadas
  - BarChart para historial semanal
  - LineChart para evolución de peso

### Development Tools
- **ESLint 9**: Linting moderno con flat config
- **TypeScript ESLint**: Reglas específicas para TypeScript
- **React Hooks Plugin**: Validación de reglas de hooks

### Type System
```typescript
// Interfaces principales
User: Perfil completo con datos antropométricos
Food: Alimento con calorías y sistemas de medición
FoodEntry: Registro de consumo con timestamp
DailyLog: Agregación diaria de entradas
WeightEntry: Medición de peso con fecha
```

---

## 🏗️ Arquitectura del Proyecto

### Estructura de Directorios

```
calorApp/
├── src/
│   ├── components/          # 🧩 Componentes UI reutilizables
│   │   ├── AuthOnlyRoute.tsx       # Guard para rutas autenticadas
│   │   ├── BottomNav.tsx           # Navegación inferior con iconos
│   │   ├── Button.tsx              # Botón reutilizable con variantes
│   │   ├── CalorieSummary.tsx      # Resumen de calorías por comida
│   │   ├── Card.tsx                # Contenedor estilizado
│   │   ├── FoodItem.tsx            # ⭐ Item de comida con medición dual
│   │   ├── FoodSearchBar.tsx       # Buscador con filtrado en tiempo real
│   │   ├── Input.tsx               # Input con validación
│   │   ├── MealSection.tsx         # Sección de comida con lista de entries
│   │   ├── MotivationalMessage.tsx # ⭐ Mensajes con sugerencias inteligentes
│   │   ├── ProgressCircle.tsx      # Círculo de progreso SVG animado
│   │   ├── ProtectedRoute.tsx      # Guard para rutas públicas
│   │   ├── QuickAddModal.tsx       # Modal para añadir alimentos
│   │   ├── Select.tsx              # Selector con opciones
│   │   ├── ThemeToggle.tsx         # Toggle de modo oscuro
│   │   └── WeightModal.tsx         # Modal de registro de peso
│   │
│   ├── context/             # 🔄 Estado global con Context API
│   │   ├── UserContext.tsx            # Context con localStorage (dev)
│   │   └── UserContextWithFirebase.tsx # ⭐ Context con Firebase (prod)
│   │
│   ├── data/                # 📦 Datos estáticos
│   │   └── foods.ts         # Base de datos de 14+ alimentos
│   │
│   ├── hooks/               # 🪝 Custom React Hooks
│   │   ├── useDarkMode.ts   # Gestión de tema oscuro
│   │   ├── useLocalStorage.ts # Persistencia en localStorage
│   │   └── useUser.ts       # Acceso al contexto de usuario
│   │
│   ├── pages/               # 📄 Páginas principales
│   │   ├── DashboardPage.tsx    # Vista general con resumen
│   │   ├── DiaryPage.tsx        # ⭐ Registro diario con selector de fecha
│   │   ├── HistoryPage.tsx      # ⭐ Gráfica de 7 días
│   │   ├── LandingPage.tsx      # Página de bienvenida
│   │   ├── LoginPage.tsx        # Inicio de sesión
│   │   ├── MorePage.tsx         # Configuración y más opciones
│   │   ├── RegistrationPage.tsx # Registro de datos antropométricos
│   │   └── SignupPage.tsx       # ⭐ Registro de usuario mejorado
│   │
│   ├── services/            # 🔌 Servicios externos
│   │   └── authService.ts   # ⭐ Wrapper de Firebase con error handling
│   │
│   ├── utils/               # 🛠️ Utilidades
│   │   ├── calorieCalculator.ts # ⭐ Cálculo TMB y TDEE
│   │   └── errorHandler.ts      # ⭐ Manejo de errores de Firebase
│   │
│   ├── config/              # ⚙️ Configuración
│   │   └── firebase.ts      # Inicialización de Firebase
│   │
│   ├── App.tsx              # Componente raíz con Router
│   ├── index.tsx            # Entry point de React
│   ├── types.ts             # ⭐ Definiciones de tipos TypeScript
│   └── index.css            # Estilos globales + Tailwind
│
├── .env                     # Variables de entorno (gitignored)
├── .env.example             # Template de variables de entorno
├── eslint.config.js         # Configuración ESLint v9 (flat config)
├── tailwind.config.js       # Configuración Tailwind CSS
├── tsconfig.json            # Configuración TypeScript
├── vite.config.ts           # ⭐ Configuración Vite con aliases
├── vercel.json              # Configuración de deployment en Vercel
└── package.json             # Dependencias y scripts

⭐ = Archivos clave con funcionalidad crítica
```

### Patrones de Arquitectura

#### 🎨 **Component-Based Architecture**
- Componentes funcionales con hooks
- Separación de lógica (hooks) y presentación (components)
- Reutilización mediante props y composición

#### 🔄 **State Management**
```typescript
// Context API con optimizaciones
UserContext
  ├── User Profile (name, age, sex, weight, height, tdee)
  ├── Daily Logs (array de registros por fecha)
  ├── Weight Entries (historial de peso)
  └── Methods (addFoodEntry, removeFoodEntry, addWeightEntry)

// Uso de useMemo y useCallback para prevenir re-renders
const contextValue = useMemo(() => ({...}), [dependencies]);
```

#### 📡 **Firebase Integration Pattern**
```typescript
// authService.ts - Wrapper con manejo de errores
signInWithGoogle() → createUserProfile() → redirect
signInWithEmail() → getUserData() → context update
registerWithEmail() → error handling → auto-redirect

// Sincronización automática
useEffect(() => {
  onAuthStateChanged() → getUserData() → update context
}, []);

useEffect(() => {
  debounce(() => updateUserData(), 1000)
}, [dailyLogs, weightEntries]);
```

#### 🛡️ **Error Handling Strategy**
```typescript
// errorHandler.ts - Filtrado de errores de ad-blockers
isBlockedByClientError() → return true/false
handleFirebaseError() → log only real errors
safeFirebaseOperation() → try/catch con fallback
```

---

## 🔧 Instalación y Configuración

### Prerrequisitos

- **Node.js**: v18.0.0 o superior
- **npm**: v9.0.0 o superior
- **Cuenta Firebase**: Proyecto configurado con Authentication y Firestore

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/Josue-HernandezL/calorApp.git
cd calorApp
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

### Paso 3: Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Paso 4: Configurar Firebase

1. **Crear proyecto en [Firebase Console](https://console.firebase.google.com/)**
2. **Habilitar Authentication**:
   - Google Sign-In
   - Email/Password
3. **Crear base de datos Firestore**:
   - Modo producción
   - Reglas de seguridad (ver abajo)
4. **Copiar configuración** al archivo `.env`

#### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Paso 5: Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo con HMR
npm run build    # Compila para producción en carpeta dist/
npm run preview  # Preview del build de producción
npm run lint     # Ejecuta ESLint para validar código
```

### Deployment en Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configurar variables de entorno en Vercel Dashboard
```

El archivo `vercel.json` ya está configurado para React Router.

---

## 📖 Guía de Uso

### 1️⃣ Registro de Usuario

1. Accede a la landing page
2. Click en "Comenzar"
3. Elige método de registro:
   - **Con Google**: Un click y listo
   - **Con Email**: Completa formulario de registro
4. Completa tu perfil antropométrico:
   - Nombre, edad, sexo
   - Peso (kg), altura (cm)
   - Nivel de actividad física

### 2️⃣ Registro Diario de Alimentos

#### Dashboard
- Vista general de tu día actual
- Círculo de progreso con calorías consumidas/objetivo
- Resumen por comidas

#### Diario (Diary)
1. **Seleccionar fecha**: Usa el selector en la parte superior
2. **Añadir alimento**:
   - Click en el botón "+" de cualquier comida
   - Busca el alimento en el buscador
   - Elige sistema de medición:
     - **Por unidades**: 1 pieza, 1 taza, etc.
     - **Por gramos**: Cantidad exacta pesada
   - Ajusta la cantidad
   - Confirma

3. **Ver resumen**: Calorías totales y por comida
4. **Mensaje motivacional**: Retroalimentación inteligente

### 3️⃣ Historial y Progreso

#### History
- **Gráfica de 7 días**: Visualiza tu consumo semanal
- **Detalles por día**: Click en un día para ver entries
- **Comparación con objetivo**: Línea roja marca tu TDEE

### 4️⃣ Seguimiento de Peso

1. Accede al modal de peso desde Dashboard
2. Ingresa tu peso actual
3. Guarda el registro
4. Visualiza evolución en gráfica

### 5️⃣ Configuración

#### Modo Oscuro
- Toggle en la esquina superior derecha
- Se guarda la preferencia automáticamente

#### Cerrar Sesión
- Accede a "More" (Más)
- Click en "Cerrar Sesión"

---

## 📚 Documentación Técnica

### Tipos de Datos (TypeScript)

```typescript
// Usuario completo con perfil antropométrico
interface User {
  name: string;
  email?: string;
  age: number;
  sex: 'male' | 'female';
  weight: number;        // kg - peso inicial
  height: number;        // cm
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'intense';
  tdee: number;          // calorías objetivo diarias
  createdAt: string;
  authMethod?: 'email' | 'google';
  photoURL?: string;
}

// Alimento con sistema de medición dual
interface Food {
  id: string;
  name: string;
  category: 'fruits' | 'proteins' | 'dairy' | 'beverages' | 'grains' | 'vegetables';
  caloriesPer100g: number;
  hasUnits?: boolean;
  caloriesPerUnit?: number;
  unitName?: string;      // 'pieza', 'taza', 'rebanada', 'vaso'
  gramsPerUnit?: number;
}

// Registro de consumo individual
interface FoodEntry {
  id: string;
  foodId: string;
  foodName: string;
  grams: number;
  calories: number;
  timestamp: string;
  meal: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  quantity?: number;
  unit?: 'grams' | 'units';
}

// Log diario agregado
interface DailyLog {
  date: string;           // YYYY-MM-DD
  entries: FoodEntry[];
  totalCalories: number;
  breakfastCalories: number;
  lunchCalories: number;
  dinnerCalories: number;
  snackCalories: number;
}

// Registro de peso
interface WeightEntry {
  id: string;
  weight: number;         // kg
  date: string;           // YYYY-MM-DD
  timestamp: string;
}
```

### Cálculos Nutricionales

#### TMB (Tasa Metabólica Basal)
Fórmula de Harris-Benedict:

```typescript
// Hombres
TMB = 88.362 + (13.397 × peso_kg) + (4.799 × altura_cm) - (5.677 × edad)

// Mujeres
TMB = 447.593 + (9.247 × peso_kg) + (3.098 × altura_cm) - (4.33 × edad)
```

#### TDEE (Gasto Energético Diario Total)
```typescript
TDEE = TMB × Factor de Actividad

Factores:
- Sedentario:          1.2   (poco o ningún ejercicio)
- Actividad ligera:    1.375 (ejercicio 1-3 días/semana)
- Actividad moderada:  1.55  (ejercicio 3-5 días/semana)
- Actividad intensa:   1.725 (ejercicio 6-7 días/semana)
```

### Sistema de Sugerencias Inteligentes

#### Algoritmo de Coincidencia

```typescript
function getFoodSuggestions(remainingCalories: number): string {
  // 1. Sugerencia individual (tolerancia 40%)
  const singleMatch = foods.find(food => 
    Math.abs(food.calories - remainingCalories) <= remainingCalories * 0.4
  );
  
  // 2. Combinación de 2 alimentos (tolerancia 30%)
  for (const food1 of foods) {
    for (const food2 of foods) {
      const total = food1.calories + food2.calories;
      if (Math.abs(total - remainingCalories) <= remainingCalories * 0.3) {
        return `${food1.name} (${food1.calories} kcal) y ${food2.name}`;
      }
    }
  }
  
  // 3. Combinación de 3 alimentos (tolerancia 20%)
  // ... similar lógica ...
  
  // 4. Fallback: alimento más cercano
  return closestFood;
}
```

#### Base de Datos de Sugerencias

```typescript
const suggestionFoods = [
  { name: '1 taza de arroz', calories: 200 },
  { name: '1 plátano', calories: 105 },
  { name: '1 manzana', calories: 95 },
  { name: '100g de pechuga de pollo', calories: 165 },
  { name: '1 taza de yogurt', calories: 150 },
  // ... 14 alimentos total
];
```

### Context API - UserContext

#### Métodos Principales

```typescript
interface UserContextType {
  // Estado
  user: User | null;
  firebaseUid: string | null;
  isLoading: boolean;
  dailyLogs: DailyLog[];
  weightEntries: WeightEntry[];
  
  // Métodos de usuario
  setUser: (user: User | null) => void;
  
  // Métodos de alimentos
  addFoodEntry: (entry: Omit<FoodEntry, 'id' | 'timestamp'>, date?: string) => void;
  removeFoodEntry: (entryId: string, date?: string) => void;
  getTodayLog: () => DailyLog;
  getLogByDate: (date: string) => DailyLog;
  clearTodayLog: () => void;
  
  // Métodos de peso
  addWeightEntry: (weight: number) => void;
  getLatestWeight: () => WeightEntry | null;
  getWeightHistory: (days: number) => WeightEntry[];
  
  // Sincronización
  syncUserData: () => Promise<void>;
}
```

#### Flujo de Sincronización

```typescript
// 1. Usuario se autentica
onAuthStateChanged(auth, async (firebaseUser) => {
  // 2. Cargar datos desde Firestore
  const userData = await getUserData(firebaseUser.uid);
  
  // 3. Actualizar contexto
  setUser(userData);
  setDailyLogs(userData.dailyLogs);
  setWeightEntries(userData.weightEntries);
});

// 4. Auto-guardar cambios (debounced 1 segundo)
useEffect(() => {
  const timeoutId = setTimeout(() => {
    updateUserData(firebaseUid, { dailyLogs, weightEntries });
  }, 1000);
  
  return () => clearTimeout(timeoutId);
}, [dailyLogs, weightEntries]);
```

### Manejo de Fechas sin UTC

```typescript
// ❌ PROBLEMA: Parsing de ISO string causa errores de zona horaria
const badDate = new Date('2025-11-18'); // Puede ser 17 o 18 según TZ

// ✅ SOLUCIÓN: Construcción manual de fechas
const goodDate = new Date(2025, 10, 18); // Siempre 18 de noviembre
goodDate.setHours(0, 0, 0, 0);

// Generación de últimos 7 días
const last7Days = Array.from({length: 7}, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (6 - i));
  date.setHours(0, 0, 0, 0);
  return date;
});
```

### Error Handling - Firebase

```typescript
// Detección de errores de ad-blockers
export const isBlockedByClientError = (error: any): boolean => {
  const errorMessage = error?.message || '';
  const errorCode = error?.code || '';
  
  const blockedPatterns = [
    'ERR_BLOCKED_BY_CLIENT',
    'net::ERR_BLOCKED_BY_CLIENT',
    'Failed to fetch',
    'NetworkError'
  ];
  
  const blockedCodes = ['unavailable', 'cancelled', 'failed-precondition'];
  
  return (
    blockedPatterns.some(p => errorMessage.includes(p)) ||
    blockedCodes.includes(errorCode)
  );
};

// Uso en authService
try {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
} catch (error) {
  if (isBlockedByClientError(error)) {
    return null; // Silenciar error de ad-blocker
  }
  throw error; // Propagar error real
}
```

---


### Decisiones de Arquitectura

#### ✅ **Por qué Context API y no Redux/Zustand**
- Estado relativamente simple sin lógica compleja
- Menos boilerplate y configuración
- Suficiente para las necesidades del proyecto
- Optimizado con useMemo para evitar re-renders

#### ✅ **Por qué Firebase y no API REST custom**
- Tiempo de desarrollo reducido
- Autenticación integrada (Google OAuth + Email)
- Base de datos en tiempo real
- Escalabilidad sin gestión de servidores
- Security rules a nivel de documento

#### ✅ **Por qué Vite y no Create React App**
- Compilación 10-100x más rápida
- HMR instantáneo
- Build optimizado con code splitting
- Soporte nativo de TypeScript sin configuración

#### ✅ **Por qué TailwindCSS y no CSS-in-JS**
- Utility-first para desarrollo rápido
- Bundle size optimizado (purge CSS)
- No hay overhead de runtime
- Consistencia de diseño con design tokens

---

## 🗺️ Roadmap

### 🔜 Próximas Características

#### Fase 1: Testing & Quality (Q1 2026)
- [ ] Tests unitarios con Vitest
- [ ] Tests de integración para Context
- [ ] Tests E2E con Playwright
- [ ] Coverage mínimo del 80%

#### Fase 2: PWA & Offline (Q2 2026)
- [ ] Service Worker para caché offline
- [ ] Manifest.json para instalación
- [ ] Sincronización en segundo plano
- [ ] Notificaciones push

#### Fase 3: Features Avanzadas (Q2-Q3 2026)
- [ ] Sistema de metas personalizadas (pérdida, ganancia, mantenimiento)
- [ ] Seguimiento de macronutrientes (proteínas, carbohidratos, grasas)
- [ ] Integración con API externa de alimentos (USDA, Open Food Facts)
- [ ] Escaneo de códigos de barras
- [ ] Reconocimiento de alimentos con IA (visión computacional)

#### Fase 4: Social & Gamification (Q3-Q4 2026)
- [ ] Sistema de logros y badges
- [ ] Streaks de días consecutivos
- [ ] Compartir progreso en redes sociales
- [ ] Comunidad y desafíos grupales

#### Fase 5: Analytics & Reports (Q4 2026)
- [ ] Dashboard avanzado con estadísticas
- [ ] Exportar historial a PDF/CSV/Excel
- [ ] Gráficas de tendencias (30/60/90 días)
- [ ] Informes nutricionales personalizados

#### Fase 6: Internacionalización (Q1 2027)
- [ ] i18n con react-i18next
- [ ] Soporte para inglés, español, portugués
- [ ] Conversión de unidades imperiales/métricas
- [ ] Localización de alimentos por región

### 🔄 Mejoras Técnicas

- [ ] Migrar a Zustand para state management más escalable
- [ ] Implementar Error Boundaries para manejo de errores
- [ ] Añadir Storybook para documentación de componentes
- [ ] Optimizar imágenes con formato WebP
- [ ] Implementar virtual scrolling para listas largas
- [ ] Rate limiting en llamadas a Firebase
- [ ] Migrar a React Router v7 data APIs (loaders/actions)

---

## 🤝 Contribuciones

Este es un proyecto privado, pero si deseas contribuir:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de Contribución

- Seguir convenciones de TypeScript estrictas
- Escribir tests para nuevas features
- Mantener cobertura de tests >80%
- Documentar funciones complejas con JSDoc
- Seguir guía de estilo de ESLint

---

## 📝 Licencia

Proyecto privado - Todos los derechos reservados © 2025 Josue Hernandez

---

## 👨‍💻 Autor

**Josue Hernandez**
- GitHub: [@Josue-HernandezL](https://github.com/Josue-HernandezL)

---

## 🙏 Agradecimientos

- **Firebase** - Backend as a Service
- **Vercel** - Hosting y deployment
- **Tailwind Labs** - Framework CSS
- **Recharts** - Biblioteca de gráficas
- **Lucide** - Iconos SVG
- **Comunidad React** - Recursos y documentación

---

<div align="center">

**⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub ⭐**

Hecho con ❤️ y ☕ por Josue Hernandez

</div>
