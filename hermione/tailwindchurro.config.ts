import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        llblue: {
          50: '#3E5EFF',
          100: '#294DFF',
          200: '#002BFF',
          300: '#0023D7',
          400: '#001DAE',
          500: '#001685',
          600: '#001685',
          700: '#000315',
          800: '#000000',
          900: '#000000',
          950: '#000000'
        },
        llyellow: {
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FAF7EA',
          300: '#F1EBC9',
          400: '#E9DEA8',
          500: '#E1D288',
          600: '#D9C667',
          700: '#CEB53A',
          800: '#A6912A',
          900: '#796A1E',
          950: '#635719'
        },
      },
    }
  }
}