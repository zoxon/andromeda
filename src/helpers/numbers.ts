/**
 * Math.round with precision
 * @param number 
 * @param precision 
 * @returns 
 */
export function round(number: number, precision: number): number {
  const multiplier = precision ? Math.pow(10, precision) : 1

  return Math.round(number * multiplier) / multiplier
}

/**
 * Math.ceil with precision
 * @param number 
 * @param precision 
 * @returns 
 */
export function ceil(number: number, precision: number): number {
  const multiplier = precision ? Math.pow(10, precision) : 1

  return Math.ceil(number * multiplier) / multiplier
}

/**
 * Math.floor with precision
 * @param number 
 * @param precision 
 * @returns 
 */
export function floor(number: number, precision: number): number {
  const multiplier = precision ? Math.pow(10, precision) : 1

  return Math.floor(number * multiplier) / multiplier
}

/**
 * Check number is in range
 * @param value 
 * @param min 
 * @param max 
 * @returns 
 */
export const inRange = (value: number, min: number, max: number): boolean => value >= min && value <= max
