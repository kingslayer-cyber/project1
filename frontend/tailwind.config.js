/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff2ee',
          100: '#ffe1d5',
          200: '#ffbea6',
          300: '#ff9470',
          400: '#ff6a3c',
          500: '#ff5722', // Primary
          600: '#e93c00',
          700: '#c22e00',
          800: '#9a2700',
          900: '#7b2400',
        },
        secondary: {
          50: '#e0f7f6',
          100: '#b3eeea',
          200: '#80e4dd',
          300: '#4ddbd0',
          400: '#26d3c5',
          500: '#00bfa5', // Secondary
          600: '#00ac95',
          700: '#009681',
          800: '#00806f',
          900: '#005b4f',
        },
        accent: {
          50: '#fee8e7',
          100: '#fcc7c3',
          200: '#fa9f99',
          300: '#f7766c',
          400: '#f6594c',
          500: '#f44336', // Accent
          600: '#e53935',
          700: '#d32f2f',
          800: '#c62828',
          900: '#b71c1c',
        },
        success: {
          500: '#4caf50',
        },
        warning: {
          500: '#ff9800',
        },
        error: {
          500: '#f44336',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      spacing: {
        '72': '18rem',
        '80': '20rem',
        '88': '22rem',
        '96': '24rem',
      },
    },
  },
  plugins: [],
};