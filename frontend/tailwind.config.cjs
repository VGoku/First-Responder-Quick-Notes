// tailwind.config.cjs
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },

        // Status colors (for buttons, alerts, tags)
        success: {
          DEFAULT: '#22c55e',
          light: '#4ade80',
        },
        danger: {
          DEFAULT: '#ef4444',
          light: '#f87171',
        },
        warn: '#facc15',

        // App surfaces
        bg: '#0f0f0f',
        surface: '#111111',
      },

      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui'],
      },

      borderRadius: {
        md: '0.5rem',
        lg: '0.75rem',
      },
    },
  },
  plugins: [],
};