/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/(employers)/**/*.{js,ts,jsx,tsx,mdx}',
    './app/(home)/**/*.{js,ts,jsx,tsx,mdx}',
    './app/(auth)/**/*.{js,ts,jsx,tsx,mdx}',
    './app/(dashboard_employer)/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gray-400-50': 'rgba(226, 232, 240)', // 50% opacity version of gray-400
        'custom-dark-blue': '#132043'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
