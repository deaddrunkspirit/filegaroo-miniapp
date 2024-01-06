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
          primary: '#fffcfc',
          secondary: '#4d5968',
          onprimary: '#171a21',
          onsecondary: '#fffcfc',
        },
        dark: {
          primary: '#171a21',
          secondary: '#20232c',
          onprimary: '#fffcfc',
          onsecondary: '#fffcfc',
        },
        color_input: '#f0f0ed',
        color_alert: '#e91414',
        color_orange: '#ffbb2d',
      },
      fontSize: {
        'xs': '0.5rem',
        'sm': '0.625rem',
        'md': '0.75rem',
        'lg': '1rem',
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

