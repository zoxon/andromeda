/// <reference types="astro/client" />

declare interface WindowEventMap {
  inited: CustomEvent<string>
  'modal:show': CustomEvent<string>
  'modal:close': CustomEvent
  'drawer:toggle': CustomEvent<string>
  'drawer:collapse': CustomEvent<string>
  'drawer:expand': CustomEvent<string>
}
