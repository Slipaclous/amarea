/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette de luxe noir, blanc et bruns
        luxury: {
          black: '#0a0a0a',
          'black-soft': '#1a1a1a',
          white: '#ffffff',
          'white-cream': '#fafafa',
          brown: {
            50: '#faf8f6',
            100: '#f4f0eb',
            200: '#e8ddd4',
            300: '#d4c4b0',
            400: '#c4a882',
            500: '#b8956a',
            600: '#a67c52',
            700: '#8b6b47',
            800: '#6b5238',
            900: '#4a3726',
          },
          gold: {
            50: '#fffdf7',
            100: '#fff9e6',
            200: '#fff2cc',
            300: '#ffe699',
            400: '#ffd966',
            500: '#ffcc33',
            600: '#e6b800',
            700: '#cc9900',
            800: '#997700',
            900: '#665500',
          }
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-down': 'slideDown 0.8s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(184, 149, 106, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(184, 149, 106, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}

