/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0a0a',
        'bg-secondary': '#141414',
        'bg-card': '#1a1a1a',
        'accent-silver': '#c0c0c0',
        'accent-gold': '#d4af37',
        'text-primary': '#ffffff',
        'text-secondary': '#999999',
        'border-light': 'rgba(255, 255, 255, 0.1)',
        'border-medium': 'rgba(255, 255, 255, 0.2)',
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        work: ['Work Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
