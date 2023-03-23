# Component class

The `Component` class is intended to be extended by other classes to create specific components for a web application.

The Component class has the following properties and methods:

## Properties

* `element` (type: `HTMLElement`): The root element of the component
* `options` (type:`Record<string, any>`): A dictionary of options passed to the component constructor.

## Methods

* `constructor(name: string, element: HTMLElement, options: Record<string, any> = {})`: Constructs a new Component instance with the given name, element, and options.
* `get<E extends Element>(name: string, context?: Element): E | null`: Returns the first child element of the component that matches the given name attribute value. The context parameter specifies the context in which to search for the element.
* `getAll<E extends Element>(name: string, context?: Element): E[]`: Returns an array of all child elements of the component that match the given name attribute value. The context parameter specifies the context in which to search for the elements.
* `getInstance(element: ComponentRootElement): Component | undefined`: Returns the Component instance associated with the given element.
* `init()`: Initializes the component. This method is intended to be overridden in derived classes.
* `buildCache()`: Builds the component's internal cache. This method is intended to be overridden in derived classes.
* `bindEvents()`: Binds event handlers to the component's elements. This method is intended to be overridden in derived classes.

## Helpers

* `getInstanceFromElement(element: ComponentRootElement): Component | undefined`: Returns the Component instance associated with the given element.
* `createInstance<T extends typeof Component>(element: ComponentRootElement, name: string, ComponentClass: T, options: Record<string, any> = {}): T`: Creates a new Component instance with the given name, element, and options, and associates it with the given element. The ComponentClass parameter specifies the class of the component to create.
* `initComponent<T extends typeof Component>(name: string, ComponentClass: T, initOptions: ComponentInitOptions = {}): T[]`: Initializes all instances of the component with the given name in the specified context. The ComponentClass parameter specifies the class of the component to create, and the initOptions parameter specifies the options and context to use when initializing the components.

## Example

```astro
<div data-component="counter">
  <div data-ref="counter:result"></div>
  <button type="button" data-ref="counter:plus">+</button>
  <button type="button" data-ref="counter:minus">-</button>
</div>

<script>
  import { Component, initComponent } from '@/helpers/components'

  // Utility type
  type Nullable<T> = T | null


  // Extend Counter class
  interface Counter {
    plusButton: Nullable<HTMLButtonElement>
    minusButton: Nullable<HTMLButtonElement>
    result: Nullable<HTMLElement>
    counter: number
  }

  class Counter extends Component {
    // Init class variables
    buildCache() {
      this.plusButton = this.get<HTMLButtonElement>('plus')
      this.minusButton = this.get<HTMLButtonElement>('minus')
      this.result = this.get<HTMLElement>('result')
      this.counter = 0
    }

    bindEvents() {
      if (this.plusButton) {
        this.plusButton.addEventListener('click', () => {
          this.counter++
          this.renderResult()
        })
      }

      if (this.minusButton) {
        this.minusButton.addEventListener('click', () => {
          this.counter--
          this.renderResult()
        })
      }
    }

    // Render result ounce
    init() {
      this.renderResult()
    }

    renderResult() {
      if (this.result) {
        this.result.innerHTML = this.counter.toString()
      }
    }
  }

  // Init component on element with data-component="counter" attribute
  initComponent('counter', Counter)
</script>

```
