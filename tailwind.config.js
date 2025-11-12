export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode colors
        light: {
          bg: '#f5f7fa',
          card: '#ffffff',
          border: '#e5e7eb',
          text: {
            primary: '#1f2937',
            secondary: '#6b7280',
          },
        },
        // Dark mode colors (MyFitnessPal style)
        dark: {
          bg: '#0d1117',
          card: '#161b22',
          border: '#30363d',
          text: {
            primary: '#ffffff',
            secondary: '#8b92a8',
          },
        },
        // Accent color (same for both modes)
        primary: {
          DEFAULT: '#2196F3',
          dark: '#1976D2',
          light: '#42A5F5',
        },
      },
    },
  },
  plugins: [],
}