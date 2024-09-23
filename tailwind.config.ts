import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        lg: '1000px',
      },
      backgroundImage: {
        'gradient-overlay':
          'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.30015756302521013) 11%, rgba(0,0,0,0) 21%, rgba(0,0,0,0) 79%, rgba(0,0,0,0.30015756302521013) 89%, rgba(0,0,0,0.7035189075630253) 100%)',
      },
      colors: {
        primary: 'var(--primary)',
        'meet-black': 'var(--meet-black)',
        'icon-blue': 'var(--icon-blue)',
        'hover-primary': '#1a6dde',
        black: '#000000DE',
        gray: '#444746',
        'meet-gray': '#5f6368',
        'dark-gray': '#3c4043',
        'meet-dark-gray': '#2e3235',
        'border-gray': '#747775',
        'light-gray': '#f1f3f4',
        'hairline-gray': '#dadce0',
        'container-gray': '#2c2c2c',
        'meet-blue': '#0b57d0',
        'light-blue': '#659df6',
        'deep-blue': '#1b44c8',
        'icon-hover-blue': '#afcbfa',
        'meet-red': '#ea4335',
        'hover-red': '#eb5346',
        'meet-orange': '#fa7b17',
      },
      spacing: {
        '4.5': '1.125rem',
        '6.5': '1.625rem',
        '9.5': '2.375rem',
        '13': '3.25rem',
        '17': '4.25rem',
        '32.5': '8.125rem',
        '42': '10.5rem',
        '57.5': '14.375rem',
        '70': '17.5rem',
        '90': '22.5rem',
        '94': '23.5rem',
        '100': '25rem',
        '112': '28rem',
        '135': '33.75rem',
        '152': '38rem',
        '156': '39rem',
        '185': '46.25rem',
        '3/10': '30%',
      },
      lineHeight: {
        '4.5': '1.125rem',
        '13': '3.25rem',
      },
      fontFamily: {
        roboto: ['Roboto', 'Arial', 'sans-serif'],
        'sans-serif': ['sans-serif', 'Arial'],
        'google-sans': ['Google Sans', 'Roboto', 'Arial', 'sans-serif'],
        'product-sans': ['Product Sans', 'Roboto', 'Arial', 'sans-serif'],
      },
      fontSize: {
        xl: ['1.125rem', '1.5rem'],
        '1x': ['1.375rem', '1.75rem'],
        '3xl': ['1.75rem', '2.25rem'],
        '5xl': ['2.812rem', '3.25rem'],
      },
      maxWidth: {
        sm: '22.625rem',
        xl: '38rem',
        '2xl': '39rem',
        '3xl': '47.75rem',
      },
      zIndex: {
        '1': '1',
        '2': '2',
        '3': '3',
      },
      padding: {
        full: '100%',
      },
      letterSpacing: {
        loose: '0.00625em',
        looser: '0.0107142857em',
        loosest: '0.0142857143em',
        wide: '0.0421em',
        wider: '0.06em',
      },
      translate: {
        '22.5': '5.625rem',
      },
      boxShadow: {
        shadow:
          '0 1px 2px 0 rgba(60,64,67,.3),0 1px 3px 1px rgba(60,64,67,.15)',
        dark: '0 1px 2px 0 rgba(0,0,0,.3),0 2px 6px 2px rgba(0,0,0,.15)',
      },
      transitionDuration: {
        '15': '15ms',
        '250': '250ms',
      },
      animation: {
        rotate: 'rotate 2s linear infinite',
        dash: 'dash 1.25s ease-in-out infinite',
        popup: 'popup 0.5s ease-in-out',
        'fade-in': '0.5s ease-in fade-in 0s forwards',
        'delayed-fade-in': 'delayed-fade-in 0.75s cubic-bezier(.4,0,.2,1)',
        'transition-overlay-fade-in':
          'transition-overlay-fade-in 0.5s linear both',
        countdown: 'countdown 60s linear infinite forwards',
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
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'delayed-fade-in': {
          '0%': { opacity: '0' },
          '66%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'transition-overlay-fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '0.9' },
        },
        countdown: {
          '0%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '113' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
