
import { numberFormats } from "./number-formats"

export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: "USD",
  numberFormats,
}))