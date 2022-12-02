---
to: "src/components/<%= h.inflection.camelize(name.split('-').join('_').split(' ').join('_')) %>.astro"
---
---
import type { ClassName } from '@/types'

export interface Props {
  class?: ClassName
}

const { class: className } = Astro.props
---

<div class:list={['', className]}></div>
