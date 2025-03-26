import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'light-gray': '#d1d3d4',
        'light-blue': 'rgba(0, 212, 255, 1)',
        'light-green': 'rgba(60, 180, 131, 1)',
        'dark-green': 'rgba(60, 160, 131, 1)',
      },
      boxShadow: {
        'dark-sm': '0 15px 30px rgba(0, 0, 0, 0.3)',
        inside: 'inset 0px 0px 30px -15px #000',
      },
      flex: {
        3: '3',
      },
      spacing: {
        '103': '31rem',
      },
    },
  },
  plugins: [],
}
export default config
