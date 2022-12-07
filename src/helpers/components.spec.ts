import { describe, expect, it } from 'vitest'
import { Component } from './components'

describe('helpers/components', () => {
  describe('Component', () => {
    document.body.innerHTML = `
    <div id="test">
      <div data-ref="global">global ref</div>
      <div data-ref="test:foo-bar">scoped red</div>
      <div data-ref="test2:unscoped">unscoped red</div>

      <button data-refs="buttons">Refs collection</button>
      <button data-refs="buttons">Refs collection</button>
      <button data-refs="buttons">Refs collection</button>
    </div> 
    `
    const name = 'test'
    const element = document.querySelector<HTMLDivElement>('#test') as HTMLDivElement

    class Test extends Component {}
    const component = new Test(name, element)

    it('should be instance of Component', () => {
      expect(typeof component).not.toBe('undefined')
      expect(component).toBeInstanceOf(Component)
    })

    it('should collect ref', () => {
      const referenceKeys = Object.keys(component?.refs)

      expect(referenceKeys).toHaveLength(2)
      expect(referenceKeys).toEqual(['global', 'fooBar'])
      expect(component?.refs.global).toBeInstanceOf(Element)
      expect(component?.refs.fooBar).toBeInstanceOf(Element)
    })

    it('should support component scoped refs', () => {
      expect(component?.refs.fooBar).toBeInstanceOf(Element)
    })
  })
})
