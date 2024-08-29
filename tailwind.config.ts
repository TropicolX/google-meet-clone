import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        rotate: 'rotate 2s linear infinite',
        dash: 'dash 1.25s ease-in-out infinite',
        popup: 'popup 0.5s ease-in-out',
        delayedFadeIn: 'delayedFadeIn 0.5s cubic-bezier(.4,0,.2,1)',
      },
      keyframes: {
        rotate: {
          '100%': { transform: 'rotate(360deg)' },
        },
        dash: {
          '0%': { strokeDasharray: '1, 200', strokeDashoffset: '0' },
          '50%': { strokeDasharray: '89, 200', strokeDashoffset: '-35px' },
          '100%': { strokeDasharray: '89, 200', strokeDashoffset: '-124px' },
        },
        popup: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-90px)' },
        },
        delayedFadeIn: {
          '0%': { opacity: '0' },
          '66%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
