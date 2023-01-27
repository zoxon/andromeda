/**
 * Call callback on a document ready
 * @param callback
 */
export function ready(callback: () => void) {
  if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', callback)
  } else {
    callback()
  }
}

/**
 * Remove class on element or array of elements
 * @param nodes
 * @param className
 * @returns changed element or elements
 */
export function removeClass(nodes: Element | Element[], className: string) {
  if (!Array.isArray(nodes)) {
    nodes.classList.remove(className)
    return nodes
  }

  for (const node of nodes) {
    node.classList.remove(className)
  }

  return nodes
}

/**
 * Add class on element or array of elements
 * @param nodes
 * @param className
 * @returns changed element or elements
 */
export function addClass(nodes: Element | Element[], className: string) {
  if (!Array.isArray(nodes)) {
    nodes.classList.add(className)
    return nodes
  }

  for (const node of nodes) {
    node.classList.add(className)
  }

  return nodes
}
