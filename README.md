# CalorApp - Aplicación de Seguimiento de Calorías

## 🚀 Actualizaciones Recientes

### Mejoras Aplicadas (Noviembre 2025)

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

## 🎯 Características

- 📊 Seguimiento diario de calorías
- 🍽️ Registro por comidas (desayuno, almuerzo, cena, snacks)
- 📈 Historial de consumo
- ⚖️ Seguimiento de peso
- 🌓 Modo oscuro
- 📱 Diseño responsive

## 🧰 Stack Tecnológico

- **Framework**: React 18
- **Build Tool**: Vite 6 + SWC
- **Routing**: React Router v7
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Language**: TypeScript 5.7

## 📂 Estructura del Proyecto

```
src/
├── components/      # Componentes reutilizables
├── context/        # Context API para estado global
├── data/           # Datos estáticos
├── hooks/          # Custom hooks
├── pages/          # Páginas de la aplicación
├── utils/          # Utilidades y helpers
└── types.ts        # Definiciones de tipos TypeScript
```

## 🎨 Componentes Principales

- **Button**: Botón reutilizable con variantes
- **Card**: Contenedor con estilos predefinidos
- **Input**: Campo de entrada con validación
- **Select**: Selector con opciones
- **ProgressCircle**: Círculo de progreso animado
- **FoodItem**: Item de comida con cálculo de calorías

## 🔧 Hooks Personalizados

- **useLocalStorage**: Persistencia en localStorage con sincronización
- **useDarkMode**: Gestión del tema oscuro

## 📝 Próximas Mejoras Sugeridas

- [ ] Implementar tests con Vitest
- [ ] Añadir PWA capabilities
- [ ] Migrar a Zustand para state management
- [ ] Implementar Error Boundaries
- [ ] Añadir i18n para internacionalización
- [ ] Integración con API backend
- [ ] Autenticación real con OAuth

## 📄 Licencia

Proyecto privado
