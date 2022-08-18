const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        main: '#CA3F4A',
        'main-lt': '#f7a2a4',
        'main-md-lt': '#89303c',
        'main-md': '#551f2a',
        'main-dk': '#211015',
        black: '#0a0404',
        tpBlack: '#1a011421',
        tpWhite: '#fff0fc21',
        green: '#1ac316'
      },
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
