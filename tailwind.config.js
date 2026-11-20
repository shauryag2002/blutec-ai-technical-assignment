/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FDF6EC',
          light: '#FFFDF8',
          soft: '#F7E6D0',
          dark: '#EED9C4',
        },
        espresso: {
          DEFAULT: '#2A1A14',
          deep: '#1D120D',
          soft: '#5A3A28',
          light: '#785838',
        },
        terracotta: {
          DEFAULT: '#B8502D',
          hover: '#9C3F20',
          ink: '#8E3F15',
          soft: '#F9CDBF',
        },
        wood: {
          light: '#D9A773',
          DEFAULT: '#C68E56',
          dark: '#A26535',
        },
        honey: {
          DEFAULT: '#F2BE6B',
          soft: '#FBE3B4',
          deep: '#D8A24A',
        },
        emerald: {
          DEFAULT: '#1E7F4F',
          hover: '#16633D',
          dark: '#144F31',
        },
        sky: {
          DEFAULT: '#BFDDF5',
          deep: '#2F6E9E',
        },
        washi: {
          blue: '#A7D3E8',
          pink: '#F2B6C1',
          yellow: '#F6DF8C',
          peach: '#F6D79A',
          green: '#C2E4C9',
        }
      },
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        script: ['Caveat', 'cursive'],
        hand: ['"Shantell Sans"', 'Caveat', 'ui-rounded', 'cursive'],
      },
      boxShadow: {
        'hard-sm': '3px 3px 0px #2A1A14',
        'hard-md': '5px 5px 0px #2A1A14',
        'hard-lg': '8px 8px 0px #2A1A14',
        'hard-xl': '12px 12px 0px #2A1A14',
        'hard-gold': '5px 5px 0px #D8A24A',
        'hard-cream': '5px 5px 0px #FFFDF8',
        'hard-press': '1px 1px 0px #2A1A14',
      },
      borderRadius: {
        'pill': '9999px',
        'arch': '9999px 9999px 12px 12px',
        'arch-lg': '9999px 9999px 24px 24px',
      },
      animation: {
        'float-slow': 'float 4s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.3, transform: 'scale(0.8)' },
          '50%': { opacity: 1, transform: 'scale(1.15)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
}
