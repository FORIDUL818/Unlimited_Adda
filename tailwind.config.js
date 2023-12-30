/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
     colors: {
      "primay":"#fff",
       'secondary':'#000',
       'thirdary':'#78E75A',
       'fourth':'#ecf0f1',
       'fith':'#34495e',
      'sixth':'#688AEE',
       'seventh':'#F45170',
     },
    fontFamily:{
     roboto:[ 'Roboto'],
     oswold:[ 'Oswald']
    },
    screens: {
      'sm': '375px',
      'md': '724px',
      'lg': '1080px',
      'xl': '1220px',
      '2xl': '1320px',
      
    },
    extend: {},
  },
  plugins: [],
}