import { camelCase } from 'change-case'
import { dispatchCustomEvent } from '@/helpers/events'

export interface ComponentRootElement extends HTMLElement {
  __instance: Component
}

/**
 * Javascript component core class
 * @usage
 * class MyComponent extends Component {
 *  init() {
 *    console.log('Hello world')
 *  }
 * }
 */
export class Component {
  name: string
  element: HTMLElement
  // TODO: fix types for options
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: Record<string, any>

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(name: string, element: HTMLElement, options: Record<string, any> = {}) {
    this.name = name
    this.element = element
    this.options = Object.assign({}, this.defaults, options)

    if (!this.isInit()) {
      this._init()
    }
  }

  private async _init() {
    await this.buildCache()
    await this.bindEvents()
    await this.setInit()
    await this.init()
  }

  get defaults() {
    return {}
  }

  setInit() {
    this.element.dataset[`${camelCase(this.name)}Inited`] = 'true'
    dispatchCustomEvent('inited', this.name)
  }

  isInit() {
    return this.element.dataset[`${camelCase(this.name)}Inited`] || false
  }

  get<E extends Element>(name: string) {
    return this.element.querySelector<E>(`[data-ref="${this.name}:${name}"]`)
  }

  getAll<E extends Element>(name: string) {
    return Array.from(this.element.querySelectorAll<E>(`[data-ref="${this.name}:${name}"]`))
  }

  getInstance(element: ComponentRootElement): Component | undefined {
    return getInstanceFromElement(element)
  }

  init() {
    // empty
  }

  buildCache() {
    // empty
  }

  bindEvents() {
    // empty
  }
}

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
