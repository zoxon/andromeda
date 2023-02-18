import type { Component } from './Component'
import type { ComponentRootElement } from './types'

/**
 * Returns Component instance from element if it has
 * @param element
 * @returns instance of Component
 */
export function getInstanceFromElement(element: ComponentRootElement) {
  if (!element || !element.__instance) return
  return element.__instance
}

/**
 * Helper to init Component(s) tipicaly used inside parent component to init child components
 * @param element root element
 * @param name component name
 * @param ComponentClass your Component class
 * @param options options for Component
 * @returns instance of ComponentClass
 */
export function createInstance<T extends typeof Component>(
  element: ComponentRootElement,
  name: string,
  ComponentClass: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: Record<string, any> = {}
) {
  const instance = new ComponentClass(name, element, options)
  element.__instance = instance
  return instance
}

interface ComponentInitOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: Record<string, any>
  context?: Element
}

/**
 * Helper function to create instance(s) of given Component
 * @param name component name. Your component root must be marked with attribute `data-component="component-name"`
 * @param ComponentClass your Component class
 * @param initOptions options
 * @returns all instances for this component
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function initComponent<T extends typeof Component>(
  name: string,
  ComponentClass: T,
  initOptions: ComponentInitOptions = {}
) {
  const { options = {}, context = document.documentElement } = initOptions

  const elements = context.querySelectorAll<ComponentRootElement>(`[data-component="${name}"]`)
  const instances: T[] = []

  for (const element of elements) {
    const instance = getInstanceFromElement(element)
    if (instance) {
      console.warn('Error: instance exists: \n', instance)
      true
      continue
    }

    if (ComponentClass && typeof ComponentClass === 'function') {
      // TODO: Fix types
      // @ts-expect-error Argument of type 'Component' is not assignable to parameter of type 'T'.
      instances.push(createInstance(element, name, ComponentClass, options))
    } else {
      console.warn(`Constructor for component "${name}" not found.`)
    }
  }

  return instances
}
