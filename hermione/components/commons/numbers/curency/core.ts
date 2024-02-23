export const MINUS = '-'

export type Input = number | string;

export interface Options {
  prefix: string
  suffix: string
  separator: string
  decimal: string
  precision: number
  minimumFractionDigits: number
  prefill: boolean
  reverseFill: boolean
  min?: number
  max?: number
  nullValue: string
}

export interface Config {
  options: Options
  oldValue: Input
  masked: Input
  unmasked: Input
}

/**
 * Creates a fuction to clone the objcet
 */
export function cloneDeep(data: object) {
  return JSON.parse(JSON.stringify(data))
}

/**
 * Updates the cursor position to the right place after the masking rule was applied
 */
export function updateCursor(el: HTMLInputElement, position: number) {
  const setSelectionRange = (): any => {
    el.setSelectionRange(position, position)
  }
  setSelectionRange()
  // Android Fix
  setTimeout(setSelectionRange, 1)
}

/**
 * Updates the element's value and unmasked value based on the masking config rules
 *
 * @param {CustomInputElement} el The input element to update
 * @param {object} [options]
 * @param {Boolean} options.emit Wether to dispatch a new InputEvent or not
 * @param {Boolean} options.force Forces the update even if the old value and the new value are the same
 */
/*export function updateValue(el: CustomInputElement, vnode: VNode | null, { emit = true, force = false, clean = false } = {}) {
  const { options, oldValue } = el
  const { reverseFill, max, min } = options
  const currentValue = vnode?.props?.value || el.value

  if (force || oldValue !== currentValue) {
    const number = new NumberFormat(options).clean(clean && !reverseFill)
    let masked = number.format(currentValue)
    let unmasked = number.clean(!reverseFill).unformat(currentValue)

    // check value with in range max and min value
    if (clean) {
      if (Number(max) === max && Number(unmasked) > max) {
        masked = number.format(max)
        unmasked = max.toString()
      } else if (Number(min) === min && Number(unmasked) < min) {
        masked = number.format(min)
        unmasked = min.toString()
      }
    }

    el.oldValue = masked
    el.unmasked = unmasked

    // safari makes the cursor jump to the end if el.value gets assign even if to the same value
    if (el.value !== masked) {
      el.value = masked
    }

    // this part needs to be outside the above IF statement for vuetify in firefox
    // drawback is that we endup with two's input events in firefox
    return emit && el.dispatchEvent(InputEvent('input'))
  }
}*/
