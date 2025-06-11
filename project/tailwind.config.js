module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      primary: '#f2c8c9', 
      secondary: '#383644', 
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
