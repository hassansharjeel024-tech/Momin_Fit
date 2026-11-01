import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0B0907',
        coal: '#120E0B',
        surface: '#1A1410',
        'surface-raised': '#231A14',
        line: '#33261C',
        bronze: '#8B5E34',
        caramel: '#C8935A',
        sand: '#E0B27E',
        cream: '#F4EBDD',
        taupe: '#B3A18E',
        mute: '#8F7F6F',
        danger: '#E0735F',
        success: '#8FB07A',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      maxWidth: {
        content: '1200px',
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      keyframes: {
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out both',
        'fade-in': 'fade-in 0.5s ease-out both',
        'spin-slow': 'spin-slow 0.7s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
