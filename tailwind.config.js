const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        main: '#DB4041',
        'main-lt': '#ffcbcd',
        'main-dk': '#2f1112',
        black: '#180b0b',
        tpBlack: '#1a011421',
        tpWhite: '#fff0fc21',
      },
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
      },
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
