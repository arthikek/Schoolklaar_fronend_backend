import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: '#fff',
        foreground: '#fff',
        primary: {
          DEFAULT: '#0172A3',//'#73A3B4',
          foreground: '#0172A3', //'#73A3B4-foreground',
        },
        secondary: {
          DEFAULT: '#F3FAFF', //'#4E7583',
          foreground: '#F3FAFF', //'#4E7583',
        },
        tertairy: {
          DEFAULT: '#DBEFFF',// '#6786A3',
          foreground: '#DBEFFF' //'#6786A3',
        },
        quadrairy: {
          DEFAULT: '#62C8F4',// '#6786A3',
          foreground: '#62C8F4' //'#6786A3',
        },
        quintary: {
          DEFAULT: '#009FE3',// '#6786A3',
          foreground: '#009FE3' //'#6786A3',
        },
        dark: {
          DEFAULT: '#121212',
          foreground: '#121212',
        },
        muted: {
          DEFAULT: '#3D3D3D',
          foreground: '#3D3D3D',
        },
      },
    },
  },
  plugins: [require("daisyui")],
}
export default config
