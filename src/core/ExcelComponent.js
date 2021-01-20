import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unsubscribers = []

    this.prepare()
  }

  // Customise our component before init
  prepare() {}

  //Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  // Notificate listeners about event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // Subscribe on event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  // Get changes of subscribe fields
  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  // Initialise component, add dom listeners
  init() {
    this.initDOMListeners()
  }

  // Delete component, clear listeners
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
