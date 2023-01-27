import { customAlphabet } from 'nanoid/non-secure'

export const CUSTOM_ALPHABET = '0123456789abcdef'

/**
 *  Generates universally unique identifier
 * @see https://en.wikipedia.org/wiki/Universally_unique_identifier
 * @param size
 * @returns UUID
 */
export const uuid = (size = 6) => {
  const nanoid = customAlphabet(CUSTOM_ALPHABET, size)
  return nanoid()
}

/**
 * Lock or unlock body scroll
 * @param toggle 'enable' or 'disable'
 */
export function scrollBehaviour(toggle: 'enable' | 'disable') {
  const body = document.querySelector('body')

  if (body) {
    switch (toggle) {
      case 'enable':
        Object.assign(body.style, { overflow: '' })
        break
      case 'disable':
        Object.assign(body.style, { overflow: 'hidden' })
        break
      default:
    }
  }
}
