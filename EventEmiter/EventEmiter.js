/**
 * @file EventEmiter
 * @author yangshangman
 */

class EventQueue {

  constructor() {
    this.events = {}
  }

  get(type) {
    return this.events[type]
  }

  push(options) {
    if (!this.events[options.type]) {
      this.events[options.type] = [
        options
      ]
    } else {
      this.events[options.type].push(options)
    }
  }

  delete(type, handler) {
    if (!type) {
      this.events = {}
      return
    }
    if (!handler) {
      this.events[type] = []
      return
    }
    this.events[type] = this.events[type].filter(options => options.handler !== handler)
  }

}

export default class EventEmiter {
  constructor() {
    this.listenEvents = new EventQueue()
    this.excuteEvents = new EventQueue()
  }

  on(type, handler, options = {}) {
    const event = {
      type,
      handler,
      options
    }
    this.listenEvents.push(event)

    if (options.isPrevious) {
      const previousExcuteEvents = this.excuteEvents.get(type)
      if (previousExcuteEvents) {
        previousExcuteEvents.forEach(({message}) => {
          event.handler.call(event, message)
        })
      }
    }

  }

  emit(message) {
    const listenEvents = this.listenEvents.get(message.type)
    if (listenEvents) {
      listenEvents.forEach(event => {
        event.handler.call(event, message)
        if (event.options.once) {
          this.listenEvents.delete(event.type, event.handler)
        }
      })
    }
    this.excuteEvents.push({
      type: message.type,
      message
    })
  }

}