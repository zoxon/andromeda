import type { Component } from './Component'

export interface ComponentRootElement extends HTMLElement {
  __instance: Component
}
