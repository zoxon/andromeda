import { camelCase } from 'change-case'
import { EventBus } from '@/helpers/eventbus'

const events = new EventBus()

export class Component {
  name: string
  element: HTMLElement
  refs: Record<string, HTMLElement | null | undefined>
  options: Record<string, any>
  events: EventBus

  constructor(name: string, element: HTMLElement, options: Record<string, any> = {}) {
    this.name = name
    this.element = element
    this.refs = {}
    this.options = Object.assign({}, this.defaults, options)
    this.events = events

    if (!this.isInit()) {
      this._init()
    }
  }

  private _init() {
    this.initRefs()
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

  initRefs() {
    const allRefsElements = this.element.querySelectorAll<HTMLElement>('[data-ref]:not([data-ref=""]')
    const elements = [this.element, ...allRefsElements]

    for (const element of elements) {
      const refName = element.dataset.ref
      const isPrefixedRef = refName?.includes(':')

      if (!refName) continue

      // Support ref prefix like data-ref="component-name:ref-name"
      if (isPrefixedRef) {
        let [prefix, name] = refName.split(':')

        if (prefix == this.name) {
          this.refs[camelCase(name)] = element
        }
        continue
      }

      // Support global refs data-ref="global-ref-name"
      this.refs[camelCase(refName)] = element
    }
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
    instances.push(instance)
  }
}