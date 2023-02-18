export type EventHandler<K extends keyof WindowEventMap> = (event: WindowEventMap[K]) => void

/**
 * Creates listener for CustomEvent
 * @param event event name
 * @param handler event listener callback
 * @returns unlistener event for this event
 */
export function listenEvent<K extends keyof WindowEventMap>(event: K, handler: EventHandler<K>): () => void {
  window.addEventListener(event, handler)

  return () => unlistenEvent(event, handler)
}

/**
 * Creates unlistener for event
 * @param event event name
 * @param handler event listener callback
 */
export function unlistenEvent<K extends keyof WindowEventMap>(event: K, handler: EventHandler<K>): void {
  window.removeEventListener(event, handler)
}

/**
 * Emit custom event
 * @param event event name
 * @param detail data that will be attached to custom event. To avoid TypescriptErrors extend WindowEventMap interface
 */
// TODO: Extract detail type from WindowEventMap<K>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function dispatchCustomEvent<K extends keyof WindowEventMap>(event: K, detail: any) {
  window.dispatchEvent(
    new CustomEvent(event, {
      bubbles: true,
      cancelable: true,
      detail: detail,
    })
  )
}

export function getCursorDirection(event: KeyboardEvent): number {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    return -1
  }

  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    return 1
  }

  return 0
}
