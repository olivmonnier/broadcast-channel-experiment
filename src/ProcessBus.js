import workerInstance from './worker'
import { uuidv4 } from './utils'

const EVENT_MESSAGE = 'message'
const EVENT_TYPES = [EVENT_MESSAGE]

export default class ProcessBus {
  constructor() {
    const url = window.URL.createObjectURL(new Blob(['(' + workerInstance + ')();'], { type: 'text/javascript' }))

    this.handlers = {}

    this.id = uuidv4()
    this.worker = new Worker(url)
    this.worker.postMessage({
      event: 'connect',
      id: this.id
    })
    this.channel = new BroadcastChannel(`process_bus:${this.id}`)
    this.channel.onmessage = (e) => {
      if (typeof this.handlers[EVENT_MESSAGE] === 'function') {
        this.handlers[EVENT_MESSAGE](e)
      }
    }
  }
  on(event, handler) {
    if (!EVENT_TYPES.indexOf(event) < 0) return

    this.handlers[event] = handler
  }
  emit(event) {
    this.channel.postMessage(event)
  }
}