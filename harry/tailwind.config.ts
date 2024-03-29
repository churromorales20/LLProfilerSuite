import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'

export default <Partial<Config>>{
  plugins: [
    // ...
    require('@tailwindcss/line-clamp'),
  ],
}