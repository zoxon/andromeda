import type { ImageSrcset, ImageSizes } from '@/components/base/Image.astro'
import { isObject } from '@/helpers/is'

// eslint-disable-next-line @typescript-eslint/no-explicit-any

export function stringifySrcset(srcset: ImageSrcset) {
  if (isObject(srcset)) {
    return (
      Object.keys(srcset)
        .map((descriptor) => `${srcset[descriptor]} ${descriptor}`)
        .join(', ') || undefined
    )
  }

  // eslint-disable-next-line unicorn/no-useless-undefined
  return undefined
}

export function stringifySizes(sizes: ImageSizes[]) {
  if (sizes) {
    return (
      sizes
        .map((size) => {
          return size.media ? `${size.media} ${size.size}` : size.size
        })
        .join(', ') || undefined
    )
  }

  // eslint-disable-next-line unicorn/no-useless-undefined
  return undefined
}
