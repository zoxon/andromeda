import { camelCase } from 'change-case'
import { EventBus } from '@/helpers/eventbus'

const events = new EventBus()

const GLOBAL_REF_PREFIX = 'global'

export type References = {
  [componentName: string]: {
    [referenceName: string]: HTMLElement[]
  }
}

export class Component {
  name: string
  element: HTMLElement
  _refs: References = {}
  options: Record<string, any>
  events: EventBus

  constructor(name: string, element: HTMLElement, options: Record<string, any> = {}) {
    this.name = name
    this.element = element
    this.options = Object.assign({}, this.defaults, options)
    this.events = events

    this._refs[name] = {}
    this._refs[GLOBAL_REF_PREFIX] = {}

    if (!this.isInit()) {
      this._init()
    }
  }

  private _init() {
    this.collectRefs()
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

  collectRefs() {
    const referenceElements = [this.element, ...this.element.querySelectorAll<HTMLElement>('[data-ref]')]

    for (const element of referenceElements) {
      const reference = element.dataset.ref
      if (!reference) continue

      // eslint-disable-next-line prefer-const
      let [componentName, referenceName] = reference.split(':')

      // Global ref
      if (referenceName === undefined) {
        componentName = GLOBAL_REF_PREFIX
        referenceName = reference
      }

      componentName = camelCase(componentName)
      referenceName = camelCase(referenceName)

      if (this._refs[componentName][referenceName] === undefined) {
        this._refs[componentName][referenceName] = [element]
      } else {
        this._refs[componentName][referenceName].push(element)
      }
    }
  }

  get refs() {
    const references: { [referenceName: string]: HTMLElement[] } = {
      ...this._refs[this.name],
      ...this._refs[GLOBAL_REF_PREFIX],
    }

    const newReferences: { [referenceName: string]: HTMLElement | HTMLElement[] } = {}
    for (const [key, value] of Object.entries(references)) {
      newReferences[key] = value.length === 1 ? value[0] : value
    }

    return newReferences
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
