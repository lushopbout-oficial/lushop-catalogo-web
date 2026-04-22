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
        'bg-primary':    '#f5f5f3',
        'bg-secondary':  '#ffffff',
        'bg-card':       '#ffffff',
        'bg-dark':       '#111111',
        'accent-silver': '#111111',
        'accent-gold':   '#c8a96e',
        'text-primary':  '#111111',
        'text-secondary':'#888888',
        'text-light':    '#ffffff',
        'border-light':  'rgba(0,0,0,0.08)',
        'border-medium': 'rgba(0,0,0,0.15)',
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        work:   ['Work Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
