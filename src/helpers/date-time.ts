/**
 * Generate value in milliseconds
 * @param configuration 
 * @returns milliseconds
 */
export function interval({
  hours = 0,
  minutes = 0,
  seconds = 0,
  days = 0,
}: Partial<Record<'days' | 'hours' | 'minutes' | 'seconds', number>>) {
  return (((days * 24 + hours) * 60 + minutes) * 60 + seconds) * 1000
}
