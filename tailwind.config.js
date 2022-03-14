module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        'ubuntu': ['Ubuntu'],
        'montserrat': ['Montserrat'],
        'inter': ['Inter'],
        'rubik': ['Rubik']
      }
    },
    colors: {
      'starbuy-indigo': '#6366F1',
      'starbuy-yellow': '#FFDD4A'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}