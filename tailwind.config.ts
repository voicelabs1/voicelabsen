import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)'],
        mono: ['var(--font-dm-mono)'],
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeSlideIn: {
          '0%': {
            opacity: '0',
            transform: 'translateX(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        spin: {
          '0%': {
            transform: 'rotate(0deg)'
          },
          '100%': {
            transform: 'rotate(360deg)'
          }
        }
      },
      animation: {
        'scroll': 'scroll 30s linear infinite',
        'fadeSlideIn': 'fadeSlideIn 0.5s ease-out forwards',
        'spin-slow': 'spin 20s linear infinite'
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#4B5563', // text-gray-600
            p: {
              marginTop: '2em',
              marginBottom: '2em',
              lineHeight: '1.8',
              fontSize: '1.125rem',
            },
            'h1, h2, h3, h4': {
              color: '#111827', // text-gray-900
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: '500',
              letterSpacing: '-0.02em',
            },
            h2: {
              fontSize: '2.25rem',
              marginTop: '3em',
              marginBottom: '1em',
              lineHeight: '1.3',
            },
            h3: {
              fontSize: '1.5rem',
              marginTop: '2.5em',
              marginBottom: '1em',
              lineHeight: '1.3',
            },
            ul: {
              marginTop: '2em',
              marginBottom: '2em',
            },
            'ul > li': {
              marginTop: '0.75em',
              marginBottom: '0.75em',
              paddingLeft: '1.75em',
            },
            'ul > li::before': {
              backgroundColor: '#4B5563',
              width: '0.375em',
              height: '0.375em',
              top: '0.6875em',
              left: '0.25em',
            },
            strong: {
              fontWeight: '600',
              color: '#111827', // text-gray-900
            },
            a: {
              color: '#0063f2',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: '#0051c9',
              },
            },
          },
        },
        lg: {
          css: {
            fontSize: '1.125rem',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
