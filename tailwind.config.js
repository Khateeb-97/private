/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        romantic: {
          100: '#ffe4e6', // Rose 100
          500: '#f43f5e', // Rose 500
          600: '#e11d48', // Rose 600
        }
      },
      animation: {
        'heartbeat': 'heartbeat 1s infinite',
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        }
      }
    },
  },
  plugins: [],
}
