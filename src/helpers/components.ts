import { camelCase } from 'change-case'
import { EventBus } from '@/helpers/eventbus'

const events = new EventBus()

export class Component {
  name: string
  element: HTMLElement
  options: Record<string, any>
  events: EventBus

  constructor(name: string, element: HTMLElement, options: Record<string, any> = {}) {
    this.name = name
    this.element = element
    this.options = Object.assign({}, this.defaults, options)
    this.events = events

    if (!this.isInit()) {
      this._init()
    }
  }

  private _init() {
    this.buildCache()
    this.bindEvents()
    this.setInit()
    this.init()
  }

  get defaults() {
    return {}
  }

  setInit() {
    this.element.dataset[`${camelCase(this.name)}Inited`] = 'true'
  }

  isInit() {
    return this.element.dataset[`${camelCase(this.name)}Inited`] || false
  }

  get<E extends Element>(name: string) {
    return this.element.querySelector<E>(`[data-ref="${this.name}:${name}"]`)
  }

  getAll<E extends Element>(name: string) {
    return this.element.querySelectorAll<E>(`[data-ref="${this.name}:${name}"]`)
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

const instances: Component[] = []

export const initComponent = (name: string, ComponentClass: typeof Component, options: Record<string, any> = {}) => {
  const elements = document.querySelectorAll<HTMLElement>(`[data-component="${name}"]`)

  for (const element of elements) {
    const instance = new ComponentClass(name, element, options)
    console.log(instance)
    instances.push(instance)
  }
}
