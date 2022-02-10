const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1EBE71'
        },
        bg: {
          DEFAULT: '#F5F6F9'
        }
      },
      container: {
        screens: {
          sm: '100%',
          md: '100%',
          lg: '1024px',
          xl: '1280px'
        }
      },
      fontFamily: {
        sans: ['poppins', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
}
