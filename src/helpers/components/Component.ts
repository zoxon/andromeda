import { camelCase } from 'change-case'
import { dispatchCustomEvent } from '@/helpers/events'
import { getInstanceFromElement } from './helpers'
import type { ComponentRootElement } from './types'

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
  #name: string
  element: HTMLElement
  // TODO: fix types for options
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: Record<string, any>

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(name: string, element: HTMLElement, options: Record<string, any> = {}) {
    this.#name = name
    this.element = element
    this.options = Object.assign({}, this.defaults, options)

    if (!this.#isInit()) {
      this.#init()
    }
  }

  async #init() {
    await this.buildCache()
    await this.bindEvents()
    await this.#setInit()
    await this.init()
  }

  get defaults() {
    return {}
  }

  #setInit() {
    this.element.dataset[`${camelCase(this.#name)}Inited`] = 'true'
    dispatchCustomEvent('inited', this.#name)
  }

  #isInit() {
    return this.element.dataset[`${camelCase(this.#name)}Inited`] || false
  }

  get<E extends Element>(name: string) {
    return this.element.querySelector<E>(`[data-ref="${this.#name}:${name}"]`)
  }

  getAll<E extends Element>(name: string) {
    return Array.from(this.element.querySelectorAll<E>(`[data-ref="${this.#name}:${name}"]`))
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
