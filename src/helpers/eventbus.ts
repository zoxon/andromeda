type Registry = Record<string, Function[]>

type Callable = (...args: any[]) => void

export class EventBus {
  events: Registry = {}

  on(event: string, handler: Callable) {
    // Create the event's object if not yet created
    if (!this.events.hasOwnProperty.call(this.events, event)) {
      this.events[event] = []
    }

    // Add the handler to queue
    const index = this.events[event].push(handler) - 1

    // Provide handle back for removal of event
    return {
      remove: () => {
        delete this.events[event][index]
      },
    }
  }

  emit(event: string, context = {}) {
    // If the event doesn't exist, or there's no handlers in queue
    if (!this.events.hasOwnProperty.call(this.events, event)) {
      return
    }

    // Cycle through events queue
    this.events[event].forEach((item) => {
      item(context || {})
    })
  }
}
