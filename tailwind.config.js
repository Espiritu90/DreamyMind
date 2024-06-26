/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: [
    'router-link-active',
  ],
  theme: {
    fontFamily:{
      fixel :['"FixelDisplay"', 'sans-serif']
    },
    extend: {
      fontSize:{
        '14px' : '14px',
      },
    }
  },
  plugins: []
}
