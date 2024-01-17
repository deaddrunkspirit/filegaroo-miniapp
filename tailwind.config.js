/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          primary: '#F0EFEA',
          secondary: '#4d5968',
          onprimary: '#171a21',
          onsecondary: '#F0EFEA',
        },
        dark: {
          primary: '#171a21',
          secondary: '#20232c',
          onprimary: '#F0EFEA',
          onsecondary: '#F0EFEA',
        },
        color_input: '#f0f0ed',
        color_alert: '#e91414',
        color_orange: '#ffbb2d',
      },
      fontSize: {
        'xs': '.375rem',
        'sm': '3.5vw',
        'md': '4.25vw',
        'lg': '5.5vw',
      },
      fontFamily: {
        'sf-pro-text': ['SF Pro Text', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        'body': {
          fontFamily: theme('fontFamily.sf-pro-text'),
        },
      });
    },
  ],
}

