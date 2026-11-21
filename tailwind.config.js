/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        milk: '#FFFDF8',
        cocoa: '#2A170E',
        cream: {
          DEFAULT: '#FDF6EC',
          light: '#FFFDF8',
          soft: '#F7E6D0',
          dark: '#EED9C4',
        },
        espresso: {
          DEFAULT: '#23170F',
          deep: '#1A1009',
          border: '#3A261B',
          soft: '#4A3528',
          muted: '#7A6253',
        },
        terracotta: {
          DEFAULT: '#B8502D',
          hover: '#9C3F20',
          ink: '#8E3F15',
          soft: '#F9CDBF',
        },
        wood: {
          light: '#D9A773',
          DEFAULT: '#C78E59',
          dark: '#4A2C20',
          rust: '#9E4B2E',
          terracotta: '#B55838',
          wall: '#3B241A',
        },
        honey: {
          DEFAULT: '#F2BE6B',
          soft: '#FBE3B4',
          deep: '#D8A24A',
          tan: '#E7C592',
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
        script: ['"Shantell Sans"', '"Shantell Sans Fallback"', 'Caveat', 'cursive'],
        scrawl: ['"Shantell Sans"', '"Shantell Sans Fallback"', 'cursive'],
      },
      boxShadow: {
        // Soft storybook bottom-lip shadows
        'lip-sm': '0 2px 0 #23170F',
        'lip-md': '0 3.5px 0 #23170F',
        'lip-lg': '0 5px 0 #23170F',
        'lip-press': '0 1px 0 #23170F',
        // Gentle card elevation
        'card-soft': '0 4px 14px rgba(35, 23, 15, 0.06), 0 1px 0 #3A261B',
        'card-hover': '0 8px 24px rgba(35, 23, 15, 0.1), 0 2px 0 #3A261B',
      },
      borderRadius: {
        'pill': '9999px',
        'arch': '9999px 9999px 16px 16px',
        'arch-lg': '9999px 9999px 24px 24px',
      },
      animation: {
        'float-slow': 'float 4s ease-in-out infinite',
        'twinkle': 'twinkle 2.2s ease-in-out infinite',
        'wiggle': 'wiggle 0.45s ease-in-out infinite',
        'marquee': 'marquee 28s linear infinite',
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
          '0%, 100%': { transform: 'rotate(-14deg)' },
          '50%': { transform: 'rotate(18deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
